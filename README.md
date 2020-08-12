# AdvQueue

Queue controlling for Promises

## Installing

```
npm i advqueue
```

## Using

1. Import the lib

```
const AdvQueue = require('advqueue')
// or
import AdvQueue from 'advqueue'
```

2. Creating a new queue instance

```
const queue = new AdvQueue()
```

3. Optionally setting a few queue settings

```
/**
 * How long a promise should stay on queue before timing out (default is Infinity)
 * @type Number
 */
queue.queuedTimeout = Infinity

/**
 * How long a queued promise should stay under processing (without resolving) before timing out (default is Infinity)
 * @type Number
 */
queue.processingTimeout = Infinity

/**
 * How many promises should be concurrently executed
 * @type {Number}
 */
queue.concurrency = 1
```

4. Optionally setting a few event callbacks

```
/**
 * Callback for when a promise does not process within the queuedTimeout
 * @type Function
 */
onQueuedTimeout = ({ id, name, priority, resolve, reject, createdAt, fn, rawFn }) => {
	// perhaps you could reject the promise so queue.add won't await forever?
	reject("wtf")
}

/**
 * Callback for when a promise does not resolve within the processingTimeout
 * @type Function
 */
onProcessingTimeout = ({ id, name, priority, resolve, reject, createdAt, fn, rawFn, startedAt }) => {
	// or how about retrying?
	resolve(queue.add(rawFn, priority, name))

	// or perhaps you want to wait 5 seconds then retry?
	setTimeout(() => resolve(queue.add(rawFn, priority, name)), 5000)
}

The callback gets called with an object with the following properties:

* **id**: task ID
* **name**: task name (given when you called queue.add)
* **priority**: task priority (given when you called queue.add)
* **resolve**: function to resolve the promise returned by queue.add)
* **reject**: function to reject the promise returned by queue.add)
* **createdAt**: UNIX timestamp of when the task has been added
* **startedAt**: UNIX timestamp of when the task has been started (for processing) - only for onProcessingTimeout
* **fn**: the encapsuled function (for debugging only)
* **rawFn**: the original callback (useful for retrying)
```

5. Adding a new task

```
queue.add(() => {
	return new Promise((resolve, reject) => {
		setTimeout(() => resolve('hey from async'), 3000)
	})
}).then(result => {
	console.log(result) // 'hey from async' after 3s
})

// you may also add synchronous functions
queue.add(() => {
	return 'hey from sync'
}).then(result => {
	console.log(result)
})
```

_In the example above, since the concurrency is set to 1, the first promise will run and generate 'hey from async' after 3s, and only then the synchronous function will run and generate 'hey from sync'._

Arguments for `queue.add`:

* **fn**: function to call (function or promise)
* **priority**: task priority (optional, default: 0)
* **name**: task name (optional, default: null)