const AdvQueue = require('../')

const queue = new AdvQueue()

queue.concurrency = 1

for (let i = 1; i <= 10; i++) {
	queue.add(() =>
		new Promise(resolve =>
			setTimeout(() =>
				resolve(
					console.log("hey from "+i)
				),
				i*1000
			)
		),
	10-i)
}