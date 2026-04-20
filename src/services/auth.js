import api from "../api/axios";

export const logoutUser = async () => {
  await api.get("/sanctum/csrf-cookie");
  return await api.post("/logout");
};

export const getUser = async () => {
  return await api.get("/api/user");
};

export const loginUser = async (data) => {
  await api.get("/sanctum/csrf-cookie");
  return await api.post("/login", data);
};   