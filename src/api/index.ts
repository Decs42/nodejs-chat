import express, { Router } from 'express';
import auth from '../api/routes/auth';

const router: Router = express.Router();

router.use('/auth', auth);

export default router;