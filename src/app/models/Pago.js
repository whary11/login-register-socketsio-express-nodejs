const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const pagoSchema = new mongoose.Schema({
    correo_comprador:String,
    medio_pago:String,
    banco:String,
    ip_transaccion:String,
    codigo_referencia:String,
    codigo_respuesta_payu:String,
    mensaje_payu:String,
    fecha_transaccion:{
        type:Date,
        default:new Date(),
    },
    id_transaccion:String,
    id_transaccion:String,
    id_transaccion:String,
    user:[{ type: Schema.Types.ObjectId, ref: 'User' }],
    created_at:{
        type:Date,
        default:new Date()
    }
})

module.exports = mongoose.model('Pago', pagoSchema);