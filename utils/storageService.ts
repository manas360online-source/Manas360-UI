
import { Session } from '../types';

const STORAGE_KEY = 'mans360_sessions';
const HISTORY_KEY = 'mans360_history';

export const storageService = {
  getSessions: (): Session[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error loading sessions', error);
      return [];
    }
  },

  saveSession: (session: Session): void => {
    const sessions = storageService.getSessions();
    const existingIndex = sessions.findIndex(s => s.id === session.id);
    
    if (existingIndex >= 0) {
      sessions[existingIndex] = session;
    } else {
      sessions.push(session);
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
  },

  deleteSession: (id: string): void => {
    const sessions = storageService.getSessions().filter(s => s.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
  },

  getSessionById: (id: string): Session | undefined => {
    return storageService.getSessions().find(s => s.id === id);
  },

  // History Methods
  getHistory: (): any[] => {
    try {
      const data = localStorage.getItem(HISTORY_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      return [];
    }
  },

  saveHistory: (result: any): void => {
    const history = storageService.getHistory();
    // Generate a robust unique ID for the history record
    const uniqueId = `hist_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const newRecord = { 
      ...result, 
      completedAt: Date.now(), 
      id: uniqueId 
    };
    
    history.push(newRecord);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  },

  deleteHistory: (id: string): void => {
    const history = storageService.getHistory().filter(h => h.id !== id);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  },

  // Helper to find template for viewing results (checks built-in templates)
  getTemplateById: (id: string): Session | undefined => {
    return TEMPLATES.find(t => t.id === id);
  }
};

// Fixed Templates as per requirements
export const TEMPLATES: Session[] = [
  {
    id: 'phq-9-assessment',
    title: 'Depression Assessment (PHQ-9)',
    description: 'A standard screening tool to assess severity of depressive symptoms.',
    version: 1,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    questions: [
      {
        id: 'phq_q1',
        text: 'Over the last 2 weeks, how often have you been bothered by having little interest or pleasure in doing things?',
        type: 'multiple-choice',
        options: [
          { id: 'not-at-all', label: 'Not at all' },
          { id: 'several-days', label: 'Several days' },
          { id: 'more-than-half', label: 'More than half the days' },
          { id: 'nearly-every-day', label: 'Nearly every day' }
        ]
      },
      {
        id: 'phq_q2',
        text: 'Over the last 2 weeks, how often have you been bothered by feeling down, depressed, or hopeless?',
        type: 'multiple-choice',
        options: [
          { id: 'not-at-all', label: 'Not at all' },
          { id: 'several-days', label: 'Several days' },
          { id: 'more-than-half', label: 'More than half the days' },
          { id: 'nearly-every-day', label: 'Nearly every day' }
        ]
      },
      {
        id: 'phq_q3',
        text: 'On a scale of 1–10, how difficult have these problems made it for you to do your work, take care of things at home, or get along with other people?',
        type: 'slider',
        min: 1,
        max: 10,
        minLabel: 'Not difficult at all',
        maxLabel: 'Extremely difficult'
      },
      {
        id: 'phq_q4',
        text: 'Which of the following symptoms have you experienced recently? (Select all that apply)',
        type: 'checkbox',
        options: [
          { id: 'sleep', label: 'Trouble falling or staying asleep' },
          { id: 'energy', label: 'Feeling tired or having little energy' },
          { id: 'appetite', label: 'Poor appetite or overeating' },
          { id: 'concentration', label: 'Trouble concentrating' }
        ]
      },
      {
        id: 'phq_q5',
        text: 'Please describe any specific thoughts or situations that have been bothering you recently.',
        type: 'text'
      }
    ]
  },
  {
    id: 'gad-7-assessment',
    title: 'Anxiety Screening (GAD-7)',
    description: 'Screening for Generalized Anxiety Disorder and panic symptoms.',
    version: 1,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    questions: [
      {
        id: 'gad_q1',
        text: 'Over the last 2 weeks, how often have you been bothered by feeling nervous, anxious, or on edge?',
        type: 'multiple-choice',
        options: [
          { id: 'not-at-all', label: 'Not at all' },
          { id: 'several-days', label: 'Several days' },
          { id: 'more-than-half', label: 'More than half the days' },
          { id: 'nearly-every-day', label: 'Nearly every day' }
        ]
      },
      {
        id: 'gad_q2',
        text: 'Have you experienced a sudden panic attack (intense fear/discomfort) in the last week?',
        type: 'multiple-choice',
        options: [
          { id: 'yes', label: 'Yes' },
          { id: 'no', label: 'No' }
        ]
      },
      {
        id: 'gad_q3',
        text: 'Describe the situation where the panic attack occurred. What were you thinking at that moment?',
        type: 'text'
      },
      {
        id: 'gad_q4',
        text: 'Which of the following physical symptoms do you experience when anxious? (Select all that apply)',
        type: 'checkbox',
        options: [
          { id: 'restlessness', label: 'Restlessness' },
          { id: 'fatigue', label: 'Fatigue' },
          { id: 'concentration', label: 'Difficulty concentrating' },
          { id: 'irritability', label: 'Irritability' },
          { id: 'tension', label: 'Muscle tension' },
          { id: 'sleep', label: 'Sleep disturbance' }
        ]
      },
      {
        id: 'gad_q5',
        text: 'What strategies have you tried to manage your worry so far?',
        type: 'text'
      }
    ]
  },
  {
    id: 'stress-coping-assessment',
    title: 'Stress & Coping Assessment',
    description: 'Evaluate your current stress levels and support system.',
    version: 1,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    questions: [
      {
        id: 'stress_q1',
        text: 'Rate your overall stress level today.',
        type: 'slider',
        min: 1,
        max: 10,
        minLabel: 'Relaxed',
        maxLabel: 'Overwhelmed'
      },
      {
        id: 'stress_q2',
        text: 'Identify your primary sources of stress right now. (Select all that apply)',
        type: 'checkbox',
        options: [
          { id: 'work', label: 'Work/Career' },
          { id: 'finances', label: 'Finances' },
          { id: 'health', label: 'Health' },
          { id: 'relationships', label: 'Relationships' },
          { id: 'future', label: 'Future Uncertainty' }
        ]
      },
      {
        id: 'stress_q3',
        text: 'Do you feel you have adequate support to handle these stressors?',
        type: 'multiple-choice',
        options: [
          { id: 'strong', label: 'Yes, I have a strong support system' },
          { id: 'some', label: 'I have some support but could use more' },
          { id: 'none', label: 'No, I feel I am handling this alone' }
        ]
      },
      {
        id: 'stress_q4',
        text: 'What is one small thing you can do today to reduce this stress?',
        type: 'text'
      }
    ]
  }
];
