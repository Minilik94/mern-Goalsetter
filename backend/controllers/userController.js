const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')

// Register a new user

const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    const error = new Error('Please add all fields')
    error.status = 400
    return next(error)
  }

  const userExists = await User.findOne({ email })

  if (userExists) {
    const error = new Error('User already exist')
    error.status = 400
    return next(error)
  }

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  })

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    const error = new Error('Invalid user data')
    error.status = 400
    return next(error)
  }
})

// Login  user

const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    const error = new Error('Invalid Credentials')
    error.status = 400
    return next(error)
  }
})

// Get User Data

const getMe = asyncHandler(async (req, res, next) => {
  const { _id, name, email } = req.user

  const user = await User.findById(_id)
  if (!user) {
    const error = new Error('User not Found')
    error.status = 404
    return next(error)
  }
  res.status(200).json({
    id: user.id,
    name: user.name,
    email: user.email,
  })
})

// GENERATE JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

module.exports = {
  registerUser,
  loginUser,
  getMe,
}
