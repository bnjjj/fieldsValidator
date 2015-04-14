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
  },
  colorType: {
    type: Number
  },
  public: {
    type: Boolean
  },
  friends: {
    type: Array
  }
}, {
  strict: false
});

var params = [{
  firstname: 'test',
  lastName: 'coucou',
  password: 'haha'
}, {
  firstname: 5,
  email: 'test'
}, {
  firstname: 'bnj',
  email: 'test',
  password: 'test'
}, {
  firstname: 'bnj',
  email: 'test',
  password: 'test',
  birthdate: 'loool'
}, {
  firstname: 'bnj',
  email: 'test',
  password: 'test',
  birthdate: new Date().toString()
}, {
  firstname: 'bnj',
  email: 'test',
  password: 'test',
  birthdate: new Date()
}, {
  firstname: 'bnj',
  email: 'test',
  password: 'test',
  color: 'lool'
}, {
  firstname: 'bnj',
  email: 56,
  password: 'test',
  color: 'lool'
},
{
  firstname: 'bnj',
  email: 'test',
  password: 'test',
  colorType: 'lool'
},
{
  firstname: 'bnj',
  email: 'test',
  password: 'test',
  public: []
},
{
  firstname: 'bnj',
  email: 'test',
  password: 'test',
  friends: 'coucou'
},
{
  firstname: 'bnj',
  email: 'test',
  password: 'test',
  age: 'coucou'
},
{
  firstname: 'bnj',
  email: 'test',
  password: 'test',
  age: '89'
}];


var swaggerObj = {
  paths: {
    '/login': {
      post: {
        tags: ['auth'],
        summary: 'Login',
        operationId: 'login',
        parameters: [{ in : 'formData',
          name: 'email',
          description: 'email to login',
          required: true,
          type: 'string'
        }, { in : 'formData',
          name: 'password',
          description: 'password to login',
          required: true,
          type: 'string'
        }]
      }
    },
    '/signup': {
      post: {
        tags: ['auth'],
        summary: 'Signup',
        operationId: 'signup',
        parameters: [{ in : 'formData',
          name: 'email',
          description: 'email to login',
          required: true,
          type: 'string'
        }, { in : 'formData',
          name: 'password',
          description: 'password to login',
          required: true,
          type: 'string'
        }, { in : 'formData',
          name: 'firstname',
          description: 'firstname to signup',
          required: false,
          type: 'string'
        }, { in : 'formData',
          name: 'birthdate',
          description: 'birthdate',
          required: false,
          type: 'date'
        }, { in : 'formData',
          name: 'age',
          description: 'birthdate',
          required: false,
          type: 'integer'
        }],
      }
    }
  }
};

var badSwaggerObj = {
  paths: {
    '/login': {
      post: {
        tags: ['auth'],
        summary: 'Login',
        operationId: 'login',
        parameters: [{ in : 'formData',
          name: 'email',
          description: 'email to login',
          required: true,
          type: 'loool'
        }, { in : 'formData',
          name: 'password',
          description: 'password to login',
          required: true,
          type: 'string'
        }]
      }
    }
  }
};

var requiredFields = ['firstname', 'password', 'color'];

module.exports = {
  UserModel: mongoose.model('Users', UserSchema),
  params: params,
  requiredFields: requiredFields,
  swaggerObj: swaggerObj,
  badSwaggerObj: badSwaggerObj
};
