import React from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const ProtectedRoute = ({ children, adminOnly = false }) => {
    const token = localStorage.getItem('token');

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    if (adminOnly && decodedToken.role !== 'admin') {
        return <Navigate to="/" replace />;
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {children}
        </motion.div>
    );
};

export default ProtectedRoute;