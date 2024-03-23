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

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id).then(person => {
    if (person) {
      response.json(person);
    } else {
      response.status(404).end();
    }
  }).catch(error => {
    next(error);
    response.status(500).end()
    console.log("id not founded")
  });
});

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end();
    })
    .catch(error => {
      next(error)
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

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

// tämä tulee kaikkien muiden middlewarejen rekisteröinnin jälkeen!
app.use(errorHandler)

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
