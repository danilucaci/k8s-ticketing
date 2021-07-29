import express, { Response, Request } from "express";
import { body } from "express-validator";
import { requireAuth, validateRequest } from "@dlc-k8s-test/common";

import { Ticket } from "../models/ticket";

const router = express.Router();

router.post(
  "/api/tickets",
  requireAuth,
  [
    body("title").not().isEmpty().withMessage("Title is required"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be greater than 0"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, price } = req.body;

    const ticket = await Ticket.create({
      title,
      price,
      userId: req.currentUser!.id,
    });

    res.status(201).send({
      data: {
        title: ticket.title,
        price: ticket.price,
        userId: ticket.id,
      },
    });
  }
);

export { router as createTicketsRouter };
