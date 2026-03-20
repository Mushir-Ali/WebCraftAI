import express from "express";
import { generateWebsite } from "../controllers/website.controllers.js";
import isAuth from "../middlewares/isAuth.js";

const websiteRouter = express.Router();

websiteRouter.post('/generate',isAuth,generateWebsite);

export default websiteRouter;