import axios from '../utils/axiosCustomize'


export const postCreateNewUser =(email, password, userName, role, imgUrl) => {
  let data = {
    email: email,
    password: password,
    userName: userName,
    role: role,
    userImageURL: `${imgUrl}`
  }
  return axios.post('Participants/users.json', data)
}


export const getAllUser = () => {
  return axios.get('Participants/users.json')
}


export const patchUpdateUser = (userName, role, imgUrl, userID) => {
  let data = {
    userName: userName,
    role: role,
    userImageURL: `${imgUrl}`
  }
  return axios.patch(`Participants/users/${userID}.json`, data)
}

export const deleteUser = (userID) => {
  return axios.delete(`Participants/users/${userID}.json`)
}

// product

export const getNovel = () => {
  return axios.get('Book/Novel.json')
}

export const postNovel =(title, productImageURL) => {
  let data = {
    title: title,
    userImageURL: `${productImageURL}`
  }
  return axios.post('Book/Novel.json', data)
}

