import { app, PORT } from "./express"
import { createServer } from 'http';
import { setupSocket } from "./socket";
import { connectRabbitMq } from "./rabbitmq";

const server = createServer(app);

// Setup socket.io with the created HTTP server
connectRabbitMq();
setupSocket(server);

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})