import React from 'react';
import { Session, Answer } from '../types';
import { storageService } from '../utils/storageService';

interface SessionResultsViewProps {
  historyRecord: any;
  onBack: () => void;
}

export const SessionResultsView: React.FC<SessionResultsViewProps> = ({ historyRecord, onBack }) => {
  // Find the original template to get question text
  // Fallback to title matching if sessionId is missing (legacy support) or just show answer ID
  let template = storageService.getTemplateById(historyRecord.sessionId);
  
  if (!template) {
     // Try finding by title if ID lookup failed (backup for older data)
     template = storageService.getSessions().find(s => s.title === historyRecord.sessionTitle) as Session;
  }

  const renderAnswerValue = (questionId: string, value: string | number | string[]) => {
    if (!template) return JSON.stringify(value);

    const question = template.questions.find(q => q.id === questionId);
    if (!question) return JSON.stringify(value);

    if (question.type === 'multiple-choice' && question.options) {
      const option = question.options.find(o => o.id === value);
      return option ? option.label : value;
    }

    if (question.type === 'checkbox' && question.options && Array.isArray(value)) {
      const labels = value.map(v => {
        const opt = question.options?.find(o => o.id === v);
        return opt ? opt.label : v;
      });
      return labels.join(', ');
    }

    return value;
  };

  return (
    <div className="min-h-screen bg-[#FDFCF8] dark:bg-[#0F172A] p-8 animate-fade-in flex flex-col items-center transition-colors duration-500">
      <div className="w-full max-w-3xl">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
           <button onClick={onBack} className="text-[#0A4E89] dark:text-sky-400 font-bold text-sm hover:underline transition-colors">
            ← Back to Session History
          </button>
          <div className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest transition-colors">
            Results View
          </div>
        </div>

        <div className="bg-white dark:bg-[#1E293B] rounded-[32px] p-8 md:p-12 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.3)] border border-slate-100 dark:border-slate-800 mb-8 transition-colors">
          <h1 className="font-serif text-[2rem] font-bold text-[#0A3A78] dark:text-white mb-2 transition-colors">
            {historyRecord.sessionTitle}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mb-8 transition-colors">
            Completed on {new Date(historyRecord.completedAt).toLocaleDateString()} at {new Date(historyRecord.completedAt).toLocaleTimeString()}
          </p>

          <div className="space-y-8">
            {template ? (
              template.questions.map((q, index) => {
                const answer = historyRecord.answers.find((a: Answer) => a.questionId === q.id);
                const hasAnswer = answer !== undefined;

                return (
                  <div key={q.id} className="border-b border-slate-50 dark:border-slate-700/50 last:border-0 pb-6 last:pb-0 transition-colors">
                    <p className="font-bold text-[#1A1A1A] dark:text-slate-200 text-lg mb-3 transition-colors">
                      <span className="text-slate-400 dark:text-slate-600 mr-2">{index + 1}.</span>
                      {q.text}
                    </p>
                    <div className="pl-6 md:pl-8">
                      {hasAnswer ? (
                        <p className="text-[#1FA2DE] dark:text-sky-400 font-medium text-lg transition-colors">
                          {renderAnswerValue(q.id, answer.value)}
                        </p>
                      ) : (
                        <p className="text-slate-400 dark:text-slate-600 italic transition-colors">Skipped / No Answer</p>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center text-slate-500 dark:text-slate-400 italic transition-colors">
                Original assessment template not found. Displaying raw data:
                <pre className="text-left bg-slate-50 dark:bg-slate-900 p-4 rounded-xl mt-4 overflow-auto text-xs text-slate-700 dark:text-slate-300">
                  {JSON.stringify(historyRecord.answers, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};