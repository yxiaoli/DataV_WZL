var express = require('express');
var qs = require("querystring");
var _mysql = require('mysql');
var url = require("url");
var fs = require("fs");


var app = express();
var server = app.listen(3000);
var strJson;

var resultQuery;
var mysql = _mysql.createConnection({
        //host
        host: '127.0.0.1',
        //user
        user: 'root',
        //password
        password: '689468',
        //port
        port: 3306,
        //the name of database
        database: 'datav'
    });  
    var _sql_rain = "SELECT rating, comment from `comments` ORDER by 'id' desc limit 60";
    //var _sql_pie = ;
    //http://www.cnblogs.com/jiaxiaoai/archive/2011/06/27/2091382.html
//app.get('/public/connectDB', function(req, res) {
    //var sInfo = qs.parse(url.parse(req.url).query);
      mysql.query(_sql_rain, function(error, results){
        if(error){
            console.log(error);
            //res.end();
        }
        else{
            strJson = JSON.stringify(results);
            //console.log("query succeed..." +strJson);
            // res.write(strJson);
            
            fs.writeFile('./public/rain.json', strJson, function (err) {
               if(err) {
                console.error(err);
                } else {
                   console.log('Write in successfully---');
                }
            });
            //res.end();
        }
    });
    mysql.end(function (err) {
        if (err) {
            return;
        }
        console.log("mysql close succeed...");
    });
app.use(express.static('public'));
console.log("My socket server is running");


   
    

app.get('/public/Barfall', function(req, res) {
    var sInfo = qs.parse(url.parse(req.url).query);
    var _mysql2 = require('mysql');
    var mysql2 = _mysql2.createConnection({
        //host
        host: '127.0.0.1',
        //user
        user: 'root',
        //password
        password: '689468',
        //port
        port: 3306,
        //the name of database
        database: 'datav'
    }); 
    mysql2.query(_sql_rain, function(error, results){
        if(error){
            console.log(error);
        }
        else{
            strJson = JSON.stringify(results);
            console.log("query succeed...");
            res.write(strJson);
            res.end();///very important point 
        }
    });
    mysql2.end(function (err) {
        if (err) {
            return;
        }
        console.log("mysql2 close succeed...");
    });
});

//    //create a connection
//    mysql.connect(function (err) {
//        if (err) {
//            console.log('connect-' + err);
//        }
//        console.log('connect succeed...');
//    });
//
//var arr = [];
//    mysql.query(_sql, function (err, rows) {
//        if (err) {
//            console.log("query-" + err);
//        }
//        console.log("query succeed..." + rows);
//        //resultQuery = results;
//         for (var i = 0; i < rows.length; i++) {
//             arr[i] = rows[i].name;
//         }   
//    });
//
    //关闭连接
//    mysql.end(function (err) {
//        if (err) {
//            return;
//        }
//        console.log("close succeed...");
//    });
