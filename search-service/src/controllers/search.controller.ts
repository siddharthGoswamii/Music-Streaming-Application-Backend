import { type Request, type Response } from 'express'
import { searchTracks, suggestTracks } from '../services/search.service'

export const search = async (req: Request, res: Response) => {
  const { q, type } = req.query

  if (!q || typeof q !== 'string') {
    return res.status(400).json({ error: 'q param is required' })
  }

  try {
    const results = await searchTracks(q, type as string | undefined)
    return res.json({ success: true, results })
  } catch (err) {
    console.error('Search error:', err)
    return res.status(500).json({ error: 'Search failed' })
  }
}

export const suggest = async (req: Request, res: Response) => {
  const { q } = req.query

  if (!q || typeof q !== 'string' || q.length < 2) {
    return res.status(400).json({ error: 'q must be at least 2 characters' })
  }

  try {
    const suggestions = await suggestTracks(q)
    return res.json({ success: true, suggestions })
  } catch (err) {
    console.error('Suggest error:', err)
    return res.status(500).json({ error: 'Suggest failed' })
  }
}