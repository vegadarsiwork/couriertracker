import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Grid, Snackbar, Alert, Card, CardContent, FormControl, Select, MenuItem, InputLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
    const [trackingData, setTrackingData] = useState({ id: '', status: '', location: '' });
    const [currentPackage, setCurrentPackage] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleCreate = async () => {
        if (!trackingData.id || !trackingData.status || !trackingData.location) {
            setError('All fields are required!');
            return;
        }

        try {
            const response = await fetch('/api/track', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(trackingData),
            });
            if (!response.ok) {
                throw new Error('Error creating tracking entry.');
            }
            setSuccess('Created new tracking package successfully!');
            setTrackingData({ id: '', status: '', location: '' });
        } catch (err) {
            setError(err.message);
        }
    };

    const handleUpdate = async () => {
        if (!trackingData.id) {
            setError('Tracking ID is required to update!');
            return;
        }

        const updatePayload = {};
        if (trackingData.status) {
            updatePayload.status = trackingData.status;
        }
        if (trackingData.location) {
            updatePayload.location = trackingData.location;
        }

        if (Object.keys(updatePayload).length === 0) {
            setError('At least one field (Status or Location) must be provided to update!');
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/api/track/${trackingData.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(updatePayload),
            });
            if (!response.ok) {
                throw new Error('Error updating tracking entry.');
            }
            setSuccess('Updated tracking package successfully!');
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDelete = async () => {
        if (!trackingData.id) {
            setError('Tracking ID is required to delete!');
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/api/track/${trackingData.id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            if (!response.ok) {
                throw new Error('Error deleting tracking entry.');
            }
            setSuccess('Deleted tracking package successfully!');
            setTrackingData({ id: '', status: '', location: '' });
        } catch (err) {
            setError(err.message);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    useEffect(() => {
        const fetchPackageDetails = async () => {
            if (trackingData.id) {
                const response = await fetch(`/api/track/${trackingData.id}`);
                const data = await response.json();
                setCurrentPackage(data);
            }
        };
        fetchPackageDetails();
    }, [trackingData.id, handleUpdate]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100vh',
                    textAlign: 'center',
                    padding: 2,
                }}
            >
                <Typography variant="h4" gutterBottom>
                    Admin Dashboard
                </Typography>
                <Box sx={{ mb: 4 }}>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={handleLogout}
                        sx={{ mr: 2 }}
                    >
                        Logout
                    </Button>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => navigate('/')}
                    >
                        Back to Home
                    </Button>
                </Box>
                <Typography variant="h6" gutterBottom>
                    Manage Tracking Entry
                </Typography>
                <Grid
                    container
                    spacing={3}
                    sx={{
                        maxWidth: '100%',
                        justifyContent: 'center',
                        flexWrap: 'nowrap',
                    }}
                >
                    <Grid item xs={12} sm={4}>
                        <TextField
                            label="Tracking ID"
                            variant="outlined"
                            fullWidth
                            value={trackingData.id}
                            onChange={(e) => setTrackingData({ ...trackingData, id: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <FormControl fullWidth sx={{ minWidth: 120 }}>
                            <InputLabel>Status</InputLabel>
                            <Select
                                value={trackingData.status}
                                onChange={(e) => setTrackingData({ ...trackingData, status: e.target.value })}
                                label="Status"
                            >
                                <MenuItem value="In Transit">In Transit</MenuItem>
                                <MenuItem value="Delivered">Delivered</MenuItem>
                                <MenuItem value="Pending">Pending</MenuItem>
                                <MenuItem value="Cancelled">Cancelled</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            label="Location"
                            variant="outlined"
                            fullWidth
                            value={trackingData.location}
                            onChange={(e) => setTrackingData({ ...trackingData, location: e.target.value })}
                        />
                    </Grid>
                </Grid>
                <Box sx={{ mt: 4 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleCreate}
                        sx={{ mr: 2 }}
                    >
                        Create
                    </Button>
                    <Button
                        variant="contained"
                        color="warning"
                        onClick={handleUpdate}
                        sx={{ mr: 2 }}
                    >
                        Update
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={handleDelete}
                    >
                        Delete
                    </Button>
                </Box>

                {currentPackage && (
                    <Card
                        sx={{
                            mt: 4,
                            maxWidth: 600,
                            display: 'flex',
                            position: 'relative',
                        }}
                    >
                        <Box
                            sx={{
                                width: 10,
                                backgroundColor:
                                    currentPackage.status === 'Cancelled'
                                        ? 'red'
                                        : currentPackage.status === 'Pending'
                                        ? 'yellow'
                                        : currentPackage.status === 'In Transit'
                                        ? 'blue'
                                        : currentPackage.status === 'Delivered'
                                        ? 'green'
                                        : 'gray',
                            }}
                        />
                        <CardContent sx={{ flex: 1 }}>
                            <Typography variant="h6">Current Package Details</Typography>
                            <Typography>Status: {currentPackage.status}</Typography>
                            <Typography>Location: {currentPackage.location}</Typography>
                            <Typography>
                                Last Updated: {new Date(currentPackage.lastUpdated).toLocaleString()}
                            </Typography>
                        </CardContent>
                    </Card>
                )}

                <Snackbar
                    open={!!success}
                    autoHideDuration={3000}
                    onClose={() => setSuccess('')}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                    <Alert onClose={() => setSuccess('')} severity="success" sx={{ width: '100%' }}>
                        {success}
                    </Alert>
                </Snackbar>

                <Snackbar
                    open={!!error}
                    autoHideDuration={3000}
                    onClose={() => setError('')}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                    <Alert onClose={() => setError('')} severity="error" sx={{ width: '100%' }}>
                        {error}
                    </Alert>
                </Snackbar>
            </Box>
        </motion.div>
    );
};

export default AdminDashboard;