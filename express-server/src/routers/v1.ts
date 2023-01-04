import { Express } from "express";
import mongoose from "mongoose";
import userRoutes from "../modules/user/user.v1.routes";
import pageRouter from "../modules/page/page.v1.routes";

function routersv1(expressInstance: Express) {
  expressInstance.use("/api/v1/user", userRoutes);
  expressInstance.use("/api/v1/page", pageRouter);

  /**
   * Only drop developemnt data base
   * if you drop DB in production you are fired
   **/
  expressInstance.use("/db/drop", (req, res) => {
    if (process.env.NODE_ENV === "development") {
      mongoose.connection.db.dropDatabase();
      return res.send("database dropped");
    }
    return res.status(401).send("Avoid dropping your database on production");
  });
}

export default routersv1;
