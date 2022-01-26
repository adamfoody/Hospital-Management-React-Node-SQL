import React, {useState} from 'react';
import axios from 'axios';
import {
  FormControl,
  TextField,
  makeStyles,
  FormLabel,
  Grid,
  Button,
  ButtonGroup,
  Box, Radio, RadioGroup, FormGroup,FormControlLabel
, Container, InputLabel, MenuItem, Select,
Icon} from '@material-ui/core';
import './App.css';
import { green, orange, yellow} from '@material-ui/core/colors'
import Swal from 'sweetalert2';
 
import { withStyles } from '@material-ui/core/styles';

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
  
  const OrangeButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(orange[500]),
      backgroundColor: orange[500],
      '&:hover': {
        backgroundColor: orange[700]
      },
      color: yellow
    }
  }))(Button)

export default function Prescription() {

    const [prescriptionId, setPrescriptionId] = useState('');
    const [prescriptionName, setPrescriptionName] = useState('');
    const [treatmentId, setTreatmentId] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [notes, setNotes] = useState('');
    

    
  function createPrescription() {
    const value = {
        prescriptionId: prescriptionId,
        prescriptionName: prescriptionName,
        treatmentId: treatmentId,
        startDate: startDate,
        endDate: endDate,
        notes: notes
     
    };

    axios.post('http://localhost:8081/createprescription', value).then((response) => {
      // handle success
      var resData = response.data;
      Swal.fire({
        icon: 'success',
        title: 'New Prescription saved!',
     
      })
      handleClearForm();
    });
  }
  const handleClearForm = () => (
        setPrescriptionId(''),
        setPrescriptionName(''),
        setTreatmentId(''),
        setStartDate(''),
        setEndDate(''),
        setNotes('')
    )



    return (
        <div>
        <Box 
        display="flex" 
        justifyContent="center"
         alignItems="center">
         <FormControl  className="forms">
        
         <FormLabel style={{color:"#3f51b5"}} >
             <h2 >
              <strong>
                <u>  Create Prescription </u>
              </strong>
            </h2>
            </FormLabel>
         
            
         <FormGroup className="forms">
            <TextField
                 className="textfield"
               
                 type="text"
                 placeholder= "Prescription ID"
                 alignItems="center"
                 variant="outlined"
                 label="Prescription ID"
                 value={prescriptionId}
                 onChange={(e)=> setPrescriptionId(e.target.value)}
                 >
                 </TextField>
                <br/>
               
                 <TextField
                 className="textfield"
                 label="Prescripton Name "
                 type="text"
                 placeholder="Prescription Name"
                 variant="outlined"
                 value={prescriptionName}
                 onChange={(e)=> setPrescriptionName(e.target.value)}
                 
               />
                    <br/>
 
                    <TextField
                 className="textfield"
                
                 type="text"
                 
             
                 label="Treatment ID"
                value={treatmentId}
            
                 variant="outlined"
                 onChange={(e)=> setTreatmentId(e.target.value)}
                 
               />
                    <br/>
               
             
               
 
               <TextField
                     className="textfield"
                     label="Start Date"
                     type="number"
                     placeholder="Start Date"
                     value={startDate}
                     onChange={(e)=> setStartDate(e.target.value)}
                     variant="outlined"
                    
                    
              />
            <br/>

                <TextField
                     className="textfield"
                     label="End Date"
                     type="number"
                     placeholder="End Date"
                     value = {endDate}   
                     onChange={(e)=> setEndDate(e.target.value)}     
                     variant="outlined"
                    
                    
              />
                <br/>
                <FormGroup >
                <TextField 
                 className="textfield2"
                
                 type="number"
                 placeholder="Notes"
                 label="Notes"
                  multiline
                rows={5}
                onChange={(e)=> setNotes(e.target.value)}     
                value={notes}
                 variant="outlined"
                
              
            />
            </FormGroup>
                

                    </FormGroup>
                    <br/>
        
        
                <Grid className="patientButtons">
                <ButtonGroup variant="outlined"  className="smallButton">
                <Button
                 color="primary"
                 variant="contained"
                 className="smallButton"
                 style={{backgroundcolor: "red"}}
                 onClick={createPrescription}
              
               >
                 Save Allergy&#128229;
               </Button>
        
 
               <Button
                 color="secondary"
                 variant="contained"
                 className="smallButton"
               
              
                onClick={handleClearForm}
                 
               >
                 Clear Form
               &#10006;
               </Button>
 
 
 
               <GreenButton
              variant='contained'
               color='secondary'
           
         
              
               >Update Allergy  
               &#128233;</GreenButton>
 

 
 
          </ButtonGroup>
          </Grid>
        
       
     </FormControl>
 
     
 
         </Box>
      
     </div>
    )
}
