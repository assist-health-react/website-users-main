import { BrowserRouter as Router, Routes, Route, NavLink, useLocation, Navigate, Outlet } from 'react-router-dom';
import { useState, useContext,useEffect } from 'react';
import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FaChevronLeft, FaChevronRight, FaChartBar, FaCompass, FaUserMd, 
  FaCalendarAlt, FaShoppingCart, FaCog, FaNotesMedical, FaPrescriptionBottleAlt,
  FaClipboardCheck, FaUserFriends, FaCrown } from 'react-icons/fa';

// Dashboard Components
import Dashboard from './components/Dashboard';
import Appointments1 from './components/appointments';
import AssessmentReport2 from './components/AssessmentReport';
import MedicalHistory1 from './components/MedicalHistory';
import ProfileForm1 from './components/Profile';
import SubProfile1 from './components/SubProfile';
import Ecommerce1 from './components/ecommerce';
import Navigators from './components/Navigators';
import Doctors from './components/Doctors';
import Settings from './components/Settings';
//import Prescription from './components/prescription';

// Auth Components
import Login from './components/Auth/Login';
import LoginRegister from './components/Auth/LoginRegister';
import UpdateProfile from './components/Auth/UpdateProfile';
import PrivacyPolicy from './components/Auth/PrivacyPolicy';
import TermsAndConditions from './components/Auth/TermsAndConditions';
import RefundPolicy from './components/Auth/RefundPolicy';
import ReturnPolicy from './components/Auth/ReturnPolicy';
import SubscriptionSuccess from './components/Auth/SubscriptionSuccess';
import SubscriptionFailure from './components/Auth/SubscriptionFailure';
import MobilePaymentSuccess from './components/Auth/MobilePaymentSuccess';
import MobilePaymentFailure from './components/Auth/MobilePaymentFailure';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import Subscription from './components/Auth/Subscription';
import SubscriptionWrapper from './components/Auth/SubscriptionWrapper';
import ForgotPassword from './components/ForgotPassword'
// Public Pages
import Index from './pages/Index';
import About from './pages/About';
import Plans from './pages/Plans';
import Services from './pages/Services';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import Shop from './pages/Shop';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Refund from './pages/Refund';
import Return from './pages/Return';

// Public Components
import Layout from './components/public/Layout';
import ServiceDetail from './components/public/ServiceDetail';
import TestimonialDetail from './components/public/TestimonialDetail';

// Profile Context
import { ProfileProvider, ProfileContext } from './components/Profile/ProfileMenu';
import NotificationMenu from './components/NotificationMenu';
import ProfileMenu from './components/Profile/ProfileMenu';

const queryClient = new QueryClient();
 
// Protected Route Component
const ProtectedRouteComponent = ({ children, studentOnly }) => {
  const { activeProfile } = useContext(ProfileContext);
  const location = useLocation();

  if (!activeProfile) {
    return <Navigate to="/login" replace />;
  }

  // List of routes that are restricted for students
  const restrictedRoutes = ['/medical-history', '/sub-profile'];
  // Routes restricted for non-students
  const studentOnlyRoutes = ['/assessment-report'];

  if (activeProfile.isStudent && restrictedRoutes.includes(location.pathname)) {
    return <Navigate to="/" replace />;
  }

  if (!activeProfile.isStudent && studentOnlyRoutes.includes(location.pathname)) {
    return <Navigate to="/" replace />;
  }

  if (studentOnly && !activeProfile.isStudent) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const Header = () => {
  const location = useLocation();
  
  const getPageTitle = () => {
    const path = location.pathname;
    switch(path) {
      case '/dashboard':
        return 'Dashboard';
      case '/medical-history':
        return 'Medical History';
      case '/navigators':
        return 'My Navigator';
      case '/doctors':
        return 'My Doctor';
      // case '/prescription':
      //   return 'Prescriptions';
      case '/appointments':
        return 'Appointments';
      case '/ecommerce':
        return 'E-commerce';
      case '/settings':
        return 'Settings';
      case '/assessment-report':
        return 'Assessment Report';
      case '/sub-profile':
        return 'My Sub Profiles';
      default:
        return 'Dashboard';
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="px-8 py-5 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800 mobile:text-2xl">
          {getPageTitle()}
        </h1>
        <div className="flex items-center gap-4">
          <NotificationMenu />
          <ProfileMenu />
        </div>
      </div>
    </header>
  );
};

const AppContent = () => {
  const [isSidebarExpanded, setSidebarExpanded] = useState(true);
  const { activeProfile } = useContext(ProfileContext);
  const location = useLocation();

  console.log('AppContent: Rendering with profile:', {
    hasActiveProfile: !!activeProfile,
    profileData: activeProfile
  });

  const allNavigation = [
    { name: 'Dashboard', path: '/dashboard', icon: <FaChartBar />, color: 'text-purple-500' },
    { name: 'Medical History', path: '/dashboard/medical-history', icon: <FaNotesMedical />, color: 'text-red-500', hideForStudent: true },
    { name: 'Assessment Report', path: '/dashboard/assessment-report', icon: <FaClipboardCheck />, color: 'text-indigo-500' },
    { name: 'My Sub Profiles', path: '/dashboard/sub-profile', icon: <FaUserFriends />, color: 'text-purple-500', hideForStudent: false },
    { name: 'My Navigator', path: '/dashboard/navigators', icon: <FaCompass />, color: 'text-blue-500', hideForStudent: true },
    { name: 'My Doctor', path: '/dashboard/doctors', icon: <FaUserMd />, color: 'text-green-500', hideForStudent: true },
    // { name: 'Prescription', path: '/dashboard/prescription', icon: <FaPrescriptionBottleAlt />, color: 'text-pink-500', hideForStudent: true },
    { name: 'Appointments', path: '/dashboard/appointments', icon: <FaCalendarAlt />, color: 'text-red-500', hideForStudent: true },
    // { name: 'E-commerce', path: '/dashboard/ecommerce', icon: <FaShoppingCart />, color: 'text-orange-500' },
    // { name: 'Subscription', path: '/dashboard/subscription', icon: <FaCrown />, color: 'text-yellow-500' },
    { name: 'Settings', path: '/dashboard/settings', icon: <FaCog />, color: 'text-gray-500' },
  ];

  // Filter navigation items based on isStudent flag
  const navigation = allNavigation.filter(item => {
    if (!activeProfile) return false;
    if (activeProfile.isStudent && item.hideForStudent) return false;
    if (!activeProfile.isStudent && item.studentOnly) return false;
    return true;
  });

  return (
    <div className="min-h-screen h-screen bg-gray-100 flex overflow-hidden">
      {/* Sidebar - Now collapsible */}
      <aside 
        className={`flex bg-white shadow-lg flex-col fixed h-full transition-all duration-300 ease-in-out
          ${isSidebarExpanded ? 'w-72' : 'w-20'} mobile:hidden tablet:flex`}
      >
        {/* Logo Section */}
        <div className="p-2 sm:p-4 border-b border-[#38B6FF]/10 flex items-center justify-between">
          {isSidebarExpanded ? (
            <div className="flex items-center gap-2 sm:gap-3">
              <img 
                src="/assets/assist-health-logo.png" 
                alt="AssistHealth" 
                className="h-8 w-8 sm:h-10 sm:w-10 object-contain"
              />
              <div className="text-lg sm:text-xl font-semibold">
                <span className="text-gray-800">Assist</span>
                <span className="text-[#38B6FF]">Health</span>
              </div>
            </div>
          ) : (
            <img 
              src="/assets/assist-health-logo.png" 
              alt="AH" 
              className="h-8 w-8 sm:h-10 sm:w-10 object-contain"
            />
          )}
          <button 
            onClick={() => setSidebarExpanded(!isSidebarExpanded)}
            className="p-1.5 sm:p-2 rounded-full hover:bg-[#38B6FF]/5 text-gray-600 hover:text-[#38B6FF] transition-colors"
          >
            {isSidebarExpanded ? <FaChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" /> : <FaChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-3">
            {navigation.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => {
                    // For dashboard, only be active if it's exactly /dashboard
                    if (item.path === '/dashboard') {
                      return `flex items-center gap-4 px-4 py-3 rounded-lg transition-colors
                        ${location.pathname === '/dashboard'
                      ? 'bg-[#38B6FF]/10 text-[#38B6FF] font-semibold'
                      : 'text-gray-700 hover:bg-[#38B6FF]/5 hover:text-[#38B6FF]'
                        }`;
                    }
                    // For other routes, check if the current path starts with the item path
                    // but make sure it's a complete match or has a trailing slash
                    const isPathActive = location.pathname === item.path || 
                                       location.pathname.startsWith(item.path + '/');
                    return `flex items-center gap-4 px-4 py-3 rounded-lg transition-colors
                      ${isPathActive
                        ? 'bg-[#38B6FF]/10 text-[#38B6FF] font-semibold'
                        : 'text-gray-700 hover:bg-[#38B6FF]/5 hover:text-[#38B6FF]'
                      }`;
                  }}
                >
                  {({ isActive }) => {
                    // Use the same logic for the icon color
                    const isPathActive = item.path === '/dashboard' 
                      ? location.pathname === '/dashboard'
                      : location.pathname === item.path || location.pathname.startsWith(item.path + '/');
                    return (
                      <>
                        <span className={`text-xl ${isPathActive ? 'text-[#38B6FF]' : item.color} transition-colors`}>{item.icon}</span>
                      {isSidebarExpanded && (
                        <span className="font-medium whitespace-nowrap">{item.name}</span>
                      )}
                    </>
                    );
                  }}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content Area - Adjusts with sidebar */}
      <main className={`flex-1 flex flex-col transition-all duration-300 ease-in-out
        ${isSidebarExpanded ? 'ml-72' : 'ml-20'} mobile:ml-0 w-[calc(100%-${isSidebarExpanded ? '18rem' : '5rem'})]`}>
        <Header />

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8 mobile:p-4">
          <div className="max-w-full mx-auto">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuthenticated') === 'true');
   //2.12.25
  // 🔒 Auto logout after 30 minutes or token expiry
 // 🕒 Auto logout after 30 minutes of inactivity
useEffect(() => {
  // Clear any old timer
  let timeout;

  // This function runs whenever user moves or types
  const resetTimer = () => {
    clearTimeout(timeout);
    // Start a new 30-minute timer
    timeout = setTimeout(() => {
      localStorage.clear();
      window.location.href = '/login'; // logout and redirect
    }, 30 * 60 * 1000); // 30 minutes
  };

  // Listen for user activity
  window.addEventListener('mousemove', resetTimer);
  window.addEventListener('keydown', resetTimer);

  // Start the first timer
  resetTimer();

  // Cleanup
  return () => {
    window.removeEventListener('mousemove', resetTimer);
    window.removeEventListener('keydown', resetTimer);
    clearTimeout(timeout);
  };
}, []);

//1.11.25

  useEffect(() => {
    // Update userName when userProfile changes in localStorage
    const handleStorageChange = () => {
      const userProfile = localStorage.getItem('userProfile');
      if (userProfile) {
        const profile = JSON.parse(userProfile);
        setUserName(profile.name || 'Admin');
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    // Update userName from profile
    const userProfile = localStorage.getItem('userProfile');
    if (userProfile) {
      const profile = JSON.parse(userProfile);
      setUserName(profile.name || 'Admin');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userProfile');
    setIsAuthenticated(false);
    setUserName('Admin');
    console.log('Logging out...');
  };
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Router>
          <Routes>
            {/* Public Routes - No Authentication Required */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Index />} />
              <Route path="about" element={<About />} />
              <Route path="plans" element={<Plans />} />
              <Route path="services" element={<Services />} />
              <Route path="services/:serviceId" element={<ServiceDetail />} />
              <Route path="testimonials/:testimonialId" element={<TestimonialDetail />} />
              <Route path="blog" element={<Blog />} />
              <Route path="blog/:id" element={<BlogDetail />} />
              <Route path="shop" element={<Shop />} />
              <Route path="shop/:id" element={<ProductDetail />} />
              <Route path="contact" element={<Contact />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="privacy" element={<Privacy />} />
              <Route path="terms" element={<Terms />} />
              <Route path="refund" element={<Refund />} />
              <Route path="return" element={<Return />} />
            </Route>

            {/* Auth Routes - Public Access */}
            {/* <Route path="login" element={<Login />} /> */}
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="register" element={<LoginRegister />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="refund-policy" element={<RefundPolicy />} />
            <Route path="return-policy" element={<ReturnPolicy />} />

            {/* Protected Routes - Require Authentication */}
            <Route
              path="terms-and-conditions"
              element={
                <ProtectedRoute>
                  <TermsAndConditions />
                </ProtectedRoute>
              }
            />
            <Route
              path="update-profile"
              element={
                <ProtectedRoute>
                  <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
                    <UpdateProfile />
                  </div>
                </ProtectedRoute>
              }
            />
            <Route path="subscription/success" element={<SubscriptionSuccess/>} />
            <Route path="subscription/failure" element={<SubscriptionFailure/>} />
            <Route path="payment/success" element={<MobilePaymentSuccess/>} />
            <Route path="payment/failure" element={<MobilePaymentFailure/>} />

            {/* <Route
              path="subscription"
              element={
                <ProfileProvider>
                  <ProtectedRoute>
                    <SubscriptionWrapper />
                  </ProtectedRoute>
                </ProfileProvider>
              }
            />
            <Route
              path="subscription/success"
              element={
                <ProfileProvider>
                  <ProtectedRoute>
                    <SubscriptionSuccess />
                  </ProtectedRoute>
                </ProfileProvider>
              }
            />
            <Route
              path="subscription/failure"
              element={
                <ProfileProvider>
                  <ProtectedRoute>
                    <SubscriptionFailure />
                  </ProtectedRoute>
                </ProfileProvider>
              }
            />
            <Route
              path="payment/success"
              element={
                <ProtectedRoute>
                  <MobilePaymentSuccess />
                </ProtectedRoute>
              }
            />
            <Route
              path="payment/failure"
              element={
                <ProtectedRoute>
                  <MobilePaymentFailure />
                </ProtectedRoute>
              }
            /> */}

            {/* Dashboard Routes - All Protected Routes with Sidebar */}
            <Route
              path="dashboard"
              element={
                <ProfileProvider>
                  <ProtectedRoute>
                    <AppContent />
                  </ProtectedRoute>
                </ProfileProvider>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="subscription" element={<SubscriptionWrapper />} />
              <Route path="medical-history" element={<MedicalHistory1 />} />
              <Route path="assessment-report" element={<AssessmentReport2 />} />
              <Route path="sub-profile" element={<SubProfile1 />} />
              <Route path="navigators" element={<Navigators />} />
              <Route path="doctors" element={<Doctors />} />
              {/* <Route path="prescription" element={<Prescription />} /> */}
              <Route path="appointments" element={<Appointments1 />} />
              <Route path="ecommerce" element={<Ecommerce1 />} />
              <Route path="settings" element={<Settings />} />
            </Route>

            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
          <Sonner />
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
