import {
  createBrowserRouter,
} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import AppLayout from "../layout/AppLayout";

import LandingPage from "../login/page/LandingPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },

 /* {
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