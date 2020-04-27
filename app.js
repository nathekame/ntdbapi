
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
// const _ = require('lodash');
const routes = require('./routes/api');
var cors = require('cors');
const seq = require('./sequelize');

const app = express();

//const PORT = process.env.PORT || 6000;

const PORT = 5000;



//app.use(cors());

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Origin, Content-Type, Accept');
  next();
});

//app.use('seq')

app.use('/', routes);


app.listen(PORT, function () {
	// body...
	console.log('NTDB API is Up on port 5000....Dia Fada...');
});