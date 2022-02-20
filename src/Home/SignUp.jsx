import React from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import {useNavigate} from "react-router-dom";

export default function SignUp() {

    const [emailError, setEmailError] = React.useState('');
    const [passwordError, setPasswordError] = React.useState('');
    const [lastNameError, setLastNameError] = React.useState('');
    const [firstNameError, setFirstNameError] = React.useState('');
    let navigate = useNavigate();


    async function createAccount(request) {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'text'},
            body: JSON.stringify(request)
        };
        //11001 DEBUG PORT
        let response = await fetch('http://localhost:11000/identity/v1/createaccount', requestOptions)
        return response.json()
    }

    const handleSubmit = async (event) => {
        clearErrors()
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get('email')
        const password = data.get('password')
        const firstName = data.get('firstName')
        const lastName = data.get('lastName')
        const request = {};
        request["userName"] = email
        request["password"] = password
        request["firstName"] = firstName
        request["lastName"] = lastName
        console.log(request)

        createAccount(request).then(response => {
            console.log(response)
            if (response.hasOwnProperty("success")) {
                if (response.success === true) {
                    alert("User account " + email + " successfully created!")
                    navigate("/")
                }
            } else {
                setErrors(response.message)
            }
        });


    }

    const clearErrors = () => {
        setLastNameError('');
        setEmailError('');
        setFirstNameError('');
        setPasswordError('');
    }
    const setErrors = (errors) => {
        if (errors.includes('.UserName')) {
            setEmailError('Please enter your email address.')
        }
        if (errors.includes('.Password')) {
            setPasswordError('Password must be at least 1 rune.')
        }
        if (errors.includes('Duplicate entry ')) {
            setEmailError('Email address in use.')
        }
        if (errors.includes('.FirstName')) {
            setFirstNameError('Please enter your first name')
        }
        if (errors.includes('.LastName')) {
            setLastNameError('Please enter your last name.')
        }
    }

    return (
        <div className='hero-container-primary-no-flex'>
            <CssBaseline/>
            <Grid container
                  sx={{
                      marginTop: 8,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'space-evenly',
                  }}
            >
                <Grid item xs={1}/>
                <Grid item xs={5}>
                    <Box sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    >
                        <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                            <LockOutlinedIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign up now!
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="firstName"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        helperText={firstNameError}
                                        error={firstNameError !== ''}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Last Name"
                                        name="lastName"
                                        autoComplete="family-name"
                                        helperText={lastNameError}
                                        error={lastNameError !== ''}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        helperText={emailError}
                                        error={emailError !== ''}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                        helperText={passwordError}
                                        error={passwordError !== ''}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={<Checkbox value="allowExtraEmails" color="primary"/>}
                                        label="I agree to the Terms of Service."
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                                type="submit"
                            >
                                Sign Up
                            </Button>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={1}/>
            </Grid>
        </div>
    )
}