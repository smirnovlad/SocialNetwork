import classes from "./Message.module.css"
import {Text} from 'react-native'
import {Link} from 'react-router-dom'

function ConditionalLink({ children, condition, ...props }) {
    return !!condition && props.to ? <Link {...props}>{children}</Link> : <>{children}</>
}

function formatTimestamp(timestamp) {
    const date = new Date(timestamp);

    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const hours = date.getHours();
    const minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();

    const formattedTimestamp = `${day} ${month}, ${hours}:${minutes}`;

    return formattedTimestamp;
}

const Message = ({type, data}) => {
    return (
        <div className={classes.Message}>
            <ConditionalLink to={`/profile/${data.sender}`} condition={type==="feedback"} style={{textDecoration: "none"}}>
                <a style={{ fontWeight: "bold", color: "black" }}>
                    {data.name}
                </a>
            </ConditionalLink>
            <Text style={{float: "right", color: "#818C99", paddingRight: "10px"}}>
                {formatTimestamp(data.timestamp)}
            </Text>
            <div style={{height:5}}></div>
            <Text>
                {data.text}
            </Text>
        </div>
    )
}

export default Message