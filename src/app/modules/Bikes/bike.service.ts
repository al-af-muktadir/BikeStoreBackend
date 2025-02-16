/* eslint-disable @typescript-eslint/no-explicit-any */
import { Bike } from './bike.interface';
import BikeModel from './bike.model';
import { ObjectId } from 'mongodb';
const postBikeIntoDB = async (bikes: Bike) => {
  const result = await BikeModel.create(bikes);
  return result;
};

const getAllBikesFromDB = async (query: Record<string, unknown>) => {
  const copy = { ...query };
  const searchFields = ['name', 'brand'];
  const excluded = [
    'search',
    'brand',
    'category',
    'inStock',
    'minPrice',
    'maxPrice',
  ];

  excluded.forEach((el) => delete copy[el]);

  const search = query.search as string | undefined;
  const category = query.category as string | undefined;
  const brand = query.brand as string | undefined;
  const inStock = query.inStock as string | undefined;
  const minPrice = query.minPrice ? Number(query.minPrice) : undefined;
  const maxPrice = query.maxPrice ? Number(query.maxPrice) : undefined;

  const queryObject: {
    $or?: { [key: string]: { $regex: string; $options: string } }[];
    category?: string;
    brand?: string;
    inStock?: boolean;
    price?: { $gte?: number; $lte?: number };
  } = {};

  if (search) {
    queryObject.$or = searchFields.map((field) => ({
      [field]: { $regex: search, $options: 'i' },
    }));
  }

  if (category) {
    queryObject.category = category;
  }
  if (brand) {
    queryObject.brand = brand;
  }

  if (inStock) {
    queryObject.inStock = inStock === 'available' ? true : false;
  }

  if (minPrice !== undefined || maxPrice !== undefined) {
    queryObject.price = {};
    if (minPrice !== undefined) queryObject.price.$gte = minPrice;
    if (maxPrice !== undefined) queryObject.price.$lte = maxPrice;
  }

  try {
    // If no filters are provided, return all bikes
    const result = await BikeModel.find(
      Object.keys(queryObject).length ? queryObject : {},
    );
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
const updateBikeInDB = async (id: string, bike: any) => {
  const result = await BikeModel.findByIdAndUpdate(id, bike);

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
