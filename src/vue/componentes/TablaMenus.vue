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
                <tr>
                <td>Algo</td>
                <td>algo</td>
                <td>$ {{ new Intl.NumberFormat().format(1000) }} </td>
                <td>
                    <div class="col s12 m8 l9">
                    <div class="switch">
                        <label>
                        <input type="checkbox">
                        <span class="lever" style="background-color:#E88A10"></span>
                        </label>
                    </div>
                    </div>
                </td>
                <td>
                    <a href="#actualizarMenu" class="btn-floating blue modal-trigger" v-on:click="llenarModal(menu)">
                    <i class="material-icons">edit</i>
                    </a>
                </td>
                <td>
                    <a v-on:click.prevent="updateEstado(menu)" class="btn-floating red"><i class="material-icons">delete</i></a>
                </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    data(){
        return{
            nombre: 'Luis Fernando Raga'
        }
    },
    created:function(){
        document.addEventListener('DOMContentLoaded', ()=> {
			// Botones flotantes
			let fixedActionBtn = M.FloatingActionButton.init(document.querySelectorAll('.fixed-action-btn'), {});
			let actualizarMenu = M.Modal.init(document.querySelectorAll('#actualizarMenu'), {dismissible:false});
			let tooltip = M.Tooltip.init(document.querySelectorAll('.tooltipped'), {});
			let sidenav = M.Sidenav.init(document.querySelectorAll('.sidenav'), {});
		})    
    },
    methods:{

    }
}
</script>
