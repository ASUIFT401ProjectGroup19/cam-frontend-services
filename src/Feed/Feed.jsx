import React from "react";
import Header from "../Feed/Header";
import CssBaseline from "@mui/material/CssBaseline";
import Post from "../Post/Post";
import "./Arrow.scss"


export default function Feed() {
    let comments1 = [{user: "alex", comment: "love it!"},{user: "alex", comment: "love it!"},{user: "alex", comment: "love it!"},{user: "alex", comment: "love it!"},{user: "alex", comment: "love it!"},{user: "alex", comment: "love it!"},{user: "alex", comment: "love it!"},{user: "alex", comment: "love it!"},{user: "alex", comment: "love it!"},{user: "alex", comment: "love it!"},{user: "alex", comment: "love it!"}, {user: "dan", comment: "neat colors and contrast"}, {
        user: "kevin",
        comment: "I'm the guy that makes really long comments that breaks the formatting because everything else was tested with short comments"
    }]
    let comments2 = [{user: "alex", comment: "neat!"}]

    let user = "Tree Photographer"
    let media = [{link:"https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"}, {link:"https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"}]
    let postId = 1;
    let description = "This is my first post"
    let postContent1 = {user:user, media:media, postId:postId, description:description}

    let postContent2 = {
        user:user,
        media: [{link: "https://images.pexels.com/photos/1632790/pexels-photo-1632790.jpeg"}],
        description:description,
        postId: 2
    }
    let post1 = {postContent: postContent1, comments: comments1}
    let post2 = {postContent: postContent2, comments: comments2}
    let posts = [post1, post2];

    let [currentPost, setCurrentPost] = React.useState(0);

    function handleNextPost() {
        if (currentPost === posts.length - 1) {
            setCurrentPost(0)
        } else
            setCurrentPost(currentPost + 1)
    }

    const handleKeyPress = (event) => {
        if(event.keyCode === '40'){
            console.log('enter press here! ')
        }
    }

    return (
        <div className='bg-light'onKeyDown={handleKeyPress}>

            <CssBaseline/>
            <Header/>
            <Post post={posts[currentPost]}/>
            <div style={{width:'100%',height:'20%'}} onClick={handleNextPost}>
            <div className="arrow" onClick={handleNextPost} onKeyDown={handleKeyPress} >
                <span onClick={handleNextPost}/>
                <span onClick={handleNextPost}/>
                <span onClick={handleNextPost}> </span>

            </div>
            </div>
        </div>
    )
}