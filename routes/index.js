
var express = require('express');
var router = express.Router();
var path = require('path');

//var MongoClient = require('mongodb').MongoClient;
//var mongoDb = null;
//MongoClient.connect("mongodb://localhost:27017/db_4tigo", function (err, db) {
//    if (err)
//        throw err;
//    else
//        console.log("mongo connected");
////  console.log(db);
//    mongoDb = db;
//});


var loginController = require('../controllers/loginController.js');
router.get('/login', loginController.login);

var tripsController = require('../controllers/tripsController.js');
router.get('/getTripLatLong', tripsController.getTripLatLong);

var dummyController = require('../controllers/dummyController.js');
router.get('/reg', dummyController.reg);
router.get('/list', dummyController.list);



module.exports = router;