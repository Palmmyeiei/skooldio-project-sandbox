import React, { useState, useEffect } from "react";
import ProductDetail from "./product-detail";
import ProductRecommendations from "./product-recommend";

const ParentComponent = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);

  // Fetch products and set the first one as the default selected product
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://api.storefront.wdb.skooldio.dev/products"
        );
        const data = await response.json();
        setProducts(data.data);
        setSelectedProduct(data.data[0]); // Set the first product as default
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
  };

  return (
    <div>
      <ProductRecommendations
        products={products}
        onProductSelect={handleProductSelect}
      />
      {selectedProduct ? (
        <ProductDetail product={selectedProduct} />
      ) : (
        <p>Loading product details...</p>
      )}
    </div>
  );
};

export default ParentComponent;
