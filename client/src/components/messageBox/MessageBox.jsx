import "./messageBox.css";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import MessageList from "./MessageList";
import MessageFriendBar from "./MessageFriendBar";
import { useRef, useContext } from "react";
import { AuthContext } from "../../context/authContext/Auth";
import jwt_decode from "jwt-decode";
import axios from "../../api/axios";

const MessageBox = ({ currentChatRoom, allMessages, setAllMessages }) => {
  const { auth } = useContext(AuthContext);
  const userId = jwt_decode(auth?.accessToken).userId;
  const sendMessageRef = useRef();

  const handleSendMessage = async () => {
    console.log(sendMessageRef.current.value);
    if (sendMessageRef.current.value) {
      const sendMessage = {
        chatRoomId: currentChatRoom.chatRoomId,
        senderId: userId,
        message: sendMessageRef.current.value,
        time: Date.now(),
      };
      try {
        await axios.put("/chatroom/addmessage", sendMessage)
        setAllMessages(prev => [sendMessage, ...prev]);
        sendMessageRef.current.value = "";
      } catch (err) {
        console.log(err);
      }
    }
  }

  const handleInputKeyDown = (e) => {
    if(e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  }

  return (
    <div className="messageBox">
      <div className="top">
        <MessageFriendBar currentChatRoom={currentChatRoom} />
      </div>
      <div className="middle">
        <MessageList allMessages={allMessages} setAllMessages={setAllMessages} currentChatRoom={currentChatRoom} />
      </div>
      <div className="bottom">

        <div className="currentMessageBoxSendMessageBar">
          <textarea
            placeholder="Please enter a message"
            ref={sendMessageRef}
            onKeyDown={handleInputKeyDown}
          />
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
            <button onClick={handleSendMessage} > Send </button>
          </div>
        </div>

      </div>

    </div>
  )
}

export default MessageBox;