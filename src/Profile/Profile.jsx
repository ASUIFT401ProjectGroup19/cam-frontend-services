import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Header from "../Profile/Header";
import ProfileView from "./ProfileView";

export default function Profile() {


    return (

        <div className='bg-light'>
            <CssBaseline/>
            <Header/>
            <ProfileView/>
        </div>
    )
}