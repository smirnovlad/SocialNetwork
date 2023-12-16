import Message from "../../Message/Message"
import classes from "./Messages.module.css"
import messageClasses from "../../Message/Message.module.css"
import {fetchChatsPreviewInfo} from "../../../api/messages"

import {Text} from 'react-native'
import {Link} from "react-router-dom"
import store from '../../../store/store'
import {useEffect, useState} from "react"

const Messages = () => {
    const [chatsInfo, setChatsInfo] = useState([])

    useEffect(() => {
        async function getChatsInfo() {
            const token = store.getState().authorizedUserInfo.token;
            const userId = store.getState().authorizedUserInfo.id;
            const data = await fetchChatsPreviewInfo({userId, token})
            setChatsInfo([...data])
        }
        getChatsInfo();
    }, []);

    return (
        <div>
            <div>
                <Text style={{fontSize: 36}}> Messages </Text>
            </div>
            <br/>
            <input placeholder={"Search chats"}
                   style={{width: "70%", borderRadius: 10, height: 35, textIndent: 10, fontSize: 24,}}/>
            <div style={{height: 21}}></div>
            <div style={{
                width: "92.5%",
                height: "70%",
                position: "absolute",
                borderStyle: "solid",
                borderWidth: 1,
                borderRadius: 25,
                overflow: "hidden"
            }}>
                <div style={{borderRadius: 25, position: "absolute"}} className={classes.CustomizedScrollbar}>
                    <div style={{width: "100%", position: "absolute"}}>
                        {
                            chatsInfo.map((info, index) =>
                                <div key={index}>
                                    <hr style={{width: "100%"}}/>
                                    <Link to={`/chat/${info.chatId}`} style={{textDecoration: "none"}}>
                                        <a style={{color: "black"}}>
                                            <div className={messageClasses.ClickableMessage}>
                                                <Message data={info.message}/>
                                            </div>
                                        </a>
                                    </Link>
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