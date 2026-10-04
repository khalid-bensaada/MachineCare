const express = require("express");
const router = express.Router();
const protect = require("../middlewares/authMiddleware");
const { signUp, login, getUsers, getUserById, updateUser, deleteUser } = require("../controllers/userController");

router.post("/signup", signUp);
router.post("/login", login);

router.get("/", protect, getUsers);
router.get("/:id", protect, getUserById);
router.put("/:id", protect, updateUser);
router.delete("/:id", protect, deleteUser);

module.exports = router;