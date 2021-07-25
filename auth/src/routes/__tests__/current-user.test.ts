import request from "supertest";
import { app } from "../../app";

it("responds with the details about the current user", async () => {
  await global.signin();

  const currentUserRes = await request(app)
    .get("/api/users/currentuser")
    .send({});
  expect(currentUserRes.statusCode).toBe(200);
});

it("responds with null if not authenticated", async () => {
  const currentUserRes = await request(app)
    .get("/api/users/currentuser")
    .send({});
  expect(currentUserRes.statusCode).toBe(200);
  expect(currentUserRes.body).toEqual({
    currentUser: null,
  });
});
