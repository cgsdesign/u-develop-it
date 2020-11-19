        //start mySQL shell: mysql -u root -p
        //will have to enter password (see notes)
        //if get coand not found try: export PATH="${PATH}:/usr/local/mysql/bin/" to .bash_profile or .zshrc (will have to restart terminal after for this line to take effect)

//create detabase sqlite3 db/election.db (election.db = name or database)
//All of SQLite's internal commands begin with a period, to distinguish them from SQL queries.
//.quit to quit and return to terminal
//to create a table CREATE TABLE name (table, info including INTEGER PRIMARY KEY, )
//VARCHAR means variable characters IE text and usualy has a limit cap
//INTEGER number
//NULL or leave boleen blank means you can have a blank, NOT NULL means you can't have a blank
//.schema to see the tables in the db with sucessfully exicuted CREATE
//.tables to see one without CREATE
//SELECT * FROM candidates; the * means all, SELECT eans action to take place, FROM is where we recieve the data from
//.headers on - to turn on catigories
//.mode column - to align columns
// .quit - QUIT sqlite3 and return to normal server mode
//for boleens 1=true 0=false
// to createa file AND populate it : echo "node_modules/" > .gitignore

// to recreate and populate DB: *** Asuming schema and seeds are built!!!
        //delete old db
        //sqlite3 db/election.db < db/schema.sql
        //sqlite3 db/election.db < db/seeds.sql
        //RUN SQLITE = sqlite3 db/election.db
        //SELECT * FROM candidates; (to check if running while in sqlete3)

//write values as such
        // INSERT INTO candidates (first_name, last_name, industry_connected)
        // VALUES
        // ('Virginia', 'Woolf', 1),
        // ('Piers', 'Gaveston', 0),
        // ('Charles', 'LeRoi', 1),
        // ('Katherine', 'Mansfield', 1),
        // ('Dora', 'Carrington', 0),
        // ('Edward', 'Bellamy', 0),
        // ('Montague', 'Summers', 1),
        // ('Octavia', 'Butler', 1),
        // ('Unica', 'Zurn', 1);

//to search for partial info: SELECT first_name, last_name FROM candidates;
// to filter use WHERE and the column tiye followd by = value ; ex WHERE industry_connected = 1;
    //Note: in sqlite3 = is the same as === in JScript


//TO CORRECT OR CHANGE DATA
        // UPDATE table name
        //SET catagory name = new value
        //WHERE id = ;

//TO DELETE DATA - WHOLE ROW
        // DELETE FROM table name
        // WHERE value of one of the componant to be deleted - idealy id

//qlite3 db/election.db < db/schema.sql (typed in terminal after db created) the <  in an input redirect

// FOR ENTIRE TABLE & DB CHANGES
        //ALTER TABLE candidates ADD COLUMN party_id INTEGER UNSIGNED; = add colomn ex.
                //UNSIGNED= not a negative num.

        //PRAGMA foreign_keys = ON pr FORIGN KEYS wont work

        //DELETE FROM parties WHERE id = 1; would delete all that aply

//JOIN + SELECT merges 2 or more tables ex:
        // SELECT * FROM candidates
        // LEFT JOIN parties ON candidates.party_id = parties.id;

        or
        // SELECT candidates.*, parties.name AS party_name
        // FROM candidates
        // LEFT JOIN parties ON candidates.party_id = parties.id;
                //here AS changes the name in the catagory to be what we want (an alias) 
                //, quaility  = the one that will show