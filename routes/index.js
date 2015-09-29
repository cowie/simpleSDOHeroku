var express = require('express');
var router = express.Router();
var path = require('path');

var pg = require('pg');
var conString = process.env.DATABASE_URL || 'postgres://cdegour:@localhost/sHoHealth';

router.get('/', function(req, res, next){
	res.sendFile(path.join(__dirname + '/../views/index.html'));
});

router.get('/thanks', function(req, res, next){
	res.sendFile(path.join(__dirname+ '/../views/thankYou.html'));
});

router.post('/newsletterAdd', function(req, res, next){
	//lets just save it into lead
	pg.connect(conString, function(err, client, done){
		if(err){
			console.error(err);res.send('error connecting to db: ' + err);
		}
		else{
			console.log('entering new newsletter request into local db');
			client.query('INSERT INTO salesforce.lead(firstname, lastname, email) values($1, $2, $3) returning id', 
				[req.body.fname, req.body.lname, req.body.email],
				function(err, result){
					if(err){console.error(err);res.send('error inserting into the table: ' + err + '<br/>');}
					else{console.log('inserted data, all is well');res.sendFile(path.join(__dirname+ '/../views/thankYou.html'));}
			
				}
			);
		}
	});
});



module.exports = router;
