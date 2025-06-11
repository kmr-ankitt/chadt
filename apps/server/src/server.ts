import { app, PORT } from "./express"
import { createServer } from 'http';
import { setupSocket } from "./socket";

const server = createServer(app);

// Setup socket.io with the created HTTP server
setupSocket(server);

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})