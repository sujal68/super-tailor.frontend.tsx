import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import StatCard from "../components/StatCard";
import Chart from "../components/chart";
import SystemHealth from "../components/SystemHealth";
import RecentRegistrationsTable from "../components/RecentRegistrationsTable";
import PageTitle from "../components/PageTitle";
import customerCard from "../assets/total-customer-card.png";
import measurementCard from "../assets/total-maesurement.png";
import adminCard from "../assets/Total-admin-card.png";
import activityCard from "../assets/total-activity-card.png";
import GlobalFilters from "../components/GlobalFilters";
import { FilterState } from '../types';

export default function Dashboard(): React.JSX.Element {
    const [filters, setFilters] = useState<FilterState>({ dateRange: "30", business: "all", city: "all", status: "all" });
    const navigate = useNavigate();

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="px-4 sm:px-6 pb-6 pt-1"
        >

            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col lg:flex-row justify-between items-start mb-[22px] gap-5"
            >
                {/* Left Title */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <PageTitle 
                        title="Business Dashboard" 
                        subtitle="Overview of your tailoring business"
                    />
                    <p className="m-0 mt-2 text-xs text-[#8b7a63] opacity-70 font-sans">
                        Updated: {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} {new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}
                    </p>
                </motion.div>

                {/* Right Filters */}
                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="w-full lg:min-w-[520px] lg:w-auto"
                >
                    <GlobalFilters filters={filters} setFilters={setFilters} />
                </motion.div>
            </motion.div>

            {/* Business Overview Section */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mb-3"
            >
                <h2 className="text-[14px] sm:text-[15px] font-semibold text-[#6f5b3e] opacity-80 tracking-wide uppercase">
                    Business Overview
                </h2>
            </motion.div>

            {/* Stat Cards: 2 per row on mobile, 4 on desktop */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="grid grid-cols-2 min-[750px]:grid-cols-3 min-[1200px]:grid-cols-4 gap-3 sm:gap-4 xl:gap-5 w-full"
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <StatCard
                        image={customerCard}
                        alt="Total Tailor Shops"
                        subtitle="Across all registered businesses"
                        trend="3.2% this week"
                        trendDirection="up"
                        onClick={() => navigate('/dashboard/all-tailors')}
                    />
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <StatCard
                        image={measurementCard}
                        alt="Active Tailors"
                        subtitle="Currently operational"
                        trend="Stable"
                        trendDirection="stable"
                        onClick={() => navigate('/dashboard/all-tailors')}
                    />
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <StatCard
                        image={adminCard}
                        alt="Inactive Tailors"
                        subtitle="Temporarily closed"
                        trend="1.1% vs last month"
                        trendDirection="down"
                        onClick={() => navigate('/dashboard/all-tailors')}
                    />
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.0 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <StatCard
                        image={activityCard}
                        alt="Total Invoices Generated"
                        subtitle="Generated this year"
                        trend="5.8% this month"
                        trendDirection="up"
                        onClick={() => navigate('/dashboard/invoices')}
                    />
                </motion.div>
            </motion.div>

            {/* Charts: Single column on mobile/tablet, 2 columns on desktop */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
                className="mt-[25px] grid grid-cols-1 lg:grid-cols-2 gap-4 xl:gap-6 items-stretch"
            >
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.2 }}
                    whileHover={{ scale: 1.01 }}
                    className="flex"
                >
                    <Chart />
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.3 }}
                    whileHover={{ scale: 1.01 }}
                    className="flex"
                >
                    <SystemHealth />
                </motion.div>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
                className="mt-10"
            >
                <div className="font-['Inter',sans-serif] text-[#4e463e]">
                    <motion.div 
                        className="main-container max-w-[1154px] [body.sidebar-collapsed_&]:max-w-[1334px] mx-auto bg-gradient-to-b from-white/60 to-white/30 rounded-[18px] p-[18px] sm:p-[26px] border border-white transition-[max-width] duration-350 ease-in-out"
                        whileHover={{ 
                            borderColor: 'rgba(111, 91, 62, 0.3)',
                            backgroundColor: 'rgba(255, 255, 255, 0.4)'
                        }}
                        transition={{ duration: 0.3 }}
                    >
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.5 }}
                            className="mb-4"
                        >
                            <h3 className="text-lg font-semibold text-[#6f5b3e] mb-2">Recent Registrations</h3>
                            <p className="text-sm text-[#8b7a63]">Latest tailor shop registrations</p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.6 }}
                        >
                            <RecentRegistrationsTable />
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>

        </motion.div>
    );
}