import classes from "./Chat.module.css"
import DefaultButton from "../../Button/DefaultButton"
import Message from "../../Message/Message"
import {fetchChatMessages} from "../../../api/messages"
import {fetchUserInfo} from "../../../api/userInfo"
import {fetchChatInfo} from "../../../api/messages"
import store from '../../../store/store'

import {Text} from 'react-native'
import {useDispatch} from "react-redux"
import {Link, useParams} from "react-router-dom"
import {useEffect, useState} from "react"

const Chat = (props) => {
    const dispatch = useDispatch()
    const [messages, setMessages] = useState([])
    const params = useParams();
    const [secondUser, setSecondUser] = useState({
        id: -1,
        name: "unknown"
    })

    useEffect( () => {
        const getChat = async function () {
            const token = store.getState().authorizedUserInfo.token;
            const chatId = params.chatid;

            const chatInfo = await fetchChatInfo({token, chatId});

            const authorizedUser = store.getState().authorizedUserInfo;
            const secondUserId = chatInfo.firstUser == authorizedUser.id ? chatInfo.secondUser : chatInfo.firstUser;

            const secondUserInfo = await dispatch(fetchUserInfo(secondUserId));
            setSecondUser({
                id: secondUserInfo.payload.id,
                name: secondUserInfo.payload.first_name + " " + secondUserInfo.payload.last_name
            })

            const messagesInfo = await dispatch(fetchChatMessages({token, chatId}))

            let result = messagesInfo.payload
            for (let message of result) {
                message.name = message.id === secondUser.id ? secondUser.name : "Me";
            }
            setMessages(result)
        }
        getChat();
    }, [])

    return (
        <div className={classes.Chat}>
            <Link to={"/messages"} style={{textDecoration: "none"}}>
                <a style={{color: "#818C99", position: "absolute", left: 25}}>
                    <text style={{fontSize: 24}}>
                        Go back
                    </text>
                </a>
            </Link>

            <Link to={`/profile/${secondUser.id}`} style={{textDecoration: "none"}}>
                <Text style={{fontWeight: "bold", fontSize: 24, position: "relative"}}>
                    {secondUser.name}
                </Text>
            </Link>

            <div style={{height: 20}}></div>
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
                            messages.map((message, index) =>
                                <div key={index}
                                     style={{textAlign: "left", paddingLeft: 15, paddingRight: 5, height: 50}}>
                                    <Message data={message}/>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>

            <div style={{display: "flex", width: "92.5%", position: "absolute", bottom: 20}}>
                <input placeholder={"Write a message..."} style={{
                    width: "100%",
                    height: 35,
                    float: "left",
                    borderRadius: 10,
                    textIndent: 10,
                    fontSize: 24
                }}/>
                <div style={{width: "2%"}}></div>
                <DefaultButton handler={props.handler} text={"Send"} style={{
                    width: 100,
                    height: 35,
                    float: "right",
                    backgroundColor: "#447BBA",
                    color: "white"
                }}/>
            </div>
        </div>
    )
}

export default Chat