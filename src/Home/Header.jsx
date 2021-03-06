import React from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import {Button} from "@mui/material";

export default function Header(props) {
    const executeScroll = props.executeScroll;
    return (
        <div className="header-non-hero">
            <Grid container alignItems='center'>
                <Grid item xs={3}>
                    <Grid container alignItems='center'>
                        <Grid item>
                            <Avatar sx={{marginLeft: 1,marginRight:1}}>
                                <LockOutlinedIcon/>
                            </Avatar>
                        </Grid>
                        <Grid item>
                            <h4>Capture a Moment</h4>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={1}></Grid>
                <Grid item xs={6}/>
                <Grid item xs={1}><Link to="/">Login</Link></Grid>
                <Grid item xs={1}><Button onClick={executeScroll}> Sign Up</Button></Grid>
            </Grid>
        </div>
    )
}