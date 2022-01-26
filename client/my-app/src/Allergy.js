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
 
import { withStyles } from '@material-ui/core/styles'

// Imported all relevant dependencies, MUI/SWAL/REACT

//Green Button CSS Component

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

  //Unused Orange Button
  
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


export default function Allergy() {

  {/* React useState Hooks to create state for my allergy form   */ }

    const [allergyId, setAllergyId] = useState('');
    const [allergyName, setAllergyName] = useState('');
    const [risk, setRisk] = useState('');
    const [patientId, setPatientId] = useState('');
    const [notes, setNotes] = useState('');

   
    {/*  HandleClearForm function created to remove data form input fields */ }

    const handleClearForm = () => (
        setAllergyId(''),
        setAllergyName(''),
        setRisk(''),
        setPatientId(''),
        setNotes('')
    )
    

      {/*  Create Patient Function, takes in a value object mapped to the useState formfields. Posts the values to the relevant table rows/columns from the API request , url = 8081/createallergy
          Once completed, SWAL.fire will send a model box with a success icon and new allergy saved message. 
          HandleClearForm is executed at the end of the function in order to clear the input fields ready to submit a new allergy. 
      */ }

  function createPatient() {
    const value = {
     allergyId: allergyId,
     allergyName: allergyName,
     risk: risk,
     patientId: patientId,
     notes: notes
    };

    axios.post('http://localhost:8081/createallergy', value).then((response) => {
      // handle success
      var resData = response.data;
      Swal.fire({
        icon: 'success',
        title: 'New Allergy saved!',
     
      })
      handleClearForm();
    });
  }

  function updateAllergy(){
    const value = {
        allergyId: allergyId,
        allergyName: allergyName,
        risk: risk,
        patientId: patientId,
        notes: notes
       
    };
    axios.put(`http://localhost:8081/updateallergy/${allergyId}`, value)
    .then( (response) => {
        // handle success
        Swal.fire({
          icon: 'success',
          title: 'Updated Allergy!',
      
       
        })
        handleClearForm();
     
    });
  }



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
                      <u>  Create Allergy </u>
                    </strong>
                  </h2>
                  </FormLabel>
              
                  
              <FormGroup className="forms">
                <TextField
                      className="textfield"
                    
                      type="text"
                      placeholder="Allergy ID"
                      alignItems="center"
                      value={allergyId}
                      onChange={(e) => setAllergyId(e.target.value)}
                      variant="outlined"
                      label="Allergy ID"
                      >
                      </TextField>
                <br/>
               
                  <TextField
                  className="textfield"
                  label="Allergy Name"
                  type="text"
                  placeholder="Allergy Name"
                  value={allergyName}
                  onChange={(e) => setAllergyName(e.target.value)}
                  
                  variant="outlined"
                />
                    <br/>
 
                    <TextField
                    className="textfield"
                    type="text"
                 label="Risk"
                value={risk}
                onChange={(e)=> setRisk(e.target.value)}
            
                 variant="outlined"
                 
               />
                    <br/>
               
             
               
 
               <TextField
                     className="textfield"
                     label="Patient ID"
                     type="number"
                     placeholder="Patient ID"
                     value={patientId}
                onChange={(e)=> setPatientId(e.target.value)}
                   
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
                value={notes}
                
                onChange={(e)=> setNotes(e.target.value)}
          
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
                 onClick={createPatient}
               
                 style={{backgroundcolor: "red"}}
                 
              
               >
                 Save Allergy  &#128229;
               </Button>
        
 
               <Button
                 color="secondary"
                 variant="contained"
                 className="smallButton"
                 onClick={handleClearForm}
              
                
                 
               >
                 Clear Form &#10006;
               </Button>
              
 
               <GreenButton
              variant='contained'
               color='secondary'
               onClick={updateAllergy}
         
              
               >Update Allergy &#128233;</GreenButton>
 

 
 
          </ButtonGroup>
          </Grid>
        
       
     </FormControl>
 
     
 
         </Box>
      
     </div>
    )
}
