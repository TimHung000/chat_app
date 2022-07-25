import { useState, useEffect } from "react";
import axios from "../api/axios";

const useMessages = (currentLastMessage, size, setAllMessages, currentChatRoom) => {
    const [isFetching, setIsFetching] = useState(false);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState({});
    const [hasNextMessage, setHasNextMessage] = useState(false);

    useEffect(() => {
        const controller = new AbortController();

        const fetchMessages = async () => {
            setIsFetching(true);
            setIsError(false);
            setError({});
            try {
                const res =
                    await axios.get(`/chatroom/conversation/${currentChatRoom.chatRoomId}`, {
                        params: {
                            lastMessageId: currentLastMessage ? currentLastMessage._id : "",
                            size: size,
                        },
                        signal: controller.signal
                    });
                const conversations = res.data[0]?.conversations;
                if (conversations.length === 0) {
                    setHasNextMessage(false);
                }
                setAllMessages(prev => [...prev, ...conversations]);
                setHasNextMessage(true);
                setIsFetching(false);
                setIsError(false);
            } catch (err) {
                console.log(err);
                setIsFetching(false);
                if (controller.signal.aborted) return;
                setIsError(true);
                setError({ message: err.message })
            }
        }

        fetchMessages();

        return () => controller.abort();
    }, [currentLastMessage, currentChatRoom, size, setAllMessages])

    return { isFetching, isError, error, hasNextMessage }
}


export default useMessages;