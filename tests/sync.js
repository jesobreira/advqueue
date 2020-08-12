const AdvQueue = require('../')

const queue = new AdvQueue()

queue.add(() => {
	return 'hey'
}).then(result => {
	console.log(result)
})

