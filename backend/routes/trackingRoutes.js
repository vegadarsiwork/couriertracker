import express from 'express';
import { 
  getTrackingInfo, 
  createTracking, 
  updateTracking, 
  deleteTracking 
} from '../controllers/trackingController.js';
import { adminAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/:id', getTrackingInfo);
router.post('/', adminAuth, createTracking);
router.put('/:id', adminAuth, updateTracking);
router.delete('/:id', adminAuth, deleteTracking);

export default router;