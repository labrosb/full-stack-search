import express from 'express';
import cors from 'cors';
import hotelRoutes from './routes/hotelRoutes';

const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors());
app.use(express.json({ limit: '1mb' }));

// Routes
app.use('/hotels', hotelRoutes);

app.listen(PORT, () => {
  console.log(`API Server Started at ${PORT}`)
});

export default app;
