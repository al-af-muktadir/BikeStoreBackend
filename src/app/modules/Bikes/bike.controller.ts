import { Request, Response } from 'express';
import { BikeServices } from './bike.service';
//Post Bike Data
const createBike = async (req: Request, res: Response) => {
  try {
    const { bikes: BikeData } = req.body;
    const result = await BikeServices.postBikeIntoDB(BikeData);
    res.send({
      success: true,
      messege: 'Bike Created Successfully',
      data: result,
    });
  } catch (err) {
    res.send({
      success: false,
      message: err,
    });
  }
};

//GET all BIKE
const getAllBikes = async (req: Request, res: Response) => {
  const { searchTerm } = req.query;
  const result = await BikeServices.getAllBikesFromDB(searchTerm as string);
  res.send({
    success: true,
    messege: ' Bikes Retrieved Succesfully',
    data: result,
  });
};

const getBikeById = async (req: Request, res: Response) => {
  try {
    const BikeId = req.params.productId;
    const result = await BikeServices.BikeById(BikeId);
    res.send({
      success: true,
      message: 'Bike retrieved successfully',
      data: result,
    });
  } catch (err) {
    res.status(404).send({
      success: false,
      message: 'Bikes cannot be find',
      err,
    });
  }
};

const updateBike = async (req: Request, res: Response) => {
  const id = req.params.productId;
  await BikeServices.updateBikeInDB(id);
  const result2 = await BikeServices.BikeById(id);

  res.send({
    success: true,
    message: 'Bike Updated successfully',
    data: result2,
  });
};

const DeleteBike = async (req: Request, res: Response) => {
  const id = req.params.productId;
  const result = await BikeServices.DeleteBikeFromDB(id);
  const result2 = await BikeServices.BikeById(id);
  res.send({
    success: true,
    message: 'Bike Deleted successfully',
    data: { result2, result },
  });
};

export const BikeController = {
  createBike,
  getAllBikes,
  getBikeById,
  updateBike,
  DeleteBike,
};
