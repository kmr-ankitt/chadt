import { app, PORT } from "./express"
import { createServer } from 'http';
import { setupSocket } from "./socket";
import { setupRedis } from "./redis/init";

const server = createServer(app);

// Setup socket.io with the created HTTP server
setupSocket(server);
setupRedis();

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})