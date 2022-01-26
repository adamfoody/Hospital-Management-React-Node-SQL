import React, {useState} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import {
    FormControl,
    TextField,
    makeStyles,
    FormLabel,
    Link,
    Grid,
    Avatar,
   Checkbox,
    Button,
    ButtonGroup, Typography,
    Box, Radio, RadioGroup, FormGroup,FormControlLabel
  , Container, InputLabel, MenuItem, Select,
  Icon} from '@material-ui/core';
  import './App.css';
  import { createTheme, ThemeProvider } from '@mui/material/styles';
  import LockIcon from '@mui/icons-material/Lock';
  import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
  import { green, orange, yellow} from '@material-ui/core/colors'
  import { withStyles } from '@material-ui/core/styles'
  import { withRouter, useHistory}  from "react-router-dom";
  import {useAuth0} from '@auth0/auth0-react';
 


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
  
  
function LogIn(props) {

  const {history} = props;

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const {loginWithRedirect} = useAuth0();
  


  const handleRegisterClick = (pageURL) => {
       history.push(pageURL)
  
  };

      
    
      const handleSubmit = (event) => {
        event.preventDefault();
      }
      const theme = createTheme();
      
    return (
        <div>
        <ThemeProvider theme={theme}>
       <Container component="main" maxWidth="xs">
       <CssBaseline />
    
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingTop: 50,
            color: "#3f51b5"
          }}
        >
         <LockIcon height="100" style={{ fontSize: 60, color:"#3f51b5" }}
          
             />

          <Typography component="h1" variant="h5" style={{  color:"red" }}>
            <h3> <strong> <u> Please Log in </u></strong></h3> 
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>

<Grid className="gridHomePage">
          <Typography variant="body1" sx={{color:"#3f51b5"}}>
          Authentication  required. Please use the below buttons to log in or register an account. Contact the IT Department if you require support.
      </Typography>

      </Grid>
       
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2}}
              onClick = {() => loginWithRedirect()}
            >
              Sign In
            </Button>
            

            
            <GreenButton
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2, padding: 20, }}
              onClick = {() => loginWithRedirect()}
              
            >
              Register
            </GreenButton>
            <Grid container>
              <Grid item xs>
            
              </Grid>
              <Grid item>
            
              </Grid>
            </Grid>
          </Box>
        </Box>
       
      </Container>
      
     
      </ThemeProvider>
        </div>
    )
}


export default withRouter(LogIn);