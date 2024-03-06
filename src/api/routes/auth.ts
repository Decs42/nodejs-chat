import { login } from '../handlers/auth/login';
import express, { Router } from 'express';

const router: Router = express.Router();

router.post('/login', login);

export default router;