/* eslint-disable @typescript-eslint/no-explicit-any */
import { newsModel } from './news.model';

/* eslint-disable @typescript-eslint/no-unused-vars */
const createNews = async (news: any) => {
  const res = await newsModel.create(news);
  return res;
};

const getNews = async () => {
  const res = await newsModel.find();

  return res;
};

const DeleteNews = async (email: string) => {
  const res = await newsModel.deleteOne({ email: email });
  return res;
};
export const NewsServices = {
  createNews,
  getNews,
  DeleteNews,
};
