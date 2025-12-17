import React, { useState, useEffect } from 'react';
import { BackgroundParticles } from './components/BackgroundParticles';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TrustBar } from './components/TrustBar';
import { HowItWorks } from './components/HowItWorks';
import { Testimonial } from './components/Testimonial';
import { FinalCTA } from './components/FinalCTA';
import { CrisisBanner } from './components/CrisisBanner';
import { Assessment } from './components/Assessment';
import { ResultsPage } from './components/ResultsPage';
import { CrisisPage } from './components/CrisisPage';
import { HomePage } from './components/HomePage';
import { OnboardingName } from './components/OnboardingName';
import { OnboardingEmail } from './components/OnboardingEmail';
import { AssessmentDashboard } from './components/AssessmentDashboard';
import { TherapistDashboard } from './components/TherapistDashboard';
import { SessionBuilder } from './components/SessionBuilder';
import { SessionRunner } from './components/SessionRunner';
import { SessionResultsView } from './components/SessionResultsView';
import { Session } from './types';
import { storageService } from './utils/storageService';

export type ViewState = 'landing' | 'assessment' | 'results' | 'crisis' | 'home' | 'onboarding-name' | 'onboarding-email' | 'full-assessment' | 'run-assessment' | 'therapist-dashboard' | 'session-builder' | 'session-preview' | 'session-results';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('landing');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [assessmentData, setAssessmentData] = useState<any>(null);
  const [userData, setUserData] = useState<any>({});
  
  const [editingSession, setEditingSession] = useState<Session | undefined>(undefined);
  const [activeSession, setActiveSession] = useState<Session | undefined>(undefined);
  const [viewingHistoryRecord, setViewingHistoryRecord] = useState<any>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (savedTheme === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      // Respect system preference if no manual override
      if (prefersDark) {
         document.documentElement.classList.add('dark');
         localStorage.setItem('theme', 'dark');
      } else {
         document.documentElement.classList.remove('dark');
         localStorage.setItem('theme', 'light');
      }
    }

    const handleHashChange = () => {
      const hash = window.location.hash;
      setIsTransitioning(true);
      
      setTimeout(() => {
        if (hash === '#/assessment') {
          setCurrentView('assessment');
        } else if (hash === '#/results') {
          setCurrentView('results');
        } else if (hash === '#/crisis') {
          setCurrentView('crisis');
        } else if (hash === '#/home') {
          setCurrentView('home');
        } else if (hash === '#/onboarding/name') {
          setCurrentView('onboarding-name');
        } else if (hash === '#/onboarding/email') {
          setCurrentView('onboarding-email');
        } else if (hash === '#/full-assessment') {
          setCurrentView('full-assessment');
        } else if (hash === '#/assessment/run') {
          setCurrentView('run-assessment');
        } else if (hash === '#/assessment/view') {
          setCurrentView('session-results');
        } else if (hash === '#/therapist') {
          setCurrentView('therapist-dashboard');
        } else if (hash === '#/therapist/builder') {
          setCurrentView('session-builder');
        } else if (hash === '#/therapist/preview') {
          setCurrentView('session-preview');
        } else {
          setCurrentView('landing');
        }
        setIsTransitioning(false);
        window.scrollTo(0, 0);
      }, 300);
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    if (currentView !== 'landing') return;

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [currentView]);

  const handleStartAssessment = () => {
    window.location.hash = '#/assessment';
  };

  const handleAssessmentSubmit = (data: any, isCritical: boolean) => {
    setAssessmentData(data);
    if (isCritical) {
      window.location.hash = '#/crisis';
    } else {
      window.location.hash = '#/results';
    }
  };

  const handleUpdateUser = (data: any) => {
    setUserData({ ...userData, ...data });
  };

  const handleStartSession = (session: Session) => {
    setActiveSession(session);
    window.location.hash = '#/assessment/run';
  };

  const handleSessionComplete = (answers: any) => {
    if (activeSession) {
      storageService.saveHistory({
        sessionTitle: activeSession.title,
        sessionId: activeSession.id,
        answers: answers
      });
    }
    window.location.hash = '#/full-assessment';
  };

  const handleViewHistory = (record: any) => {
    setViewingHistoryRecord(record);
    window.location.hash = '#/assessment/view';
  };

  const handleCreateSession = () => {
    setEditingSession(undefined);
    window.location.hash = '#/therapist/builder';
  };

  const handleEditSession = (session: Session) => {
    setEditingSession(session);
    window.location.hash = '#/therapist/builder';
  };
  
  const handlePreviewSession = (session: Session) => {
    setActiveSession(session);
    window.location.hash = '#/therapist/preview';
  };

  return (
    <div 
      className={`
        relative min-h-screen font-sans 
        text-wellness-slate dark:text-dark-text-heading
        bg-wellness-bg dark:bg-dark-bg 
        transition-colors duration-500 ease-in-out
        ${isTransitioning ? 'opacity-0' : 'opacity-100'}
      `}
    >
      {currentView === 'landing' && (
        <>
          <div 
            className="relative w-full transition-colors duration-500"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1505118380757-91f5f5632de0?q=80&w=2560&auto=format&fit=crop")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundAttachment: 'scroll',
            }}
          >
            {/* 
               Layer 1: Overlay
               Fixed Dark Mode: Use very high opacity/deep blue for 'Calm' aesthetic in dark mode.
               Deepened opacity to 85% with slate-950 to let texture show slightly but keep it dark.
            */}
            <div className="absolute inset-0 bg-[#E0F2FE]/30 dark:bg-[#020617]/85 mix-blend-overlay dark:mix-blend-normal pointer-events-none z-0 transition-colors duration-700"></div>

            {/* Layer 2: Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#FFFBEB]/40 via-[#E0F2FE]/40 to-[#FDFCF8] dark:from-slate-950/80 dark:via-slate-900/60 dark:to-dark-bg pointer-events-none z-0 transition-colors duration-500"></div>

            {/* Layer 3: Sun/Moon Glow - Dark mode glow is subtle moonlight */}
            <div className="absolute top-0 left-0 right-0 h-[70vh] bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.8)_0%,_rgba(224,242,254,0.3)_50%,_transparent_100%)] dark:bg-[radial-gradient(ellipse_at_top,_rgba(56,189,248,0.05)_0%,_rgba(2,6,23,0.4)_50%,_transparent_100%)] pointer-events-none z-0 transition-colors duration-500"></div>
            
            {/* Layer 4: Transition to Body */}
            <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#FDFCF8] via-[#FDFCF8]/80 to-transparent dark:from-dark-bg dark:via-dark-bg/90 transition-colors duration-500 z-10"></div>
            
            <BackgroundParticles />
            
            <div className="relative z-20 w-full max-w-[1280px] mx-auto px-6 py-8 pb-32 md:pb-48">
              <Header />
              <Hero onStartClick={handleStartAssessment} />
            </div>
          </div>

          <main className="relative z-30 flex flex-col gap-32 w-full max-w-[1280px] mx-auto px-6 -mt-24 pb-24">
            <div className="reveal">
              <TrustBar />
            </div>
            
            <div className="reveal">
              <HowItWorks />
            </div>
            
            <div className="reveal">
              <Testimonial />
            </div>
            
            <FinalCTA onStartClick={handleStartAssessment} />
          </main>

          <CrisisBanner />
        </>
      )}

      {currentView === 'assessment' && (
        <Assessment onSubmit={handleAssessmentSubmit} />
      )}

      {currentView === 'results' && (
        <ResultsPage data={assessmentData} />
      )}

      {currentView === 'full-assessment' && (
        <AssessmentDashboard 
          onStartSession={handleStartSession}
          onViewHistory={handleViewHistory}
          onBack={() => window.location.hash = '#/results'}
        />
      )}

      {currentView === 'run-assessment' && activeSession && (
        <SessionRunner 
          session={activeSession}
          onComplete={handleSessionComplete}
          onExit={() => window.location.hash = '#/full-assessment'}
        />
      )}

      {currentView === 'session-results' && viewingHistoryRecord && (
        <SessionResultsView 
          historyRecord={viewingHistoryRecord}
          onBack={() => window.location.hash = '#/full-assessment'}
        />
      )}

      {currentView === 'crisis' && (
        <CrisisPage />
      )}

      {currentView === 'home' && (
        <HomePage />
      )}

      {currentView === 'onboarding-name' && (
        <OnboardingName onNext={(data) => {
          handleUpdateUser(data);
          window.location.hash = '#/onboarding/email';
        }} />
      )}

      {currentView === 'onboarding-email' && (
        <OnboardingEmail userName={userData.firstName} />
      )}

      {currentView === 'therapist-dashboard' && (
        <TherapistDashboard 
          onCreate={handleCreateSession}
          onEdit={handleEditSession}
          onPreview={handlePreviewSession}
        />
      )}

      {currentView === 'session-builder' && (
        <SessionBuilder 
          initialSession={editingSession}
          onSave={() => window.location.hash = '#/therapist'}
          onCancel={() => window.location.hash = '#/therapist'}
        />
      )}

      {currentView === 'session-preview' && activeSession && (
        <SessionRunner 
          session={activeSession}
          onExit={() => window.location.hash = '#/therapist'}
          onComplete={(answers) => {
            console.log('Preview Complete', answers);
            alert('Session Preview Complete! Check console for data.');
            window.location.hash = '#/therapist';
          }}
        />
      )}

    </div>
  );
};

export default App;