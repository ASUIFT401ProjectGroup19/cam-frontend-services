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
import FeedAll from "./Feed/FeedAll";

function AppRouter() {
    let location = useLocation();
    let navigate = useNavigate();
    let loc = location.pathname.toString()
    const [session, setSession] = React.useState('')
    const setSessionState = (session) => {
        localStorage.setItem("token", session)
        setSession(session)
    }
    console.log(getAuthToken())

    React.useEffect(async () => {
        if (location.pathname.toString() !== "") {
            if (await isTokenValid()===false) {
                if (location.pathname.toString() !== "/" && location.pathname.toString() !== "") {

                    logout()
                }
            } else {
                console.log('logged in')
                setSession(getAuthToken)
            }
        }
    }, [location.pathname])

    function logout() {
        setSession('')
        localStorage.removeItem('token')
        navigate("/")
    }
    return (
        <Routes>
            {session !== '' &&
            <Route path="" element={<Feed/>}/>
            }
            {session !== '' &&
            <Route path="/profile/:userId" element={<Profile/>}/>
            }
            {session !== '' &&
            <Route path="/profile/" element={<Profile/>}/>
            }
            {session !== '' &&
            <Route path="/share" element={<Share/>}/>
            }
            {session !== '' &&
            <Route path="/post/:postId" element={<ViewPost/>}/>
            }
            {session !== '' &&
            <Route path="/all/" element={<FeedAll/>}/>
            }
            {session === '' &&
            <Route path="" element={<Home setSession={setSessionState}/>}/>
            }
        </Routes>

    );
}

export default AppRouter;
