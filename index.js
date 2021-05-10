import express from 'express'
import path from 'path'
import fs from 'fs'
import expressHandlebars from 'express-handlebars'
import logger from './middleware/logger.js'
import members from "./Members.js";

// Import route
import membersRoute from './routes/api/members.js'

const __dirname = fs.realpathSync('.')
const app = express()
const PORT = process.env.PORT || 5000

// Handlebars middleware
app.engine('handlebars', expressHandlebars({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// Init middleware
// app.use(logger)
app.use(express.json()) // Handles JSON
app.use(express.urlencoded({ extended: false })) // Handles form data

// Set routes
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Member App',
        members,
    })
})
app.use('/api/members', membersRoute)

// Set a static folder
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
    console.log(`Server started: ${PORT}`)
})