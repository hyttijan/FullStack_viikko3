const express = require("express")
const bodyParser = require("body-parser")
const morgan = require("morgan")
const app = express()
const cors = require('cors')

app.use(cors())
app.use(bodyParser.json())
app.use(express.static('build'))

app.use(morgan(':method :url :data :status :res[content-length] - :response-time ms'))

morgan.token('data',function(request,response){
	return JSON.stringify(request.body)
})

let persons = [
    {
      name: "Arto Hellas",
      number: "040-123456",
      id: 1
    },
    {
      name: "Martti Tienari",
      number: "040-123456",
      id: 2
    },
    {
      name: "Arto Järvinen",
      number: "040-123456",
      id: 3
    },
    {
      name: "Lea Kutvonen",
      number: "040-123456",
      id: 4
    }
]

const generateId = ()=>Math.round(Math.random()*9999)

app.get("/api/persons/",(request,response)=>{
	response.json(persons)
})
app.get("/api/persons/:id",(request,response)=>{
	const id = Number(request.params.id)
	const person = persons.find((person)=>person.id===id)
	person?response.json(person):response.status("404").end()	
})
app.delete("/api/persons/:id",(request,response)=>{
	const id = Number(request.params.id)
	persons = persons.filter((person)=>person.id!==id)
	response.status("204").end()
})
app.post("/api/persons/",(request,response)=>{
	let person =    {
					name:request.body.name, 
				  	number:request.body.number,
				  	id: generateId()
					}
	if(person.name===undefined||person.number===undefined){
		response.status("400").json({error:"Content is missing"})
	}
	else{
		persons = persons.concat(person)
		response.status("201").end()	
	}
})
app.get("/info/",(request,response)=>{
	let amount = persons.length;
	response.send(`<p>Puhelinluettelossa ${amount} henkilön tiedot ${new Date()}</p>`)
})
const port = process.env.PORT || 3001
app.listen(port,()=>{
	console.log(`Server running at port ${port}`)
})