import express from 'express';
import jwt from'jsonwebtoken';

const router = express.Router();

router.post('/login', (req, res) => {
    const {username, password} = req.body;
    if (username === 'admin' && password === 'password') {
        const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ token });
    } else if (username === 'user' && password === 'password') {
        const token = jwt.sign({ role: 'user' }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Invalid Credentials' });
    }
});

export default router;