const express = require('express')

const app = express()
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

app.delete('/api/persons/:id',(request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)
  response.status(204).end()
})
    

const PORT = 3001
app.listen(PORT)
console.log('Sever running on PORT 3001')

