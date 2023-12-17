const express = require('express')
const goalRouter = require('./routes/goalRoutes')
const app = express()

const PORT = process.env.PORT || 5000

app.use('/api/goals', goalRouter)

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
})