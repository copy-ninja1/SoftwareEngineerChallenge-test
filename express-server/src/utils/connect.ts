import mongoose from "mongoose";
import log from "./logger";

function connect() {
  const dbUri = process.env.DB_URI as string;
  // const userName = process.env.MONGO_ROOT_USERNAME as string;
  // const password = process.env.MONGO_ROOT_PASSWORD as string;
  // const host = process.env.MONGO_HOST as string;
  // const url = `mongodb://${userName}:${password}@${host}:27017/soft`;

  return mongoose
    .connect(dbUri)
    .then(() => {
      log.info("Database Connected successfully");
    })
    .catch((error: any) => {
      log.error("Database Error: ", error);
      process.exit(1);
    });
}

export const disconnect = () => {
  if (process?.env?.NODE_ENV?.toString() == "test") {
    return mongoose.connection.db.dropDatabase().then(() => {
      return mongoose.disconnect();
    });
  } else {
    return mongoose.disconnect();
  }
};

export default connect;
