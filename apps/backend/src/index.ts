import express from "express";
import { WebSocketServer } from "ws";

const app = express();
const port = 4000;

app.get("/", (_req, res) => {
  res.send("Hello World");
});

const httpServer = app.listen(port, ()=>{
  console.log(`Server is running on http://localhost:${port}`);
})

const wss = new WebSocketServer({server : httpServer});

wss.on("connection",(socket)=>{
  socket.on("message", (data, isBinary)=>{
    wss.clients.forEach((client)=>{
      if(client.readyState == 1){
        client.send(data, {binary: isBinary});
      } 
    })
  })
})