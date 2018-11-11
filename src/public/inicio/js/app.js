// Inicialización Vue.js
new Vue({
	el: '#app',
	data:{
		menus:'',
		adicionales:'',
		checked:false,
		terminaste:false,
		detalle:[],
		pedido:{
			menu_pedido:[],
			nombre:'',
			correo:'',
			telefono:'',
			direccion:'',
			user_id:'',
			observaciones:'',
			total:0
		},
		noti:{
			nombre:'',
			correo:'',
			telefono:'',
			direccion:'',
			observaciones:''
		}
	},
	beforeMount:function(){
		this.menus = this.getMenus()
		this.pedido._csrf = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
		document.addEventListener('DOMContentLoaded', function() {
    		let adicionalSelect = M.FormSelect.init(document.querySelector('.adicionalSelect'), {});
    		let menuSelect = M.FormSelect.init(document.querySelector('.menuSelect'), {});
    		let slider = M.Carousel.init(document.querySelector('.carousel'), {fullWidth: false,indicators: false});
    		let instances = M.Tooltip.init(document.querySelectorAll('.tooltipped'), {});
		});
	},
	methods:{
		enviarPedido:function(){
			if (this.pedido.nombre.length < 4){
				this.noti.nombre = 'El nombre de ser igual o superior a 4 caracteres.'
			}else if(this.pedido.telefono.length < 6){
				this.noti.telefono = 'El telefono de ser  mayor a 5 caracteres.'
				this.noti.nombre = ''
			}else if(this.pedido.telefono.length > 10){
				this.noti.telefono = 'El telefono de ser menor a 11 caracteres.'
				this.noti.nombre = ''
			}else if(this.pedido.direccion.length<4){
				this.noti.direccion = 'Debe escribir una dirección valida.'
				this.noti.nombre = ''
				this.noti.telefono = ''
				this.noti.correo = ''
			}else if(this.pedido.correo.length > 0){
					if (!this.validarCorreo(this.pedido.correo)) {
						this.noti.correo = 'Ingresa un correo valido.'
						this.noti.telefono = ''
						this.noti.nombre = ''
					}else {
					// let self = this;
						axios.post('/pedidos/crear',this.pedido)
							.then((resp)=>{
								console.log(resp);
								
								this.noti.correo = ''
								this.noti.telefono = ''
								this.noti.nombre = ''
								this.pedido.correo = ''
								this.pedido.telefono = ''
								this.pedido.nombre = ''
								this.noti.direccion = ''
								this.noti.observaciones = ''
								this.pedido.direccion = ''
								this.pedido.observaciones = ''
								this.terminaste = false
								this.detalle = []
								this.pedido.total = 0
								M.toast({html: 'Hemos generado su orden', outDuration:1000});
							})
							.catch(function (error) {
								M.toast({html: 'Hay un pequeño error en el servidor', outDuration:1000});
								// console.log(error);
							});
					}
				}else {
					axios.post('/pedidos/crear',this.pedido)
						.then((resp)=>{
							console.log(resp);
							if (resp.data == 'No tienes el token.') {
								M.toast({html: 'Hay un pequeño error en el servidor.', outDuration:1000});
							}else{
								this.noti.correo = ''
								this.noti.telefono = ''
								this.noti.nombre = ''
								this.pedido.correo = ''
								this.pedido.telefono = ''
								this.pedido.nombre = ''
								this.noti.direccion = ''
								this.noti.observaciones = ''
								this.pedido.direccion = ''
								this.pedido.observaciones = ''
								this.pedido.menu_pedido = []
								this.detalle = []
								this.pedido.total = 0
								this.terminaste = false
								M.toast({html: 'Hemos generado su orden', outDuration:1000});
							}
							
						})
						.catch(function (error) {
							console.log(error);
							M.toast({html: 'Hay un pequeño error en el servidor', outDuration:1000});
						});
				}
		},
		validarCorreo:function(texto) {
			emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
		    if (emailRegex.test(texto)) {
		      return true;
		    } else {
		      return false;
		    }
		},
		agregarPedido:function(menu){
			this.pedido.menu_pedido.unshift(menu.id)
			this.detalle.unshift(menu)
			this.pedido.total += parseFloat(menu.precio)
			// M.toast({html: 'Menú agregado', outDuration:1000});
		},
		eliminarMenu(index, precio){
			this.pedido.menu_pedido.splice(index, 1)
			this.detalle.splice(index, 1)
			this.pedido.total -= parseFloat(precio)
			if(this.pedido.menu_pedido.length < 1){
				this.terminaste = false
			}
		},
		getMenus(){
			var url = window.location.pathname+'/menus';
			console.log(url);
          let menus;
			axios.get(url).then((resp)=>{
				this.menus = resp.data
				console.log(resp.data);
				
			})
		}
	}
})
