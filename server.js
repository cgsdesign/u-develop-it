const sqlite3 = require('sqlite3').verbose();
//the .verbose above means that errors get better reported in terminal
const express = require('express');
const { isForOfStatement } = require('@babel/types');
const PORT = process.env.PORT || 3001;
const app = express();
///Express Middle wair
// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//connect to db
const db = new sqlite3.Database('./db/election.db', err =>{
    if (err) {
        return console.error(err.message)
    }
    console.log('Connected to election database')
})


//FOR ADD CANDIDATE
const inputCheck = require('./utils/inputCheck');
//TEST TO MAKE SURE EVERYTHING IS HOOKED UP
// .get test to make sure all hookups work .get= rout method, res.json() = response method
        // app.get('/', (req, res) => {
        //     res.json({
        //       message: 'Hello World, I am testing if my hookups and .get  and res.json work. If this shows up, they do!'
        //     });
        //   });

//READ ALL OF DATABASE COMAND
// //err = error response, rows = db query response, api is in/for url, res.json({})exports out the db info in js        
    app.get('/api/candidates', (req,res) => {
        const sql = `SELECT candidates.*, parties.name 
                AS party_name 
                FROM candidates 
                LEFT JOIN parties 
                ON candidates.party_id = parties.id`;
        const params = [];

        db.all(sql, params, (err,rows) => {
            if (err) {
                res.status(500).json({ error: err.message });
            }
            res.json({
                message: 'success',
                data: rows
            });
        });
    });


 //READ ONLY SELECT ROWS (BY ID)
// Get single candidate
app.get('/api/candidate/:id', (req, res) => {
    const sql = `SELECT candidates.*, parties.name 
                AS party_name 
                FROM candidates 
                LEFT JOIN parties 
                ON candidates.party_id = parties.id
                 WHERE id = ?`;
    const params = [req.params.id];
    db.get(sql, params, (err, row) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
  
      res.json({
        message: 'success',
        data: row
      });
    });
  });

//DELETE  ONLY SELECTED ROWS (by ID)
    //.run = run SQL query but dot retrueve data results
    // ? denotes a place holder
    //param argument alows for prepares placement placeholders, in this case 1
// Delete a candidate
app.delete('/api/candidate/:id', (req, res) => {
    const sql = `DELETE FROM candidates WHERE id = ?`;
    const params = [req.params.id];
    db.run(sql, params, function(err, result) {
      if (err) {
        res.status(400).json({ error: res.message });
        return;
      }
  
      res.json({
        message: 'successfully deleted',
        changes: this.changes
      });
    });
  });

//CREATE NEW CANDIDATE ENTRY
app.post('/api/candidate', ({ body }, res) => {
    const errors= inputCheck(body, 'first_name', 'last_name', 'industry_connected');
        if (errors) {
            res.status(400).json({ error: errors});
            return
        }
        
        const sql = `INSERT INTO candidates (first_name, last_name, industry_connected) 
            VALUES (?,?,?)`;
        const params = [body.first_name, body.last_name, body.industry_connected];
        // ES5 function, not arrow function, to use `this`
        db.run(sql, params, function(err, result) {
            if (err) {
                res.status(400).json({ error: err.message });
                return;
            }
        res.json({
                message: 'success',
                data: body,
                id: this.lastID
            });
        });

})
//JUST IN TERMINAL ADD CODE   
    // const sql = `INSERT INTO candidates (id, first_name, last_name,industry_connected)
    // VALUES (?,?,?,?)`;
    // const params = [3, 'Ronald',  'Firbank', 1];
    // //ES5 function
    // db.run(sql, params, function(err,result){
    //     if (err) {
    //         console.log(err);
    //     }
    //     console.log(result, this.lastID);
    // })


// Default response for any other requests(Not Found) Catch all
  //IMPORTANT!! This will not work on FIREFOX use Crome
  //IMPORTANT!! Use above listener only
app.use((req, res) => {
    res.status(404).end();
  });

//listener to start Express.js (always at bottom)
//start server AFTER db is connected
db.on('open', () => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
})