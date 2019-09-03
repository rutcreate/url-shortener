import express from 'express'
import RateLimit from 'express-rate-limit'
import RateLimitMongo from 'rate-limit-mongo'
import HomeController from './controllers/home'
import ShortenUrlController from './controllers/shorten-url'

// create api rate limiter
const shortenUrlRateLimiter = RateLimit({
    store: new RateLimitMongo({
        uri: process.env.DATABASE_URL
    }),
    windowMs: parseInt(process.env.RATE_LIMIT_MS) * 1000,
    max: parseInt(process.env.RATE_LIMIT_MAX),
    message: {
        errors: [
            {
                param: 'url',
                msg: 'Too many requests, please try again later'
            }
        ]
    }
})

// create new router
const router = express.Router()

// register routes
router.get('/', HomeController.index)
router.get('/:code', ShortenUrlController.redirect)
router.post('/shorten-url', shortenUrlRateLimiter, ShortenUrlController.create)

export default router
