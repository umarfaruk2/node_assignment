import express, { Request, Response } from "express";
import initDB from "./config/config.db.js";

const app = express();

// json parser
app.use(express.json());

// database config
initDB();

app.get('/', (req: Request, res: Response) => {
  res.send("hello it me")
})



export default app;
