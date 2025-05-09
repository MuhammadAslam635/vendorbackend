import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import RegisterPage from './pages/auth/Register'
import LoginPage from './pages/auth/Login'
import VendorDashboard from './pages/vendor/VendorDashboard'
import { useAuth } from './useAuth'
import { ProtectedRouteProps, UserRole } from './ProtectedRouteProps'
import Profile from './pages/vendor/Profile'
import Subscription from './pages/vendor/Subscription'
import Transaction from './pages/vendor/Transction'
import AdminPackages from './pages/admin/packages/Packages'
import CreatePackage from './pages/admin/packages/CreatePackage'
import LandingPage from './pages/LandingPage'
import UpdatePackage from './pages/admin/packages/UpdatePackage'
import Vendors from './pages/admin/vendors/Vendors'
import Transactions from './pages/admin/transactions/Transactions'
import PaymentSuccessHandler from './pages/vendor/PaymentSuccessHandler'
import PaymentCancelHandler from './pages/vendor/PaymentCancelHandler'
import AllVendors from './pages/AllVendors'
import SearchVendors from './pages/SearchVendors'
import AdminDashbaord from './pages/admin/AdminDashbaord'
import CreateProfile from './pages/vendor/CreateProfile'
import UpdateProfile from './pages/vendor/UpdateProfile'
import ResetPasswordPage from './pages/auth/ResetPassword'
import ForgotPasswordPage from './pages/auth/ForgetPassword'
import MyAds from './pages/MyAds'

function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user?.utype as UserRole)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        {/* Home route */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/all-vendors" element={<AllVendors />} />
        <Route path="/search-vendors" element={<SearchVendors />} />
        <Route path="/my-ads" element={<MyAds />} />
        {/* Public routes */}
        <Route
          path="/register"
          element={!isAuthenticated ? <RegisterPage /> : <Navigate to="/" replace />}
        />
        <Route
          path="/reset-password/:userId"
          element={<ResetPasswordPage />}
        />
        <Route
          path="/forgot-password"
          element={<ForgotPasswordPage />}
        />
        <Route
          path="/login"
          element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" replace />}
        />
        {/* ...other public routes... */}

        {/* Protected routes */}
        <Route path="/vendor/*" element={
          <ProtectedRoute allowedRoles={['VENDOR']}>
            <Routes>
              <Route path="dashboard" element={<VendorDashboard />} />
              <Route path="create/profile" element={<CreateProfile />} />
              <Route path="profiles" element={<Profile />} />
              <Route path="profiles/:id/edit" element={<UpdateProfile />} />
              <Route path="subscriptions" element={<Subscription />} />
              <Route path="transactions" element={<Transaction />} />
              <Route path="/payment-success" element={<PaymentSuccessHandler />} />
              <Route path="/payment-cancel" element={<PaymentCancelHandler />} />
            </Routes>
          </ProtectedRoute>
        } />

        {/* Fix the admin routes paths */}
        <Route path="/admin/*" element={
          <ProtectedRoute allowedRoles={['ADMIN']}>
            <Routes>
              <Route path="dashboard" element={<AdminDashbaord />} />
              <Route path="packages" element={<AdminPackages />} />
              <Route path="create-package" element={<CreatePackage />} />
              <Route path="packages/:id/edit" element={<UpdatePackage />} />
              <Route path="users" element={<Vendors />} />
              <Route path="transactions" element={<Transactions />} />

            </Routes>
          </ProtectedRoute>
        } />

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
