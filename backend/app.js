const express = require('express');
const sqlite3 = require('sqlite3');
const app = express();
const port = 3001;
const path = require('path');
const UserController = require('./controller/UserController') ;
const PizzaController = require('./controller/PizzaController') ;

app.post('/login',UserController.loginUser(req,res));

app.post('/user',UserController.addUser(req,res));

app.put('/user/:id',UserController.updateUser(req,res));

app.put('/user/:id/grand',UserController.makeAdmin(req,res));

app.delete('/user/{id}', UserController.deleteUser(req,res))

app.get('/users',UserController.getAllUsers(req,res))

app.get('/pizza',PizzaController.getPizza(req,res))

app.post('/addPizza',PizzaController.addPizza(req,res))

app.listen(port, () => {
  console.log(`Aplikacja działa na http://localhost:${port}`);
});