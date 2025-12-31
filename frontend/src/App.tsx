import { Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";
import ProtectedLayout from "./layout/ProtectedLayout";

const App = () => {
  return (
    <MainLayout>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedLayout>
              <Home />
            </ProtectedLayout>
          }
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </MainLayout>
  );
};

export default App;
