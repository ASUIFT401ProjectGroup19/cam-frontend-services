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

async function refreshToken() {

    const requestOptions = {
        method: 'GET',
        headers: {'Content-Type': 'text',
            'Authorization': getAuthToken()}
    };
    //DEBUG
    let response = await fetch('http://localhost:11000/identity/v1/refresh', requestOptions)
    return response.json()
}
export function getUserIdFromToken(){
    let token = localStorage.getItem("token")
    const user = jwt_decode(token)
    return user.jti
}
export function getUserNameFromToken(){
    let token = localStorage.getItem("token")
    const user = jwt_decode(token)
    return user.sub
}

//Gets the auth token from storage and checks if it has expired
export async function isTokenValid() {
    let token = localStorage.getItem("token")
    if (token !== null) {
        const user = jwt_decode(token)
        const expiryDate  = user.exp*1000
        if (expiryDate < Date.now() ) {
            console.log("login expired logging out")
            console.log(Date.now() )
            console.log(user.exp)
            localStorage.removeItem('token')
            return false;
        }
        else if(expiryDate - Date.now() < 200000) {
            console.log("almost old")
                refreshToken().then((res)=>{
                    console.log(res)
                    localStorage.setItem("token", res.token)
                    console.log("refreshed token")
                    return true
                });
        }
        else {
            console.log("key good")
            return true
        }
    } else {
        console.log("null key")
        return false;
    }

}


export function getAuthToken() {
    return localStorage.getItem("token")
}