const express = require('express');
const router = express.Router();
const newsController = require('../controller/newsController');

router.post('/news', newsController.createNews);
router.get('/news', newsController.getNews);
router.get('/news/:_id', newsController.getNewsById);
router.put('/news/:_id', newsController.updateNews);
router.delete('/news/:_id', newsController.softDeleteNews);
router.delete('/news/hard/:_id', newsController.deleteNews); // hard delete

module.exports = router;
