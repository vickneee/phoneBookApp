const mongoose = require('mongoose');

// For connecting to the MongoDB database
// const dotenv = require('dotenv');
// dotenv.config();

// Create a Mongoose model from the schema
const personSchema = new mongoose.Schema({
  name: String,
  number: Number
});

// Format the returned object
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

// Export the model for use in other files
const Person = mongoose.model('Person', personSchema);
module.exports = Person;


// For connecting to the MongoDB database
// Connect to the MongoDB database
// MONGODB_URI = process.env.MONGODB_URI

// const url =
//   `${MONGODB_URI}`

// mongoose.set('strictQuery',false)

// const person = new Person({
//   name: 'HTML is Easy',
//   number: 1234567,
// })

// person.save().then(result => {
//   console.log('Person saved!')
//   mongoose.connection.close()
// })

// personSchema.set('toJSON', {
//   transform: (document, returnedObject) => {
//     returnedObject.id = returnedObject._id.toString()
//     delete returnedObject._id
//     delete returnedObject.__v
//   }
// })