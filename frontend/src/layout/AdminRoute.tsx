import { Navigate, Outlet } from "react-router-dom";
import Spinner from "../components/Spinner";
import { useAuth } from "../context/AuthContext"
import AdminLayout from "./AdminLayout";

const AdminRoute = () => {
    const {user, isAdmin, loading} = useAuth();

    if (loading) return <Spinner />; // wait for user to load

    if(!user || !isAdmin) return <Navigate to="/login" replace/>
    
 
    return (
    <AdminLayout>
      <Outlet /> {/* nested routes go here */}
    </AdminLayout>
    )
    }

export default AdminRoute
