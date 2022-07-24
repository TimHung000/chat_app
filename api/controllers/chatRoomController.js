const User = require('../models/User');
const ChatRoom = require("../models/ChatRoom");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// create New CHatRoom
const handleCreateChatRoom = async (req, res) => {
    console.log(req.body);
    const newChatRoom = new ChatRoom({
        roomParticipant: [req.body.userId, req.body.friendId]
    })
    try {
        const savedChatRoom = await newChatRoom.save();
        console.log(savedChatRoom);
        res.status(200).json(savedChatRoom);
    } catch (err) {
        res.status(500).json(err)
    }
}


// get All ChatRomms that user currently has 
const handleGetAllChatRoomsByUser = async (req, res) => {
    try {
        const userId = req.params.userId.trim();
        const user = await User.findById(userId);
        // console.log(`user: ${user}`);
        const chatRooms = await Promise.all(
            user.chatrooms.map((chatRoomId) => {
                return ChatRoom.findById(chatRoomId);
            })
        );
        let chatRoomList = [];
        chatRooms.map((chatRoom) => {
            const { _id, roomParticipant } = chatRoom;
            friendList.push({ _id, username, profilePicture });
        });
        res.status(200).json(chatRoomList);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}


// get the ChatRoom by roomParticipant
const handleGetChatRommByRoomParticipant = async (req, res) => {
    const userId = req.query.userId;
    const friendId = req.query.friendId;
    try {
        const chatRoom = await ChatRoom.find({
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
    console.log(req.body);
    try {
        const chatRoom = await ChatRoom.findById(req.body.chatRoomId);
        console.log(chatRoom);
        const updatedChatRoom = await ChatRoom.findByIdAndUpdate(
            req.body.chatRoomId,
            {
                $push: {
                    conversations: {
                        $each: [{
                            senderId: req.body.senderId,
                            meeeage: req.body.message,
                            time: req.body.time
                        }],
                        $position: 0
                    }
                }
            },
            { new: true }
        );

        console.log(updatedChatRoom);
        res.status(200).json(updatedChatRoom);
    } catch (err) {
        res.status(500).json(err);
    }
}

// get specify number of messages from the last end message 
// use to implement lazy loading
const handleGetConversationsFromChatRoom = async (req, res) => {

    console.log(req.params);
    try {

    } catch {

    }
}

module.exports = { handleCreateChatRoom, handleGetAllChatRoomsByUser, handleGetChatRommByRoomParticipant, handleGetChatRommByRoomParticipant, handleGetChatRoom, handleAddMessageByChatRoomId, handleGetConversationsFromChatRoom };