import axios from '../utils/axiosCustomize'


export const postCreateNewUser =(email, password, userName, role, imgUrl) => {
  let data = {
    email: email,
    password: password,
    userName: userName,
    role: role,
    userImageURL: `${imgUrl}`
  }
  return axios.post('users.json', data)
}


export const getAllUser = () => {
  return axios.get('users.json')
}


export const patchUpdateUser = (userName, role, imgUrl, userID) => {
  let data = {
    userName: userName,
    role: role,
    userImageURL: `${imgUrl}`
  }
  return axios.patch(`users/${userID}.json`, data)
}

export const deleteUser = (userID) => {
  return axios.delete(`users/${userID}.json`)
}



