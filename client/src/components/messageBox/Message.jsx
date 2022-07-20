import { forwardRef, useEffect } from 'react'
import { format, render, cancel, register } from 'timeago.js';


const Message = forwardRef(({ message }, ref) => {
    // console.log(message)

    return (
        <div className="messageBoxSend" ref={ref}>
            <span className="time">{format(message.time)}</span>
            <div className="message">
                {message.message}
            </div>
        </div>
    );
})

export default Message