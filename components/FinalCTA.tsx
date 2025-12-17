import React from 'react';

interface FinalCTAProps {
  onStartClick: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onStartClick }) => {
  return (
    <section className="text-center px-5 py-20 reveal max-w-4xl mx-auto">
      <h2 className="font-serif text-[3rem] font-medium text-wellness-slate dark:text-white leading-[1.2] mb-10 animate-breathe transition-colors">
        Ready to feel <span className="text-[#0A4E89] dark:text-sky-300 italic transition-colors">better</span>?
      </h2>
      
      <div className="flex flex-col items-center gap-5">
        <button
          onClick={onStartClick}
          className="
            font-sans text-[1.2rem] font-bold 
            py-6 px-16
            rounded-full 
            cursor-pointer 
            bg-[#0A3157] dark:bg-[#1E293B] text-white
            border-2 border-transparent dark:border-slate-600
            shadow-[0_15px_30px_rgba(30,41,59,0.2)] dark:shadow-[0_15px_30px_rgba(0,0,0,0.3)]
            transition-all duration-300 ease-out
            uppercase tracking-[2px]
            hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(30,41,59,0.3)] dark:hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]
            hover:bg-[#124A85] dark:hover:bg-[#334155]
            active:bg-[#06223F]
          "
        >
          Begin Your Journey
        </button>
        <p className="mt-6 text-wellness-text dark:text-slate-400 text-sm tracking-wide opacity-70 transition-colors">
          Free 60-second assessment • 100% Confidential
        </p>
      </div>
    </section>
  );
};