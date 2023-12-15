import classes from "./Message.module.css"
import {Text} from 'react-native'
const Message = ({data}) => {
    return (
        <div className={classes.Message}>
            <a href={data.username} style={{fontWeight: "bold", textDecoration: "none", color: "black"}}>
                {data.name}
            </a>
            <Text style={{float: "right", color: "#818C99", paddingRight: "10px"}}>
                {data.sentAt}
            </Text>
            <div style={{height:5}}></div>
            <Text>
                {data.message}
            </Text>
        </div>
    )
}

export default Message