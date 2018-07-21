//require the express module
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

//init our express app
const app = express();

//body-parser middleware
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

//dbconfig
const db = require('./config/keys').mongoURI;

//connect to mongodb

mongoose
  .connect(db)
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.log('***ERROR***: ' + err));


app.get('/', (req, res) => res.send('Hello'));

//use routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port `, port));