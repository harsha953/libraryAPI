var express = require('express');
var chalk = require('chalk');
var mongoose = require('mongoose'); 
var bodyParser = require('body-parser');
var argv = require('minimist')(process.argv.slice(2)); 
var promise = require('bluebird');
var mongoose = promise.promisifyAll(mongoose); //Promisification of mongoose module.
mongoose.promise = promise;


//mongoDB - connect
var db = mongoose.connect('mongodb://localhost/bookAPI');

//Models
var Book = require('./models/bookModel');

var app = express();
var port = process.env.PORT || 4000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// What we want to do is set up Swagger as a subpath within our existing API (which may or may not already have an UI). 
// Thus, the Swagger routes will not interfere with the routes that already exist within our API.
//(https://github.com/shawngong/Swagger-Node-Express-For-Existing-APIs)
var  subpath = express();
app.use('/v1', subpath);
var swagger = require('swagger-node-express').createNew(subpath);

app.use(express.static('dist'));
swagger.setApiInfo({
    title:"Book API",
    description:"API to do curd operations from mongo DB",
    contact: "harsha.vardhan953@gmail.com",
    license: "",
    licenseUrl: ""
});

var bookRouter = require('./routes/bookRouter')(Book);
app.use('/api/books', bookRouter);

app.get('/home', function(req, res){
    res.send('welcome to node js');
});

app.get('/swagger', function(req, res){
    res.sendFile(__dirname + '/dist/index.html');
});

swagger.configureSwaggerPaths('', 'swagger', '');
swagger.configure('localhost:4000', '1.0.0');

app.listen(port, function(){
    console.log(chalk.green('Running on port '+ port)); 
})