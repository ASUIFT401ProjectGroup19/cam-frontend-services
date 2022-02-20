import React from "react";
import Grid from "@mui/material/Grid";
import PostBody from "./PostBody";
import PostComments from "./PostComments";


export default function Post(props) {
    let post = props.post.postContent;
    let comments = props.post.comments;


    return (
        <div className='hero-container-primary'>

            <Grid container>
                <Grid item xs={7}>
                    <PostBody post={post} />
                </Grid>
                <Grid item xs={4}>
                    <PostComments comments={comments}/>
                </Grid>
            </Grid>
        </div>
)
}