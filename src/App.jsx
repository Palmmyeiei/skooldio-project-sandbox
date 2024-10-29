import "./App.css";
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import ProductDetail from "./components/productDetail/product-detail";
import ProductRecommendations from "./components/productDetail/product-recommend";

function App() {
  return (
    <>
      <Navbar />
      <ProductDetail />
      <ProductRecommendations />
      <Footer />
    </>
  );
}

export default App;
