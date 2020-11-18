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
//TEST TO MAKE SURE EVERYTHING IS HOOKED UP
// .get test to make sure all hookups work .get= rout method, res.json() = response method
        // app.get('/', (req, res) => {
        //     res.json({
        //       message: 'Hello World, I am testing if my hookups and .get  and res.json work. If this shows up, they do!'
        //     });
        //   });

//READ ALL OF DATABASE COMAND
// //err = error response, rows = db query response        
    db.all(`SELECT * FROM candidates`, (err,rows) => {
        console.log(rows);
    })


 //READ ONLY SELECT ROWS (BY ID)
//  db.get(`SELECT * FROM candidates WHERE id = 5`, (err, row) => {
//      if (err) {
//          console.log(err);
//      }
//      console.log(row);
//  });

//DELETE  ONLY SELECTED ROWS (by ID)
    //.run = run SQL query but dot retrueve data results
    // ? denotesa place holder
    //param argument alows for prepares placement placeholders, in this case 1
    // db.run(`DELETE FROM candidates WHERE id = ?`, 1, function(err, result) {
    //     if (err) {
    //       console.log(err);
    //     }
    //     console.log(result, this, this.changes);
    //   });

//CREATE NEW CANDIDATE ENTRY
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