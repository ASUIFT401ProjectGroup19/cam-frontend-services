import React from "react";
import Grid from "@mui/material/Grid";

export default function Footer() {

    return (
        <div className="hero-footer">
            <Grid
                container
                direction="row"
                justifyContent="space-evenly"
                alignItems="center">
                <Grid item xs={1}>
                </Grid>
                <Grid item xs={1}>
                    <h5>Asu Group G</h5>
                </Grid>
                <Grid item xs={7}>

                </Grid>
                <Grid item xs={3}>
                    <h5>Copyright me</h5>
                </Grid>
            </Grid>
        </div>
    )
}