// src/hook/staff/useStaff.js
import { useEffect, useState } from "react";
import { getStaff, createStaff, updateStaff, deleteStaff, updateSalaryStatus } from "../../services/auth";

const useStaff = () => {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all staff
  const fetchStaff = async () => {
    try {
      setLoading(true);
      const res = await getStaff();
      const data = res?.data || res || [];
      setStaff(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Fetch Staff Error:", error);
      setStaff([]);
    } finally {
      setLoading(false);
    }
  };

  // Add new staff
 // src/hook/staff/useStaff.js
const addStaff = async (staffData) => {
  try {
    // Send as JSON, not FormData
    const res = await createStaff(staffData);
    await fetchStaff();
    return { success: true, data: res?.data || res };
  } catch (error) {
    console.error("Add Staff Error:", error);
    console.error("Error response:", error.response?.data);
    return { 
      success: false, 
      message: error.response?.data?.message || "Error adding staff" 
    };
  }
};

  // Edit staff
  const editStaff = async (id, staffData) => {
    try {
      const res = await updateStaff(id, staffData);
      await fetchStaff();
      return { success: true, data: res?.data || res };
    } catch (error) {
      console.error("Edit Staff Error:", error);
      return { 
        success: false, 
        message: error.response?.data?.message || "Error editing staff" 
      };
    }
  };

  // Delete staff
  const removeStaff = async (id) => {
    try {
      await deleteStaff(id);
      await fetchStaff();
      return { success: true };
    } catch (error) {
      console.error("Delete Staff Error:", error);
      return { 
        success: false, 
        message: error.response?.data?.message || "Error deleting staff" 
      };
    }
  };

  // Update salary status
  const updateSalary = async (staffDetailId, salaryData) => {
    try {
      const res = await updateSalaryStatus(staffDetailId, salaryData);
      await fetchStaff();
      return { success: true, data: res?.data || res };
    } catch (error) {
      console.error("Update Salary Error:", error);
      return { 
        success: false, 
        message: error.response?.data?.message || "Error updating salary" 
      };
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  return {
    staff,
    loading,
    fetchStaff,
    addStaff,
    editStaff,
    removeStaff,
    updateSalary,
  };
};

export default useStaff;