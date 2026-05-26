import React from 'react';

function PageHeader({ title, description, actions }) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8 sm:mb-10 animate-fade-in px-1">
      <div className="space-y-1 max-w-2xl">
        <h2 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl bg-gradient-to-r from-slate-900 to-slate-800 bg-clip-text text-transparent">
          {title}
        </h2>
        {description && (
          <p className="text-sm font-medium text-slate-400 sm:text-base leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {actions && (
        <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto overflow-x-auto md:overflow-visible pb-2 md:pb-0 [&::-webkit-scrollbar]:hidden">
          {actions}
        </div>
      )}
    </div>
  );
}

export default PageHeader;