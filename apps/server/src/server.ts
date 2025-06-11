import { app, PORT } from "./express"
import { server } from "./socket"

app.get('/', (req, res) => {
  res.send('Hello, chadts!')
})

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})