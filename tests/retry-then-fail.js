const AdvQueue = require('../')

const queue = new AdvQueue()

queue.concurrency = 2

queue.processingTimeout = 3

let retried = false

queue.onProcessingTimeout = ({ rawFn, priority, name, resolve }) => {
	console.log("Processing timeout! Retrying after 5s...")
	setTimeout(() => {
		resolve(queue.add(rawFn, priority, name))
	}, 5000)
}

queue.add(() => new Promise((resolve, reject) => {
	if (retried) {
		reject('awesome')
	} else {
		// let's not resolve to simulate a stuck HTTP connection
		retried = true
	}
})).catch(console.warn)