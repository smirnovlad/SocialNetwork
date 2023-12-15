import InputLine from "../InputLine/InputLine"
import ButtonsLine from "../ButtonsLine/ButtonsLine"
import classes from "./BaseForm.module.css"

const BaseForm = ({datas, buttons, id}) => {
    return (
        <div className={classes.BaseForm} id={id}>
            { datas.map((data, index) =>
                <div key={index}>
                    <InputLine
                        onChange={e => data.onChange(e.target.value)}
                        value={data.value}
                        data={{text: data.text, type: data.type}} />
                    <div style={{height: 3}}></div>
                </div>) }


            <div style={{height: 7}}></div>

            {/* Width is the same as Input-field width*/}
            <ButtonsLine firstText={buttons.firstText} firstHandler={buttons.firstHandler}
                         secondText={buttons.secondText} secondHandler={buttons.secondHandler}
                         data={{width: 260, float: "right"}}/>
        </div>
    )
}

export default BaseForm