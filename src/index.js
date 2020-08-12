class AdvQueue {
	/**
	 * How long a promise should stay on queue before timing out (default is Infinity)
	 * @type Number
	 */
	queuedTimeout = Infinity

	/**
	 * How long a queued promise should stay under processing (without resolving) before timing out (default is Infinity)
	 * @type Number
	 */
	processingTimeout = Infinity

	/**
	 * How many promises should be concurrently executed
	 * @type {Number}
	 */
	concurrency = 1

	/**
	 * Callback for when a promise does not process within the queuedTimeout
	 * @type Function
	 */
	onQueuedTimeout = () => {}

	/**
	 * Callback for when a promise does not resolve within the processingTimeout
	 * @type Function
	 */
	onProcessingTimeout = () => {}

	/**
	 * Stores the queue
	 */
	_queue = []

	/**
	 * Stores the running promises
	 */
	_clusters = []

	/**
	 * Internal task ID tracking
	 */
	_counter = 0

	clear = () => {
		this._clusters = []
	}

	add = (fn, priority = 0, name = null) => {
		return new Promise((resolve, reject) => {
			let id = this._counter++
			this._queue.push({
				id,
				name,
				priority,
				resolve,
				reject,
				createdAt: (new Date().getTime())/1000,
				fn: () => {
					let run
					try {
						run = fn()

						if (run && run.then && run.catch) {
							run
								.then(result => this._complete(id, name, resolve, reject, result, undefined))
								.catch(error => this._complete(id, name, resolve, reject, undefined, error))
						} else {
							this._complete(id, name, resolve, reject, run, undefined)
						}
					} catch (e) {
						this._complete(id, name, resolve, reject, run, e)
					}
				},
				rawFn: fn
			})
			this._next()
		})
	}

	_intervalCheck = () => {
		if (this._clusters.length || this._queue.length) {
			if (!this._interval) {
				this._interval = setInterval(this._next, 1000)
			}
		} else if (this._interval) {
			clearInterval(this._interval)
			this._interval = undefined
		}
	}

	_complete = (id, name, resolve, reject, result, error) => {
		if (this._clusters.some(item => item.id === id)) {
			if (error)
				reject(error)
			else
				resolve(result)
		}

		this._clusters = this._clusters.filter(item => item.id !== id)

		this._next()
	}

	_next = () => {
		this._queue = this._queue.sort((a, b) => a.priority !== b.priority ? a.priority - b.priority : a.id - b.id)

		if (this._clusters.length < this.concurrency) {
			let nextExec = this._queue.shift()
			if (nextExec) {
				nextExec.startedAt = (new Date().getTime())/1000
				this._clusters.push(nextExec)
				nextExec.fn()
			}
		}

		let timedOutQueued = this._queue.filter(item => this.queuedTimeout !== Infinity && item.createdAt <= Math.abs(this.queuedTimeout-((new Date().getTime())/1000)))
		this._queue = this._queue.filter(item => this.queuedTimeout === Infinity || item.createdAt > Math.abs(this.queuedTimeout-((new Date().getTime())/1000)))

		let timedOutExec = this._clusters.filter(item => this.processingTimeout !== Infinity && item.startedAt <= Math.abs(this.processingTimeout - ((new Date().getTime())/1000)))
		this._clusters = this._clusters.filter(item => this.processingTimeout === Infinity || item.startedAt > Math.abs(this.processingTimeout-((new Date().getTime())/1000)))

		timedOutQueued.forEach(this.onQueuedTimeout)
		timedOutExec.forEach(this.onProcessingTimeout)

		this._intervalCheck()
	}
}

module.exports = AdvQueue