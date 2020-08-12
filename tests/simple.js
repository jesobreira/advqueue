const AdvQueue = require('../')

const queue = new AdvQueue()

queue.add(() => {
	return new Promise((resolve, reject) => {
		setTimeout(() => resolve('hey'), 3000)
	})
}).then(result => {
	console.log(result) // 'hey' after 3s
})