const mongoose = require('mongoose')

const user = process.env.MONGO_USER;
const password = process.env.MONGO_PASSWORD
const url = `mongodb://${user}:${password}@ds261521.mlab.com:61521/fullstackviikko3`
mongoose.connect(url)

const PersonSchema = new mongoose.Schema({
	name: String,
	number: String
})

PersonSchema.statics.format = (person)=>{
	return({
		id:person._id,
		name:person.name,
		number:person.number
	})
}

const Person = mongoose.model('Person', PersonSchema)

module.exports = Person