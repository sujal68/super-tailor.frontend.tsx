import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Phone, MapPin, Calendar, ShoppingBag, DollarSign, Star, Clock, Award, User } from 'lucide-react';

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  city: string;
  tailor: string;
  orders: number;
  totalSpent: number;
  status: string;
  joinDate: string;
  img: string;
}

interface CustomerDetailSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  customer: Customer | null;
}

const CustomerDetailSidebar: React.FC<CustomerDetailSidebarProps> = ({ isOpen, onClose, customer }) => {
  if (!customer) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
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
                  <h2 className="text-xl font-bold text-[#4a3f35]">Customer Details</h2>
                  <p className="text-xs text-[#8a7b6a] mt-0.5">Complete customer information</p>
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

              {/* Profile Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-[#e3dbd0]"
              >
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <motion.img
                      whileHover={{ scale: 1.05 }}
                      src={customer.img}
                      alt={customer.name}
                      className="w-20 h-20 rounded-xl object-cover ring-4 ring-white shadow-lg"
                    />
                    <div className={`absolute -bottom-1 -right-1 w-5 h-5 ${getStatusColor(customer.status)} rounded-full border-2 border-white shadow-md`} />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-[#4a3f35]">{customer.name}</h3>
                    <p className="text-sm text-[#8a7b6a] mt-0.5">Tailor: {customer.tailor}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${customer.status === 'active' ? 'bg-green-100 text-green-700' :
                          customer.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                        }`}>
                        {customer.status}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-[#8a7b6a]">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">4.2</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Stats Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-3 gap-3"
              >
                {[
                  { icon: ShoppingBag, label: 'Orders', value: customer.orders, color: 'text-purple-600', bg: 'bg-purple-50' },
                  { icon: DollarSign, label: 'Spent', value: `₹${(customer.totalSpent / 1000).toFixed(0)}K`, color: 'text-green-600', bg: 'bg-green-50' },
                  { icon: User, label: 'Rating', value: '4.2/5', color: 'text-blue-600', bg: 'bg-blue-50' }
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

              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl p-5 shadow-sm border border-[#e3dbd0]"
              >
                <h4 className="text-sm font-bold text-[#4a3f35] mb-4 flex items-center gap-2">
                  <div className="w-1 h-4 bg-[#6f5b3e] rounded-full" />
                  Contact Information
                </h4>

                <div className="space-y-3">
                  {[
                    { icon: Phone, label: 'Phone', value: customer.phone },
                    { icon: Mail, label: 'Email', value: customer.email },
                    { icon: MapPin, label: 'Location', value: `${customer.city}, India` },
                    { icon: Calendar, label: 'Joined', value: new Date(customer.joinDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) }
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + idx * 0.05 }}
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

              {/* Customer Metrics */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-gradient-to-br from-[#6f5b3e] to-[#8a7b6a] rounded-2xl p-5 text-white shadow-lg"
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-bold flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    Customer Metrics
                  </h4>
                  <Clock className="w-4 h-4 opacity-70" />
                </div>

                <div className="space-y-3">
                  {[
                    { label: 'Avg. Order Value', value: `₹${(customer.totalSpent / customer.orders).toFixed(0)}`, progress: 75 },
                    { label: 'Satisfaction Score', value: '4.2/5.0', progress: 84 },
                    { label: 'Loyalty Rate', value: '92%', progress: 92 }
                  ].map((metric, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="opacity-90">{metric.label}</span>
                        <span className="font-bold">{metric.value}</span>
                      </div>
                      <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${metric.progress}%` }}
                          transition={{ delay: 0.6 + idx * 0.1, duration: 0.8 }}
                          className="h-full bg-white rounded-full"
                        />
                      </div>
                    </div>
                  ))}
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
                  View Orders
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="py-3 px-4 bg-white border-2 border-[#6f5b3e] text-[#6f5b3e] rounded-xl font-semibold text-sm hover:bg-[#6f5b3e] hover:text-white transition-colors"
                >
                  Contact
                </motion.button>
              </motion.div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CustomerDetailSidebar;