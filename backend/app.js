const express = require('express');
const sqlite3 = require('sqlite3');
const app = express();
const port = 3001;
const path = require('path');
const UserController = require('./controller/UserController') ;

app.post(UserController.loginUser(req,res))

app.listen(port, () => {
  console.log(`Aplikacja działa na http://localhost:${port}`);
});