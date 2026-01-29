import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon, Shield, Bell, Database, Globe, Users, Mail, Smartphone, Save, RefreshCw } from 'lucide-react';
import PageTitle from '../components/PageTitle';

export default function Settings(): React.JSX.Element {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    general: {
      siteName: 'Tailor Management System',
      siteUrl: 'https://tailor.example.com',
      timezone: 'Asia/Kolkata',
      language: 'English',
      currency: 'INR',
      dateFormat: 'DD/MM/YYYY'
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: true,
      orderUpdates: true,
      paymentAlerts: true,
      systemAlerts: true
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: '30',
      passwordExpiry: '90',
      loginAttempts: '5',
      ipWhitelist: false
    },
    database: {
      autoBackup: true,
      backupFrequency: 'daily',
      retentionPeriod: '30',
      compressionEnabled: true
    }
  });

  const tabs = [
    { id: 'general', name: 'General', icon: SettingsIcon },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'database', name: 'Database', icon: Database }
  ];

  const handleSave = () => {
    console.log('Settings saved:', settings);
  };

  const handleReset = () => {
    console.log('Settings reset');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
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
            title="System Settings" 
            subtitle="Configure application preferences and system options"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="flex gap-3"
        >
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2.5 bg-white/60 border border-[#e3dbd0] rounded-xl text-sm text-[#6f5b3e] hover:bg-white/80 transition-colors"
          >
            <RefreshCw size={16} />
            Reset
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#6f5b3e] text-white rounded-xl text-sm hover:bg-[#5d4a33] transition-colors"
          >
            <Save size={16} />
            Save Changes
          </button>
        </motion.div>
      </motion.div>

      <div className="font-['Inter',sans-serif] text-[#4e463e]">
        <motion.div 
          className="main-container max-w-[1154px] [body.sidebar-collapsed_&]:max-w-[1334px] mx-auto bg-gradient-to-b from-white/60 to-white/30 rounded-[18px] p-[18px] sm:p-[26px] border-2 border-dashed border-[#d6c8b8] transition-[max-width] duration-350 ease-in-out"
          whileHover={{ 
            borderColor: 'rgba(111, 91, 62, 0.4)',
            backgroundColor: 'rgba(255, 255, 255, 0.4)'
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Tabs */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-2 mb-6 border-b border-[#e3dbd0] pb-4"
          >
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-[#6f5b3e] text-white shadow-lg'
                      : 'bg-white/50 text-[#8f8579] hover:bg-white/70 hover:text-[#6f5b3e]'
                  }`}
                >
                  <Icon size={16} />
                  {tab.name}
                </button>
              );
            })}
          </motion.div>

          {/* General Settings */}
          {activeTab === 'general' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#6f5b3e] mb-2">Site Name</label>
                  <input
                    type="text"
                    value={settings.general.siteName}
                    onChange={(e) => setSettings({...settings, general: {...settings.general, siteName: e.target.value}})}
                    className="w-full px-3 py-2.5 bg-white/60 border border-[#e3dbd0] rounded-xl text-sm text-[#6f5b3e] focus:outline-none focus:ring-2 focus:ring-[#6f5b3e]/30"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#6f5b3e] mb-2">Site URL</label>
                  <input
                    type="url"
                    value={settings.general.siteUrl}
                    onChange={(e) => setSettings({...settings, general: {...settings.general, siteUrl: e.target.value}})}
                    className="w-full px-3 py-2.5 bg-white/60 border border-[#e3dbd0] rounded-xl text-sm text-[#6f5b3e] focus:outline-none focus:ring-2 focus:ring-[#6f5b3e]/30"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#6f5b3e] mb-2">Timezone</label>
                  <select
                    value={settings.general.timezone}
                    onChange={(e) => setSettings({...settings, general: {...settings.general, timezone: e.target.value}})}
                    className="w-full px-3 py-2.5 bg-white/60 border border-[#e3dbd0] rounded-xl text-sm text-[#6f5b3e] focus:outline-none focus:ring-2 focus:ring-[#6f5b3e]/30"
                  >
                    <option value="Asia/Kolkata">Asia/Kolkata</option>
                    <option value="UTC">UTC</option>
                    <option value="America/New_York">America/New_York</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#6f5b3e] mb-2">Language</label>
                  <select
                    value={settings.general.language}
                    onChange={(e) => setSettings({...settings, general: {...settings.general, language: e.target.value}})}
                    className="w-full px-3 py-2.5 bg-white/60 border border-[#e3dbd0] rounded-xl text-sm text-[#6f5b3e] focus:outline-none focus:ring-2 focus:ring-[#6f5b3e]/30"
                  >
                    <option value="English">English</option>
                    <option value="Hindi">Hindi</option>
                    <option value="Spanish">Spanish</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#6f5b3e] mb-2">Currency</label>
                  <select
                    value={settings.general.currency}
                    onChange={(e) => setSettings({...settings, general: {...settings.general, currency: e.target.value}})}
                    className="w-full px-3 py-2.5 bg-white/60 border border-[#e3dbd0] rounded-xl text-sm text-[#6f5b3e] focus:outline-none focus:ring-2 focus:ring-[#6f5b3e]/30"
                  >
                    <option value="INR">INR (₹)</option>
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#6f5b3e] mb-2">Date Format</label>
                  <select
                    value={settings.general.dateFormat}
                    onChange={(e) => setSettings({...settings, general: {...settings.general, dateFormat: e.target.value}})}
                    className="w-full px-3 py-2.5 bg-white/60 border border-[#e3dbd0] rounded-xl text-sm text-[#6f5b3e] focus:outline-none focus:ring-2 focus:ring-[#6f5b3e]/30"
                  >
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}

          {/* Notifications Settings */}
          {activeTab === 'notifications' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { key: 'emailNotifications', label: 'Email Notifications', icon: Mail },
                  { key: 'smsNotifications', label: 'SMS Notifications', icon: Smartphone },
                  { key: 'pushNotifications', label: 'Push Notifications', icon: Bell },
                  { key: 'orderUpdates', label: 'Order Updates', icon: Bell },
                  { key: 'paymentAlerts', label: 'Payment Alerts', icon: Bell },
                  { key: 'systemAlerts', label: 'System Alerts', icon: Bell }
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.key} className="flex items-center justify-between p-4 bg-white/50 rounded-xl border border-[#e3dbd0]">
                      <div className="flex items-center gap-3">
                        <Icon size={20} className="text-[#6f5b3e]" />
                        <span className="text-sm font-medium text-[#6f5b3e]">{item.label}</span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.notifications[item.key as keyof typeof settings.notifications]}
                          onChange={(e) => setSettings({
                            ...settings,
                            notifications: {
                              ...settings.notifications,
                              [item.key]: e.target.checked
                            }
                          })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#6f5b3e]/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#6f5b3e]"></div>
                      </label>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Security Settings */}
          {activeTab === 'security' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center justify-between p-4 bg-white/50 rounded-xl border border-[#e3dbd0]">
                  <div className="flex items-center gap-3">
                    <Shield size={20} className="text-[#6f5b3e]" />
                    <span className="text-sm font-medium text-[#6f5b3e]">Two-Factor Authentication</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.security.twoFactorAuth}
                      onChange={(e) => setSettings({
                        ...settings,
                        security: { ...settings.security, twoFactorAuth: e.target.checked }
                      })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#6f5b3e]/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#6f5b3e]"></div>
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#6f5b3e] mb-2">Session Timeout (minutes)</label>
                  <input
                    type="number"
                    value={settings.security.sessionTimeout}
                    onChange={(e) => setSettings({...settings, security: {...settings.security, sessionTimeout: e.target.value}})}
                    className="w-full px-3 py-2.5 bg-white/60 border border-[#e3dbd0] rounded-xl text-sm text-[#6f5b3e] focus:outline-none focus:ring-2 focus:ring-[#6f5b3e]/30"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#6f5b3e] mb-2">Password Expiry (days)</label>
                  <input
                    type="number"
                    value={settings.security.passwordExpiry}
                    onChange={(e) => setSettings({...settings, security: {...settings.security, passwordExpiry: e.target.value}})}
                    className="w-full px-3 py-2.5 bg-white/60 border border-[#e3dbd0] rounded-xl text-sm text-[#6f5b3e] focus:outline-none focus:ring-2 focus:ring-[#6f5b3e]/30"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#6f5b3e] mb-2">Max Login Attempts</label>
                  <input
                    type="number"
                    value={settings.security.loginAttempts}
                    onChange={(e) => setSettings({...settings, security: {...settings.security, loginAttempts: e.target.value}})}
                    className="w-full px-3 py-2.5 bg-white/60 border border-[#e3dbd0] rounded-xl text-sm text-[#6f5b3e] focus:outline-none focus:ring-2 focus:ring-[#6f5b3e]/30"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Database Settings */}
          {activeTab === 'database' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center justify-between p-4 bg-white/50 rounded-xl border border-[#e3dbd0]">
                  <div className="flex items-center gap-3">
                    <Database size={20} className="text-[#6f5b3e]" />
                    <span className="text-sm font-medium text-[#6f5b3e]">Auto Backup</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.database.autoBackup}
                      onChange={(e) => setSettings({
                        ...settings,
                        database: { ...settings.database, autoBackup: e.target.checked }
                      })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#6f5b3e]/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#6f5b3e]"></div>
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#6f5b3e] mb-2">Backup Frequency</label>
                  <select
                    value={settings.database.backupFrequency}
                    onChange={(e) => setSettings({...settings, database: {...settings.database, backupFrequency: e.target.value}})}
                    className="w-full px-3 py-2.5 bg-white/60 border border-[#e3dbd0] rounded-xl text-sm text-[#6f5b3e] focus:outline-none focus:ring-2 focus:ring-[#6f5b3e]/30"
                  >
                    <option value="hourly">Hourly</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#6f5b3e] mb-2">Retention Period (days)</label>
                  <input
                    type="number"
                    value={settings.database.retentionPeriod}
                    onChange={(e) => setSettings({...settings, database: {...settings.database, retentionPeriod: e.target.value}})}
                    className="w-full px-3 py-2.5 bg-white/60 border border-[#e3dbd0] rounded-xl text-sm text-[#6f5b3e] focus:outline-none focus:ring-2 focus:ring-[#6f5b3e]/30"
                  />
                </div>
                <div className="flex items-center justify-between p-4 bg-white/50 rounded-xl border border-[#e3dbd0]">
                  <div className="flex items-center gap-3">
                    <Database size={20} className="text-[#6f5b3e]" />
                    <span className="text-sm font-medium text-[#6f5b3e]">Compression Enabled</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.database.compressionEnabled}
                      onChange={(e) => setSettings({
                        ...settings,
                        database: { ...settings.database, compressionEnabled: e.target.checked }
                      })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#6f5b3e]/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#6f5b3e]"></div>
                  </label>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}