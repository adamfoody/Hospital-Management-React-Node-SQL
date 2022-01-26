import React, {useState, useEffect} from 'react'
import axios from "axios"
import { useAuth0 } from '@auth0/auth0-react'
import {
Button,
    Link,
    Grid,
  Typography, Pape, Box, Paper, TextField
   
 } from '@material-ui/core';
 import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
 import SplitButton from "./SplitButton.js"
 import { Clock } from './Clock.js';
 import { DateToday } from './Date.js';

 import CheckBoxTwoToneIcon from '@mui/icons-material/CheckBoxTwoTone';
 import CalendarTodayTwoToneIcon from '@mui/icons-material/CalendarTodayTwoTone';
 import PriorityHighTwoToneIcon from '@mui/icons-material/PriorityHighTwoTone';
 import AccessTimeTwoToneIcon from '@mui/icons-material/AccessTimeTwoTone';
 import LocalHospitalTwoToneIcon from '@mui/icons-material/LocalHospitalTwoTone';
 import SavedSearchTwoToneIcon from '@mui/icons-material/SavedSearchTwoTone';
 import ReceiptLongTwoToneIcon from '@mui/icons-material/ReceiptLongTwoTone';

export const HomePage = () => {


    function fetchPatientRecords() {
        axios.get('http://localhost:8081/patient').then((response) => {
          // handle success
          setPatients(response.data);
          let data = JSON.stringify(response.data);
         

          
         
        });
      }

    function fetchTreatmentRecords() {
        axios.get('http://localhost:8081/treatment').then((response) => {
          // handle success
          setTreatments(response.data);
        
        });
      } 
  
      function fetchAllergyRecords() {
        axios.get('http://localhost:8081/allergy').then((response) => {
          // handle success
          setAllergy(response.data);
        
        });
      } 
  
      function fetchPrescriptionRecords() {
        axios.get('http://localhost:8081/prescription').then((response) => {
          // handle success
          setPrescription(response.data);
        
        });
      } 
  
  
    function fetchHighRisk(){
      axios.get('http://localhost:8081/highrisktreatment').then((response) => {
        setHighRisk(response.data)

      });

    }

    function fetchCompletedCount(){
      axios.get('http://localhost:8081/completedcount').then((response) => {
        setCompleted(response.data)

      });

    }

   

    const {isAuthenticated} = useAuth0();
    const [patients, setPatients] = useState([]);
    const [treatments, setTreatments] = useState([]);
    const [allergy, setAllergy] = useState([]);
    const [prescription, setPrescription] = useState([]);
    const [highRisk, setHighRisk] = useState();
    const [completed, setCompleted] = useState([]);

    useEffect(() => {
        fetchPatientRecords();
        fetchTreatmentRecords();
        fetchAllergyRecords();
        fetchPrescriptionRecords();
        fetchHighRisk();
        fetchCompletedCount();
      }, []);
   
 
    return (
        <div align="center" className='HomePage'>
       
<Box sx={{ width: '100%' }}>
     <Grid  item xs={12} md={4} container spacing={3} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3}}>
     <Grid item xs={6} className="hpGrid2">
       
         <Paper
            sx={{
             p: 2,
             display: 'flex',
            flexDirection: 'column',
            height: 240,
            margin: 5,
            }}
            >

        <Typography component="p" variant="h5">  Date </Typography>
  
        
        <Typography component="p" variant="h5" style={{  color:"red" }}>
        <DateToday/>
  
     
        </Typography>
            <div>
                <CalendarTodayTwoToneIcon
                style={{ fontSize: 50, color:"#3f51b5" }} />
            </div>
        </Paper>

            </Grid>
            <Grid item xs={6}className="hpGrid2">
            <Paper
            sx={{
             p: 2,
             display: 'flex',
            flexDirection: 'column',
            height: 240,
            margin: 5,
            }}
            >

        <Typography component="p" variant="h5">  Time</Typography>
        <Typography component="p" variant="h5" style={{  color:"red" }}>
        <Clock/>
  
        </Typography>
            <div>
            <AccessTimeTwoToneIcon
                style={{ fontSize: 50, color:"#3f51b5" }} />
            </div>
        </Paper>
       
       </Grid>
       <Grid item xs={6} className="hpGrid2">
       
       <Paper
          sx={{
           p: 2,
           display: 'flex',
          flexDirection: 'column',
          height: 240,
          margin: 5,
          }}
          >

      <Typography component="p" variant="h5">  Patients </Typography>
      <Typography component="p" variant="h5" style={{  color:"red" }}>
      {patients.length}  
      </Typography>
          <div>
              <PeopleAltIcon
              style={{ fontSize: 50, color:"#3f51b5" }} />
          </div>
     
  
      </Paper>

          </Grid>
          <Grid item xs={6}className="hpGrid2">
          <Paper
          sx={{
           p: 2,
           display: 'flex',
          flexDirection: 'column',
          height: 240,
          margin: 5,
          }}
          >

      <Typography component="p" variant="h5">  Treatments</Typography>
      <Typography component="p" variant="h5" style={{  color:"red" }}>
      {treatments.length}
      </Typography>
          <div>
              <LocalHospitalTwoToneIcon
              style={{ fontSize: 50, color:"#3f51b5" }} />
          </div>
     
      </Paper>
     
     </Grid>
       <Grid item xs={6}className="hpGrid2">
            <Paper
            sx={{
             p: 2,
             display: 'flex',
            flexDirection: 'column',
            height: 240,
            margin: 5,
            }}
            >

        <Typography component="p" variant="h5">  Allergy </Typography>
        <Typography component="p" variant="h5" style={{  color:"red" }}>
        {allergy.length}
        </Typography>
            <div>
                <SavedSearchTwoToneIcon
                style={{ fontSize: 50, color:"#3f51b5" }} />
            </div>
        </Paper>
       
       </Grid>
       <Grid item xs={6}className="hpGrid2">
            <Paper
            sx={{
             p: 2,
             display: 'flex',
            flexDirection: 'column',
            height: 240,
            margin: 5,
            }}
            >
      <Typography component="p" variant="h5" style={{  color:"red" }}>
       
     
      </Typography>
     
        <Typography component="p" variant="h5"> Prescription </Typography>
        <Typography component="p" variant="h5" style={{  color:"red" }} >
        {prescription.length}
        </Typography>
            <div>
                <ReceiptLongTwoToneIcon
                style={{ fontSize: 50, color:"#3f51b5" }} />
            </div>
        </Paper>
       
       </Grid>
       <Grid item xs={6}className="hpGrid2">

       <Paper
            sx={{
             p: 2,
             display: 'flex',
            flexDirection: 'column',
            height: 240,
            margin: 5,
            }}
            >
                 <Typography component="p" variant="h5">  Critical</Typography>
      <Typography component="p" variant="h5" style={{  color:"red" }}>
      {highRisk} 
       
     
      </Typography>
          <div>
              <PriorityHighTwoToneIcon
              style={{ fontSize: 50, color:"#3f51b5" }} />
          </div>
          </Paper>
       </Grid>
       <Grid item xs={6}className="hpGrid2">

<Paper
     sx={{
      p: 2,
      display: 'flex',
     flexDirection: 'column',
     height: 240,
     margin: 5,
     }}
     >
          <Typography component="p" variant="h5">  Completed</Typography>
<Typography component="p" variant="h5" style={{  color:"red" }}>

     {completed}
</Typography>
   <div>
       <CheckBoxTwoToneIcon
       style={{ fontSize: 50, color:"#3f51b5" }} />
   </div>
   </Paper>
</Grid>

       


    </Grid>
 


    
 
</Box>

       
        </div>
    )
}
