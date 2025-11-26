import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Users, 
  Star, 
  Award,
  TrendingUp,
  Clock
} from 'lucide-react';
import { fetchEmployee } from '../utils/api';
import './EmployeeDetail.css';

const EmployeeDetail = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEmployee();
  }, [id]);

  const loadEmployee = async () => {
    try {
      const data = await fetchEmployee(id);
      setEmployee(data);
    } catch (error) {
      console.error('Error loading employee:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading employee details...</p>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="error-container">
        <h2>Employee not found</h2>
        <p>The requested team member could not be found.</p>
        <Link to="/" className="back-btn">
          <ArrowLeft size={16} />
          Back to Team
        </Link>
      </div>
    );
  }

  const getPerformanceLevel = (projects) => {
    if (projects >= 30) return { level: 'High', color: 'high', description: 'Top Performer' };
    if (projects >= 20) return { level: 'Medium', color: 'medium', description: 'Solid Contributor' };
    return { level: 'Low', color: 'low', description: 'Developing' };
  };

  const performance = getPerformanceLevel(employee.projectsCompleted);

  return (
    <div className="employee-detail">
      {/* Back Navigation */}
      <div className="detail-navigation">
        <Link to="/" className="back-btn">
          <ArrowLeft size={20} />
          Back to Team
        </Link>
      </div>

      {/* Main Detail Card */}
      <div className="detail-card">
        {/* Header Section */}
        <div className="detail-header">
          <div className="profile-section">
            <div className="avatar-container">
              <img src={employee.avatar} alt={employee.name} className="detail-avatar" />
              <div className="status-badge">Active</div>
            </div>
            <div className="profile-info">
              <h1 className="employee-name">{employee.name}</h1>
              <p className="employee-title">{employee.position}</p>
              <div className="department-badge">{employee.department}</div>
              
              <div className="contact-info-grid">
                <div className="contact-item">
                  <Mail size={18} />
                  <span>{employee.email}</span>
                </div>
                <div className="contact-item">
                  <Phone size={18} />
                  <span>{employee.phone}</span>
                </div>
                <div className="contact-item">
                  <MapPin size={18} />
                  <span>{employee.location}</span>
                </div>
                <div className="contact-item">
                  <Calendar size={18} />
                  <span>Joined {employee.joinDate}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Stats */}
          <div className="performance-section">
            <div className="performance-card">
              <div className="performance-header">
                <TrendingUp size={24} />
                <h3>Performance</h3>
              </div>
              <div className={`performance-level ${performance.color}`}>
                <span className="level-text">{performance.level}</span>
                <span className="level-desc">{performance.description}</span>
              </div>
            </div>

            <div className="attendance-card">
              <div className="attendance-circle">
                <div className="circle-progress">
                  <svg viewBox="0 0 36 36" className="circular-chart">
                    <path
                      className="circle-bg"
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="circle"
                      strokeDasharray={`${employee.attendance}, 100`}
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <span className="attendance-value">{employee.attendance}%</span>
                </div>
                <span className="attendance-label">Attendance</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Information */}
        <div className="detail-content">
          {/* Skills & Expertise */}
          <div className="info-section">
            <h2 className="section-title">
              <Award size={20} />
              Skills & Expertise
            </h2>
            <div className="skills-grid">
              {employee.subjects.map((skill, index) => (
                <div key={index} className="skill-card">
                  <span className="skill-name">{skill}</span>
                  <div className="skill-level">
                    <div 
                      className="skill-progress" 
                      style={{ width: `${80 + (index * 5)}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Work Statistics */}
          <div className="info-section">
            <h2 className="section-title">
              <Users size={20} />
              Work Statistics
            </h2>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon completed">
                  <Star size={24} />
                </div>
                <div className="stat-info">
                  <span className="stat-number">{employee.projectsCompleted}</span>
                  <span className="stat-label">Projects Completed</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon ongoing">
                  <Clock size={24} />
                </div>
                <div className="stat-info">
                  <span className="stat-number">{employee.currentTasks}</span>
                  <span className="stat-label">Current Tasks</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon performance">
                  <TrendingUp size={24} />
                </div>
                <div className="stat-info">
                  <span className="stat-number">{employee.attendance}%</span>
                  <span className="stat-label">Attendance Rate</span>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="info-section">
            <h2 className="section-title">Additional Information</h2>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Manager</span>
                <span className="info-value">{employee.manager}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Join Date</span>
                <span className="info-value">{employee.joinDate}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Location</span>
                <span className="info-value">{employee.location}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Department</span>
                <span className="info-value">{employee.department}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetail;