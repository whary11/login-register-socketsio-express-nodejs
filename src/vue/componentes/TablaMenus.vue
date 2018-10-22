<template>
    <div>
        <table id="tablaMenus" class="centered">
            <thead>
                <tr>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Precio</th>
                <th>Estado</th>
                <th colspan="4">Opciones</th>
                </tr>
            </thead>   
            <tbody>
                <tr v-for="(menu, index) in menus" :key="index">
                    <td>{{menu.nombre}}</td>
                    <td>{{menu.descripcion}}</td>
                    <td>$ {{ new Intl.NumberFormat().format(menu.precio) }} </td>
                    <td>
                        <div class="col s12 m8 l9">
                        <div class="switch">
                            <label>
                            <input type="checkbox" v-model="menu.estado" @change="actualizarMenu(menu)">
                            <span class="lever" style="background-color:#E88A10"></span>
                            </label>
                        </div>
                        </div>
                    </td>
                    <td>
                        <a href="#actualizarMenu" class="btn-floating blue modal-trigger" @click="llenarModal(menu)"> 
                        <i class="material-icons">edit</i>
                        </a>
                    </td>
                    <td>
                        <a v-on:click.prevent="eliminarMenu(menu)" class="btn-floating red"><i class="material-icons">delete</i></a>
                    </td>
                </tr>
            </tbody>
        </table>

        <div id="actualizarMenu" class="modal modal-fixed-footer" >
            <div class="modal-content">
                <h4 class="center-align">Editar Menú</h4>
                <div class="row">
                    <form class="col s12" @submit.prevent="actualizarMenu()">
                        <div class="row">
                            <div class="input-field col s6">
                                <i class="mdi-action-add-shopping-cart small"></i>
                                <input id="nobre" type="text" class="validate" data-length="10" v-model="update.nombre">
                            </div>
                            <div class="input-field col s6">
                                <i class="mdi-editor-attach-money small"></i>
                                <input id="precio" type="text" class="validate" v-model="update.precio">
                            </div>
                            <div class="input-field col s12">
                                <i class="mdi-maps-restaurant-menu small"></i>
                                <textarea id="descripcion" class="materialize-textarea" data-length="120" v-model="update.descripcion"></textarea>
                            </div>
                            <div id="input-switches1" class="section">
                            <div class="row section">
                                <div class="col s12 m8 l9">
                                <div class="switch">
                                    ¿Es Adición? :
                                    <label>
                                    NO
                                    <input type="checkbox" v-model="update.adicional">
                                    <span class="lever"></span> SI
                                    </label>
                                </div>
                                </div>
                            </div>
                            </div>

                            <div class="col s12 m8 l9">
                            <div class="switch">
                                Disponible :
                                <label>
                                NO
                                <input type="checkbox" v-model="update.estado">
                                <span class="lever"></span> SI
                                </label>
                            </div>
                            </div>
                        </div>
                        <button class="btn waves-effect waves-light grey darken-4" type="submit">Guardar</button>
                    </form>
                </div>
            </div> 
            <div class="modal-footer">
                <a href="#!" class="modal-close waves-effect waves-green btn-flat">Salir</a>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    data(){
        return{
            menus:[],
            update:'',
            actualizar:''
        }
    },
    mounted:function(){
        
        document.addEventListener('DOMContentLoaded', ()=> {
            // let formulario = document.querySelectorAll('#actualizarMenu')
			// let actualizar = M.Modal.init(formulario, {dismissible:true});
        })
        this.getMenus();

    },
    created:function(){
        // Lógica
		


    },
    methods:{
        getMenus(){
            let url = '/api/menus'
            let self = this;
            axios.get(url).then(resp=>{
                self.menus = resp.data;              
            }).catch(error=>{
                console.log(error);
            })
        },
        llenarModal(menu){
            let formulario = document.querySelectorAll('#actualizarMenu')
            let actualizar = M.Modal.init(formulario, {dismissible:true});
            this.actualizar = actualizar;
            this.update = menu  
        },
        actualizarMenu(menu){
            if(menu){
                // Actualizar sólo es estado del menú
                menu._csrf = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                let url = '/api/menus';
                // this.update._csrf = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                // console.log(this.update)
                axios.put(url, menu).then(resp=>{
                    M.toast({
                        html:'Estado actualizado.',
                        outDuration:1000,
                        // position:'left'
                    });
                })
            }else{

                // Actualizar todo el menú
                let url = '/api/menus';
                this.update._csrf = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                
                let self = this;
                axios.put(url, this.update).then(resp=>{
                        // self.actualizar.close()
                        M.toast({
                            html:'Menú actualizado.',
                            outDuration:1000,
                            // position:'left'
                        });
                }).catch(error=>{console.log(error)})
                // console.log(this.update)
            }
            
        },
        eliminarMenu(menu){
            this.menus.splice(menu, 1);
            M.toast({
                html:'Menú eliminado.',
                outDuration:1000,
                // position:'left'
            });
        }
    }
}
</script>
