const User = require("../models/User");
const mongoose = require("mongoose");

// get all friends by userId 
const handleGetFriends = async (req, res) => {
    try {

        const userId = req.params.userId.trim();
        const user = await User.findById(userId);
        // console.log(`user: ${user}`);
        const friends = await Promise.all(
            user.friends.map((friendId) => {
                return User.findById(friendId);
            })
        );
        let friendList = [];
        friends.map((friend) => {
            const { _id, username, profilePicture } = friend;
            friendList.push({ _id, username, profilePicture });
        });
        res.status(200).json(friendList)
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

// add friend by friendId
const handleAddFriend = async (req, res) => {
    const friendId = req.params.friendId.trim();
    if (req.body.userId !== req.params.id) {
        try {
            const friend = await User.findById(friendId);
            const user = await User.findById(req.body.userId);
            if (!user.friends.includes(friendId)) {
                await user.updateOne({ $push: { friends: friendId } });
                res.status(200).json(`successfully add ${friend.username} as friend`);
            } else {
                res.status(403).json(`you already added ${friend.username} as friend`);
            }
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("you can't add youself as friend");
    }
};

// romve a friend from friendList
const handleRemoveFriend = async (req, res) => {
    const friendId = req.params.friendId.trim();
    if (req.body.userId !== friendId) {
        try {
            const friend = await User.findById(friendId);
            const user = await User.findById(req.body.userId);
            if (user.friends.includes(friendId)) {
                await user.updateOne({ $pull: { friends: friendId } });
                res.status(200).json(`${friend.username} has been deleted from your friend`);
            } else {
                res.status(403).json(`you haven't add ${friend.username} as a friend`);
            }
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("you can't remove yourself from friend");
    }
};

module.exports = { handleGetFriends, handleAddFriend, handleRemoveFriend };