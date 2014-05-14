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
    email: 'mike@hackference.co.uk',
    jsonpath: __dirname+'/public/json'
});

// Index
app.get('/', function (req, res) {

    res.render('index',{
        'title':app.locals.title,
        'page':'For those about to build, we salute you.'
    }); 

});

// Tickets
app.get('/tickets', function (req, res) {

    res.render('tickets',{
        'title':app.locals.title,
        'page':'Tickets'
    }); 

});

// Speakers
app.get('/speakers', function (req, res) {
    res.writeHead(301, {
    'Location': '/conference'
    //add other headers here...
    });
    res.end();
});

// Schedule
app.get('/schedule', function (req, res) {
    res.writeHead(301, {
    'Location': '/conference'
    //add other headers here...
    });
    res.end();
});

// Confernece
app.get('/conference', function (req, res) {

    var async = require('async');

    var speakerObject = {};

    fs.readFile(app.locals.jsonpath+'/speakers.json','utf8',function(err,data){

        data = JSON.parse(data);
        
        var speakerArray = Array();
        for(var i=0;i<data.speakers.length;i++){
            speakerArray[i] = app.locals.jsonpath+data.speakers[i].href;
        }

        var counter = 0;

        async.eachSeries(
        // Pass items to iterate over
        speakerArray,
        // Pass iterator function that is called for each item
        function(filename, cb) {
        
            fs.readFile(filename,'utf8',function(err,speakerData){

                if (!err) {

                    speakerData = JSON.parse(speakerData);

                    var speakerLinks = {};

                    for(var key in speakerData.links){
                        var link = speakerData.links[key];
                        speakerLinks[key] = link;
                    }

                    speakerData.links = speakerLinks;
                    console.log(speakerData);
                    speakerObject[counter] = speakerData;
                }

                // Old skool
                counter++;

                // Calling cb makes it go to the next item.
                cb(err);
            });
        },
        // Final callback after each item has been iterated over.
        function(err) {

            res.render('conference',{
                'title':app.locals.title,
                'page':'Conference',
                'speakerObject' : speakerObject
            }); 

        });  
    });
});

// Hack
app.get('/hack', function (req, res) {

    res.render('hack',{
        'title':app.locals.title,
        'page':'Hack'
    }); 

});

// Information
app.get('/information', function (req, res) {

    res.render('information',{
        'title':app.locals.title,
        'page':'Info'
    }); 

});

// Sponsors
app.get('/sponsors', function (req, res) {

    res.render('sponsors',{
        'title':app.locals.title,
        'page':'Sponsors'
    }); 

});

// Start Listening
var port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log('Listening on ' + port);
});