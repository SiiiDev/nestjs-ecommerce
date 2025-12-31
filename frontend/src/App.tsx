import { Route, Routes } from "react-router-dom"
import Login from "./pages/auth/Login"
import ProtectedRoute from "./layout/ProtectedLayout"
import Home from "./pages/Home"

const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}

export default App
