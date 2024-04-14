
import React from 'react';
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../features/auth/authSlice';
import { Logout } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const ResponsiveAppBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logoutUser());
        navigate('/login');
    };

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                        Tasks
                    </Typography>
                    <IconButton
                        edge="end"
                        aria-label="logout"
                        aria-haspopup="true"
                        onClick={handleLogout}
                        color="inherit"
                    >
                        <Logout />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default ResponsiveAppBar;