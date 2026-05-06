// src/hook/staff/useStaffDetail.js
import { useState } from "react";
import { getStaffById, updateStaff } from "../../services/auth";

const useStaffDetail = () => {
  const [staff, setStaff] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStaff = async (id) => {
    try {
      setLoading(true);
      const res = await getStaffById(id);
      const data = res?.data || res;
      setStaff(data);
      return data;
    } catch (error) {
      console.error("Fetch Staff Detail Error:", error);
      setError(error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateStaffInfo = async (id, data) => {
    try {
      setLoading(true);
      const res = await updateStaff(id, data);
      await fetchStaff(id);
      return { success: true, data: res?.data || res };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || "Error updating staff" 
      };
    } finally {
      setLoading(false);
    }
  };

  return { staff, loading, error, fetchStaff, updateStaffInfo };
};

export default useStaffDetail;