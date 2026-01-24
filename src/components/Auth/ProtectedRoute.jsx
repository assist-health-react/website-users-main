import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const accessToken = localStorage.getItem('accessToken');
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
  const termsAccepted = userProfile.termsConditionsAccepted === true;
  const hasUserProfile = !!localStorage.getItem('userProfile');

  // console.log('Protected Route: Initial Check', {
  //   path: location.pathname,
  //   hasAccessToken: !!accessToken,
  //   isFirstLogin: user.isFirstLogin,
  //   termsAccepted,
  //   hasUserProfile,
  //   userProfile
  // });

  // Allow access to terms-and-conditions without token
  if (location.pathname === '/terms-and-conditions') {
    return children;
  }

  // If there's no access token, redirect to login
  if (!accessToken) {
    console.log('Protected Route: No access token, redirecting to login');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Special handling for first login flow
  if (user.isFirstLogin) {
    // console.log('Protected Route: First login flow check', {
    //   termsAccepted,
    //   hasUserProfile,
    //   currentPath: location.pathname
    // });
    
    // Step 1: Must accept terms first
    if (!termsAccepted && location.pathname !== '/terms-and-conditions') {
     // console.log('Protected Route: Redirecting to terms - not accepted yet');
      return <Navigate to="/terms-and-conditions" state={{ isFirstLogin: true }} replace />;
    }
    
    // Step 2: After terms, must complete profile
    if (termsAccepted && !hasUserProfile && location.pathname !== '/update-profile') {
     // console.log('Protected Route: Redirecting to profile - not completed yet');
      return <Navigate to="/update-profile" state={{ fromTerms: true, isFirstLogin: true }} replace />;
    }
  }

  // If trying to access login page with valid token, redirect to dashboard
  if (location.pathname === '/login' && accessToken) {
   // console.log('Protected Route: Already logged in, redirecting to dashboard');
    return <Navigate to="/dashboard" replace />;
  }

  // Prevent accessing terms page if already accepted
  if (location.pathname === '/terms-and-conditions' && termsAccepted && !user.isFirstLogin) {
   // console.log('Protected Route: Terms already accepted, redirecting to dashboard');
    return <Navigate to="/dashboard" replace />;
  }

  // Prevent accessing update-profile if terms not accepted during first login
  if (location.pathname === '/update-profile' && user.isFirstLogin && !termsAccepted) {
  //  console.log('Protected Route: Cannot update profile before accepting terms');
    return <Navigate to="/terms-and-conditions" state={{ isFirstLogin: true }} replace />;
  }

 // console.log('Protected Route: Rendering protected content for path:', location.pathname);
  return children;
};

export default ProtectedRoute; 