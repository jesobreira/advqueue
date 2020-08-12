const AdvQueue = require('../')

const queue = new AdvQueue()

queue.processingTimeout = 2

queue.onQueuedTimeout = i => console.log("Queued timeout", i)
queue.onProcessingTimeout = i => console.log("Processing timeout", i)

queue.add(() => new Promise((resolve, reject) => {
	setTimeout(resolve, 3000)
})).then(() => {
	console.log("Ran")
})

