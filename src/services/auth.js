import api from "../api/axios";

/* =========================
   AUTH
========================= */

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

/* =========================
   PRODUCTS
========================= */

export const getProducts = async (params = {}) => {
  const res = await api.get("/api/products", {
    params,
  });
  return res.data;
};

export const deleteProductById = async (id) => {
  const res = await api.delete(
    `/api/products/${id}`
  );
  return res.data;
};

/* =========================
   CATEGORY
========================= */

export const getCategories = async () => {
  return await api.get("/api/categories");
};

export const addCategory = async (data) => {
  return await api.post(
    "/api/categories",
    data
  );
};

export const deleteCategory = async (id) => {
  return await api.delete(
    `/api/categories/${id}`
  );
};

/* =========================
   SUB CATEGORY
========================= */

export const getSubCategories =
  async () => {
    return await api.get(
      "/api/subcategories"
    );
  };

export const addSubCategory =
  async (data) => {
    return await api.post(
      "/api/subcategories",
      data
    );
  };

export const deleteSubCategory =
  async (id) => {
    return await api.delete(
      `/api/subcategories/${id}`
    );
  };

  /* =========================
   UNITS
========================= */

export const getUnits = async () => {
  return await api.get("/api/units");
};

export const addUnit = async (data) => {
  return await api.post("/api/units", data);
};
export const getSuppliers = async () => {
  return await api.get("/api/suppliers");
};
export const addSupplier = async (data) => {
  return await api.post("/api/suppliers", data);
};







//warehouse
export const getWarehouses = async () => {
  const res = await api.get("/api/warehouses");
  return res.data;
};

export const createWarehouse = async (data) => {
  const res = await api.post("/api/warehouses", data);
  return res.data;
};

export const updateWarehouse = async (id, data) => {
  const res = await api.put(`/api/warehouses/${id}`, data);
  return res.data;
};

export const deleteWarehouse = async (id) => {
  const res = await api.delete(`/api/warehouses/${id}`);
  return res.data;
};