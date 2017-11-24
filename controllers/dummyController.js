var express = require("express"),
        dbConnect = require('../databases/db_connect.js'),
        db = dbConnect.localConnect();

var reg = function (req, res, next) {

    var name = req.query.name;
    var email = req.query.email;
    var mobile = req.query.mobile;
    var password = req.query.password;
    var results = new Object();
    results.error = new Object();
    results.results = new Object();
    results.error.errCode = 1;
    results.error.errMsg = "Something went wrong";

    db.query("INSERT INTO users1 SET name='" + name + "',mobile='" + mobile + "',email='" + email + "',password='" + password + "'", function (err, rows) {

        if (!err) {
            results.error.errCode = 0;
            results.error.errMsg = "Inserted successfully";

        } else {
            console.log(err);
            results.error.errCode = 1;
            results.error.errMsg = "Error while inserting data";
        }

        res.json(results);
        return;
    });

//    res.json(results);
//    return;
};

var list = function (req, res, next) {

    var id = req.query.search;
    var results = new Object();
    results.error = new Object();
    results.results = new Object();
    results.error.errCode = 1;
    results.error.errMsg = "Something went wrong";

    db.query("SELECT id, name, email, mobile, password FROM users1 " + (id ? "where id='" + id + "' OR name LIKE '%" + id + "%' OR email LIKE '%" + id + "%' OR mobile LIKE '%" + id + "%'" : ""), function (err, rows) {

        if (!err) {
            results.results = rows;
            if (rows.length != 0) {
                console.log(rows);
                results.error.errCode = 0;
                results.error.errMsg = "Data fetched successfully";
            } else {
                results.error.errCode = 1;
                results.error.errMsg = "No records found";
            }

        } else {
            results.error.errCode = 1;
            results.error.errMsg = "Error while fetching data";
        }

        res.json(results);
        return;
    });

//    res.json(results);
//    return;
};

module.exports = {reg: reg, list: list};