var express = require("express");

module.exports.controller = function (app) {

    app.get("apis/home/login", function (req, res, next) {
        console.log("login");
        res.send(req.url);
        return;
    });
}

//module.exports = {login: login};