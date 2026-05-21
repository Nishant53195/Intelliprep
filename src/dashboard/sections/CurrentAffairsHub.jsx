import SectionCard from "../components/SectionCard";

import HubTabs from "../components/HubTabs";

function CurrentAffairsHub() {
  return (
    <SectionCard
      
    >
      <HubTabs
        tabs={[
          "Add Current Affairs",
          "Read Current Affairs",
          "Evolution Tracking",
          "Export",
        ]}
      />

      
    </SectionCard>
  );
}

export default
  CurrentAffairsHub;