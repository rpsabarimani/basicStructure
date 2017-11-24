
var mysql = require('mysql');
var MongoClient = require('mongodb').MongoClient;


var mysqlConnect = function () {
//    var conn = con.connect(function (err) {
//        if (err)
//            throw err;
//        console.log("Connected!");
//        return conn;
//    });


    var con = mysql.createPool({
        host: "localhost",
        user: "root",
        password: "",
        database: "sabari"
    });

    return con;

};
var mongoUrl = "mongodb://localhost:27017/db_4tigo";
var mongoDConnect = function () {
    var url = "mongodb://localhost:27017/db_4tigo";
    MongoClient.connect(url, function (err, db) {
        if (err)
            throw err;
        else
            console.log("mongo connected");
//  console.log(db);
        return db;
    });

};

module.exports = {localConnect: mysqlConnect, mongoConnect: mongoDConnect, mongoUrl:mongoUrl};