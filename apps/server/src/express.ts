import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import userRouter from './routes/userRoute'

dotenv.config()
export const PORT = process.env.PORT || 4000

export const app = express()
app.use(cors())
app.use(express.json());
app.use("/user", userRouter)

app.get('/', (req, res) => {
  res.send('Hello, chadts!')
})