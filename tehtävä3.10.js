
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static('dist'))

        let persons = [
            {
              name: "Arto Hellas",
              number: "040-123456",
              id: 1
            },
            {
              name: "Ada Lovelace",
              number: "39-44-5323523",
              id: 2
            },
            {
              name: "Dan Abramov",
              number: "12-43-234345",
              id: 3
            },
          ]

app.use(morgan('tiny'))
app.get('/', (request, response) => {
  response.send('Moi')
})
app.get('/info',(req,res) => {
  const Time = new Date;
  res.send(
    `<div> Phonebook has info for ${persons.length} people</div>
    <div>${Time}</div>`
  )
if (result) {
  response.json(result)
} else {
  response.status(404).end()
  }
})
app.get('/api/persons',(req,res) => {
  res.json(persons)
})
app.get('/api/persons/:id',(request, response) => {
  const id = Number(request.params.id)
  let person = persons.find(person => person.id === id)
  if (!person){
    response.status(404).end()
  }
  else {
  response.json(person)
  }
})

app.delete('/api/persons/:id',(request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)
  response.status(204).end()
})
app.post('/api/persons',(request,response) => {
  const maxId = persons.length > 0
  const body = request.body
  console.log(body)
  ? Math.floor
  : 0
  const person = {
    name: body.name,
    number : body.number,
    id: Math.floor(Math.random(persons.length) * 100)
  }
  if (!person.name){
    return response.status(400).json({
      error: "missing name"
    })
  }
  if (!person.number){
    return response.status(400).json({
      error: "missing number"
  })}
  if (persons.find(person => person.name === body.name)){
    return response.status(409).json({
      error: "Name must be unique"
    })
  }
  else {
  persons = persons.concat(person)
  console.log(person)
  response.json(person)
  }
})

const PORT = process.env.PORT || 3001
app.listen(PORT,() => {
console.log('Sever running on PORT 3001')
})
