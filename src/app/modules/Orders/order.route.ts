import express from 'express';
import { OrderController } from './order.controller';

const orderRoute = express.Router();

orderRoute.post('/orders', OrderController.PostOrder);
orderRoute.get('/orders/revenue', OrderController.getREvenue);

export default orderRoute;
