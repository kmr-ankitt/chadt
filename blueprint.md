# Chadt Blueprint

## Tech Stack

| Part                  | Tech                                        |
| --------------------- | ------------------------------------------- |
| **Frontend**          | Next.js                                     |
| **WebSocket Server**  | Node.js + `socket.io`                       |
| **Backend Framework** | Express  (for HTTP routes)                  |
| **Message Queue**     | RabbitMQ (`amqplib`)                        |
| **Streaming**         | Apache Kafka (`kafkajs`)                    |
| **File Uploads**      | AWS S3 (`@aws-sdk/client-s3`)               |
| **DB (optional)**     | NeonDB (for storing messages)               |

## Flow

```node
Client (WebSocket + HTTP for uploads)
         │
         ▼
Node.js Backend
  ├─ WebSocket server (real-time chat)
  ├─ HTTP endpoint for S3 uploads
  ├─ Publishes messages to RabbitMQ
         │
         ▼
     RabbitMQ
  └─ Fanout or direct exchange
         │
         ▼
Kafka Producer
  └─ Stores chat logs in Kafka topic
         │
         ▼
Kafka Consumers (optional)
  └─ Save to DB, analytics, moderation, etc.
```

