import { LOGIN_ACTION, LOGIN_GG_ACTION } from "./types";


export const LoginAction = (payload) => {
    return {
        type: LOGIN_ACTION,
        payload: payload
    }
}

export const LoginActionGG = (payload) => {
    return {
        type: LOGIN_GG_ACTION,
        payload: payload
    }
}
