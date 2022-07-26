import "./messageBox.css";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import MessageList from "./MessageList";
import MessageFriendBar from "./MessageFriendBar";
import { useRef, useContext, useEffect } from "react";
import { AuthContext } from "../../context/authContext/Auth";
import jwt_decode from "jwt-decode";
import axios from "../../api/axios";
import { io } from "socket.io-client";



const MessageBox = ({ currentChatRoom, allMessages, setAllMessages }) => {
  const { auth } = useContext(AuthContext);
  const userId = jwt_decode(auth?.accessToken).userId;
  const sendMessageRef = useRef();
  const socket = useRef();

  useEffect(() => {
    socket.current = io("http://localhost:8800");

    socket.current.on("getMessage", (data) => {
      const message = {
        _id: "",
        message: data.message,
        senderId: data.senderId,
        time: data.time
      }
      setAllMessages(prev => [ message , ...prev ]);
    })
    return () => socket.current.close();
  }, []);

  useEffect(() => {
    if(currentChatRoom) {
      socket.current.emit("join", { userId, chatRoomId: currentChatRoom.chatRoomId });
    }
    return () => socket.current.emit("leave", userId)
  }, [auth, currentChatRoom])



  const handleSendMessage = async () => {
    if (sendMessageRef.current.value) {
      const sendMessage = {
        chatRoomId: currentChatRoom.chatRoomId,
        senderId: userId,
        message: sendMessageRef.current.value,
        time: Date.now(),
      };
      try {
        await axios.put("/chatroom/addmessage", sendMessage)
        socket.current.emit("sendMessage", sendMessage);
        setAllMessages(prev => [sendMessage, ...prev]);
        sendMessageRef.current.value = "";
      } catch (err) {
        console.log(err);
      }
    }
  }

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
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