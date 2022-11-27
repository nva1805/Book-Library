import { LOGIN_ACTION, LOGOUT_ACTION } from "./types";


export const LoginAction = (payload) => {
    return {
        type: LOGIN_ACTION,
        payload: payload
    }
}

export const LogoutAction = (payload) => {
    return {
        type: LOGOUT_ACTION,
        payload: payload
    }
}