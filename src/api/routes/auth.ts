import { login } from '../handlers/auth/login';
import express, { Router } from 'express';

/**
 * Authentication router
 * Primary Goal: Creates routes for authentication
 */

const router: Router = express.Router();

router.post('/login', login);

export default router;