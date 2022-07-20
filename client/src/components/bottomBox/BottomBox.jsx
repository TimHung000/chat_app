import "./bottomBox.css"
import FriendAndChatList from "../friendAndChatList/FriendAndChatList";
import MessageBox from "../messageBox/MessageBox";
import { Navigate, useParams, NavLink } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import { AuthContext } from "../../context/authContext/Auth";
import jwt_decode from "jwt-decode";


const BottomBox = () => {
    const [ currentChatRoom, setCurrentChatRoom ] = useState();

    // useEffect(() => {
    //     console.log(currentChatRoom);
    // },[currentChatRoom])

    return (
        <div className="bottomBox">
            <div className="bottomLeft">
                <FriendAndChatList setCurrentChatRoom={setCurrentChatRoom} />
            </div>
            <div className="bottomRight">
                {
                    currentChatRoom
                        ? <MessageBox currentChatRoom={currentChatRoom} />
                        : <p>no id</p>
                }
            </div>
        </div>
    );
}

export default BottomBox;