const express = require("express");
const {
  getGoals,
  setGoal,
  updateGoals,
  deleteGoals,
} = require("../controllers/goalController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(protect)

router.route("/").get(getGoals).post(setGoal);
router.route("/:id").put(updateGoals).delete(deleteGoals);

module.exports = router;
