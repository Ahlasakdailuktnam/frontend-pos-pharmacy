import { useEffect, useState } from "react";
import { getUnits } from "../services/auth";

const useUnits = () => {
  const [units, setUnits] = useState([]);
  const [loadingUnits, setLoadingUnits] = useState(true);

  const fetchUnits = async () => {
    try {
      const res = await getUnits();
      setUnits(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingUnits(false);
    }
  };

  useEffect(() => {
    fetchUnits();
  }, []);

  return {
    units,
    loadingUnits,
    fetchUnits,
  };
};

export default useUnits;