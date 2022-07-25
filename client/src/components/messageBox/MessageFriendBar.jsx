import "./messageFriendBar.css"
import MoreVertIcon from '@mui/icons-material/MoreVert';


const MessageFriendBar = ({currentChatRoom}) => {
    return (
        <div className="currentMessageBoxFriendBar">
            <div className="currentFriend">
                <img src={currentChatRoom?.friendPicture === "" ? "/assets/person/noAvatar.png" : currentChatRoom.friendPicture } alt="" />
                <div className="name">{currentChatRoom.friendName}</div>
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