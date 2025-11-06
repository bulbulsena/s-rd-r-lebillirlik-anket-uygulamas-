
import React, { useState, useCallback, useEffect } from 'react';
import { SurveyData, Submission } from './types';
import { initialSurveyData, SECTIONS } from './constants';
import { ProgressBar } from './components/ProgressBar';
import { Navigation } from './components/Navigation';
import { Section1, Section2, Section3, Section4, Section5, Section6, Section7, Section8, Section9, Section10 } from './components/Sections';
import { Summary } from './components/Summary';
import { Dashboard } from './components/Dashboard';
import { HomeScreen } from './components/HomeScreen';
import { generateSustainabilityReport } from './services/gemini';


export default function App() {
  const [view, setView] = useState<'home' | 'survey' | 'dashboard'>('home');
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  
  const [currentStep, setCurrentStep] = useState(1);
  const [surveyData, setSurveyData] = useState<SurveyData>(initialSurveyData);
  
  const [activeSurveyData, setActiveSurveyData] = useState<SurveyData | null>(null);
  const [activeReport, setActiveReport] = useState<string | null>(null);

  const [isLoadingReport, setIsLoadingReport] = useState(false);

  useEffect(() => {
    try {
      const savedSubmissions = localStorage.getItem('sustainabilitySurveys');
      if (savedSubmissions) {
        setSubmissions(JSON.parse(savedSubmissions));
      }
    } catch (error) {
      console.error("Could not load submissions from localStorage", error);
      localStorage.removeItem('sustainabilitySurveys');
    }
  }, []);

  const totalSections = SECTIONS.length;
  const journeySteps = totalSections + 1; // 10 sections + summary

  const handleUpdate = useCallback((section: keyof SurveyData, field: string, value: any) => {
    setSurveyData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  }, []);

  const handleNext = async () => {
    if (currentStep === journeySteps) {
      setIsLoadingReport(true);
      try {
        const reportText = await generateSustainabilityReport(surveyData);
        
        const newSubmission: Submission = {
          id: new Date().toISOString(),
          submissionDate: new Date().toLocaleString('tr-TR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
          surveyData: surveyData,
          report: reportText,
        };

        const updatedSubmissions = [...submissions, newSubmission];
        setSubmissions(updatedSubmissions);
        localStorage.setItem('sustainabilitySurveys', JSON.stringify(updatedSubmissions));
        
        setActiveSurveyData(surveyData);
        setActiveReport(reportText);
        setView('dashboard');

      } catch (error) {
        console.error("Error generating report:", error);
        alert("Rapor oluşturulurken bir hata oluştu. Lütfen API anahtarınızı kontrol edip tekrar deneyin.");
      } finally {
        setIsLoadingReport(false);
      }
    } else if (currentStep < journeySteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleGoHome = () => {
    setSurveyData(initialSurveyData);
    setActiveSurveyData(null);
    setActiveReport(null);
    setCurrentStep(1);
    setView('home');
  };

  const handleStartNewSurvey = () => {
    setSurveyData(initialSurveyData);
    setCurrentStep(1);
    setView('survey');
  };

  const handleViewSubmission = (submission: Submission) => {
    setActiveSurveyData(submission.surveyData);
    setActiveReport(submission.report);
    setView('dashboard');
  };

  const handleDeleteSubmission = (id: string) => {
    if (window.confirm('Bu raporu kalıcı olarak silmek istediğinizden emin misiniz?')) {
        const updatedSubmissions = submissions.filter(s => s.id !== id);
        setSubmissions(updatedSubmissions);
        localStorage.setItem('sustainabilitySurveys', JSON.stringify(updatedSubmissions));
    }
  };

  const renderSection = () => {
    switch (currentStep) {
      case 1: return <Section1 data={surveyData.section1} onUpdate={(field, value) => handleUpdate('section1', field, value)} />;
      case 2: return <Section2 data={surveyData.section2} onUpdate={(field, value) => handleUpdate('section2', field, value)} />;
      case 3: return <Section3 data={surveyData.section3} onUpdate={(field, value) => handleUpdate('section3', field, value)} />;
      case 4: return <Section4 data={surveyData.section4} onUpdate={(field, value) => handleUpdate('section4', field, value)} />;
      case 5: return <Section5 data={surveyData.section5} onUpdate={(field, value) => handleUpdate('section5', field, value)} />;
      case 6: return <Section6 data={surveyData.section6} onUpdate={(field, value) => handleUpdate('section6', field, value)} />;
      case 7: return <Section7 data={surveyData.section7} onUpdate={(field, value) => handleUpdate('section7', field, value)} />;
      case 8: return <Section8 data={surveyData.section8} onUpdate={(field, value) => handleUpdate('section8', field, value)} />;
      case 9: return <Section9 data={surveyData.section9} onUpdate={(field, value) => handleUpdate('section9', field, value)} />;
      case 10: return <Section10 data={surveyData.section10} onUpdate={(field, value) => handleUpdate('section10', field, value)} />;
      case 11: return <Summary data={surveyData} />;
      default: return null;
    }
  };
  
  const currentSection = SECTIONS[currentStep - 1];

  if (view === 'home') {
    return <HomeScreen submissions={submissions} onStartNew={handleStartNewSurvey} onView={handleViewSubmission} onDelete={handleDeleteSubmission} />;
  }

  if (view === 'dashboard') {
    if (!activeSurveyData) return null;
    return (
       <div className="min-h-screen bg-gray-100 font-sans p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
           <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
              <Dashboard data={activeSurveyData} report={activeReport} onReset={handleGoHome} />
           </div>
        </div>
       </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">ÖRNEK YEMEK SANAYİ</h1>
            <p className="text-lg sm:text-xl text-gray-600 mt-2">Kapsamlı Sürdürülebilirlik Olgunluk Veri Toplama Anketi</p>
        </header>

        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
            <ProgressBar currentStep={currentStep} totalSteps={journeySteps + 1} />
            
            <div className="mt-8">
              {currentStep <= totalSections && (
                <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-r-lg">
                    <h2 className="text-2xl font-semibold text-gray-900">{currentSection.title}</h2>
                    <p className="text-gray-600 mt-1">{currentSection.description}</p>
                </div>
              )}
              {isLoadingReport ? (
                 <div className="text-center p-10">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-600 mx-auto"></div>
                    <h2 className="text-2xl font-semibold text-gray-800 mt-6">Raporunuz Oluşturuluyor...</h2>
                    <p className="text-gray-600 mt-2">Sürdürülebilirlik performansınız analiz ediliyor. Lütfen bekleyin.</p>
                </div>
              ) : renderSection()}
            </div>
            
            <Navigation 
                currentStep={currentStep}
                totalSteps={journeySteps + 1}
                onNext={handleNext}
                onPrev={handlePrev}
                isLoading={isLoadingReport}
            />
        </div>
        <footer className="text-center mt-8 text-sm text-gray-500">
            <p>&copy; 2024 Yeşil Dönüşüm Olgunluk Raporu Platformu</p>
        </footer>
      </div>
    </div>
  );
}