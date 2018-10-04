const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const partnertSchema = new mongoose.Schema({
    nombre:String,
    correo:String,
    usuario:{
        type:String,
    }
    //precio:String,
    //user:[{ type: Schema.Types.ObjectId, ref: 'User' }],
},
{
    timestamps:{createdAt:'created_at'}
  })

module.exports = mongoose.model('Partnert', menuSchema);