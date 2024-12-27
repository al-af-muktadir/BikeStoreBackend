import express from 'express';
import { BikeController } from './bike.controller';
const router = express.Router();

router.post('/products', BikeController.createBike);
router.get('/products', BikeController.getAllBikes);
router.get('/products/:productId', BikeController.getBikeById);
router.put('/products/:productId', BikeController.updateBike);
router.delete('/products/:productId', BikeController.DeleteBike);
export const bikeRoute = router;
