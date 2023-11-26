import classes from "./RightColumn.module.css"

const RightColumn = () => {
    const userName = "Vlad Smirnov";
    const login = "smirnovlad";
    const hometown = "Moscow";
    const age = 20;

    const textStyle = {margin: "10%", fontSize: 24};
    const datas = [
        {text: "Login: ", value: login},
        {text: "Hometown: ", value: hometown},
        {text: "Age: ", value: age},
    ]

    return (
        <div className={classes.RightColumn}>
            <h2 style={{marginLeft: "10%"}}> {userName} </h2>
            <hr style={{marginLeft: "10%"}}/>
             { datas.map((data) =>
                <div>
                    <div style={{height: 5}}></div>
                    <text
                        style={textStyle}>
                        {data.text} {data.value}
                    </text>
                </div>) }
        </div>
    )
}

export default RightColumn