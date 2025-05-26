import catchAsync from '../../../util/CatchAsync';
import { NewsServices } from './news.service';

const createNews = catchAsync(async (req, res) => {
  //   console.log(req.body);
  const result = await NewsServices.createNews(req.body);
  res.status(201).json({
    status: 'success',
    message: 'News created successfully',
    data: result,
  });
});

const getNews = catchAsync(async (req, res) => {
  console.log('hitted');
  const result = await NewsServices.getNews();

  res.status(200).json({
    status: 'success',
    message: 'News fetched successfully',
    data: result,
  });
});

const DeleteNews = catchAsync(async (req, res) => {
  const { email } = req.params;
  const result = await NewsServices.DeleteNews(email);

  res.status(200).json({
    status: 'success',
    message: 'News deleted successfully',
    data: result,
  });
});

export const newsController = {
  createNews,
  getNews,
  DeleteNews,
};
