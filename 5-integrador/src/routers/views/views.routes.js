import { Router } from "express";

const viewsRouter = Router();

viewsRouter.get('/', (req, res, next) => {
    res.redirect('/inventoryupload');
});

viewsRouter.get('/inventoryupload', (req, res, next) => {
    res.render('inventoryupload', { pageTitle: 'Cargar productos' });
});

export default viewsRouter;