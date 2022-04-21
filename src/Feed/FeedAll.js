import React from "react";
import Header from "../Feed/Header";
import CssBaseline from "@mui/material/CssBaseline";
import Post from "../Post/Post";
import "./Arrow.scss"
import {getAuthToken} from "../Util/Util";
import {useLocation} from "react-router-dom";


export default function FeedAll() {
    const auth = getAuthToken();

    let location = useLocation();

    const [posts, setPosts] = React.useState([])

    React.useEffect(async () => {
        let currentPosts = await getPosts()
        setPosts(currentPosts)

    }, [])


    async function getPosts() {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'text',
                'Authorization': auth
            }
        };
         let response = await fetch(`http://localhost:11000/feed/v1/all?page=1&batchSize=3253307`, requestOptions)


        return response.json()
    }

    let [postIndex, setPostIndex] = React.useState(0);
    let [displayPost, setDisplayPost] = React.useState();

    //Change the displayed post when either list of posts changes or index changes
    React.useEffect(async () => {
        setDisplayPost(posts.posts[postIndex])
    }, [posts,postIndex])


    let postContent = {
        user: '',
        description: "",
        media: [],
        userId: 0,
        comments: []
    }
    const [post, setPost] = React.useState({postContent: postContent});

    async function getComments(id) {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Authorization': getAuthToken()
            }
        };

        let response = await fetch(`http://localhost:11000/post/v1/read/${id}`, requestOptions)
        const res = await response.json();
        const comments = res.post.comments;
        return comments;
    }

    React.useEffect(async () => {
        if (typeof (displayPost) !== "undefined") {
            let media = displayPost.media;
            let description = displayPost.description;
            let comments = await getComments(displayPost.id);
            let userName = displayPost.userName;


            setPost({
                ...post,
                postContent: {
                    ...post.postContent,
                    media: media,
                    description: description,
                    comments: comments,
                    postId: displayPost.id,
                    userName:displayPost.userName
                }
            })
        }
    }, [displayPost])

    function handleNextPost() {
        if (postIndex === posts.length - 1) {
            setPostIndex(0)
        } else
            setPostIndex(postIndex + 1)
    }

    const handleKeyPress = (event) => {
        if (event.keyCode === '40') {
            console.log('enter press here! ')
        }
    }

    return (
        <div className='bg-light' onKeyDown={handleKeyPress}>

            <CssBaseline/>
            <Header/>
            {post.userId !== 0 &&

            <Post post={post}/>
            }
            <div style={{width: '100%', height: '20%'}} onClick={handleNextPost}>
                <div className="arrow" onClick={handleNextPost} onKeyDown={handleKeyPress}>
                    <span onClick={handleNextPost}/>
                    <span onClick={handleNextPost}/>
                    <span onClick={handleNextPost}> </span>

                </div>
            </div>
        </div>
    )
}