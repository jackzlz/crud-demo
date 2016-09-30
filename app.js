'use strict';

var http = require('http');

var fs = require('fs');

var path = require('path');
var url = require('url');

var querystring = require('querystring');

var db = require('./db');

var app = http.createServer(function(req, res) {
    var reqUrl = req.url;
    if (reqUrl === '/' || reqUrl === '/index.html') {
        var rs = fs.createReadStream(path.join(__dirname, 'index.html'));

        //  let data = fs.readFileSync(path.join(__dirname, 'index.html'));

        res.writeHead(200, {
            'Content-Type': 'text/html'
        });

        rs.pipe(res);

        //res.end(data);
    } else if (reqUrl.indexOf('public') >= 0) {
        let u = url.parse(reqUrl);
        let rs = fs.createReadStream(path.join(__dirname, u.pathname));

        res.writeHead(200);

        rs.pipe(res);
    } else if (reqUrl === '/add') {
        var data = '';
        req.on('data', function(chunk) {
            data += chunk;
        });
        req.on('end', function() {
            console.log(data);


            console.log(data.name);
            console.log(data);

            console.log(querystring.parse(data));

            let datas = querystring.parse(data);
            db.insert('usercollection', datas, function(err, doc) {

                console.log(err);
                console.log(doc);

                let result = {
                    statusCode: 1,
                    msg: 'success'
                };

                res.writeHead(200);
                res.write(JSON.stringify(result));
                res.end();
            });



        });

    } else if (reqUrl === '/list') {
        db.list('usercollection', function(err, datas) {
            res.writeHead(200);
            res.write(JSON.stringify(datas));
            res.end();
        });

    } else {
        res.end(`it's ok!`);
    }
    console.log(req.url);
});

app.listen(3000);
