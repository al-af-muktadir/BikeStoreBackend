import { Request, Response } from 'express';
import { BikeServices } from './bike.service';
import catchAsync from '../../../util/CatchAsync';
import sendRespose from '../../../util/sendResponse';
import { StatusCodes } from 'http-status-codes';

//Post Bike Data
const createBike = catchAsync(async (req, res) => {
  const result = await BikeServices.postBikeIntoDB(req.body);
  sendRespose(res, {
    statusCode: StatusCodes.OK,
    message: 'Bike created Successfully',
    data: result,
  });
});

//GET all BIKE
const getAllBikes = catchAsync(async (req: Request, res: Response) => {
  // const { searchTerm } = req.query;
  const result = await BikeServices.getAllBikesFromDB(req.query);
  sendRespose(res, {
    statusCode: StatusCodes.OK,
    message: ' Bikes Retrieved Succesfully',
    data: result,
  });
});

const getBikeById = catchAsync(async (req: Request, res: Response) => {
  const BikeId = req.params.productId;
  const result = await BikeServices.BikeById(BikeId);
  sendRespose(res, {
    statusCode: StatusCodes.OK,
    message: 'Bike retrieved successfully',
    data: result,
  });
});

const updateBike = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.productId;
  // ////console.log(req.params.productId, req.body.data);
  const result = await BikeServices.updateBikeInDB(id, req.body);
  // const result2 = await BikeServices.BikeById();id
  sendRespose(res, {
    statusCode: StatusCodes.OK,
    message: 'Bike Updated successfully',
    data: result,
  });
});

const DeleteBike = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.productId;
  await BikeServices.DeleteBikeFromDB(id);
  const result2 = await BikeServices.BikeById(id);
  sendRespose(res, {
    statusCode: StatusCodes.OK,
    message: 'Bike Deletd successfully',
    data: result2,
  });
});

const getBikesByName = catchAsync(async (req: Request, res: Response) => {
  const result = await BikeServices.getBikesByName(req.params.productNamae);
  sendRespose(res, {
    statusCode: StatusCodes.OK,
    message: 'Bike retrieved successfully',
    data: result,
  });
});

export const BikeController = {
  createBike,
  getAllBikes,
  getBikeById,
  updateBike,
  DeleteBike,
  getBikesByName,
};
