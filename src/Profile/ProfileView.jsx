import React from "react";
import Grid from "@mui/material/Grid";
import {Card, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import ProfilePosts from "../Post/ProfilePosts";
import Avatar from "@mui/material/Avatar";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ProfileSideBar from "./ProfileSideBar";

export default function ProfileView() {
    let username = "Tree Photographer"

    return (
        <div className="profile-container">
            <Box style={{marginTop: "75px", width: "100%"}}>
                <Grid container>
                    <Grid item xs={3}>
                        <ProfileSideBar/>
                    </Grid>
                    <Grid item xs={8}>
                        <Grid container direction="column">
                            <Grid item xs={3}>
                                <Grid container alignItems='center'>
                                    <Grid item>
                                        <Avatar sx={{ bgcolor:"00b35f",marginLeft: 1,marginRight:1 }}>TP</Avatar>
                                    </Grid>
                                    <Grid item>
                                        <h4>{username}</h4>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={9}>
                                <Card elevation={0} style={{padding:7}}>
                                    <ProfilePosts/>
                                </Card>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={1}/>
                </Grid>
            </Box>
        </div>
    )
}