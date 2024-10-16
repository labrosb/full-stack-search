import { Router } from 'express';
import { getCityById } from '../actions/cityActions';

const router = Router();

// Endpoint returns a city by ID
router.get('/:id', getCityById);

export default router;