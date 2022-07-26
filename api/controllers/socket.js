let users = [];

const addUser = ((userId, chatRoomId, socketId) => {

    if (!users.some((user) => { user.userId === userId })) {
        users.push({ userId, chatRoomId, socketId })
    }
});

const removeUser = ((userId) => {
    users = users.filter((user) => { user.userId !== userId })
});

const getUser = (userId) => {

    const user = users.find((user) =>{
        return user.userId === userId 
    });
    console.log(user);
    return user;
}

const getUsers = () => {
    return users;
}




module.exports = { addUser, removeUser, getUser, getUsers };