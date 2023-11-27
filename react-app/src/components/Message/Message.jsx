import classes from "./Message.module.css"

const Message = ({data}) => {
    return (
        <div className={classes.Message}>
            <a href={data.username} style={{fontWeight: "bold", textDecoration: "none", color: "black"}}>
                {data.name}
            </a>
            <text style={{float: "right", color: "#818C99", paddingRight: "10px"}}>
                {data.sentAt}
            </text>
            <div style={{height: 5}}></div>
            <text>
                {data.message}
            </text>
        </div>
    )
}

export default Message