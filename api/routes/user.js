const userController = require("../controllers/userController");
const router = require("express").Router();

// get friends
router.get("/friend/:userId", userController.handleGetFriends);

// get cahtRoom in user
router.get("/chatroom/:userId", userController.handleGetUserChatRoom);

// get a user
router.get("/", userController.handleGetUser);


// update user
router.put("/update/:userId", userController.handleUpdateUser);

// add friend
router.put("/addfriend/:userId", userController.handleAddFriend);

// romve a friend
router.put("/removefriend/:userId", userController.handleRemoveFriend);

// add chat room into user chat room list
router.put("/addchatroom/:userId", userController.handleAddChatRoom);




// delete user
router.delete("/:userId", userController.handleDeleteUser);

module.exports = router;
