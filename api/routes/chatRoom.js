const chatRoomController = require('../controllers/chatRoomController')
const router = require("express").Router();


// get ChatRoom by roomParticipants
router.get("/", chatRoomController.handleGetChatRommByRoomParticipant);

// get conversations from chatRoom
router.get("/conversation/:chatRoomId", chatRoomController.handleGetConversationsFromChatRoom),

// get chatRoom by ChatRoomId
router.get("/:chatRoomId", chatRoomController.handleGetChatRoom);

// create ChatRoom
router.post("/create", chatRoomController.handleCreateChatRoom);


// update Conversations in ChatRoom
router.put("/addmessage", chatRoomController.handleAddMessageByChatRoomId);


module.exports = router;
