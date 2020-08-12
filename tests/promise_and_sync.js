const AdvQueue = require('../')

const queue = new AdvQueue()

queue.add(() => new Promise((res, rej) => setTimeout(() => res('hi from promise'), 2000))).then(console.log)

queue.add(() => 'hi from synchronous').then(console.log)