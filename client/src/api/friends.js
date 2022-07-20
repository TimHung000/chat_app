import axios from "./axios";


export const getFriends = async (userId) => {
    try {
        // console.log(`/friends/${userId}`);
        const res = await axios.get(`/friends/${userId}`);
        return res.data;
    } catch (err) {
        console.log(err);
    }
}