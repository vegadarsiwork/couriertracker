import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Card, CardContent, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Tracking = () => {
    const [trackingId, setTrackingId] = useState('');
    const [trackingInfo, setTrackingInfo] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleSearch = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/track/${trackingId}`);
            if (!response.ok) {
                throw new Error('Tracking Information not found.');
            }
            const data = await response.json();
            setTrackingInfo(data);
            setError('');
            setSuccess(true); // Show success Snackbar
        } catch (err) {
            setError(err.message);
            setTrackingInfo(null);
        }
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
            <Typography variant="h4" gutterBottom>
                Track Your Package
            </Typography>
            <TextField
                label="Tracking ID"
                variant="outlined"
                fullWidth
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                sx={{ mb: 2, maxWidth: 400 }}
            />
            <Button variant="contained" color="primary" onClick={handleSearch} sx={{ maxWidth: 400, mb: 2 }}>
                Search
            </Button>
            <Button variant="outlined" color="secondary" onClick={() => navigate('/')} sx={{ maxWidth: 400 }}>
                Back to Home
            </Button>

            {trackingInfo && (
                <Card
                    sx={{
                        mt: 4,
                        maxWidth: 400,
                        display: 'flex',
                        position: 'relative',
                    }}
                >
                    {/* Color bar to indicate status */}
                    <Box
                        sx={{
                            width: 10,
                            backgroundColor:
                                trackingInfo.status === 'Cancelled'
                                    ? 'red'
                                    : trackingInfo.status === 'Pending'
                                    ? 'yellow'
                                    : trackingInfo.status === 'In Transit'
                                    ? 'blue'
                                    : trackingInfo.status === 'Delivered'
                                    ? 'green'
                                    : 'gray',
                        }}
                    />
                    <CardContent sx={{ flex: 1 }}>
                        <Typography variant="h6">Tracking Details</Typography>
                        <Typography>Status: {trackingInfo.status}</Typography>
                        <Typography>Location: {trackingInfo.location}</Typography>
                        <Typography>
                            Last Updated: {new Date(trackingInfo.lastUpdated).toLocaleString()}
                        </Typography>
                    </CardContent>
                </Card>
            )}

            {/* Snackbar for success */}
            <Snackbar
                open={success}
                autoHideDuration={3000}
                onClose={() => setSuccess(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={() => setSuccess(false)} severity="success" sx={{ width: '100%' }}>
                    Fetched details for package with ID "{trackingId}" successfully!
                </Alert>
            </Snackbar>

            {/* Snackbar for error */}
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
    );
};

export default Tracking;