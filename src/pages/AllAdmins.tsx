import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Search, Filter } from 'lucide-react';
import AdminDetailSidebar from '../components/AdminDetailSidebar';
import CustomDropdown from '../components/CustomDropdown';
import EditAdminModal from '../components/EditAdminModal';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import PageTitle from '../components/PageTitle';

interface Admin {
  id: number;
  name: string;
  email: string;
  mobile: string;
  status: string;
  img: string;
}

const AllAdmins: React.FC = () => {
  const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<Admin | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingAdmin, setDeletingAdmin] = useState<Admin | null>(null);
  const [allAdmins, setAllAdmins] = useState<Admin[]>([
    { id: 1, name: 'John Smith', email: 'john.smith@admin.com', mobile: '9876543210', status: 'active', img: 'https://i.pravatar.cc/150?u=admin1' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah.johnson@admin.com', mobile: '9876543211', status: 'active', img: 'https://i.pravatar.cc/150?u=admin2' },
    { id: 3, name: 'Mike Wilson', email: 'mike.wilson@admin.com', mobile: '9876543212', status: 'inactive', img: 'https://i.pravatar.cc/150?u=admin3' },
    { id: 4, name: 'Emily Davis', email: 'emily.davis@admin.com', mobile: '9876543213', status: 'active', img: 'https://i.pravatar.cc/150?u=admin4' },
    { id: 5, name: 'David Brown', email: 'david.brown@admin.com', mobile: '9876543214', status: 'active', img: 'https://i.pravatar.cc/150?u=admin5' },
    { id: 6, name: 'Lisa Garcia', email: 'lisa.garcia@admin.com', mobile: '9876543215', status: 'inactive', img: 'https://i.pravatar.cc/150?u=admin6' },
  ]);

  const handleViewDetails = (admin: Admin) => {
    setSelectedAdmin(admin);
    setIsSidebarOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
    document.body.style.overflow = 'auto';
  };

  const handleEditAdmin = (admin: Admin) => {
    setEditingAdmin(admin);
    setIsEditModalOpen(true);
  };

  const handleSaveAdmin = (updatedAdmin: Admin) => {
    setAllAdmins(prev => prev.map(a => a.id === updatedAdmin.id ? updatedAdmin : a));
    setIsEditModalOpen(false);
    setEditingAdmin(null);
  };

  const handleDeleteAdmin = (admin: Admin) => {
    setDeletingAdmin(admin);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    // Just close modal without deleting
    setIsDeleteModalOpen(false);
    setDeletingAdmin(null);
  };

  const filteredAdmins = useMemo(() => {
    return allAdmins.filter(admin => {
      const matchesSearch = searchTerm === '' ||
        admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        admin.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === 'all' || admin.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter, roleFilter, allAdmins]);

  const statuses = [...new Set(allAdmins.map(a => a.status))];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    ...statuses.map(status => ({ value: status, label: status.charAt(0).toUpperCase() + status.slice(1) }))
  ];

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
            title="System Administrators"
          />
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
              placeholder="Search admins, emails..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className={`pl-10 pr-4 py-2.5 bg-white/60 border-2 border-[#d6c8b8] rounded-xl text-sm text-[#6f5b3e] placeholder-[#8b7a63]/60 focus:outline-none focus:ring-2 focus:ring-[#6f5b3e]/30 focus:border-[#6f5b3e] transition-all duration-300 ${isSearchFocused ? 'w-80 sm:w-96' : 'w-64 sm:w-80'
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
          className="main-container max-w-[1154px] [body.sidebar-collapsed_&]:max-w-[1334px] mx-auto bg-gradient-to-b from-white/60 to-white/30 rounded-[18px] p-[18px] sm:p-[26px] border-2 border-dashed border-[#d6c8b8] transition-[max-width] duration-350 ease-in-out hover:shadow-lg smooth-transition"
          whileHover={{ 
            borderColor: 'rgba(111, 91, 62, 0.4)',
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
            <p className="text-sm text-[#8b7a63] mb-1">Complete list of system administrators</p>
            <p className="text-xs text-[#8b7a63] opacity-70">Showing: {filteredAdmins.length} of {allAdmins.length} admins</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="overflow-x-auto max-sm:overflow-x-scroll"
          >
            <table className="w-full border-collapse min-w-[900px]">
              <thead>
                <tr className="text-left">
                  <th className="text-[0.75rem] sm:text-[0.82rem] font-semibold text-[#8f8579] px-2 sm:px-3.5 py-2 sm:py-3 border-b border-[#e3dbd0]">Administrator</th>
                  <th className="text-[0.75rem] sm:text-[0.82rem] font-semibold text-[#8f8579] px-2 sm:px-3.5 py-2 sm:py-3 border-b border-[#e3dbd0]">Email</th>
                  <th className="text-[0.75rem] sm:text-[0.82rem] font-semibold text-[#8f8579] px-2 sm:px-3.5 py-2 sm:py-3 border-b border-[#e3dbd0]">Mobile</th>
                  <th className="text-[0.75rem] sm:text-[0.82rem] font-semibold text-[#8f8579] px-2 sm:px-3.5 py-2 sm:py-3 border-b border-[#e3dbd0]">Status</th>
                  <th className="text-[0.75rem] sm:text-[0.82rem] font-semibold text-[#8f8579] px-2 sm:px-3.5 py-2 sm:py-3 border-b border-[#e3dbd0]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAdmins.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-[#8b7a63]">
                      <div className="flex flex-col items-center gap-2">
                        <Filter className="w-8 h-8 opacity-50" />
                        <p>No administrators found matching your criteria</p>
                        <button
                          onClick={() => { setSearchTerm(''); setStatusFilter('all'); }}
                          className="text-sm text-[#6f5b3e] hover:underline"
                        >
                          Clear filters
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : filteredAdmins.map((admin: Admin) => (
                  <tr key={admin.id} className="bg-transparent transition-all duration-300 hover:bg-white/55 group hover:shadow-sm">
                    <td className="px-2 sm:px-3.5 py-2 sm:py-3 text-[0.78rem] sm:text-[0.85rem] border-b border-[#e3dbd0]">
                      <div className="flex items-center gap-2 sm:gap-2.5 font-medium">
                        <div className="relative">
                          <img
                            src={admin.img}
                            className="w-[22px] h-[22px] sm:w-[26px] sm:h-[26px] rounded-full ring-2 ring-white group-hover:ring-[#6f5b3e] transition-all duration-300"
                            alt=""
                          />
                          <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-green-500 rounded-full border border-white opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <span className="truncate group-hover:text-[#6f5b3e] transition-colors">{admin.name}</span>
                      </div>
                    </td>
                    <td className="px-2 sm:px-3.5 py-2 sm:py-3 text-[0.78rem] sm:text-[0.85rem] border-b border-[#e3dbd0] group-hover:text-[#6f5b3e] transition-colors">{admin.email}</td>
                    <td className="px-2 sm:px-3.5 py-2 sm:py-3 text-[0.78rem] sm:text-[0.85rem] border-b border-[#e3dbd0] group-hover:text-[#6f5b3e] transition-colors">{admin.mobile}</td>
                    <td className="px-2 sm:px-3.5 py-2 sm:py-3 text-[0.78rem] sm:text-[0.85rem] border-b border-[#e3dbd0]">
                      <span className={`px-1.5 sm:px-2 py-[3px] rounded-md text-[0.65rem] sm:text-[0.7rem] font-semibold capitalize border border-dashed whitespace-nowrap transition-all duration-300 group-hover:scale-105 ${admin.status === 'active' ? 'bg-[#e7f3ed] text-[#2f6f53] border-[#2f6f53]/30 group-hover:shadow-md' :
                          'bg-[#fff2db] text-[#b88924] border-[#b88924]/30 group-hover:shadow-md'
                        }`}>
                        {admin.status}
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
                          onClick={() => handleViewDetails(admin)}
                        >
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z">
                            <animate attributeName="stroke-dasharray" values="0 50;50 0" dur="2s" repeatCount="indefinite" />
                          </path>
                          <circle cx="12" cy="12" r="3">
                            <animate attributeName="r" values="3;3.5;3" dur="1.5s" repeatCount="indefinite" />
                          </circle>
                        </svg>
                        <svg
                          width="13"
                          height="13"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="cursor-pointer sm:w-[14px] sm:h-[14px] hover:stroke-[#6f5b3e] hover:scale-110 transition-all duration-200"
                          onClick={() => handleEditAdmin(admin)}
                        >
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7">
                            <animate attributeName="stroke-dasharray" values="0 60;60 0" dur="2.5s" repeatCount="indefinite" />
                          </path>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z">
                            <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" />
                          </path>
                        </svg>
                        <svg
                          width="13"
                          height="13"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="cursor-pointer sm:w-[14px] sm:h-[14px] hover:stroke-red-500 hover:scale-110 transition-all duration-200"
                          onClick={() => handleDeleteAdmin(admin)}
                        >
                          <polyline points="3 6 5 6 21 6">
                            <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />
                          </polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2">
                            <animate attributeName="stroke-dasharray" values="0 80;80 0" dur="3s" repeatCount="indefinite" />
                          </path>
                        </svg>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-[18px] flex justify-center items-center gap-3 text-[0.8rem] text-[#8f8579]"
          >
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <ChevronLeft size={16} className="cursor-pointer hover:text-[#6f5b3e]" />
            </motion.div>
            <motion.span 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-2 py-1 cursor-pointer bg-[#6f5b3e] rounded-md text-white font-semibold"
            >
              1
            </motion.span>
            <motion.span 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-2 py-1 cursor-pointer hover:text-[#6f5b3e]"
            >
              2
            </motion.span>
            <motion.span 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-2 py-1 cursor-pointer hover:text-[#6f5b3e]"
            >
              3
            </motion.span>
            <span className="px-1">...</span>
            <motion.span 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-2 py-1 cursor-pointer hover:text-[#6f5b3e]"
            >
              10
            </motion.span>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <ChevronRight size={16} className="cursor-pointer hover:text-[#6f5b3e]" />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      <AdminDetailSidebar
        isOpen={isSidebarOpen}
        onClose={handleCloseSidebar}
        admin={selectedAdmin}
      />

      <EditAdminModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        admin={editingAdmin}
        onSave={handleSaveAdmin}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Administrator"
        message={`Are you sure you want to delete ${deletingAdmin?.name}? This action cannot be undone.`}
      />
    </motion.div>
  );
};

export default AllAdmins;