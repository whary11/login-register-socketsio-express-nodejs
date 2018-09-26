const express = require('express');
const app = express();
const path = require('path');
var server = require('http').Server(app);
var io = require('socket.io')(server, {'transports': ['websocket', 'polling']});

const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const { url } = require('./config/database.js');
// Conexiòn a mongodb
mongoose.connect(url, {
	useMongoClient: true
});

// conexiòn con socketIO
require('./realtime/sockets')(io)


require('./config/passport')(passport);

// settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middlewares
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
// required for passport
app.use(session({
	secret: 'menusfacil-pablo-lraga',
	resave: false,
	saveUninitialized: false,
	cookie : {  maxAge : 6000000 }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// routes
require('./app/routes.js')(app, passport);

// static files
app.use(express.static(path.join(__dirname, 'public')));

// start the server
server.listen(app.get('port'), () => {
	console.log('Escuchado en el puerto', app.get('port'));
});
