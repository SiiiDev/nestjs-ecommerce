import { Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import ProtectedLayout from "./layout/ProtectedLayout";
import Home from "./pages/Home";
import AdminRoute from "./layout/AdminRoute";
import ProductsPage from "./pages/admin/Products";
import CategoriesPage from "./pages/admin/Category";
import Accueil from "./pages/Accueil";
import BooksPage from "./pages/admin/Books";


const App = () => {
  return (
      <Routes>
        <Route path="/" element={<ProtectedLayout/>}>
          <Route path="/" element={<Home />} />
          <Route path="/book" element={<Accueil />} />
        </Route>
        <Route path="/admin" element={<AdminRoute />} >
          <Route path="products" element={<ProductsPage/>} />
          <Route path="categories" element={<CategoriesPage/>} />
          <Route path="books" element={<BooksPage/>} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
  );
};

export default App;
