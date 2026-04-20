import { useEffect, useState } from "react";
import ProductsCard from "./ProductsCard";
import { getProducts } from "../../api/productApi";

const ProductsGrid = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await getProducts();
      setProducts(res.data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="grid grid-cols-5 gap-3">
      {products.length === 0 ? (
        <p>គ្មានផលិតផល</p>
      ) : (
        products.map((item) => (
          <ProductsCard key={item.id} item={item} />
        ))
      )}
    </div>
  );
};

export default ProductsGrid;