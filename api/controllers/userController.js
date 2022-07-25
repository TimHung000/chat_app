const User = require("../models/User");
const ChatRoom = require("../models/ChatRoom");
const bcrypt = require("bcrypt");

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
    if (friends.length > 0) {
      friends.map((friend) => {
        const { _id, username, profilePicture } = friend;
        friendList.push({ _id, username, profilePicture });
      });
    }
    res.status(200).json(friendList)
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};


// get user chat room
const handleGetUserChatRoom = async (req, res) => {
  try {
    const userId = req.params.userId.trim();
    const user = await User.findById(userId);
    // console.log(user);
    if (user?.chatRooms.length === 0) {
      return res.status(200).json([]);
    }

    const chatRooms = await Promise.all(
      user.chatRooms?.map((chatRoomId) => {
        return ChatRoom.findById(chatRoomId);
      })
    );

    res.status(200).json(chatRooms);
    
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}

//get a user
const handleGetUser = async (req, res) => {
  const userId = req.query.userId;
  const email = req.query?.email;
  // console.log(email)
  try {
    let user;
    if (userId) {
      user = await User.findById(userId);
    } else {
      user = await User.findOne({ email: email })
    }

    if (user) {
      const { password, updatedAt, ...other } = user._doc;
      res.status(200).json(other);
    } else {
      res.status(200).json({});
    }
  } catch (err) {
    res.status(500).json(err);
  }
};








//update user
const handleUpdateUser = async (req, res) => {
  if (req.body.userId === req.params.userId || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Account has been updated");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can update only your account!");
  }
};


// add friend by friendId
const handleAddFriend = async (req, res) => {
  const friendId = req.body.friendId;
  const userId = req.params.userId
  if (req.params.userId !== req.body.friendId) {
    try {
      const friend = await User.findById(friendId);
      const user = await User.findById(userId);
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
  const userId = req.params.userId;
  const friendId = req.body.friendId;
  if (userId !== friendId) {
    try {
      const friend = await User.findById(friendId);
      const user = await User.findById(userId);
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

// add chat room to user chatRoom list
const handleAddChatRoom = async (req, res) => {
  try {
    const userId = req.params.userId;
    const chatRoomId = req.body.chatRoomId;
    // console.log(req.body);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $push: { chatRooms: chatRoomId } },
      { new: true }
    )
    // console.log(updatedUser);
    res.status(200).json(updatedUser);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}




//delete user
const handleDeleteUser = async (req, res) => {
  if (req.body.userId === req.params.userId || req.body.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.userId);
      res.status(200).json("Account has been deleted");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can delete only your account!");
  }
};

module.exports = { handleUpdateUser, handleDeleteUser, handleGetUser, handleGetUserChatRoom, handleAddChatRoom, handleGetFriends, handleAddFriend, handleRemoveFriend };
