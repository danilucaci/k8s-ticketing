import request from "supertest";
import { app } from "../../app";

it("signs out the user when called", async () => {
  const email = "dan@mail.com";
  const password = "daniel22";

  const singUpRes = await request(app).post("/api/users/signup").send({
    email: email,
    password: password,
  });

  expect(singUpRes.statusCode).toBe(201);
  expect(singUpRes.get("Set-Cookie")).toBeDefined();

  const singOutRes = await request(app).post("/api/users/signout").send({});
  expect(singOutRes.statusCode).toBe(200);
});
