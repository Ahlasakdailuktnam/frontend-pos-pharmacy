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


export const getProducts = async (params = {}) => {
  const response = await api.get("/api/products", { params });
  return response.data;
};

export const deleteProductById = async (id) => {
  const response = await api.delete(`/api/products/${id}`);
  return response.data;
};