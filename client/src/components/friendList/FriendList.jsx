import "./friendList.css";
import { useContext } from "react";
import { useFriends } from "../../hooks/useFriends";
import { AuthContext } from "../../context/authContext/Auth";
import { useParams, NavLink } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "../../api/axios";

const FriendList = ({ setCurrentChatRoom }) => {
    const { auth } = useContext(AuthContext);
    const userId = jwt_decode(auth.accessToken).userId
    const { friends, isFetching, isError, error } = useFriends(userId);
    const params = useParams();
    // console.log(friends);


    const handleClick = async (e) => {
        const currentFriend = friends.find(friend => friend._id === e.currentTarget.id);
        const res = await axios.get("/chatroom", {
            params: {
                userId: userId,
                friendId: currentFriend.id
            }
        });
        if (res.status === 200 && !res.data[0]) {
            res = await axios.post("/chatroom/create", {
                userId: userId,
                friendId: currentFriend.id
            });
        }

        if (res?.data[0]) {
            const currentChatRoom = {
                chatRoomId: res.data[0]._id,
                friend: currentFriend._id,
                friendName: currentFriend.username,
                friendPicture: currentFriend.profilePicture
            };
            setCurrentChatRoom(currentChatRoom);
        }
        // console.log(res);
    }

    return (
        <div className="friendListBox">
            {
                friends.map((friend, id) => (
                    <NavLink
                        to={`/friend/${friend._id}`}
                        key={id}
                    >
                        <div className="friendListItem" id={friend._id} key={friend._id} onClick={handleClick}>
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
            }
        </div>
    )
}

export default FriendList;