import classes from "./Message.module.css"
import {Text} from 'react-native'
import {Link} from 'react-router-dom'

const Message = ({data}) => {
    return (
        <div className={classes.Message}>
            <Link to={`/profile/${data.sender}`} style={{ textDecoration: 'none' }}>
                <a style={{fontWeight: "bold", color: "black"}}>
                    {data.name}
                </a>
            </Link>
            <Text style={{float: "right", color: "#818C99", paddingRight: "10px"}}>
                {data.timestamp}
            </Text>
            <div style={{height:5}}></div>
            <Text>
                {data.message}
            </Text>
        </div>
    )
}

export default Message