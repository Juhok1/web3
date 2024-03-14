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
app.get('/api/persons',(req,res) => {
  res.json(persons)

})
    

const PORT = 3001
app.listen(PORT)
console.log('Sever running on PORT 3001')

