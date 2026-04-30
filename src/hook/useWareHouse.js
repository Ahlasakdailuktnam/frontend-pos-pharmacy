import { useEffect, useState } from "react";
import {
  getWarehouses,
  createWarehouse,
  updateWarehouse,
  deleteWarehouse,
} from "../services/auth"; // your file path

const useWarehouses = () => {
  const [warehouses, setWarehouses] = useState([]);

  const [loadingWarehouse, setLoadingWarehouse] =
    useState(false);

  const [savingWarehouse, setSavingWarehouse] =
    useState(false);

  /* ===============================
     FETCH WAREHOUSES
  =============================== */
  const fetchWarehouses = async () => {
    try {
      setLoadingWarehouse(true);

      const res =
        await getWarehouses();

      setWarehouses(
        res.data || []
      );
    } catch (error) {
      console.log(
        "Warehouse Error:",
        error
      );
    } finally {
      setLoadingWarehouse(false);
    }
  };

  /* ===============================
     ADD WAREHOUSE
  =============================== */
  const addWarehouse = async (
    data
  ) => {
    try {
      setSavingWarehouse(true);

      await createWarehouse(
        data
      );

      await fetchWarehouses();

      return {
        success: true,
      };
    } catch (error) {
      console.log(
        "Add Warehouse Error:",
        error
      );

      return {
        success: false,
      };
    } finally {
      setSavingWarehouse(false);
    }
  };

  /* ===============================
     UPDATE WAREHOUSE
  =============================== */
  const editWarehouse =
    async (id, data) => {
      try {
        setSavingWarehouse(true);

        await updateWarehouse(
          id,
          data
        );

        await fetchWarehouses();

        return {
          success: true,
        };
      } catch (error) {
        console.log(
          "Update Warehouse Error:",
          error
        );

        return {
          success: false,
        };
      } finally {
        setSavingWarehouse(false);
      }
    };

  /* ===============================
     DELETE WAREHOUSE
  =============================== */
  const removeWarehouse =
    async (id) => {
      try {
        await deleteWarehouse(
          id
        );

        await fetchWarehouses();

        return {
          success: true,
        };
      } catch (error) {
        console.log(
          "Delete Warehouse Error:",
          error
        );

        return {
          success: false,
        };
      }
    };

  /* ===============================
     FIRST LOAD
  =============================== */
  useEffect(() => {
    fetchWarehouses();
  }, []);

  return {
    warehouses,

    loadingWarehouse,
    savingWarehouse,

    fetchWarehouses,
    addWarehouse,
    editWarehouse,
    removeWarehouse,
  };
};

export default useWarehouses;