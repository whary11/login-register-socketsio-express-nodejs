<template>
    <div>
  

    </div>
</template>

<script>
  export default {
      data(){
          return{
              nombre:'Luis Raga'

          }
      },
      mouted(){
          document.addEventListener('DOMContentLoaded', ()=> {
			// Botones flotantes
			let fixedActionBtn = M.FloatingActionButton.init(document.querySelectorAll('.fixed-action-btn'), {});
			let actualizarMenu = M.Modal.init(document.querySelectorAll('#actualizarMenu'), {dismissible:false});
			let tooltip = M.Tooltip.init(document.querySelectorAll('.tooltipped'), {});
			let sidenav = M.Sidenav.init(document.querySelectorAll('.sidenav'), {});
		})
      }

  }
</script>
