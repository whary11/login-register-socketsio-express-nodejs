<template>
    <form v-on:submit.prevent="addMenu">
        <div class="row">
            <div class="input-field col s12">
                <i class="mdi-editor-border-color prefix"></i>
                <input id="nombre" type="text" v-model="add.nombre" autocomplete="off">
                <label for="nombre" data-error="" data-success="right">Nombre</label>
                <div class="col s8 noti">
                    <span v-text="noti.nombre"></span>                
                </div>
            </div>
            <div class="input-field col s12">
                <i class="mdi-content-filter-list prefix"></i>
                <textarea class="materialize-textarea" id="descripcion" v-model="add.descripcion" data-length="50" autocomplete="off"></textarea>
                <span class="noti"></span>
                <label for="descripcion">Descripción</label>
                <div class="col s8 noti">
                    <span v-text="noti.descripcion"></span>                
                </div>
            </div>
        </div>
        <div class="row">
            <div class="input-field col s12">
                <i class="mdi-editor-attach-money prefix"></i>
                <input id="precio" type="text" v-model="add.precio" autocomplete="off">
                <span style="color:#c91e04"></span>
                <label for="precio">Precio</label>
                <div class="col s8 noti">
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
                nombre:'El nombre no es correcto',
                descripcion:'La descripción no es correcta',
                precio:'El precio no es correcto',
                estado: true,
                adicional:false
            }
        }
    },
    methods:{
        addMenu(){
            alert(this.add.nombre)
             // Guardar el menú y notificar al componente TablaMenus con el menú agregado sin nececidad de hacer una nueva petición.
        }
    }
}
</script>
<style>
    .noti{
         color:#c91e02;
         margin-left: 4% !important;
    }
</style>
