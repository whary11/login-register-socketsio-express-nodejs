const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    nombre:String,
    descripcion:String,
    precio:String,
    user_id:String,
})

module.exports = mongoose.model('Menu', menuSchema);