import express, { Router } from 'express';
import auth from './routes/auth.route';

/**
 * Server router
 * Primary Goal: Creates routes for all handlers on the server
 */

const router: Router = express.Router();

router.use('/auth', auth);

export default router;