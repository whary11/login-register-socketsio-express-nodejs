const User = require('../app/models/user');
const Menu = require('../app/models/menu');
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

function isLoggedIn (req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/');
}
