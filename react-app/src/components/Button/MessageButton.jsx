import message_outline from "../../img/message_outline_24.png"
import classes from "./MessageButton.module.css"

const MessageButton = (props) => {

    return (
        <div>
            <button className={classes.MessageButton} style={{...props.style}}>
                <img src={message_outline} alt={"message_outline"} border={0}/>
            </button>
        </div>
    )
}

export default MessageButton