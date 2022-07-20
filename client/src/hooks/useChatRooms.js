import { useState, useEffect } from "react";
import { getUser } from "../api/users";
import axios from "../api/axios";


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
                const chatRooms = await axios.get(`/chatroom/${userId}`,{ signal: controller.signal });
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