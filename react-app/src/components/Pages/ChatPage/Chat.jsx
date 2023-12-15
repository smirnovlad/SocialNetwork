import classes from "./Chat.module.css"
import DefaultButton from "../../Button/DefaultButton"
import Message from "../../Message/Message"

const Chat = ({data}, props) => {

    const messages = [
        {name: "Nikolay", username: "tasticolly", message: "Go to the gym", sentAt: "8:51 pm"},
        {name: "Nikolay", username: "tasticolly", message: "Go to the gym", sentAt: "8:51 pm"},
        {name: "Nikolay", username: "tasticolly", message: "Go to the gym", sentAt: "8:51 pm"},
        {name: "Nikolay", username: "tasticolly", message: "Go to the gym", sentAt: "8:51 pm"},
        {name: "Nikolay", username: "tasticolly", message: "Go to the gym", sentAt: "8:51 pm"},
        {name: "Nikolay", username: "tasticolly", message: "Go to the gym", sentAt: "8:51 pm"},
        {name: "Nikolay", username: "tasticolly", message: "Go to the gym", sentAt: "8:51 pm"},
        {name: "Nikolay", username: "tasticolly", message: "Go to the gym", sentAt: "8:51 pm"},
        {name: "Nikolay", username: "tasticolly", message: "Go to the gym", sentAt: "8:51 pm"},
        {name: "Nikolay", username: "tasticolly", message: "Go to the gym", sentAt: "8:51 pm"},
    ]

    return (
        <div className={classes.Chat}>
            <a href={""} style={{textDecoration: "none", color: "#818C99", position: "absolute", left: 25}}>
                <text style={{fontSize: 24}}>
                    Go back
                </text>
            </a>
            <text style={{fontWeight: "bold", fontSize: 24, position: "relative"}}> {data.name} </text>

            <div style={{height: 20}}></div>
            <div style={{width: "92.5%", height: "70%", position: "absolute", borderStyle: "solid", borderWidth: 1, borderRadius: 25, overflow: "hidden"}}>
                <div style={{borderRadius: 25, position: "absolute"}} className={classes.CustomizedScrollbar} >
                    <div style={{width: "100%", position: "absolute"}}>
                        {
                        messages.map((message, index) =>
                        <div key={index} style={{textAlign: "left", paddingLeft: 15, paddingRight: 5, height: 50}}>
                            <Message data={message}/>
                        </div>
                        )
                        }
                    </div>
                </div>
            </div>

            <div style={{display: "flex", width: "92.5%", position: "absolute", bottom: 20}}>
                <input placeholder={"Write a message..."} style={{width: "100%", height: 35, float: "left", borderRadius: 10, textIndent: 10, fontSize: 24}}/>
                <div style={{width: "2%"}}></div>
                <DefaultButton handler={props.handler} text={"Send"} style={{width: 100, height: 35, float: "right", backgroundColor: "#447BBA", color: "white"}}/>
            </div>
        </div>
    )
}

export default Chat