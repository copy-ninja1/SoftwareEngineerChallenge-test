import "reflect-metadata";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connect from "./utils/connect";
import log from "./utils/logger/index";
import { routesV1, routesV2 } from "./routers";
// import y from '../../../'
dotenv.config();

const port = process.env.SERVER_PORT as string;
const host = process.env.SERVER_HOST as string;

const app = express();
app.use(cors());

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Welcome!");
});
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hey you i'm here...");
});

// this is for 404
// app.use(function (req, res, next) {
//   res.status(404).send("route not found");
// });

app.listen(parseInt(port), host, async () => {
  log.info(`Server listening at http://${host}:${port}`);
  await connect();

  routesV1(app);
  app.use("/api/v2", routesV2);
});

export default app;
