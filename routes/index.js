var express = require('express');
var router = express.Router();
var path = require('path');


const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

//var pg = require('pg');
//var conString = process.env.DATABASE_URL || 'postgres://cdegour:@localhost/sHoHealth';

pool.on('error', (err, client) => {
  console.error("unexpected error on idle client", err);
  process.exit(-1);
});

router.get('/', function(req, res, next){
  res.sendFile(path.join(__dirname + '/../views/index.html'));
});

router.get('/thanks', function(req, res, next){
  res.sendFile(path.join(__dirname+ '/../views/thankYou.html'));
});


router.post('/candidateAdd', (req, res, next) => {
  pool.connect((err, client, done) => {
    if (err) throw err;
    client.query('INSERT INTO "salesforce.candidate__c"("Youtube_Video_ID__c", "Email_Address__c", "First_Name__c", "Last_Name__c", "Twitter_Handle__c" values($1,$2,$3,$4,$5) returning id',
      [req.body.youtubeID, req.body.email, req.body.fname, req.body.lname, req.body.twitter], (qerr, qres) => {
        if (qerr) {
          console.error(qerr);
          res.send('problem going into the table: ' + qerr + '<br/>');
        } else {
          console.log('insert successful');
          res.sendFile(path.join(__dirname+'/../views/thankYou.html'));
        }
      });
  });
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
