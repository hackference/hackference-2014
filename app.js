/***
    Primary App file
    ----------------
    Author: Mike Elsmore <mike@elsmore.me> @ukmadlz
***/

'use strict';

/* Initial Requires for App */
var express = require('express'),
    stylus = require('stylus'),
    nib = require('nib'),
    passport = require('passport'),
    fs = require('fs');

/* Set Up App */
process.env.TZ = 'Europe/London';
var app = express();
function compile(str, path) {
    return stylus(str)
        .set('filename', path)
        .use(nib());
}
app.set('views', __dirname + '/application/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(stylus.middleware(
    {
        src: __dirname + '/public',
        compile: compile
    }
));
app.use(express.static(__dirname + '/public'));
app.use(express.logger());

// Local Vars
app.locals({
    title: 'Hackference 2.0.14',
    phone: '1-250-858-9990',
    email: 'mike@hackference.co.uk'
});

// Index
app.get('/', function (req, res) {

    // Process speaker list - Ignore myself
    var http = require('http');
    var url = 'http://lanyrd.com/2014/hackference/speakers/46e95581d4f23c37.v1.json';

    http.get(url, function(response) {
        var body = '';

        response.on('data', function(chunk) {
            body += chunk;
        });

        response.on('end', function() {
            var lanyrdResponse = JSON.parse(body).speakers;
            var counter = 0;
            var speakerObject = {};
            var speakerImagePath = './public/images/speakers/'
            for(var i = 0; i < lanyrdResponse.length; i++){
                if(lanyrdResponse[i].name !== 'Michael Elsmore'){

                    var twitter = lanyrdResponse[i].twitter.substring(1);

                    var speaker_image = (fs.existsSync(speakerImagePath+twitter+'.jpg'))?(speakerImagePath+twitter+'.jpg').substring(8):lanyrdResponse[i].image_75;

                    var speaker = {
                        'name':lanyrdResponse[i].name,
                        'image':speaker_image,
                        'twitter':'http://twitter.com/'+twitter,
                        'break':(((counter+1)%4==0)?'clearfix':'')
                    };
                    speakerObject[counter] = speaker;
                    counter++;
                }
            }
            res.render('index',{
                'title':app.locals.title,
                'speakerObject' : speakerObject
            });
        });
    }).on('error', function(e) {
          console.log("Got error: ", e);
    });
});

// Start Listening
var port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log('Listening on ' + port);
});