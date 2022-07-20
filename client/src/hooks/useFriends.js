import { useState, useEffect } from "react";
import { getFriends } from "../api/friends";

export const useFriends = (userId) => {
    const [friends, setFriends] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState({});

    useEffect(() => {
        setIsFetching(true);
        setIsError(false);
        setError({});

        const controller = new AbortController();

        getFriends(userId, { signal: controller.signal }).then((res) => {
            // console.log(res);
            setFriends(res);
            setIsFetching(false);
            setIsError(false);
        }).catch((err) => {
            console.log(err);
            setIsFetching(false);
            if(controller.signal.aborted) return;
            setIsError(true);
            setError({message: err.message})
        })

        return () => controller.abort();
    }, [])

    return { friends, isFetching, isError, error };
};