import React from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";

export default function Header() {

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
                <Grid item xs={1}/>
                <Grid item xs={1}/>
                <Grid item xs={2}><Link to="/share">Share a Moment</Link></Grid>
                <Grid item xs={1}/>
                <Grid item xs={1}/>
                <Grid item xs={1}/>
                <Grid item xs={1}><Link to="/">Feed</Link></Grid>
                <Grid item xs={1}><Link to="/">Log Out</Link></Grid>
            </Grid>
        </div>
    )
}