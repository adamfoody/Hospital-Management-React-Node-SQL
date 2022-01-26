import * as React from 'react';
import MenuIcon from "@material-ui/icons/Menu";
import {makeStyles} from "@material-ui/core/styles";
import {AppBar, Box, Toolbar, Typography, IconButton, 
MenuItem, Menu, withWidth, Button}from '@material-ui/core';
import { withRouter, useHistory}  from "react-router-dom";
import {useAuth0} from '@auth0/auth0-react';


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
       
        
       
        
    },
    menuBotton: {
        marginRight: theme.spacing(2)

    }, 
 
    title: {
        flexGrow: 1
    },

}))
const NavBar = props => {

    const {history} = props;
    const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

 

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClick = (pageURL) => {
        history.push(pageURL)
        setAnchorEl(null);
        
  };

  const {loginWithRedirect} = useAuth0();

  const {logout} = useAuth0();
  const {isAuthenticated} = useAuth0();


  return (
      <div className={classes.root}>
    
    <Box sx={{ flexGrow: 1 }}>
   
    <AppBar position="static"  >
      <Toolbar>
     
        <Typography   sx={{ flexGrow: 1 }} className={classes.title}>
        <img className="img1"src="https://www.ukcbc.ac.uk/wp-content/uploads/2020/07/UWL-Logo-1.png"/>
        </Typography>
       
        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }} className={classes.title}>
         <u> <strong> LH Medical Hospital </strong> </u>    
          </Typography>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} >
         <strong>Options </strong> 
          </Typography>
      
          <div>
          <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          className={classes.menuBotton}
          sx={{ mr: 2 }}
          onClick={handleMenu}
        >
          <MenuIcon />
        </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={()=>setAnchorEl(null)}
              className={classes.menuBotton}
            >


{isAuthenticated && (
               <>
              <MenuItem onClick={()=>handleMenuClick('/')}>Dashboard</MenuItem>
              <MenuItem onClick={()=>handleMenuClick('/patient')}>New Patient</MenuItem>
              <MenuItem onClick={()=>handleMenuClick('/treatment')}>New Treatment</MenuItem>
              <MenuItem onClick={()=>handleMenuClick('/patienttable')}> Patients </MenuItem>
              <MenuItem onClick={()=>handleMenuClick('/treatmenttable')}>Treatments</MenuItem>
              <MenuItem onClick={()=>handleMenuClick('/completed')}> Completed Treatments</MenuItem>
              </>
)}

             {!isAuthenticated && (
              <MenuItem
              onClick = {() => loginWithRedirect()}
              
          
              
               >Log in</MenuItem>)}
 {isAuthenticated && (
              <MenuItem
              onClick={()=> logout()}
               >Log out</MenuItem>)}

     {/*I can add here an if authenticated statement which removes Login when authenticated*/}
      {/*  Add an onclick function that logs in and out using auth0 */}
            {/* For every Page I will add if authenticated and if not, dont render!  */}


            </Menu>
         
          </div>
        
      </Toolbar>
    </AppBar>
  </Box>
  </div>
  );
}

export default withRouter(NavBar);


//https://www.youtube.com/watch?v=3HAARPCabUo&t=1024s for notes

