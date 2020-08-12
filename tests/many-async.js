const AdvQueue = require('../')

const queue = new AdvQueue()

queue.concurrency = 3

queue.add(() => new Promise((res, rej) => setTimeout(() => res('hi from promise 1'), 2000))).then(console.log)
queue.add(() => new Promise((res, rej) => setTimeout(() => res('hi from promise 2'), 2000))).then(console.log)
queue.add(() => new Promise((res, rej) => setTimeout(() => res('hi from promise 3'), 2000))).then(console.log)
queue.add(() => new Promise((res, rej) => setTimeout(() => res('hi from promise 4'), 2000))).then(console.log)
queue.add(() => new Promise((res, rej) => setTimeout(() => res('hi from promise 5'), 2000))).then(console.log)
queue.add(() => new Promise((res, rej) => setTimeout(() => res('hi from promise 6'), 2000))).then(console.log)
queue.add(() => new Promise((res, rej) => setTimeout(() => res('hi from promise 7'), 2000))).then(console.log)
queue.add(() => new Promise((res, rej) => setTimeout(() => res('hi from promise 8'), 2000))).then(console.log)
queue.add(() => new Promise((res, rej) => setTimeout(() => res('hi from promise 9'), 2000))).then(console.log)
queue.add(() => new Promise((res, rej) => setTimeout(() => res('hi from promise 10'), 2000))).then(console.log)
