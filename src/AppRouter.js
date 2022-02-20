import './Sass/App.scss';
import React from "react";
import {
    Routes,
    Route, BrowserRouter, useNavigate
} from "react-router-dom";
import {useLocation} from 'react-router-dom';

import Home from "./Home/Home";
import {getAuthToken, isTokenValid} from "./Util/Util";
import Feed from "./Feed/Feed";
import Profile from "./Profile/Profile";
import Share from "./Share/Share";
import ViewPost from "./Post/ViewPost";

function AppRouter() {
    let location = useLocation();
    let navigate = useNavigate();
    let loc = location.pathname.toString()
    const [session, setSession] = React.useState('')
    const setSessionState = (session) => {
        //console.log('session set' + session)
        localStorage.setItem("token", session)
        setSession(session)
    }

    React.useEffect(() => {

        if (location.pathname.toString() !== "") {
            if (!isTokenValid()) {
                if (location.pathname.toString() !== "/" && location.pathname.toString() !== "") {
                    console.log(location.pathname)
                    logout()
                    console.log(location.pathname.toString())
                }
            } else {
                setSession(getAuthToken)
                console.log('logged in')
            }
        }
    }, [location.pathname])

    function logout() {
        navigate("")
    }
    return (
        <Routes>
            {session !== '' &&
            <Route path="" element={<Feed/>}/>
            }
            {session !== '' &&
            <Route path="/profile" element={<Profile/>}/>
            }
            {session !== '' &&
            <Route path="/share" element={<Share/>}/>
            }
            {session !== '' &&
            <Route path="/post/:postId" element={<ViewPost/>}/>
            }
            {session === '' &&
            <Route path="" element={<Home setSession={setSessionState}/>}/>
            }
        </Routes>

    );
}

export default AppRouter;
