import React from 'react';

function SectionCard({ children, title, action, className = "" }) {
  return (
    <div className={`group bg-white rounded-[2rem] border border-slate-200/60 shadow-[0_10px_35px_-12px_rgba(15,23,42,0.04)] p-5 sm:p-6 lg:p-8 transition-all duration-300 hover:shadow-[0_20px_50px_-12px_rgba(15,23,42,0.07)] hover:border-slate-300/80 ${className}`}>
      
      {/* Header Container Area */}
      {(title || action) && (
        <div className="flex items-center justify-between border-b border-slate-100/80 pb-4 mb-6 gap-4">
          {title && (
            <h3 className="text-base font-black tracking-tight text-slate-800 sm:text-lg">
              {title}
            </h3>
          )}
          {action && (
            <div className="flex items-center transition-transform duration-200 group-hover:translate-x-[-2px]">
              {action}
            </div>
          )}
        </div>
      )}

      {/* Main Inner Slot Context Area */}
      <div className="relative text-slate-600">
        {children}
      </div>
    </div>
  );
}

export default SectionCard;