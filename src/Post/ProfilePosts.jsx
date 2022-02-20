import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import {Card, CardActionArea, CardMedia, Typography} from "@mui/material";

export default function ProfilePosts(){

    let images = ["https://image.shutterstock.com/image-vector/check-back-soon-hand-lettering-600w-1379832464.jpg","https://cdn.pixabay.com/photo/2015/07/09/22/45/tree-838667__340.jpg","https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832__340.jpg","https://cdn.pixabay.com/photo/2014/12/22/00/07/tree-576847__340.png","https://cdn.pixabay.com/photo/2018/04/28/22/03/tree-3358468__340.jpg"]
    return (
        <div>
            <Grid container spacing={2}>
                {images.map(function (image, i) {
                    return (
                        <Grid item xs={4} key={i}>
                            <Box>
                                <Card>
                                   <CardActionArea>
                                           <CardMedia
                                               component="img"
                                               height="140"
                                               image={image}
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