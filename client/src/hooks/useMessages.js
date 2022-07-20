import { useState, useEffect } from "react";


const getMessage = (messageParam , options = {} ) => {
    if(messageParam[1] > 40)
        return [];
    let messages = Array.from({ length: messageParam[1]-messageParam[0]+1 }, (_,i) => {
        return {
            sender: 1233,
            message: `${messageParam[0]+i}: test 123`,
            time: Date.now(),
        }
    })

    return messages;
}


const useMessages = (messageNum) => {
    const [results, setResults] = useState([]);
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


        setResults(prev => [...prev, ...messages]);
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