

module.exports = (io)=>{
    // Escuchando eventos de las ordenes
    io.on('connection', function (socket) {
        socket.on('nuevoPedido', (pedido)=>{
            io.emit('nuevaOrden-'+pedido.user[0],pedido)
        })
    });

    



}