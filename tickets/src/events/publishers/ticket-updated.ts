import { Publisher, Subjects, TicketUpdatedEvent } from "@dlc-k8s-test/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
