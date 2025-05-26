import express from 'express';
import { newsController } from './news.controller';
const router = express.Router();

router.post('/news', newsController.createNews);
router.get('/news', newsController.getNews);
router.delete('/news/:email', newsController.DeleteNews);
export const newsRouter = router;
