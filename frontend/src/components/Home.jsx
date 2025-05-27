import React, { useState } from 'react';
import { Box, Typography, Button, Snackbar, Alert } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
    const [logoutSuccess, setLogoutSuccess] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        setLogoutSuccess(true); // Show logout success Snackbar
        setTimeout(() => navigate('/login'), 1500); // Redirect to login after 1.5 seconds
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                textAlign: 'center',
            }}
        >
            {/* Animated Website Name */}
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                <Typography variant="h3" gutterBottom>
                    Welcome to <span style={{ color: '#90caf9' }}>CourierTracker</span>
                </Typography>
            </motion.div>

            {/* Animated Subtitle */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
            >
                <Typography variant="h6" gutterBottom>
                    Track your packages or manage tracking data as an admin.
                </Typography>
            </motion.div>

            {/* Animated Buttons */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
            >
                <Box sx={{ mt: 4 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        component={Link}
                        to="/tracking"
                        sx={{ mr: 2 }}
                    >
                        Track Package
                    </Button>
                    <Button
                        variant="outlined"
                        color="secondary"
                        component={Link}
                        to="/admin"
                        sx={{ mr: 2 }}
                    >
                        Admin Dashboard
                    </Button>
                    <Button variant="contained" color="error" onClick={handleLogout}>
                        Logout
                    </Button>
                </Box>
            </motion.div>

            {/* Snackbar for logout success */}
            <Snackbar
                open={logoutSuccess}
                autoHideDuration={3000}
                onClose={() => setLogoutSuccess(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={() => setLogoutSuccess(false)} severity="success" sx={{ width: '100%' }}>
                    Logged out successfully!
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default Home;