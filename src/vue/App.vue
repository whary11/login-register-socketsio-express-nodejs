<template>
    <div>
    <ul id="slide-out" class="sidenav">
        <li>
            <div class="user-view">
                <a><img class="circle" width="190" src="/admin/img/logo2.png"></a>
                <a href="http://menusfacil.com/cliente/menus-facil" target="_blank"><span class="gray-text name">Menús Fácil</span></a>
                <a href="#"><span class="gray-text email">whary11@gmail.com</span></a>
            </div>
        </li>
        <!-- Rutas  -->

        <!-- Escirtorio -->
        <li><div class="divider"></div></li>
        <router-link tag="li" to="/dashboard">
            <a class="sidenav-close"><i class="material-icons">home</i>Escritorio</a>
        </router-link>
        <!-- Crear Sucursales -->
        <li><div class="divider"></div></li>
        <router-link tag="li" to="/dashboard/sucursales">
            <a class="sidenav-close"><i class="material-icons">restaurant</i>Crear Sucursales</a>
        </router-link>
        <!--  -->
        <!-- Actualizar cuenta -->
        <li><div class="divider"></div></li>
        <router-link tag="li" to="/dashboard/actualizar-cuenta">
            <a class="sidenav-close"><i class="material-icons">monetization_on</i>Actualizar cuenta</a>
        </router-link>
        <!--  -->
        <li><div class="divider"></div></li>
        <li><a class="sidenav-close" href="#!">Cerrar<i class="material-icons">keyboard_backspace</i></a></li>
        <li><div class="divider"></div></li>
        <li><a href="/logout" >Cerrar Sesión<i class="material-icons">power_settings_new</i></a></li>
    </ul>
    <div class="navbar-fixed">
        <nav>
            <div class="nav-wrapper" style="background-color:#2a2730">
                <div href="#" data-target="slide-out" style="cursor: pointer;" class="sidenav-trigger" id="menuLateral"><i class="material-icons large">menu</i></div>
                <a class="brand-logo center">
                    <img src="admin/img/logo-menusfacil.svg" alt="Menus Facil Logo" width="100px" class="imagen-logo">
                </a>
                <ul class="right hide-on-med-and-down">
                <li>
                    <a class="dropdown-item" href="/logout">
                        <i class="material-icons">power_settings_new</i>
                    </a>
                </li>
                </ul>
            </div>
        </nav>
        

    </div>
    <div>
        <!-- Aquí se muestran los componetes de las rutas -->
        <router-view/>
    </div>
</div>    
  
</template>

<script>
import Ordenes from './componentes/Ordenes.vue';
import TablaMenus from './componentes/TablaMenus.vue';
import Footer from './componentes/Footer.vue';
import NuevoMenu from './componentes/NuevoMenu.vue';
import EditarMenu from './componentes/EditarMenu.vue';
import Escritorio from './componentes/Escritorio.vue';
  export default {
      data(){
          return{
              nombre:'Luis Raga'

          }
      },
      created(){
        document.addEventListener('DOMContentLoaded', ()=> {
			// Botones flotantes
			let fixedActionBtn = M.FloatingActionButton.init(document.querySelectorAll('.fixed-action-btn'), {});
			let actualizarMenu = M.Modal.init(document.querySelectorAll('#actualizarMenu'), {dismissible:false});
			let tooltip = M.Tooltip.init(document.querySelectorAll('.tooltipped'), {});
			let sidenav = M.Sidenav.init(document.querySelectorAll('.sidenav'), {});
		})  
      },
      components:{
          'ordenes': Ordenes,
          'tablmenus': TablaMenus,
          'nuevoMenu' : NuevoMenu,
          'editarMenu' : EditarMenu,
          'escritorio' : Escritorio
      }
  }
</script>
