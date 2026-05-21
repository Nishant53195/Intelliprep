import {
  createBrowserRouter,
} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import AppLayout from "../layout/AppLayout";

import LandingPage from "../login/page/LandingPage";
import OnboardingPage from "../onboarding/page/OnboardingPage";
import DashboardPage from "../dashboard/page/DashboardPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },

  {
    path: "/onboarding",
    element: <OnboardingPage />,
  },

 {
  path: "/dashboard",
  element: (
    <ProtectedRoute>
        <DashboardPage />
     
    </ProtectedRoute>
  ),
},
/*
{
  path: "/study",
  element: (
    <ProtectedRoute>
      <AppLayout>
        <StudyPage />
      </AppLayout>
    </ProtectedRoute>
  ),
},

{
  path: "/revision",
  element: (
    <ProtectedRoute>
      <AppLayout>
        <RevisionPage />
      </AppLayout>
    </ProtectedRoute>
  ),
},*/
]);

export default router;