import "./App.css";
import React , {useState, useEffect} from "react"
import axios from 'axios';
import {Grid, TableContainer, Button, Table, Paper, TableHead, TableRow, TableCell, TableBody, makeStyles, ButtonGroup} from '@material-ui/core';
import Swal from 'sweetalert2';
import { withStyles } from '@material-ui/core/styles'
import { green, yellow} from '@material-ui/core/colors'


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




export default function PatientTable() {

    const classes = useStyles();

    const [patients, setPatients] = useState([]);
    const [displayPatients, setDisplayPatients] = useState(true);

    // will be used to render the treatment by id for the patient tables 
    const [treatmentsById, setTreatmentsById] = useState([]);
    const [displayTreatmentForPatient, setDisplayTreatmentForPatient] = useState(false);

    const [displayAllergyForPatient, setDisplayAllergyForPatient] = useState(false);
    const [allergyById, setAllergyById] = useState([]);

    function fetchPatientRecords() {
        axios.get('http://localhost:8081/patient').then((response) => {
          // handle success
          setPatients(response.data);
          let data = JSON.stringify(response.data);
         

          
         
        });
      }

      function deletePatient(patient1) {
        axios
          .delete(`http://localhost:8081/deletePatient/${patient1}`)
          .then((response) => {
            // handle success
            var resData = response.data;
            let data = JSON.stringify(resData);
            Swal.fire({
              icon: 'error',
              title: "Deleted Patient"
            
             
            });
          });
          fetchPatientRecords();
      }


      function deletePatientHandler() {
        deletePatient();
   
        
      }

      const closeTreatments = () => {
        setDisplayTreatmentForPatient(false);


      }

      const closeAllergy = () => {
        setDisplayAllergyForPatient(false);


      }

      
          
      

      function fetchTreatmentRecordsById(patientId1) {
        axios
          .get(`http://localhost:8081/treatmentbyid/${patientId1}`)
          .then((response) => {
            // handle success
            setTreatmentsById(response.data);
            setDisplayTreatmentForPatient(true);
            Swal.fire({
              icon: 'info',
              title: 'Scroll down for Treatment Result.',
           
            })
            
            
           
          });
      }

      

      function fetchAllergyRecordsById(patientId1) {
        axios
          .get(`http://localhost:8081/allergybyid/${patientId1}`)
          .then((response) => {
            // handle success
            setAllergyById(response.data);
            setDisplayAllergyForPatient(true);

            Swal.fire({
              icon: 'info',
              title: 'Scroll down for Allergy Result.!',
           
            })
            
            
           
          });
      }

    // useEffect with an empty array at the end. This means it will be called just once when the component is mounted. 

    useEffect(() => {
        fetchPatientRecords();
      }, []);
   

          
          
    return (     
    



        <div className="patientTable">
        <main className="text-align-center">
      
        {  displayPatients == true && (


          
            <TableContainer component={Paper} className={classes.tableContainer}>
            

            <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table" variant="outlined" >
    


      
          <TableRow >
      
            <TableCell>Full Name   <ButtonGroup className="refreshButton"> 

<GreenButton
      variant='contained'
       color='secondary'
       size="small"
       onClick={fetchPatientRecords}
   
      
       >Refresh</GreenButton>

  </ButtonGroup></TableCell>
            <TableCell align="right"> Patient ID </TableCell>
            <TableCell align="right"> DOB </TableCell>
            <TableCell align="right"><strong> Address</strong></TableCell>
            <TableCell align="right"><strong> Email </strong></TableCell>
            <TableCell align="right"><strong> Allergy </strong></TableCell>
            <TableCell align="right"><strong> Gender </strong></TableCell>
            <TableCell align="right"><strong> View Treatment </strong> </TableCell>
            <TableCell align="right"><strong> Delete Patient</strong></TableCell>
          </TableRow>
    
        <TableBody>
          {patients.map((row) => (
            <TableRow
              key={row.patientId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.patientId}</TableCell>
              <TableCell align="right">{row.dob}</TableCell>
              <TableCell align="right">{row.address}</TableCell>
              <TableCell align="right">{row.email}</TableCell>

                {row.allergy == 0 && (
                <TableCell align="right"> None &#x274C; </TableCell>
                )}
                {row.allergy == 1 && (
                <TableCell align="right" className="hasAllergy"> 
                <Button
                size="small"
                 align="right"
                 className="smallButton"
                 variant="outlined"
                 color="secondary"
                 onClick={() => {
                    fetchAllergyRecordsById(row.patientId);
                  }}
                >
                Allergy
                
                 </Button>
                </TableCell>
                )}
                <TableCell align="right"> {row.gender} </TableCell>
                <TableCell align="right"> 
              <Grid container justifyContent="flex-end">
                <Button
                 size="small"
                  className="smallButton"
                  color="primary"
                  variant="outlined"
                  onClick={() => {
                    fetchTreatmentRecordsById(row.patientId);
                  }}
                >
                
                  View
                </Button>
                </Grid>

                </TableCell>


                <TableCell align="right">
                  

                <Button
              
            
                 size="small"
                  className="smallButton"
                  color="secondary"
                  variant="outlined"
                  onClick={() => {
                    deletePatient(row.patientId);
                  }}
                 
                >
              
                  Delete
                </Button>
                
                  
                </TableCell>
                
            </TableRow>
          ))}
        </TableBody>
      </Table>
  




            </TableContainer>

      
  
          
            
        )}
     
      
        </main>

        <main>

                  



        </main>
        
        <main>

        {displayTreatmentForPatient == true && (
          



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
                  onClick={closeTreatments}
               
                >
                 
                
               Close Patient ID: {treatmentsById[0].patientId}
                </Button>
           
            </TableCell>
      
          <TableRow >
      
            <TableCell><strong> Treatment ID</strong> </TableCell>
            <TableCell><strong> Patient ID</strong> </TableCell>
            <TableCell > <strong>Type</strong></TableCell>
            <TableCell ><strong> Category</strong> </TableCell>
            <TableCell ><strong> Start Date </strong></TableCell>
            <TableCell ><strong> Prescription</strong></TableCell>
         
          </TableRow>
        </TableHead>
        <TableBody>

        {treatmentsById.map((row) => (
            <TableRow
              key={row.treatmentId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.treatmentId}
              </TableCell>
              <TableCell >{row.patientId}</TableCell>
              <TableCell >{row.treatmentType}</TableCell>
              <TableCell >{row.treatmentCategory}</TableCell>
              <TableCell >{row.startDate}</TableCell>

                {row.prescription == 0 && (
                <TableCell >None &#10060;</TableCell>
                )}
                {row.prescription == 1 && (
                <TableCell  className="hasPrescription"> 
                <strong> Prescription &#10004; </strong> 
                </TableCell>
                )}
                <TableCell> 
                    

                </TableCell>

            

            </TableRow>
            ))}
        
        </TableBody>

       
      </Table>
     
  



            </TableContainer>
     
            

            )}

            {displayAllergyForPatient === true && (







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
                  onClick={closeAllergy}
                 
               
                >
                 
                
               Close Allergy ID: {allergyById[0].patientId}
                </Button>
           
            </TableCell>
      
          <TableRow >
      
            <TableCell align=""><strong> Allergy ID</strong> </TableCell>
            <TableCell align=""><strong> Allergy Name</strong> </TableCell>
          
            <TableCell align=""><strong> Risk </strong> </TableCell>
            <TableCell align=""> <strong>Patient ID</strong></TableCell>
            <TableCell align=""><strong> Notes </strong></TableCell>
        
         
          </TableRow>
        </TableHead>
        <TableBody>
    
        {allergyById.map((row) => (
            <TableRow
              key={row.allergyId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.allergyId}</TableCell>
              <TableCell >{row.allergyName}</TableCell>
              <TableCell >{row.risk}</TableCell>
              <TableCell >{row.patientId}</TableCell>
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



