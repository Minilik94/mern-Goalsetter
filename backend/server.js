const express = require('express')
const colors = require('colors')
const { connectDB } = require('./config/db')
const dotenv = require('dotenv').config()
const goalRouter = require('./routes/goalRoutes')
const { errorHandler } = require('./middleware/errorMiddleware')
const app = express()

connectDB()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const PORT = process.env.PORT || 5000

app.use('/api/goals', require('./routes/goalRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`)
})
