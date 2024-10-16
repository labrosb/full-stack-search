import express from 'express';
import cors from 'cors';
import hotelRoutes from './routes/hotelRoutes';
import countryRoutes from './routes/countyRoutes';
import cityRoutes from './routes/cityRoutes';
import searchRoutes from './routes/searchRoutes';

const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors());
app.use(express.json({ limit: '1mb' }));

// Routes
app.use('/hotels', hotelRoutes);
app.use('/countries', countryRoutes);
app.use('/cities', cityRoutes);
app.use('/multi-search', searchRoutes);

app.listen(PORT, () => {
  console.log(`API Server Started at ${PORT}`)
});

export default app;
