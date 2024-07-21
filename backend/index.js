const express = require('express');
const mysql = require('mysql2');
const config = require('config');

const mysqlIndex = require('./sqlRepositories/index');

const app = express();
const port = 3000;
const dbConfig = config.get('database');

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const connection = mysql.createConnection({
  host: dbConfig.host,
  user: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.database
});

connection.connect((err) => {
  if (err) {
    console.log('Error connecting to database', err);
    return;
  }
  console.log('Connected to database');
});

// call mysqlIndex to create models and associations
mysqlIndex;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
