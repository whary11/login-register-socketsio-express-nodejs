const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ordenSchema = new mongoose.Schema({
    nombre:String,
    correo:String,
    direccion:String,
    telefono:Number,
    observacion:String,
    total:Number,
    despachado:{
        type: Boolean,
      default: false
    },
    menus:[{ type: Schema.Types.ObjectId, ref: 'Menu' }],
    user:[{ type: Schema.Types.ObjectId, ref: 'User' }],
},{
    timestamps:{createdAt:'created_at'}
  })

module.exports = mongoose.model('Orden', ordenSchema);