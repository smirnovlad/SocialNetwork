import React from "react";
import ItemsList from "./components/ItemsList"
import "./styles/App.css"
import {useState} from "react"
import CustomInput from "./components/UI/input/CustomInput"
import CustomButton from "./components/UI/button/CustomButton"
import {BrowserRouter} from "react-router-dom"
import {PageOne, PageTwo} from "./components/UI/pages/CustomPages"
import {Route, Routes} from "react-router"

function App() {

    const [label, setTitle] = useState('')
    const [description, setDescription] = useState('')

        const [data, setData] = useState([
        {id: 1, description: "React is a package", label: 'React'},
        {id: 2, description: "Angular is a framework", label: 'Angular'}
    ])

    const addNewPost = ( event) => {
        event.preventDefault()
        const newData = {
            label, description, id: Date.now()
        }

        setData([...data, newData])
    }



    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="one" element={<PageOne/>}/>
                    <Route path="two" element={<PageTwo/>}/>
                </Routes>
            </BrowserRouter>

            <form>
                <CustomInput
                    onChange={e => setTitle(e.target.value)}
                    value={label}
                    placeholder="Technology name"
                    type="text"
                />
                <CustomInput
                    onChange={e => setDescription(e.target.value)}
                    value={description}
                    placeholder="Technology decription"
                    type="text"
                />
                <CustomButton onClick={addNewPost}> Create record </CustomButton>
            </form>
            <ItemsList data={data} label='JS technologies'/>
        </div>
    );
}

export default App;
