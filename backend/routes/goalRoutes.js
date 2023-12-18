const express = require("express");
const {
  getGoals,
  setGoal,
  updateGoals,
  deleteGoals,
} = require("../controller/goalController");

const router = express.Router();

router.route("/").get(getGoals).post(setGoal);
router.route("/:id").put(updateGoals).delete(deleteGoals);

module.exports = router;
