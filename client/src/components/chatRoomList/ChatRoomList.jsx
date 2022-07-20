import "./chatRoomList.css";
import { useContext, useEffect } from "react";
import { useChatRooms } from "../../hooks/useChatRooms";
import { AuthContext } from "../../context/authContext/Auth";
import jwt_decode from "jwt-decode";

const ChatRoomList = () => {
    const { auth } = useContext(AuthContext);
    const userId = jwt_decode(auth.accessToken).userId
    const { chatRooms, isFetching, isError, error } = useChatRooms(userId);


    return (
        <>
            {
                chatRooms.map((chatRoom) => (
                    <div className="chatRoomBox" key={chatRoom._id}>
                        <div className="left">
                            {
                                chatRoom.profilePicture
                                    ? <img src="" alt="" />
                                    : <img src="/assets/person/noAvatar.png" alt="" />
                            }                        </div>
                        <div className="middle">
                            <div className="name">Tim</div>
                            <div className="recentMessage">test test test</div>
                        </div>
                        <div className="right">
                            <div className="time">Yesterdat</div>
                            <div className="notification-badge">55+</div>
                        </div>
                    </div>
                ))
            }
        </>
    )
}

export default ChatRoomList;