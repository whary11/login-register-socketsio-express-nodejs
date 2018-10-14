<template>
    <div>
        <div class="row">
        <div class="col l8 s12">
            <div class="card">
                <div class="card-image waves-effect waves-block waves-light" style="background-color:#66181a">
                    <h2 class="center-align titulo-tabla">TABLA DE MENÚS</h2>
                    <a class="btn-floating btn-move-up waves-effect waves-light right tooltipped" data-position="bottom" data-tooltip="Crear Menú" style="margin: 10px"><i class="large material-icons activator">add</i></a>
                    <a href="#!" style="margin: 10px" class="btn-floating btn-move-up waves-effect waves-light right tooltipped" data-position="bottom" data-tooltip="Ver PDF"><i class="material-icons">file_download</i></a>
                </div>
                <div class="card-content" style="overflow:scroll;height:450px;background: linear-gradient(#ffffff, #e5e5e5)">
                <!-- <%/* Tabla de menús creados */%> -->
                <tablmenus></tablmenus>
                </div>
                <div class="card-reveal">
                    <span class="card-title grey-text text-darken-4 center-align">Crear Nuevo Menú<i class="material-icons right">close</i></span>
                <!-- <%/* Crear menús */%> -->
                    <nuevoMenu></nuevoMenu>
                </div>
            </div>
        </div>   

  <!-- Ordenes -->
    <div class="col l4 s12">
        <ordenes></ordenes>
    </div>
    <!-- <div id="card-stats"> -->
        <!-- <div class="row"> -->
            
        <div class="divider col s12"></div>

            <div class="col s12 m6 l3">
                <div class="card">
                    <div class="card-content white-text" style="background-color:#66181a">
                        <p class="card-stats-title"><i class="mdi-social-group-add"></i> Menus Disponibles</p>
                        <h4 class="card-stats-number">4</h4>
                        <p class="card-stats-compare"><i class="material-icons tiny">access_time</i> <span class="green-text text-lighten-5">En tiempo real</span>
                        </p>
                    </div>
                    <div class="card-action darken-2" style="background-color:#66181a">
                        <div id="clients-bar" class="center-align"></div>
                    </div>
                </div>
            </div>
            <div class="col s12 m6 l3">
                <div class="card">
                    <div class="card-content lighten-1 white-text" style="background-color:#E88A10">
                        <p class="card-stats-title"><i class="mdi-editor-insert-drive-file"></i> Ordenes Hoy</p>
                        <h4 class="card-stats-number" model="pedidos">4</h4>
                        <p class="card-stats-compare"><i class="mdi-hardware-keyboard-arrow-down"></i><span class="deep-purple-text text-lighten-5">asasa</span>
                        </p>
                    </div>
                    <div class="card-action darken-2" style="background-color:#E88A10">
                        <div id="invoice-line" class="center-align"></div>
                    </div>
                </div>
            </div>
            <div class="col s12 m6 l3">
                <div class="card">
                    <div class="card-content white-text" style="background-color:#66181a">
                        <p class="card-stats-title"><i class="mdi-action-trending-up"></i> Vendido Hoy</p>
                        <h4 class="card-stats-number">10</h4>
                        <p class="card-stats-compare"><i class="material-icons tiny">access_time</i> <span class="blue-grey-text text-lighten-5">En tiempo real</span>
                        </p>
                    </div>
                    <div class="card-action darken-2" style="background-color:#66181a">
                        <div id="profit-tristate" class="center-align"></div>
                    </div>
                </div>
            </div>
            
            <div class="col s12 m6 l3">
                <div class="card">
                    <div class="card-content white-text" style="background-color:#E88A10">
                        <p class="card-stats-title"><i class="mdi-editor-attach-money"></i>Más vendido</p>
                        <h4 class="card-stats-number" style="font-size:25px;"> Patacones</h4>
                        <p class="card-stats-compare"><i class="mdi-hardware-keyboard-arrow-up"></i>12<span class="purple-text text-lighten-5">Ventas</span>
                        </p>
                    </div>
                    <div class="card-action darken-2" style="background-color:#E88A10">
                        <div id="sales-compositebar" class="center-align"></div>
                    </div>
                </div>
            </div>
            
        <!-- </div> -->
    <!-- </div> -->
<!-- <%/* Formulario para edición de menus */%> -->
    <!-- <editarMenu></editarMenu> -->
  </div>
     <!--Botones flotantes con opciones--> 
  <div class="fixed-action-btn" style="bottom: 50px; right: 19px;">
    <a class="btn-floating btn-large">
      <i class="material-icons" style="background-color:#66181a;">add</i>
    </a>
    <ul>
      <li><a href="#!" class="btn-floating green tooltipped" data-position="left" data-tooltip="Historico menús"><i class="material-icons">content_paste</i></a></li>
    </ul>
  </div>
    </div>
</template>
<script>
import Ordenes from './Ordenes.vue';
import TablaMenus from './TablaMenus.vue';
import Footer from './Footer.vue';
import NuevoMenu from './NuevoMenu.vue';
import EditarMenu from './EditarMenu.vue';
export default {
      data(){
          return{

          }
      },
      created(){
        
      },
      components:{
          'ordenes': Ordenes,
          'tablmenus': TablaMenus,
          'nuevoMenu' : NuevoMenu,
          'editarMenu' : EditarMenu,
      }
  }
</script>



