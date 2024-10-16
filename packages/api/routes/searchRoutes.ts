import { Router } from 'express';
import { getMultiSearchResults } from '../actions/searchActions';

const router = Router();

// Endpoint to return search results: hotels, countries and cities
router.get('/', getMultiSearchResults);

export default router;