var express = require('express');
var app = express();
var bodyParser = require('body-parser');
// var path = require('path');

var mainRouter = express.Router();
// var loginRouter = express.Router();

mainRouter.use(bodyParser.urlencoded({ extended: true }));

mainRouter.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});
// loginRouter.use(bodyParser.urlencoded({ extended: true }));


//Connecting to the database
var mongoose = require('mongoose');
mongoose.connect('mongodb://kunal-login:simple-login@ds135547.mlab.com:35547/simple-login');

//Creating schema and model
var userSchema = new mongoose.Schema({
	username: String,
	password: String
});

mongoose.model('user', userSchema);
var user = mongoose.model('user');

//posting signup request
mainRouter.post('/signup',function(req,res){
	user.findOne({'username':req.body.username}, function(e,thisuser){//'thisuser' used to differentiate from global user variable
		if(e) res.status(500).send("error signup");

		else if(!thisuser){
			user.create({
				username:req.body.username,
				password:req.body.password
			}, 
			function(e,user){
				if(e) res.status(500).send("SignUp Error: Probably there was a problem with the server");
				else res.status(200).send("Successful signup for "+user.username);
			});
		}

		else res.status(300).send(user.username+" username is taken by some user");
	});
	
});

//posting login request
mainRouter.post('/login',function(req,res){
	var username = req.body.username, password = req.body.password;

	user.findOne({'username':username}, function(e,user){
		if(e) res.status(500).send("Login Error: Probably there was a problem with the server");

		else if(!user) res.status(404).send("User Not Found");

		else if(password == user.password){
			res.status(200).send("Successful login for "+user.username);
		}

		else res.status(300).send("Username and password don't match");
	});
});

//getting all users
mainRouter.get('/admin', function(req,res){
	user.find({}, function(e,users){
		res.status(200).send(users);
	});
});

//deleting user
mainRouter.delete('/admin', function(req,res){
	user.findOneAndRemove({'username':req.body.username}, function(e,user){
		res.status(200).send("user deleted");
	});
});

//Server establishment
var port = 3000;
app.listen(port, function(e){
	if(e) console.log("Error ocurred in starting the server");
	else console.log("Listening at "+port);
});

app.use('/',mainRouter);
// app.use('/login',loginRouter);