
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import { Logout } from '@mui/icons-material';

import { logoutUser } from '../../features/auth/authSlice';

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