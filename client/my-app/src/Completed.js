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


export const Completed = () => {
    const [completed, setCompleted] = useState([]);


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

    function fetchCompletedRecords() {
        axios.get('http://localhost:8081/allcompleted').then((response) => {
          // handle success
          setCompleted(response.data);
        
        });
      } 

      const useStyles = makeStyles((theme) => ({
        tableHead: {
            borderBottomStyle: "solid",
            borderBottomColor: "blue"
        },
        stickyHeader:{
          
        }
    }));
    

      useEffect(() => {
        fetchCompletedRecords();
      
      }, []);
    
      const classes = useStyles();

  return ( <div>

  
<TableContainer component={Paper} className={classes.tableContainer}>
      

          <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table" variant="outlined" >
   
     
    
        <TableRow >
     
        <TableCell component="th" width="70px" align="right"><strong> Patient id </strong></TableCell>
          <TableCell component="th" scope="row" align="right"><strong> Full Name </strong> </TableCell>
          <TableCell component="th" scope="row" align="right" align="right"> <strong> DOB </strong></TableCell>
          <TableCell align="right"> Address </TableCell>
          <TableCell align="right"><strong> Email</strong></TableCell>
          <TableCell align="right"><strong> Allergy</strong></TableCell>
          <TableCell align="right"><strong> Gender </strong> </TableCell>
          <TableCell align="right"><strong> Treat ID </strong></TableCell>
          <TableCell align="right"><strong> Treat Type</strong></TableCell>
          <TableCell align="right"><strong> Treat Category </strong></TableCell>
          <TableCell align="right"><strong> Start Date </strong></TableCell>
          <TableCell align="right"><strong> End Date </strong></TableCell>
          <TableCell align="right"><strong> Prescription </strong></TableCell>
     
        </TableRow>

      
      <TableBody>
 
        {    completed.map((row) => (
          <TableRow
            key={row.patientId}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          > 
            <TableCell component="th" scope="row" align="right"> {row.patientId} </TableCell>
            <TableCell component="th" scope="row" align="right"> {row.name} </TableCell>
            
            <TableCell component="th" scope="row" align="right"> {row.dob} </TableCell>
            <TableCell component="th" scope="row" align="right"> {row.address} </TableCell>

            <TableCell component="th" scope="row" align="right"> {row.email} </TableCell>
            <TableCell component="th" scope="row" align="right"> {row.allergy} </TableCell>
        
            <TableCell component="th" scope="row" align="right"> {row.gender} </TableCell>
        
            <TableCell component="th" scope="row" align="right"> {row.treatmentId} </TableCell>
            <TableCell align="right">{row.treatmentType}</TableCell>
            <TableCell align="right">{row.treatmentCategory}</TableCell>
            <TableCell align="right">{row.startDate}</TableCell>
            <TableCell align="right">{row.endDate}</TableCell>
            
          

              {row.prescription == 0 && (
              <TableCell align="right"> No Prescription &#10060;</TableCell>
              )}
              {row.prescription == 1 && (
              <TableCell align="right" className="hasPrescription"> 
         
                Prescription
                
          
              </TableCell>
              )}
          
          </TableRow>
        ))}
      </TableBody>
    </Table>





          </TableContainer>

    


  </div>);
};
