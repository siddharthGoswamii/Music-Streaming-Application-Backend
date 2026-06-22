import { Router } from 'express'
import { search, suggest } from '../controllers/search.controller'

const router = Router()

router.get('/', search)            // GET /search?q=daft+punk
router.get('/suggest', suggest)    // GET /search/suggest?q=da

export default router