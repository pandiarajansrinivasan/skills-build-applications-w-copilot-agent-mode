import express from 'express'
import mongoose from 'mongoose'
import { Activity, Leaderboard, Team, User, Workout } from './models/index.js'
import { createResourceRouter } from './routes/index.js'

const app = express()
const port = 8000
const mongoUrl = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/octofit_db'
const codespaceName = process.env.CODESPACE_NAME
const baseUrl = codespaceName ? `https://${codespaceName}-8000.app.github.dev` : `http://localhost:${port}`

app.use(express.json())
app.use((_request, response, next) => {
  response.setHeader('Access-Control-Allow-Origin', '*')
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  response.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE,OPTIONS')
  if (_request.method === 'OPTIONS') {
    response.sendStatus(204)
    return
  }
  next()
})

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected', baseUrl })
})

app.use('/api/users', createResourceRouter(User))
app.use('/api/teams', createResourceRouter(Team))
app.use('/api/activities', createResourceRouter(Activity))
app.use('/api/leaderboard', createResourceRouter(Leaderboard))
app.use('/api/workouts', createResourceRouter(Workout))

app.listen(port, () => {
  console.log(`OctoFit API listening at ${baseUrl}`)
})

mongoose
  .connect(mongoUrl)
  .then(() => console.log('Connected to octofit_db'))
  .catch((error: unknown) => {
    console.error('MongoDB connection failed; API will remain available:', error)
  })