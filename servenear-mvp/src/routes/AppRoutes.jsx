import { Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "../components/auth/ProtectedRoute";
import PublicRoute from "../components/auth/PublicRoute";

import LandingPage from "../pages/public/LandingPage";
import LoginPage from "../pages/public/LoginPage";
import RegisterPage from "../pages/public/RegisterPage";

import CustomerHome from "../pages/customer/CustomerHome";
import SearchServices from "../pages/customer/SearchServices";
import ProviderProfile from "../pages/customer/ProviderProfile";
import CreateBooking from "../pages/customer/CreateBooking";
import MyBookings from "../pages/customer/MyBookings";
import CustomerMessages from "../pages/customer/CustomerMessages";
import LeaveReview from "../pages/customer/LeaveReview";

import ProviderDashboard from "../pages/provider/ProviderDashboard";
import IncomingJobs from "../pages/provider/IncomingJobs";
import MyServices from "../pages/provider/MyServices";
import ProviderMessages from "../pages/provider/ProviderMessages";
import ProviderEarnings from "../pages/provider/ProviderEarnings";
import ProviderReviews from "../pages/provider/ProviderReviews";
import ProviderProfileSettings from "../pages/provider/ProviderProfileSettings";

import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminUsers from "../pages/admin/AdminUsers";
import AdminBookings from "../pages/admin/AdminBookings";
import AdminVerification from "../pages/admin/AdminVerification";
import AdminQA from "../pages/admin/AdminQA";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />

      <Route
        path="/register"
        element={
          <PublicRoute>
            <RegisterPage />
          </PublicRoute>
        }
      />

      <Route
        path="/customer/home"
        element={
          <ProtectedRoute allowedRole="customer">
            <CustomerHome />
          </ProtectedRoute>
        }
      />

      <Route
        path="/customer/search"
        element={
          <ProtectedRoute allowedRole="customer">
            <SearchServices />
          </ProtectedRoute>
        }
      />

      <Route
        path="/customer/providers/:id"
        element={
          <ProtectedRoute allowedRole="customer">
            <ProviderProfile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/customer/book/:providerId"
        element={
          <ProtectedRoute allowedRole="customer">
            <CreateBooking />
          </ProtectedRoute>
        }
      />

      <Route
        path="/customer/bookings"
        element={
          <ProtectedRoute allowedRole="customer">
            <MyBookings />
          </ProtectedRoute>
        }
      />

      <Route
        path="/customer/messages"
        element={
          <ProtectedRoute allowedRole="customer">
            <CustomerMessages />
          </ProtectedRoute>
        }
      />

      <Route
        path="/customer/reviews/:bookingId"
        element={
          <ProtectedRoute allowedRole="customer">
            <LeaveReview />
          </ProtectedRoute>
        }
      />

      <Route
        path="/provider/dashboard"
        element={
          <ProtectedRoute allowedRole="provider">
            <ProviderDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/provider/jobs"
        element={
          <ProtectedRoute allowedRole="provider">
            <IncomingJobs />
          </ProtectedRoute>
        }
      />

      <Route
        path="/provider/services"
        element={
          <ProtectedRoute allowedRole="provider">
            <MyServices />
          </ProtectedRoute>
        }
      />

      <Route
        path="/provider/messages"
        element={
          <ProtectedRoute allowedRole="provider">
            <ProviderMessages />
          </ProtectedRoute>
        }
      />

      <Route
        path="/provider/earnings"
        element={
          <ProtectedRoute allowedRole="provider">
            <ProviderEarnings />
          </ProtectedRoute>
        }
      />

      <Route
        path="/provider/reviews"
        element={
          <ProtectedRoute allowedRole="provider">
            <ProviderReviews />
          </ProtectedRoute>
        }
      />

      <Route
        path="/provider/profile"
        element={
          <ProtectedRoute allowedRole="provider">
            <ProviderProfileSettings />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute allowedRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/users"
        element={
          <ProtectedRoute allowedRole="admin">
            <AdminUsers />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/bookings"
        element={
          <ProtectedRoute allowedRole="admin">
            <AdminBookings />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/verification"
        element={
          <ProtectedRoute allowedRole="admin">
            <AdminVerification />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/qa"
        element={
          <ProtectedRoute allowedRole="admin">
            <AdminQA />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}