const express = require('express');
const route = express();
const homeController = require('./controllers/homeController');
const loginController = require('./controllers/loginController');
const contatoController = require('./controllers/contatoController');

const { loginRequired } = require('./middlewares/middleware')

route.get('/', loginRequired, homeController.index);

route.get('/login/index', loginController.index)
route.post('/login/register', loginController.register)
route.post('/login/login', loginController.login)
route.get('/login/logout', loginController.logout)


route.get('/contato/index',loginRequired, contatoController.index)
route.post('/contato/register', contatoController.register);
route.get('/contato/index/:id', contatoController.saveContato);
route.post('/contato/edit/:id', contatoController.editContato);

route.get('/contato/delete/:id', contatoController.deleteContato);

module.exports = route;