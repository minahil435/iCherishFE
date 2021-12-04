import React, { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import { AuthContext } from "../../context/AuthContext";
import "./header.css";

export default function ButtonAppBar() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const {
        state: { user }, dispatch
    } = useContext(AuthContext);

    function logOut() {
        dispatch({
            type: "LOG_OUT"
        })
    }
    return (
        <Box sx={{ flexGrow: 1}}>
            <AppBar position="static" sx={{ bgcolor: '#EC8923'}}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                       
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-camera" viewBox="0 0 16 16">
                            <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z" />
                            <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" />
                        </svg>
                    </IconButton>
                  
                        <Menu
                        id="basic-menu"
                        keepMounted
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem>
                            <a onClick={() => { window.location.href = "/main/travel" }}>Travel</a>
                        </MenuItem>
                        <MenuItem> 
                            <a onClick={() => { window.location.href = "/main/food" }}>Food</a>
                         </MenuItem>
                      </Menu>
                    
                   
                    <Typography style={{ color: "#5E3707", fontFamily: 'Brush Script MT', fontSize: "x-large", fontWeight: "bold" }} variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        iCherish
                    </Typography>
                   
                    <img id="userImage" src={process.env.REACT_APP_PICTURES + user.userImage} alt={"userPicture"} />
                    <Link
                        style={{ color: "white" }}
                        to="/login"
                        onClick={logOut}
                    >
                        Logout
                    </Link>
                </Toolbar>
            </AppBar>
         </Box>
    );
}