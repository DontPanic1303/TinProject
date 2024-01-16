const express = require('express');
const app = express();
const cors = require('cors');
const port = 3001;
app.use(express.urlencoded({ extended: true }));
const UserController = require('./controller/UserController') ;
const PizzaController = require('./controller/PizzaController') ;

app.use(cors());
app.use(express.json());

app.post('/login',UserController.loginUser);

app.post('/user',UserController.addUser);

app.put('/user/:id',UserController.updateUser);

app.put('/user/:id/pizzer',UserController.makePizzer);

app.put('/user/:id/dostawca',UserController.makeDostawca);

app.put('/user/:id/admin',UserController.makeAdmin);

app.delete('/user/:id', UserController.deleteUser);

app.get('/user/login', UserController.isLoginAvailable);

app.get('/users',UserController.getAllUsers);

app.get('/pizza',PizzaController.getPizza);

app.post('/addPizza',PizzaController.addPizza);

app.put('/pizza/:id',PizzaController.updatePizza);

app.delete('/pizza/:id',PizzaController.deletePizza);

app.listen(port, () => {
  console.log(`Aplikacja działa na http://localhost:${port}`);
});

