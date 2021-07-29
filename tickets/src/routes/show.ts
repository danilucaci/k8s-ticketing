import express, { Response, Request } from "express";
import { NotFoundError } from "@dlc-k8s-test/common";

import { Ticket } from "../models/ticket";

const router = express.Router();

router.get("/api/tickets/:ticketId", async (req: Request, res: Response) => {
  const { ticketId } = req.params;

  const found = await Ticket.findOne({
    _id: ticketId,
  });

  if (!found) {
    throw new NotFoundError();
  }

  res.status(200).send({
    data: {
      id: found.id,
      title: found.title,
      price: found.price,
      userId: found.userId,
    },
  });
});

export { router as showTicketsRouter };
