import React, { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link, NavLink } from "react-router-dom";
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
    const setCategory = (item) => {
        if (item === "travel"){

        }
        else{}
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
            <AppBar position="static" sx={{ bgcolor: '#558b2f' }}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 3 }}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        <MenuIcon />
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
                            <NavLink to="/main/travel">Travel</NavLink>
                        </MenuItem>
                        <MenuItem> 
                            <NavLink to="/main/food">Food</NavLink>
                         </MenuItem>
                    </Menu>
       

                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
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