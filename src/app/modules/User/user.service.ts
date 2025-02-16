/* eslint-disable @typescript-eslint/no-explicit-any */
import { userModel } from './user.model';
import { ObjectId } from 'mongodb';
const getUserFromDb = async () => {
  const result = await userModel.find();
  //   ////console.log(result);
  return result;
};

const getUserById = async (id: string) => {
  const result = await userModel.findById(id);
  return result;
};

const UpdateStatusById = async (id: string, status: any) => {
  const result = await userModel.updateOne({ _id: new ObjectId(id) }, status);

  return result;
};
export const userServices = {
  getUserFromDb,
  getUserById,
  UpdateStatusById,
};
