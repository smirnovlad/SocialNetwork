import DefaultButton from "../../Button/DefaultButton"
import Message from "../../Message/Message"
import classes from "./Feedback.module.css"
import {Text} from 'react-native'
import {useEffect, useState, useRef} from "react"
import {useDispatch, useSelector} from "react-redux"

import {fetchFeedback, postReview} from "../../../api/feedback"
import {fetchUserListInfo} from "../../../api/userInfo"
import store from '../../../store/store'


const Feedback = (props) => {
    const dispatch = useDispatch();
    const [feedback, setFeedback] = useState([])
    const [review, setReview] = useState("")
    const [socket, setSocket] = useState(null);
    const scrollContainerRef = useRef(null);

    const {id} = useSelector(state => state.authorizedUserInfo)

    useEffect(() => {
        const newSocket = new WebSocket(`ws://localhost:8000/ws/feedback/`);

        newSocket.onopen = () => {
            console.log('WebSocket connection opened');
        };

        newSocket.onmessage = (event) => {
            const review = JSON.parse(event.data).review;
            if (id === review.sender) {
                review.name = "Me"
            }
            setFeedback(feedback => [...feedback, {...review}]);
        };

        newSocket.onclose = () => {
            console.log('WebSocket connection closed');
        };

        setSocket(newSocket);

        dispatch(fetchFeedback()).unwrap()
            .then(async (originalPromiseResult) => {
                let users = originalPromiseResult.map(item => {
                    return item.sender
                });
                let usersInfo = await fetchUserListInfo(users)

                originalPromiseResult = originalPromiseResult.map(
                    ((item, index) => {
                            let info = usersInfo[index];
                            if (info.id == id) {
                                item.name = "Me"
                            } else {
                                item.name = info.name;
                            }
                            return item;
                        }
                    ))
                setFeedback(originalPromiseResult)
            })
            .catch((rejectedValueOrSerializedError) => {
                console.log(rejectedValueOrSerializedError)
            })
    }, [dispatch]);

    useEffect(() => {
        return () => {
            if (socket) {
                socket.close();
            }
        };
    }, [socket]);

    const onSendButtonClicked = async function () {
        try {
            const authorizedUserInfo = store.getState().authorizedUserInfo;
            const token = authorizedUserInfo.token;
            const res = await postReview({token, review})
            setReview("")
        } catch (error) {
        }
    }

    useEffect(() => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
        }
    }, [feedback]);


    return (
        <div style={{textAlign: "center"}}>
            <Text style={{fontSize: 36, position: "relative"}}> Early feedback </Text>

            <div style={{height: 10}}></div>

            <div style={{
                width: "92.5%",
                height: "70%",
                position: "absolute",
                borderStyle: "solid",
                borderWidth: 1,
                borderRadius: 25,
                overflow: "hidden"
            }}>
                <div ref={scrollContainerRef} style={{borderRadius: 25, position: "absolute"}}
                     className={classes.CustomizedScrollbar}>
                    <div style={{width: "100%", position: "absolute"}}>
                        {
                            feedback.map((data, index) =>
                                <div key={index}
                                     style={{textAlign: "left", paddingLeft: 15, paddingRight: 5, height: 50}}>
                                    <Message type="feedback" data={data}/>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>

            {id && <div style={{display: "flex", width: "92.5%", position: "absolute", bottom: 20}}>
                <input value={review} placeholder={"Leave some feedback"} onChange={(e) => {
                    setReview(e.target.value)
                }} style={{width: "100%", height: 35, float: "left", borderRadius: 10, textIndent: 10, fontSize: 24}}/>
                <div style={{width: "2%"}}></div>
                <DefaultButton handler={onSendButtonClicked} text={"Send"} style={{
                    width: 100,
                    height: 35,
                    float: "right",
                    backgroundColor: "#447BBA",
                    color: "white"
                }}/>
            </div>}
        </div>
    )
}

export default Feedback