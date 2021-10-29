import logo from './logo.svg';
import './App.css';
import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import Signup from "./pages/Signup";
import Home from "./pages/Home";

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/signup">
                    <Signup/>
                </Route>
                <Route path="/">
                    <Home/>
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
