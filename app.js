/***
    Primary App file
    ----------------
    Author: Mike Elsmore <mike@elsmore.me> @ukmadlz
***/

'use strict';

/* Initial Requires for App */
var express = require('express'),
    stylus = require('stylus'),
    nib = require('nib');

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
    var Lanyrd = require('lanyrd');
    Lanyrd.speakers('hackference','2014',function(error, response, returnObj ){
        var speakerObject = {};
        var counter = 0;
        for(var i = 0; i < returnObj.length; i++){
            if(returnObj[i].title !== 'Michael Elsmore'){
                var twitterUrl = '';
                for(var profileLinksIterator = 0; profileLinksIterator < returnObj[i].profile_links.length; profileLinksIterator++){
                    if(returnObj[i].profile_links[profileLinksIterator].icon_class === 'twitter'){
                        twitterUrl = returnObj[i].profile_links[profileLinksIterator].url;
                        break;
                    }
                }
                var speaker = {
                    'name':returnObj[i].title,
                    'image':returnObj[i].image,
                    'twitter':twitterUrl,
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
});

// Start Listening
var port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log('Listening on ' + port);
});