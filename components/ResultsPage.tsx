import React from 'react';

interface ResultsPageProps {
  data: {
    symptoms: string[];
    impact: string;
    selfHarm: string;
  } | null;
}

export const ResultsPage: React.FC<ResultsPageProps> = ({ data }) => {
  // Fallback if accessed directly without data
  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFCF8] dark:bg-[#020617] transition-colors duration-500">
        <button onClick={() => window.location.hash = ''} className="text-blue-500 underline dark:text-sky-400">Return Home</button>
      </div>
    );
  }

  // Simple Logic for Display Purposes
  const symptomCount = data.symptoms.length;
  let severity = "Mild";
  let emoji = "😊";
  let color = "text-emerald-600 dark:text-emerald-400";
  let message = "You're showing some mild indicators.";

  if (symptomCount >= 3 && symptomCount < 6) {
    severity = "Moderate";
    emoji = "😟";
    color = "text-orange-500 dark:text-orange-400";
    message = "You seem to be carrying a heavy emotional load.";
  } else if (symptomCount >= 6) {
    severity = "Significant";
    emoji = "😞";
    color = "text-red-500 dark:text-red-400";
    message = "Your symptoms suggest you might be facing significant challenges.";
  }

  const primaryCondition = data.symptoms.some(s => s.includes("worry") || s.includes("Racing")) 
    ? "Anxiety" 
    : "Depression";

  return (
    <div className="min-h-screen bg-[#FDFCF8] dark:bg-[#020617] py-12 px-6 animate-fade-in flex flex-col items-center transition-colors duration-500">
       
       <div className="w-full max-w-3xl mb-12 flex justify-between items-center">
        <div className="font-serif text-[1.4rem] font-medium text-wellness-slate dark:text-slate-100 tracking-[0.1em] uppercase cursor-pointer transition-colors" onClick={() => window.location.hash = ''}>
          MANAS<span className="font-semibold text-sky-600 dark:text-sky-400">360</span>
        </div>
        <div className="text-sm font-bold text-sky-600 dark:text-sky-200 uppercase tracking-widest bg-sky-50 dark:bg-slate-800 px-4 py-1 rounded-full border border-transparent dark:border-slate-700 transition-colors">
          Results
        </div>
      </div>

      <div className="w-full max-w-2xl bg-white dark:bg-[#1E293B] rounded-[40px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.4)] border border-slate-100 dark:border-slate-800 p-8 md:p-12 text-center transition-colors duration-500">
        
        <div className="text-[5rem] mb-4 animate-float filter dark:drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">{emoji}</div>
        
        <h1 className="font-serif text-[2.5rem] text-wellness-slate dark:text-white mb-2 transition-colors">
          {severity} emotional distress
        </h1>
        
        <p className={`text-lg font-medium mb-8 ${color} transition-colors`}>
          {message}
        </p>

        <div className="bg-slate-50 dark:bg-slate-900/50 rounded-3xl p-8 text-left mb-12 transition-colors border border-transparent dark:border-slate-700/50">
          <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">Summary Analysis</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Likely Primary Concern</p>
              <p className="text-xl font-serif text-wellness-slate dark:text-slate-200 font-medium transition-colors">{primaryCondition} Indicators</p>
            </div>
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Impact on Daily Life</p>
              <p className="text-xl font-serif text-wellness-slate dark:text-slate-200 font-medium transition-colors">{data.impact}</p>
            </div>
            <div className="col-span-1 md:col-span-2">
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">Key Symptoms Reported</p>
              <div className="flex flex-wrap gap-2">
                {data.symptoms.slice(0, 3).map(s => (
                  <span key={s} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-1 rounded-lg text-sm text-slate-600 dark:text-slate-300 transition-colors">
                    {s}
                  </span>
                ))}
                {data.symptoms.length > 3 && (
                  <span className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-1 rounded-lg text-sm text-slate-400 dark:text-slate-400 transition-colors">
                    +{data.symptoms.length - 3} more
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row gap-4 w-full">
            <button className="
              group flex-1 py-4 px-5
              bg-white dark:bg-slate-800 border border-[#1FA2DE] dark:border-sky-500 text-[#1FA2DE] dark:text-sky-400
              rounded-full font-sans font-bold text-[1rem] md:text-lg
              transition-all duration-300 ease-out
              hover:bg-[#1FA2DE] dark:hover:bg-sky-600 hover:text-white dark:hover:text-white hover:shadow-[0_10px_25px_-5px_rgba(31,162,222,0.4)]
              active:scale-[0.98]
              flex items-center justify-center gap-2
            ">
              <span>🔵</span> Consult Doctor
            </button>
            
            <button 
              onClick={() => window.location.hash = '#/full-assessment'}
              className="
                group flex-1 py-4 px-5
                bg-white dark:bg-slate-800 border border-[#1FA2DE] dark:border-sky-500 text-[#1FA2DE] dark:text-sky-400
                rounded-full font-sans font-bold text-[1rem] md:text-lg
                transition-all duration-300 ease-out
                hover:bg-[#1FA2DE] dark:hover:bg-sky-600 hover:text-white dark:hover:text-white hover:shadow-[0_10px_25px_-5px_rgba(31,162,222,0.4)]
                active:scale-[0.98]
                flex items-center justify-center gap-2
              "
            >
              <span>🩺</span> Full Health Assessment
            </button>
          </div>
          
          <button 
            onClick={() => window.location.hash = '#/home'} 
            className="
              w-full py-5
              bg-white dark:bg-transparent border border-slate-200 dark:border-slate-700 text-[#333333] dark:text-slate-400
              rounded-full font-sans font-medium text-lg
              transition-all duration-300
              hover:bg-sky-50 dark:hover:bg-slate-800 hover:border-sky-200 dark:hover:border-slate-600 hover:text-wellness-slate dark:hover:text-white
              active:scale-[0.99]
            "
          >
            Skip for now & Return Home
          </button>
        </div>

      </div>

    </div>
  );
};