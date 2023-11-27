import classes from "./MainContent.module.css"
import LeftPanel from "../LeftPanel/LeftPanel"
import Content from "./Content/Content"

const MainContent = ({content}) => {
    return (
        <div className={classes.MainContent}>
            <LeftPanel/>
            <div style={{width: "5%"}}></div>
            <Content content={content}/>
        </div>
    )
}

export default MainContent;