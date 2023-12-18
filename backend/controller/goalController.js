const asyncHandler = require("express-async-handler");
const Goal = require("../models/goalModel");

// Get all goals
const getGoals = asyncHandler(async (req, res, next) => {
  const goals = await Goal.find();

  res.status(200).json(goals);
  next();
});

// Create new goals
const setGoal = asyncHandler(async (req, res, next) => {
  if (!req.body.text) {
    const error = new Error("Please add a text field");
    error.status = 400;
    return next(error);
  }

  const goals = await Goal.create({
    text: req.body.text,
  });

  res.status(200).json(goals);

  next();
});

// Update Goals
const updateGoals = asyncHandler(async (req, res, next) => {
  const goal = await Goal.findById(req.params.id)

  if(!goal) {
    const error = new Error('Goal not found')
    error.status = 404
    return next(error)
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  })
  
  res.status(200).json(updatedGoal);
  next();
});

// Delete Goals
const deleteGoals = asyncHandler(async (req, res, next) => {
  res.json({
    status: 200,
    message: `Delete goals ${req.params.id}`,
  });
  next();
});

module.exports = {
  getGoals,
  setGoal,
  updateGoals,
  deleteGoals,
};
