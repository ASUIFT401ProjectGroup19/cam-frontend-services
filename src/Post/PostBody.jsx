import React from "react";
import "../Feed/Feed-Hero.css"
import {Card, CardContent, CardHeader} from "@mui/material";
import Grid from "@mui/material/Grid";
import {Carousel} from "react-responsive-carousel";
import Box from "@mui/material/Box";

export default function PostBody(props) {
    let post = props.post;
    console.log("in postbody" )
    console.log(post)
    return (
        <div className='hero-container-primary'>
            <Card className='card-half'>
                <CardContent>
                    <Grid
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center">
                        <Grid item xs={1}>

                        </Grid>
                        <Grid item xs={2}>
                            <h4>{post.user}</h4>
                        </Grid>
                        <Grid item xs={6}>
                            <Carousel showStatus={false}>

                                {post.media.map(function (image, i) {
                                    console.log(image.link)
                                    return (
                                        <div key={i}>
                                            <img src={image.link} className="image"/>

                                        </div>
                                    );
                                })}
                            </Carousel>
                        </Grid>
                        <Grid item xs={2}>
                            {post.description}
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </div>
    )
}