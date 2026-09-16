const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')
const fs = require('fs')

const videosRouter = require('./routes/videos')

const app = express()

// Enable CORS for frontend development and production
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:4000'
  ],
  credentials: true
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// API routes
app.use('/api/videos', videosRouter)

// Serve React build if present
const frontendBuild = path.join(__dirname, '../frontend/build')
if (fs.existsSync(frontendBuild)) {
  app.use(express.static(frontendBuild))
  app.get('*', (req, res) => {
    if (req.path.startsWith('/api/')) {
      return res.status(404).json({ error: 'API route not found' })
    }
    res.sendFile(path.join(frontendBuild, 'index.html'))
  })
} else {
  app.get('/', (req, res) => {
    res.send('AP Project backend is running. Use /api/videos to access the API.')
  })
}

const PORT = 4000
app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`))
