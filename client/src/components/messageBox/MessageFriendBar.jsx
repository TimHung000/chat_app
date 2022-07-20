import "./messageFriendBar.css"
import MoreVertIcon from '@mui/icons-material/MoreVert';


const MessageFriendBar = () => {
    return (
        <div className="currentMessageBoxFriendBar">
            <div className="currentFriend">
                <img src="/assets/person/noAvatar.png" alt="" />
                <div className="name">Test</div>
            </div>
            <MoreVertIcon
                sx=
                {{
                    color: "var(--main-color)",
                    "&:hover":
                    {
                        color: "var(--main-color-dark)"
                    }
                }}
            />
        </div>
    )
}

export default MessageFriendBar;