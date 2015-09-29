var express = require('express');
var router = express.Router();
var path = require('path');

var pg = require('pg');
var conString = process.env.DATABASE_URL || 'postgres://cdegour:@localhost/sHoHealth';
var helenID = process.env.HELEN_HIGHRISK_ID || 'badID';

/* GET home page. 
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Welcome!', header:'', success:false, highrisk:false});
});
*/

router.get('/', function(req, res, next){
	res.sendFile(path.join(__dirname + '/../views/index.html'));
});

router.get('/thanks', function(req, res, next){
	res.sendFile(path.join(__dirname+ '/../views/thankYou.html'));
});

router.post('/newsletter', function(req, res, next){
	//lets just save it into lead
	pg.connect(conString, function(err, client, done){
		if(err){
			console.error(err);res.send('error connecting to db: ' + err);
		}
		else{
			console.log('entering new newsletter request into local db');
			client.query('INSERT INTO salesforce.lead(firstname, lastname, email) values($1, $2, $3) returning id', 
				[req.fname, req.lname, req.email],
				function(err, result){
					if(err){console.error(err);res.send('error inserting into the table: ' + err + '<br/>');}
					else{console.log('inserted data, all is well');res.sendFile(path.join(__dirname+ '/../views/thankYou.html'));}
			
				}
			);
		}
	});
});


//form data
router.get('/newForm', function(req, res, next){
	res.render('newForm', {title: helenID, header:''});
});

router.get('/preAuthForm', function(req,res,next){
	res.render('preAuthForm', {title:process.env.HELEN_HIGHRISK_ID, header:''});
})

//form post call
router.post('/insertData', function(req, res, next){
	pg.connect(conString, function(err, client, done){
		if(err){
			console.error(err);res.send('error connecting to db:' + err);
		}
		else{

			if(req.body.over65 || req.body.chronic || req.body.pregnant || req.body.child){
				//add salesforce logic here
				console.log("detected high-risk patient, forwarding to critical care workflow");
				client.query('INSERT INTO salesforce.case("patient__c", "contactid", "subject", "origin", "priority") values ($1,$2,$3,$4,$5) returning id', 
					[process.env.HELEN_HIGHRISK_ID, process.env.HELEN_HIGHRISK_ID, "Influenza Outbreak", "Web", "High"],  
					function(err, result){ 
						if(err){console.error(err);res.send('there was an error inserting to table:' + err + ' <br/>' + helenID);}
						else{console.log('inserted data, all is well');res.render('index', {title:"thanks!", header:"", success:true, highrisk:true});}
					}
				);
			}
		}
	});
	
});

module.exports = router;
