const chatRoomController = require('../controllers/chatRoomController')
const router = require("express").Router();



// create ChatRoom
router.post("/create", chatRoomController.handleCreateChatRoom);

// get all ChatRoom in user
router.get("/:userId", chatRoomController.handleGetAllChatRoomsByUser);

// get ChatRoom by roomParticipants
router.get("/", chatRoomController.handleGetChatRommByRoomParticipant);

// get chatRoom by ChatRoomId
router.get("/:chatRoomId", chatRoomController.handleGetChatRoom);

// update Conversations in ChatRoom
router.put("/addmessage", chatRoomController.handleAddMessageByChatRoomId);

// get conversations from chatRoom
router.get("/chatRoom/message/:userId/:lastMessageId/:quantitiesRetrieve", chatRoomController.handleGetConversationsFromChatRoom),

module.exports = router;
