import classes from "./Content.module.css"

const Content = ({content}) => {
    return (
        <div className={classes.ContentBackground}>
            {content}
        </div>
    )
}

export default Content;