const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')

const videosFile = path.join(__dirname, '..', 'data', 'videos.json')
const sampleData = require('../data/sampleData')
const historyFile = path.join(__dirname, '..', 'data', 'watchHistory.json')

function readJSON(filePath) {
  try {
    const raw = fs.readFileSync(filePath, 'utf8')
    return JSON.parse(raw)
  } catch (e) {
    return null
  }
}

function writeJSON(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
}

function ensureVideosFile() {
  const existing = readJSON(videosFile)
  if (!existing || !Array.isArray(existing) || existing.length === 0) {
    // seed from sampleData
    const seeded = sampleData.map((v) => {
      const id = generateId()
      return {
        _id: id,
        title: v.title,
        description: v.description,
        videoUrl: v.videoUrl,
        localFile: v.localFile,
        thumbnail: v.thumbnail,
        likes: v.likes || 0,
        views: v.views || 0,
        comments: (v.comments || []).map((c) => ({ _id: generateId(), author: c.author, text: c.text, createdAt: new Date().toISOString() })),
        createdAt: new Date().toISOString()
      }
    })
    writeJSON(videosFile, seeded)
    return seeded
  }
  return existing
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 9)
}

function readHistory() {
  try {
    const raw = fs.readFileSync(historyFile, 'utf8')
    return JSON.parse(raw)
  } catch (e) {
    return []
  }
}

function writeHistory(arr) {
  fs.writeFileSync(historyFile, JSON.stringify(arr, null, 2))
}

// Ensure videos file exists on startup
ensureVideosFile()

// GET /api/videos - list (supports ?title=)
router.get('/', (req, res) => {
  const { title } = req.query
  let videos = readJSON(videosFile) || []
  if (title) {
    const regex = new RegExp(title, 'i')
    videos = videos.filter((v) => regex.test(v.title))
  }
  videos.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  res.json(videos)
})

// POST /api/videos/seed - overwrite videos.json with sampleData (dev)
router.post('/seed', (req, res) => {
  try {
    const seeded = sampleData.map((v) => ({
      _id: generateId(),
      title: v.title,
      description: v.description,
      videoUrl: v.videoUrl,
      localFile: v.localFile,
      thumbnail: v.thumbnail,
      likes: v.likes || 0,
      views: v.views || 0,
      comments: (v.comments || []).map((c) => ({ _id: generateId(), author: c.author, text: c.text, createdAt: new Date().toISOString() })),
      createdAt: new Date().toISOString()
    }))
    writeJSON(videosFile, seeded)
    res.json({ ok: true, inserted: seeded.length })
  } catch (err) {
    console.error('Seed failed', err)
    res.status(500).json({ error: 'Seed failed' })
  }
})


// POST /api/videos/watch-history  { videoId }
router.post('/watch-history', (req, res) => {
  const { videoId } = req.body
  if (!videoId) return res.status(400).json({ error: 'videoId required' })
  const hist = readHistory()
  hist.unshift({ videoId, watchedAt: new Date().toISOString() })
  writeHistory(hist.slice(0, 50))
  res.json({ ok: true })
})



function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase()
  if (ext === '.mp4') return 'video/mp4'
  if (ext === '.webm') return 'video/webm'
  if (ext === '.ogg') return 'video/ogg'
  return 'application/octet-stream'
}

// GET /api/videos/stream/:id
router.get('/stream/:id', (req, res) => {
  const id = req.params.id
  const videos = readJSON(videosFile) || []
  const video = videos.find((x) => x._id === id)
  if (!video) return res.status(404).json({ error: 'Not found' })
  if (!video.localFile) return res.status(404).json({ error: 'No local file available' })

  const videoPath = path.join(__dirname, '..', 'media', path.basename(video.localFile))
  if (!fs.existsSync(videoPath)) return res.status(404).json({ error: 'File not found' })

  const { size } = fs.statSync(videoPath)
  const range = req.headers.range
  const contentType = getMimeType(videoPath)

  if (range) {
    const parts = range.replace(/bytes=/, '').split('-')
    const start = parseInt(parts[0], 10)
    const end = parts[1] ? parseInt(parts[1], 10) : size - 1
    if (isNaN(start) || isNaN(end) || start > end || end >= size) {
      res.status(416).set({ 'Content-Range': `bytes */${size}` }).send('Requested range not satisfiable')
      return
    }

    const chunkSize = end - start + 1
    const stream = fs.createReadStream(videoPath, { start, end })
    res.writeHead(206, {
      'Content-Range': `bytes ${start}-${end}/${size}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunkSize,
      'Content-Type': contentType
    })
    stream.pipe(res)
  } else {
    res.writeHead(200, {
      'Content-Length': size,
      'Content-Type': contentType,
      'Accept-Ranges': 'bytes'
    })
    fs.createReadStream(videoPath).pipe(res)
  }
})


// PUT /api/videos/:id/like  { like: true }
router.put('/:id/like', (req, res) => {
  const id = req.params.id
  const videos = readJSON(videosFile) || []
  const v = videos.find((x) => x._id === id)
  if (!v) return res.status(404).json({ error: 'Not found' })
  const inc = req.body && req.body.like === false ? -1 : 1
  v.likes = Math.max(0, (v.likes || 0) + inc)
  writeJSON(videosFile, videos)
  res.json({ likes: v.likes })
})

// PUT /api/videos/:id/comments  { author, text }
router.put('/:id/comments', (req, res) => {
  const id = req.params.id
  const { author, text } = req.body
  if (!text) return res.status(400).json({ error: 'text required' })
  const videos = readJSON(videosFile) || []
  const v = videos.find((x) => x._id === id)
  if (!v) return res.status(404).json({ error: 'Not found' })
  const comment = { _id: generateId(), author: author || 'Anonymous', text, createdAt: new Date().toISOString() }
  v.comments = v.comments || []
  v.comments.push(comment)
  writeJSON(videosFile, videos)
  res.json(v.comments)
})

// GET /api/videos/:id/likes
router.get('/:id/likes', (req, res) => {
  const id = req.params.id
  const videos = readJSON(videosFile) || []
  const v = videos.find((x) => x._id === id)
  if (!v) return res.status(404).json({ error: 'Not found' })
  res.json({ likes: v.likes || 0 })
})

// GET /api/videos/:id/comments
router.get('/:id/comments', (req, res) => {
  const id = req.params.id
  const videos = readJSON(videosFile) || []
  const v = videos.find((x) => x._id === id)
  if (!v) return res.status(404).json({ error: 'Not found' })
  res.json(v.comments || [])
})


// TODOS - FOR STUDENTS 

// TODO 1: GET /api/videos - list (supports ?title=)

// TODO 2: GET /api/videos/:id

// TODO 3: GET /api/videos/watch-history

// TODO 4: DELETE /api/videos/watch-history












































module.exports = router
