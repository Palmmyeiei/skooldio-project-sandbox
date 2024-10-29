// TestAPI.js
import React, { useState, useEffect } from "react";

const TestAPI = () => {
  const [firstId, setFirstId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductIds = async () => {
      try {
        const response = await fetch(
          "https://api.storefront.wdb.skooldio.dev/products"
        );

        // Check if the response is OK
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const jsonData = await response.json();
        // Extracting the first product ID
        if (jsonData.data.length > 0) {
          setFirstId(jsonData.data[0].id); // Get the first product ID
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductIds();
  }, []); // Empty dependency array to run only once when the component mounts

  if (loading) {
    return <p>Loading product ID...</p>;
  }

  if (error) {
    return <p>Error fetching product ID: {error.message}</p>;
  }

  return (
    <div>
      <h1>First Product ID</h1>
      <p>{firstId}</p> {/* Display the first product ID */}
    </div>
  );
};

export default TestAPI;
