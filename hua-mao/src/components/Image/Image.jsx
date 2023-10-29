import classes from "./Image.module.css"

const Image = (props) => {
    return (
        <div className={classes.Image}>
            <img {...props.data} alt={props.alt}/>
        </div>
    )
}

export default Image