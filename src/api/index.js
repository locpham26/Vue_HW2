import axios from "axios";

const userService = axios.create({
  baseURL: "http://localhost:8081/users",
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

export const findAllUsers = () => {
  return userService.get("/findAll");
};

export const findOneUser = (userId) => {
  return userService.get(`/findOne/${userId}`);
};

export const saveUser = (payload) => {
  return userService.post("/", payload);
};

export const updateUser = (payload) => {
  return userService.put("/", payload);
};

export const deleteUser = (userId) => {
  return userService.delete(`/delete/${userId}`);
};
