import "./addFriend.css";
import SearchIcon from '@mui/icons-material/Search';
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/authContext/Auth";
import jwt_decode from "jwt-decode";
import axios from "../../api/axios";




const AddFriend = () => {
    const { auth } = useContext(AuthContext);
    const userId = jwt_decode(auth.accessToken).userId
    const [friend, setFriend] = useState({});
    const [searchMessage, setSearchMessage] = useState({});
    const [addMessage, setAddMessage] = useState({});
    const searchRef = useRef();

    const handleSearchSubmit = async () => {
        setSearchMessage({});
        setAddMessage({})
        try {
            if (searchRef.current?.value !== "") {
                const res = await axios.get("/user", {
                    params: {
                        email: searchRef.current?.value
                    }
                });
                if (res.data?._id && res.data._id !== userId) {
                    setFriend(res.data);
                    searchRef.current.value = "";
                } else if (res.data._id === userId) {
                    setSearchMessage({ message: "can't add youself as friend" });
                    setFriend({});
                } else {
                    setSearchMessage({ message: "couldn't find this email" });
                    setFriend({});
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    const handleAddFriend = async (e) => {
        e.preventDefault();
        try {
            const [userAddFriend, friendAddUser] = await Promise.all(
                [
                    axios.put(`/user/addfriend/${userId}`, { friendId: friend._id }),
                    axios.put(`/user/addfriend/${friend._id}`, { friendId: userId })
                ]
            );
            // console.log(userAddFriend);
            // console.log(friendAddUser);
            if (userAddFriend.status === 200 || friendAddUser.status === 200) {
                setAddMessage({ message: "successfully add the friend" })
            }
        } catch (err) {
            console.log(err);
            setAddMessage({ message: err.response.data })
        }
    }

    const handleInputKeyDown = (e) => {
        if (e.key === "Enter")
            handleSearchSubmit();
    }


    return (
        <>
            <div className="addFriendSearchBar">
                <div className="left">
                    <SearchIcon className="icon" sx={{
                        color: "var(--main-color)"
                    }} />
                    <input placeholder="Search by ID"
                        ref={searchRef}
                        onKeyDown={handleInputKeyDown}
                    />
                </div>
                <div className="right">
                    <button onClick={handleSearchSubmit}>
                        submit
                    </button>
                </div>
            </div>


            <div className="addFriendBox">
                {

                    friend?._id
                        ?
                        <>
                            <span className="addMessage">{addMessage.message}</span>
                            <img src={friend.profilePicture === "" ? "/assets/person/noAvatar.png" : friend.profilePicture} alt="" />
                            <div className="name">{friend.username}</div>
                            <button onClick={handleAddFriend}>add</button>
                        </>

                        :
                        <span className="searchMessage">{searchMessage.message}</span>
                }
            </div>

        </>
    )
}

export default AddFriend;