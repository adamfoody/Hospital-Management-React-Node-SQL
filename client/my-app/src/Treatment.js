import React, {useState,useStyles} from 'react';
import axios from 'axios';
import {
  FormControl,
  TextField,
  Select, MenuItem,
  FormLabel,
  Grid,
  Button,
  ButtonGroup,
  Box
} from '@material-ui/core';
import { green, yellow, orange} from '@material-ui/core/colors'
import "./App.css";
import Swal from 'sweetalert2';
import { withRouter, useHistory}  from "react-router-dom";

import { withStyles } from '@material-ui/core/styles'

;



//Created a green version of the MUI button component for update records. Using withStyles. 

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





const Treatment = (props) => {


  const [treatmentType, setTreatmentType] = useState('');
  const [treatmentCategory, setTreatmentCategory] = useState('');
  const [startDate, setStartDate] = useState('');
  const [prescription, setPrescription] = useState('');
  const [treatmentId, setTreatmentId] =useState('');
  const [patientId, setPatientId] = useState('');




  function updateTreatment(){
    const value = {
        treatmentId: treatmentId,
        treatmentCategory: treatmentCategory,
        treatmentType: treatmentType,
        startDate: startDate,
        prescription: prescription,
        patientId: patientId
       
    };
    axios.put(`http://localhost:8081/updateTreatment/${treatmentId}`, value)
    .then( (response) => {
        // handle success
        var resData = response.data;
        let data = JSON.stringify(resData);
        window.alert("Response recieved from server = " + data);
    });
    handleClearForm();
  }
  

  const handleClearForm = () => {
      setTreatmentType('');
      setTreatmentCategory('');
      setStartDate('');

      setTreatmentId('');
      setPatientId('');

  } 


  function saveTreatment() {
    const value = {
      treatmentId: treatmentId,
      treatmentType: treatmentType,
      treatmentCategory: treatmentCategory,
      startDate: startDate,
      prescription: prescription,
      patientId: patientId
    };

    axios.post('http://localhost:8081/treatment', value).then((response) => {
      // handle success
      var resData = response.data;
      let data = JSON.stringify(resData);
      Swal.fire({
        icon: 'success',
        title: 'New Treatment Record saved!',
      })
      handleClearForm();






    
    });
  }

  function saveTreatmentHandler() {
    saveTreatment();
  }


  const {history} = props;




  const handlePrescriptionClick = (pageURL) => {
       history.push(pageURL)
  
  }


    return(

    <div>
       <Box display="flex" justifyContent="center" alignItems="center">
        <FormControl className="forms">
        <FormLabel style={{color:"#3f51b5"}} >
            <h2 >
             <strong>
               <u>  Create Treatment </u>
             </strong>
           </h2>
           </FormLabel>
           <TextField
                className="textfield"
                variant="outlined"
                type="number"
                placeholder="Treatment ID"
             
                label="Treatment ID"
                value={treatmentId}
                onChange={(e) => setTreatmentId(e.target.value)}
              />
          <br/>
          <TextField
                className="textfield"
                variant="outlined"
                type="number"
                placeholder="Patient ID"
             
                label="Patient ID"
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
              />
          <br/>
              <TextField
                className="textfield"
                variant="outlined"
                type="text"
               label="Type"
                value={treatmentType}
                onChange={(e) => setTreatmentType(e.target.value)}
            
              />
              <br />
              <TextField
                className="textfield"
                required = {true}
                type="text"
                label="Category"
                value={treatmentCategory}
                onChange={(e) => setTreatmentCategory(e.target.value)}
                variant="outlined"
     
                
              />
             <br/>



              <TextField
                className="textfield"
              
                
                type="date"
                openTo="year"
                helperText="Treatment Start Date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                variant="outlined"

              />




              <br />
          

              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                <FormLabel>Prescription</FormLabel>
          
                  <Select
                
                 
                    
                    value={prescription}
                    className="textfield"
                    onChange={(e)=> setPrescription(e.target.value)}
                    variant="outlined"
                    label='Prescription'
                    
                  >
                    <MenuItem value={1}>Yes</MenuItem>
                    <MenuItem value={0}>No</MenuItem>
                 
                  </Select>
                </FormControl>
              </Box>


              <br />
              <Grid className="patientButtons"> 
              <ButtonGroup variant="outlined">
                <Button
                  color="primary"
                  variant="contained"
                  onClick={saveTreatmentHandler}
                  
        
                >

          
                  Save Treatment &#10006;
                </Button>
                <br />
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={handleClearForm}

        
                >
                  Clear Form &#128229;
                </Button>
                <GreenButton
             variant='contained'
              color='secondary'
             onClick={updateTreatment}
              >Update Patient &#128233;</GreenButton>

          {prescription === 1 && (
            <OrangeButton
             variant='contained'
      
              color='secondary'
              onClick={()=>handlePrescriptionClick('/prescription')}


              >Create Prescription 
              </OrangeButton>
 )}
              </ButtonGroup>
         
              </Grid>

        </FormControl>

        </Box>
      
      
    </div>
    )

}

export default withRouter(Treatment);


