import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Header from "../Profile/Header";
import ProfileView from "./ProfileView";
import {useParams} from "react-router-dom";
import {getUserIdFromToken, getUserNameFromToken} from "../Util/Util";

export default function Profile() {
    let params = useParams();

    function GetProfileView(){
        let userId;
        let userName;
        if (params.userId === undefined) {
            userId = getUserIdFromToken()
            userName = getUserNameFromToken();
        }
        else{
            userId=params.userId
            userName = "  "
        }

        return <ProfileView userName = {userName} userId={userId}/>
    }
    return (

        <div className='bg-light'>
            <CssBaseline/>
            <Header/>
            <GetProfileView/>
        </div>
    )
}