import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import WelcomePage from "./components/WelcomePage/WelcomePage"
import MainContent from "./components/MainContent/MainContent"

import Profile from "./components/Pages/ProfilePage/Profile"
import Settings from "./components/Pages/SettingsPage/Settings"
import Friends from "./components/Pages/FriendsPage/Friends"
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
                    <Route path="/profile" element={<MainContent content={<Profile/>}/>}/>
                    <Route path="/settings" element={<MainContent content={<Settings/>}/>}/>
                    <Route path="/friends" element={<MainContent content={<Friends/>}/>}/>
                    <Route path="/messages" element={<MainContent content={<Messages/>}/>}/>
                    <Route path="/feedback" element={<MainContent content={<Feedback/>}/>}/>
                </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
