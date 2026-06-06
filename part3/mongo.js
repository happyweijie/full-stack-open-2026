const mongoose = require('mongoose');
const process = require('node:process');

if (process.argv.length < 3) {
  console.log('Format: node mongo.js <password> [name] [number]');
  process.exit(1);
}

const password = process.argv[2];
const url = `mongodb+srv://weijiechew:${password}@happyweijie.blahaf5.mongodb.net/phonebook?retryWrites=true&w=majority&appName=happyweijie`;

mongoose.set('strictQuery',false);
mongoose.connect(url, { family: 4 });

const personSchema = new mongoose.Schema({
  name: String,
  number: String
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length === 3) {
  // show all entries in the phonebook
  Person.find({}).then(result => {
    console.log('phonebook:');

    result.forEach(person => {
      console.log(`${person.name} ${person.number}`);
    });

    mongoose.connection.close();
  });
} else {
  // add a new entry to the phonebook
  const name = process.argv[3];
  const number = process.argv[4];

  const person = new Person({
    name: name,
    number: number
  });

  person.save().then(res => {
    console.log(`added ${name} number ${number} to phonebook`);

    mongoose.connection.close();
  });
}
