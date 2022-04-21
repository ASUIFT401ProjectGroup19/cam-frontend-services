import React from "react";
import {Card, CardContent, CardHeader} from "@mui/material";
import Grid from "@mui/material/Grid";
import {Carousel} from "react-responsive-carousel";
import Box from "@mui/material/Box";
import {useNavigate} from "react-router-dom";
import {getAuthToken} from "../Util/Util";

export default function PostBody(props) {
    let nav = useNavigate()
    let post = props.post;
    console.log(post)
    let [userId, setUserId] = React.useState(0)
    React.useEffect(async()=>{
        console.log(props.postId)
        let user = await getUserId(props.postId)
        setUserId(user)
    },[props])
    function handleUserNameClick() {
        nav(`/profile/${userId}`)
    }

    async function getUserId(id) {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Authorization': getAuthToken()
            }
        };

        let response = await fetch(`http://localhost:11000/post/v1/read/${id}`, requestOptions)
        const res = await response.json();
        const userId = res.post.userId;
        return userId;
    }
    return (
        <div className='hero-container-primary'>
            <Card className='card-half'>
                <CardContent>
                    <Grid
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center">
                        <Grid item xs={1}>

                        </Grid>
                        <Grid item xs={2}>
                            <h4 onClick={handleUserNameClick}>{post.userName}</h4>
                        </Grid>
                        <Grid item xs={6}>
                            <Carousel showStatus={false}>

                                {post.media.map(function (image, i) {
                                    return (
                                        <div key={i}>
                                            <img src={image.link} className="image"/>

                                        </div>
                                    );
                                })}
                            </Carousel>
                        </Grid>
                        <Grid item xs={2}>
                            {post.description}
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </div>
    )
}