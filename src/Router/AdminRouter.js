import express from 'express';
import {addGallery, getGalleries} from '../controllers/AdminController.js';
import upload  from '../middleware/multer.js';

const router = express.Router();

router.post('/addGallery', upload.single("file"), addGallery);
router.get('/getGalleries', getGalleries);

export default router;