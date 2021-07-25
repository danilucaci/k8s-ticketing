import request from "supertest";
import { app } from "../../app";

it("fails when a email that doesn't exist is supplied", async () => {
  const response = await request(app).post("/api/users/signin").send({
    email: "dan@mail.com",
    password: "daniel22",
  });

  expect(response.statusCode).toBe(400);
  expect(response.body).toEqual({
    errors: expect.arrayContaining([
      {
        message: expect.stringMatching(/invalid credentials/i),
      },
    ]),
  });
});

it("fails when proving an invalid password", async () => {
  const email = "dan@mail.com";
  const password = "daniel22";

  const signUpRes = await request(app).post("/api/users/signup").send({
    email: email,
    password: password,
  });

  expect(signUpRes.statusCode).toBe(201);
  expect(signUpRes.get("Set-Cookie")).toBeDefined();

  const signInRes = await request(app).post("/api/users/signin").send({
    email: email,
    password: "",
  });

  expect(signInRes.statusCode).toBe(400);
});

it("sets a valid when given valid credentials", async () => {
  const email = "dan@mail.com";
  const password = "daniel22";

  const signUpRes = await request(app).post("/api/users/signup").send({
    email: email,
    password: password,
  });

  expect(signUpRes.statusCode).toBe(201);
  expect(signUpRes.get("Set-Cookie")).toBeDefined();

  const signInRes = await request(app).post("/api/users/signin").send({
    email: email,
    password: password,
  });

  expect(signInRes.statusCode).toBe(200);
});
