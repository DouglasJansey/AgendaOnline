import 'core-js/stable';
import 'regenerator-runtime/runtime'
import Cadastro from './modules/Cadastro';
import Login from './modules/Login';
const login = new Login('.form-login');
const registro = new Login('.form-cadastro')
const cadastro = new Cadastro('.formCadastro')
cadastro.init();
login.init();
registro.init();