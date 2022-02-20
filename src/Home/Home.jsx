import React from "react";
import SignUp from "./SignUp";
import SigninHero from "./SigninHero";
import Header from "./Header"
import Info from "./Info";
import Footer from "./Footer";

function Home(props) {
    const setSession = props.setSession;

    return(
        <div >
            <Header/>
            <SigninHero setSession={setSession}/>
            <Info/>
            <SignUp/>
            <Footer/>
        </div>
    )

}


export default Home;