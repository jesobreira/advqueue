const AdvQueue = require('../')

const queue = new AdvQueue()

queue.concurrency = 2


queue.add(() => 'hi from synchronous 1').then(console.log)
queue.add(() => 'hi from synchronous 2').then(console.log)
queue.add(() => 'hi from synchronous 3').then(console.log)
queue.add(() => 'hi from synchronous 4').then(console.log)
queue.add(() => 'hi from synchronous 5').then(console.log)
queue.add(() => 'hi from synchronous 6').then(console.log)
queue.add(() => 'hi from synchronous 7').then(console.log)
queue.add(() => 'hi from synchronous 8').then(console.log)
queue.add(() => 'hi from synchronous 9').then(console.log)
queue.add(() => 'hi from synchronous 10').then(console.log)