import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";


export default function ProfileSideBar() {
    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
            spacing={3} sx={{marginLeft:'15px'}}>
            <Grid item xs={3}/>
            <Grid item xs={1}>
                <Typography>Posts: 5</Typography>
            </Grid>
            <Grid item xs={1}>
                <Typography>Subscribers: 0</Typography>
            </Grid>
            <Grid item xs={1}>
                <Typography>Subscribe to Tree Photographer</Typography>
            </Grid>
        </Grid>
    )
}