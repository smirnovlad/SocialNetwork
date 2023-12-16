import {useEffect, useState} from "react"
import classes from "./UserList.module.css"
import {Text} from 'react-native'
import {fetchAllUsersInfo, fetchUserListInfo} from "../../../api/userInfo"
import store from '../../../store/store'
import {useDispatch} from "react-redux"
import {Link} from 'react-router-dom'

const UserList = (type) => {
    const dispatch = useDispatch()
    const [searchRequest, setSearchRequest] = useState("")
    const [usersInfo, setUsersInfo] = useState([])
    const [title, setTitle] = useState("")

    useEffect(() => {
        setTitle(type.type === "friends" ? "Friends" : "All users")
        setUsersInfo([])
        async function getUsersInfo() {
            let data = [];
            if (type.type === "friends") {
                let authorizedIUserInfo = store.getState().authorizedUserInfo;
                data = await fetchUserListInfo(authorizedIUserInfo.friends);
                setUsersInfo(data)
            } else {
                dispatch(fetchAllUsersInfo())
                    .unwrap()
                    .then((promiseResult) => {
                        data = promiseResult;
                        setUsersInfo(data);
                    }).catch((rejectedValueOrSerializedError) => {
                    console.log(rejectedValueOrSerializedError);
                })
            }
        }

        getUsersInfo()
    }, [dispatch, type])
    usersInfo.sort((x, y) => x.name < y.name ? -1 : 1);

    let filtered = usersInfo.filter(friend => {
        return String(friend.name.toLowerCase()).includes(searchRequest.toLowerCase()) || String(friend.id).startsWith(searchRequest)
    });

    return (
        <div>
            <div>
                <Text style={{fontSize: 36}}> {title} </Text>
            </div>
            <br/>
            <input onChange={e => setSearchRequest(e.target.value)} placeholder={"Search users"}
                   style={{width: "70%", borderRadius: 10, height: 35, textIndent: 10, fontSize: 24,}}/>
            <div style={{height: 21}}></div>

            <div style={{
                width: "80%",
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
                            filtered.map((friend, index) =>
                                <div key={index}>
                                    <hr style={{width: "100%"}}/>
                                    <div style={{height: 50, paddingLeft: 10}}>
                                        <Link to={`/profile/${friend.id}`} style={{textDecoration: 'none'}}>
                                            <a style={{
                                                fontSize: 24,
                                                fontWeight: "bold",
                                                color: "#2A5885",
                                                position: "relative",
                                                top: "25%"
                                            }}>
                                                {friend.name}
                                            </a>
                                        </Link>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserList