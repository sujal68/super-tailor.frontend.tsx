import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import TailorDetailSidebar from './TailorDetailSidebar';

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

interface RecentRegistrationsTableProps {
  filteredTailors?: TailorShop[];
}

const RecentRegistrationsTable: React.FC<RecentRegistrationsTableProps> = ({ filteredTailors }) => {
  const [selectedTailor, setSelectedTailor] = useState<TailorShop | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleViewDetails = (tailor: TailorShop) => {
    setSelectedTailor(tailor);
    setIsSidebarOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
    document.body.style.overflow = 'auto';
  };

  const defaultTailors: TailorShop[] = [
    { id: 9, name: 'Rajesh Tailors', owner: 'Rajesh Kumar', city: 'Mumbai', customers: 0, orders: 0, revenue: 0, joined: '2 hours ago', status: 'active', img: 'https://i.pravatar.cc/150?u=9' },
    { id: 10, name: 'Elite Stitching', owner: 'Amit Sharma', city: 'Delhi', customers: 0, orders: 0, revenue: 0, joined: '5 hours ago', status: 'active', img: 'https://i.pravatar.cc/150?u=10' },
    { id: 11, name: 'Fashion Hub', owner: 'Priya Patel', city: 'Bangalore', customers: 0, orders: 0, revenue: 0, joined: '1 day ago', status: 'pending', img: 'https://i.pravatar.cc/150?u=11' },
    { id: 12, name: 'Royal Fabrics', owner: 'Vikram Singh', city: 'Pune', customers: 0, orders: 0, revenue: 0, joined: '1 day ago', status: 'active', img: 'https://i.pravatar.cc/150?u=12' },
    { id: 13, name: 'Modern Tailors', owner: 'Suresh Reddy', city: 'Chennai', customers: 0, orders: 0, revenue: 0, joined: '2 days ago', status: 'active', img: 'https://i.pravatar.cc/150?u=13' }
  ];

  const recentTailors = filteredTailors || defaultTailors;

  return (
    <>
      <div className="overflow-x-auto max-sm:overflow-x-scroll">
        <table className="w-full border-collapse min-w-[800px]">
          <thead>
            <tr className="text-left">
              <th className="text-[0.75rem] sm:text-[0.82rem] font-semibold text-[#8f8579] px-2 sm:px-3.5 py-2 sm:py-3 border-b-2 border-[#e3dbd0]">Tailor Shop</th>
              <th className="text-[0.75rem] sm:text-[0.82rem] font-semibold text-[#8f8579] px-2 sm:px-3.5 py-2 sm:py-3 border-b-2 border-[#e3dbd0]">Owner</th>
              <th className="text-[0.75rem] sm:text-[0.82rem] font-semibold text-[#8f8579] px-2 sm:px-3.5 py-2 sm:py-3 border-b-2 border-[#e3dbd0] hidden md:table-cell">City</th>
              <th className="text-[0.75rem] sm:text-[0.82rem] font-semibold text-[#8f8579] px-2 sm:px-3.5 py-2 sm:py-3 border-b-2 border-[#e3dbd0]">Joined</th>
              <th className="text-[0.75rem] sm:text-[0.82rem] font-semibold text-[#8f8579] px-2 sm:px-3.5 py-2 sm:py-3 border-b-2 border-[#e3dbd0]">Status</th>
              <th className="text-[0.75rem] sm:text-[0.82rem] font-semibold text-[#8f8579] px-2 sm:px-3.5 py-2 sm:py-3 border-b-2 border-[#e3dbd0]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {recentTailors.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-[#8b7a63]">
                  <div className="flex flex-col items-center gap-2">
                    <Filter className="w-8 h-8 opacity-50" />
                    <p>No registrations found matching your criteria</p>
                  </div>
                </td>
              </tr>
            ) : recentTailors.map((tailor: TailorShop) => (
              <tr key={tailor.id} className="bg-transparent transition-all duration-300 hover:bg-white/55 group hover:shadow-sm">
                <td className="px-2 sm:px-3.5 py-2 sm:py-3 text-[0.78rem] sm:text-[0.85rem] border-b border-[#e3dbd0]">
                  <div className="flex items-center gap-2 sm:gap-2.5 font-medium">
                    <div className="relative">
                      <img
                        src={tailor.img}
                        className="w-[22px] h-[22px] sm:w-[26px] sm:h-[26px] rounded-full ring-2 ring-white group-hover:ring-[#6f5b3e] transition-all duration-300"
                        alt=""
                      />
                      <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-green-500 rounded-full border border-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <span className="truncate group-hover:text-[#6f5b3e] transition-colors">{tailor.name}</span>
                  </div>
                </td>
                <td className="px-2 sm:px-3.5 py-2 sm:py-3 text-[0.78rem] sm:text-[0.85rem] border-b border-[#e3dbd0] group-hover:text-[#6f5b3e] transition-colors">{tailor.owner}</td>
                <td className="px-2 sm:px-3.5 py-2 sm:py-3 text-[0.78rem] sm:text-[0.85rem] border-b border-[#e3dbd0] hidden md:table-cell group-hover:text-[#6f5b3e] transition-colors">{tailor.city}</td>
                <td className="px-2 sm:px-3.5 py-2 sm:py-3 text-[0.78rem] sm:text-[0.85rem] border-b border-[#e3dbd0] whitespace-nowrap">
                  <span className="flex items-center gap-1.5 group-hover:text-[#6f5b3e] transition-colors">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    {tailor.joined}
                  </span>
                </td>
                <td className="px-2 sm:px-3.5 py-2 sm:py-3 text-[0.78rem] sm:text-[0.85rem] border-b border-[#e3dbd0]">
                  <span className={`px-1.5 sm:px-2 py-[3px] rounded-md text-[0.65rem] sm:text-[0.7rem] font-semibold capitalize border border-dashed whitespace-nowrap transition-all duration-300 group-hover:scale-105 ${tailor.status === 'active' ? 'bg-[#e7f3ed] text-[#2f6f53] border-[#2f6f53]/30 group-hover:shadow-md' :
                    tailor.status === 'pending' ? 'bg-[#fff2db] text-[#b88924] border-[#b88924]/30 group-hover:shadow-md' :
                      'bg-[#fdeaea] text-[#a64444] border-[#a64444]/30 group-hover:shadow-md'
                    }`}>
                    {tailor.status}
                  </span>
                </td>
                <td className="px-2 sm:px-3.5 py-2 sm:py-3 text-[0.78rem] sm:text-[0.85rem] border-b border-[#e3dbd0]">
                  <div className="flex gap-2 sm:gap-2.5 text-[#8a7b6a] opacity-60 group-hover:opacity-100 transition-opacity">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="cursor-pointer sm:w-4 sm:h-4 hover:stroke-[#6f5b3e] hover:scale-110 transition-all duration-200"
                      onClick={() => handleViewDetails(tailor)}
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z">
                        <animate attributeName="stroke-dasharray" values="0 50;50 0" dur="2s" repeatCount="indefinite" />
                      </path>
                      <circle cx="12" cy="12" r="3">
                        <animate attributeName="r" values="3;3.5;3" dur="1.5s" repeatCount="indefinite" />
                      </circle>
                    </svg>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-[18px] flex justify-center items-center gap-3 text-[0.8rem] text-[#8f8579]">
        <button className="p-1.5 rounded-lg hover:bg-white/60 transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed">
          <ChevronLeft size={16} className="cursor-pointer hover:text-[#6f5b3e]" />
        </button>
        <span className="px-2.5 py-1.5 cursor-pointer bg-[#6f5b3e] rounded-md text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105">1</span>
        <span className="px-2.5 py-1.5 cursor-pointer hover:text-[#6f5b3e] hover:bg-white/40 rounded-md transition-all duration-200">2</span>
        <button className="p-1.5 rounded-lg hover:bg-white/60 transition-all duration-200 hover:scale-110">
          <ChevronRight size={16} className="cursor-pointer hover:text-[#6f5b3e]" />
        </button>
      </div>

      <TailorDetailSidebar
        isOpen={isSidebarOpen}
        onClose={handleCloseSidebar}
        tailor={selectedTailor}
      />
    </>
  );
};

export default RecentRegistrationsTable;