const User = require('../app/models/user');
module.exports = (app, passport, io) => {

	// index routes
	app.get('/', (req, res) => {
		res.render('index');
	});

	//login view
	app.get('/login', (req, res) => {
		res.render('login.ejs', {
			message: req.flash('loginMessage')
		});
	});

	app.post('/login', passport.authenticate('local-login', {
		successRedirect: '/dashboard',
		failureRedirect: '/login',
		failureFlash: true
	}));

	// signup view
	app.get('/signup', (req, res) => {
		res.render('signup', {
			message: req.flash('signupMessage')
		});
	});

	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect: '/dashboard',
		failureRedirect: '/signup',
		failureFlash: true // allow flash messages
	}));

	//Conexiòn con socketIO
	app.get('/dashboard', isLoggedIn, (req, res) => {
		res.render('admin/index', {
			user: req.user
		});
	});
	//Menus
	app.get('/api/menus', (req, res)=>{
		User.find().then((docs)=>{
			return res.json(docs)
		}).catch((error)=>{
			return res.json(error)
		})
	})

	// logout
	app.get('/logout', isLoggedIn, (req, res) => {
		req.logout();
		res.redirect('/');
	});
};

function isLoggedIn (req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/');
}
