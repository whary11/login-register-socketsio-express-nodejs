

module.exports = (io)=>{
    io.on('connection', function (socket) {
        socket.on('conectado', function (user) {
            socket.broadcast.emit('user-connected', user);
        });
    });



}