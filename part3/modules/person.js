const mongoose = require('mongoose');

const uri = process.env.MONGO_URI;
mongoose.connect(uri, { family: 4 })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB:', error.message);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [3, 'Name must be at least 3 characters long'],
    required: true
  },
  number: {
    type: String,
    minLength: [8, 'Number must be at least 8 characters long'],
    validate: {
      // phone number has 2 parts separated by dash
      // first part has 2/3 digits
      // 2nd part consists of digits
      validator: s => /^\d{2,3}\-\d+$/.test(s),
      message: props => `${props.value} is not a valid phone number. Format: XX-XXXXXX`
    },
    required: true,
  }
});

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();  
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

// enable validators for update
const opts = { runValidators: true };

module.exports = mongoose.model('Person', personSchema);
