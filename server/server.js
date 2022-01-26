var express = require("express")
var cors = require('cors');
var bodyParser = require("body-parser");
var db = require("./database.js")

var app = express()

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.json());

// Server port
var HTTP_PORT = 8081

// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});

// Root endpoint
app.get("/", (req, res, next) => {
   res.json({"message":"Ok"})
});

//start of patient table requests 


// list all patients
app.get("/patient", (req, res, next) => {
    console.log("SELECT Patient.");
    let sql = `SELECT name, dob, email, patientId, address, allergy, gender FROM patient ORDER BY name`;
    var params = []

    db.all(sql, params, (err, rows) => {

        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        rows.forEach((row) => {
            console.log( row.name + row.dob + row.email +  row.patientId + row.address + row.allergy + row.gender)
          });

        res.send(rows)
        
      });
});

/*/ Get a single patient by name, *
app.get("/patient/:name", (req, res, next) => {
    let sql = "select * from patient where name = ?"
    var params = [req.params.name]
    db.get(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        console.log("name=" + row.name + "dob=" + row.dob + "email=" + row.email + "patientId=" + row.patientId + "address=" + row.address + "allergy=" + row.allergy)
        res.json({
            "message":"success",
            "data":row
        })
      });
});
*/

// Get a single PATIENT by id, 
app.get("/patientId/:patientId", (req, res, next) => {
     sql = "select * from patient where patientId = ?"
    var params = [req.params.patientId]
    db.get(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.send(row)
      });
});




// Create a new patient
app.post("/patient/", (req, res, next) => {
    var errors=[]
    if (!req.body.name){
        errors.push("Name for patient not specified");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }



    var data = {
        name: req.body.name,
        dob: req.body.dob,
        email: req.body.email,
        patientId: req.body.patientId,
        address: req.body.address,
        allergy: req.body.allergy,
        gender: req.body.gender
    }
    var sql ='INSERT INTO patient (name, dob, email, patientId, address, allergy, gender ) VALUES (?,?,?,?,?,?, ?)'
    var params =[data.name, data.dob, data.email, data.patientId, data.address, data.allergy, data.gender]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id" : this.lastID
        })
        console.log('saved');
    });
});


// update Patient
// we use COALESCE function to keep the current value if there is no new value (null)
app.put("/updatePatient/:name", (req, res, next) => {
    console.log("UPDATE Patient:" + req.params.name);
    var data = {
      name: req.body.name,
      dob: req.body.dob,
      email: req.body.email,
      patientId: req.body.patientId,
      address: req.body.address,
      allergy: req.body.allergy,
      gender: req.body.gender
    }
    console.log("UPDATE Patient: data.name = " + data.name);
    db.run(
        `UPDATE patient set 
           name = COALESCE(?,name), 
           dob = COALESCE(?,dob),
           email = COALESCE(?,email),
           patientId = COALESCE(?,patientId), 
           address = COALESCE(?,address),
           allergy = COALESCE(?,allergy),
           gender = COALESCE(?,gender)
             WHERE name = ?`,

        [data.name, data.dob, data.email, data.patientId , data.address, data.allergy, data.gender, req.params.name],
        function (err, response) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({
                message: "success",
                data: data,
                changes: this.changes
            })
    });
})

// Delete patient by id
app.delete("/deletePatient/:patientId", (req, res, next) => {

    console.log("DELETE PATIENT:" + req.params.patientId);

    db.run(
        'DELETE FROM patient WHERE patientId = ?',
        req.params.patientId,
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({"message":"deleted", changes: this.changes})
    });
})





//Treatment Table Requests 


//Display all treatment results from the treatment table which are not completed. Where clause used to check if endDate is null....

app.get("/treatment", (req, res, next) => {
    console.log("SELECT Treatment.");
    let sql = `SELECT treatmentId, patientId, treatmentType, treatmentCategory, startDate, prescription, endDate FROM treatment WHERE endDate is null ORDER BY treatmentId`;
    var params = []

    db.all(sql, params, (err, rows) => {

        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        rows.forEach((row) => {
            console.log("id=" + row.treatmentId + "patientId" + row.patientId + "type=" + row.treatmentType + "category=" + row.treatmentCategory + "startdate=" + row.startDate + "prescription=" + row.prescription)
          });

        res.send(rows)
        
        
      });
});

app.get("/completedtreatment", (req, res, next) => {
    console.log("SELECT Treatment.");
    let sql = `SELECT treatmentId, patientId, treatmentType, treatmentCategory, startDate, prescription, endDate FROM treatment WHERE endDate is not null ORDER BY treatmentId`;
    var params = []

    db.all(sql, params, (err, rows) => {

        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        rows.forEach((row) => {
            console.log("id=" + row.treatmentId + "patientId" + row.patientId + "type=" + row.treatmentType + "category=" + row.treatmentCategory + "startdate=" + row.startDate + "prescription=" + row.prescription)
          });

        res.send(rows)
        
        
      });
});

//Save a treatment result 

app.post("/treatment", (req, res, next) => {
    var errors=[]
    if (!req.body.treatmentId){
        errors.push("ID for Treatment not specified");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }

    var data = {
        treatmentId: req.body.treatmentId,
        patientId: req.body.patientId,
        treatmentType: req.body.treatmentType,
        treatmentCategory: req.body.treatmentCategory,
        startDate:  req.body.startDate,
        prescription: req.body.prescription
       
    }
    var sql ='INSERT INTO treatment(treatmentId, patientId, treatmentType, treatmentCategory, startDate, prescription ) VALUES (?,?,?,?,?,?)'
    var params =[data.treatmentId, data.patientId, data.treatmentType, data.treatmentCategory, data.startDate, data.prescription]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id" : this.lastID
        })
    });
});


// Select from treatment where patient id = props
app.get("/treatmentbyid/:patientId", (req, res, next) => {
    sql = "select * from treatment where patientId = ? AND endDate is null"
   var params = [req.params.patientId]
   db.all(sql, params, (err, rows) => {
       if (err) {
         res.status(400).json({"error":err.message});
         return;
       }
       res.send(rows)
     });
});

// Select all patient from patient table where patientId = props

app.get("/patientsearch/:patientId", (req, res, next) => {
    sql = "select * from patient where patientId = ?"
   var params = [req.params.patientId]
   db.get(sql, params, (err, row) => {
       if (err) {
         res.status(400).json({"error":err.message});
         return;
       }
       res.send(row)
  
     });
});

//Delete treatment ID 

app.delete("/deleteTreatment/:treatmentId", (req, res, next) => {

    console.log("DELETE TREATMENT:" + req.params.treatmentId);

    db.run(
        'DELETE FROM treatment WHERE treatmentId = ?',
        req.params.treatmentId,
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({"message":"deleted", changes: this.changes})
    });
})


// Update Treatment 
// we use COALESCE function to keep the current value if there is no new value (null)
app.put("/updateTreatment/:treatmentId", (req, res, next) => {
    console.log("UPDATE Treatment:" + req.params.treatmentId);
    var data = {
        treatmentId: req.body.treatmentId,
        patientId: req.body.patientId,
        treatmentType: req.body.treatmentType,
        treatmentCategory: req.body.treatmentCategory,
        startDate:  req.body.startDate,
        prescription: req.body.prescription
       
    }
    console.log("UPDATE Treatment: data.treatmentId = " + data.treatmentid);
    db.run(
        `UPDATE treatment set 
           treatmentId = COALESCE(?,treatmentId), 
           patientId = COALESCE(?,patientId),
           treatmentType = COALESCE(?,treatmentType),
           treatmentCategory = COALESCE(?,treatmentCategory),
           startDate = COALESCE(?,startDate), 
           prescription = COALESCE(?,prescription)
        
             WHERE treatmentId = ?`,

        [data.treatmentId, data.patientId, data.treatmentType, data.treatmentCategory, data.startDate , data.prescription, req.params.treatmentId],
        function (err, response) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({
                message: "success",
                data: data,
                changes: this.changes
            })
    });
})



//Start of Allergy requests

//Select all allergies from the allergy table
app.get("/allergy", (req, res, next) => {
    console.log("SELECT Allergy.");
    let sql = `SELECT allergyId, allergyName, risk, patientId, notes FROM allergy ORDER BY allergyId`;
    var params = []

    db.all(sql, params, (err, rows) => {

        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }

        res.send(rows)
        
      });
});

// Create a new Allergy
app.post("/createallergy", (req, res, next) => {
    var errors=[]
    if (!req.body.allergyId){
        errors.push("Allergy ID for patient not specified");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }

    var data = {
      allergyId: req.body.allergyId,
      allergyName: req.body.allergyName,
      risk: req.body.risk,
      patientId: req.body.patientId,
      notes: req.body.notes
    }
    var sql ='INSERT INTO allergy (allergyId, allergyName, risk, patientId, notes ) VALUES (?,?,?,?,?)'
    var params =[data.allergyId, data.allergyName, data.risk, data.patientId, data.notes]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id" : this.lastID
        })
        console.log('saved');
    });
});

app.put("/updateallergy/:allergyId", (req, res, next) => {
    console.log("UPDATE Allergy:" + req.params.allergyId);
    var data = {
       allergyId: req.body.allergyId,
       allergyName: req.bodyallergyName,
       risk: req.body.risk,
       patientId: req.body.patientId,
       notes: req.body.notes
       
    }
    console.log("UPDATE allergy for allergy number" + data.allergyId);
    db.run(
        `UPDATE allergy set 
           allergyId = COALESCE(?,allergyId), 
           allergyName = COALESCE(?,allergyName),
           risk = COALESCE(?,risk),
           patientId = COALESCE(?,patientId),
           notes = COALESCE(?,notes)
             WHERE allergyId = ?`,

        [data.allergyId, data.allergyName, data.risk, data.patientId, data.notes],
        function (err, response) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            console.log("completed")
            res.json({
                message: "success",
                data: data,
                changes: this.changes
            })
    });
})


//select allergies from allergies table by patient id 

app.get("/allergybyid/:patientId", (req, res, next) => {
    sql = "select * from allergy where patientId = ?"
   var params = [req.params.patientId]
   db.all(sql, params, (err, rows) => {
       if (err) {
         res.status(400).json({"error":err.message});
         return;
       }
       res.send(rows)
     });
});

//Start of Prescription api requests

app.get("/prescription", (req, res, next) => {
    console.log("SELECT Prescription.");
    let sql = `SELECT prescriptionId, prescriptionName, treatmentId, startDate, endDate, notes FROM prescription ORDER BY prescriptionId`;
    var params = []

    db.all(sql, params, (err, rows) => {

        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }

        res.send(rows)
        
      });
});

app.post("/createprescription", (req, res, next) => {
    var errors=[]
    if (!req.body.prescriptionId){
        errors.push("ID for prescription not specified");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }

    var data = {
      prescriptionId: req.body.prescriptionId,
      prescriptionName: req.body.prescriptionName,
      treatmentId: req.body.treatmentId,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      notes: req.body.notes
    }
    var sql ='INSERT INTO prescription(prescriptionId, prescriptionName, treatmentId, startDate, endDate, notes ) VALUES (?,?,?,?,?,?)'
    var params =[data.prescriptionId, data.prescriptionName, data.treatmentId, data.startDate, data.endDate, data.notes]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id" : this.lastID
        })
        console.log('saved');
    });
});

app.get("/prescriptionbyid/:treatmentId", (req, res, next) => {
    sql = "select * from prescription where treatmentId = ?"
   var params = [req.params.treatmentId]
   db.all(sql, params, (err, rows) => {
       if (err) {
         res.status(400).json({"error":err.message});
         return;
       }
       res.send(rows)
     });
});

app.get("/highrisktreatment", (req, res, next) => {
    sql = "select count(*) AS highRiskCount from treatment where treatmentCategory = 'High'"
   db.all(sql, (err, rows) => {
       if (err) {
         res.status(400).json({"error":err.message});
         return;
       }
       res.json(rows[0].highRiskCount)
     });
});

app.get("/completedcount", (req, res, next) => {
    sql = "select count(*) AS completedCount from treatment where endDate is not null"
   db.all(sql, (err, rows) => {
       if (err) {
         res.status(400).json({"error":err.message});
         return;
       }
       res.json(rows[0].completedCount)
     });
});

app.get("/allcompleted", (req, res, next) => {
    console.log("SELECT ALL.");
    let sql = `SELECT patient.patientId, patient.name, patient.dob, patient.address, patient.email, patient.allergy, patient.gender, treatment.treatmentId, treatment.treatmentType, treatment.treatmentCategory,  treatment.startDate, treatment.endDate , treatment.prescription FROM patient INNER JOIN treatment ON treatment.patientId = patient.patientId where endDate is not null` ;
    var params = []

    db.all(sql, params, (err, rows) => {

        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }

        res.send(rows)
        
        
      });
});


//Updating a treatment by treatment ID in order to assign an end state. This will allow me to create a is completed capability. 


app.put("/completed/:treatmentId", (req, res, next) => {
    console.log("Completing Treatment.......:" + req.params.treatmentId);
    var data = {
     endDate: req.body.endDate
    }
    console.log("Completed on  = " + data.endDate);
    db.run(
        `UPDATE treatment set 
           endDate = COALESCE(?,endDate)
             WHERE treatmentId = ?`,

        [data.endDate, req.params.treatmentId],
        function (err, response) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({
                message: "success",
                data: data,
                changes: this.changes
            })
    });
})




// Default response for any other request
app.use(function(req, res){
    res.status(404);
});