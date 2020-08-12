const AdvQueue = require('../')

const queue = new AdvQueue()

queue.concurrency = 3

queue.add(() => new Promise((res, rej) => setTimeout(() => res('hi from promise 1'), 2000))).then(console.log)
queue.add(() => 'hi from synchronous 1').then(console.log)
queue.add(() => new Promise((res, rej) => setTimeout(() => res('hi from promise 2'), 2000))).then(console.log)
queue.add(() => 'hi from synchronous 2').then(console.log)
queue.add(() => new Promise((res, rej) => setTimeout(() => res('hi from promise 3'), 2000))).then(console.log)
queue.add(() => 'hi from synchronous 3').then(console.log)
queue.add(() => new Promise((res, rej) => setTimeout(() => res('hi from promise 4'), 2000))).then(console.log)
queue.add(() => 'hi from synchronous 4').then(console.log)
queue.add(() => new Promise((res, rej) => setTimeout(() => res('hi from promise 5'), 2000))).then(console.log)
queue.add(() => 'hi from synchronous 5').then(console.log)