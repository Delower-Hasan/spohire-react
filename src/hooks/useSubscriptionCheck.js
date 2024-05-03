import { useSelector } from "react-redux";

export const useSubscriptionCheck = () => {
  const auth = useSelector((state) => state.auth);
  if (auth?.accessToken && !auth?.user?.isActive) {
    return { isSubscriptionCheck: false, path: "/dashboard/viewProfile" };
  } else if (!auth?.accessToken && !auth?.user?.isActive) {
    return { isSubscriptionCheck: false, path: "/login" };
  } else {
    return { isSubscriptionCheck: true, path: null };
  }
};
