const User = require('./models/User');
const Menu = require('../app/models/Menu');
const csurf = require('csurf')
const csrfProtection = csurf({ cookie: true })

module.exports = (app, passport, io) => {

	//Si no existe el token
	app.use(csurf({ cookie: true }))
	app.use(function (err, req, res, next) {
		console.log(err);
		if (err.code !== 'EBADCSRFTOKEN') return next(err)
		// Enviar error si no existe el token
		res.send('no tienes el token')
	  })
	// index routes
	app.get('/', (req, res) => {
		res.render('index');
	});
	//login view
	app.get('/login',csrfProtection, (req, res) => {
		res.render('login.ejs', {
			message: req.flash('loginMessage'),
			csrfToken: req.csrfToken()			
		});
	});
	app.post('/login', passport.authenticate('local-login', {
		successRedirect: '/dashboard',
		failureRedirect: '/login',
		failureFlash: true
	}));
	// signup view
	app.get('/signup',csrfProtection, (req, res) => {
		res.render('signup', {
			message: req.flash('signupMessage'),
			csrfToken: req.csrfToken()
		});
	});
	app.post('/signup', csrfProtection,passport.authenticate('local-signup', {
		successRedirect: '/dashboard',
		failureRedirect: '/signup',
		failureFlash: true, // allow flash messages
		
	}));
	//Dashboard
	app.get('/dashboard', isLoggedIn, (req, res) => {
		res.render('admin/index', {
			user: req.user
		});
	});
	//Menus
	app.get('/api/menus',isLoggedIn, (req, res)=>{
		Menu.find()
			.populate({path:'user', select:'local.nombre _id',} )
			.exec((error, menus)=>{
				console.log(req.user);
				
				if (error) {
					return handleError(err);
				}
				return res.json(menus)
		});
	})
	// Proteger esta ruta despuès que se hagan todas las pruebas de seguridad
	app.post('/menus',(req, res)=>{
		let menu = new Menu({
			nombre:req.body.nombre,
			descripcion:req.body.descripcion,
			precio:req.body.precio,
			user:req.body.user_id,
		});
		menu.save(function (err) {
			if (err){
				return handleError(err);
			}else{			
				return menu;
			}
		})
		return res.json(menu)
	})
	// logout
	app.get('/logout', isLoggedIn, (req, res) => {
		req.logout();
		res.redirect('/');
	});
};

//////////////// Midellwares ////////////////////////

/////////Validar si los usuarios està autenticados en las rutas que se utilice

function isLoggedIn (req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/');
}
