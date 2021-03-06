new Vue({
	el:'#dash',
	data:{
		vendidosdia:'',
		masvendido: "-------",
		cantidad_vendida: '',
		menus:[],
		total:0,
		fecha:'',
		estado:'',
		pedidos:[],
		add:{
			nombre:'',
			descripcion:'',
			precio:'',
			adicional:false,
			estado:true,
		},
		update:{
			nombre:'',
			descripcion:'',
			precio:'',
			estado:'',
			adicional:'',
		},
		noti:{
			nombre:'',
			descripcion:'',
			precio:'',
			imagen:""
		}
	},
	mounted:function(){
		document.addEventListener('DOMContentLoaded', ()=> {
			// Botones flotantes
			let fixedActionBtn = M.FloatingActionButton.init(document.querySelectorAll('.fixed-action-btn'), {});
			let actualizarMenu = M.Modal.init(document.querySelectorAll('#actualizarMenu'), {dismissible:false});
			let tooltip = M.Tooltip.init(document.querySelectorAll('.tooltipped'), {});
			let sidenav = M.Sidenav.init(document.querySelectorAll('.sidenav'), {});
		})
	},
	created:function(){

	},
	methods:{
		getMenus:function(){
			
		},
		getImagen(e){
	
		},
		addMenu:function(){
			
			if (this.add.nombre.length < 5) {
				this.noti.nombre = "Escribe un nombre válido"
			}else if (this.add.descripcion.length < 10) {
				this.noti.nombre = ""
				this.noti.descripcion = "La descripción debe ser mayor a 10 y menor a 50 caracteres"				
			}else if (this.add.descripcion.length > 50) {
				this.noti.nombre = ""
				this.noti.descripcion = "La descripción debe ser menor a 50 caracteres"				
			}else if (!/^([0-9])*$/.test(this.add.precio)) {
				this.noti.nombre = ""
				this.noti.descripcion = ""
				this.noti.precio = "Escribe un valor válido"
			}else if (this.add.precio.length < 2) {
				this.noti.nombre = ""
				this.noti.descripcion = ""
				this.noti.precio = "Escribe un valor válido"
			}else{
				this.noti.nombre = ""
				this.noti.descripcion = ""
				this.noti.precio = ""
				// Guardar en la base de datos con axios
				alert('Los datos están listos. '+this.add.precio.length)
			}

			 
			

		},
		updateMenu:function(menu, q){
			
		},
		deleteMenu:function(id){
			// Aún no se esta llamando dentro del documento
			
		},
		updateEstado:function(menu){
			
		},
		llenarModal:function(menu){
			if (menu.adicional == 'SI') {
				menu.adicional = true
			}else{
				menu.adicional = false
			}
			this.update = menu;
		},
		getPedidos:function(){
			
		},
		momentjs:function(fecha){
			return moment(fecha).fromNow();
		},
		number_format:function(amount, decimals) {
	    amount += ''; // por si pasan un numero en vez de un string
	    amount = parseFloat(amount.replace(/[^0-9\.]/g, '')); // elimino cualquier cosa que no sea numero o punto
	    decimals = decimals || 0; // por si la variable no fue fue pasada
	    // si no es un numero o es igual a cero retorno el mismo cero
	    if (isNaN(amount) || amount === 0)
	        return parseFloat(0).toFixed(decimals);
			    // si es mayor o menor que cero retorno el valor formateado como numero
			    amount = '' + amount.toFixed(decimals);
			    var amount_parts = amount.split('.'),
			        regexp = /(\d+)(\d{3})/;
			    while (regexp.test(amount_parts[0]))
			        amount_parts[0] = amount_parts[0].replace(regexp, '$1' + ',' + '$2');
			    return amount_parts.join('.');
			}
		}
})