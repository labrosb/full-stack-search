import { Router } from 'express';
import { getCountryByIsoCode } from '../actions/countryActions';

const router = Router();

// Endpoint returns a country by ISO code
router.get('/:iso', getCountryByIsoCode);

export default router;