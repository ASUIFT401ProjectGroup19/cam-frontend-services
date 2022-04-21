import React, {useRef} from "react";
import SignUp from "./SignUp";
import SigninHero from "./SigninHero";
import Header from "./Header"
import Info from "./Info";
import Footer from "./Footer";

function Home(props) {
    const setSession = props.setSession;

    const myRef = useRef(null);

    const executeScroll = () => myRef.current.scrollIntoView()

    return(
        <div >
            <Header executeScroll={executeScroll}/>
            <SigninHero setSession={setSession}/>
            <Info/>
            <div ref={myRef}></div>
            <SignUp/>
            <Footer/>
        </div>
    )

}


export default Home;