import React from "react";
import {alpha, Card, CardContent, ListItem, TextField, Typography, List} from "@mui/material";
import Box from "@mui/material/Box";
import styled from "@emotion/styled";
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import {useNavigate} from "react-router-dom";
import {getAuthToken} from "../Util/Util";

export default function PostComments(props) {
    const postId = props.postId
    const nav = useNavigate()
    React.useEffect(() => {
        setComments(props.comments)
        setComment("")
    }, [props])
    let [comments, setComments] = React.useState(props.comments)
    let [comment, setComment] = React.useState("")
    const CommentTextfield = styled((props) => (
        <TextField InputProps={{disableUnderline: true}} {...props} />
    ))(({theme}) => ({
        '& .MuiFilledInput-root': {
            border: '1px solid #2b2b2b',
            overflow: 'hidden',
            borderRadius: 4,
            backgroundColor: '#transparent',
            '&:hover': {
                backgroundColor: 'transparent',
            },
            '&.Mui-focused': {
                backgroundColor: 'transparent',
            },
        },
    }));

    async function createComment() {
        const auth = getAuthToken()
        let newComment = {
            comment: {
                content: comment,
                postId: postId
            }
        }

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': auth
            },
            body: JSON.stringify(newComment)
        }

        console.log(requestOptions)

        let response = await fetch('http://localhost:11000/comment/v1/create', requestOptions)
        console.log(response)
        setComment('')
        return await response.json()
    }

    function handleAddComment() {
        createComment()
        .then(async (res) => {
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Authorization': getAuthToken()
                }
            };

            let response = await fetch(`http://localhost:11000/post/v1/read/${postId}`, requestOptions)
            const resp = await response.json();
            const comments = resp.post.comments;
            setComments(comments)



        })
    }

    function handleCommentInput(event) {
        setComment(event.target.value)
    }

    return (
        <div>
            <div className='hero-container-primary'>
                <Card className='card-2nd-half' elevation={0}>
                    <CardContent>
                        <List sx={{
                            width: '100%',
                            position: 'relative',
                            overflow: 'auto',
                            maxHeight: '50vh',
                            height: '100%',
                        }}>
                            < ListItem>
                                <h3>Comments</h3>
                            </ListItem>
                            <ListItem>
                                <Paper
                                    elevation={0}
                                    component="form"
                                    sx={{
                                        marginBottom: '5px',
                                        borderRadius: '0',
                                        borderBottom: '1px solid',
                                        borderTop: '0px',
                                        borderLeft: '0px',
                                        borderRight: '0px',
                                        p: '2px 4px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        width: 400,
                                        backgroundColor: '#ececec!important'
                                    }}
                                >
                                    <InputBase
                                        sx={{ml: 1, flex: 1, backgroundColor: '#ececec!important'}}
                                        placeholder="Add your comment"
                                        onChange={handleCommentInput}
                                        value={comment}
                                    />
                                    <IconButton onClick={handleAddComment} sx={{p: '10px'}} aria-label="search">
                                        <AddIcon/>
                                    </IconButton>
                                </Paper>
                            </ListItem>


                            {comments.length > 0 && comments.map(function (comment, i) {
                                return (
                                    <ListItem key={i}>
                                        <Box>
                                            <Typography onClick={() => {
                                                nav(`/profile/${comment.userId}`)
                                            }}><b>{comment.userName}</b></Typography>
                                            <Typography>{comment.content}</Typography>
                                        </Box>
                                    </ListItem>
                                );
                            })}
                        </List>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}