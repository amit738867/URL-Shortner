import express from 'express';
import  handleGenerate  from '../controllers/url.js';
const router = express.Router();

router.post('/', handleGenerate);

export default router;