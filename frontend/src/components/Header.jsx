import React, { useState } from 'react';
import { Menu, X, Users, Grid, Layout, User, BarChart3, Settings, Bell } from 'lucide-react';
import './Header.css';

const Header = ({ viewMode, setViewMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { label: 'Dashboard', icon: <Layout size={20} /> },
    { 
      label: 'Employees', 
      icon: <Users size={20} />,
      submenu: ['All Employees', 'Teams', 'Departments']
    },
    { 
      label: 'Analytics', 
      icon: <BarChart3 size={20} />,
      submenu: ['Attendance', 'Performance', 'Productivity']
    }
  ];

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <div className="logo">
          <div className="logo-gradient">
            <Users className="logo-icon" />
          </div>
          <div className="logo-text">
            <span className="logo-main">TeamFlow</span>
            <span className="logo-sub">Management</span>
          </div>
        </div>

        {/* Horizontal Menu */}
        <nav className="horizontal-menu">
          {menuItems.map((item, index) => (
            <div key={index} className="menu-item">
              <span className="menu-label">
                {item.icon}
                {item.label}
              </span>
              {item.submenu && (
                <div className="submenu">
                  {item.submenu.map((subItem, subIndex) => (
                    <div key={subIndex} className="submenu-item">
                      {subItem}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Header Controls */}
        <div className="header-controls">
          {/* View Toggle */}
          <div className="view-toggle">
            <button
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              title="Grid View"
            >
              <Grid size={18} />
            </button>
            <button
              className={`view-btn ${viewMode === 'tile' ? 'active' : ''}`}
              onClick={() => setViewMode('tile')}
              title="Tile View"
            >
              <Layout size={18} />
            </button>
          </div>

          {/* Notifications */}
          <button className="icon-btn notification-btn">
            <Bell size={20} />
            <span className="notification-dot"></span>
          </button>

          {/* User Profile */}
          <div className="user-profile">
            <img 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" 
              alt="Admin" 
              className="user-avatar"
            />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="hamburger-btn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="mobile-menu">
          {menuItems.map((item, index) => (
            <div key={index} className="mobile-menu-item">
              <div className="mobile-menu-label">
                {item.icon}
                {item.label}
              </div>
              {item.submenu && (
                <div className="mobile-submenu">
                  {item.submenu.map((subItem, subIndex) => (
                    <div key={subIndex} className="mobile-submenu-item">
                      {subItem}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;