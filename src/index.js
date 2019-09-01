import express from 'express'
import 'dotenv/config'
import routes from './routes'

// create express application
const app = express()

// register routes
app.use('/', routes)

// get application port
const port = process.env.PORT || 3000

// start application
app.listen(port, () => {
    console.log(`App is running on port ${port}`)
})
