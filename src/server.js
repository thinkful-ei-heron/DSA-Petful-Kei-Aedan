const express = require('express');
const cors = require('cors');
//aded helmet, morgan
const helmet = require('helmet');
const morgan = require('morgan');
const { NODE_ENV } = require('./config');
const app = express();
const quClass = require('./queue');

const cats = [
  {
    imageURL:'https://assets3.thrillist.com/v1/image/2622128/size/tmg-slideshow_l.jpg', 
    imageDescription: 'Orange bengal cat with black stripes lounging on concrete.',
    name: 'Fluffy',
    sex: 'Female',
    age: 2,
    breed: 'Bengal',
    story: 'Thrown on the street'
  },
  {
    imageURL:'https://assets3.thrillist.com/v1/image/2622128/size/tmg-slideshow_l.jpg', 
    imageDescription: 'Orange bengal cat with black stripes lounging on concrete.',
    name: 'Fluffy 2',
    sex: 'Female',
    age: 2,
    breed: 'Bengal',
    story: 'Thrown on the street'
  },  {
    imageURL:'https://assets3.thrillist.com/v1/image/2622128/size/tmg-slideshow_l.jpg', 
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
    imageURL: 'http://www.dogster.com/wp-content/uploads/2015/05/Cute%20dog%20listening%20to%20music%201_1.jpg',
    imageDescription: 'A smiling golden-brown golden retreiver listening to music.',
    name: 'Zeus',
    sex: 'Male',
    age: 3,
    breed: 'Golden Retriever',
    story: 'Owner Passed away'
  },
  {
    imageURL: 'http://www.dogster.com/wp-content/uploads/2015/05/Cute%20dog%20listening%20to%20music%201_1.jpg',
    imageDescription: 'A smiling golden-brown golden retreiver listening to music.',
    name: 'Zeus 2',
    sex: 'Male',
    age: 3,
    breed: 'Golden Retriever',
    story: 'Owner Passed away'
  },
  {
    imageURL: 'http://www.dogster.com/wp-content/uploads/2015/05/Cute%20dog%20listening%20to%20music%201_1.jpg',
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
humanQu.enqueue('Zee');
humanQu.enqueue('Kei');
humanQu.enqueue('Reif');
humanQu.enqueue('Heesu');
humanQu.enqueue('Shannon');

//added morganoption
const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';
app.use(morgan(morganOption));
app.use(helmet());

app.use(cors());

app.get('/api/cats', (req, res) => {
  let response = cats[0];
  return res.status(200).json(response);
});

app.delete('/api/cats', (req, res) => {
  let adopted = cats[0];
  cats.splice(0, 1);
  return res.status(204).json(adopted);
});

app.get('/api/dogs', (req, res) => {
  let response = dogs[0];
  return res.status(200).json(response);
});

app.delete('/api/dogs', (req, res) => {
  let adopted = dogs[0];
  cats.splice(0, 1);
  return res.status(204).json(adopted);
});

app.get('/api/humans', (req, res) => {
  return res.status(200).json(humanQu);
});

app.delete('/api/humans', (req, res) => {
  humanQu.dequeue();
  return res.status(204).end();
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

app.listen(8080,()=>{
  console.log('Serving on 8080');
});

module.exports = app;