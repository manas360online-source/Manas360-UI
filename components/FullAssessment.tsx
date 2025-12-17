
import React from 'react';
import { SessionRunner } from './SessionRunner';
import { Session } from '../types';

// Hardcoded "Full Health Assessment" session based on existing requirements
const FULL_ASSESSMENT_SESSION: Session = {
  id: 'full_health_assessment',
  title: 'Full Health Assessment',
  description: 'A comprehensive check-in to understand your emotional well-being.',
  version: 1,
  createdAt: Date.now(),
  updatedAt: Date.now(),
  questions: [
    {
      id: 'f_q1',
      text: 'Over the last 2 weeks, have you been feeling nervous, anxious, or on edge?',
      type: 'multiple-choice',
      required: true,
      options: [
        { id: '0', label: 'Not at all' },
        { id: '1', label: 'Several days' },
        { id: '2', label: 'More than half the days' },
        { id: '3', label: 'Nearly every day' }
      ]
    },
    {
      id: 'f_q2',
      text: 'Have you not been able to stop or control worrying?',
      type: 'multiple-choice',
      required: true,
      options: [
        { id: '0', label: 'Not at all' },
        { id: '1', label: 'Several days' },
        { id: '2', label: 'More than half the days' },
        { id: '3', label: 'Nearly every day' }
      ]
    },
    {
      id: 'f_q3',
      text: 'Have you had little interest or pleasure in doing things?',
      type: 'multiple-choice',
      required: true,
      options: [
        { id: '0', label: 'Not at all' },
        { id: '1', label: 'Several days' },
        { id: '2', label: 'More than half the days' },
        { id: '3', label: 'Nearly every day' }
      ]
    },
    {
      id: 'f_q4',
      text: 'How would you rate your overall stress level today?',
      type: 'slider',
      min: 0,
      max: 10,
      minLabel: 'Calm',
      maxLabel: 'Overwhelmed',
      required: true
    },
    {
      id: 'f_q5',
      text: 'Is there anything specific causing you stress right now?',
      type: 'text',
      required: false
    }
  ]
};

export const FullAssessment: React.FC = () => {
  const handleComplete = (answers: any) => {
    // Logic to process full assessment results
    console.log("Full Assessment Complete:", answers);
    // Navigate back to results or a specific "Full Report" page
    window.location.hash = '#/results'; 
    // In a real app, this would calculate scores and update global state
  };

  const handleExit = () => {
    window.location.hash = '#/results';
  };

  return (
    <SessionRunner 
      session={FULL_ASSESSMENT_SESSION} 
      onComplete={handleComplete} 
      onExit={handleExit} 
    />
  );
};
