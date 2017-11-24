var express = require("express"),
        dbConnect = require('../databases/db_connect.js'),
        db = dbConnect.localConnect(),
        mongoUrl = dbConnect.mongoUrl,
        MongoClient = require('mongodb').MongoClient;

var login = function (req, res, next) {

    var email = req.query.user;
    var password = req.query.pass;
    var results = new Object();
    results.error = new Object();
    results.results = new Object();
    results.error.errCode = 1;
    results.error.errMsg = "Something went wrong";

    try {
        if (!email)
            db.query("SELECT um.userid, fname, lname, mobile, email, usertype FROM tbl_user_master um INNER JOIN tbl_users_registration ur ON ur.userid = um.userid WHERE (um.email = '" + email + "' OR um.mobile = '" + email + "') AND ur.mpin = " + password, function (err, rows) {

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

                res.json(results);
                return;
            });
    } catch (err) {
//        console.log(err);
        res.json(results);
        return;
    }
//    res.json(results);
//    return;
};

var updateTripLocation = function (req, res) {

    MongoClient.connect(mongoUrl, function (err, mongoDb) {

        if (err)
            throw err;
        var myobj = {cid: req.query.cid, lat: req.query.lat, lng: req.query.lng};
        mongoDb.collection("tbl_trip_latlng").insertOne(myobj, function (err, res) {
            if (err)
                throw err;
            console.log("1 document inserted");
            mongoDb.close();
        });
    });
};


module.exports = {login: login};