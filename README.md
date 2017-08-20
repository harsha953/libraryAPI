# libraryAPI
Express Node js library API performing curd operations on *Mongo DB*.<br>
*Swagger* framework for performing operations on REST API. <br>

`npm start` - To start api.<br>
`gulp`      - To start api via gulp-nodemon.<br>
`mongod`    - Type mongod in cmd to start mongo db server.<br>


Using bluebird with mongoose
-------
Using bluebird with mongoose to convert all mongoose callbacks to bluebird mongoose promises.<br>
`var mongoose = require('mongoose');`<br> 
`var promise = require('bluebird');`<br>
`var mongoose = promise.promisifyAll(mongoose);` //Promisification of mongoose module.<br>
`mongoose.promise = promise;`<br>

Running
-------
a)Just clone, `npm install` and `npm start`.<br>
b)Just clone, `gulp`.<br>
It should run, provided you have a local installation of mongodb.

