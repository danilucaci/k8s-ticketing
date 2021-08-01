import { Publisher, Subjects, TicketCreatedEvent } from "@dlc-k8s-test/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
