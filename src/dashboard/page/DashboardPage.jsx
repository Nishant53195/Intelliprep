import DashboardLayout from "../components/DashboardLayout";

import PreparationStatus from "../sections/PreparationStatus";

import StudyHub from "../sections/StudyHub";

import PYQHub from "../sections/PYQHub";

import TestHub from "../sections/TestHub";

import KnowledgeGraph from "../sections/KnowledgeGraph";

import CurrentAffairsHub from "../sections/CurrentAffairsHub";

import useDashboardStore from "../store/dashboardStore";

function DashboardPage() {
  const activeHub =
    useDashboardStore(
      (state) =>
        state.activeHub
    );
   

    const HUB_CONFIG = {
  "Preparation Status": {
    title: "Preparation Status",

    subtitle:
      "Track your preparation metrics and progress.",
  },

  "Study Hub": {
    title: "Study Hub",

    subtitle:
      "Your central UPSC operating workspace.",
  },

  "PYQ Hub": {
    title: "PYQ Hub",

    subtitle:
      "Previous year question analysis workspace.",
  },

  "Test Hub": {
    title: "Test Hub",

    subtitle:
      "Mock tests and evaluation center.",
  },

  "Knowledge Graph": {
    title: "Knowledge Graph",

    subtitle:
      "Visualize interconnections across topics.",
  },

  "Current Affairs": {
    title: "Current Affairs",

    subtitle:
      "Daily national and international updates.",
  },
};

 const activeConfig =
  HUB_CONFIG[activeHub];

  return (
    <DashboardLayout
  title={activeConfig.title}
  subtitle={
    activeConfig.subtitle
  }
>
      <div className="min-h-full">
        {activeHub ===
          "Preparation Status" && (
          <PreparationStatus />
        )}

        {activeHub ===
          "Study Hub" && (
          <StudyHub />
        )}

        {activeHub ===
          "PYQ Hub" && (
          <PYQHub />
        )}

        {activeHub ===
          "Test Hub" && (
          <TestHub />
        )}

        {activeHub ===
          "Knowledge Graph" && (
          <KnowledgeGraph />
        )}

        {activeHub ===
          "Current Affairs" && (
          <CurrentAffairsHub />
        )}
      </div>
    </DashboardLayout>
  );
}

export default DashboardPage;