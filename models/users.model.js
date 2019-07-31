import mongoose from 'mongoose'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'

import { USER_ROLES_ADMIN, USER_ROLES_EMPLOYEE } from '../utils/constants'

const { Schema } = mongoose;

const UsersSchema = new Schema({
  email: String,
  name: String,
  userRole: {
    type: String,
    enum: [ USER_ROLES_ADMIN, USER_ROLES_EMPLOYEE ]
  },
  hash: String,
  salt: String,
});

UsersSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UsersSchema.methods.validatePassword = function(password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.hash === hash;
};

UsersSchema.methods.generateJWT = function() {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  return jwt.sign({
    email: this.email,
    name: this.name,
    userRole: this.userRole,
    id: this._id,
    exp: parseInt(expirationDate.getTime() / 1000, 10),
  }, 'secret');
}

UsersSchema.methods.toAuthJSON = function() {
  return {
    _id: this._id,
    email: this.email,
    name: this.name,
    userRole: this.userRole,
    token: this.generateJWT(),
  };
};

mongoose.model('Users', UsersSchema);