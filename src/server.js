const express = require('express');
const cors = require('cors');
//aded helmet, morgan
const helmet = require('helmet');
const morgan = require('morgan');
const { NODE_ENV, PORT} = require('./config');
const app = express();
const quClass = require('./queue');
const jsonParser = express.json();
const dog1 = require('./img/dog1.jpg');
const dog2 = require('./img/dog2.jpg');
const dog3 = require('./img/dog3.jpg');
const cat1 = require('./img/cat1.jpg');
const cat2 = require('./img/cat2.jpg');
const cat3 = require('./img/cat3.jpg');


const cats = [
  {
    imageURL: cat1, 
    imageDescription: 'Orange bengal cat with black stripes lounging on concrete.',
    name: 'Fluffy',
    sex: 'Female',
    age: 2,
    breed: 'Bengal',
    story: 'Thrown on the street'
  },
  {
    imageURL: cat2,
    imageDescription: 'Orange bengal cat with black stripes lounging on concrete.',
    name: 'Fluffy 2',
    sex: 'Female',
    age: 2,
    breed: 'Bengal',
    story: 'Thrown on the street'
  },  
  {
    imageURL: cat3,
    imageDescription: 'Orange bengal cat with black stripes lounging on concrete.',
    name: 'Fluffy 3',
    sex: 'Female',
    age: 2,
    breed: 'Bengal',
    story: 'Thrown on the street'
  },
];
const dogs = [
  {
    imageURL: dog1,
    imageDescription: 'A smiling golden-brown golden retreiver listening to music.',
    name: 'Zeus',
    sex: 'Male',
    age: 3,
    breed: 'Golden Retriever',
    story: 'Owner Passed away'
  },
  {
    imageURL: dog2,
    imageDescription: 'A smiling golden-brown golden retreiver listening to music.',
    name: 'Zeus 2',
    sex: 'Male',
    age: 3,
    breed: 'Golden Retriever',
    story: 'Owner Passed away'
  },
  {
    imageURL: dog3,
    imageDescription: 'A smiling golden-brown golden retreiver listening to music.',
    name: 'Zeus 3',
    sex: 'Male',
    age: 3,
    breed: 'Golden Retriever',
    story: 'Owner Passed away'
  }
];

let dogQu = new quClass.queue();
let catQu = new quClass.queue();
let humanQu = new quClass.queue();
cats.forEach(cat => catQu.enqueue(cat));
dogs.forEach(dog => dogQu.enqueue(dog));

humanQu.enqueue('Aedan');
humanQu.enqueue('Kei');
humanQu.enqueue('Josh');

function cycle() {
  const tempHuman = humanQu.dequeue();
  humanQu.enqueue(tempHuman);
  setTimeout(() => {
    cycle();
  }, (5000));
}

cycle();

//added morganoption
const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';
app.use(morgan(morganOption));
app.use(helmet());

app.use(cors());

app.get('/api/cats', (req, res) => {
  let response = catQu.peek();
  return res.status(200).json(response);
});

app.delete('/api/cats', (req, res) => {
  catQu.dequeue();
  return res.status(204).end();
});

app.get('/api/dogs', (req, res) => {
  let response = dogQu.peek();
  return res.status(200).json(response);
});

app.delete('/api/dogs', (req, res) => {
  dogQu.dequeue();
  return res.status(204).end();
});

app.get('/api/humans', (req, res) => {
  let string = humanQu.print();
  return res.status(200).json({stringQu: string});
});

app.delete('/api/humans', (req, res) => {
  humanQu.dequeue();
  return res.status(204).end();
});

app.post('/api/humans', jsonParser, (req, res) => { 
  humanQu.enqueue(req.body.name);
  return res.status(201).end();
});

// Catch-all 404
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Catch-all Error handler
// Add NODE_ENV check to prevent stacktrace leak
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: app.get('env') === 'development' ? err : {}
  });
});

app.listen(PORT,()=>{
});

module.exports = app;