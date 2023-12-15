import Message from "../../Message/Message"
import classes from "./Messages.module.css"
import messageClasses from "../../Message/Message.module.css"
import {Text} from 'react-native'

const Messages = () => {
    const chats = [
        {name: "Nikolay Krekhov", username: "tasticolly", message: "Go v uzbechku!", sentAt: "8:51 pm"},
        {name: "Alexander Ivanov", username: "AlexKrut", message: "Go v kompi!", sentAt: "7:46 am"},
        {name: "Alexander Vakhlov", username: "hxzwww", message: "Ez hakaton", sentAt: "1:24 pm"},
        {name: "Pasha Isachenko", username: "Pablo", message: "Swim swim swim...", sentAt: "8:30 am"},
        {name: "Vova Slastin", username: "Vovjkee", message: "Dobroe utro!", sentAt: "12:00 am"},
        {name: "Nikolay Krekhov", username: "tasticolly", message: "Go v uzbechku!", sentAt: "8:51 pm"},
        {name: "Alexander Ivanov", username: "AlexKrut", message: "Go v kompi!", sentAt: "7:46 am"},
        {name: "Alexander Vakhlov", username: "hxzwww", message: "Ez hakaton", sentAt: "1:24 pm"},
        {name: "Pasha Isachenko", username: "Pablo", message: "Swim swim swim...", sentAt: "8:30 am"},
        {name: "Vova Slastin", username: "Vovjkee", message: "Dobroe utro!", sentAt: "12:00 am"},
    ]

    return (
        <div>
            <div>
                <Text style={{fontSize: 36}}> Messages </Text>
            </div>
            <br/>
            <input placeholder={"Search chats"} style={{width: "70%", borderRadius: 10, height: 35, textIndent: 10, fontSize: 24,}}/>
            <div style={{height: 21}}></div>
            <div style={{width: "92.5%", height: "70%", position: "absolute", borderStyle: "solid", borderWidth: 1, borderRadius: 25, overflow: "hidden"}}>
                <div style={{borderRadius: 25, position: "absolute"}} className={classes.CustomizedScrollbar}>
                    <div style={{width: "100%", position: "absolute"}}>
                        {
                        chats.map((chat, index) =>
                            <div key={index}>
                                <hr style={{width: "100%"}}/>
                                <a href={chat.username} style={{textDecoration: "none", color: "black"}}>
                                    <div className={messageClasses.ClickableMessage} >
                                        <Message data={chat}/>
                                    </div>
                                </a>
                            </div>
                        )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Messages