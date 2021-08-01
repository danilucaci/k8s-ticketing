import nats, { Message } from "node-nats-streaming";
import { randomBytes } from "crypto";

const stan = nats.connect("ticketing", randomBytes(4).toString("hex"), {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("Listener connected to NATS");

  const options = stan
    .subscriptionOptions()
    .setManualAckMode(true)
    .setDeliverAllAvailable()
    .setDurableName("orders-service");

  const subscription = stan.subscribe(
    "ticket:created",
    "queue-group-name",
    options
  );

  stan.on("close", () => {
    console.log("\nNATS connection closed");
    process.exit();
  });

  subscription.on("message", (msg: Message) => {
    const data = msg.getData();

    if (typeof data === "string") {
      console.log(msg.getSequence());
      const parsedData = JSON.parse(data);
      console.log(parsedData);
      msg.ack();
    }
  });
});

process.on("SIGINT", () => stan.close());
process.on("SIGTERM", () => stan.close());
