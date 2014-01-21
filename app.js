/***
	Primary App file
	----------------
	Author: Mike Elsmore <mike@elsmore.me> @ukmadlz
***/

/* Initial Requires for App */
// Express
var express = require('express');
// Jade
var jade = require('jade');
// Stylus
var stylus = require('stylus');
// Nib
var nib = require('nib');
// URL
var url = require('url');
// HTTP
var http = require('http');

/* Set Up App */
process.env.TZ = 'Europe/London';
var app = express()
function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib())
}
app.set('views', __dirname + '/application/views')
app.set('view engine', 'jade')
app.use(express.logger('dev'))
app.use(stylus.middleware(
	{
		src: __dirname + '/public',
		compile: compile
	}
))
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
	var Lanyrd = require('Lanyrd');
	Lanyrd.speakers('hackference','2014',function(error, response, returnObj ){
		var speakerObject = {};
		var counter = 0;
		for(i=0;i<returnObj.length;i++){
			if(returnObj[i].title!='Michael Elsmore'){
				var twitter_url = '';
				for(j=0;j<returnObj[i].profile_links.length;j++){
					if(returnObj[i].profile_links[j].icon_class=='twitter'){
						twitter_url = returnObj[i].profile_links[j].url;
						break;
					}
				}
				var speaker = {
					'name':returnObj[i].title,
					'image':returnObj[i].image,
					'twitter':twitter_url
				};
				speakerObject[counter] = speaker;
				counter++;
			}
		}
		speakerObject;
		res.render('index',{
			'title':app.locals.title,
			'speakerObject' : speakerObject
		});
	});
});

// Start Listening
var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Listening on " + port);
});