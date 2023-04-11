import { Router } from "express";
import viewsRouter from "./views/views.routes.js";
import productRouted from './api/products.routes.js';

const router = Router();

router.use('/', viewsRouter);
router.use('/api', productRouted)

export default router;