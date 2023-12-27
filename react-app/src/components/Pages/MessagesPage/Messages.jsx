import Message from "../../Message/Message"
import classes from "./Messages.module.css"
import messageClasses from "../../Message/Message.module.css"
import {fetchUserMessages} from "../../../api/messages"

import {Text} from 'react-native'
import {Link} from "react-router-dom"
import store from '../../../store/store'
import {useEffect, useState, useRef} from "react"
import { useDispatch } from 'react-redux';

const getFilteredChatsInfo = (searchRequest) => {
    const messagesData = store.getState().messagesData;
    if (searchRequest === "") {
        return getChatsPreviewInfo(messagesData.messagesInfo);
    } else {
        let filtered = messagesData.messagesInfo.filter(messageInfo => {
            return String(messageInfo.message.text.toLowerCase()).includes(searchRequest.toLowerCase());
        });
        return filtered;
    }
}

const getChatsPreviewInfo = function (messagesInfo) {
    let chatsInfo = {};


    for (let messageInfo of messagesInfo) {
        if (messageInfo.chatId in chatsInfo) {
            let currentChatInfo = chatsInfo[messageInfo.chatId];
            if (currentChatInfo.timestamp > messageInfo.message.timestamp) {
                chatsInfo[messageInfo.chatId] = messageInfo;
            }
        } else {
            chatsInfo[messageInfo.chatId] = messageInfo;
        }
    }

    chatsInfo = Object.values(chatsInfo);

    chatsInfo.sort(function(first, second)  {
        return first.message.timestamp < second.message.timestamp ? 1 : -1;
    })

    return chatsInfo
}

const Messages = () => {
    const [chatsInfo, setChatsInfo] = useState([])
    const [searchRequest, setSearchRequest] = useState("")
    const scrollContainerRef = useRef(null);
    const dispatch = useDispatch();

    useEffect(() => {
        async function getChatsInfo() {
            const token = store.getState().authorizedUserInfo.token;
            const userId = store.getState().authorizedUserInfo.id;
            let action = await dispatch(fetchUserMessages({userId, token}));
            let data = getFilteredChatsInfo(searchRequest);
            setChatsInfo([...data]);
        }
        getChatsInfo();
    }, []);

    useEffect(() => {
        const data = getFilteredChatsInfo(searchRequest);
        setChatsInfo([...data]);
    }, [searchRequest]);

   useEffect(() => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
        }
    }, [chatsInfo]);

    return (
        <div>
            <div>
                <Text style={{fontSize: 36}}> Messages </Text>
            </div>
            <br/>
            <input onChange={e => setSearchRequest(e.target.value)}
                   placeholder={"Search chats"}
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
                <div id={scrollContainerRef} style={{borderRadius: 25, position: "absolute"}} className={classes.CustomizedScrollbar}>
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