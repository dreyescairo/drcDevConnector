//require the express module
const express = require('express');


//init our express app
const app = express();


app.get('/', (req, res) => res.send('Hello'));