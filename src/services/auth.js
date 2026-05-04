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
export const addSupplier = async (data) => {
  return await api.post("/api/suppliers", data);
};
// export const getSuppliers = async () => {
//   return await api.get("/api/suppliers");
// };
// export const searchSuppliers = async (keyword) => {
//   return await api.get("/api/suppliers", {
//     params: { search: keyword }
//   });
// };
export const getSuppliers = async (params = {}) => {
  return await api.get("/api/suppliers", { params });
};
// Add this to your auth.js file

export const getSupplierDashboard = async (year, month) => {
  const res = await api.get("/api/suppliers/dashboard", {
    params: { year, month }
  });
  return res.data;
};


// Add to src/services/auth.js
export const createSale = async (data) => {
  const res = await api.post("/api/sales", data);
  return res.data;
};

export const getSales = async () => {
  const res = await api.get("/api/sales");
  return res.data;
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






export const createPurchase = async (data) => {
  const res = await api.post("/api/purchases", data);
  return res.data;
};
export const getPurchases = async () => {
  const res = await api.get("/api/purchases");
  return res.data;
};

export const getPurchaseById = async (id) => {
  const res = await api.get(`/api/purchases/${id}`);
  return res.data;
};










export const getPurchasePayments = async (purchaseId) => {
  const res = await api.get(`/api/purchases/${purchaseId}/payments`);
  return res.data;
};

export const addPurchasePayment = async (purchaseId, paymentData) => {
  const res = await api.post(`/api/purchases/${purchaseId}/payments`, paymentData);
  return res.data;
};

export const deletePurchasePayment = async (purchaseId, paymentId) => {
  const res = await api.delete(`/api/purchases/${purchaseId}/payments/${paymentId}`);
  return res.data;
};
export const getPendingPurchases = async () => {
  const res = await api.get("/api/purchases/pending");
  return res.data;
};
export const getAllPayments = async () => {
  const res = await api.get("/api/purchase-payments");
  return res.data;
};