import { useEffect, useState } from "react";
import { getSuppliers } from "../services/auth";

const useSuppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loadingSuppliers, setLoadingSuppliers] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {

        const res = await getSuppliers();
        setSuppliers(res.data.data || []);
      } catch (err) {
        console.log("ERROR =", err);
      } finally {
        setLoadingSuppliers(false);
      }
    };

    load();
  }, []);

  return { suppliers, loadingSuppliers };
};

export default useSuppliers;