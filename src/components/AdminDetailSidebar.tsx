import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Phone, MapPin, Calendar, Shield, Users, Settings, Clock, Award, Key } from 'lucide-react';

interface AdminDetailSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  admin: {
    name: string;
    email: string;
    role: string;
    department: string;
    permissions: number;
    lastLogin: string;
    status: string;
    img: string;
    joined?: string;
  } | null;
}

const AdminDetailSidebar: React.FC<AdminDetailSidebarProps> = ({ isOpen, onClose, admin }) => {
  if (!admin) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'inactive': return 'bg-yellow-500';
      default: return 'bg-red-500';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Super Admin': return 'text-purple-600 bg-purple-50';
      case 'Admin': return 'text-blue-600 bg-blue-50';
      default: return 'text-green-600 bg-green-50';
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
                  <h2 className="text-xl font-bold text-[#4a3f35]">Administrator Details</h2>
                  <p className="text-xs text-[#8a7b6a] mt-0.5">Complete admin information</p>
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
                      src={admin.img}
                      alt={admin.name}
                      className="w-20 h-20 rounded-xl object-cover ring-4 ring-white shadow-lg"
                    />
                    <div className={`absolute -bottom-1 -right-1 w-5 h-5 ${getStatusColor(admin.status)} rounded-full border-2 border-white shadow-md`} />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-[#4a3f35]">{admin.name}</h3>
                    <p className="text-sm text-[#8a7b6a] mt-0.5">{admin.email}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${admin.status === 'active' ? 'bg-green-100 text-green-700' :
                          admin.status === 'inactive' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                        }`}>
                        {admin.status}
                      </span>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getRoleColor(admin.role)}`}>
                        {admin.role}
                      </span>
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
                  { icon: Shield, label: 'Permissions', value: admin.permissions, color: 'text-purple-600', bg: 'bg-purple-50' },
                  { icon: Users, label: 'Department', value: admin.department, color: 'text-blue-600', bg: 'bg-blue-50' },
                  { icon: Clock, label: 'Last Login', value: admin.lastLogin, color: 'text-green-600', bg: 'bg-green-50' }
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
                    <p className="text-sm font-bold text-[#4a3f35] mt-0.5 truncate">{stat.value}</p>
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
                    { icon: Phone, label: 'Phone', value: '+91 98765-43210' },
                    { icon: Mail, label: 'Email', value: admin.email },
                    { icon: MapPin, label: 'Department', value: admin.department },
                    { icon: Calendar, label: 'Joined', value: admin.joined || 'Jan 2024' }
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

              {/* Permissions & Access */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-gradient-to-br from-[#6f5b3e] to-[#8a7b6a] rounded-2xl p-5 text-white shadow-lg"
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-bold flex items-center gap-2">
                    <Key className="w-4 h-4" />
                    Access & Permissions
                  </h4>
                  <Settings className="w-4 h-4 opacity-70" />
                </div>

                <div className="space-y-3">
                  {[
                    { label: 'System Access Level', value: admin.role, progress: admin.role === 'Super Admin' ? 100 : admin.role === 'Admin' ? 75 : 50 },
                    { label: 'Active Permissions', value: `${admin.permissions}/15`, progress: (admin.permissions / 15) * 100 },
                    { label: 'Security Clearance', value: 'Level 3', progress: 85 }
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + idx * 0.1 }}
                      className="space-y-1"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-medium opacity-90">{item.label}</span>
                        <span className="text-xs font-bold">{item.value}</span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-1.5">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${item.progress}%` }}
                          transition={{ delay: 0.8 + idx * 0.1, duration: 0.8 }}
                          className="bg-white rounded-full h-1.5 shadow-sm"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Activity Timeline */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="bg-white rounded-2xl p-5 shadow-sm border border-[#e3dbd0]"
              >
                <h4 className="text-sm font-bold text-[#4a3f35] mb-4 flex items-center gap-2">
                  <div className="w-1 h-4 bg-[#6f5b3e] rounded-full" />
                  Recent Activity
                </h4>

                <div className="space-y-3">
                  {[
                    { action: 'Logged into system', time: admin.lastLogin, icon: '🔐' },
                    { action: 'Updated user permissions', time: '1 day ago', icon: '⚙️' },
                    { action: 'Generated monthly report', time: '2 days ago', icon: '📊' },
                    { action: 'Modified system settings', time: '3 days ago', icon: '🛠️' }
                  ].map((activity, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + idx * 0.05 }}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#f8f5f2] transition-colors"
                    >
                      <div className="w-8 h-8 bg-[#6f5b3e]/10 rounded-lg flex items-center justify-center flex-shrink-0 text-sm">
                        {activity.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-[#4a3f35] font-medium">{activity.action}</p>
                        <p className="text-xs text-[#8a7b6a]">{activity.time}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AdminDetailSidebar;