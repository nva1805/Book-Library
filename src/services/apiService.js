import AxiosInstance from "../utils/axiosInstance";

export const postCreateNewUser = (email, password, userName, role, imgUrl) => {
  let data = {
    email: email,
    password: password,
    userName: userName,
    role: role,
    userImageURL: `${imgUrl}`,
  };
  return AxiosInstance.post("Participants/users.json", data);
};

export const getAllUser = () => {
  return AxiosInstance.get("Participants/users.json");
};

export const patchUpdateUser = (userName, role, imgUrl, userID) => {
  let data = {
    userName: userName,
    role: role,
    userImageURL: `${imgUrl}`,
  };
  return AxiosInstance.patch(`Participants/users/${userID}.json`, data);
};

export const deleteUser = (userID) => {
  return AxiosInstance.delete(`Participants/users/${userID}.json`);
};

// product

export const getBooks = (apiUrl) => {
  return AxiosInstance.get(apiUrl);
};

export const postNovel = (title, productImageURL) => {
  let data = {
    title: title,
    userImageURL: `${productImageURL}`,
  };
  return AxiosInstance.post("Book/Novel.json", data);
};
