import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()
export const PORT = process.env.PORT || 4000

export const app = express()
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello, chadts!')
})