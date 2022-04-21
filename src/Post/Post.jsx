import React from "react";
import Grid from "@mui/material/Grid";
import PostBody from "./PostBody";
import PostComments from "./PostComments";


export default function Post(props) {
    let post = props.post.postContent;
    let comments = props.post.postContent.comments;
    let postId = props.post.postContent.postId;
    console.log("log id is " + postId)

    return (
        <div className='hero-container-primary'>

            <Grid container>
                <Grid item xs={7}>
                    <PostBody post={post} postId = {postId} />
                </Grid>
                <Grid item xs={4}>
                    <PostComments post= {post} comments={comments} postId = {postId}/>
                </Grid>
            </Grid>
        </div>
)
}