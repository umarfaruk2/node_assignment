import express, { Request, Response } from "express";
import initDB from "./config/config.db.js";
import authRouter from "./modules/auth/auth.route.js";

const app = express();

// json parser
app.use(express.json());

// database config
initDB();

// user route
app.use('/api/v1/auth/', authRouter);



export default app;
