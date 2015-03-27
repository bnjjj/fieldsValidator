'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  lastname: {
    type: String,
    default: ''
  },
  firstname: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    default: '',
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  role: {
    type: String,
    default: 'user'
  },
  testNumber: {
    type: Number
  },
  testArray: {
    type: Array
  },
  birthdate: {
    type: Date,
    default: ''
  },
  hashed_password: {
    type: String,
    default: '',
  },
  salt: {
    type: String,
    default: ''
  }
}, {
  strict: false
});

var params = [{
  firstname: 'test',
  lastName: 'coucou',
  password: 'haha'
},
{
  firstname: 5,
  email: 'test'
},
{
  firstname: 'bnj',
  email: 'test',
  password: 'test'
},
{
  firstname: 'bnj',
  email: 'test',
  password: 'test',
  birthdate: 'loool'
},
{
  firstname: 'bnj',
  email: 'test',
  password: 'test',
  birthdate: new Date().toString()
},
{
  firstname: 'bnj',
  email: 'test',
  password: 'test',
  birthdate: new Date()
},
{
  firstname: 'bnj',
  email: 'test',
  password: 'test',
  color: 'lool'
}];

var requiredFields = ['firstname', 'password', 'color'];

module.exports = {
  UserModel: mongoose.model('Users', UserSchema),
  params: params,
  requiredFields: requiredFields
};
