const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const partnertSchema = new mongoose.Schema({
    nombre:String,
    correo:String,
    usuario:{
        type:String,
        default:´@${this.nombre}´
    }
    //precio:String,
    //user:[{ type: Schema.Types.ObjectId, ref: 'User' }],
})

module.exports = mongoose.model('Partnert', menuSchema);