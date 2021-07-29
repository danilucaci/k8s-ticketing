import supertest from "supertest";
import mongoose from "mongoose";

import { app } from "../../app";
import { Ticket } from "../../models/ticket";

const request = supertest(app);

it("returns a 404 if the ticket is not found", async () => {
  const ticketId = new mongoose.Types.ObjectId().toHexString();
  const res = await request.get(`/api/tickets/${ticketId}`).send();
  expect(res.statusCode).toBe(404);
});

it("returns the ticket if the ticket is found", async () => {
  const expectedTitle = "ticket 01";
  const expectedPrice = 200;

  const postRes = await request
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      title: expectedTitle,
      price: expectedPrice,
    });

  const getRes = await request
    .get(`/api/tickets/${postRes.body.data.id}`)
    .send();

  expect(postRes.statusCode).toBe(201);
  expect(getRes.statusCode).toBe(200);
  expect(getRes.body).toMatchObject({
    data: {
      title: expectedTitle,
      price: expectedPrice,
      id: expect.any(String),
      userId: expect.any(String),
    },
  });
});
