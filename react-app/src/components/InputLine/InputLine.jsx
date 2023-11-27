import Text from "../Text/Text"
import Input from "../Input/Input"
import classes from "./InputLine.module.css"

const InputLine = (props) => {
    return (
        <div className={classes.InputLine}>
            <Text text={props.data.text} data={{width: 175, height: 60, fontSize: 24}}/>
            <Input value={props.value} placeholder={props.placeholder} onChange={props.onChange}
                   data={{fontSize: 18, ...props.style}} type={props.data.type}/>
        </div>
    )
}

export default InputLine;