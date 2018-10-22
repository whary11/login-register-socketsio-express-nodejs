const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const userSchema = new mongoose.Schema({
  local: {
    nombre:{
      type: String,
      trim: true
    },
    email: String,
    password: String,
    url:String,
    color1:{
      type: String,
      default: ''
    },
    color2:{
      type: String,
      default: ''
    },
    color:{
      type: String,
      default: ''
    },
    avatar:{
      type: String,
      default: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Vue.js_Logo.svg/600px-Vue.js_Logo.svg.png'
    },
    tipo_empresa: {
      type: String,
      default: 'GRATIS' // PLAN-1, PLAN-2, PLAN-3
    },
    tipo_negocio:{
      type:String,
      default:'DOMICILIOS' //FIJO
    },
      created_at:{
      type:Date,
      default:new Date()
    },
    sucursales:[{ type: Schema.Types.ObjectId, ref: 'User' }],
    partnert:[{ type: Schema.Types.ObjectId, ref: 'Parnert' }],
  },
  facebook: {
    id: String,
    token: String,
    email: String,
    password: String
  },
  twitter: {
    id: String,
    token: String,
    email: String,
    password: String
  },
  google: {
    id: String,
    token: String,
    email: String,
    password: String,
  }
},
{
  timestamps:{createdAt:'created_at'}
});

// generating a hash
userSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.local.password);
};

// create the model for user and expose it to our app
module.exports = mongoose.model('User', userSchema);
