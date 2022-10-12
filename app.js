var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const prodata = require('./data/product-data');
const loginData = require('./data/login-data');
const singupData = require('./data/signup');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//  Get
app.get('/', function (req, res) {
  res.render('index',prodata);
})
app.get('/index', function (req, res) {
  res.render('index',prodata);
})

app.get('/login', function (req, res) {
  res.render('login');
})

app.get('/about', function (req, res) {
  res.render('about');
})
app.get('/contact', function (req, res) {
  res.render('contact');
})
app.get('/product', function (req, res) {
  res.render('product',prodata);
})
app.get('/signup', function (req, res) {
  res.render('signup');
})

app.get('/profile', async function (req, res) {
  res.render('profile', {user:"Rahman"});
 
})
// POST

app.post('/login', async function (req, res) {
  let userEmail= req.body.user_email;
  let userPass= req.body.user_password;
  let userData = await loginData(userEmail,userPass);
  if(typeof userData !== 'undefined') {
    res
    .cookie('userData', JSON.stringify(userData), { path: '/' })
    .redirect('/');
  }
  else {
    res.render('login', {
      error: error,
      reqData: {
        user_email: userEmail,
        user_password: userPass
      }
    })
  }
})
app.get('/logout', function(req, res) {res
  res
  .cookie('userData', '', { path: '/', maxAge: 10 })
  .redirect('/')
})

app.post('/signup',async function (req, res) {
  let userName = req.body.user_name;
  let userEmail = req.body.user_email;
  let userPass = req.body.user_password;
  let userSingupdata= await singupData(userName,userEmail,userPass);
  console.log("singup Done")
  if(typeof userSingupdata !== 'undefined') {
    res
    .cookie('userSingupdata', JSON.stringify(userSingupdata), { path: '/' })
    .redirect('/login',{massage : 'welcome ,'+req.body.userName});
  }
  else {
    res.render('signup')
    
  }
  
})
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
