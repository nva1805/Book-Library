import {
    LOGIN_ACTION,
    LOGIN_GG_ACTION,
    ADD_TO_MYBOOK_ACTION,
    REMOVE_FROM_MYBOOK_ACTION,
    CURRENT_API_URL
    }
    from "./types";


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

export const AddToMyBookAction = (payload) => {
    return {
        type: ADD_TO_MYBOOK_ACTION,
        payload: payload
    }
}

export const RemoveFromMyBookAction = (payload) => {
    return {
        type: REMOVE_FROM_MYBOOK_ACTION,
        payload: payload
    }
}

export const setCurrentApiUrl = (payload) => {
  return {
    type: CURRENT_API_URL,
    payload: payload,
  };
};
