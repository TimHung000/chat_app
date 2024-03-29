import "./messageList.css"
import { useState, useRef, useCallback, useEffect, useContext } from "react";
import { AuthContext } from "../../context/authContext/Auth";
import useMessages from "../../hooks/useMessages";
import jwt_decode from "jwt-decode";
import Message from "./Message";

const fetchSize = 5;

const MessageList = ({ allMessages, setAllMessages, currentChatRoom }) => {
    const [currentLastMessage, setCurrentLastMessage] = useState({});
    const { isFetching, hasNextMessage } = useMessages(currentLastMessage, fetchSize, setAllMessages, currentChatRoom);
    const intersectObserverRef = useRef();
    const bottomOfChatRef = useRef();
    const { auth } = useContext(AuthContext);


    const lastMessageRef = useCallback((topMessage) => {
        if (isFetching) return;

        if (intersectObserverRef.current) {
            intersectObserverRef.current.disconnect();
        }

        intersectObserverRef.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasNextMessage) {
                setCurrentLastMessage(allMessages[allMessages.length-1]);
            }
        }, { threshold: 1 })

        if (topMessage) {
            intersectObserverRef.current.observe(topMessage);
        }

    }, [isFetching, hasNextMessage, allMessages]);



    return (

        <div className="currentMessageBoxConversations">
            <div ref={bottomOfChatRef}></div>
            {
                allMessages?.map((message, index) => {
                    return <Message key={index} message={message} />
                })
            }
            <div ref={lastMessageRef}></div>
        </div>
    );
}

export default MessageList;