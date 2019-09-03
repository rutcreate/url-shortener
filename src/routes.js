import express from 'express'
import HomeController from './controllers/home'
import ShortenUrlController from './controllers/shorten-url'

// create new router
const router = express.Router()

// register routes
router.get('/', HomeController.index)
router.get('/:code', ShortenUrlController.redirect)
router.post('/shorten-url', ShortenUrlController.create)

export default router
