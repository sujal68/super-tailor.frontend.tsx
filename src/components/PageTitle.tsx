import React from 'react';
import { motion } from 'framer-motion';
import { PageTitleProps } from '../types';

export default function PageTitle({ title, subtitle }: PageTitleProps): React.JSX.Element {
  const titleParts = title.split(' ');
  const firstPart = titleParts.slice(0, -1).join(' ');
  const lastPart = titleParts[titleParts.length - 1];

  return (
    <div>
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-xl sm:text-2xl lg:text-3xl font-light text-[#6f5b3e] tracking-tight"
      >
        {firstPart && (
          <>
            {firstPart} <span className="font-semibold text-[#8b7a63]">{lastPart}</span>
          </>
        )}
        {!firstPart && <span className="font-semibold text-[#8b7a63]">{lastPart}</span>}
      </motion.h1>
      {subtitle && <p className="text-[#8b7a63] mt-1 opacity-80 text-sm">{subtitle}</p>}
    </div>
  );
}