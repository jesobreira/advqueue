const AdvQueue = require('../')

const queue = new AdvQueue()

queue.concurrency = 2

for (let i = 1; i <= 10; i++) {
	setTimeout(() => queue.add(() => console.log('hey from '+i)), i*1000)
}