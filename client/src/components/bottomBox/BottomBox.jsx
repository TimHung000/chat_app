import "./bottomBox.css"
import ListBar from "../listBar/ListBar";
import MessageBox from "../messageBox/MessageBox";
import NonMessageBox from "../nonMessageBox/NonMessageBox";
import { useState } from "react";


const BottomBox = () => {
    const [currentChatRoom, setCurrentChatRoom] = useState();
    const [ allMessages, setAllMessages ] = useState([]);


    return (
        <div className="bottomBox">
            <div className="bottomLeft">
                <ListBar setCurrentChatRoom={setCurrentChatRoom} currentChatRoom={currentChatRoom} setAllMessages={setAllMessages}/>
            </div>
            <div className="bottomRight">
                {
                    currentChatRoom
                        ? <MessageBox currentChatRoom={currentChatRoom} allMessages={allMessages} setAllMessages={setAllMessages}/>
                        : <NonMessageBox />
                }
            </div>
        </div>
    );
}

export default BottomBox;