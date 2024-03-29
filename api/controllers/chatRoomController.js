const User = require('../models/User');
const ChatRoom = require("../models/ChatRoom");
const { default: mongoose } = require('mongoose');

// create New ChatRoom
const handleCreateChatRoom = async (req, res) => {
    const newChatRoom = new ChatRoom({
        roomParticipant: [req.body.userId, req.body.friendId]
    })
    try {
        const savedChatRoom = await newChatRoom.save();
        res.status(200).json(savedChatRoom);
    } catch (err) {
        res.status(500).json(err)
    }
}

// get the ChatRoom by roomParticipant
const handleGetChatRommByRoomParticipant = async (req, res) => {
    const userId = req.query.userId;
    const friendId = req.query.friendId;
    try {
        const chatRoom = await ChatRoom.findOne({
            "roomParticipant": { $all: [userId, friendId] }
        })
        res.status(200).json(chatRoom);
    } catch (err) {
        res.status(500).json(err);
    }
}

// get ChatRoom by ChatRoomId 
const handleGetChatRoom = async (req, res) => {
    const chatRoomId = req.params.chatRoomId.trim();
    try {
        const chatRoom = await ChatRoom.findById(chatRoomId);
        res.status(200).json(chatRoom);
    } catch (err) {
        res.status(500).json(err);
    }
}

// add new Message into ChatRoom
const handleAddMessageByChatRoomId = async (req, res) => {
    try {
        const chatRoom = await ChatRoom.findById(req.body.chatRoomId);
        const updatedChatRoom = await ChatRoom.findByIdAndUpdate(
            req.body.chatRoomId,
            {
                $push: {
                    conversations: {
                        $each: [{
                            senderId: req.body.senderId,
                            message: req.body.message,
                            time: req.body.time
                        }],
                        $position: 0
                    }
                }
            },
            { new: true }
        );

        res.status(200).json(updatedChatRoom);
    } catch (err) {
        res.status(500).json(err);
    }
}

// get specify number of messages from the last end message 
// use to implement lazy loading
const handleGetConversationsFromChatRoom = async (req, res) => {

    const chatRoomId = req.params.chatRoomId.trim();
    const lastMessageId = req.query.lastMessageId || -1;
    const size = parseInt(req.query.size.trim() || 0);
    try {
        let index;
        if (lastMessageId !== -1) {
            let indexObject = await ChatRoom.aggregate([
                { $match: { _id: mongoose.Types.ObjectId(chatRoomId) } },
                { $project: { matchIndex: { $indexOfArray: ["$conversations._id", mongoose.Types.ObjectId(lastMessageId)] } } }
            ]);
            index = indexObject[0].matchIndex + 1;
        } else {
            index = 0;
        }

        let conversations = [];
        if (size > 0) (
            conversations = await ChatRoom.aggregate([
                { $match: { _id: mongoose.Types.ObjectId(chatRoomId) } },
                { $project: { conversations: { $slice: ["$conversations", index, size] } } },
            ])
        )

        res.status(200).json(conversations);
    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports = { handleCreateChatRoom, handleGetChatRommByRoomParticipant, handleGetChatRommByRoomParticipant, handleGetChatRoom, handleAddMessageByChatRoomId, handleGetConversationsFromChatRoom };