import {useState} from "react"
import classes from "./Friends.module.css"

const Friends = () => {
    const [searchRequest, setSearchRequest] = useState("")

    const friends = [
        {name: "Nikolay Krekhov", username: "tasticolly"},
        {name: "Alexander Ivanov", username: "AlexKrut"},
        {name: "Alexander Vakhlov", username: "hxzwww"},
        {name: "Pasha Isachenko", username: "Pablo"},
        {name: "Vova Slastin", username: "Vovjkee"},
        {name: "Nikolay Krekhov", username: "tasticolly"},
        {name: "Alexander Ivanov", username: "AlexKrut"},
        {name: "Alexander Vakhlov", username: "hxzwww"},
        {name: "Pasha Isachenko", username: "Pablo"},
        {name: "Vova Slastin", username: "Vovjkee"},
    ]

    friends.sort((x, y) => x.name < y.name ? -1 : 1);

    let filtered = friends.filter(friend => {
        return String(friend.name.toLowerCase()).includes(searchRequest.toLowerCase()) ||
            String(friend.username.toLowerCase()).includes(searchRequest.toLowerCase());
    });

    return (
        <div>
            <div>
                <text style={{fontSize: 36}}> Friends</text>
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
                            filtered.map((friend) =>
                                <div>
                                    <hr style={{width: "100%"}}/>
                                    <div style={{height: 50, paddingLeft: 10}}>
                                        <a href={friend.username} style={{
                                            textDecoration: "none",
                                            fontSize: 24,
                                            fontWeight: "bold",
                                            color: "#2A5885",
                                            position: "relative",
                                            top: "25%"
                                        }}> {friend.name} </a>
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

export default Friends