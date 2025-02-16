import express from 'express';
import { Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { bikeRoute } from './app/modules/Bikes/bike.route';
import orderRoute from './app/modules/Orders/order.route';
import { AuthRouter } from './app/modules/Auth/auth.route';
import { globalErrorHandler } from './Error/globalErrorHandler';
import { UserRouter } from './app/modules/User/user.route';
const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'http://localhost:5174',
      'https://bikefrontend.vercel.app',
    ],
    credentials: true,
  }),
);
app.use('/api', bikeRoute);
app.use('/api', AuthRouter.route);
app.use('/api', UserRouter);
app.use('/api', orderRoute);
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});
app.use(globalErrorHandler);

export default app;
