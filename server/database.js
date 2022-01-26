var sqlite3 = require('sqlite3').verbose()

// IF I BREAK THE OTHER DATABASE USE THIS LOL


// open the database

let db = new sqlite3.Database("./database1.db", (err) => {
    if (err) {
      console.error(err.message);
      throw err
    }
    console.log('Connected to the Database 1.');
  });

//change all create table entries to text if throwing error

  //this could be PATIENT RECORD!?! multi column.. treatmentId integer, patienttId integer
  // create table ‘patient’



// open the database

//change all create table entries to text if throwing error

  //this could be PATIENT RECORD!?! multi column.. treatmentId integer, patienttId integer
  // create table ‘patient’

  const sql="CREATE TABLE patient(name text, dob  text, email text, patientId integer PRIMARY KEY, address text, allergy integer, gender text)";
  db.run(sql, (err) => {
    if (err) {
        // Table already created 
        console.log('Patient Table already created.');
    }else{
      console.log('Patient Table created.');
      // First time Table created, insert some rows
      console.log('First time Patient Table created, creating some rows.'); 
      var insert = 'INSERT INTO patient(name, dob , email, patientId , address, allergy, gender) VALUES(?,?,?,?,?,?,?)';
      db.run(insert, ["AdamFoody", "28/06/1996", "adam@adam.com", 11, "CB250RS", 1, "Female"] );
      db.run(insert, ["Adam - Numerous Treatments", "28/06/1997", "adam@adam.com", 12, "CB251RS", 1, "Female"] );
      db.run(insert, ["AdamFoody2", "28/06/1998", "adam@adam.com", 13, "CB252RS", 1, "Female"] );
      db.run(insert, ["AdamFoody3", "28/06/1999", "adam@adam.com", 14, "CB253RS", 0, "Female"] );
      db.run(insert, ["AdamFoody4", "28/06/2000", "adam@adam.com", 15, "CB254RS", 1, "Female"] );
      db.run(insert, ["AdamFoody5", "28/06/2001", "adam@adam.com", 16, "CB255RS", 0, "Female"] );
      db.run(insert, ["AdamFoody6", "28/06/2002", "adam@adam.com", 17, "CB256RS", 1, "Male"] );
      db.run(insert, ["AdamFoody7", "28/06/2003", "adam@adam.com", 18, "CB256RS", 0, "Male"] );
      db.run(insert, ["AdamFoody8", "28/06/2004", "adam@adam.com", 19, "CB256RS", 1, "Male"] );
      db.run(insert, ["AdamFoody9", "28/06/2005", "adam@adam.com", 20, "CB256RS", 0, "Male"] );
      db.run(insert, ["AdamFoody10", "28/06/2006", "adam@adam.com", 21, "CB256RS", 1, "Male"] );
      db.run(insert, ["AdamFoody11", "28/06/2007", "adam@adam.com", 22, "CB256RS", 0, "Male"] );
      db.run(insert, ["AdamFoody12", "28/06/2008", "adam@adam.com", 23, "CB256RS", 1, "Male"] );
      db.run(insert, ["AdamFoody13", "28/06/2009", "adam@adam.com", 24, "CB256RS", 0, "Male"] );
      db.run(insert, ["AdamFoody14", "28/06/2011", "adam@adam.com", 25, "CB256RS", 1, "Male"] );
      db.run(insert, ["AdamFoody15", "28/06/2012", "adam@adam.com", 26, "CB256RS", 0, "Male"] );
      db.run(insert, ["AdamFoody16", "28/06/2013", "adam@adam.com", 27, "CB256RS", 1, "Male"] );
      db.run(insert, ["AdamFoody17", "28/06/2014", "adam@adam.com", 28, "CB256RS", 0, "Male"] );
      db.run(insert, ["AdamFoody18", "28/06/2015", "adam@adam.com", 29, "CB256RS", 1, "Male"] );
      db.run(insert, ["AdamFoody19", "28/06/2016", "adam@adam.com", 30, "CB256RS", 1, "Male"] );


  
      
      
   
    }
  });


  const sql2="CREATE TABLE treatment(treatmentId integer PRIMARY KEY, patientId integer,treatmentType  text, treatmentCategory text, startDate text, prescription integer, endDate text)";
  db.run(sql2, (err) => {
    if (err) {
        // Table already created 
        console.log('Treatment Table already created.');
    }else{
      console.log('Treatment Table created.');
      // First time Table created, insert some rows
      console.log('First time Treatment Table created, creating some rows.');
      var insert = 'INSERT INTO treatment(treatmentId, patientId, treatmentType, treatmentCategory, startDate, prescription, endDate) VALUES(?,?,?,?,?,?,?)';
      db.run(insert, [123, 11, "Fracture(multiple presc)", "High",  "28/06/2012", '1']);
      db.run(insert, [124, 12, "Fracture1", "Low", "28/06/2013", '0']);
      db.run(insert, [125, 12,  "Fracture2", "Medium", "28/06/2014", '1']);
      db.run(insert, [126, 12, "Fracture3", "High", "28/06/2015", '0']);
      db.run(insert, [127, 12, "Fracture4", "Low", "28/06/2016", '1']);
      db.run(insert, [128, 16, "Fracture5", "Medium", "28/06/2017", '0']);
      db.run(insert, [129, 17, "Fracture6", "High", "28/06/2018", '1']);
      db.run(insert, [131, 18, "Fracture8", "Low", "28/06/2019", '0']);
      db.run(insert, [132, 19, "Fracture9", "Medium", "28/06/2019", '1']);
      db.run(insert, [133, 20, "Fracture10", "High", "28/06/2019", '0']);
      db.run(insert, [134, 21, "Fracture11", "Low", "28/06/2019", '1']);
      db.run(insert, [135, 22, "Fracture12", "Medium", "28/06/2019", '0']);
      db.run(insert, [136, 23, "Fracture13", "High", "28/06/2019", '1']);
      db.run(insert, [137, 24, "Fracture14", "Low", "28/06/2019", '0']);
      db.run(insert, [138, 25, "Fracture15", "Medium", "28/06/2019", '1']);
      db.run(insert, [139, 26, "Fracture16", "High", "28/06/2019", '1']);
      db.run(insert, [140, 27, "Fracture17", "Low", "28/06/2019", '1']);
      db.run(insert, [141, 28, "Fracture18", "Medium", "28/06/2019", '0']);
      db.run(insert, [142, 29, "Fracture19", "High", "28/06/2019", '0']);
      db.run(insert, [143, 30, "Fracture20", "High", "28/06/2019", '0']);
      db.run(insert, [1535, 35353353, "Fracture20", "High", "28/06/2019", '3', '30/04/2021']);
   
   
      

      
      
      
    }
  });

  const sql3="CREATE TABLE allergy(allergyId integer PRIMARY KEY, allergyName text, risk text, patientId integer, notes text)";
  db.run(sql3, (err) => {
    if (err) {
        // Table already created 
        console.log('Allergy already created.');
    }else{
      console.log('Allergy table created.');
      // First time Table created, insert some rows
      console.log('First Time creating Allergy Table, creating some rows.');
      var insert = 'INSERT INTO allergy(allergyId, allergyName, risk, patientId, notes) VALUES(?,?,?,?,?)';
      db.run(insert, [01, "Peanut", "Very-High", 11,  'Carries Epiderm Pen, life-threatening']);
      db.run(insert, [02, "Fish", "High", 13, 'Causes skin issues']);
      db.run(insert, [03, "Penicillin", "Very-High", 15,  'Causes life-threating issues']);
      db.run(insert, [04, "Latex", "Medium", 17,  'Causes skin issues']);
  

      db.run(insert, [07, "Dairy", "Low", 19,  'Causes stomach problems']);
      db.run(insert, [08, "Latex", "Medium", 21,  'Causes skin issues']);
      
      db.run(insert, [09, "Penicillin", "Very-High", 23,  'Causes life-threating issues']);
      db.run(insert, [10, "Peanut", "Very-High", 25,  'Carries Epiderm Pen, life-threatening']);
      db.run(insert, [11, "Penicillin", "Very-High", 27,  'Causes life-threating issues']);
      db.run(insert, [12, "Penicillin", "Very-High", 29,  'Causes life-threating issues']);
      db.run(insert, [13, "Fish", "High", 30, 'Causes skin issues']);
      db.run(insert, [14, "Apples", "Very-High", 12,  'Causes life-threating issues']);
      db.run(insert, [15, "Dairy", "Very-High", 12,  'Causes life-threating issues']);
      db.run(insert, [16, "Oranges", "Medium", 12,  'Causes life-threating issues']);

    }
  });

  const sql4="CREATE TABLE prescription(prescriptionId integer PRIMARY KEY, prescriptionName text, treatmentId integer, startDate text, endDate text, notes text)";
  db.run(sql4, (err) => {
    if (err) {
        // Table already created 
        console.log('Prescription table already created.');
    }else{
      console.log('Prescription table created.');
      // First time Table created, insert some rows
      console.log('First Time creating Prescription Table, creating some rows.');
      var insert = 'INSERT INTO prescription(prescriptionId, prescriptionName, treatmentId, startDate, endDate, notes) VALUES(?,?,?,?,?,?)';
      db.run(insert, [20, "Penicillin", 123, "01/01/2022", "01/02/2022",  'To help with infection']);
      db.run(insert, [21, "Penicillin", 125, "01/01/2022", "01/02/2022", 'To help with infection']);
      db.run(insert, [22, "Penicillin", 127, "01/01/2022", "01/02/2022", 'To help with infection']);
      db.run(insert, [23, "Penicillin", 129, "01/01/2022", "01/02/2022", 'To help with infection']);
      db.run(insert, [24, "Penicillin", 132, "01/01/2022", "01/02/2022", 'To help with infection']);
      db.run(insert, [25, "Penicillin", 134, "01/01/2022", "01/02/2022", 'To help with infection']);
      db.run(insert, [26, "Penicillin", 136, "01/01/2022", "01/02/2022", 'To help with infection']);
      db.run(insert, [27, "Penicillin", 138, "01/01/2022", "01/02/2022", 'To help with infection']);
      db.run(insert, [28, "Penicillin", 140, "01/01/2022", "01/02/2022", 'To help with infection']);
      db.run(insert, [29, "Test 1", 123, "01/01/2022", "01/02/2022",  'To help with infection']);
      db.run(insert, [30, "Test 2", 123, "01/01/2022", "01/02/2022",  'To help with infection']);


      
   

    }
  });



// export as module, called db
module.exports = db;