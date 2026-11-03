import { Routes, Route } from "react-router-dom";

// Pages
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Products from "../pages/Products";
import ProductDetails from "../pages/ProductDetails";
import Brands from "../pages/Brands";
import Projects from "../pages/Projects";
import ProjectDetails from "../pages/ProjectDetails";
import Magazine from "../pages/Magazine";
import MagazineDetails from "../pages/MagazineDetails";
import Profile from "../pages/Profile";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Terms from "../pages/Terms";
import Privacy from "../pages/Privacy";
import NotFound from "../pages/NotFound";

// Layout
import MainLayout from "../layouts/MainLayout";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        {/* Home */}
        <Route index element={<Home />} />

        {/* About */}
        <Route path="about" element={<About />} />

        {/* Contact */}
        <Route path="contact" element={<Contact />} />

        {/* Products */}
        <Route path="products" element={<Products />} />

        {/* Product Details */}
        <Route path="products/:id" element={<ProductDetails />} />

        {/* برندها */}
        <Route path="brands" element={<Brands />} />

        {/* پروژه‌ها */}
        <Route path="projects" element={<Projects />} />

        {/* جزئیات پروژه */}
        <Route path="projects/:id" element={<ProjectDetails />} />

        {/* مجله */}
        <Route path="magazine" element={<Magazine />} />

        {/* جزئیات مقاله */}
        <Route path="magazine/:slug" element={<MagazineDetails />} />

        {/* Profile (لایک‌ها، اطلاعات کاربر) */}
        <Route path="profile" element={<Profile />} />

        {/* Cart */}
        <Route path="cart" element={<Cart />} />

        {/* Checkout */}
        <Route path="checkout" element={<Checkout />} />

        {/* Login */}
        <Route path="login" element={<Login />} />

        {/* Register */}
        <Route path="register" element={<Register />} />

        {/* شرایط و قوانین */}
        <Route path="terms" element={<Terms />} />

        {/* حریم خصوصی */}
        <Route path="privacy" element={<Privacy />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
