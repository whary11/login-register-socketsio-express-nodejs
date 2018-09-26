const mongoose = require('mongoose');
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
    tipo_empresa: {
      type: String,
      default: 'GRATIS' // PLAN-1, PLAN-2, PLAN-3
    },
    partnert_id:String,
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
