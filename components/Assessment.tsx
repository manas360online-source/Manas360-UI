import React, { useState } from 'react';

interface AssessmentProps {
  onSubmit: (data: any, isCritical: boolean) => void;
}

export const Assessment: React.FC<AssessmentProps> = ({ onSubmit }) => {
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [impact, setImpact] = useState<string>('');
  const [selfHarm, setSelfHarm] = useState<string>('');

  const toggleSymptom = (option: string) => {
    if (symptoms.includes(option)) {
      setSymptoms(symptoms.filter((s) => s !== option));
    } else {
      setSymptoms([...symptoms, option]);
    }
  };

  const handleFinish = () => {
    // Basic validation
    if (!selfHarm || !impact) {
      alert("Please answer all required questions.");
      return;
    }

    const isCritical = selfHarm === "Yes, and I have a plan";
    
    onSubmit({
      symptoms,
      impact,
      selfHarm
    }, isCritical);
  };

  const symptomsOptions = [
    "Feeling down, sad, or hopeless",
    "Little interest in things you enjoy",
    "Constant worry or nervousness",
    "Racing thoughts or can't focus",
    "Nightmares or disturbing memories",
    "Avoiding people or situations",
    "Sudden mood swings (high to low)",
    "Intrusive thoughts you can't control",
    "Hearing/seeing things others don't",
    "Trouble sleeping or sleeping too much",
    "Can't sit still or restless energy",
    "Forget things or lose track easily"
  ];

  const impactOptions = [
    "Not at all",
    "A little",
    "Moderately",
    "Severely",
    "Extremely"
  ];

  const selfHarmOptions = [
    "No",
    "Sometimes, but no plan",
    "Yes, and I have a plan"
  ];

  return (
    <div className="min-h-screen bg-[#FDFCF8] dark:bg-[#020617] flex flex-col items-center py-12 px-6 animate-fade-in transition-colors duration-500 ease-in-out">
      {/* Header */}
      <div className="w-full max-w-3xl mb-12 flex justify-between items-center">
        <div className="font-serif text-[1.4rem] font-medium text-[#000000] dark:text-slate-100 tracking-[0.1em] uppercase cursor-pointer transition-colors" onClick={() => window.location.hash = ''}>
          MANAS<span className="font-semibold text-[#0A4E89] dark:text-sky-400">360</span>
        </div>
        <div className="text-sm font-bold text-[#1A1A1A] dark:text-sky-200 uppercase tracking-widest bg-[#F1F4F6] dark:bg-slate-800 px-4 py-1 rounded-full border border-transparent dark:border-slate-700 transition-colors">
          Assessment
        </div>
      </div>

      <div className="w-full max-w-2xl space-y-16">
        
        {/* Question 1 */}
        <section>
          <h2 className="font-serif text-[1.8rem] text-[#000000] dark:text-white mb-6 leading-tight transition-colors">
            In the past 2 weeks, which of these have you experienced?
            <span className="block text-sm font-sans text-[#475569] dark:text-slate-400 font-normal mt-2 tracking-wide uppercase">Select all that apply</span>
          </h2>
          <div className="flex flex-wrap gap-3">
            {symptomsOptions.map((option) => {
              const isSelected = symptoms.includes(option);
              return (
                <button
                  key={option}
                  onClick={() => toggleSymptom(option)}
                  className={`
                    px-6 py-3 rounded-full text-[1rem] font-medium transition-all duration-300 border
                    ${isSelected 
                      ? 'bg-[#1FA2DE] dark:bg-sky-600 text-white border-transparent shadow-md dark:shadow-sky-900/30 transform scale-105' 
                      : 'bg-[#F1F4F6] dark:bg-slate-800 text-[#1A1A1A] dark:text-slate-300 border-[#D5D9DD] dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                    }
                  `}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </section>

        {/* Question 2 */}
        <section>
          <h2 className="font-serif text-[1.8rem] text-[#000000] dark:text-white mb-6 leading-tight transition-colors">
            How much do these affect your daily life?
          </h2>
          <div className="flex flex-wrap gap-3">
            {impactOptions.map((option) => {
              const isSelected = impact === option;
              return (
                <button
                  key={option}
                  onClick={() => setImpact(option)}
                  className={`
                    flex-1 min-w-[120px] px-4 py-3 rounded-full text-[1rem] font-medium transition-all duration-300 border text-center whitespace-nowrap
                    ${isSelected 
                      ? 'bg-[#1FA2DE] dark:bg-sky-600 text-white border-transparent shadow-md dark:shadow-sky-900/30' 
                      : 'bg-[#F1F4F6] dark:bg-slate-800 text-[#1A1A1A] dark:text-slate-300 border-[#D5D9DD] dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                    }
                  `}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </section>

        {/* Question 3 */}
        <section>
          <h2 className="font-serif text-[1.8rem] text-[#000000] dark:text-white mb-6 leading-tight transition-colors">
            Have you thought about hurting yourself?
          </h2>
          <div className="flex flex-col gap-3 max-w-md">
            {selfHarmOptions.map((option) => {
              const isSelected = selfHarm === option;
              return (
                <button
                  key={option}
                  onClick={() => setSelfHarm(option)}
                  className={`
                    w-full px-6 py-4 rounded-full text-[1.1rem] font-medium transition-all duration-300 border text-left flex justify-between items-center
                    ${isSelected 
                      ? 'bg-[#1FA2DE] dark:bg-sky-600 text-white border-transparent shadow-md dark:shadow-sky-900/30' 
                      : 'bg-[#F1F4F6] dark:bg-slate-800 text-[#1A1A1A] dark:text-slate-300 border-[#D5D9DD] dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                    }
                  `}
                >
                  {option}
                  {isSelected && <span>✓</span>}
                </button>
              );
            })}
          </div>
        </section>

        {/* Submit */}
        <div className="pt-8 pb-20">
          <button
            onClick={handleFinish}
            disabled={!selfHarm || !impact}
            className={`
              w-full py-5 rounded-full text-[1.2rem] font-bold tracking-widest uppercase transition-all duration-300 shadow-lg
              ${(!selfHarm || !impact)
                ? 'bg-[#E2E8F0] dark:bg-slate-800 text-[#94A3B8] dark:text-slate-600 cursor-not-allowed border border-transparent dark:border-slate-700'
                : 'bg-[#0A3157] dark:bg-sky-500 text-white hover:bg-[#124A85] dark:hover:bg-sky-400 hover:shadow-xl hover:-translate-y-1'
              }
            `}
          >
            Submit • Analyze My Results
          </button>
        </div>

      </div>
    </div>
  );
};