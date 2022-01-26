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
, MenuItem, Select,
Icon} from '@material-ui/core';
import './App.css';
import { green, orange, yellow} from '@material-ui/core/colors'
import Swal from 'sweetalert2';
import { withRouter, useHistory}  from "react-router-dom";
import GroupAddTwoToneIcon from '@mui/icons-material/GroupAddTwoTone';

 
import { withStyles } from '@material-ui/core/styles'

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


const Patient = (props) => {
  const [patientName, setPatientName] = useState();
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [patientId, setPatientId] = useState('');
  const [address, setAddress] = useState('');
  const [allergy, setAllergy] = useState('');
  const [gender, setGender] = useState();
  const [displayAllergy, setDisplayAllergy] = useState();

function updatePatient(){
  const value = {
      name: patientName,
      dob: dob,
      email: email,
      patientId: patientId,
      address: address,
      allergy: allergy,
      gender: gender
  };
  axios.put(`http://localhost:8081/updatePatient/${patientName}`, value)
  .then( (response) => {
      // handle success
      var resData = response.data;
      let data = JSON.stringify(resData);
      Swal.fire({
        icon: 'success',
        title: 'Updated Patient!',
    
     
      })
      handleClearForm();
   
  });
}

    


  function savePatient() {
    const value = {
      name: patientName,
      dob: dob,
      email: email,
      patientId: patientId,
      address: address,
      allergy: allergy,
      gender: gender
    };


    axios.post('http://localhost:8081/patient/', value).then((response) => {
      // handle success
      var resData = response.data;
      Swal.fire({
        icon: 'success',
        title: 'New Patient saved!',
     
      })
      handleClearForm();
    });
  }


   const handleSavePatient = () => {
      savePatient();

   }


  

   const handleClearForm = () => {
      setDob('');
      setPatientId('');
      setPatientName('');
      setEmail('');
      setAddress('');
  
      setGender('');

 }


 const {history} = props;





const handleAllergyClick = (pageURL) => {
     history.push(pageURL)

};





    return(

    <div>
       <Box 
       display="flex" 
       justifyContent="center"
        alignItems="center">
        <FormControl  className="forms">
       
        <FormLabel style={{color:"#3f51b5"}} >
            <h2 >
             <strong>
               <u>  Create Patient  </u>
             </strong>
           </h2>
           </FormLabel>
        
           
        <FormGroup className="forms">
           <TextField
                className="textfield"
              
                type="text"
                placeholder="Full Name"
                alignItems="center"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                variant="outlined"
                label="Full Name"
                >
                </TextField>
               <br/>
              
                <TextField
                className="textfield"
                label="Date Of Birth"
                type="text"
                placeholder="Date of Birth"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                variant="outlined"
                
              />
                   <br/>

                   <TextField
                className="textfield"
               
                type="text"
                
                multiline
                rows={4}
                label="Address"
                openTo="year"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                variant="outlined"
                
              />
                   <br/>
              
            
                 <TextField
                className="textfield"
          
    
                placeholder="Email-Address"
                label="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
             
              />
         
         <br/>
              


              <TextField
                    className="textfield"
                    label="Patient ID"
                    type="number"
                    placeholder="Patient ID"
                    value={patientId}
                    onChange={(e) => setPatientId(e.target.value)}
                    variant="outlined"
                   
                   
             />
          
<br/>
<Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                <FormLabel>Allergy</FormLabel>
          
                  <Select
                
                 
                    
                    value={allergy}
                    className="textfield"
                    onChange={(e)=> setAllergy(e.target.value)}
                    variant="outlined"
                    placeholder='allergy'
                    
                  >
                    <MenuItem value={1}>Yes</MenuItem>
                    <MenuItem value={0}>No</MenuItem>
                 
                  </Select>
                </FormControl>
              </Box>
            
              </FormGroup>
              <br/>

            
<FormControl >




                
                  <RadioGroup
        row
        aria-label="gender"
        defaultValue="male"
        value={gender}
        name="radio-buttons-group"
        className="radioButton"
        onChange={(e)=> setGender(e.target.value)}
        >
        <FormControlLabel value="female" control={<Radio />} label="Female" />
        <FormControlLabel value="male" control={<Radio />} label="Male" />
        <FormControlLabel value="other" control={<Radio />} label="Other" />
        
    
        </RadioGroup>

        </FormControl>
        <Grid className="patientButtons">
              <ButtonGroup variant="outlined"  className="smallButton">
              <Button
                color="primary"
                variant="contained"
                className="smallButton"
                onClick={handleSavePatient}
                style={{backgroundcolor: "red"}}
                
              
              >
                Save Patient &#128229;
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
              onClick={updatePatient}
             
              >Update Patient&#128233;</GreenButton>
{allergy === 1 &&(
<OrangeButton
             variant='contained'
              color='secondary'
              onClick={()=>handleAllergyClick('/allergy')}
             
              >Create Allergy</OrangeButton>
   
   )} 

         </ButtonGroup>
         </Grid>
      
       
      
    </FormControl>

    

        </Box>
     
    </div>
    )

}

export default withRouter(Patient);

//https://www.youtube.com/watch?v=-XKaSCU0ZLM&t=2783s for notes and also to help with building