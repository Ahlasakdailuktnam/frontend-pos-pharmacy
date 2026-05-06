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



export const createOrder = async (orderData) => {
  const res = await api.post("/api/orders", orderData);
  return res.data;
};
export const getProductDashboard = async () => {
  const res = await api.get("/api/products/dashboard");
  return res.data;
};


export const getCustomers = async (params = {}) => {
  const res = await api.get("/api/customers", { params });
  return res.data;
};

export const getCustomerById = async (id) => {
  const res = await api.get(`/api/customers/${id}`);
  return res.data;
};

export const getCustomerStats = async () => {
  const res = await api.get("/api/customers/stats");
  return res.data;
};





// Get today's sales for logged-in staff
export const getTodaySales = async () => {
  const res = await api.get("/api/orders/today");
  return res.data;
};

// Get staff sales history (by date)
export const getStaffSales = async (params = {}) => {
  const res = await api.get("/api/orders/staff", { params });
  return res.data;
};
// Staff Management
export const getStaff = async () => {
  const res = await api.get("/api/staff");
  return res.data;
};

export const getStaffById = async (id) => {
  const res = await api.get(`/api/staff/${id}`);
  return res.data;
};

export const createStaff = async (data) => {
  const res = await api.post("/api/staff", data);
  return res.data;
};

export const updateStaff = async (id, data) => {
  const res = await api.put(`/api/staff/${id}`, data);
  return res.data;
};

export const deleteStaff = async (id) => {
  const res = await api.delete(`/api/staff/${id}`);
  return res.data;
};
export const updateSalaryStatus = async (staffDetailId, data) => {
  const res = await api.put(`/api/staff/${staffDetailId}/salary-status`, data);
  return res.data;
};
// Get all sales for admin
export const getAllSales = async (params = {}) => {
  const res = await api.get("/api/orders/all", { params });
  return res.data;
};
// Admin - Get sales statistics
export const getSalesStats = async () => {
  const res = await api.get("/api/orders/stats");
  return res.data;
};

// Admin - Get single order
export const getOrderById = async (id) => {
  const res = await api.get(`/api/orders/${id}`);
  return res.data;
};

export const getCustomerByPhone = async (phone) => {
  const res = await api.get(`/api/customers/phone/${phone}`);
  return res.data;
};

// Positions
export const getPositions = async () => {
  const res = await api.get("/api/positions");
  return res.data;
};

export const createPosition = async (data) => {
  const res = await api.post("/api/positions", data);
  return res.data;
};

export const updatePosition = async (id, data) => {
  const res = await api.put(`/api/positions/${id}`, data);
  return res.data;
};

export const deletePosition = async (id) => {
  const res = await api.delete(`/api/positions/${id}`);
  return res.data;
};





export const getExpenses = async (params = {}) => {
  const res = await api.get("/api/expenses", {
    params,
  });
  return res.data;
};

// Create new expense
export const createExpense = async (data) => {
  const res = await api.post("/api/expenses", data);
  return res.data;
};

// Update expense
export const updateExpense = async (id, data) => {
  const res = await api.put(`/api/expenses/${id}`, data);
  return res.data;
};

// Delete expense
export const deleteExpense = async (id) => {
  const res = await api.delete(`/api/expenses/${id}`);
  return res.data;
};

// Get expense statistics (for dashboard cards)
export const getExpenseStats = async () => {
  const res = await api.get("/api/expenses/stats");
  return res.data;
};

// Profile APIs
export const getProfile = async () => {
  const res = await api.get("/api/profile");
  return res.data;
};

export const updateProfile = async (data) => {
  const res = await api.put("/api/profile", data);
  return res.data;
};

export const updatePassword = async (data) => {
  const res = await api.put("/api/profile/password", data);
  return res.data;
};

export const uploadAvatar = async (file) => {
  const formData = new FormData();
  formData.append("avatar", file);
  const res = await api.post("/api/profile/avatar", formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
  return res.data;
};

export const getStaffProfile = async () => {
  const res = await api.get("/api/staff/profile");
  return res.data;
};