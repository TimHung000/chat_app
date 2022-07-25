import { useContext } from 'react'
import { AuthContext } from "../../context/authContext/Auth";
import jwt_decode from "jwt-decode";

const Message = ({ message }) => {
    const { auth } = useContext(AuthContext);
    const userId = jwt_decode(auth?.accessToken).userId;
    return (
        <div className={message.senderId === userId ? "messageBoxSend" : "messageBoxReceive"}>
            <span className="time">{message.time}</span>
            <div className="message">
                {/* {message.message.replace(/ /g, "\u00A0")} */}
                {message.message}
            </div>
        </div>
    );
}

export default Message