import express from 'express'
import 'dotenv/config'

// create express application
const app = express()

// home page
app.get('/', (req, res) => res.send('home'))

// get application port
const port = process.env.PORT || 3000

// start application
app.listen(port, () => {
    console.log(`App is running on port ${port}`)
})
