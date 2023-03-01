import { useContext } from 'react'
import { AuthContext } from "../../context/authContext/Auth";
import { format, render, cancel, register } from 'timeago.js'
import jwt_decode from "jwt-decode";

const Message = ({ message }) => {
    const { auth } = useContext(AuthContext);
    const userId = jwt_decode(auth?.accessToken).userId;
    return (
        <div className={message.senderId === userId ? "messageBoxSend" : "messageBoxReceive"}>
            <span className="time">{format(message.time)}</span>
            <div className="message">
                {message.message}
            </div>
        </div>
    );
}

export default Message