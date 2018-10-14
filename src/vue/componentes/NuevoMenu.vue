<template>
    <form v-on:submit.prevent="addMenu">
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
export default {
    data(){
        return{
            add:{
                nombre:'',
                descripcion:'',
                precio:'',
                estado: true,
                adicional:false
            },
            noti:{
                nombre:'',
                descripcion:'',
                precio:'',
                estado: true,
                adicional:false
            }
        }
    },
    methods:{
        addMenu(){
            alert(this.add.nombre)
             // Guardar el menú y notificar al componente TablaMenus con el menú agregado sin nececidad de hacer una nueva petición.
        },
        validarCampo(campo){
            if(campo === 'nombre'){
                if (this.add.nombre.trim().length < 4) {
                    this.noti.nombre = 'El nombre no puede ser menor a 4 caracteres.'
                }else{
                    this.noti.nombre = ''
                }
            }else if (campo === 'descripcion') {
                if (this.add.descripcion.trim().length > 81) {
                    this.noti.descripcion = 'La descripción no puede ser mayor a 81 caracteres.'
                }else{
                    this.noti.descripcion = ''
                }
            }else if (campo === 'precio') {
                if (!this.validarSiNumero(this.add.precio)) {
                    this.noti.precio = 'El número no es correcto.'
                }else{
                    this.noti.precio = ''
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
</style>
