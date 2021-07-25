import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";

import { app } from "../app";

let mongo: MongoMemoryServer;

declare global {
  var signin: () => Promise<string[]>;
}

global.signin = async () => {
  const email = "dan@mail.com";
  const password = "daniel22";

  const singUpRes = await request(app)
    .post("/api/users/signup")
    .send({
      email: email,
      password: password,
    })
    .expect(201);

  const cookie = singUpRes.get("Set-Cookie");

  return cookie;
};

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  process.env.JWT_KEY = "test_jwt_key";

  await mongoose.connect(mongoUri, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});
