import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./pages/auth/Login";
import StaffRoute from "./routes/StaffRoute";
import AdminRoute from "./routes/AdminRoute";

import ProtectedRoute from "./routes/ProtectedRoute";
import AdminOnlyRoute from "./routes/AdminOnlyRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />

        {/* Staff + Admin login required */}
        <Route
          path="/staff/*"
          element={
            <ProtectedRoute>
              <StaffRoute />
            </ProtectedRoute>
          }
        />

        {/* Admin only */}
        <Route
          path="/admin/*"
          element={
            <AdminOnlyRoute>
              <AdminRoute />
            </AdminOnlyRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;