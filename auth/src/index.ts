import mongoose from "mongoose";

import { app } from "./app";

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT key not defined");
  }

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI not defined");
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  } catch (error) {
    console.log(error);
  }

  app.listen(3000, () => {
    console.log(`Listening on port 3000`);
  });
};

start();
