import React, { useState } from 'react';
import Header from '../components/Header';
import StepIndicator from '../components/StepIndicator';
import PersonalDetailsForm from './PersonalDetailsForm';
import EducationForm from './EducationForm';
import AdditionalQualificationForm from './AdditionalQualificationForm';
import BarExperienceForm from './BarExperienceForm';
import CourtPracticeForm from './CourtPracticeForm';
import AdditionalDetailsForm from './AdditionalDetailsForm';
import AddressDetailsForm from './AddressDetailsForm';
import JudgementForm from './JudgementForm';
import DocumentsForm from './DocumentsForm';
import Button from '../components/Button';

const ApplicationFormStepper = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [applicantId, setApplicantId] = useState(
    localStorage.getItem('applicantId') || null
  );

  const totalSteps = 9;

  const handleNext = (newApplicantId = null) => {
    if (newApplicantId) {
      setApplicantId(newApplicantId);
      localStorage.setItem('applicantId', newApplicantId);
    }
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    } else {
      // Application completed
      alert('Application submitted successfully!');
      localStorage.removeItem('applicantId');
      setCurrentStep(1);
      setApplicantId(null);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to start a new application? Your current progress will be lost.')) {
      localStorage.removeItem('applicantId');
      setCurrentStep(1);
      setApplicantId(null);
    }
  };

  const renderStepContent = () => {
    const commonProps = {
      applicantId,
      onNext: handleNext,
      onPrev: handlePrev,
    };

    switch (currentStep) {
      case 1:
        return <PersonalDetailsForm {...commonProps} />;
      case 2:
        return <EducationForm {...commonProps} />;
      case 3:
        return <AdditionalQualificationForm {...commonProps} />;
      case 4:
        return <BarExperienceForm {...commonProps} />;
      case 5:
        return <CourtPracticeForm {...commonProps} />;
      case 6:
        return <AdditionalDetailsForm {...commonProps} />;
      case 7:
        return <AddressDetailsForm {...commonProps} />;
      case 8:
        return <JudgementForm {...commonProps} />;
      case 9:
        return <DocumentsForm {...commonProps} />;
      default:
        return <PersonalDetailsForm {...commonProps} />;
    }
  };

  return (
    <>
      <Header />
      <div className="container-main">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-xl font-semibold">Step {currentStep} of {totalSteps}</h1>
          {applicantId && (
            <Button
              onClick={handleReset}
              variant="danger"
              type="button"
            >
              Start New Application
            </Button>
          )}
        </div>

        <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />

        {renderStepContent()}
      </div>
    </>
  );
};

export default ApplicationFormStepper;
