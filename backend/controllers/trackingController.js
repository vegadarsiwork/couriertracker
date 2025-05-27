import Tracking from '../models/tracking.js';

export const getTrackingInfo = async (req, res) => {
    try {
        const tracking = await Tracking.findById(req.params.id);
        if (!tracking) 
            return res.status(404).json({ message: 'Tracking not found'});
        res.json(tracking);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const createTracking = async (req, res) => {
    try {
        const tracking = new Tracking({ _id: req.body.id, ...req.body });
        await tracking.save();
        res.status(201).json(tracking);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const updateTracking = async (req, res) => {
    try {
        const tracking = await Tracking.findByIdAndUpdate(req.params.id, {
            $set: {
                status: req.body.status,
                location: req.body.location,
                lastUpdated: new Date()
            },
            $push: {
                history: {
                    status: req.body.status,
                    location: req.body.location
                }
            }
        }, { new: true });
        
        if (!tracking) return res.status(404).json({ message: 'Tracking not found'});
        res.json(tracking);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const deleteTracking = async (req, res) => {
    try {
        await Tracking.findByIdAndDelete(req.params.id);
        res.json({ message: 'Tracking deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};