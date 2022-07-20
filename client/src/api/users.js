import axios from "./axios";


export const getUser = async (userId) => {
    try {
        const res = await axios.get(`/users?userId=${userId}`);
        return res.data;
    } catch (err) {
        console.log(err);
    }
}