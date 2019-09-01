import express from 'express'
import { check } from 'express-validator'
import HomeController from './controllers/home'
import ShortenUrlController from './controllers/shorten-url'

// create new router
const router = express.Router()

// register routes
router.get('/', HomeController.index)
router.get('/:code', HomeController.redirect)
router.post('/shorten-url', [ check('url').isURL() ], ShortenUrlController.create)

export default router
