import React, { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";


export default function LoginAppBar() {
    let IsLogin  = window.location.href.substring(window.location.href.lastIndexOf('/') + 1) === "login"
  
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ bgcolor: '#EC8923' }}>
                <Toolbar>
                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-camera" viewBox="0 0 16 16">
                        <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z" />
                        <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" />
                    </svg>
                    <Typography style={{ color: "#5E3707", fontFamily: 'Brush Script MT', fontSize: "x-large" , fontWeight: "bold" , marginLeft: "8px"}} variant="h6" component="div" sx={{ flexGrow: 1 }} >
                        iCherish
                    </Typography>
                    {IsLogin ? <div> <Link style={{ color: "#5E3707" }} to="/signup">Create A New Account</Link></div> : <div>Already have a account? <Link style={{ color: "#5E3707" }} to="/login">LogIn!</Link></div>}
                </Toolbar>
            </AppBar>
        </Box>
    );
}