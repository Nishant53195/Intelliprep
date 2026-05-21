import {
  useEffect,
  useState,
} from "react";

import SectionCard
from "../components/SectionCard";

import HubTabs
from "../components/HubTabs";

import SyllabusProgressView
from "../../syllabus/components/SyllabusProgressView";

import TodayTaskCards
from "../components/TodayTaskCards";

import {
  refreshTodayTasks,
} from "../../scheduler/services/refreshTodayTasks";

function StudyHub() {
  const [
    activeTab,

    setActiveTab,
  ] = useState(
    "Tasks"
  );

  /*
   --------------------------
   LOAD TODAY TASKS
   --------------------------
  */

  useEffect(() => {
    refreshTodayTasks();
  }, []);

  const tabs = [
    "Tasks",

    "Syllabus Progress",
  ];

  return (
    <SectionCard>
      <HubTabs
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={
          setActiveTab
        }
      />

      <div className="mt-6">
        {activeTab ===
          "Tasks" && (
          <TodayTaskCards />
        )}

        {activeTab ===
          "Syllabus Progress" && (
          <SyllabusProgressView />
        )}
      </div>
    </SectionCard>
  );
}

export default
  StudyHub;