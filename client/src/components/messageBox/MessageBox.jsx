import "./messageBox.css";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import MessageList from "./MessageList";
import MessageFriendBar from "./MessageFriendBar";
import { useRef, useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/authContext/Auth";
import jwt_decode from "jwt-decode";
import { useParams } from "react-router-dom"
import axios from "../../api/axios";

const MessageBox = ({ currentChatRoom }) => {
  const { auth } = useContext(AuthContext);
  const userId = jwt_decode(auth?.accessToken).userId;
  const params = useParams();
  const sendMessageRef = useRef();
  const [allMessages, setAllMessages] = useState([]);


  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (sendMessageRef.current.value) {
      const sendMessage = {
        chatRoomId: currentChatRoom.chatRoomId,
        senderId: userId,
        message: sendMessageRef.current.value,
        time: Date.now(),
      };
      try {
        const res = await axios.put("/chatroom/addmessage", sendMessage)
        console.log(res);
        setAllMessages(prev => [sendMessage, ...prev]);
        sendMessageRef.current.value = "";
      } catch(err) {
        console.log(err);
      }
    }
  }

  return (
    <div className="messageBox">
      <div className="top">
        <MessageFriendBar />
      </div>
      <div className="middle">
        <MessageList messages={allMessages} setAllMessages={setAllMessages} />
      </div>
      <div className="bottom">

        <div className="currentMessageBoxSendMessageBar">
          <textarea placeholder="Please enter a message" ref={sendMessageRef} />
          <div className="items">
            <SentimentSatisfiedAltIcon
              sx=
              {{
                color: "var(--main-color)",
                "&:hover":
                {
                  color: "var(--main-color-dark)"
                }
              }}
            />
            <AttachFileIcon
              sx=
              {{
                color: "var(--main-color)",
                "&:hover":
                {
                  color: "var(--main-color-dark)"
                }
              }}
            />
            <button onClick={handleSendMessage}> Send </button>
          </div>
        </div>

      </div>

    </div>
  )
}

export default MessageBox;