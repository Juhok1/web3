const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());
app.use(morgan('tiny'))

const cors = require('cors');
app.use(cors());
app.use(express.static('dist'));
require('dotenv').config();
const Person = require('./models/person')

// ÄLÄ KOSKAAN TALLETA SALASANOJA GitHubiin!
const url = process.env.MONGODB_URI;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .catch((error) => {
    console.error("Connection error:", error.message);
  });


app.use(morgan('tiny'));
app.get('/', (request, response) => {
  response.send('Moi');
});

app.get('/info', (req, res) => {
  const Time = new Date();
  Person.find({}).then(persons => {
    res.send(
      `<div> Phonebook has info for ${persons.length} people</div>
      <div>${Time}</div>`
    );
  }).catch(error => {
    console.error(error);
    res.status(500).end();
  });
});

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons);
  }).catch(error => {
    console.error(error);
    response.status(500).end();
  });
});

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(note => {
    if (note) {
      response.json(note);
    } else {
      response.status(404).end();
    }
  }).catch(error => {
    console.error(error);
    response.status(400).send({ error: 'malformatted id' });
  });
});

app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch(error => {
      console.error(error);
      response.status(400).send({ error: 'malformatted id' });
    });
});

app.post('/api/persons', (request, response) => {
  const body = request.body;

  if (!body.fname || !body.contact) {
    return response.status(400).json({ error: 'Name or contact missing' });
  }

  const person = new Person({
    fname: body.fname,
    contact: body.contact,
  });

  person.save().then(savedPerson => {
    response.json(savedPerson);
  }).catch(error => {
    console.error(error);
    response.status(500).end();
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
