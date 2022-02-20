import jwt_decode from "jwt-decode";


export async function getToken(username, password) {

    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'text'},
        body: JSON.stringify({userName: username, password: password})
    };
    //DEBUG
    let response = await fetch('http://localhost:11000/identity/v1/login', requestOptions)
    return response.json()

}

//Gets the auth token from storage and checks if it has expired
export function isTokenValid() {
    let token = localStorage.getItem("token")
    if (token !== null) {
        const user = jwt_decode(token)
        const expiryDate  =user.exp*1000
        if (expiryDate < Date.now() ) {
            console.log(Date.now() )
            console.log(user.exp)
            localStorage.removeItem('token')
            return false;
        } else
            return true
    } else
        return false;

}


export function getAuthToken() {
    return localStorage.getItem("token")
}