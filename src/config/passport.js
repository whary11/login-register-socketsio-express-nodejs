const LocalStrategy = require('passport-local').Strategy;
const User = require('../app/models/user');
module.exports = function (passport) {
  // required for persistent login sessions
  // passport needs ability to serialize and unserialize users out of session
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  // used to deserialize user
  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });

  // Signup
  passport.use('local-signup', new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback : true // allows us to pass back the entire request to the callback
  },
  function (req, email, password, done) {
    User.findOne({'local.email': email}, function (err, user) {
      if (err) {
        return done(err);
      }
      if (user) {
        return done(null, false, req.flash('signupMessage', 'El usuario ya esta en uso.'));
      } else {
        User.findOne({'local.nombre': req.body.nombre}, function (err, resp) {
          if (err) {
            return done(err);
          }
          if (resp) {
            return done(null, false, req.flash('signupMessage', 'El nombre ya esta en uso.'));
          }else{
            var newUser = new User();
            newUser.local.email = email;
            newUser.local.nombre = req.body.nombre;
            newUser.local.tipo_empresa = 'GRATIS';
            newUser.local.url = urlLug(req.body.nombre);
            console.log(req.body);
            newUser.local.password = newUser.generateHash(password);
            newUser.save(function (err) {
              if (err) { throw err; }
              return done(null, newUser);
            });
          }
        })


        
        
      }
    });
  }));

  // login
  // we are using named strategies since we have one for login and one for signup
  // by default, if there was no name, it would just be called 'local
  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  function (req, email, password, done) {
    User.findOne({'local.email': email}, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, req.flash('loginMessage', 'No User found'))
      }
      if (!user.validPassword(password)) {
        return done(null, false, req.flash('loginMessage', 'Wrong. password'));
      }
      return done(null, user);
    });
  }));
}

 function urlLug(strings){
    let letras = strings.split('')
    let arrayLetras = [];
    letras.map(function(letra){
      if(letra.toLowerCase()=='á'){
        arrayLetras.push('a')
      }else if(letra.toLowerCase()=='é'){
        arrayLetras.push('e')
      }else if(letra.toLowerCase()=='í'){
        arrayLetras.push('i')
      }else if(letra.toLowerCase()=='ó'){
        arrayLetras.push('o')
      }else if(letra.toLowerCase()=='.'){
          arrayLetras.push('')
      }else if(letra.toLowerCase()=='ú'){
        arrayLetras.push('u')
      }else if(letra.toLowerCase()=='ñ'){
        arrayLetras.push('n')
      }else{
        arrayLetras.push(letra.toLowerCase())
      }
    })
  return arrayLetras.toString().replace(/,/g,'').replace(/ /g,'-');
}



