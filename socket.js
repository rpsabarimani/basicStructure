//console.log(io);
var dbConnect = require('./databases/db_connect.js'),
        mongoUrl = dbConnect.mongoUrl,
        MongoClient = require('mongodb').MongoClient;

io.on('connection', function (socket) {
    socket.on("updateTripLatLng", function (data) {
        MongoClient.connect(mongoUrl, function (err, mongoDb) {

            if (err)
                throw err;
            var myobj = {cid: data.cid, lat: data.lat, lng: data.lng};
            mongoDb.collection("tbl_trip_latlng").insertOne(myobj, function (err, res) {
                if (err)
                    throw err;
                console.log("1 document inserted");


                mongoDb.close();
            });
        });

        socket.broadcast.to(data.cid).emit('getTripLatLng', data);
    });


    socket.on("addcid", function (data) {
console.log("addcid");
        socket.room = data.cid;
        socket.join(data.cid);
    });
});