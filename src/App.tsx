import { Route, Routes } from 'react-router-dom'
import MarketingLayout from './layouts/MarketingLayout'
import PortalLayout from './layouts/PortalLayout'
import AdminLayout from './layouts/AdminLayout'
import HomePage from './pages/marketing/HomePage'
import ProductsPage from './pages/marketing/ProductsPage'
import ProductDetailPage from './pages/marketing/ProductDetailPage'
import TeamPage from './pages/marketing/TeamPage'
import TestimonialsPage from './pages/marketing/TestimonialsPage'
import ContactPage from './pages/marketing/ContactPage'
import SignInPage from './pages/auth/SignInPage'
import SignUpPage from './pages/auth/SignUpPage'
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage'
import AdminSignInPage from './pages/auth/AdminSignInPage'
import PortalDashboardPage from './pages/portal/DashboardPage'
import PortalTransactionsPage from './pages/portal/TransactionsPage'
import PortalLoansPage from './pages/portal/LoansPage'
import PortalTerminalsPage from './pages/portal/TerminalsPage'
import PortalSupportPage from './pages/portal/SupportPage'
import PortalProfilePage from './pages/portal/ProfilePage'
import AdminDashboardPage from './pages/admin/DashboardPage'
import AdminMerchantsPage from './pages/admin/MerchantsPage'
import AdminMerchantDetailPage from './pages/admin/MerchantDetailPage'
import AdminTransactionsPage from './pages/admin/TransactionsPage'
import AdminTerminalsPage from './pages/admin/TerminalsPage'
import AdminFinancePage from './pages/admin/FinancePage'
import AdminApplicationsPage from './pages/admin/ApplicationsPage'
import AdminSupportPage from './pages/admin/SupportPage'
import AdminTeamPage from './pages/admin/TeamPage'
import AdminSettingsPage from './pages/admin/SettingsPage'
import NotFoundPage from './pages/NotFoundPage'

export default function App() {
  return (
    <Routes>
      <Route element={<MarketingLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:slug" element={<ProductDetailPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/testimonials" element={<TestimonialsPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Route>

      <Route path="/sign-in" element={<SignInPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/admin/sign-in" element={<AdminSignInPage />} />

      <Route path="/portal" element={<PortalLayout />}>
        <Route index element={<PortalDashboardPage />} />
        <Route path="transactions" element={<PortalTransactionsPage />} />
        <Route path="loans" element={<PortalLoansPage />} />
        <Route path="terminals" element={<PortalTerminalsPage />} />
        <Route path="support" element={<PortalSupportPage />} />
        <Route path="profile" element={<PortalProfilePage />} />
      </Route>

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboardPage />} />
        <Route path="merchants" element={<AdminMerchantsPage />} />
        <Route path="merchants/:id" element={<AdminMerchantDetailPage />} />
        <Route path="transactions" element={<AdminTransactionsPage />} />
        <Route path="terminals" element={<AdminTerminalsPage />} />
        <Route path="finance" element={<AdminFinancePage />} />
        <Route path="applications" element={<AdminApplicationsPage />} />
        <Route path="support" element={<AdminSupportPage />} />
        <Route path="team" element={<AdminTeamPage />} />
        <Route path="settings" element={<AdminSettingsPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
