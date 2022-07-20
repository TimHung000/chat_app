import "./friendAndChatList.css";
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ChatIcon from '@mui/icons-material/Chat';
import PersonIcon from '@mui/icons-material/Person';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useNavigate, useParams, Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useContext } from "react";
import FriednList from "../friendList/FriendList";
import ChatRoomList from "../chatRoomList/ChatRoomList";



const FriendAndChatList = ({ setCurrentChatRoom }) => {
    const params = useParams();
    // console.log(params)

    const searchBarHint = () => {
        switch (params?.page) {
            case "chat": return "Search Chat List";
            case "friend": return "Search by Display Name";
            case "addfriend": return "Search by ID";
            default: return "something went wrong";
        }
    }

    const ListItems = () => {
        switch (params?.page) {
            case "chat":
                // console.log("chat")
                return <ChatRoomList setCurrentChatRoom={setCurrentChatRoom} />;
            case "friend":
                // console.log("friend")
                return <FriednList setCurrentChatRoom={setCurrentChatRoom} />;
            case "addfriend": return;
            default: return;
        }
    }

    return (
        <div className="friendAndChatList">
            <div className="top">
                <div className="left">
                    <SearchIcon className="icon" sx={{
                        color: "var(--main-color)"
                    }} />
                    <input placeholder={searchBarHint()} />
                </div>
                <div className="right">
                    <MoreVertIcon className="icon" sx={{
                        color: "var(--main-color)",
                        "&:hover": {
                            color: "var(--main-color-dark)"
                        }
                    }} />
                </div>
            </div>

            <div className="middle">
                {
                    ListItems()
                }
                {/* {[...Array(20)].map((element, index) => (
                    <div className="friendChatBox" key={index}>
                        <div className="left">
                            <img src="/assets/person/noAvatar.png" alt="" />
                        </div>
                        <div className="middle">
                            <div className="name">Tim</div>
                            <div className="recentMessage">test test test</div>
                        </div>
                        <div className="right">
                            <div className="time">Yesterdat</div>
                            <div className="notification-badge">55+</div>
                        </div>
                    </div>
                ))} */}

            </div>
            <div className="bottom">
                <div className="items">
                    <NavLink
                        to={`/chat${params?.chatRoomId ? "/" + params?.chatRoomId : ""}`}
                    >
                        <ChatIcon
                            sx={{
                                color: "var(--main-color)",
                                "&:hover":
                                {
                                    color: "var(--main-color-dark)"
                                },
                                ".active &": {
                                    color: "var(--main-color-dark)"
                                }
                            }}
                        />
                    </NavLink>
                    <NavLink
                        to={`/friend${params?.chatRoomId ? "/" + params?.chatRoomId : ""}`}
                    >
                        <PersonIcon
                            sx={{
                                color: "var(--main-color)",
                                "&:hover":
                                {
                                    color: "var(--main-color-dark)"
                                },
                                ".active &": {
                                    color: "var(--main-color-dark)"
                                }
                            }}
                            id="friend"
                        />
                    </NavLink>
                    <NavLink
                        to={`/addfriend${params?.chatRoomId ? "/" + params?.chatRoomId : ""}`}
                    >
                        <PersonAddIcon
                            sx={{
                                color: "var(--main-color)",
                                "&:hover":
                                {
                                    color: "var(--main-color-dark)"
                                },
                                ".active &": {
                                    color: "var(--main-color-dark)"
                                }
                            }}
                        />
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default FriendAndChatList;