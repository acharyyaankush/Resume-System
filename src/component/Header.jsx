import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FileText, Settings, LayoutDashboard, LogOut, User, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';


const Header = () => {

  const { user, logout } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

    return (
      <header className="header">
        <div className="header-content">
          <Link to="/dashboard" className="logo">
            <FileText size={28} />
            <span>ResumeEco</span>
          </Link>
          <nav className="nav-links">
            <Link to="/dashboard" className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}>
              <LayoutDashboard size={18} />
              Dashboard
            </Link>
            <Link to="/builder" className={`nav-link ${isActive('/builder') ? 'active' : ''}`}>
              <FileText size={18} />
              Resume Builder
            </Link>
            <Link to="/integrations" className={`nav-link ${isActive('/integrations') ? 'active' : ''}`}>
              <Settings size={18} />
              Integrations
            </Link>
          </nav>
          <div className="user-menu">
            <div className="user-info">
              <img src={user?.avatar} alt={user?.name} className="user-avatar" />
              <span className="user-name">Hi, {user?.name}</span>
            </div>
            <button onClick={handleLogout} className="logout-btn">
              <LogOut size={18} />
              Logout
            </button>
          </div>
          <button className="mobile-menu-btn"onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="mobile-menu">
            <div className="mobile-user-info">
              <img src={user?.avatar} alt={user?.name} className="user-avatar" />
              <div>
                <p className="user-name">{user?.name}</p>
                <p className="user-email">{user?.email}</p>
              </div>
            </div>
            
            <nav className="mobile-nav-links">
              <Link to="/dashboard" className={`mobile-nav-link ${isActive('/dashboard') ? 'active' : ''}`}onClick={() => setIsMobileMenuOpen(false)}>
                <LayoutDashboard size={20} />
                Dashboard
              </Link>
              <Link to="/builder" className={`mobile-nav-link ${isActive('/builder') ? 'active' : ''}`}onClick={() => setIsMobileMenuOpen(false)}>
                <FileText size={20} />
                Resume Builder
              </Link>
              <Link to="/integrations" className={`mobile-nav-link ${isActive('/integrations') ? 'active' : ''}`}onClick={() => setIsMobileMenuOpen(false)}>
                <Settings size={20} />
                Integrations
              </Link>
            </nav>

            <button onClick={handleLogout}className="mobile-logout-btn">
              <LogOut size={20} />
              Logout
            </button>
          </div>
        )}
      </header>
    )
  }


export default Header