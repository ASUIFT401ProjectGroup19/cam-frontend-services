import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import {CardMedia, Stack, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import DialogActions from "@mui/material/DialogActions";
import * as React from "react";
import {getAuthToken} from "../Util/Util";
import {useRef} from "react";
import Typography from "@mui/material/Typography";
import {Cancel} from "@mui/icons-material";
import ph from "./ph.jpg";
import {Carousel} from "react-responsive-carousel";
import { useNavigate } from "react-router-dom";


export default function SharePost() {
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const [images, setImages] = React.useState([]);
    const [tags, setTags] = React.useState([])
    const [newUrl, setNewUrl] = React.useState('');
    const [imageEntryOpen, setImageEntryOpen] = React.useState(false);
    const [description, setDescription] = React.useState("")

    const handleImageEntryOpenClick = () => {
        setImageEntryOpen(true);
    };

    const handleImageEntryClose = () => {
        setImageEntryOpen(false);
    };

    const tagRef = useRef();

//HandleSubmit
    const handleOnSubmit = (e) => {
        e.preventDefault();
        setTags([...tags, tagRef.current.value]);
        tagRef.current.value = "";
    };

    const Tags = ({data}) => {
        return (
            <Box
                sx={{
                    background: "#283240",
                    height: "100%",
                    display: "flex",
                    padding: "0.4rem",
                    margin: "0 0.5rem 0 0",
                    justifyContent: "center",
                    alignContent: "center",
                    color: "#ffffff",
                    borderRadius: '5px',
                }}
            >
                <Stack direction='row' gap={1}>
                    <Typography>#{data}</Typography>
                    <Cancel
                        sx={{cursor: "pointer"}}

                    />
                </Stack>
            </Box>
        );
    };


    function DisplayImage(props) {

        if (images.length === 0) {
            return <CardMedia image={ph} component="img" style={{width: '400px', height: '500px'}}/>;
        } else return (
            <div style={{width: '400px', height: '500px'}}>
                <Carousel>

                    {images.map(function (image, i) {
                        return (
                            <div key={i}>
                                <img src={image}/>

                            </div>
                        );
                    })}
                </Carousel>
            </div>
        );
    }

    function handleUrlChange(event) {
        setNewUrl(event.target.value);

    }

    function handleUrlAdd() {
        setImages([...images, newUrl])
        setNewUrl('')
        setImageEntryOpen(false)
    }

    function handleDescriptionChange(event) {
        setDescription(event.target.value)
    }

    async function createPost(post) {
        const auth = getAuthToken()
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'text',
                'Authorization': auth
            },
            body: JSON.stringify(post)
        };
        //11001 DEBUG PORT
        let response = await fetch('http://localhost:11000/post/v1/create', requestOptions)
        return response.json()
    }

    async function submitPost() {
        let newPost = {};
        newPost.post={};
        newPost.post.description = description;
        newPost.post.media = [];
        for (let index in images) {
            newPost.post.media = [...newPost.post.media, {link: images[index]}]
        }
        const postResponse = await createPost(newPost)

        if(postResponse.hasOwnProperty("id")){
            navigate(`/post/${postResponse.id}`)
        }
        else{
            //TODO give clear and concise error
            alert("Error in posting, your session might have expired")
        }
    }
    return (
        <>
            <Dialog
                fullWidth={true}
                maxWidth={"md"}
                open={true}
            >
                <DialogTitle>Create a new post!</DialogTitle>
                <DialogContent>
                    <DialogContentText>

                    </DialogContentText>
                    <Grid container direction="row"
                          justifyContent="center" spacing={2}>
                        <Grid item xs={7}>
                            <Grid container direction="column"
                                  alignItems="center">
                                <Grid item>
                                    <DisplayImage/>
                                </Grid>
                                <Grid item>

                                    <label htmlFor="upload-photo">

                                        <Button color="secondary" variant="contained" component="span"
                                                onClick={handleImageEntryOpenClick}>
                                            Add Image
                                        </Button>
                                    </label>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={4}>

                            <Grid container direction="column"
                                  alignItems="flex-start"
                                  justifyContent="flex-end" spacing={8}>
                                <Grid item xs={5}></Grid>
                                <Grid item>
                                    <TextField
                                        multiline
                                        aria-label="minimum height"
                                        minRows={10}
                                        placeholder="Write your caption here!"
                                        style={{width: '125%'}}
                                        onChange={handleDescriptionChange}
                                    />
                                </Grid>
                                <Grid item>
                                    <Box sx={{flexGrow: 1}}>
                                        <form onSubmit={handleOnSubmit}>
                                            <TextField
                                                inputRef={tagRef}
                                                fullWidth
                                                variant='standard'
                                                size='small'
                                                sx={{margin: "1rem 0"}}
                                                margin='none'
                                                placeholder={tags.length < 5 ? "Enter tags" : ""}
                                                InputProps={{
                                                    startAdornment: (
                                                        <Box sx={{margin: "0 0.2rem 0 0", display: "flex"}}>
                                                            {tags.map((data, index) => {
                                                                return (
                                                                    <Tags data={data} key={index}/>
                                                                );
                                                            })}
                                                        </Box>
                                                    ),
                                                }}
                                            />
                                        </form>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button id="add-btn" variant="contained" onClick={submitPost}>Submit</Button>
                    <Button id="cancel-btn" color="secondary" onClick={() => navigate(-1)}  >Cancel</Button>
                </DialogActions>
            </Dialog>

            {/*//Image Entry Dialogue*/}
            <Dialog open={imageEntryOpen} onClose={handleImageEntryClose}>
                <DialogTitle>Add Image</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To add an image to your post, please enter the image url.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Image Url"
                        type="url"
                        fullWidth
                        variant="standard"
                        value={newUrl}
                        onChange={handleUrlChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleImageEntryClose} id="cancel-btn">Cancel</Button>
                    <Button onClick={handleUrlAdd}>Add</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}