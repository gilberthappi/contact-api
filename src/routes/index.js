import express from 'express';
import contactRouter from './contactRoute';


const mainRouter = express.Router();


mainRouter.use('/cont',contactRouter);

export  default mainRouter;
