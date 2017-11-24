var express = require("express"),
        dbConnect = require('../databases/db_connect.js'),
        db = dbConnect.localConnect(),
        mongoUrl = dbConnect.mongoUrl,
        MongoClient = require('mongodb').MongoClient;

var getTripLatLong = function (req, res, next) {

    var cid = req.query.cid;
    var results = new Object();
    results.error = new Object();
    results.results = new Object();
    results.error.errCode = 1;
    results.error.errMsg = "Something went wrong";

    try {

        MongoClient.connect(mongoUrl, function (err, mongoDb) {

            if (err)
                throw err;
            mongoDb.collection("tbl_trip_latlng").find({cid:cid},{_id:false}).sort({_id:-1}).toArray(function (err, rows) {
                
                if (!err) {
                    results.results = rows;
                    if (rows.length != 0) {
                        results.error.errCode = 0;
                        results.error.errMsg = "Data fetched successfully";
                    } else {
                        results.error.errCode = 1;
                        results.error.errMsg = "No records found";
                    }
                } else {
                    results.error.errCode = 1;
                    results.error.errMsg = "Error fetching data";
                }
                mongoDb.close();
                res.json(results);
                return;
            });
        });
    } catch (err) {
//        console.log(err);
        res.json(results);
        return;
    }
};

module.exports = {getTripLatLong: getTripLatLong};