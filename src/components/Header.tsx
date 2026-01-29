import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMenu, FiX } from "react-icons/fi";
import sujal from '../assets/sujal.png';

interface HeaderProps {
  setSidebarOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ setSidebarOpen }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState<boolean>(false);
  // State to track if user has scrolled
  const [scrolled, setScrolled] = useState<boolean>(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Scroll detection logic
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = (): void => {
    window.location.href = "/";
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const notifications = [
    { id: 1, type: 'urgent', title: 'Multiple failed login attempts', desc: 'Security alert detected', time: '2 mins ago', unread: true },
    { id: 2, type: 'attention', title: 'Pending orders require attention', desc: '5 orders awaiting approval', time: '15 mins ago', unread: true },
    { id: 3, type: 'normal', title: 'New order received', desc: 'Order #1234 from Royal Tailors', time: '1 hour ago', unread: true },
    { id: 4, type: 'normal', title: 'New sub-admin added', desc: 'John Doe joined as sub-admin', time: '2 hours ago', unread: false },
    { id: 5, type: 'attention', title: 'Worker marked absent', desc: 'Ramesh Kumar - Today', time: '3 hours ago', unread: false },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  const handleMarkAllAsRead = () => {
    console.log('Mark all as read');
  };

  return (
    <>
      {/* Updated Header: 
          1. Added 'sticky top-0' to keep it at the top.
          2. Added dynamic shadow 'shadow-md' based on scroll.
          3. Added 'transition-all' for smooth shadow appearance.
          4. Added 'bg-white/80' on scroll to ensure content beneath is readable while maintaining your theme.
      */}
      <header className={`sticky top-0 w-full px-1.5 sm:px-4 md:px-6 py-2.5 md:py-5 flex items-center justify-between relative z-20 rounded-[24px]  font-sans border-b border-[#f0ede7]/50 transition-all duration-300 ${scrolled ? 'backdrop-blur-md shadow-md' : 'bg-transparent shadow-none'
        }`}>
        <div className="flex items-center justify-between w-full px-1.5 sm:px-4 md:px-6 py-2.5 sm:py-3 bg-white/40 backdrop-blur rounded-[20px] border border-white/60 shadow-[0_8px_32px_rgba(183,163,132,0.15)] relative after:content-[''] after:absolute after:inset-1 after:border after:border-dashed after:border-[#b7a384]/30 after:rounded-[inherit] after:pointer-events-none">

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden bg-white border border-[#eee5d8] rounded-xl w-[36px] h-[36px] sm:w-[38px] sm:h-[38px] flex items-center justify-center cursor-pointer transition-transform duration-200 active:scale-95 hover:bg-white/55 flex-shrink-0"
          >
            <FiMenu className="text-[#4a3f35] text-lg sm:text-xl" />
          </button>

          {/* Context & Identity */}
          <div className="hidden md:flex flex-col mr-4 lg:mr-6">
            <span className="text-xs text-[#9e8c76] font-medium">Welcome back,</span>
            <span className="text-sm font-semibold text-[#4a3f35]">Sujal Kidecha</span>
          </div>
          <div className="hidden sm:block md:hidden text-sm font-semibold text-[#4a3f35] mr-3">Super Admin</div>

          {/* Center: Search */}
          <div className="flex-1 max-w-[280px] sm:max-w-[350px] lg:max-w-[450px] relative mr-2 md:mr-5 hidden sm:block">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 opacity-50">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9e8c76" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8">
                  <animate attributeName="r" values="8;8.5;8" dur="2s" repeatCount="indefinite" />
                </circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65">
                  <animate attributeName="stroke-dasharray" values="0 10;10 0" dur="1.5s" repeatCount="indefinite" />
                </line>
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-[45px] pr-5 py-2.5 md:py-3 rounded-full border border-[#e3ddd3] bg-[#fcfaf7] text-sm text-[#5c5247] outline-none transition-all duration-300 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] focus:border-[#d4a373] focus:ring-4 focus:ring-[#d4a373]/15 focus:bg-white"
            />
          </div>

          {/* Right: Profile & Actions */}
          <div className="flex items-center gap-1 sm:gap-3 md:gap-5">
            <div className="relative" ref={notificationRef}>
              <button
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className="bg-white border border-[#eee5d8] rounded-xl w-[36px] h-[36px] sm:w-[42px] sm:h-[42px] flex items-center justify-center cursor-pointer relative transition-transform duration-200 active:scale-95 hover:bg-white/55 hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.35)] flex-shrink-0"
              >
                {unreadCount > 0 && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-br from-red-500 to-red-600 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                    <span className="text-[9px] sm:text-[10px] font-bold text-white">{unreadCount}</span>
                  </div>
                )}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4a3f35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sm:w-[18px] sm:h-[18px]">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9">
                    <animate attributeName="d" values="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9;M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9;M18 9A6 6 0 0 0 6 9c0 7-3 9-3 9h18s-3-2-3-9;M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" dur="2s" repeatCount="indefinite" />
                  </path>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0">
                    <animateTransform attributeName="transform" type="rotate" values="0 12 21;-10 12 21;10 12 21;0 12 21" dur="1s" repeatCount="indefinite" />
                  </path>
                </svg>
              </button>
            </div>

            <div className="relative" ref={dropdownRef}>
              <div
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 md:gap-3 p-0.5 pr-1.5 sm:p-1 sm:pr-3 md:pr-4 bg-white/70 border border-[#e3ddd3] rounded-full cursor-pointer transition-all duration-300 active:scale-95 hover:shadow-md"
              >
                <div className="w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full overflow-hidden border-2 border-white shadow-[0_4px_10px_rgba(0,0,0,0.15)] flex-shrink-0">
                  <img
                    src={sujal}
                    alt="Profile"
                    draggable="false"
                    className="w-full h-full object-cover select-none pointer-events-none"
                  />
                </div>
                <div className="hidden sm:flex flex-col">
                  <span className="text-sm font-semibold text-[#4a3f35] leading-tight">Sujal Kidecha</span>
                  <span className="hidden md:block text-xs text-[#9e8c76] font-medium">Super Admin</span>
                </div>
                <svg className="hidden sm:block" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4a3f35" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 9l6 6 6-6"></path>
                </svg>
              </div>

              {/* Profile Dropdown */}
              <div
                className={`absolute top-[60px] sm:top-[72px] right-0 w-[240px] bg-white/95 backdrop-blur-xl rounded-2xl border border-white/60 shadow-[0_20px_40px_rgba(0,0,0,0.12)] z-[1000] origin-top-right transition-all duration-300 ${isDropdownOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-2 scale-95 pointer-events-none'}`}
              >
                {/* User Card */}
                <div className="p-4 border-b border-[#f0ede7]">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm">
                      <img
                        src={sujal}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-[#4a3f35] text-sm">Sujal Kidecha</h3>
                      <p className="text-xs text-[#d4a373] font-medium">Super Admin</p>
                      <p className="text-[11px] text-[#9e8c76] mt-0.5">sujal@tailor.com</p>
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="p-2">
                  <div
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-[#4a3f35] cursor-pointer transition-all duration-200 hover:bg-[#f9f7f4]"
                    onClick={() => {
                      navigate('/dashboard/profile');
                      setIsDropdownOpen(false);
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                    Profile
                  </div>

                  <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-[#4a3f35] cursor-pointer transition-all duration-200 hover:bg-[#f9f7f4]">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="3" />
                      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                    </svg>
                    Settings
                  </div>

                  <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-[#4a3f35] cursor-pointer transition-all duration-200 hover:bg-[#f9f7f4]">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                    </svg>
                    Notification Preferences
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-[#f0ede7] mx-2"></div>

                {/* Logout */}
                <div className="p-2">
                  <div
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-600 cursor-pointer transition-all duration-200 hover:bg-red-50"
                    onClick={handleLogout}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                      <polyline points="16 17 21 12 16 7" />
                      <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                    Logout
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Backdrop Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[999] transition-opacity duration-300 ${isNotificationOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        onClick={() => setIsNotificationOpen(false)}
      ></div>

      {/* Notification Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-[420px] bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-xl border-l border-white/60 shadow-[-10px_0_50px_rgba(0,0,0,0.15)] z-[1000] transition-transform duration-500 ease-out ${isNotificationOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#f0ede7]/70 bg-white/50">
          <h2 className="text-lg font-semibold text-[#4a3f35]">Notifications</h2>
          <div className="flex items-center gap-3">
            <button
              onClick={handleMarkAllAsRead}
              className="text-sm font-medium text-[#d4a373] hover:text-[#b7a384] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#d4a373]/30 rounded-lg px-3 py-1.5"
            >
              Mark all as read
            </button>
            <button
              onClick={() => setIsNotificationOpen(false)}
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/70 border border-[#eee5d8] hover:bg-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#d4a373]/30"
            >
              <FiX className="text-[#4a3f35] text-xl" />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="h-[calc(100%-140px)] overflow-y-auto px-4 py-3">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              className={`mb-3 p-4 rounded-2xl border cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#d4a373]/30 ${notif.unread
                ? 'bg-gradient-to-br from-[#fffcf8] to-white border-[#f0ede7]'
                : 'bg-white/60 border-white/80'
                }`}
              tabIndex={0}
            >
              <div className="flex items-start gap-3">
                {/* Priority Indicator */}
                <div
                  className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${notif.type === 'urgent'
                    ? 'bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.6)]'
                    : notif.type === 'attention'
                      ? 'bg-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.6)]'
                      : 'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.6)]'
                    }`}
                ></div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="text-sm font-semibold text-[#4a3f35] leading-snug">
                      {notif.title}
                    </h3>
                    {notif.unread && (
                      <div className="w-2 h-2 rounded-full bg-[#d4a373] flex-shrink-0 mt-1"></div>
                    )}
                  </div>
                  <p className="text-xs text-[#9e8c76] leading-relaxed mb-2">
                    {notif.desc}
                  </p>
                  <span className="text-[11px] text-[#b7a384] font-medium">
                    {notif.time}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Drawer Footer */}
        <div className="absolute bottom-0 left-0 right-0 px-6 py-4 border-t border-[#f0ede7]/70 bg-gradient-to-t from-white/80 to-white/50 backdrop-blur-sm">
          <button className="w-full py-3 text-center text-sm font-semibold text-[#d4a373] hover:text-white bg-white hover:bg-[#d4a373] border border-[#d4a373]/30 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#d4a373]/50">
            View All Notifications
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;