import { Bike } from './bike.interface';
import BikeModel from './bike.model';
import { ObjectId } from 'mongodb';
const postBikeIntoDB = async (bikes: Bike) => {
  const result = await BikeModel.create(bikes);
  return result;
};

const getAllBikesFromDB = async (searchTerm?: string | null) => {
  try {
    if (!searchTerm) {
      return await BikeModel.find();
    }
    const filter = searchTerm
      ? {
          $or: [
            { name: { $regex: searchTerm, $options: 'i' } },
            { brand: { $regex: searchTerm, $options: 'i' } },
            { category: { $regex: searchTerm, $options: 'i' } },
          ],
        }
      : {};

    const result = await BikeModel.find(filter);
    return result;
  } catch (err) {
    return {
      success: false,
      message: err,
    };
  }
};

const BikeById = async (BikeId: string) => {
  const result = await BikeModel.find({ _id: new ObjectId(BikeId) });
  return result;
};
const updateBikeInDB = async (id: string) => {
  const result = await BikeModel.updateOne(
    { _id: new ObjectId(id) },
    {
      price: 100000,
      quantity: 90,
    },
  );

  return result;
};

const DeleteBikeFromDB = async (id: string) => {
  const result = await BikeModel.deleteOne({ _id: new ObjectId(id) });

  return result;
};
export const BikeServices = {
  postBikeIntoDB,
  getAllBikesFromDB,
  BikeById,
  updateBikeInDB,
  DeleteBikeFromDB,
};
