import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PageTitle from '../components/PageTitle';
import sujal from '../assets/sujal.png';

const ProfilePage: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: 'Sujal Kidecha',
    email: 'sujal@tailor.com',
    phone: '+91 98765 43210',
    role: 'Super Admin',
    bio: 'Experienced administrator with expertise in managing complex systems and leading development teams.'
  });

  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    security: true
  });

  const [twoFA, setTwoFA] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleNotificationToggle = (key: string) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen p-4 md:p-6"
    >
      <div className="max-w-7xl mx-auto">
        {/* Main Content */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* Left Section - Profile Overview */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-1"
          >
            <motion.div 
              className="bg-white/70 backdrop-blur-sm rounded-2xl border border-white/60 shadow-[0_8px_32px_rgba(183,163,132,0.15)] p-6 relative after:content-[''] after:absolute after:inset-1.5 after:rounded-[14px] after:border after:border-dashed after:border-[#aa916e]/35 after:pointer-events-none"
              whileHover={{ 
                borderColor: 'rgba(111, 91, 62, 0.3)',
                backgroundColor: 'rgba(255, 255, 255, 0.8)'
              }}
              transition={{ duration: 0.3 }}
            >
              {/* Header */}
              <div className="mb-6">
                <PageTitle 
                  title="Profile Settings" 
                  subtitle="Manage your account settings and preferences"
                />
              </div>
              {/* Profile Picture */}
              <div className="text-center mb-6">
                <div className="relative inline-block group cursor-pointer">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg mx-auto mb-4 relative">
                    <img
                      src={sujal}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <svg className="w-6 h-6 text-white mb-1 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-white text-xs font-medium">Change</span>
                    </div>
                  </div>
                </div>
                <h2 className="text-xl font-bold text-[#6f5b3e] mb-2">Sujal Kidecha</h2>
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#6f5b3e]/20 border border-[#6f5b3e]/30">
                  <span className="text-sm font-medium text-[#6f5b3e]">Super Admin</span>
                </div>
              </div>

              {/* Info Labels */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center py-2 border-b border-[#f0ede7]">
                  <span className="text-sm text-[#8b7a63]">User ID</span>
                  <span className="text-sm font-medium text-[#6f5b3e]">#ADM001</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-[#f0ede7]">
                  <span className="text-sm text-[#8b7a63]">Joined Date</span>
                  <span className="text-sm font-medium text-[#6f5b3e]">Jan 15, 2023</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-[#8b7a63]">Last Login</span>
                  <span className="text-sm font-medium text-[#6f5b3e]">2 hours ago</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Section - Profile Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Profile Details Form */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white/70 backdrop-blur-sm rounded-2xl border border-white/60 shadow-[0_8px_32px_rgba(183,163,132,0.15)] p-6 relative after:content-[''] after:absolute after:inset-1.5 after:rounded-[14px] after:border after:border-dashed after:border-[#aa916e]/35 after:pointer-events-none"
              whileHover={{ 
                borderColor: 'rgba(111, 91, 62, 0.3)',
                backgroundColor: 'rgba(255, 255, 255, 0.8)'
              }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-[#6f5b3e]">Profile Details</h3>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsEditing(!isEditing)}
                  className="px-4 py-2 bg-[#6f5b3e] hover:bg-[#5d4a3b] text-white text-sm font-medium rounded-lg transition-colors duration-200"
                >
                  {isEditing ? 'Cancel' : 'Edit'}
                </motion.button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-[#6f5b3e] mb-2">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 border-2 border-[#d6c8b8] rounded-xl text-[#6f5b3e] transition-all duration-200 ${
                      isEditing 
                        ? 'bg-white/60 focus:outline-none focus:ring-2 focus:ring-[#6f5b3e]/50 focus:border-[#6f5b3e]' 
                        : 'bg-gray-100 cursor-not-allowed'
                    }`}
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-[#6f5b3e] mb-2">Email Address</label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={`w-full px-4 py-3 border-2 border-[#d6c8b8] rounded-xl text-[#6f5b3e] transition-all duration-200 ${
                        isEditing 
                          ? 'bg-white/60 focus:outline-none focus:ring-2 focus:ring-[#6f5b3e]/50 focus:border-[#6f5b3e]' 
                          : 'bg-gray-100 cursor-not-allowed'
                      }`}
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <span className="inline-flex items-center px-2 py-1 rounded-md bg-green-100 text-green-800 text-xs font-medium">
                        Verified
                      </span>
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-[#6f5b3e] mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 border-2 border-[#d6c8b8] rounded-xl text-[#6f5b3e] transition-all duration-200 ${
                      isEditing 
                        ? 'bg-white/60 focus:outline-none focus:ring-2 focus:ring-[#6f5b3e]/50 focus:border-[#6f5b3e]' 
                        : 'bg-gray-100 cursor-not-allowed'
                    }`}
                  />
                </div>

                {/* Role */}
                <div>
                  <label className="block text-sm font-medium text-[#6f5b3e] mb-2">Role</label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    disabled
                    className="w-full px-4 py-3 bg-gray-100 border-2 border-[#d6c8b8] rounded-xl text-[#6f5b3e] cursor-not-allowed"
                  >
                    <option>Super Admin</option>
                    <option>Admin</option>
                    <option>User</option>
                  </select>
                </div>
              </div>

              {/* Bio */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-[#6f5b3e] mb-2">Bio / About</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  rows={4}
                  className={`w-full px-4 py-3 border-2 border-[#d6c8b8] rounded-xl text-[#6f5b3e] transition-all duration-200 resize-none ${
                    isEditing 
                      ? 'bg-white/60 focus:outline-none focus:ring-2 focus:ring-[#6f5b3e]/50 focus:border-[#6f5b3e]' 
                      : 'bg-gray-100 cursor-not-allowed'
                  }`}
                  placeholder="Tell us about yourself..."
                />
              </div>

              {/* Action Buttons - Only show when editing */}
              {isEditing && (
                <div className="flex gap-3 mt-6">
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-3 bg-[#6f5b3e] hover:bg-[#5d4a3b] text-white font-medium rounded-xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#6f5b3e]/50"
                  >
                    Save Changes
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-3 bg-white/60 hover:bg-white border border-[#e3ddd3] text-[#6f5b3e] font-medium rounded-xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#6f5b3e]/50"
                  >
                    Cancel
                  </motion.button>
                </div>
              )}
            </motion.div>

            {/* Security Settings */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white/70 backdrop-blur-sm rounded-2xl border border-white/60 shadow-[0_8px_32px_rgba(183,163,132,0.15)] p-6 relative after:content-[''] after:absolute after:inset-1.5 after:rounded-[14px] after:border after:border-dashed after:border-[#aa916e]/35 after:pointer-events-none"
              whileHover={{ 
                borderColor: 'rgba(111, 91, 62, 0.3)',
                backgroundColor: 'rgba(255, 255, 255, 0.8)'
              }}
            >
              <h3 className="text-lg font-semibold text-[#6f5b3e] mb-6">Security Settings</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-[#f0ede7]">
                  <div>
                    <h4 className="font-medium text-[#6f5b3e]">Change Password</h4>
                    <p className="text-sm text-[#8b7a63]">Update your account password</p>
                  </div>
                  <button className="px-4 py-2 bg-[#f9f7f4] hover:bg-[#f0ede7] border border-[#e3ddd3] text-[#6f5b3e] text-sm font-medium rounded-lg transition-colors duration-200">
                    Change
                  </button>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-[#f0ede7]">
                  <div>
                    <h4 className="font-medium text-[#6f5b3e]">Two-Factor Authentication</h4>
                    <p className="text-sm text-[#8b7a63]">Add an extra layer of security</p>
                  </div>
                  <button
                    onClick={() => setTwoFA(!twoFA)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#6f5b3e]/50 ${
                      twoFA ? 'bg-[#6f5b3e]' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                        twoFA ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between py-3">
                  <div>
                    <h4 className="font-medium text-[#6f5b3e]">Active Sessions</h4>
                    <p className="text-sm text-[#8b7a63]">Manage your active sessions</p>
                  </div>
                  <button className="px-4 py-2 bg-[#f9f7f4] hover:bg-[#f0ede7] border border-[#e3ddd3] text-[#6f5b3e] text-sm font-medium rounded-lg transition-colors duration-200">
                    View
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Notification Preferences */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-white/70 backdrop-blur-sm rounded-2xl border border-white/60 shadow-[0_8px_32px_rgba(183,163,132,0.15)] p-6 relative after:content-[''] after:absolute after:inset-1.5 after:rounded-[14px] after:border after:border-dashed after:border-[#aa916e]/35 after:pointer-events-none"
              whileHover={{ 
                borderColor: 'rgba(111, 91, 62, 0.3)',
                backgroundColor: 'rgba(255, 255, 255, 0.8)'
              }}
            >
              <h3 className="text-lg font-semibold text-[#6f5b3e] mb-6">Notification Preferences</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3">
                  <div>
                    <h4 className="font-medium text-[#6f5b3e]">Email Notifications</h4>
                    <p className="text-sm text-[#8b7a63]">Receive updates via email</p>
                  </div>
                  <button
                    onClick={() => handleNotificationToggle('email')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#6f5b3e]/50 ${
                      notifications.email ? 'bg-[#6f5b3e]' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                        notifications.email ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between py-3">
                  <div>
                    <h4 className="font-medium text-[#6f5b3e]">Push Notifications</h4>
                    <p className="text-sm text-[#8b7a63]">Receive push notifications</p>
                  </div>
                  <button
                    onClick={() => handleNotificationToggle('push')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#6f5b3e]/50 ${
                      notifications.push ? 'bg-[#6f5b3e]' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                        notifications.push ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between py-3">
                  <div>
                    <h4 className="font-medium text-[#6f5b3e]">Security Alerts</h4>
                    <p className="text-sm text-[#8b7a63]">Important security notifications</p>
                  </div>
                  <button
                    onClick={() => handleNotificationToggle('security')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#6f5b3e]/50 ${
                      notifications.security ? 'bg-[#6f5b3e]' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                        notifications.security ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProfilePage;