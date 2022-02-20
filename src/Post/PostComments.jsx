import React from "react";
import {alpha, Card, CardContent, ListItem, TextField, Typography,List} from "@mui/material";
import Box from "@mui/material/Box";
import styled from "@emotion/styled";
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

export default function PostComments(props) {
    let comments = props.comments;

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

    return (
        <div>
            <div className='hero-container-primary'>
                <Card className='card-2nd-half' elevation={0}>
                    <CardContent>
                        <List sx={{ width: '100%',
                            position: 'relative',
                            overflow: 'auto',
                            maxHeight:'50vh',
                            height:'100%',
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
                                    />
                                    <IconButton type="submit" sx={{p: '10px'}} aria-label="search">
                                        <AddIcon/>
                                    </IconButton>
                                </Paper>
                            </ListItem>


                            {comments.map(function (comment, i) {
                                return (
                                    <ListItem key={i}>
                                        <Box>
                                            <Typography><b>{comment.user}</b></Typography>
                                            <Typography>{comment.comment}</Typography>
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