

module.exports = (io)=>{
    // Escuchando eventos
    io.on('connection', function (socket) {

        
        socket.on('conectado', function (user) {
            console.log(user);
            socket.broadcast.emit('user-connected', user);
        });
    });



}