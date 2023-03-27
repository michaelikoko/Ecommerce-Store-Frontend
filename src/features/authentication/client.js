import axios from "axios"
import createAuthRefreshInterceptor from 'axios-auth-refresh';

const url = process.env.REACT_APP_API_URL
function getAccessToken()
{
    if (localStorage.getItem("tokens"))
    {
        const accessToken = JSON.parse(localStorage.getItem("tokens")).accessToken
        return accessToken
    }
    return ""
}

function getRefreshToken()
{
    if (localStorage.getItem("tokens"))
    {
        const refreshToken = JSON.parse(localStorage.getItem("tokens")).refreshToken
        return refreshToken
    }
    return ""
}


const client = axios.create({
    baseURL: `${url}/api/`,
    timeout: 10000,
    headers: {
        "Authorization": `Bearer ${getAccessToken()}`,
        "Content-Type": "application/json",
        "accept": "application/json"
    }
})


const refreshAuthLogic = failedRequest => axios.post(`${url}/api/token/refresh/`, {"refresh": getRefreshToken()}).then(response => {
    const tokens = {
        "accessToken": response.data.access,
        "refreshToken": response.data.refresh
    }
    localStorage.setItem("tokens", JSON.stringify(tokens))
    console.log("refreshing tokens", response)
    failedRequest.response.config.headers['Authorization'] = 'Bearer ' + getAccessToken();
    return Promise.resolve();
});

createAuthRefreshInterceptor(client, refreshAuthLogic)

export default client