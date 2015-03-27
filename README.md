# FieldsValidator
---------
FieldsValidator is useful to make **validation** of data with different sources like a **mongoose model**, an array of required fields, ...
With this npm you can dramatically **reduce** your code and your replication code

#Examples

##+ With a mongoose model
###`function checkSchema(Model, fields, [omissions])`
####Arguments
1. `Model` (Object): the mongoose model reference
2. `fields` (Object): the fields you want to check and validate
3. `omissions` (Array): values to omit in the schema of the Model

Here is an exemple of what you had before :
```
#!javascript

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

```
#!javascript

var User = mongoose.model('Users', UserSchema);
function signup(req, res) {
	var error = fieldsValidator.checkSchema(Users, req.body, ['hashed_password', 'salt']);

      if (error) {
        return res.status(400).send(error);
      }

      ...
      User.save();
      ....
}
```

##+ With an array of custom required fields
###`function checkFieldsRequired(requiredFields, fields)`
####Arguments
1. `requiredFields` (Array): the array which contained the custom required fields
2. `fields` (Object): the fields you want to check and validate

Here is an exemple of what you had before :
```
#!javascript

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

```
#!javascript

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

#Roadmap

+ Make a function to validate fields with the configuration files of swagger-ui

---------
Feel free to make pull request

Made by [Coenen Benjamin](https://twitter.com/BnJ25) with love
See you on [Lapetitesoeur](http://www.lapetitesoeur.fr)
