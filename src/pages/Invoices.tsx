import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Search, Filter, Eye, FileText, Download, Printer } from 'lucide-react';
import PageTitle from '../components/PageTitle';
import StatCard from '../components/StatCard';
import CustomDropdown from '../components/CustomDropdown';
import CityDropdown from '../components/CityDropdown';
import InvoiceDetailSidebar from '../components/InvoiceDetailSidebar';
import { getCityOptions } from '../utils/cities';

interface Invoice {
  id: number;
  invoiceNumber: string;
  tailorName: string;
  customerName: string;
  customerMobile: string;
  totalAmount: number;
  paidAmount: number;
  dueAmount: number;
  paymentStatus: 'paid' | 'partial' | 'due';
  createdBy: string;
  invoiceDate: string;
  img: string;
}

const Invoices: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [tailorFilter, setTailorFilter] = useState('all');
  const [dateRange, setDateRange] = useState('all');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const allInvoices: Invoice[] = [
    { id: 1, invoiceNumber: 'INV-2024-001', tailorName: 'Royal Tailors', customerName: 'Rahul Sharma', customerMobile: '+91 98765 43210', totalAmount: 2500, paidAmount: 2500, dueAmount: 0, paymentStatus: 'paid', createdBy: 'Admin', invoiceDate: '2024-03-15', img: 'https://i.pravatar.cc/150?u=i1' },
    { id: 2, invoiceNumber: 'INV-2024-002', tailorName: 'Elite Stitch', customerName: 'Priya Patel', customerMobile: '+91 87654 32109', totalAmount: 1800, paidAmount: 900, dueAmount: 900, paymentStatus: 'partial', createdBy: 'Manager', invoiceDate: '2024-03-14', img: 'https://i.pravatar.cc/150?u=i2' },
    { id: 3, invoiceNumber: 'INV-2024-003', tailorName: 'Urban Fit', customerName: 'Amit Kumar', customerMobile: '+91 76543 21098', totalAmount: 1200, paidAmount: 0, dueAmount: 1200, paymentStatus: 'due', createdBy: 'Admin', invoiceDate: '2024-03-10', img: 'https://i.pravatar.cc/150?u=i3' },
    { id: 4, invoiceNumber: 'INV-2024-004', tailorName: 'Fashion Hub', customerName: 'Sneha Gupta', customerMobile: '+91 65432 10987', totalAmount: 3200, paidAmount: 3200, dueAmount: 0, paymentStatus: 'paid', createdBy: 'Admin', invoiceDate: '2024-03-12', img: 'https://i.pravatar.cc/150?u=i4' },
    { id: 5, invoiceNumber: 'INV-2024-005', tailorName: 'Prime Cut', customerName: 'Vikram Singh', customerMobile: '+91 54321 09876', totalAmount: 2800, paidAmount: 1400, dueAmount: 1400, paymentStatus: 'partial', createdBy: 'Manager', invoiceDate: '2024-03-11', img: 'https://i.pravatar.cc/150?u=i5' },
    { id: 6, invoiceNumber: 'INV-2024-006', tailorName: 'Modern Tailors', customerName: 'Anita Desai', customerMobile: '+91 43210 98765', totalAmount: 1500, paidAmount: 0, dueAmount: 1500, paymentStatus: 'due', createdBy: 'Admin', invoiceDate: '2024-03-13', img: 'https://i.pravatar.cc/150?u=i6' }
  ];

  const filteredInvoices = useMemo(() => {
    return allInvoices.filter(invoice => {
      const matchesSearch = searchTerm === '' ||
        invoice.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.customerMobile.includes(searchTerm) ||
        invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.tailorName.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === 'all' || invoice.paymentStatus === statusFilter;
      const matchesTailor = tailorFilter === 'all' || invoice.tailorName.toLowerCase() === tailorFilter.toLowerCase();

      return matchesSearch && matchesStatus && matchesTailor;
    });
  }, [searchTerm, statusFilter, tailorFilter, allInvoices]);

  const tailors = [...new Set(allInvoices.map(i => i.tailorName))];
  const statuses = [...new Set(allInvoices.map(i => i.paymentStatus))];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    ...statuses.map(status => ({ value: status, label: status.charAt(0).toUpperCase() + status.slice(1) }))
  ];

  const tailorOptions = [
    { value: 'all', label: 'All Tailors' },
    ...tailors.map(tailor => ({ value: tailor.toLowerCase(), label: tailor }))
  ];

  const dateOptions = [
    { value: 'all', label: 'All Time' },
    { value: '7', label: 'Last 7 Days' },
    { value: '30', label: 'Last 30 Days' },
    { value: '90', label: 'Last 3 Months' }
  ];

  // Calculate summary stats
  const totalInvoices = filteredInvoices.length;
  const totalRevenue = filteredInvoices.reduce((sum, inv) => sum + inv.totalAmount, 0);
  const totalPaid = filteredInvoices.reduce((sum, inv) => sum + inv.paidAmount, 0);
  const totalDue = filteredInvoices.reduce((sum, inv) => sum + inv.dueAmount, 0);

  const handleViewInvoice = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setIsSidebarOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
    setSelectedInvoice(null);
    document.body.style.overflow = 'auto';
  };

  const handlePrintInvoice = (invoice: Invoice) => {
    console.log('Print invoice:', invoice);
  };

  const handleDownloadInvoice = (invoice: Invoice) => {
    console.log('Download invoice:', invoice);
  };

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
            title="Invoice Management"
            subtitle="Super Admin view of all invoices across tailors"
          />
          <p className="m-0 mt-2 text-xs text-[#8b7a63] opacity-70 font-sans">
            Total: {totalInvoices} invoices • Revenue: ₹{totalRevenue.toLocaleString()}
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
              placeholder="Search invoices, customers, mobile..."
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
              options={dateOptions}
              value={dateRange}
              onChange={setDateRange}
              placeholder="All Time"
            />
            <CustomDropdown
              options={statusOptions}
              value={statusFilter}
              onChange={setStatusFilter}
              placeholder="All Status"
            />
            <CustomDropdown
              options={tailorOptions}
              value={tailorFilter}
              onChange={setTailorFilter}
              placeholder="All Tailors"
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Summary Cards */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-2 min-[750px]:grid-cols-3 min-[1200px]:grid-cols-4 gap-3 sm:gap-4 xl:gap-5 w-full mb-6"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.02 }}
        >
          <div className="relative w-full h-full rounded-[26px] overflow-hidden transition-all duration-500 select-none shadow-[0_6px_18px_rgba(0,0,0,0.18),0_2px_6px_rgba(0,0,0,0.12)] hover:-translate-y-[4px] hover:shadow-[0_12px_28px_rgba(0,0,0,0.28),0_8px_16px_rgba(0,0,0,0.18)] max-sm:rounded-[20px] group cursor-pointer bg-gradient-to-br from-blue-50 to-blue-100">
            <div className="absolute inset-0 flex flex-col justify-center pointer-events-none text-[#213c58ff] font-['Inter',sans-serif] tracking-[0.3px]" style={{ padding: 'clamp(8px, 2vw, 22px)' }}>
              <div className="mb-1 w-fit shadow-[inset_0_0_0_1px_rgba(255,255,255,0.35)] transition-all duration-500 group-hover:scale-110 bg-[rgba(59,110,165,0.18)] text-[#213c58ff]" style={{ fontSize: 'clamp(14px, 3vw, 25px)', padding: 'clamp(3px, 0.8vw, 14px) clamp(5px, 1.2vw, 16px)', borderRadius: 'clamp(6px, 1.2vw, 18px)' }}>
                <FileText size={20} />
              </div>
              <div className="font-bold leading-none transition-all duration-500 group-hover:scale-105" style={{ fontSize: 'clamp(16px, 3.5vw, 30px)' }}>
                {totalInvoices}
              </div>
              <div className="mt-1 opacity-90" style={{ fontSize: 'clamp(8px, 1.8vw, 18px)' }}>Total Invoices</div>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7 }}
          whileHover={{ scale: 1.02 }}
        >
          <div className="relative w-full h-full rounded-[26px] overflow-hidden transition-all duration-500 select-none shadow-[0_6px_18px_rgba(0,0,0,0.18),0_2px_6px_rgba(0,0,0,0.12)] hover:-translate-y-[4px] hover:shadow-[0_12px_28px_rgba(0,0,0,0.28),0_8px_16px_rgba(0,0,0,0.18)] max-sm:rounded-[20px] group cursor-pointer bg-gradient-to-br from-green-50 to-green-100">
            <div className="absolute inset-0 flex flex-col justify-center pointer-events-none text-[#29431fff] font-['Inter',sans-serif] tracking-[0.3px]" style={{ padding: 'clamp(8px, 2vw, 22px)' }}>
              <div className="mb-1 w-fit shadow-[inset_0_0_0_1px_rgba(255,255,255,0.35)] transition-all duration-500 group-hover:scale-110 bg-[rgba(106,143,91,0.18)] text-[#29431fff]" style={{ fontSize: 'clamp(14px, 3vw, 25px)', padding: 'clamp(3px, 0.8vw, 14px) clamp(5px, 1.2vw, 16px)', borderRadius: 'clamp(6px, 1.2vw, 18px)' }}>
                ₹
              </div>
              <div className="font-bold leading-none transition-all duration-500 group-hover:scale-105" style={{ fontSize: 'clamp(16px, 3.5vw, 30px)' }}>
                ₹{(totalRevenue / 1000).toFixed(0)}K
              </div>
              <div className="mt-1 opacity-90" style={{ fontSize: 'clamp(8px, 1.8vw, 18px)' }}>Total Revenue</div>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
          whileHover={{ scale: 1.02 }}
        >
          <div className="relative w-full h-full rounded-[26px] overflow-hidden transition-all duration-500 select-none shadow-[0_6px_18px_rgba(0,0,0,0.18),0_2px_6px_rgba(0,0,0,0.12)] hover:-translate-y-[4px] hover:shadow-[0_12px_28px_rgba(0,0,0,0.28),0_8px_16px_rgba(0,0,0,0.18)] max-sm:rounded-[20px] group cursor-pointer bg-gradient-to-br from-emerald-50 to-emerald-100">
            <div className="absolute inset-0 flex flex-col justify-center pointer-events-none text-[#1f5f3f] font-['Inter',sans-serif] tracking-[0.3px]" style={{ padding: 'clamp(8px, 2vw, 22px)' }}>
              <div className="mb-1 w-fit shadow-[inset_0_0_0_1px_rgba(255,255,255,0.35)] transition-all duration-500 group-hover:scale-110 bg-[rgba(31,95,63,0.18)] text-[#1f5f3f]" style={{ fontSize: 'clamp(14px, 3vw, 25px)', padding: 'clamp(3px, 0.8vw, 14px) clamp(5px, 1.2vw, 16px)', borderRadius: 'clamp(6px, 1.2vw, 18px)' }}>
                ✓
              </div>
              <div className="font-bold leading-none transition-all duration-500 group-hover:scale-105" style={{ fontSize: 'clamp(16px, 3.5vw, 30px)' }}>
                ₹{(totalPaid / 1000).toFixed(0)}K
              </div>
              <div className="mt-1 opacity-90" style={{ fontSize: 'clamp(8px, 1.8vw, 18px)' }}>Total Paid</div>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9 }}
          whileHover={{ scale: 1.02 }}
        >
          <div className="relative w-full h-full rounded-[26px] overflow-hidden transition-all duration-500 select-none shadow-[0_6px_18px_rgba(0,0,0,0.18),0_2px_6px_rgba(0,0,0,0.12)] hover:-translate-y-[4px] hover:shadow-[0_12px_28px_rgba(0,0,0,0.28),0_8px_16px_rgba(0,0,0,0.18)] max-sm:rounded-[20px] group cursor-pointer bg-gradient-to-br from-red-50 to-red-100">
            <div className="absolute inset-0 flex flex-col justify-center pointer-events-none text-[#7f1d1d] font-['Inter',sans-serif] tracking-[0.3px]" style={{ padding: 'clamp(8px, 2vw, 22px)' }}>
              <div className="mb-1 w-fit shadow-[inset_0_0_0_1px_rgba(255,255,255,0.35)] transition-all duration-500 group-hover:scale-110 bg-[rgba(127,29,29,0.18)] text-[#7f1d1d]" style={{ fontSize: 'clamp(14px, 3vw, 25px)', padding: 'clamp(3px, 0.8vw, 14px) clamp(5px, 1.2vw, 16px)', borderRadius: 'clamp(6px, 1.2vw, 18px)' }}>
                !
              </div>
              <div className="font-bold leading-none transition-all duration-500 group-hover:scale-105" style={{ fontSize: 'clamp(16px, 3.5vw, 30px)' }}>
                ₹{(totalDue / 1000).toFixed(0)}K
              </div>
              <div className="mt-1 opacity-90" style={{ fontSize: 'clamp(8px, 1.8vw, 18px)' }}>Total Due</div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Invoices Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
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
            transition={{ delay: 1.1 }}
            className="mb-4"
          >
            <p className="text-sm text-[#8b7a63] mb-1">Complete invoice records across all tailor shops</p>
            <p className="text-xs text-[#8b7a63] opacity-70">Showing: {filteredInvoices.length} of {allInvoices.length} invoices</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="overflow-x-auto max-sm:overflow-x-scroll"
          >
            <table className="w-full border-collapse min-w-[1200px]">
              <thead>
                <tr className="text-left">
                  <th className="text-[0.75rem] sm:text-[0.82rem] font-semibold text-[#8f8579] px-2 sm:px-3.5 py-2 sm:py-3 border-b border-[#e3dbd0]">Invoice ID</th>
                  <th className="text-[0.75rem] sm:text-[0.82rem] font-semibold text-[#8f8579] px-2 sm:px-3.5 py-2 sm:py-3 border-b border-[#e3dbd0]">Invoice Number</th>
                  <th className="text-[0.75rem] sm:text-[0.82rem] font-semibold text-[#8f8579] px-2 sm:px-3.5 py-2 sm:py-3 border-b border-[#e3dbd0]">Tailor / Branch</th>
                  <th className="text-[0.75rem] sm:text-[0.82rem] font-semibold text-[#8f8579] px-2 sm:px-3.5 py-2 sm:py-3 border-b border-[#e3dbd0]">Customer</th>
                  <th className="text-[0.75rem] sm:text-[0.82rem] font-semibold text-[#8f8579] px-2 sm:px-3.5 py-2 sm:py-3 border-b border-[#e3dbd0] hidden lg:table-cell">Mobile</th>
                  <th className="text-[0.75rem] sm:text-[0.82rem] font-semibold text-[#8f8579] px-2 sm:px-3.5 py-2 sm:py-3 border-b border-[#e3dbd0]">Total</th>
                  <th className="text-[0.75rem] sm:text-[0.82rem] font-semibold text-[#8f8579] px-2 sm:px-3.5 py-2 sm:py-3 border-b border-[#e3dbd0] hidden md:table-cell">Paid</th>
                  <th className="text-[0.75rem] sm:text-[0.82rem] font-semibold text-[#8f8579] px-2 sm:px-3.5 py-2 sm:py-3 border-b border-[#e3dbd0] hidden md:table-cell">Due</th>
                  <th className="text-[0.75rem] sm:text-[0.82rem] font-semibold text-[#8f8579] px-2 sm:px-3.5 py-2 sm:py-3 border-b border-[#e3dbd0]">Status</th>
                  <th className="text-[0.75rem] sm:text-[0.82rem] font-semibold text-[#8f8579] px-2 sm:px-3.5 py-2 sm:py-3 border-b border-[#e3dbd0] hidden lg:table-cell">Created By</th>
                  <th className="text-[0.75rem] sm:text-[0.82rem] font-semibold text-[#8f8579] px-2 sm:px-3.5 py-2 sm:py-3 border-b border-[#e3dbd0] hidden md:table-cell">Date</th>
                  <th className="text-[0.75rem] sm:text-[0.82rem] font-semibold text-[#8f8579] px-2 sm:px-3.5 py-2 sm:py-3 border-b border-[#e3dbd0]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInvoices.length === 0 ? (
                  <tr>
                    <td colSpan={12} className="px-4 py-8 text-center text-[#8b7a63]">
                      <div className="flex flex-col items-center gap-2">
                        <Filter className="w-8 h-8 opacity-50" />
                        <p>No invoices found matching your criteria</p>
                        <button
                          onClick={() => { setSearchTerm(''); setStatusFilter('all'); setTailorFilter('all'); setDateRange('all'); }}
                          className="text-sm text-[#6f5b3e] hover:underline"
                        >
                          Clear filters
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : filteredInvoices.map((invoice: Invoice) => (
                  <tr key={invoice.id} className="bg-transparent transition-all duration-300 hover:bg-white/55 group hover:shadow-sm">
                    <td className="px-2 sm:px-3.5 py-2 sm:py-3 text-[0.78rem] sm:text-[0.85rem] border-b border-[#e3dbd0] font-medium group-hover:text-[#6f5b3e] transition-colors">
                      #{invoice.id}
                    </td>
                    <td className="px-2 sm:px-3.5 py-2 sm:py-3 text-[0.78rem] sm:text-[0.85rem] border-b border-[#e3dbd0] font-medium group-hover:text-[#6f5b3e] transition-colors">
                      {invoice.invoiceNumber}
                    </td>
                    <td className="px-2 sm:px-3.5 py-2 sm:py-3 text-[0.78rem] sm:text-[0.85rem] border-b border-[#e3dbd0] group-hover:text-[#6f5b3e] transition-colors">
                      {invoice.tailorName}
                    </td>
                    <td className="px-2 sm:px-3.5 py-2 sm:py-3 text-[0.78rem] sm:text-[0.85rem] border-b border-[#e3dbd0]">
                      <div className="flex items-center gap-2 sm:gap-2.5 font-medium">
                        <div className="relative">
                          <img
                            src={invoice.img}
                            className="w-[22px] h-[22px] sm:w-[26px] sm:h-[26px] rounded-full ring-2 ring-white group-hover:ring-[#6f5b3e] transition-all duration-300"
                            alt=""
                          />
                        </div>
                        <span className="truncate group-hover:text-[#6f5b3e] transition-colors">{invoice.customerName}</span>
                      </div>
                    </td>
                    <td className="px-2 sm:px-3.5 py-2 sm:py-3 text-[0.78rem] sm:text-[0.85rem] border-b border-[#e3dbd0] hidden lg:table-cell group-hover:text-[#6f5b3e] transition-colors">
                      {invoice.customerMobile}
                    </td>
                    <td className="px-2 sm:px-3.5 py-2 sm:py-3 text-[0.78rem] sm:text-[0.85rem] border-b border-[#e3dbd0] font-semibold group-hover:text-[#6f5b3e] transition-colors">
                      ₹{invoice.totalAmount.toLocaleString()}
                    </td>
                    <td className="px-2 sm:px-3.5 py-2 sm:py-3 text-[0.78rem] sm:text-[0.85rem] border-b border-[#e3dbd0] hidden md:table-cell text-green-600 font-medium">
                      ₹{invoice.paidAmount.toLocaleString()}
                    </td>
                    <td className="px-2 sm:px-3.5 py-2 sm:py-3 text-[0.78rem] sm:text-[0.85rem] border-b border-[#e3dbd0] hidden md:table-cell text-red-600 font-medium">
                      ₹{invoice.dueAmount.toLocaleString()}
                    </td>
                    <td className="px-2 sm:px-3.5 py-2 sm:py-3 text-[0.78rem] sm:text-[0.85rem] border-b border-[#e3dbd0]">
                      <span className={`px-1.5 sm:px-2 py-[3px] rounded-md text-[0.65rem] sm:text-[0.7rem] font-semibold capitalize border border-dashed whitespace-nowrap transition-all duration-300 group-hover:scale-105 ${
                        invoice.paymentStatus === 'paid' ? 'bg-[#e7f3ed] text-[#2f6f53] border-[#2f6f53]/30 group-hover:shadow-md' :
                        invoice.paymentStatus === 'partial' ? 'bg-[#fff2db] text-[#b88924] border-[#b88924]/30 group-hover:shadow-md' :
                        'bg-[#fdeaea] text-[#a64444] border-[#a64444]/30 group-hover:shadow-md'
                      }`}>
                        {invoice.paymentStatus}
                      </span>
                    </td>
                    <td className="px-2 sm:px-3.5 py-2 sm:py-3 text-[0.78rem] sm:text-[0.85rem] border-b border-[#e3dbd0] hidden lg:table-cell group-hover:text-[#6f5b3e] transition-colors">
                      {invoice.createdBy}
                    </td>
                    <td className="px-2 sm:px-3.5 py-2 sm:py-3 text-[0.78rem] sm:text-[0.85rem] border-b border-[#e3dbd0] hidden md:table-cell group-hover:text-[#6f5b3e] transition-colors">
                      {new Date(invoice.invoiceDate).toLocaleDateString()}
                    </td>
                    <td className="px-2 sm:px-3.5 py-2 sm:py-3 text-[0.78rem] sm:text-[0.85rem] border-b border-[#e3dbd0]">
                      <div className="flex gap-2 sm:gap-2.5 text-[#8a7b6a] opacity-60 group-hover:opacity-100 transition-opacity">
                        <Eye
                          size={14}
                          className="cursor-pointer sm:w-4 sm:h-4 hover:text-[#6f5b3e] hover:scale-110 transition-all duration-200"
                          onClick={() => handleViewInvoice(invoice)}
                        />
                        <Printer
                          size={14}
                          className="cursor-pointer sm:w-4 sm:h-4 hover:text-[#6f5b3e] hover:scale-110 transition-all duration-200"
                          onClick={() => handlePrintInvoice(invoice)}
                        />
                        <Download
                          size={14}
                          className="cursor-pointer sm:w-4 sm:h-4 hover:text-[#6f5b3e] hover:scale-110 transition-all duration-200"
                          onClick={() => handleDownloadInvoice(invoice)}
                        />
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
            transition={{ delay: 1.4 }}
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

      <InvoiceDetailSidebar
        isOpen={isSidebarOpen}
        onClose={handleCloseSidebar}
        invoice={selectedInvoice}
      />
    </motion.div>
  );
};

export default Invoices;