import classes from "./MainContent.module.css"
import LeftPanel from "../LeftPanel/LeftPanel"
import Content from "./Content/Content"
import {useSelector} from "react-redux"
import { Navigate } from "react-router-dom";


const MainContent = ({requiredAuth, content}) => {
    const {id} = useSelector(state => state.authorizedUserInfo)

    if (requiredAuth && !id) {
        return <Navigate to="/login" />
    } else {
        return (
            <div className={classes.MainContent}>
                <LeftPanel/>
                <div style={{width: "5%"}}></div>
                <Content content={content}/>
            </div>
        )
    }
}

export default MainContent;