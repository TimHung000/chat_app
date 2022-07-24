const friendController = require("../controllers/friendsController")
const router = require("express").Router();

// get friends
router.get("/:userId", friendController.handleGetFriends);

// add friend
router.put("/add/:friendId", friendController.handleAddFriend);

// romve a friend

router.put("/removefriend/:friendId", friendController.handleRemoveFriend);


module.exports = router;
