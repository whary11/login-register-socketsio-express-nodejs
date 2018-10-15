<template>
    <form v-on:submit.prevent="addMenu" enctype="multipart/form-data">
        <div class="row">
            <div class="input-field col s12">
                <i class="mdi-editor-border-color prefix"></i>
                <input @keyup="validarCampo('nombre')" id="nombre" type="text" v-model="add.nombre" autocomplete="off">
                <label for="nombre" data-error="" data-success="right">Nombre</label>
                <div class="col s10 noti">
                    <span v-text="noti.nombre"></span>                
                </div>
            </div>
            <div class="input-field col s12">
                <i class="mdi-content-filter-list prefix"></i>
                <textarea @keyup="validarCampo('descripcion')" class="materialize-textarea" id="descripcion" v-model="add.descripcion" data-length="50" autocomplete="off"></textarea>
                <span class="noti"></span>
                <label for="descripcion">Descripción</label>
                <div class="col s10 noti">
                    <span v-text="noti.descripcion"></span>                
                </div>
            </div>
        </div>
        <div class="row">
            <div class="input-field col s12">
                <i class="mdi-editor-attach-money prefix"></i>
                <input id="precio" @keyup="validarCampo('precio')" type="text" v-model="add.precio" autocomplete="off">
                <span style="color:#c91e04"></span>
                <label for="precio">Precio</label>
                <div class="col s10 noti">
                    <span v-text="noti.precio"></span>                
                </div>
            </div>
        </div>
        <div class="row">
            <div class="file-field input-field col s12">
                <div class="btn">
                    <span>Cargar imagen</span>
                    <input type="file" @change="getImagen" accept="image/png, image/jpeg">
                </div>
            <input type="text" id="file" class="file-path" placeholder="Recomendamos un ancho de 800px y un alto de 248px.">
            <span style="color:#c91e04">{{ noti.imagen }}</span>
            </div>
        </div>
        <div id="input-switches1" class="section col s4 offset-s2">
            <div class="row">
                <div>
                    <div class="switch">
                        ¿Es Adición? :
                        <label>
                            NO
                            <input type="checkbox" v-model="add.adicional">
                            <span class="lever"></span> SI
                        </label>
                    </div>
                </div>
            </div>
        </div>
        <div id="input-switches" class="section col s6">
            <div class="row">
                <div>
                    <div class="switch">
                        Disponible:
                        <label>
                            NO
                            <input type="checkbox" v-model="add.estado">
                            <span class="lever"></span> SI
                        </label>
                    </div>
                </div>
            </div>
        </div>
        <br>
        <br>
        <br>
        <div class="divider col s12"></div>
        <br>
        <br>
        <div class="col s12">
            <button class="btn" type="submit" name="action">Guardar
            <i class="mdi-content-send right"></i> </button>
        </div>
        <br><br><br>
    </form>
</template>
<script>
import axios from 'axios';
export default {
    data(){
        return{
            add:{
                nombre:'',
                descripcion:'',
                precio:'',
                estado: true,
                adicional:false,
                _csrf:''
            },
            noti:{
                nombre:'',
                descripcion:'',
                precio:'',
                estado: true,
                adicional:false,
                imagen:'',
                a:{
                    nombre:false,
                    descripcion:false,
                    precio:false,
                }
            }
        }
    },
    mounted(){
        this.add._csrf = document.querySelector('meta[name="csrf-token"]').getAttribute('content') 
    },
    methods:{
        addMenu(){

            if (!this.noti.a.nombre || !this.noti.a.descripcion || !this.noti.a.precio) {
                alert('Parece que falta información.')
            }else{
                // alert('Ahora podes guardar el menú.')
                let fd;
				if(this.add.imagen){
					fd = this.add.imagen;
					fd.append('nombre', this.add.nombre)
					fd.append('descripcion', this.add.descripcion)
					fd.append('precio', this.add.precio)
					fd.append('adicional', this.add.adicional)
					fd.append('estado', this.add.estado)
					fd.append('_csrf', this.add._csrf)
				}else{
					fd = this.add;
                }
                let url = 'api/menus';
                axios.post(url, fd)
                    .then((resp)=>{
                        console.log(resp.data);  
                    })
                    .catch((error)=>{
                        console.log(error);       
                    })              
            }
             // Guardar el menú y notificar al componente TablaMenus con el menú agregado sin nececidad de hacer una nueva petición.
        },
        validarCampo(campo){
            if(campo === 'nombre'){
                if (this.add.nombre.trim().length < 4) {
                    this.noti.nombre = 'El nombre no puede ser menor a 4 caracteres.'
                    this.noti.a.nombre = false;
                }else{
                    this.noti.nombre = ''
                    this.noti.a.nombre = true;
                }
            }else if (campo === 'descripcion') {
                if (this.add.descripcion.trim().length > 81) {
                    this.noti.descripcion = 'La descripción no puede ser mayor a 81 caracteres.'
                    this.noti.a.descripcion = false;
                }else{
                    this.noti.descripcion = ''
                    this.noti.a.descripcion = true;
                }
            }else if (campo === 'precio') {
                if (!this.validarSiNumero(this.add.precio)) {
                    this.noti.precio = 'El número no es correcto.'
                    this.noti.a.precio = false;
                }else{
                    this.noti.precio = ''
                    this.noti.a.precio = true;
                }
            }  
        },
        validarSiNumero(numero){
            var RE = /^\d*\.?\d*$/;
            if (RE.test(numero)) {
                return true;
            } else {
                return false;
            }
        },
        getImagen(e){
			this.add.imagen = e.target.files[0]
			// Validar la imagen del menú
			// console.log(this.add.imagen);
			if(this.add.imagen.size > 30000){
				console.log(`El tamaño de la imagen supera el limite permitido de 29KB, tu imagen pesa: ${this.add.imagen.size}`);	
			}else{
				console.info(`Tu imagen se puede cargar, recuerda conservar las dimensiones en el diseño, ( ancho: 800px y alto:248px )`)
			}
			let fd = new FormData();
			fd.append('imagen', this.add.imagen, this.add.imagen.name)
			this.add.imagen = fd;
		}
    }
}
</script>
<style>
    .noti{
         color:#c91e02;
         font-size: 10px;
         margin-left: 4% !important;
    }
    ::-webkit-input-placeholder { color: blue; } /* WebKit */
    ::-moz-placeholder { color: blue; } /* Firefox 19+ */
</style>
