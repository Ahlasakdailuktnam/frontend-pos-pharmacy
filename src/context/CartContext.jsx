// src/context/CartContext.jsx
import React, { createContext, useState, useContext } from "react";

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [message, setMessage] = useState({ type: "", text: "" });

  const getProductPrice = (product) => {
    const price = product.price_per_unit || product.cost || 0;
    return typeof price === "number" ? price : parseFloat(price) || 0;
  };

  const getUnitName = (product) => {
    if (product.unit?.name) {
      return product.unit.name;
    }
    return "ដុំ";
  };

  const formatPrice = (price) => {
    const numPrice = typeof price === 'number' ? price : parseFloat(price) || 0;
    return numPrice.toFixed(2);
  };

  const addToCart = (product, quantity = 1, boxQty = null) => {
    const stock = product.stock_unit || 0;
    const unitName = getUnitName(product);
    const isTablet = unitName === "គ្រាប់" || unitName === "tablet" || unitName === "tablets";

    if (stock === 0) {
      setMessage({ type: "error", text: "អស់ស្តុក!" });
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
      return;
    }

    let itemPrice = getProductPrice(product);
    if (boxQty) {
      itemPrice = product.price_per_box || (itemPrice * (product.box_size || 1));
    }

    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);

      if (existingItem) {
        if (existingItem.quantity + quantity > stock) {
          setMessage({ type: "error", text: "លើសស្តុក!" });
          setTimeout(() => setMessage({ type: "", text: "" }), 3000);
          return prevCart;
        }
        return prevCart.map((item) =>
          item.id === product.id
            ? { 
                ...item, 
                quantity: item.quantity + quantity,
                boxQty: isTablet && boxQty ? (item.boxQty || 0) + boxQty : null
              }
            : item
        );
      }

      return [
        ...prevCart,
        {
          id: product.id,
          name: product.name,
          price: itemPrice,
          originalPrice: getProductPrice(product),
          image: product.image,
          quantity: quantity,
          stock,
          unit: unitName,
          isTablet: isTablet,
          boxQty: boxQty || null,
          boxSize: product.box_size || 1,
          pricePerBox: product.price_per_box,
        },
      ];
    });
    
    setMessage({ type: "success", text: `បានបន្ថែម ${product.name} ទៅកន្ត្រក!` });
    setTimeout(() => setMessage({ type: "", text: "" }), 3000);
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id !== productId) return item;
          if (quantity > item.stock) {
            setMessage({ type: "error", text: "លើសស្តុក!" });
            setTimeout(() => setMessage({ type: "", text: "" }), 3000);
            return item;
          }
          if (quantity <= 0) return null;
          return { ...item, quantity };
        })
        .filter(Boolean)
    );
  };

  const clearCart = () => {
    if (window.confirm("តើអ្នកចង់លុបទំនិញទាំងអស់ក្នុងកន្ត្រកមែនទេ?")) {
      setCart([]);
    }
  };

  const getCartSubtotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const getItemCount = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartSubtotal,
    getItemCount,
    message,
    setMessage,
    getProductPrice,
    getUnitName,
    formatPrice,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};