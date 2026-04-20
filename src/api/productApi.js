import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

// GET PRODUCTS
export const getProducts = () => API.get("/product");

// CREATE PRODUCT
export const createProduct = (data) =>
  API.post("/insert", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });