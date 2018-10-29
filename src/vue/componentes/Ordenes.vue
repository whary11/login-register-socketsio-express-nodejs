<template>
    <div class="card" style="height:520px;background-color: #2a2730">
        <div class="card-image">
            <a href="#!" class="btn-floating halfway-fab waves-effect waves-light tooltipped" data-position="button" data-tooltip="Ver o imprimir pedidos" style="background-color:#E88A10 !important;"><i class="material-icons">file_download</i></a>
            <div class="card-content">
                <h2 class="titulo-pedidos">Ultimas Ordenes</h2>
                <p class="white-text center-align lista-menus" style="color:white;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;">
                    <label>
                        <input  type="checkbox"/>
                        <span class="check"></span>
                    </label>
                    Patacones<span>..</span>Luis Raga...Hace unos minutos
                </p>
                <p class="white-text center-align lista-menus" style="color:white;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;">
                    <label>
                        <input  type="checkbox"/>
                        <span class="check"></span>
                    </label>
                    Patacones<span>..</span>Luis Raga...Hace unos minutos
                </p>
                <p class="white-text center-align lista-menus" style="color:white;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;">
                    <label>
                        <input  type="checkbox"/>
                        <span class="check"></span>
                    </label>
                    Patacones<span>..</span>Luis Raga...Hace unos minutos
                </p>
                <p class="white-text center-align lista-menus" style="color:white;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;">
                    <label>
                        <input  type="checkbox"/>
                        <span class="check"></span>
                    </label>
                    Patacones<span>..</span>Luis Raga...Hace unos minutos
                </p>
            </div>
        </div>
    </div>
</template>

<script>

</script>
<style>
    .check::before{
        /* border: 2px solid teal;  */
        border-right: 2px solid white !important;
        border-bottom: 2px solid white !important;
        /* color: yellowgreen !important; */
    }
    .check::after{
        border: 2px solid white !important; 
        /* border-right: 2px solid teal !important;
        border-bottom: 2px solid teal !important; */
        /* color: yellowgreen !important; */
    }
    label{
        color: white !important;
    }
    tr{
        border-bottom: 2px solid transparent !important
    }
</style>
