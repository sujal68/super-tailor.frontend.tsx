import React from 'react';
import { motion } from 'framer-motion';
import PageTitle from '../components/PageTitle';

export default function Reports(): React.JSX.Element {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="px-4 sm:px-6 pb-6 pt-1"
    >
      <PageTitle 
        title="Analytics Reports" 
        subtitle="Comprehensive business insights and analytics"
      />
      <div className="font-['Inter',sans-serif] text-[#4e463e]">
        <div className="main-container max-w-[1154px] [body.sidebar-collapsed_&]:max-w-[1334px] mx-auto bg-gradient-to-b from-white/60 to-white/30 rounded-[18px] p-[18px] sm:p-[26px] border-2 border-dashed border-[#d6c8b8] transition-[max-width] duration-350 ease-in-out">
          <p className="text-[#8b7a63]">Advanced reporting features coming soon...</p>
        </div>
      </div>
    </motion.div>
  );
}