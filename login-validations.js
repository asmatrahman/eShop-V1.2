let loginValidation = function(req, res, next) {
    console.log('this is the middleware function')
    let userEmail = req.body.user_email;
    let userPass = req.body.user_password;
    let error = {
      emailError: '',
      passError: ''
    };
    if(userEmail == '') {
      error.emailError = 'Email field is mandatory!';
    }
    if(userPass == '') {
      error.passError = 'Please enter your password!';
    }
    if(error.emailError == '' && error.passError == '') {
      next();
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
  };
  
  module.exports = loginValidation;