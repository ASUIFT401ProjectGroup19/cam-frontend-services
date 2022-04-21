import React from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import {getToken} from "../Util/Util";

export default function SigninHero(props) {
    const setSession = props.setSession;
    let emailError = ''

    const handleSubmit = async (event) => {
        event.preventDefault();
        const request = {}
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get('email');
        const password = data.get('password');

        request["userName"] = email
        request["password"] = password
        let response = await getToken(email, password)

        if (response.hasOwnProperty("token")) {
            setSession(response.token)

        }

    };


    return (
        <div className='hero-container-primary'>
            <Grid container component="main"
                  direction="row"
                  alignItems="center"
                  justifyContent="center">
                <Grid item xs={3}>
                    <h1>
                        Social Media with Privacy you Control.
                    </h1>
                </Grid>
                <Grid item xs={3}>
                    Image here
                </Grid>
                <Grid item xs={3}>
                    <Grid
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center" >
                        <Grid item>
                            <Avatar sx={{m: 1}}>
                                <LockOutlinedIcon/>
                            </Avatar>
                        </Grid>
                        <Grid item>
                            <Typography component="h1" variant="h5">
                                Sign in
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    helperText={emailError}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{mt: 3, mb: 2}}
                                >
                                    Sign In
                                </Button>
                                <Grid container>
                                    <Grid item xs>
                                    </Grid>
                                    <Grid item>
                                        <Link href="/signup" variant="body2">
                                            {"Don't have an account? Sign Up"}
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}