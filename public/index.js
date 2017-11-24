module.exports = function (app) {

    app.get('/tripDetails', function (req, res) {
        res.render('tripDetails');
    });
    
    app.get('/track', function (req, res) {
        res.render('track');
    });
}