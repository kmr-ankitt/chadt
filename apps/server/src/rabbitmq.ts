import amqplib from "amqplib/callback_api"

const RABBITMQ_URL = process.env.RABBITMQ_URL!;

export function connectRabbitMq(){
  amqplib.connect(RABBITMQ_URL, (err, conn) => {
    if (err){
      console.error("Failed to connect to RabbitMQ:", err);
      return;
    }
    console.log("Connected to RabbitMQ");

    conn.createChannel((err, channel) => {
      if(err) {
        console.error("Failed to create channel:", err);
        return;
      }

      console.log("Channel created");
      channel.assertQueue("task_queue", {
        durable: true,
      });

      console.log("Waiting for messages in 'task_queue'");  
    })
  })
}