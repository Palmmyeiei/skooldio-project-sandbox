// ProductRecommendations.js
import React, { useState, useEffect } from "react";
import { Star } from "@mui/icons-material";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <Link to={`/products/${product.permalink}`}>
      {" "}
      {/* Use permalink in the path */}
      <div className="product-card flex flex-col w-[370px] h-[524px] gap-[16px]">
        <div className="product-rec-image">
          <img
            style={{
              width: "370px",
              height: "370px",
            }}
            src={product.image}
            alt={product.name}
            className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <div className="product-rec-detail flex flex-col gap-[8px]">
          <p className="product-rec-name text-[24px] font-bold text-[#222222] line-clamp-1">
            {product.name}
          </p>
          <p className="product-rec-description text-[16px] font-normal text-[#626262] line-clamp-1">
            {product.description}
          </p>
          <div className="product-rec-score flex items-center space-x-1">
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                fontSize="medium"
                className={
                  index < product.rating ? "text-[#DEF81C]" : "text-gray-300"
                }
              />
            ))}
          </div>
          <p className="product-rec-price text-[24px] font-bold text-[#222222] text-right">
            THB {product.price.toLocaleString()}
          </p>
        </div>
      </div>
    </Link>
  );
};

const ProductRecommendations = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://api.storefront.wdb.skooldio.dev/products"
        );

        // Check if the response is OK
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const jsonData = await response.json();

        // Map the fetched data to the desired structure
        const productData = jsonData.data.map((item) => ({
          id: item.id,
          name: item.name,
          description: item.description || "No description available.", // Update according to actual data structure
          price: item.price || 0, // Assume price is part of the fetched data
          rating: item.rating || 4, // Assume rating is part of the fetched data
          image: item.imageUrls ? item.imageUrls[0] : "default_image_url", // Use the first image or a default image if not available
        }));

        setProducts(productData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // Run once when the component mounts

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>Error fetching products: {error.message}</p>;
  }

  return (
    <div className="w-[1601px] mx-[160px] mt-[144.79px] font-['Poppins', sans-serif]">
      <h2 className="text-[32px] font-bold text-[#222222] mb-[64px]">
        People also like these
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[40px]">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductRecommendations;
