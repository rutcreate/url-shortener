import express from 'express'
import mongoose from 'mongoose'
import path from 'path'
import 'dotenv/config'
import routes from './routes'

// create express application
const app = express()

// register middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// setup static path
app.use(express.static(path.join(__dirname, 'public')))

// setup template engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'twig')

// register routes
app.use('/', routes)

// get database url
const databaseUrl = process.env.DATABASE_URL || 'mongodb://localhost:27017/shorten-url'

// connect to database
mongoose.connect(databaseUrl, { useNewUrlParser: true })
    .then(() => {
        console.log(`Database connected on ${databaseUrl}`)

        // get application port
        const port = process.env.PORT || 3000

        // start application
        app.listen(port, () => {
            console.log(`App is running on port ${port}`)
        })
    })
    .catch(err => {
        console.error(`cannot connect to database:`, err)
    })
