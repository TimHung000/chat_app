import { useState, useEffect } from "react";
import axios from "../api/axios";

export const useFriends = (userId) => {
    const [friends, setFriends] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState({});

    useEffect(() => {
        const controller = new AbortController();

        const fetchFriends = async () => {
            setIsFetching(true);
            setIsError(false);
            setError({});
            try {

                const res = await axios.get(`/user/friend/${userId}`, { signal: controller.signal });
                const friends = res.data;
                let friendsWithChatRoomId = [];
                if (friends.length > 0) {
                    const chatRoomsId = await Promise.all(
                        friends.map(async (friend, index) => {
                            const chatRoom = await axios.get(`/chatroom`, {
                                params: {
                                    userId: userId,
                                    friendId: friend._id
                                }
                            });
                            return chatRoom.data ? chatRoom.data._id : ""
                        })
                    );
                    friendsWithChatRoomId =
                        friends.map((friend, index) => {
                            return { ...friend, chatRoomId: chatRoomsId[index] };
                        });
                    // console.log(friendsWithChatRoomId);
                }

                setFriends(friendsWithChatRoomId);
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
        fetchFriends();
        return () => controller.abort();
    }, [userId])

    return { friends, isFetching, isError, error };
};
