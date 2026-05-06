// src/hooks/position/usePositions.js
import { useEffect, useState } from "react";
import { getPositions, createPosition, updatePosition, deletePosition } from "../../services/auth";

const usePositions = () => {
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPositions = async () => {
    try {
      setLoading(true);
      const res = await getPositions();
      const data = res?.data || res || [];
      setPositions(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Fetch Positions Error:", error);
      setPositions([]);
    } finally {
      setLoading(false);
    }
  };

  const addPosition = async (name) => {
    try {
      const res = await createPosition({ name });
      const data = res?.data || res;
      await fetchPositions();
      return { success: true, data };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || "Error creating position" };
    }
  };

  const editPosition = async (id, name) => {
    try {
      const res = await updatePosition(id, { name });
      const data = res?.data || res;
      await fetchPositions();
      return { success: true, data };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || "Error updating position" };
    }
  };

  const removePosition = async (id) => {
    try {
      await deletePosition(id);
      await fetchPositions();
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || "Error deleting position" };
    }
  };

  useEffect(() => {
    fetchPositions();
  }, []);

  return { positions, loading, addPosition, editPosition, removePosition, fetchPositions };
};

export default usePositions;