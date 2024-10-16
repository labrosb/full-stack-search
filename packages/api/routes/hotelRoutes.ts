import { Router } from 'express';
import { getHotelById } from '../actions/hotelActions';

const router = Router();

// Endpoint returns a hotel by ID
router.get('/:id', getHotelById);

export default router;