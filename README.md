*Author's note: Repose is under development. Changes are pushed frequently, so feel free to follow along.*

Repose
=======

Repose helps you create RESTful Express routes to access your Mongoose resources. It favors convention over configuration by using a simple query language, smart cascade/populate functionality, and straightforward customization parameters.

## Getting Started

```javascript
var express = require('express');
var mongoose = require('mongoose');
var repose = require('repose');

var User = mongoose.model('User');

mongoose.connect('mongodb://localhost/myapp');
var app = express();

app.use(express.json());
app.use(express.urlencoded());

// Create a controller for the User model
var UserController = new repose.Controller(User);

// Bind the routes to the express app
repose.bindRoutes(app, UserController);

app.listen(3001);

```

This will create the following routes:

```
GET /user/:id
GET /user
POST /user
```

## Query parameters

Query parameters are automatically generated based on the Mongoose schema type.



