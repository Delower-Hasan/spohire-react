import React from "react";
import { useSubscriptionCheck } from "../hooks/useSubscriptionCheck";
import { Navigate, useLocation } from "react-router-dom";

const SubscribedRoute = ({ children }) => {
  const { isSubscriptionCheck, path } = useSubscriptionCheck();
  const location = useLocation();
  return isSubscriptionCheck ? (
    children
  ) : (
    <Navigate to={path} state={{ from: location }} replace />
  );
};

export default SubscribedRoute;
