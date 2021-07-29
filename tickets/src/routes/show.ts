import express, { Response, Request } from "express";
import { NotFoundError } from "@dlc-k8s-test/common";

import { Ticket } from "../models/ticket";

const router = express.Router();

router.get("/api/tickets/:ticketId", async (req: Request, res: Response) => {
  const { ticketId } = req.params;

  try {
    var found = await Ticket.findOne({
      _id: ticketId,
    })
      .lean()
      .exec();

    if (!found) {
      throw new NotFoundError();
    }

    res.status(201).send({
      data: {
        title: found.title,
        price: found.price,
        userId: found.id,
      },
    });
    console.log(found);
  } catch (error) {
    console.log(error);
  }
});

export { router as showTicketsRouter };
