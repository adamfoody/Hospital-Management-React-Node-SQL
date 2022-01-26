import {Route, Switch} from "react-router-dom";
import './App.css';
import Patient from "./Patient";
import Treatment from "./Treatment";
import TreatmentTable from "./TreatmentTable";
import PatientTable from "./PatientTable";
import NavBar from "./NavBar";
import { BrowserRouter, Link } from 'react-router-dom';
import LogIn from "./LogIn";
import Footer from "./Footer"
import '@fontsource/roboto/700.css';
import Allergy from "./Allergy";
import Prescription from "./Prescription";
import Register from "./Register"
import {Auth0Provider} from '@auth0/auth0-react';
import { HomePage } from "./HomePage";
import {useAuth0} from '@auth0/auth0-react';
import { Completed } from "./Completed";

//If I use auth0 as authentication method. I can 

const App = () =>  {

  const {isAuthenticated} = useAuth0();
  const {isLoading} = useAuth0();


    if(isLoading) return <div> LOADING GNIDAOL </div>

  return (
    <div className="App" >
      <header className="App-header">



      <BrowserRouter>
     
      


      <NavBar/>

      {!isAuthenticated && (
        <LogIn/>

      )}
      {/* add a homepage here? so when default hit page, it can tell them a bit about that app */}
  {isAuthenticated && (
          <Switch>
          <Route exact path ="/" 
          render={props => <HomePage {...props}/>}/>
       
      <Route exact path ="/register" 
          render={props => <Register {...props}/>}/>
              <Route exact path ="/login" 
          render={props => <LogIn {...props}/>}/>
         
          <Route exact path= "/patient" render={props=> <Patient {...props} />} />
          <Route exact path ="/treatment" 
          render={props => <Treatment {...props}/>}/>
          <Route exact path ="/treatmenttable" 
          render={props => <TreatmentTable {...props}/>}/>
          <Route exact path ="/patientTable" 
          render={props => <PatientTable {...props}/>}/>
           <Route exact path ="/allergy" 
          render={props => <Allergy {...props}/>}/>
              <Route exact path ="/prescription" 
          render={props => <Prescription {...props}/>}/>
            <Route exact path ="/allergy" 
          render={props => <Allergy {...props}/>}/>
             <Route exact path ="/completed" 
          render={props => <Completed {...props}/>}/>
      
      
          </Switch>
          )}
        </BrowserRouter>
  
      </header>
      <main className="main">
      </main>

      <footer className="footer">
      

      <Footer/>
      </footer>

    </div>
  );
}

export default App;

/* {<NavBar/>} /*

/*

      <Switch>
<Route exact from = "/" render={props=> <Patient {...props} />}/>
<Route exact path ="/treatment" 
render={props => <NavBar {...props}/>} />
</Switch>





     <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                



  <Title>Recent Deposits</Title>
      <Typography component="p" variant="h4">
        $3,024.00
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        on 15 March, 2019
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link>
      </div>

  </Paper>
              </Grid>


*/