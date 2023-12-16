import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import WelcomePage from "./components/WelcomePage/WelcomePage"
import MainContent from "./components/MainContent/MainContent"

import Profile from "./components/Pages/ProfilePage/Profile"
import Settings from "./components/Pages/SettingsPage/Settings"
import UserList from "./components/Pages/UserListPage/UserList"
import Messages from "./components/Pages/MessagesPage/Messages"
import Chat from "./components/Pages/ChatPage/Chat"
import Feedback from "./components/Pages/FeedbackPage/Feedback"

import classes from "./styles/App.css"

function App() {
  return (
    <div className={classes.App}>
        <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route path="/login" element={<WelcomePage/>}/>
                    <Route path="/profile/:userid"
                           element={<MainContent content={<Profile/>}/>}
                    />
                    <Route path="/settings" element={<MainContent requiredAuth={true} content={<Settings/>}/>}/>
                    <Route path="/users" element={<MainContent requiredAuth={true} content={<UserList type={"all"} />}/>}/>
                    <Route path="/friends" element={<MainContent requiredAuth={true} content={<UserList type={"friends"} />}/>}/>
                    <Route path="/messages" element={<MainContent requiredAuth={true} content={<Messages/>}/>}/>
                    <Route path="/feedback" element={<MainContent content={<Feedback/>}/>}/>
                    <Route path={"*"} element={<Navigate to="/login" />} />
                </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
