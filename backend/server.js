const path = require('path')
const express = require('express')
const colors = require('colors')
const { connectDB } = require('./config/db')
const dotenv = require('dotenv').config()
const goalRouter = require('./routes/goalRoutes')
const { errorHandler } = require('./middleware/errorMiddleware')
const morgan = require('morgan')
const app = express()

connectDB()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(morgan('dev'))

const PORT = process.env.PORT || 5000

app.use('/api/goals', require('./routes/goalRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

// if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')))
  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')))
// } else {
//   app.get('/', (req, res) => res.send
//   ('Please set to production'))
// }

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`)
})
