const express = require('express');
const sqlite3 = require('sqlite3');
const app = express();
const port = 3001;
const path = require('path');
const User = require('./Model/user');
const Controller = require('.controller/controller') ;


app.listen(port, () => {
  console.log(`Aplikacja działa na http://localhost:${port}`);
});