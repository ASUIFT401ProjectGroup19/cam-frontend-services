import React from "react";
import Grid from "@mui/material/Grid";
import {Card, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import ProfilePosts from "../Post/ProfilePosts";
import Avatar from "@mui/material/Avatar";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ProfileSideBar from "./ProfileSideBar";
import {getAuthToken} from "../Util/Util";

export default function ProfileView(props) {
    console.log("user id is " + props.userId)
    const [userName, setUserName] = React.useState("")
    React.useEffect(async () => {
        let username
            username = await getUserNameById()
        setUserName(username)
    }, [])

    const getUserNameById = async () => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'text',
                'Authorization': getAuthToken()
            }
        };
        let response = await fetch(`http://localhost:11000/gallery/v1?page=1&batchSize=1&userId=${props.userId}`, requestOptions)
        let posts = await response.json()
        console.log(posts.posts[0].id)
        response = await fetch(`http://localhost:11000/post/v1/read/${posts.posts[0].id}`, requestOptions)
        posts = await response.json()
        return posts.post.userName
    }

    return (
        <div className="profile-container">
            <Box style={{marginTop: "75px", width: "100%"}}>
                <Grid container>
                    <Grid item xs={3}>
                        <ProfileSideBar userName={userName} userId={props.userId}/>
                    </Grid>
                    <Grid item xs={8}>
                        <Grid container direction="column">
                            <Grid item xs={3}>
                                <Grid container alignItems='center'>
                                    <Grid item>
                                        <Avatar sx={{
                                            bgcolor: "00b35f",
                                            marginLeft: 1,
                                            marginRight: 1
                                        }}>{props.userName.substr(0, 2)}</Avatar>
                                    </Grid>
                                    <Grid item>
                                        <h4>{userName}</h4>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={9}>
                                <Card elevation={0} style={{padding: 7}}>
                                    <ProfilePosts userId={props.userId}/>
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