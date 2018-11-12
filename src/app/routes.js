const User = require('./models/User');
const Menu = require('../app/models/Menu');
const Orden = require('../app/models/Orden');
const csurf = require('csurf')
const csrfProtection = csurf({ cookie: true})

module.exports = (app, passport, io) => {
	//Si no existe el token
	app.use(csurf({ cookie: true}))
	app.use((err, req, res, next) => {
		// console.log(req);		
		if (err.code !== 'EBADCSRFTOKEN') return next(err)
		// Enviar error si no existe el token
		res.send('No tienes el token.')
	  })
	// index (Página principal)
	app.get('/', (req, res) => {
		res.render('index');
	});
	// Página para hacer pedidos
	app.get('/clientes/:url/',csrfProtection, (req, res)=>{
		// res.json(req.params)
		 User.findOne({ 'local.url': req.params.url } ,'local.email _id',(err, usuario)=>{
		 	// Retornar los menús disponibles según el estado marcado por la empresa.
		 	let condicion = { 
				eliminado:false,
		 		estado:true,  
				user: usuario._id 
		 	}
			Menu.find(condicion, (error, menus)=>{
				res.render('cliente/cliente',{
					menus,
					csrfToken: req.csrfToken(),
				})
			 }) 
		})
	})
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
		successRedirect:'/dashboard',
		failureRedirect:'/signup',
		failureFlash: 	true,
	}));
	//Dashboard
	app.get('/dashboard',isLoggedIn,csrfProtection,(req, res) => {
		res.render('admin/index', {
			user: 		req.user,
			csrfToken: 	req.csrfToken(),
		});
	});
	//GET Menus para dashboard
	app.get('/api/menus', isLoggedIn,(req, res)=>{
		Menu.find({ user: req.user._id }).populate({
						path:'user',
						select:'local.nombre local.tipo_empresa local.tipo_negocio _id',
						match:{_id:req.user._id}
					})
			.exec((error, menus)=>{
				if (error) {
					return handleError(err);
				}
				let newMenus= [];
				menus.map(menu=>{
					// Condicionar los menus que se envian.
					if (menu.user.length != []) {
						newMenus.push(menu)				
					}
				})
				return res.json(newMenus)
		});
	})
	//GET Menus para hacer pedidos
	app.get('/clientes/:url/menus', (req, res)=>{
		User.findOne({ 'local.url': req.params.url } ,'local.email _id',(err, usuario)=>{
			// Retornar los menús disponibles según el estado marcado por la empresa.
			let condicion = { 
				eliminado:false,
				estado:true,  
				user: usuario._id 
			}
			Menu.find(condicion, (error, menus)=>{
				res.json(menus)
			})
		}) 
	})

	// PUT Menus (Actualización de los menus y estado del mismo)
	app.put('/api/menus',isLoggedIn,csrfProtection,(req, res)=>{
		Menu.findOne({
			_id: req.body._id
		  })
		  .then((menu) => {
			menu.nombre = 		req.body.nombre,
			menu.descripcion =	req.body.descripcion,
			menu.precio =     	req.body.precio,
			menu.estado = req.body.estado,
			menu.eliminado = req.body.eliminado
			menu.adicional = req.body.adicional
			menu
			  .save()
			  .then(() => {
				res.jsonp(menu); // enviamos la boleta de vuelta
			  });
		  });
	})
	// POST Menus
	app.post('/api/menus',isLoggedIn,csrfProtection,(req, res)=>{				
		let menu = new Menu({
		 	nombre:req.body.nombre,
		 	descripcion:req.body.descripcion,
		 	precio:req.body.precio,
		 	user:req.user._id,
		});
		// menu.user.push(req.user.user_id)
		menu.save(function (err) {
		 	if (err){
		 		return handleError(err);
		 	}else{		
				return res.json(menu) 
		 	}
		})	
	})
//Api de pedidios
///Crear
app.post('/api/ordenes', csrfProtection, (req, res)=>{
	let orden = new Orden({
		nombre:req.body.nombre,
		correo:req.body.correo,
		direccion:req.body.direccion,
		telefono:req.body.telefono,
		observacion:req.body.observaciones,
		menus:req.body.menu_pedido,
		user:req.body.user_id,
		total:req.body.total,
	})
	orden.save(function (err) {
		if (err){
			return handleError(err);
		}else{
				
			return res.json(orden) 
		}
   })
})
//GET Menus para dashboard
app.get('/api/ordenes', isLoggedIn,(req, res)=>{	
	Orden.find({ user: req.user._id }).populate({
					path:'user',
					select:'local.nombre local.tipo_empresa local.tipo_negocio _id',
					match:{_id:req.user._id}
				})
		.exec((error, ordenes)=>{
			if (error) {
				return handleError(err);
			}
			let newOrdenes= [];
			ordenes.map(orden=>{
				// Condicionar los menus que se envian.
				if (orden.user.length != []) {
					newOrdenes.push(orden)				
				}
			})
			return res.json(newOrdenes)
	});
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
