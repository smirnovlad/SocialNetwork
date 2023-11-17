import DefaultButton from "../../Button/DefaultButton"
import Message from "../../Message/Message"
import classes from "./Feedback.module.css"

const Feedback = (props) => {
    const datas = [
        {name: "Milan Kurmaev", username: "themeelanoid", message: "The best social network", sentAt: "4:23 pm"},
        {name: "Milan Kurmaev", username: "themeelanoid", message: "The best social network", sentAt: "4:23 pm"},
        {name: "Milan Kurmaev", username: "themeelanoid", message: "The best social network", sentAt: "4:23 pm"},
        {name: "Milan Kurmaev", username: "themeelanoid", message: "The best social network", sentAt: "4:23 pm"},
        {name: "Milan Kurmaev", username: "themeelanoid", message: "The best social network", sentAt: "4:23 pm"},
        {name: "Milan Kurmaev", username: "themeelanoid", message: "The best social network", sentAt: "4:23 pm"},
        {name: "Milan Kurmaev", username: "themeelanoid", message: "The best social network", sentAt: "4:23 pm"},
        {name: "Milan Kurmaev", username: "themeelanoid", message: "The best social network", sentAt: "4:23 pm"},
        {name: "Milan Kurmaev", username: "themeelanoid", message: "The best social network", sentAt: "4:23 pm"},
        {name: "Milan Kurmaev", username: "themeelanoid", message: "The best social network", sentAt: "4:23 pm"},
        {name: "Milan Kurmaev", username: "themeelanoid", message: "The best social network", sentAt: "4:23 pm"},
        {name: "Milan Kurmaev", username: "themeelanoid", message: "The best social network", sentAt: "4:23 pm"},
    ]

    return (
        <div style={{textAlign: "center"}}>
            <text style={{fontSize: 36, position: "relative"}}> Early feedback </text>

            <div style={{height: 10}}></div>

            <div style={{width: "92.5%", height: "70%", position: "absolute", borderStyle: "solid", borderWidth: 1, borderRadius: 25, overflow: "hidden"}}>
                <div style={{borderRadius: 25, position: "absolute"}} className={classes.CustomizedScrollbar} >
                    <div style={{width: "100%", position: "absolute"}}>
                        {
                        datas.map((feedback) =>
                        <div style={{textAlign: "left", paddingLeft: 15, paddingRight: 5, height: 50}}>
                            <Message data={feedback}/>
                        </div>
                        )
                        }
                    </div>
                </div>
            </div>

            <div style={{display: "flex", width: "92.5%", position: "absolute", bottom: 20}}>
                <input placeholder={"Leave some feedback"} style={{width: "100%", height: 35, float: "left", borderRadius: 10, textIndent: 10, fontSize: 24}}/>
                <div style={{width: "2%"}}></div>
                <DefaultButton handler={props.handler} text={"Send"} style={{width: 100, height: 35, float: "right", backgroundColor: "#447BBA", color: "white"}}/>
            </div>
        </div>
    )
}

export default Feedback