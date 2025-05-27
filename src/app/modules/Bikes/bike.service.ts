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
    'page',
    'limit',
  ];

  excluded.forEach((el) => delete copy[el]);

  const search = query.search as string | undefined;
  const category = query.category as string | undefined;
  const brand = query.brand as string | undefined;
  const inStock = query.inStock as string | undefined;
  const minPrice = query.minPrice ? Number(query.minPrice) : undefined;
  const maxPrice = query.maxPrice ? Number(query.maxPrice) : undefined;

  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 6;
  const skip = (page - 1) * limit;

  const queryObject: {
    $or?: { [key: string]: { $regex: string; $options: string } }[];
    category?: string;
    brand?: string;
    inStock?: boolean;
    price?: { $gte?: number; $lte?: number };
  } = {};

  if (search) {
    queryObject.$or = searchFields?.map((field) => ({
      [field]: { $regex: search, $options: 'i' },
    }));
  }

  if (category) queryObject.category = category;
  if (brand) queryObject.brand = brand;
  if (inStock) queryObject.inStock = inStock === 'available';

  if (minPrice !== undefined || maxPrice !== undefined) {
    queryObject.price = {};
    if (minPrice !== undefined) queryObject.price.$gte = minPrice;
    if (maxPrice !== undefined) queryObject.price.$lte = maxPrice;
  }

  try {
    const filter = Object.keys(queryObject).length ? queryObject : {};

    const [bikes, total] = await Promise.all([
      BikeModel.find(filter).skip(skip).limit(limit),
      BikeModel.countDocuments(filter),
    ]);

    return {
      success: true,
      data: bikes,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
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

const getBikesByName = async (name: string) => {
  const result = await BikeModel.find({
    name: name,
  });
  return result;
};
export const BikeServices = {
  postBikeIntoDB,
  getAllBikesFromDB,
  BikeById,
  updateBikeInDB,
  DeleteBikeFromDB,
  getBikesByName,
};
