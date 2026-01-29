import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Filter } from "lucide-react";
import RecentRegistrationsTable from "../components/RecentRegistrationsTable";
import PageTitle from "../components/PageTitle";
import CustomDropdown from "../components/CustomDropdown";
import CityDropdown from '../components/CityDropdown';
import { getCityOptions } from '../utils/cities';

interface TailorShop {
  id: number;
  name: string;
  owner: string;
  city: string;
  customers: number;
  orders: number;
  revenue: number;
  status: string;
  img: string;
  joined?: string;
}

export default function RecentRegistrations(): React.JSX.Element {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [cityFilter, setCityFilter] = useState('all');
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    const recentTailors: TailorShop[] = [
        { id: 9, name: 'Rajesh Tailors', owner: 'Rajesh Kumar', city: 'Mumbai', customers: 0, orders: 0, revenue: 0, joined: '2 hours ago', status: 'active', img: 'https://i.pravatar.cc/150?u=9' },
        { id: 10, name: 'Elite Stitching', owner: 'Amit Sharma', city: 'Delhi', customers: 0, orders: 0, revenue: 0, joined: '5 hours ago', status: 'active', img: 'https://i.pravatar.cc/150?u=10' },
        { id: 11, name: 'Fashion Hub', owner: 'Priya Patel', city: 'Bangalore', customers: 0, orders: 0, revenue: 0, joined: '1 day ago', status: 'pending', img: 'https://i.pravatar.cc/150?u=11' },
        { id: 12, name: 'Royal Fabrics', owner: 'Vikram Singh', city: 'Pune', customers: 0, orders: 0, revenue: 0, joined: '1 day ago', status: 'active', img: 'https://i.pravatar.cc/150?u=12' },
        { id: 13, name: 'Modern Tailors', owner: 'Suresh Reddy', city: 'Chennai', customers: 0, orders: 0, revenue: 0, joined: '2 days ago', status: 'active', img: 'https://i.pravatar.cc/150?u=13' }
    ];

    const filteredTailors = useMemo(() => {
        return recentTailors.filter(tailor => {
            const matchesSearch = searchTerm === '' ||
                tailor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                tailor.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
                tailor.city.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesStatus = statusFilter === 'all' || tailor.status === statusFilter;
            const matchesCity = cityFilter === 'all' || tailor.city.toLowerCase() === cityFilter.toLowerCase();

            return matchesSearch && matchesStatus && matchesCity;
        });
    }, [searchTerm, statusFilter, cityFilter]);

    const cities = [...new Set(recentTailors.map(t => t.city))];
    const statuses = [...new Set(recentTailors.map(t => t.status))];

    const statusOptions = [
        { value: 'all', label: 'All Status' },
        ...statuses.map(status => ({ value: status, label: status.charAt(0).toUpperCase() + status.slice(1) }))
    ];

    const cityOptions = getCityOptions();

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
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <PageTitle 
                        title="Recent Registrations" 
                        subtitle="Latest tailor shop registrations"
                    />
                    <p className="m-0 mt-2 text-xs text-[#8b7a63] opacity-70 font-sans">
                        Showing: {filteredTailors.length} of {recentTailors.length} registrations
                    </p>
                </motion.div>
                
                {/* Search & Filters */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col sm:flex-row gap-3 sm:gap-4"
                >
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8b7a63] w-4 h-4 z-10" />
                        <input
                            type="text"
                            placeholder="Search tailors, owners, cities..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onFocus={() => setIsSearchFocused(true)}
                            onBlur={() => setIsSearchFocused(false)}
                            className={`pl-10 pr-4 py-2.5 bg-white/60 border-2 border-[#d6c8b8] rounded-xl text-sm text-[#6f5b3e] placeholder-[#8b7a63]/60 focus:outline-none focus:ring-2 focus:ring-[#6f5b3e]/30 focus:border-[#6f5b3e] transition-all duration-300 ${
                                isSearchFocused ? 'w-80 sm:w-96' : 'w-64 sm:w-80'
                            }`}
                        />
                    </div>

                    <div className="flex gap-2">
                        <CustomDropdown
                            options={statusOptions}
                            value={statusFilter}
                            onChange={setStatusFilter}
                            placeholder="All Status"
                        />

                        <CityDropdown
                            value={cityFilter}
                            onChange={setCityFilter}
                            placeholder="All Cities"
                            searchable={true}
                            includeAll={true}
                        />
                    </div>
                </motion.div>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="font-['Inter',sans-serif] text-[#4e463e]"
            >
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
                        transition={{ delay: 0.6 }}
                        className="mb-4"
                    >
                        <h3 className="text-lg font-semibold text-[#6f5b3e] mb-2">Recent Registrations</h3>
                        <p className="text-sm text-[#8b7a63]">Latest tailor shop registrations</p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                    >
                        <RecentRegistrationsTable filteredTailors={filteredTailors} />
                    </motion.div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}