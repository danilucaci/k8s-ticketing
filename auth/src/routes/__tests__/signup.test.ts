import request from "supertest";
import { app } from "../../app";

it("returns a 201 on successful signup", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "dan@mail.com",
      password: "daniel22",
    })
    .then((response) => {
      expect(response.statusCode).toBe(201);
      expect(response.body).toEqual({
        user: {
          id: expect.any(String),
          email: "dan@mail.com",
        },
      });
    });
});

it("returns a 400 with an invalid email", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "adsads",
      password: "dasdasda",
    })
    .then((response) => {
      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({
        errors: expect.arrayContaining([
          {
            message: expect.stringMatching(/email/i),
            field: expect.any(String),
          },
        ]),
      });
    });
});

it("returns a 400 with an invalid password", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "dan@mail.com",
      password: "p",
    })
    .then((response) => {
      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({
        errors: expect.arrayContaining([
          {
            message: expect.stringMatching(/password/i),
            field: expect.any(String),
          },
        ]),
      });
    });
});

it("returns a 400 with missing email and password", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "",
      password: "asdasdads",
    })
    .then((response) => {
      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({
        errors: expect.arrayContaining([
          {
            message: expect.stringMatching(/email/i),
            field: expect.any(String),
          },
        ]),
      });
    });
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "dan@mail.com",
      password: "",
    })
    .then((response) => {
      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({
        errors: expect.arrayContaining([
          {
            message: expect.stringMatching(/password/i),
            field: expect.any(String),
          },
        ]),
      });
    });
});

it("disallows duplicate emails", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "dan@mail.com",
      password: "daniel22",
    })
    .then((response) => {
      expect(response.statusCode).toBe(201);
      expect(response.body).toEqual({
        user: {
          id: expect.any(String),
          email: "dan@mail.com",
        },
      });
    });
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "dan@mail.com",
      password: "password",
    })
    .then((response) => {
      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({
        errors: expect.arrayContaining([
          {
            message: expect.stringMatching(/email/i),
          },
        ]),
      });
    });
});

it("sets a cookie after a successful signup", async () => {
  const response = await request(app)
    .post("/api/users/signup")
    .send({ email: "dan@mail.com", password: "password" });

  expect(response.get("Set-Cookie")).toBeDefined();
});
