import { createBrowserRouter } from "react-router-dom";
import Login from "../Authentication/Login/Login";
import SignUp from "../Authentication/SignUp/SignUp";
import Layout from "../Layout/Layout.jsx";

import AddedItems from "../components/Dashboard/AddJobOffer/AddedItems.jsx";
import DashboardAnnouncements from "../components/Dashboard/Announcements/DashboardAnnouncements.jsx";
import Coaches from "../components/Dashboard/Coaches/Coaches.jsx";
import CoachesDetails from "../components/Dashboard/Coaches/CoachesDetails.jsx";
import CoachesProfile from "../components/Dashboard/Coaches/CoachesProfile.jsx";

import DashboardLayout from "../components/Dashboard/DashboardLayout/DashboardLayout";
import BlankMessages from "../components/Dashboard/Messages/BlankMessages.jsx";
import Messages from "../components/Dashboard/Messages/Messages.jsx";
import ObservedClone from "../components/Dashboard/ObservedClone/ObservedClone.jsx";
import OverView from "../components/Dashboard/OverView/OverView.jsx";
import Billing from "../components/Dashboard/Setting/Billing/Billing.jsx";
import Notification from "../components/Dashboard/Setting/Notification/Notification.jsx";
import Password from "../components/Dashboard/Setting/Password/Password";
import AppliedJobs from "../components/Dashboard/dashbordJobOffers/AppliedJobs.jsx";
import JobOffers from "../components/Dashboard/dashbordJobOffers/JobOffers";
import MyAppliedJob from "../components/Dashboard/dashbordJobOffers/MyAppliedJob.jsx";
import Players from "../components/Dashboard/players/Players";
import EditAddedPlayerDetails from "../components/Dashboard/viewDetails/EditAddedPlayerDetails.jsx";
import EditPlayerDetails from "../components/Dashboard/viewDetails/EditPlayerDetails.jsx";
import ViewDetails from "../components/Dashboard/viewDetails/ViewDetails";
import ViewProfile from "../components/Dashboard/viewDetails/ViewProfile.jsx";
import NewsDetails from "../components/News/NewsDetails.jsx";
import AddPlayerInfo2 from "../pages/AddPlayer/AddPlayerInfo2.jsx";
import AddPlayerInfo3 from "../pages/AddPlayer/AddPlayerInfo3.jsx";
import AddCoachProfile from "../pages/AddProfile/AddCoachProfile.jsx";
import AddPlayerProfile from "../pages/AddProfile/AddPlayerProfile.jsx";
import AddProfile from "../pages/AddProfile/AddProfile.jsx";
import AddProfilePlayer from "../pages/AddProfile/AddProfilePlayer.jsx";
import AddProfileCoach from "../pages/AddProfile/AddProflieCoach.jsx";
import Announcements from "../pages/Announcement/Announcements.jsx";
import CreateAnnouncements from "../pages/Announcement/CreateAnnouncements.jsx";
import EditAnnouncements from "../pages/Announcement/EditAnnouncements.jsx";
import Home from "../pages/Home.jsx";
import JobOffer from "../pages/JobOffer/JobOffer.jsx";
import JobOfferDetails from "../pages/JobOffer/JobOfferDetails.jsx";
import News from "../pages/News/News.jsx";
import TermsAndCondition from "../pages/TermsAndCondition/TermsAndCondition.jsx";
import Gallary from "../pages/TransferMarket/Gallary.jsx";
import TransfarMarket from "../pages/TransferMarket/TransfarMarket.jsx";
import PaymentProcessAddPlayer from "../pages/pricing/PaymentProcessAddPlayer.jsx";
import PaymentProcessNew from "../pages/pricing/PaymentProcessNew.jsx";
import Pricing from "../pages/pricing/Pricing.jsx";
import PricingAddProfile from "../pages/pricing/PricingAddProfile.jsx";
import EditCoachProfile from "./../components/Dashboard/Coaches/EditCoachProfile";
import PaymentRoute from "./PaymentRoute.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import SubscribedRoute from "./SubscribedRoute.jsx";
import HelpSupport from "../components/Dashboard/Setting/HelpSupport/HelpSupport.jsx";
import Settings from "../components/Dashboard/Setting/Settings/Settings.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/news",
        element: <News />,
      },
      {
        path: "/newsDetails/:id",
        element: <NewsDetails />,
      },
      {
        path: "/terms-condition",
        element: <TermsAndCondition />,
      },
      {
        path: "/transfarMarket",
        element: <TransfarMarket />,
      },
      {
        path: "/gallary/:id",
        element: <Gallary />,
      },
      {
        path: "/paymentProcess",
        element: (
          <PaymentRoute>
            <PaymentProcessNew />
          </PaymentRoute>
        ),
      },
      {
        path: "/paymentProcessAddPlayer",
        element: (
          // <PaymentRoute>
          <PaymentProcessAddPlayer />
          // </PaymentRoute>
        ),
      },

      {
        path: "/jobOffer",
        element: <JobOffer />,
      },
      {
        path: "/announcements",
        element: <Announcements />,
      },

      {
        path: "/pricing",
        element: <Pricing />,
      },
      {
        path: "/pricingAddProfile/:id",
        element: <PricingAddProfile />,
      },
    ],
  },

  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/signup",
    element: <SignUp />,
  },

  {
    path: "/addProfile",
    element: <AddProfile />,
  },

  {
    path: "/addPlayerProfile",
    element: <AddPlayerProfile />,
  },

  {
    path: "/addCoachProfile",
    element: <AddCoachProfile />,
  },

  {
    path: "/addProfilePlayer",
    element: <AddProfilePlayer />,
  },

  {
    path: "/addProfileCoach",
    element: <AddProfileCoach />,
  },
  // {
  //   path: "/addplayer",
  //   element: <AddPlayer />,
  // },
  {
    path: "/addplayer2",
    element: <AddPlayerInfo2 />,
  },

  {
    path: "/addplayer3",
    element: <AddPlayerInfo3 />,
  },

  {
    path: "/dashboard",
    element: <DashboardLayout />,

    children: [
      {
        path: "/dashboard",
        element: (
          <SubscribedRoute>
            <OverView />
          </SubscribedRoute>
        ),
      },
      {
        path: "/dashboard/jobOffers",
        element: (
          // <SubscribedRoute>
          <JobOffers />
          // </SubscribedRoute>
        ),
      },
      {
        path: "/dashboard/jobApplicants/:id",
        element: (
          // <SubscribedRoute>
          <AppliedJobs />
          // </SubscribedRoute>
        ),
      },
      {
        path: "/dashboard/addedItems",
        element: (
          // <SubscribedRoute>
          // <AppliedJobs />
          <AddedItems />
          // </SubscribedRoute>
        ),
      },
      {
        path: "/dashboard/jobDetails/:id",
        // element: <JobDetails />,
        element: <JobOfferDetails />,
      },

      {
        path: "/dashboard/myAppliedJobs",
        element: (
          // <SubscribedRoute>
          // <AppliedJobs />
          <MyAppliedJob />
          // </SubscribedRoute>
        ),
      },
      {
        path: "/dashboard/players",
        element: (
          <SubscribedRoute>
            <Players />
          </SubscribedRoute>
        ),
      },
      {
        path: "/dashboard/coaches",
        element: (
          <SubscribedRoute>
            <Coaches />
          </SubscribedRoute>
        ),
      },
      {
        path: "/dashboard/coacheDetails/:id",
        element: (
          <SubscribedRoute>
            <CoachesDetails />
          </SubscribedRoute>
        ),
      },
      {
        path: "/dashboard/coachesProfile",
        element: (
          <SubscribedRoute>
            <CoachesProfile />
          </SubscribedRoute>
        ),
      },
      {
        path: "/dashboard/editCoacheProfile",
        element: (
          // <SubscribedRoute>
          <EditCoachProfile />
          // </SubscribedRoute>
        ),
      },
      {
        path: "/dashboard/viewDetails/:id",
        element: (
          // <SubscribedRoute>
          <ViewDetails />
          // </SubscribedRoute>
        ),
      },
      {
        path: "/dashboard/viewProfile",
        element: (
          <PrivateRoute>
            <ViewProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/editPlayerDetals",
        element: (
          // <SubscribedRoute>
          <PrivateRoute>
            <EditPlayerDetails />
          </PrivateRoute>

          // </SubscribedRoute>
        ),
      },
      {
        path: "/dashboard/editDetails/:id",
        element: (
          // <SubscribedRoute>
          <PrivateRoute>
            <EditAddedPlayerDetails />
          </PrivateRoute>

          // </SubscribedRoute>
        ),
      },
      {
        path: "/dashboard/messages/:id",
        element: (
          // <SubscribedRoute>
          <Messages />
          // </SubscribedRoute>
        ),
      },
      {
        path: "/dashboard/messages",
        element: (
          // <SubscribedRoute>
          <BlankMessages />
          // </SubscribedRoute>
        ),
      },
      {
        path: "/dashboard/observed",
        element: (
          // <SubscribedRoute>
          <ObservedClone />
          // </SubscribedRoute>
        ),
      },
      {
        path: "/dashboard/billing",
        element: (
          // <SubscribedRoute>
          <Billing />
          // </SubscribedRoute>
        ),
      },
      {
        path: "/dashboard/notification",
        element: (
          // <SubscribedRoute>
          <Notification />
          // </SubscribedRoute>
        ),
      },
      {
        path: "/dashboard/password",
        element: (
          // <SubscribedRoute>
          <Password />
          // </SubscribedRoute>
        ),
      },
      {
        path: "/dashboard/help-and-support",
        element: <HelpSupport />,
      },
      {
        path: "/dashboard/settings",
        element: <Settings />,
      },
      {
        path: "/dashboard/announcements",
        element: (
          // <SubscribedRoute>
          <DashboardAnnouncements />
          // </SubscribedRoute>
        ),
      },
      {
        path: "/dashboard/editAnnouncements/:id",
        element: (
          // <SubscribedRoute>
          <EditAnnouncements />
          // </SubscribedRoute>
        ),
      },
      {
        path: "/dashboard/createAnnouncements",
        element: (
          // <SubscribedRoute>
          <CreateAnnouncements />
          // </SubscribedRoute>
        ),
      },
    ],
  },
]);
