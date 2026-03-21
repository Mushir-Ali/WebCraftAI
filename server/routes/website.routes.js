import express from "express";
import { changes, generateWebsite, getAll, getWebsiteById } from "../controllers/website.controllers.js";
import isAuth from "../middlewares/isAuth.js";

const websiteRouter = express.Router();

websiteRouter.post('/generate',isAuth,generateWebsite);
websiteRouter.get('/get-by-id/:id',isAuth,getWebsiteById);
websiteRouter.get('/get-all',isAuth,getAll);
websiteRouter.post('/update/:id',isAuth,changes);

export default websiteRouter;