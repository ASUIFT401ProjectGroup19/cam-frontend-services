import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Header from "../Feed/Header";
import Post from "./Post";
import {useParams} from "react-router-dom";
import {getAuthToken} from "../Util/Util";


export default function ViewPost() {
    let params = useParams();
    const [postData, setPostData] = React.useState();
    let postContent = {
        user: 'f',
        description: "",
        media: [],
        userId: 1,
    }
    const [post, setPost] = React.useState({postContent: postContent, comments: []});


    React.useEffect(() => {
        async function getPost(postId) {
            const auth = getAuthToken()
            console.log("token for posting is: " + auth)
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Authorization': getAuthToken()
                }
            };

            let response = await fetch(`http://localhost:11000/post/v1/read/${postId}`, requestOptions)

            return response.json()
        }

        if (params.postId > 0) {
            getPost(params.postId).then(r => {
                setPostData(r);
            })
        }
    }, [params])

    React.useEffect(() => {
        if (typeof (postData) !== "undefined") {
            let media = postData.post.media;
            let description = postData.post.description;

            setPost({
                ...post,
                postContent: {
                    ...post.postContent,
                    media: media,
                    description: description
                }
            })
        }

    }, [postData])

    return (
        <div>

            <CssBaseline/>
            <Header/>

            {typeof (postData) !== "undefined" &&

            <Post post={post}/>
            }


        </div>
    )
}