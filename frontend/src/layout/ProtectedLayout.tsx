import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../components/website/Header';
import Footer from '../components/website/Footer';

const ProtectedLayout = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <body className="bg-cream text-dark font-sans leading-relaxed">
            <Header />
            <Outlet/>
            <Footer />
        </body>;
};

export default ProtectedLayout;

