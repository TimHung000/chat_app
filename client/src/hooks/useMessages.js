import { useState, useEffect } from "react";


const getMessage = (messageParam, options = {}) => {
    if (messageParam[1] > 40)
        return [];
    let messages = Array.from({ length: messageParam[1] - messageParam[0] + 1 }, (_, i) => {
        return {
            sender: 1233,
            message: `${messageParam[0] + i}: test 123`,
            time: Date.now(),
        }
    })

    return messages;
}


const useMessages = (currentLastMessage) => {
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState({});
    const [hasNextMessage, setHasNextMessage] = useState(false);


    useEffect(() => {
        setIsLoading(true);
        setIsError(false);
        setError({});

        const controller = new AbortController();
        const { signal } = controller;
        const messages = getMessage(messageNum);


        setMessages(prev => [...prev, ...messages]);
        setHasNextMessage(Boolean(messages.length));
        setIsLoading(false);

        // getMessage(messageNum, { signal })
        //     .then(res => {
        //         console.log(res);
        //         setResults(prev => [...prev, ...res]);
        //         setHasNextMessage(true);
        //         setIsLoading(false);
        //         console.log(`test: ${res}`)
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //         setIsLoading(false);
        //         if (signal.aborted) return;
        //         setIsError(true);
        //         setError({ message: err.message });
        //     })

        return () => controller.abort();
    }, [messageNum])
    return { isLoading, isError, error, results, hasNextMessage }
}


export default useMessages;

export const useChatRooms = (userId) => {
    const [chatRooms, setChatRooms] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState({});

    useEffect(() => {
        const controller = new AbortController();

        const fetchChatRoom = async () => {
            setIsFetching(true);
            setIsError(false);
            setError({});
            try {
                const chatRooms = await axios.get(`/chatroom/${userId}`, { signal: controller.signal });
                // console.log(chatRooms);
                const friends = await Promise.all(
                    chatRooms.map(async (chatRoom, index) => {
                        const friendId =
                            chatRoom.roomParticipant.filter((participantId) =>
                                participantId !== userId
                            );
                        return await getUser(friendId);
                    })
                );

                const chatRoomsWithFriendInfo =
                    chatRooms.map((chatRoom, index) => {
                        Object.assign({}, chatRoom, friends[index]);
                    });

                setChatRooms(chatRoomsWithFriendInfo);
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

        fetchChatRoom();

        return () => controller.abort();
    }, [])

    return { chatRooms, isFetching, isError, error };
};