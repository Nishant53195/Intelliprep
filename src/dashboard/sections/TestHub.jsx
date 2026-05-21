import { useState } from "react";

import SectionCard from "../components/SectionCard";

import HubTabs from "../components/HubTabs";

import SegmentTabs from "../components/SegmentTabs";

function TestHub() {
  const [
    activeMode,
    setActiveMode,
  ] = useState(
    "Prelims Tests"
  );

  return (
    <SectionCard
    >
      <div className="mb-6 flex justify-start">
        <SegmentTabs
          options={[
            "Prelims Tests",
            "Mains Tests",
          ]}
          active={
            activeMode
          }
          setActive={
            setActiveMode
          }
        />
      </div>

      <HubTabs
        tabs={[
          "Attempt Test",
          "Feed Offline Marks",
          "Analytics",
        ]}
      />

      
    </SectionCard>
  );
}

export default TestHub;