import { useState, useEffect } from "react";
import { getSuppliers } from "../services/auth";

const useSupplierSearch = () => {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!keyword) {
      setResults([]);
      return;
    }

    const delay = setTimeout(async () => {
      try {
        setLoading(true);

        const res = await getSuppliers({ search: keyword });

        let supplierList = [];

        if (res?.data?.data && Array.isArray(res.data.data)) {
          supplierList = res.data.data;
        } else if (res?.data && Array.isArray(res.data)) {
          supplierList = res.data;
        } else if (Array.isArray(res)) {
          supplierList = res;
        }

        setResults(supplierList);
      } catch (err) {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(delay);
  }, [keyword]);

  return { keyword, setKeyword, results, loading };
};

export default useSupplierSearch;