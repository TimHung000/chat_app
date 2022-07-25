import "./friendList.css";
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { useFriends } from "../../hooks/useFriends";
import { AuthContext } from "../../context/authContext/Auth";
import jwt_decode from "jwt-decode";
import axios from "../../api/axios";

const FriendList = ({ currentChatRoom, setCurrentChatRoom, setAllMessages }) => {
    const { auth } = useContext(AuthContext);
    const userId = jwt_decode(auth.accessToken).userId
    const { friends } = useFriends(userId);

    const handleClick = async (e) => {
        const currentFriend = friends.find(friend => friend._id === e.currentTarget.id);
        // find chatRoom
        let res = await axios.get("/chatroom", {
            params: {
                userId: userId,
                friendId: currentFriend._id
            }
        });
        // if chatRoom not exist, create a new chatRoom
        if (res.status === 200 && !res.data) {
            res = await axios.post("/chatroom/create", {
                userId: userId,
                friendId: currentFriend._id
            });

            if (res?.data) {
                friends.forEach((friend, index) => {
                    if (friend._id === currentFriend._id) {
                        friends[index].chatRoomId = res.data._id;
                    }
                });

                await axios.put(`/user/addchatroom/${userId}`, {
                    chatRoomId: res.data._id
                })

                await axios.put(`/user/addchatroom/${currentFriend._id}`, {
                    chatRoomId: res.data._id
                })

            }
        }

        const currentChatRoom = {
            chatRoomId: res.data._id,
            friendId: currentFriend._id,
            friendName: currentFriend.username,
            friendPicture: currentFriend.profilePicture
        };

        setAllMessages([]);
        setCurrentChatRoom(currentChatRoom);

    }

    return (
        <>
            <div className="friendSearchBox">
                    <div className="left">
                        <SearchIcon className="icon" sx={{
                            color: "var(--main-color)"
                        }} />
                        <input placeholder="Search by Display Name" />
                    </div>
                    <div className="right">
                        <MoreVertIcon className="icon" sx={{
                            color: "var(--main-color)",
                            "&:hover": {
                                color: "var(--main-color-dark)"
                            }
                        }} >
                        </MoreVertIcon>
                    </div>
            </div>

            <div className="friendList">
                {

                    friends
                        ? friends.map((friend, id) => (
                            <NavLink
                                to={`/friend/${friend.chatRoomId}`}
                                key={id}
                            >
                                <div className="friendListItem" id={friend._id} onClick={handleClick}>
                                    <div className="left">
                                        {
                                            friend.profilePicture
                                                ? <img src={friend.profilePicture} alt="" />
                                                : <img src="/assets/person/noAvatar.png" alt="" />
                                        }
                                    </div>
                                    <div className="middle">
                                        <div className="name">{friend.username}</div>
                                    </div>
                                    <div className="right">

                                    </div>
                                </div>
                            </NavLink>
                        ))
                        : ""
                }
            </div>
        </>
    )
}

export default FriendList;