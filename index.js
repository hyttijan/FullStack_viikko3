const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const Person = require('./models/person')


app.use(cors())
app.use(bodyParser.json())
app.use(express.static('build'))

app.use(morgan(':method :url :data :status :res[content-length] - :response-time ms'))

morgan.token('data',function(request,response){
  return JSON.stringify(request.body)
})




/**
const generateId = ()=>Math.round(Math.random()*9999)

**/

app.get('/api/persons/',(request,response) => {
  Person.find({}).then((result) => {
    response.json(result.map(Person.format))
  }).catch((error) => {
    console.log(error)
    response.status(404).end()
  })
})
app.get('/api/persons/:id',(request,response) => {
  const id = request.params.id
  Person.findOne({ _id:id }).then((result) => {
    console.log(result)
    response.json(Person.format(result))
  }).catch((error) => {
    console.log(error)
    response.status(404).end()
  })

})
app.delete('/api/persons/:id',(request,response) => {
  const id = request.params.id
  Person.findByIdAndRemove(id)
    .then((result) => {
      console.log(result)
      response.status(204).end()
    })
    .catch((error) => {
      console.log(error)
      response.status(404).end()
    })
})
app.post('/api/persons/',(request,response) => {
  let person =  new Person({
    name:request.body.name,
    number:request.body.number,
  })
  if(person.name===undefined||person.number===undefined){
    response.status(400).json({ error:'Content is missing' })
  }
  else{
    Person.find({ name:person.name }).then((result) => {
      if(result.length===0){
        person.save().then((result) => {
          response.status(201).end()
        })
          .catch((error) => {
            console.log(error)
            response.status(404).end()
          })
      }
      else{
        response.status(409).end()
      }
    })
      .catch((error) => {
        console.log(error)
        response.status(404)
      })
  }
})
app.put('/api/persons/:id',(request, response) => {
  const id = request.params.id
  const person = {
    name: request.body.name,
    number: request.body.number
  }
  if(person.name==='undefined'||person.number==='undefined'){
    response.status(400).json({ error:'Content is missing' })
  }
  else{
    Person.findOneAndUpdate({ _id: id },person).then((updatedPerson) => {
      response.json(Person.format(updatedPerson))
    })
  }
})
app.get('/info/',(request,response) => {
  Person.find({}).then((result) => {
    response.send(`<p>Puhelinluettelossa ${result.length} henkilön tiedot ${new Date()}</p>`)
  })
    .catch((error) => {
      console.log(error)
      response.status(404).end()
    })
})
const port = process.env.PORT || 3001
app.listen(port,() => {
  console.log(`Server running at port ${port}`)
})