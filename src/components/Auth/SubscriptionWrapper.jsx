import React, { useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import Subscription from "./Subscription";
import SubscribedDetails from "./subscribed";
import { ProfileContext } from '../Profile/ProfileMenu';

const SubscriptionWrapper = () => {
  const { activeProfile, loading } = useContext(ProfileContext);
  const location = useLocation();
  const isFromAuthFlow = location.state?.fromAuthFlow;
  const isFromUpdateProfile = location.state?.fromUpdateProfile;
  const isFromPurchaseMore = location.state?.purchaseMore === true;

  // If profile is loading, show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600">Loading subscription details...</p>
        </div>
      </div>
    );
  }

  // Get latest userProfile data from localStorage as fallback
  const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  // Determine membership status from all available sources
  const isMemberFromContext = activeProfile?.isMember === true;
  const isMemberFromStorage = userProfile?.isMember === true;
  const isMemberFromUser = user?.isMember === true;
  
  // Final membership status - true only if ANY source confirms membership
  const isSubscribed = isMemberFromContext || isMemberFromStorage || isMemberFromUser;

  const content = isFromPurchaseMore
    ? (
        <Subscription 
          isInAuthFlow={false}
          isFromUpdateProfile={isFromUpdateProfile}
          hideBaseFees={true}
        />
      )
    : (
        isSubscribed ? (
          <SubscribedDetails 
            member={activeProfile || userProfile} 
            fromUpdateProfile={isFromUpdateProfile}
          />
        ) : (
          <Subscription 
            isInAuthFlow={isFromAuthFlow}
            isFromUpdateProfile={isFromUpdateProfile}
            hideBaseFees={false}
          />
        )
      );

  // If coming from auth flow, use a different layout
  if (isFromAuthFlow) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {content}
        </div>
      </div>
    );
  }

  // If accessed from dashboard, return just the content
  return content;
};

export default SubscriptionWrapper; 