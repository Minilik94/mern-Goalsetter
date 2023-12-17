const getGoals = async (req, res) => {
    res.status(200, {message: 'Get goals'})
}

module.exports = {
    getGoals
}