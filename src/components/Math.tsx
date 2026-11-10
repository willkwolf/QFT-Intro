'use client';

import React, { useEffect, useRef } from 'react';
import katex from 'katex';

interface MathProps {
  formula?: string;
  math?: string;
  block?: boolean;
  inline?: boolean;
}

export default function Math({ formula, math, block, inline }: MathProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const expr = formula ?? math ?? '';
  const displayMode = block !== undefined ? block : inline !== undefined ? !inline : false;

  useEffect(() => {
    if (containerRef.current && expr) {
      try {
        katex.render(expr, containerRef.current, {
          displayMode: displayMode,
          throwOnError: false,
        });
      } catch (err) {
        console.error(err);
      }
    }
  }, [expr, displayMode]);

  return (
    <span 
      ref={containerRef} 
      className={displayMode ? 'block my-3 math-block text-center text-sm md:text-base overflow-x-auto w-full select-all' : 'inline-block select-all'} 
    />
  );
}
