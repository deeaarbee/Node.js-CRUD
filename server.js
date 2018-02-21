var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var mysql = require('mysql');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


var connection = mysql.createConnection({
    host: "localhost",
    user: "balajidr",
    password: "spiderman",
    database: "testdatabase"
});

connection.connect(function(err) {
    var sql = "SELECT * FROM user";
    if (err) throw err;
    console.log("Connected!");
    connection.query(sql, function (err, result,fields) {
        if (err) throw err;
        var item = JSON.stringify(result);
        var data = JSON.parse(item);
        console.log(data[0]);
        //console.log(JSON.stringify(result));
    });
});

// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});


app.post('/register',function (req,res) {
    var data = req.body;
    console.log(data.name);
    res.send("register");
    console.log("register")
});


app.post('/login',function (req,res) {
    var data = req.body;
    console.log(data);
    res.send("login");
});

app.post('/logout',function (req,res) {
    var data = req.body;
    console.log(data);
    res.send("logout");
});

app.post('/update',function (req,res) {
    var data = req.body;
    console.log(data);
    res.send("update");
});

app.listen(8080,function () {
    console.log("running on port 8080");
});
