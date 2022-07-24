const userController = require("../controllers/userController");
const router = require("express").Router();

//update user
router.put("/:id", userController.handleUpdateUser);

//delete user
router.delete("/:id", userController.handleDeleteUser);

//get a user
router.get("/", userController.handleGetUser);

module.exports = router;
