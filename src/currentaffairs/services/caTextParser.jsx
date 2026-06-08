import React from "react";

export const caTextParser = {
  /**
   * Parses Markdown features including bold (**), numbered pointers, and nested sub-points.
   */
  parseToJSX(text = "") {
    if (!text) return "";

    const lines = text.split("\n");

    return lines.map((line, index) => {
      let currentLine = line;
      if (!currentLine.trim()) return <div key={index} className="h-2" />;

      // 1. Detect nested alphabetic sub-points (e.g., "    a. ", "  b. ")
      const isSubPoint = /^\s+([a-z])\.\s/.test(currentLine);
      
      // Clean up the sub-point display marker spaces for the text loop if needed
      if (isSubPoint) {
        currentLine = currentLine.trim();
      }

      // 2. Parse out **Bold Text** tokens
      const boldRegex = /\*\*(.*?)\*\*/g;
      const parts = [];
      let lastIndex = 0;
      let match;

      while ((match = boldRegex.exec(currentLine)) !== null) {
        if (match.index > lastIndex) {
          parts.push(currentLine.substring(lastIndex, match.index));
        }
        parts.push(
          <strong key={match.index} className="font-extrabold text-slate-900">
            {match[1]}
          </strong>
        );
        lastIndex = boldRegex.lastIndex;
      }
      
      if (lastIndex < currentLine.length) {
        parts.push(currentLine.substring(lastIndex));
      }

      // 3. Assemble components based on typography traits
      if (isSubPoint) {
        return (
          <div key={index} className="pl-8 my-0.5 text-slate-600 font-normal text-[11px] leading-relaxed">
            {parts} {/* 🔥 Fixed: Removed the invalid .trim() from the array */}
          </div>
        );
      }

      const isNumberedList = /^\d+\.\s/.test(currentLine.trim());
      if (isNumberedList) {
        return (
          <div key={index} className="pl-4 -indent-4 my-1 text-slate-700 font-semibold">
            {parts}
          </div>
        );
      }

      return (
        <p key={index} className="my-0.5 text-slate-600 leading-relaxed">
          {parts}
        </p>
      );
    });
  }
};

export default caTextParser;