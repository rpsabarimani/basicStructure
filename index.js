var express = require('express'),
        app = express(),
        fs = require('fs'),
        db = require('mysql'),
        mongoDb = require('mongodb'),
        path = require('path'),
        server = require('http').createServer(app),
        port = process.env.PORT || 3000;
global.io = require('socket.io').listen(server.listen(port));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    next();
});


var routerObj = require('./routes/index.js');
app.use('/', require('./routes/index'));
//app.use(app.route);




// Set .html as the default template extension
app.set('view engine', 'html');

// Initialize the ejs template engine
app.engine('html', require('ejs').renderFile);

// Tell express where it can find the templates
app.set('views', __dirname + '/public/views');

// Make the files in the public folder available to the world
app.use(express.static(__dirname + '/public'));

require('./public/index.js')(app);
require('./socket.js');