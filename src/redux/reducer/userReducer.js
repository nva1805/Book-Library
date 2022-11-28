import { LOGIN_ACTION, LOGIN_GG_ACTION } from "../action/types";


const INITIAL_STATE = {
    account: {
        access_token: '',
        refresh_token: '',
        userName: '',
        email: '',
        id: ''
    },
    isAuthenticated: false
}



const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN_ACTION:
            console.log(action);
            return {
                ...state, account: {
                    access_token: action?.payload?.user?.accessToken,
                    refresh_token: action.payload?._tokenResponse?.refreshToken,
                    userName: action?.payload?.user?.displayName,
                    email: action.payload?.user?.email
                },
                isAuthenticated: true
            };

            
        case LOGIN_GG_ACTION:
            console.log(action);
            return {
                ...state, account: {
                    access_token: action?.payload?.accessToken,
                    refresh_token: action.payload?._tokenResponse?.refreshToken,
                    userName: action?.payload?.displayName,
                    email: action.payload?.email,
                    id: action.payload?.uid
                },
                isAuthenticated: true
            };
        default:
            return state
    }
}


export default userReducer