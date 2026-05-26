import useOnboardingStore from "../store/onboardingStore";
import OnboardingLayout from "../components/OnboardingLayout";
import OnboardingSidebar from "../components/OnboardingSidebar";
import WelcomeStep from "../components/steps/WelcomeStep";
import PreparationStep from "../components/steps/PreparationStep";
import GSSequenceStep from "../components/steps/GSSequenceStep";
import OptionalSequenceStep from "../components/steps/OptionalSequenceStep";
import InitializationStep from "../components/steps/InitializationStep";

function OnboardingPage() {
  const currentStep = useOnboardingStore((state) => state.currentStep);
  const optionalSubject = useOnboardingStore((state) => state.optionalSubject);

  function renderStep() {
    switch (currentStep) {
      case 1:
        return <WelcomeStep />;
      case 2:
        return <PreparationStep />;
      case 3:
        return <GSSequenceStep />;
      case 4:
        // Force React to unmount and mount smoothly when the active subject changes
        return <OptionalSequenceStep key={optionalSubject} />;
      case 5:
        return <InitializationStep />;
      default:
        return <WelcomeStep />;
    }
  }

  return (
    <OnboardingLayout sidebar={<OnboardingSidebar currentStep={currentStep} />}>
      {renderStep()}
    </OnboardingLayout>
  );
}

export default OnboardingPage;