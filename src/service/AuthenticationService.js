import axios from 'axios'

const API_URL = 'http://localhost:8091/user'

export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'

class AuthenticationService {

    executeBasicAuthenticationService(userName, password) {
        return axios.get(`${API_URL}/basicauth`,
            {headers: {authorization: this.createBasicAuthToken(userName, password)}})
    }

    executeJwtAuthenticationService(userName, password) {
        console.log(userName);
        return axios.post(`${API_URL}/login`, {
            userName,
            password
        })
    }

    createBasicAuthToken(firstName, email, password) {
        // return 'Basic ' + window.btoa(userName + ":" + password)
        const role = 'PARTNER'
        const userName = 'abc'
        return axios.post(`${API_URL}/register`, {
            firstName,
            email,
            password,
            role,
            userName
        })
    }

    registerSuccessfulLogin(name, email, password) {
        //let basicAuthHeader = 'Basic ' +  window.btoa(userName + ":" + password)
        //console.log('registerSuccessfulLogin')

        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, email)
        this.setupAxiosInterceptors(this.createBasicAuthToken(name, email, password))
    }

    registerSuccessfulLoginForJwt(userName, token) {
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, userName)
        this.setupAxiosInterceptors(this.createJWTToken(token))
    }

    createJWTToken(token) {
        return 'Bearer ' + token
    }


    logout() {
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if (user === null) return false
        return true
    }

    getLoggedInuserName() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if (user === null) return ''
        return user
    }

    setupAxiosInterceptors(token) {
        axios.interceptors.request.use(
            (config) => {
                if (this.isUserLoggedIn()) {
                    config.headers.authorization = token
                }
                return config
            }
        )
    }
}

export default new AuthenticationService()