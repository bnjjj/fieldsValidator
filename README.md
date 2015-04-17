[![Coverage Status](https://coveralls.io/repos/bnjjj/fieldsValidator/badge.svg?branch=master)](https://coveralls.io/r/bnjjj/fieldsValidator?branch=master) [![Build Status](https://travis-ci.org/bnjjj/fieldsValidator.svg?branch=master)](https://travis-ci.org/bnjjj/fieldsValidator) [![NPM](https://nodei.co/npm/fieldsValidator.png)](https://npmjs.org/package/fieldsValidator)
# FieldsValidator
---------
FieldsValidator is useful to make **validation** of data with different sources like a **mongoose model**, an array of required fields, ...
With this npm you can dramatically **reduce** your code and your replication code

```
$ npm install fieldsValidator
```

# Examples

## + With a mongoose model
### `function isValidWithMongo(Model, fields, [omissions])`
#### Arguments
1. `Model` (Object): the mongoose model reference
2. `fields` (Object): the fields you want to check and validate
3. `omissions` (Array): values to omit in the schema of the Model

Here is an exemple of what you had before :
```javascript

var User = mongoose.model('Users', UserSchema);
function signup(req, res) {
	if (!req.body.password) {
		return res.status(400).send('Password is required');
	}
	else if (typeof req.body.password !== 'string') {
		return res.status(400).send('Password must be a string');
	}

	if (!req.body.email) {
		return res.status(400).send('Email is required');
	}
	else if (typeof req.body.email !== 'string') {
		return res.status(400).send('Email must be a string');
	}

        ...
        User.save();
        ....
}
```

And what you'll have with fieldsValidator : 

```javascript

var User = mongoose.model('Users', UserSchema);
function signup(req, res) {
	var error = fieldsValidator.isValidWithMongo(Users, req.body, ['hashed_password', 'salt']);

      if (error) {
        return res.status(400).send(error);
      }

      ...
      User.save();
      ....
}
```

## + With the docs of your swagger-ui
Use your docs to help your logic
### `function isValidWithSwagger(swaggerParameters, fields)`
#### Arguments
1. `swaggerParameters` (Array): the array which contained the fields of your methods in your swagger spec files
2. `fields` (Object): the fields you want to check and validate

Here is an exemple of a swagger spec files :
```javascript

{
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
    }
}
}

```

And what you'll have with fieldsValidator : 

```javascript

var User = mongoose.model('Users', UserSchema);
function signup(req, res) {
	var error = fieldsValidator.isValidWithSwagger(swaggerSpecs['/login'].post.parameters,req.body);

      if (error) {
        return res.status(400).send(error);
      }

        ...
        User.save();
        ....
}
```


## + With an array of custom required fields
### `function isValidWithCustoms(requiredFields, fields)`
#### Arguments
1. `requiredFields` (Array): the array which contained the custom required fields
2. `fields` (Object): the fields you want to check and validate

Here is an exemple of what you had before :
```javascript

var User = mongoose.model('Users', UserSchema);
function signup(req, res) {
	if (!req.body.password) {
		return res.status(400).send('Password is required');
	}
	else if (typeof req.body.password !== 'string') {
		return res.status(400).send('Password must be a string');
	}

	if (!req.body.email) {
		return res.status(400).send('Email is required');
	}
	else if (typeof req.body.email !== 'string') {
		return res.status(400).send('Email must be a string');
	}

        ...
        User.save();
        ....
}
```

And what you'll have with fieldsValidator : 

```javascript

var User = mongoose.model('Users', UserSchema);
function signup(req, res) {
	var error = fieldsValidator.checkFieldsRequired(['password', 'email'],req.body);

      if (error) {
        return res.status(400).send(error);
      }

        ...
        User.save();
        ....
}
```

# Roadmap

+ Make a function to fetch automatically the configs of your swagger

---------
Feel free to make pull request

Made by [Coenen Benjamin](https://twitter.com/BnJ25) with love

See you on [Lapetitesoeur](http://www.lapetitesoeur.fr)
