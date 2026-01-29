import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Phone, MapPin, Calendar, Users, ShoppingBag, DollarSign, Star, Clock, Award, FileText, CreditCard, Building, User } from 'lucide-react';

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

interface InvoiceDetailSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  invoice: Invoice | null;
}

const InvoiceDetailSidebar: React.FC<InvoiceDetailSidebarProps> = ({ isOpen, onClose, invoice }) => {
  if (!invoice) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-500';
      case 'partial': return 'bg-yellow-500';
      default: return 'bg-red-500';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[55]"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[480px] bg-gradient-to-br from-[#fdfbf7] to-[#f5ede3] z-[60] shadow-[-10px_0_40px_rgba(0,0,0,0.1)] flex flex-col"
          >
            {/* Header */}
            <div className="relative px-6 py-5 border-b border-[#e3dbd0] bg-white/50 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-[#4a3f35]">Invoice Details</h2>
                  <p className="text-xs text-[#8a7b6a] mt-0.5">Complete invoice information</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="w-10 h-10 rounded-full bg-[#6f5b3e]/10 hover:bg-[#6f5b3e]/20 flex items-center justify-center text-[#6f5b3e] transition-colors"
                >
                  <X size={20} />
                </motion.button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-5">

              {/* Invoice Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-[#e3dbd0]"
              >
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <div className="w-20 h-20 bg-blue-50 rounded-xl flex items-center justify-center">
                      <FileText className="w-10 h-10 text-blue-600" />
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-5 h-5 ${getStatusColor(invoice.paymentStatus)} rounded-full border-2 border-white shadow-md`} />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-[#4a3f35]">{invoice.invoiceNumber}</h3>
                    <p className="text-sm text-[#8a7b6a] mt-0.5">Invoice #{invoice.id}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${
                        invoice.paymentStatus === 'paid' ? 'bg-green-100 text-green-700' :
                        invoice.paymentStatus === 'partial' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {invoice.paymentStatus}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-[#8a7b6a]">
                        <Calendar className="w-3 h-3" />
                        <span className="font-medium">{new Date(invoice.invoiceDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Amount Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-3 gap-3"
              >
                {[
                  { icon: DollarSign, label: 'Total', value: `₹${invoice.totalAmount.toLocaleString()}`, color: 'text-blue-600', bg: 'bg-blue-50' },
                  { icon: CreditCard, label: 'Paid', value: `₹${invoice.paidAmount.toLocaleString()}`, color: 'text-green-600', bg: 'bg-green-50' },
                  { icon: Clock, label: 'Due', value: `₹${invoice.dueAmount.toLocaleString()}`, color: 'text-red-600', bg: 'bg-red-50' }
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -3, scale: 1.02 }}
                    className="bg-white rounded-xl p-4 shadow-sm border border-[#e3dbd0] hover:shadow-md transition-shadow"
                  >
                    <div className={`w-10 h-10 ${stat.bg} rounded-lg flex items-center justify-center mb-2`}>
                      <stat.icon className={`w-5 h-5 ${stat.color}`} />
                    </div>
                    <p className="text-xs text-[#8a7b6a] font-medium">{stat.label}</p>
                    <p className="text-lg font-bold text-[#4a3f35] mt-0.5">{stat.value}</p>
                  </motion.div>
                ))}
              </motion.div>

              {/* Customer Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl p-5 shadow-sm border border-[#e3dbd0]"
              >
                <h4 className="text-sm font-bold text-[#4a3f35] mb-4 flex items-center gap-2">
                  <div className="w-1 h-4 bg-[#6f5b3e] rounded-full" />
                  Customer Information
                </h4>

                <div className="space-y-3">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#f8f5f2] transition-colors"
                  >
                    <div className="relative">
                      <img
                        src={invoice.img}
                        alt={invoice.customerName}
                        className="w-12 h-12 rounded-lg object-cover ring-2 ring-white shadow-sm"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[#4a3f35]">{invoice.customerName}</p>
                      <p className="text-xs text-[#8a7b6a] flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        {invoice.customerMobile}
                      </p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Tailor Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-2xl p-5 shadow-sm border border-[#e3dbd0]"
              >
                <h4 className="text-sm font-bold text-[#4a3f35] mb-4 flex items-center gap-2">
                  <div className="w-1 h-4 bg-[#6f5b3e] rounded-full" />
                  Tailor Information
                </h4>

                <div className="space-y-3">
                  {[
                    { icon: Building, label: 'Tailor Shop', value: invoice.tailorName },
                    { icon: User, label: 'Created By', value: invoice.createdBy },
                    { icon: Calendar, label: 'Invoice Date', value: new Date(invoice.invoiceDate).toLocaleDateString() }
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + idx * 0.05 }}
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#f8f5f2] transition-colors"
                    >
                      <div className="w-8 h-8 bg-[#6f5b3e]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-4 h-4 text-[#6f5b3e]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-[#8a7b6a] font-medium">{item.label}</p>
                        <p className="text-sm text-[#4a3f35] truncate">{item.value}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Payment Progress */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-gradient-to-br from-[#6f5b3e] to-[#8a7b6a] rounded-2xl p-5 text-white shadow-lg"
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-bold flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    Payment Progress
                  </h4>
                  <CreditCard className="w-4 h-4 opacity-70" />
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="opacity-90">Payment Completion</span>
                      <span className="font-bold">{Math.round((invoice.paidAmount / invoice.totalAmount) * 100)}%</span>
                    </div>
                    <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(invoice.paidAmount / invoice.totalAmount) * 100}%` }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="h-full bg-white rounded-full"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="grid grid-cols-2 gap-3 pt-2"
              >
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="py-3 px-4 bg-[#6f5b3e] text-white rounded-xl font-semibold text-sm shadow-lg shadow-[#6f5b3e]/30 hover:shadow-xl hover:shadow-[#6f5b3e]/40 transition-shadow"
                >
                  Print Invoice
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="py-3 px-4 bg-white border-2 border-[#6f5b3e] text-[#6f5b3e] rounded-xl font-semibold text-sm hover:bg-[#6f5b3e] hover:text-white transition-colors"
                >
                  Download PDF
                </motion.button>
              </motion.div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default InvoiceDetailSidebar;