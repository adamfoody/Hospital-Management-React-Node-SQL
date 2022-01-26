
import Swal from 'sweetalert2';
import "./App.css";
import React , {useState, useEffect} from "react"
import axios from 'axios';
import {Grid, Button, TableLabel,ButtonGroup, TableContainer, Table,FormControl, Paper, TableHead, TableRow, TableCell, TableBody, makeStyles, MenuItem, Select, InputLabel} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles'
// I need to useEffect to render the table once automatically so it's not just a blank page. Add a filter by Category .filter() select  Then return the filtered data
import { green, yellow} from '@material-ui/core/colors'
import { width } from '@mui/system';
import { Clock } from './Clock.js';
import { DateToday } from './Date.js';

const GreenButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(green[500]),
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700]
    },
    color: yellow
  }
}))(Button)

const useStyles = makeStyles((theme) => ({
    tableHead: {
        borderBottomStyle: "solid",
        borderBottomColor: "blue"
    },
    stickyHeader:{
      
    }
}));



export default function TreatmentTable() {

    const classes = useStyles();
    const [treatments, setTreatments] = useState([]);
    const [patientsById, setPatientsById] = useState([]);

  const [displayTreatments, setDisplayTreatments] = useState(true);
  const [displayPatientsForTreatments, setDisplayPatientsForTreatments] = useState(false);



  const [prescriptionById, setPrescriptionById] = useState([]);
  const [displayPrescriptionForTreatment, setDisplayPrescriptionForTreatment] = useState(false);



    function fetchTreatmentRecords() {
      axios.get('http://localhost:8081/treatment').then((response) => {
        // handle success
        setTreatments(response.data);
      
      });
    } 


  function displayTreatmentHandler() {
    fetchTreatmentRecords();
  }

  useEffect(() => {
    fetchTreatmentRecords();
  
  }, []);


  function fetchPatientRecordsById(patientId1) {
    axios
      .get(`http://localhost:8081/patientsearch/${patientId1}`)
      .then((response) => {
        // handle success
        setPatientsById(response.data);
        setDisplayPatientsForTreatments(true);
 
        Swal.fire({
          icon: 'info',
          title: 'Scroll down to see the Patient details!',
       
        })

        
       
      });
  }

  const handleClosePatientsForTreatments = () => {
      setDisplayPatientsForTreatments(false);

  }

  const handleClosePrescriptionForTreatments = () => {
    setDisplayPrescriptionForTreatment(false);

}

  function deleteTreatment(treatment1) {
    axios
      .delete(`http://localhost:8081/deleteTreatment/${treatment1}`)
      .then((response) => {
        // handle success
        Swal.fire({
          icon: 'error',
          title: "Deleted Treatment Record"
        
         
        })
      });

      
  }



  //Complete is a function which updates the endDate column record by treatment ID. This 


  function Complete(treatment1) {
   
    var dateVariable = Date().toLocaleString();

    const value = {
      endDate: dateVariable
  };
    axios
      .put(`http://localhost:8081/completed/${treatment1}`, value)
      .then((response) => {
        // handle success
        Swal.fire({
          icon: 'success',
          title: "Completed Treatment Record",
          text: dateVariable
        
         
        })
      });

      
  }


  function fetchPrescriptionRecordsById(treatmentId1) {
    axios
      .get(`http://localhost:8081/prescriptionbyid/${treatmentId1}`)
      .then((response) => {
        // handle success
        setPrescriptionById(response.data);
        setDisplayPrescriptionForTreatment(true);

        Swal.fire({
          icon: 'info',
          title: 'Scroll down for Prescription Result.!',
       
        })
        
        
       
      });
  }

//Creating state and onChange function for the category filter.. 

    const [catValue, setCatValue] = useState("High");

    const handleFilterTreatment = (e) => setCatValue(e.target.value);

 




    return (
        <div>
        
      {  displayTreatments == true && (


        
          <TableContainer component={Paper} className={classes.tableContainer}>
          

          <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table" variant="outlined" >
   
     
       
    
        <TableRow >
    
          <TableCell><strong> Treatment ID     <ButtonGroup className="refreshButton"> 

<GreenButton
      variant='contained'
       color='secondary'
       size="small"
       onClick={fetchTreatmentRecords}
   
      
       >Refresh</GreenButton>

  </ButtonGroup></strong> </TableCell>
          <TableCell><strong> Patient ID </strong> </TableCell>
          <TableCell align="right"> <strong> Type </strong></TableCell>
          <TableCell align="right"> 
          
           
                
           <FormControl style={{ width: "200px"}}>
             <InputLabel> Category </InputLabel>
        <Select onChange={handleFilterTreatment} > 
          <MenuItem variant="outlined" value={"High"}>High</MenuItem>
          <MenuItem value={"Medium"}>Medium</MenuItem>
          <MenuItem value={"Low"}>Low</MenuItem>
       </Select>
       </FormControl>
           
           
            </TableCell>
          <TableCell align="right"><strong> Start Date</strong></TableCell>
          <TableCell align="right"><strong> Prescription</strong></TableCell>
          <TableCell align="right"><strong> View Patient </strong> </TableCell>
          <TableCell align="right"><strong> Complete Treatment </strong></TableCell>
        </TableRow>
      
      <TableBody>
 
        {    treatments.filter(row => row.treatmentCategory === catValue).map((row) => (
          <TableRow
            key={row.treatmentId}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row"> {row.treatmentId} </TableCell>
            <TableCell component="th" scope="row"> {row.patientId} </TableCell>
            <TableCell align="right">{row.treatmentType}</TableCell>
            <TableCell align="right">{row.treatmentCategory}</TableCell>
            <TableCell align="right">{row.startDate}</TableCell>
          

              {row.prescription == 0 && (
              <TableCell align="right"> No Prescription &#10060;</TableCell>
              )}
              {row.prescription == 1 && (
              <TableCell align="right" className="hasPrescription"> 
              <Button
                size="small"
                 align="right"
                 className="smallButton"
                 variant="outlined"
                 color="secondary"
                 onClick={() => {
                    fetchPrescriptionRecordsById(row.treatmentId);
                  }}
              
                >
                Prescription
                
                 </Button>
              </TableCell>
              )}
              <TableCell> 
              <Grid container justifyContent="flex-end">

              <Button
                className="smallButton"
                color="primary"
                variant="outlined"
                size="small"
                onClick={() => {
                  fetchPatientRecordsById(row.patientId);
                }}

            
              >
               
           
             
                View
              </Button>
              </Grid>
         
                </TableCell>
                <TableCell>
                <Grid container justifyContent="flex-end">
              <GreenButton
                className="smallButton"
                variant='contained'
       color='secondary'
                size="small"
                onClick={() => {
                  Complete(row.treatmentId);
                  }}
             
              >
            
             Complete
              </GreenButton>
              </Grid>
                
              </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>





          </TableContainer>

    

        
          
      )}
   
    
  

        
      <main>

{displayPatientsForTreatments == true && (

<TableContainer component={Paper} className={classes.tableContainer}>
    

    <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table" variant="outlined" >
<TableHead >
<TableCell
        style={{
            borderBottom: "2px solid #3f51b5", borderTop: "2px solid #3f51b5"
            
            
        }}


    >   
          <Button
            align="right"
          color="secondary"
          variant="contained"
          align-self="right"
          size='small'
          onClick={handleClosePatientsForTreatments}
       
        >
         
        
       Close Patient: {patientsById.name}
        </Button>
   
    </TableCell>

  <TableRow >

    <TableCell><strong> Patient Name</strong> </TableCell>
    <TableCell align="right"> <strong>DOB</strong></TableCell>
    <TableCell align="right"><strong> ADDRESS</strong> </TableCell>
    <TableCell align="right"><strong> Patient ID </strong></TableCell>
    <TableCell align="right"><strong> Email </strong></TableCell>
    <TableCell align="right"><strong> Allergy </strong></TableCell>
    <TableCell align="right"><strong> Gender </strong></TableCell>
 
  </TableRow>
</TableHead>
<TableBody>

    <TableRow
      key={patientsById.patientId}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {patientsById.name}
      </TableCell>
      
      <TableCell align="right">{patientsById.dob}</TableCell>
      <TableCell align="right">{patientsById.address}</TableCell>
      <TableCell align="right">{patientsById.patientId}</TableCell>
      <TableCell align="right">{patientsById.email}</TableCell>

        {patientsById.allergy == 0 && (
        <TableCell align="right">None &#10060;</TableCell>
        )}
        {patientsById.allergy == 1 && (
        <TableCell align="right" className="hasAllergy"> 
        <strong>Allergy &#10004; </strong> 
        </TableCell>
        )}
    
        <TableCell align="right">{patientsById.gender}</TableCell>
            



    </TableRow>

</TableBody>
</Table>





    </TableContainer>
    

    )}

    {displayPrescriptionForTreatment === true && (







<TableContainer component={Paper} className={classes.tableContainer}>


<Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table" variant="outlined" >
<TableHead >
<TableCell
    style={{
        borderBottom: "2px solid #3f51b5", borderTop: "2px solid #3f51b5"
        
        
    }}


>   
      <Button
        align="right"
      color="secondary"
      variant="contained"
      align-self="right"
      size="small"
      onClick={handleClosePrescriptionForTreatments}
     
   
    >
     
    
   Close Treatment ID: {prescriptionById[0].treatmentId}
    </Button>

</TableCell>

<TableRow >

<TableCell align=""><strong> Prescription ID</strong> </TableCell>
<TableCell align=""><strong> Prescription Name</strong> </TableCell>

<TableCell align=""><strong> Treatment ID </strong> </TableCell>
<TableCell align=""> <strong>Start Date</strong></TableCell>
<TableCell align=""> <strong>End Date</strong></TableCell>
<TableCell align=""><strong> Notes </strong></TableCell>


</TableRow>
</TableHead>
<TableBody>

{prescriptionById.map((row) => (



<TableRow
  key={row.prescriptionId}
  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
>
  <TableCell component="th" scope="row">
    {row.prescriptionId}</TableCell>
  <TableCell >{row.prescriptionName}</TableCell>
  <TableCell >{row.treatmentId}</TableCell>
  <TableCell >{row.startDate}</TableCell>
  <TableCell >{row.endDate}</TableCell>
  <TableCell >{row.notes}</TableCell>

  
   

</TableRow>
))}


</TableBody>
</Table>





</TableContainer>
)}

    

</main>
                  
    
            
        </div>
    )
}


