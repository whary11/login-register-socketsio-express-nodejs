const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const menuSchema = new mongoose.Schema({
    nombre:String,
    descripcion:String,
    precio:String,
    estado: {
        type: Boolean,
        default: true
      },
    adicional:{
        type: Boolean,
        default: false
      },
    user:[{ type: Schema.Types.ObjectId, ref: 'User' }],
},{
    timestamps:{createdAt:'created_at'}
  })

module.exports = mongoose.model('Menu', menuSchema);