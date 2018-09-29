const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ordenSchema = new mongoose.Schema({
    nombre:String,
    correo:String,
    direccion:String,
    telefono:String,
    observacion:String,
    menus:[{ type: Schema.Types.ObjectId, ref: 'Menu' }],
    user:[{ type: Schema.Types.ObjectId, ref: 'User' }],
})

module.exports = mongoose.model('Orden', ordenSchema);