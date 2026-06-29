import 'dotenv/config'
import express from 'express'
import searchRouter from './routes/search.routes'
import { connectES } from './config/elasticsearch'
import { connectRedis } from './config/redis'
import internalRoutes from "./routes/internal.routes";

const app = express()
app.use(express.json())

app.use('/search', searchRouter)
app.get('/health', (_, res) => res.json({ status: 'ok' }))

const start = async () => {
  await connectES()
  await connectRedis()
  app.listen(process.env.PORT || 3003, () => {
    console.log(`Search service running on port ${process.env.PORT || 3003}`)
  })
}

start()