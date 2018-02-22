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


// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});



app.post('/login',function (req,res) {
    var data = req.body;
    var username = data.username;
    var password = data.password;

    connection.connect(function (err) {
        var sql = "Select * FROM user";
        connection.query(sql,function (err, result) {
            if (err) throw err;
            for (var i=0;i<result.length;i++){
                    console.log(result[i].name);
                    if(result[i].name === username && result[i].age===password){
                        console.log("verified");
                    }
            }
        });

    });

    //console.log(data);
    res.json({"login":true,"age":"agggge"});
});

app.post('/logout',function (req,res) {
    var data = req.body;
    console.log(data);
    res.send("logout");
});

app.listen(8080,function () {
    console.log("running on port 8080");
});
