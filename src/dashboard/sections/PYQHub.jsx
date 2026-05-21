import { useState } from "react";

import SectionCard from "../components/SectionCard";

import HubTabs from "../components/HubTabs";

import SegmentTabs from "../components/SegmentTabs";

function PYQHub() {
  const [
    activeMode,
    setActiveMode,
  ] = useState(
    "Prelims PYQ"
  );

  return (
    <SectionCard
    >
      <div className="mb-6 flex justify-start">
        <SegmentTabs
          options={[
            "Prelims PYQ",
            "Mains PYQ",
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
          "Practice PYQ",
          "Rapid Revision",
          "Analytics",
        ]}
      />

      
    </SectionCard>
  );
}

export default PYQHub;