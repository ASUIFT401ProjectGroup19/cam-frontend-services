import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {getAuthToken} from "../Util/Util";
import {useParams} from "react-router-dom";


export default function ProfileSideBar(props) {
    const [subscribed, setSubscribed] = React.useState(false)
    const [postCount, setPostCount] = React.useState(0)
    const profileId = props.userId;
    const userName = props.userName;
    React.useEffect(async () => {
        let count = await countPosts()
        setPostCount(parseInt(count))
    }, [props])
    const countPosts = async () => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'text',
                'Authorization': getAuthToken()
            }
        };
        let response = await fetch(`http://localhost:11000/gallery/v1?page=1&batchSize=188880&userId=${profileId}`, requestOptions)
        let posts = await response.json()
        console.log( posts)
        if (posts.posts.length === undefined) return 0
        else return posts.posts.length
    }


    const handleSubscribe = async () => {

        const url = `http://localhost:11000/subscription/v1/follow/${profileId}`;

        const auth = getAuthToken()
        console.log("token for posting is: " + auth)
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'text',
                'Authorization': auth
            },
        };
        //11001 DEBUG PORT
        let response = await fetch(url, requestOptions)
        setSubscribed(!subscribed);
        return response.json()
    }


    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
            spacing={3} sx={{marginLeft: '15px'}}>
            <Grid item xs={3}/>
            <Grid item xs={1}>
            </Grid>
            <Grid item xs={1}>
                {subscribed &&
                <Button onClick={handleSubscribe}>Unfollow {userName}</Button>}
                {!subscribed &&
                <Button onClick={handleSubscribe}>Follow {userName}</Button>}
            </Grid>
            <Grid item xs={1}>
                <Typography>Posts: {postCount} </Typography>
            </Grid>
        </Grid>
    )
}