require("dotenv").config({path:'.env'});

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const connectDB =  process.env.CONNECT_DB;
const connectServer = connectDB;

mongoose.connect(connectServer, 
    { useNewUrlParser: true, 
      useUnifiedTopology: true })
    .then(() => {
        console.log('conectei a base')
        app.emit('pronto');
    })
    .catch(e => console.log(e));

const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const routes = require('./routes');
const path = require('path');
const helmet = require('helmet');
const { middlewareGlobal, checkCsrfError, CsrfMiddleware } = require('./middlewares/middleware')
const csrf = require('csurf');

app.use(helmet({contentSecurityPolicy: false}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, '..', '..', 'public')))



const sessionOptions = session({
    secret: "qasfaewqqwfasdf adgagasghz sdgsghs aasfaf",
    store: MongoStore.create({ mongoUrl: connectServer }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
});

app.use(sessionOptions);
app.use(flash());

app.set('views', path.resolve('views'));
app.set('view engine', 'ejs');

app.use(csrf());

//Middlewares
app.use(middlewareGlobal);
app.use(checkCsrfError);
app.use(CsrfMiddleware);
app.use(routes)


app.on('pronto', () => {
    app.listen(3000, () => {
        console.log('servidor rodand na porta 3000');
    });
})

