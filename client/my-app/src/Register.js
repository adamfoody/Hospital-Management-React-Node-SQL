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

const handleSubmit = (event) => {
    event.preventDefault();
  }
  const theme = createTheme();


 function Register(props) {


    const [userNameRegister, setUserNameRegister] = useState();
    const [passwordRegister, setPasswordNameRegister] = useState();

    const {history} = props;





    const handleLogInClick = (pageURL) => {
         history.push(pageURL)
    
    };


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
            paddingTop: 50
          }}
        >
         <LockIcon height="100" style={{ fontSize: 60, color:"#3f51b5" }}
          
             />

          <Typography component="h1" variant="h5" style={{  color:"#3f51b5" }}>
            <h3> <strong> <u> Register </u></strong></h3> 
          </Typography>
          <Box component="form"  sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              variant="outlined"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              variant="outlined"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2}}
            >
              Sign Up
            </Button>
            <GreenButton
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
              onClick={()=>handleLogInClick('/login')}
              
            >
              Log In 
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

export default withRouter(Register);