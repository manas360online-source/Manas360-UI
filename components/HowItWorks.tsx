import React from 'react';

export const HowItWorks: React.FC = () => {
  return (
    <section className="py-10 px-4 text-center relative z-10">
      <h2 className="font-serif text-[2.5rem] md:text-[3.5rem] font-medium text-black dark:text-white mb-6 tracking-tight animate-fade-in-down transition-colors duration-300">
        Your Path to Clarity
      </h2>
      <p className="text-[#1A1A1A] dark:text-slate-400 text-lg max-w-2xl mx-auto mb-20 leading-relaxed transition-colors duration-300">
        Three simple steps to understand your mind and find the right support.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[1200px] mx-auto">
        
        {/* Card 1 */}
        <StepCard 
          number="01"
          title="Tell Us How You Feel"
          description="Answer 3 simple questions about your current experience. It's quick, private, and helps us understand you."
          footer="⏱️ Takes just 60 seconds"
          delay="0s"
        />

        {/* Card 2 */}
        <StepCard 
          number="02"
          title="Get Clarity"
          description="We'll help you decode your emotions. Is it anxiety? Stress? Burnout? We give you the language to explain it."
          footer="★★★★★ Trusted by thousands"
          delay="0.1s"
          highlight
        />

        {/* Card 3 */}
        <StepCard 
          number="03"
          title="Connect with Help"
          description="We'll match you with a therapist who specializes in exactly what you need, whenever you're ready."
          footer="First session at ₹500"
          delay="0.2s"
        />

      </div>
    </section>
  );
};

interface StepCardProps {
  number: string;
  title: string;
  description: string;
  footer: string;
  delay: string;
  highlight?: boolean;
}

const StepCard: React.FC<StepCardProps> = ({ number, title, description, footer, delay, highlight }) => {
  return (
    <div 
      className={`
        reveal group relative flex flex-col justify-between p-8 md:p-10 rounded-[32px] 
        text-left transition-all duration-500
        ${highlight 
          ? 'bg-gradient-to-br from-[#F0F9FF] to-white dark:from-[#1E293B] dark:to-[#0F172A] border border-[#E0F2FE] dark:border-slate-700 shadow-[0_20px_50px_-10px_rgba(14,165,233,0.15)] dark:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.3)]' 
          : 'bg-white dark:bg-[#0F172A] border border-slate-100 dark:border-slate-800 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] hover:border-[#E0F2FE] dark:hover:border-slate-700 hover:shadow-[0_20px_40px_-10px_rgba(14,165,233,0.1)] dark:hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.2)]'
        }
        hover:-translate-y-2
      `}
      style={{ transitionDelay: delay }}
    >
      {/* Number Watermark */}
      <div className="absolute top-6 right-8 text-[4rem] font-serif font-bold text-slate-100 dark:text-slate-800/80 leading-none select-none pointer-events-none opacity-50 transition-colors">
        {number}
      </div>
      
      <div className="relative z-10 pt-4">
        <h3 className="text-[1.5rem] font-serif font-bold text-black dark:text-white mb-4 tracking-wide leading-tight group-hover:text-[#0A4E89] dark:group-hover:text-sky-300 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-[1.05rem] text-[#1A1A1A] dark:text-slate-400 leading-[1.7] mb-6 transition-colors duration-300">
          {description}
        </p>
      </div>
      
      <div className="relative z-10 mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 transition-colors">
        <p className={`font-bold text-xs uppercase tracking-widest flex items-center gap-2 ${highlight ? 'text-[#0A4E89] dark:text-sky-300' : 'text-[#94A3B8] dark:text-slate-500'}`}>
          {footer}
        </p>
      </div>
    </div>
  );
};