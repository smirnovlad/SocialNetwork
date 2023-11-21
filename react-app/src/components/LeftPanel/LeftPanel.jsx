import DefaultButton from "../Button/DefaultButton"
import classes from "./LeftPanel.module.css"
import {Link} from 'react-router-dom'

const LeftPanel = (props) => {
    const buttonStyle = {
        width: 200,
        height: 35,
        backgroundColor: "white",
        textAlign: "left",
        textIndent: 26
    }

    const buttons = [
        { text: "My profile", handler: props.onMyProfileClicked, link: "/profile"},
        { text: "Friends", handler: props.onFriendsClicked, link: "/friends"},
        { text: "Messages", handler: props.onMessagesClicked, link: "/messages"},
        { text: "Settings", handler: props.onSettingsClicked, link: "/settings"},
        { text: "Feedback", handler: props.onFeedbackClicked, link: "/feedback"},
        { text: "Log out", handler: props.onLogOutClicked, link: "/login"},
    ]

    return (
        <div className={classes.LeftPanel}>
             { buttons.map((button) =>
                <div>
                    <Link to={button.link}>
                        <DefaultButton
                            handler={button.handler}
                            text={button.text}
                            style={buttonStyle} />
                    </Link>
                </div>) }
        </div>
    )
}

export default LeftPanel