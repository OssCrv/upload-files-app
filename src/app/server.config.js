require('dotenv').config();

const express = require('express');
const path = require('path');
const session = require('express-session');


const connection = require('./db')
const indexRouter = require('./routes/router');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('port', process.env.APP_PORT || 7070);

// connecting route to database
app.use(function (req, res, next) {
    req.con = connection
    next()
})

//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser()); require('cookie-parser')
app.use('/resources', express.static(path.join(__dirname, '../public')));



app.use(session({
    secret: '1234567890QWERT',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000, path: '/' }
}));

app.use('/', indexRouter);

module.exports = app;