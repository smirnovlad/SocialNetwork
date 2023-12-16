import classes from "./Message.module.css"
import {Text} from 'react-native'
import {Link} from 'react-router-dom'

const Message = ({data}) => {
    return (
        <div className={classes.Message}>
            <a style={{ fontWeight: "bold", color: "black" }}>
                {data.name}
            </a>
            <Text style={{float: "right", color: "#818C99", paddingRight: "10px"}}>
                {data.timestamp}
            </Text>
            <div style={{height:5}}></div>
            <Text>
                {data.text}
            </Text>
        </div>
    )
}

export default Message