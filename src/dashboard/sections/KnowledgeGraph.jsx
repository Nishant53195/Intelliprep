import SectionCard from "../components/SectionCard";

import HubTabs from "../components/HubTabs";

function KnowledgeGraph() {
  return (
    <SectionCard
      
    >
      <HubTabs
        tabs={[
          "Today's Topic",
          "Search Topic",
        ]}
      />

      
    </SectionCard>
  );
}

export default
  KnowledgeGraph;