import express from 'express';
import { Request, Response } from 'express';
import cors from 'cors';
import { bikeRoute } from './app/modules/Bikes/bike.route';
import orderRoute from './app/modules/Orders/order.route';
const app = express();
app.use(express.json());
app.use(cors());
app.use('/api', bikeRoute);
app.use('/api', orderRoute);
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
