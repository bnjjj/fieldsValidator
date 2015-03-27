# FieldsValidator

FieldsValidator is useful to make validation of data with different sources like a mongoose model, an array of required fields, ...

##With a mongoose model
###function checkSchema(Model, fields, [omissions])
####Arguments
1. Model (Object): the mongoose model reference
2. fields (Object): the fields you want to check and validate
3. omissions (Array): values to omit in the schema of the Model

Here is an exemple of what you had before :
```
#!javascript

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

mongoose.model('Users', UserSchema);
function signup(req, res) {
	var error = paramsValidator.checkSchema(Users, req.body, ['hashed_password', 'salt']);

      if (error) {
        return res.status(400).send(error);
      }

      ...
      User.save();
      ....
}
```

##With an array of custom required fields
###function checkFieldsRequired(requiredFields, fields)
####Arguments
1. requiredFields (Array): the array which contained the custom required fields
2. fields (Object): the fields you want to check and validate

Here is an exemple of what you had before :
```
#!javascript

mongoose.model('Users', UserSchema);
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

function signup(req, res) {
	var error = paramsValidator.checkFieldsRequired(['password', 'email'],req.body);

      if (error) {
        return res.status(400).send(error);
      }

        ...
        User.save();
        ....
}
```