import "./listBar.css";
import PersonIcon from '@mui/icons-material/Person';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useParams, NavLink } from "react-router-dom";
import FriednList from "../friendList/FriendList";
import AddFriend from "../addFriend/AddFriend";



const ListBar = ({ currentChatRoom ,setCurrentChatRoom, setAllMessages }) => {
    const params = useParams();

    const ListItems = () => {
        switch (params?.page) {
            case "friend":
                return <FriednList currentChatRoom={currentChatRoom} setCurrentChatRoom={setCurrentChatRoom} setAllMessages={setAllMessages}/>;
            case "addfriend":
                return <AddFriend />;
            default: return;
        }
    }

    return (
        <div className="listBar">
            <div className="top">
                {
                    ListItems()
                }
            </div>
            <div className="bottom">
                <div className="items">
                    <NavLink
                        to={`/friend${currentChatRoom?._id ? "/" + currentChatRoom?._id : ""}`}
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
                        to={`/addfriend${currentChatRoom?._id ? "/" + currentChatRoom?._id : ""}`}
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

export default ListBar;