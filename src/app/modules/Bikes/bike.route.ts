import express from 'express';
import { BikeController } from './bike.controller';
import { auth } from '../../middlewares/auth';
import validateRequest from '../../middlewares/ValidateRequest';
import { bikeValidationSchema } from './bikeValidation';
const router = express.Router();

router.post(
  '/products',
  auth('admin'),
  validateRequest(bikeValidationSchema),
  BikeController.createBike,
);
router.get('/products', BikeController.getAllBikes);
router.get('/product/:productNamae', BikeController.getBikesByName);
router.get('/products/:productId', BikeController.getBikeById);
router.patch('/products/:productId', auth('admin'), BikeController.updateBike);
router.delete('/products/:productId', auth('admin'), BikeController.DeleteBike);
export const bikeRoute = router;
