import { Request, Response, Router } from "express";

let routersv2 = Router();

routersv2.get("/health", (req: Request, res: Response) => {
  res.status(200).send("version 2.0.0 : Server is healthy");
});

export default routersv2;
