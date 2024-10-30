import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  FavoriteBorder,
} from "@mui/icons-material";
import {
  Button,
  IconButton,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";

export default function ProductDetail() {
  const [selectedColor, setSelectedColor] = useState("navy");
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { skuCode } = useParams(); // Get skuCode from URL parameters
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const colors = [
    { name: "Navy", value: "navy" },
    { name: "Orange", value: "orange" },
    { name: "Green", value: "green" },
  ];

  const sizes = ["XS", "S", "M", "L", "XL"];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://api.storefront.wdb.skooldio.dev/products"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const jsonData = await response.json();

        const productData = jsonData.data.map((item) => ({
          id: item.skuCode,
          name: item.name,
          description: item.description || "No description available.",
          price: item.price || 0,
          rating: item.rating || 4,
          image: item.imageUrls ? item.imageUrls[0] : "default_image_url",
          imageUrls: item.imageUrls || [],
        }));

        setProducts(productData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const product = products.find((product) => product.id === skuCode); // Find product by skuCode

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>Error fetching products: {error.message}</p>;
  }

  // const product = products[0];

  if (!product) {
    return <p>No product found.</p>;
  }

  const handleNextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < product.imageUrls.length - 1 ? prevIndex + 1 : 0
    );
  };

  const handlePreviousImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : product.imageUrls.length - 1
    );
  };

  // Get thumbnails excluding the current image
  const thumbnailImages = product.imageUrls.filter(
    (_, index) => index !== currentIndex
  );

  // Handle thumbnail click to change the main image
  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="w-[full] mx-[160px] mt-[160px] ">
      <div className="grid grid-cols-1 md:grid-cols-[780px_1fr] gap-[40px]">
        <div className="product-picture">
          <div className="product-picture-large relative">
            <img
              src={product.imageUrls[currentIndex]}
              alt={product.name}
              className="w-[780px] h-[780px] object-cover"
            />
            <div className="button-previous absolute top-1/2 left-[16px] transform -translate-y-1/2">
              <IconButton
                className="bg-white shadow-md"
                aria-label="previous"
                onClick={handlePreviousImage}
              >
                <ChevronLeft fontSize="large" />
              </IconButton>
            </div>
            <div className="button-next absolute top-1/2 right-[16px] transform -translate-y-1/2">
              <IconButton
                className="bg-white shadow-md"
                aria-label="next"
                onClick={handleNextImage}
              >
                <ChevronRight fontSize="large" />
              </IconButton>
            </div>
          </div>
          <div className="product-picture-small flex mt-[31px] gap-[30.79px]">
            {/* Display thumbnails excluding the current image */}
            {thumbnailImages.slice(0, 4).map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Thumbnail ${index + 1}`}
                className="w-[172.21px] h-[172.21px] object-cover cursor-pointer"
                onClick={() =>
                  handleThumbnailClick(index + (index < currentIndex ? 0 : 1))
                }
              />
            ))}
          </div>
        </div>

        <div className="product-detail flex flex-col w-[780px] gap-[24px]">
          <div className="product-description">
            <div className="flex justify-between items-center mb-[16px]">
              <p className="product-description-id text-[24px] font-bold h-[40px]">
                ID : {product.id}
              </p>
              <IconButton
                className="h-0"
                color="default"
                aria-label="add to favorites"
              >
                <FavoriteBorder fontSize="large" />
              </IconButton>
            </div>
            <p className="product-description-name text-[48px] font-bold mb-[16px]">
              {product.name}
            </p>
            <p className="text-[24px] font-bold text-[#626262]">
              {product.description}
            </p>
          </div>
          <div className="product-price">
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              THB{" "}
              {product.price.toLocaleString("en-US", {
                minimumFractionDigits: 2,
              })}
            </Typography>
          </div>
          <div className="product-score flex items-center">
            {[...Array(Math.floor(product.rating))].map((_, i) => (
              <Star key={i} className="text-[#DEF81C]" fontSize="large" />
            ))}
            <Star fontSize="large" style={{ color: "gray" }} />
          </div>

          <div className="product-selection flex flex-col gap-[24px]">
            <div className="product-color">
              <p className="text-[16px] font-normal text-[#626262] mb-[8px]">
                Color
              </p>
              <div className="flex gap-2">
                {colors.map((color) => (
                  <div key={color.value} className="flex flex-col items-center">
                    <Button
                      style={{
                        width: "54px",
                        height: "54px",
                        backgroundColor: color.value,
                        border:
                          selectedColor === color.value
                            ? "2px solid black"
                            : "none",
                        borderRadius: "0",
                      }}
                      onClick={() => setSelectedColor(color.value)}
                    ></Button>
                    <div className="mt-[8px] text-[16px] text-[#222222] text-center">
                      {color.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="product-size">
              <p className="text-[16px] font-normal text-[#626262] mb-[8px]">
                Size
              </p>
              <div className="flex gap-[8px]">
                {sizes.map((size) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? "outlined" : "outlined"}
                    onClick={() => setSelectedSize(size)}
                    style={{
                      width: "149.6px",
                      height: "54px",
                      border:
                        selectedSize === size
                          ? "1.5px solid #C1CD00"
                          : "1.5px solid #E1E1E1",
                      backgroundColor: "white",
                      color: "black",
                      borderRadius: "0",
                    }}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>
            <div className="product-qty">
              <p className="text-[16px] font-normal text-[#626262] mb-[8px]">
                Qty.
              </p>
              <Select
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-24"
                style={{
                  width: "139px",
                  height: "54px",
                  borderRadius: "0",
                  border: "0.5px solid #E1E1E1",
                }}
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <MenuItem key={num} value={num}>
                    {num}
                  </MenuItem>
                ))}
              </Select>
            </div>
            <div className="add-to-cart-button">
              <Button
                variant="contained"
                color="primary"
                fullWidth
                style={{
                  width: "780px",
                  height: "54px",
                  backgroundColor: "#222222",
                  color: "white",
                  borderRadius: 0,
                }}
              >
                Add to cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
