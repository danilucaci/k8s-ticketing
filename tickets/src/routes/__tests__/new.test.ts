import supertest from "supertest";

import { app } from "../../app";
import { Ticket } from "../../models/ticket";

const request = supertest(app);

it("has a route handler listening to /api/tickets for post request", async () => {
  const res = await request.post("/api/tickets");
  expect(res.statusCode).not.toBe(404);
});

it("can only be accessed if the user is signed in", async () => {
  const res = await request.post("/api/tickets").send({});
  expect(res.statusCode).toBe(401);
});

it("returns a status other than 401 if the user is signed", async () => {
  const res = await request
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({});
  expect(res.statusCode).not.toBe(401);
});

it("returns an error if an invalid title is provided", async () => {
  const res = await request
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      title: "",
      price: 10,
    });

  expect(res.statusCode).toBe(400);
});

it("returns an error if an invalid price is provided", async () => {
  const res = await request
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      title: "ticket title",
      price: null,
    });

  expect(res.statusCode).toBe(400);
});

it("creates a ticket with valid inputs", async () => {
  const prevTickets = await Ticket.find({}).lean().exec();

  expect(prevTickets).toHaveLength(0);

  const res = await request
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      title: "ticket title",
      price: 20,
    });

  const newTickets = await Ticket.find({}).lean().exec();

  expect(res.statusCode).toBe(201);
  expect(newTickets).toHaveLength(1);
});
