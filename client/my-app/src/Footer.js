import React from 'react'
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link"
import '@fontsource/roboto/700.css';

export default function Footer() {
    return (
       <footer className='footer'>
        <Box px={{xs: 3, sm: 10}}
         py={{xs: 5, sm: 10}}
         bgcolor="#3f51b5"
         color="white"
         alignContent="bottom" 
         textAlign="center"
         alignSelf="bottom"
         position= "sticky"
        bottom= "0"
         width = "100%"
        >
            <Container maxWidth="lg">
            <Grid container spacing={5}> 
            <Grid item xs={12} sm={4}>
            <Box borderBottom={1}>  Test1 </Box> <Box > <Link href = "/" color = "inherit"> Test </Link> </Box>
            <Box > <Link href = "/" color = "inherit"> Test </Link> </Box>
            <Box > <Link href = "/" color = "inherit"> Test </Link> </Box>
    
           
            </Grid>
            <Grid item xs={12} sm={4}>
            <Box borderBottom={1}> Test2 </Box> <Box > <Link href = "/" color = "inherit"> Test </Link> </Box>
            <Box > <Link href = "/" color = "inherit"> Test </Link> </Box>
            <Box > <Link href = "/" color = "inherit"> Test </Link> </Box>

           
            </Grid>
            <Grid item xs={12} sm={4}>
            <Box borderBottom={1}> Test3 </Box> <Box > <Link href = "/" color = "inherit"> Test </Link> </Box>
            <Box > <Link href = "/" color = "inherit"> Test </Link> </Box>
            <Box > <Link href = "/" color = "inherit"> Test </Link> </Box>
       
           
            </Grid>
            </Grid>
            <Box textAlign="center"  pb={{xs: 3, sm: 10}} pb={{xs: 3, sm: 10}}> LTM Hospital London &reg; {new Date().getFullYear()}
            </Box>
            </Container>
        </Box>
       </footer>
    )
}

//https://www.youtube.com/watch?v=HCsFwwolXZw (for notes)

/*
Creates 3 colmns 
*/