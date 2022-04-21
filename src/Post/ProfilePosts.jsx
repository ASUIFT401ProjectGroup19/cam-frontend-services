import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import {Card, CardActionArea, CardMedia, Typography} from "@mui/material";
import {getAuthToken} from "../Util/Util";
import {useNavigate} from "react-router-dom";

export default function ProfilePosts(props) {
    const navigate = useNavigate();
    const userId = props.userId

    const [images, setImages] = React.useState([])
    React.useEffect(async () => {
        const posts = await getPosts()
        let imageList = []
        for (const post of posts.posts) {
            for (const image of post.media){
                imageList.push(image)
                image.postId = post.id;
            }

        }
        setImages(imageList)
    }, [])

    const auth = getAuthToken()

    async function getPosts() {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'text',
                'Authorization': auth
            }
        };
        //11001 DEBUG PORT
        let response = ''
        if(userId) {
             response = await fetch(`http://localhost:11000/gallery/v1?page=1&batchSize=10&userId=${userId}`, requestOptions)
        }
        else {
             response = await fetch(`http://localhost:11000/gallery/v1?page=1&batchSize=10`, requestOptions)
        }

        return response.json()
    }

    const handleClick = (postId) => {

        navigate(`/post/${postId}`)
    }

    return (
        <div>
            <Grid container spacing={2}>
                {images.length > 0 && images.map(function (image, i) {
                    return (
                        <Grid item xs={4} key={i}>
                            <Box>
                                <Card>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image={image.link}
                                            onClick={handleClick=>(navigate(`/post/${image.postId}`))}
                                        />
                                    </CardActionArea>
                                </Card>
                            </Box>
                        </Grid>
                    )
                        ;
                })}
            </Grid>
        </div>
    )
}