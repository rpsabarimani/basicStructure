var express = require('express'),
        app = express(),
        fs = require('fs'),
        db = require('mysql'),
        path = require('path'),
        server = require('http').createServer(app);


//app.use(app.route);
app.use(function (req, res, next) {

    var url = req.url;
    var splitUrl = url.split("/");
            console.log(splitUrl);
//            const control = splitUrl[1];
//            const action = splitUrl[2];
//const url = url;
            console.log(splitUrl.length);
//if(splitUrl.length > 1) {
//    var loginController = require('./controllers/' + control + 'Controller.js');
//    app.get(url, loginController[action]);
//    } else {
//      route = require('./controllers/' + splitUrl[1]+'Controller.js');
//      route.controller(app);
    next();
//}
//    call(url,splitUrl);
});

app.use("apis/*",function(req,res, next){
    console.log("hi");
    var url = req.url;
    var splitUrl = url.split("/");
            console.log(splitUrl);
            const control = splitUrl[2];
            const action = splitUrl[3];
    var loginController = require('./controllers/' + control + 'Controller.js');
    app.get(url, loginController[action]);
});



//function call(url,splitUrl) {
//    }
server.listen(3000);

// dynamically include routes (Controller)
//fs.readdirSync('./controllers').forEach(function (file) {
//  if(file.substr(-3) == '.js') {
//      route = require('./controllers/' + file);
//      route.controller(app);
//  }
//});


//var loginController = require('./controllers/loginController.js');
//app.get('/login',loginController.login);