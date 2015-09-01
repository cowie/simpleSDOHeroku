var express = require('express');
var router = express.Router();

var pg = require('pg');
var conString = process.env.DATABASE_URL || 'postgres://cdegour:@localhost/sHo';


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Welcome!', header:'' });
});


//form data
router.get('/newForm', function(req, res, next){
	res.render('newForm', {title: "newForm", header:''});
});

//form post call
router.post('/insertData', function(req, res, next){
	pg.conect(conString, function(err, client, done){
		if(err){
			console.error(err);res.send('error connecting to db:' + err);
		}
		else{
			client.query('INSERT INTO "publicRequest"("first_name", "last_name", "phone", "item_of_interest", "type", "city", "state") values ($1, $2, $3, $4, $5, $6, $7) returning ID',
				[req.body.first_name, req.body.last_name, req.body.phone, req.body.item_of_interest, req.body.type, req.body.city, req.body.state], 
				function(err, result){
					if(err){console.error(err);res.send('error inserting to request table:' + err);}
					console.log("inserted data, 'salgood");
			});
		}
	});
	res.render("thankYou", {title:"thanks!", header:""});
});

/*
todo
	implement data model
	implement index page call (initial app page)
	implement form page call (get some datas)
	implement form post call (pushd atas into stuff, redirect)
	implement thank you page
*/


module.exports = router;
