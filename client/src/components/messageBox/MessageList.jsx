import "./messageList.css"
import { useState, useRef, useCallback, useEffect } from "react";
import useMessages from "../../hooks/useMessages";
import Message from "./Message";


const MessageList = ({ messages, setAllMessages }) => {
    // console.log(messages)
    const [messageNum, setMessageNum] = useState([1,8]);
    const { isLoading, isError, error, results, hasNextMessage } = useMessages(messageNum);
    const intersectObserverRef = useRef();
    const bottomOfChatRef = useRef();


    const lastMessageRef = useCallback((topMessage) => {
        if (isLoading) return;
        // console.log(topMessage);
        // discard the prev end observer
        if (intersectObserverRef.current) {
            intersectObserverRef.current.disconnect();
        }

        intersectObserverRef.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasNextMessage) {
                setMessageNum(prev => [prev[1] + 1, prev[1] + 8])
            }
            // console.log(entries[0]);
        }, { threshold: 1 })

        if (topMessage) {
            intersectObserverRef.current.observe(topMessage);
        }

    }, [isLoading, hasNextMessage]);


    return (

        <div className="currentMessageBoxConversations">
            <div ref={bottomOfChatRef}></div>
            {
                messages.concat(results)?.map((message, index) => {
                    if( messages.length === index + 1) {
                        return  <Message key={index} message={message} />
                    } else {
                        return <Message key={index} message={message} />;
                    }
                })
            }
            <button onClick={() => bottomOfChatRef.current?.scrollIntoView({ behavior: "smooth" })} ref={lastMessageRef} > toBottom</button>
        </div>
    );
}

export default MessageList;