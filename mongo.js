const mongoose = require('mongoose')
const user = process.env.MONGO_USER
const password = process.env.MONGO_PASSWORD
const url = `mongodb://${user}:${password}@ds261521.mlab.com:61521/fullstackviikko3`
const Person = mongoose.model('Person',{
  name: String,
  number: String
})
if(process.argv.length===4){
  mongoose.connect(url)
  const argument1 = process.argv[2]
  const argument2 = process.argv[3]
  const person = new Person({ name:argument1, number:argument2 })




  person.save().then((response) => {
    console.log(`lisätään henkilö ${person.name} numero ${person.number} luetteloon`)
    mongoose.connection.close()
  })
}
else if(process.argv.length===2){
  mongoose.connect(url)
  Person
    .find({})
    .then(result => {
      result.forEach(person => {
        console.log(person)
      })
      mongoose.connection.close()
    })
}
