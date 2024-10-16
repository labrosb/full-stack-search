import { Router } from 'express';
import { getCountryByIsoCode } from '../actions/countryActions';

const router = Router();

// Endpoint returns a country by ISO code
router.get('/:isoCode', getCountryByIsoCode);

export default router;