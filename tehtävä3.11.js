const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]
const url =
  `mongodb+srv://juho_k_21:${password}@cluster0.vaszlwb.mongodb.net/puhelinluettelo?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url)
const personSchema = new mongoose.Schema({
  fname: String,
  contact: String
})

const Note = mongoose.model('puhelinluettelo', personSchema)

const person = new Note({
  fname: name,
  contact: number,
})
if ((name == undefined) || (number== undefined)){
  Note.find({}).then(result => {
    result.forEach(note => {
      console.log(note)
    })
    mongoose.connection.close()
  })
}
else {person.save().then(result => {
  console.log(`added ${name} number ${number}`)
  mongoose.connection.close()
})
}