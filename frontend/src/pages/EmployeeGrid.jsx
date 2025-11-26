import React, { useState, useEffect, useMemo } from 'react';
import { TrendingUp, Users, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { 
  MoreVertical, 
  Edit, 
  Flag, 
  Trash2, 
  Search, 
  Filter,
  Mail,
  Phone,
  MapPin,
  Plus,
  Eye
} from 'lucide-react';
import { fetchEmployees, deleteEmployee } from '../utils/api';
import AddEmployeeModal from '../components/AddEmployeeModal';
import EditEmployeeModal from '../components/EditEmployeeModal';
import './EmployeeGrid.css';

const EmployeeGrid = ({ viewMode }) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [activeMenu, setActiveMenu] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      const data = await fetchEmployees();
      setEmployees(data);
    } catch (error) {
      console.error('Error loading employees:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (employeeId) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await deleteEmployee(employeeId);
        setEmployees(employees.filter(emp => emp.id !== employeeId));
        setActiveMenu(null);
      } catch (error) {
        alert('Error deleting employee: ' + error.message);
      }
    }
  };

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setShowEditModal(true);
    setActiveMenu(null);
  };

  const handleAddEmployee = (newEmployee) => {
    setEmployees([...employees, { ...newEmployee, id: Date.now().toString() }]);
  };

  const handleUpdateEmployee = (updatedEmployee) => {
    setEmployees(employees.map(emp => 
      emp.id === updatedEmployee.id ? updatedEmployee : emp
    ));
  };

  const filteredAndSortedEmployees = useMemo(() => {
    let filtered = employees.filter(emp =>
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.position.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return filtered.sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'department') return a.department.localeCompare(b.department);
      if (sortBy === 'attendance') return b.attendance - a.attendance;
      if (sortBy === 'projectsCompleted') return b.projectsCompleted - a.projectsCompleted;
      return a[sortBy] - b[sortBy];
    });
  }, [employees, searchTerm, sortBy]);

  const toggleMenu = (id) => {
    setActiveMenu(activeMenu === id ? null : id);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading your team...</p>
      </div>
    );
  }

  return (
    <div className="employee-grid-page">
      {/* Header Section */}
      <div className="page-header">
        <div className="header-content">
          <h1 className="page-title">Team Members</h1>
          <p className="page-subtitle">Manage and explore your amazing team</p>
        </div>
        <div className="header-actions">
          <button 
            className="add-employee-btn"
            onClick={() => setShowAddModal(true)}
          >
            <Plus size={20} />
            Add Employee
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-container">
        <div className="stat-card primary">
          <div className="stat-icon">
            <Users size={24} />
          </div>
          <div className="stat-content">
            <span className="stat-number">{employees.length}</span>
            <span className="stat-label">Total Members</span>
          </div>
        </div>
        <div className="stat-card success">
          <div className="stat-icon">
            <BarChart3 size={24} />
          </div>
          <div className="stat-content">
            <span className="stat-number">
              {employees.length > 0 ? Math.round(employees.reduce((acc, emp) => acc + emp.attendance, 0) / employees.length) : 0}%
            </span>
            <span className="stat-label">Avg Attendance</span>
          </div>
        </div>
        <div className="stat-card warning">
          <div className="stat-icon">
            <TrendingUp size={24} />
          </div>
          <div className="stat-content">
            <span className="stat-number">
              {employees.reduce((acc, emp) => acc + emp.projectsCompleted, 0)}
            </span>
            <span className="stat-label">Total Projects</span>
          </div>
        </div>
      </div>

      {/* Controls Section */}
      <div className="controls-section">
        <div className="search-container">
          <div className="search-box">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Search team members by name, department, or position..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        <div className="filter-container">
          <div className="filter-group">
            <Filter size={18} />
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select"
            >
              <option value="name">Sort by Name</option>
              <option value="department">Sort by Department</option>
              <option value="attendance">Sort by Attendance</option>
              <option value="projectsCompleted">Sort by Projects</option>
            </select>
          </div>
        </div>
      </div>

      {/* Employee Grid/Tile */}
      <div className={`employee-container ${viewMode}`}>
        {filteredAndSortedEmployees.map(employee => (
          <EmployeeCard
            key={employee.id}
            employee={employee}
            viewMode={viewMode}
            isMenuOpen={activeMenu === employee.id}
            onMenuToggle={() => toggleMenu(employee.id)}
            onEdit={() => handleEdit(employee)}
            onDelete={() => handleDelete(employee.id)}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredAndSortedEmployees.length === 0 && (
        <div className="empty-state">
          <Users size={64} className="empty-icon" />
          <h3>No team members found</h3>
          <p>Try adjusting your search criteria or add a new team member</p>
          <button 
            className="add-employee-btn"
            onClick={() => setShowAddModal(true)}
          >
            <Plus size={20} />
            Add First Employee
          </button>
        </div>
      )}

      {/* Modals */}
      {showAddModal && (
        <AddEmployeeModal
          onClose={() => setShowAddModal(false)}
          onSave={handleAddEmployee}
        />
      )}

      {showEditModal && selectedEmployee && (
        <EditEmployeeModal
          employee={selectedEmployee}
          onClose={() => setShowEditModal(false)}
          onSave={handleUpdateEmployee}
        />
      )}
    </div>
  );
};

const EmployeeCard = ({ employee, viewMode, isMenuOpen, onMenuToggle, onEdit, onDelete }) => {
  const getAttendanceColor = (attendance) => {
    if (attendance >= 90) return 'high';
    if (attendance >= 80) return 'medium';
    return 'low';
  };

  if (viewMode === 'grid') {
    return (
      <div className="employee-card grid-view">
        <div className="card-background"></div>
        
        {/* Header Section */}
        <div className="card-header">
          <div className="avatar-section">
            <img src={employee.avatar} alt={employee.name} className="avatar" />
            <div className="online-indicator"></div>
          </div>
          <div className="employee-basic-info">
            <h3 className="employee-name">{employee.name}</h3>
            <p className="employee-position">{employee.position}</p>
            <div className="department-tag">{employee.department}</div>
          </div>
          <div className="card-actions">
            <button 
              className={`menu-btn ${isMenuOpen ? 'active' : ''}`}
              onClick={onMenuToggle}
            >
              <MoreVertical size={16} />
            </button>
            {isMenuOpen && (
              <div className="action-menu">
                <Link to={`/employee/${employee.id}`} className="action-item">
                  <Eye size={14} />
                  View Details
                </Link>
                <button className="action-item" onClick={onEdit}>
                  <Edit size={14} />
                  Edit Profile
                </button>
                <button className="action-item delete" onClick={onDelete}>
                  <Trash2 size={14} />
                  Remove
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Contact Info */}
        <div className="contact-info">
          <div className="contact-item">
            <Mail size={14} />
            <span>{employee.email}</span>
          </div>
          <div className="contact-item">
            <Phone size={14} />
            <span>{employee.phone}</span>
          </div>
        </div>

        {/* Stats Section */}
        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-label">Attendance</span>
            <span className={`stat-value ${getAttendanceColor(employee.attendance)}`}>
              {employee.attendance}%
            </span>
            <div className="progress-bar">
              <div 
                className={`progress-fill ${getAttendanceColor(employee.attendance)}`}
                style={{ width: `${employee.attendance}%` }}
              ></div>
            </div>
          </div>
          <div className="stat-item">
            <span className="stat-label">Projects</span>
            <span className="stat-value">{employee.projectsCompleted}</span>
            <div className="projects-badge">
              {employee.projectsCompleted} completed
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="skills-section">
          <div className="skills-list">
            {employee.subjects.slice(0, 3).map((subject, index) => (
              <span key={index} className="skill-tag">
                {subject}
              </span>
            ))}
            {employee.subjects.length > 3 && (
              <span className="skill-tag more">+{employee.subjects.length - 3}</span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="card-footer">
          <Link to={`/employee/${employee.id}`} className="view-details-btn">
            View Full Profile
          </Link>
        </div>
      </div>
    );
  }

  // Tile View
  return (
    <div className="employee-card tile-view">
      <div className="card-background"></div>
      
      <div className="tile-content">
        <div className="tile-header">
          <div className="avatar-section">
            <img src={employee.avatar} alt={employee.name} className="avatar" />
            <div className="online-indicator"></div>
          </div>
          <div className="tile-actions">
            <button 
              className={`menu-btn ${isMenuOpen ? 'active' : ''}`}
              onClick={onMenuToggle}
            >
              <MoreVertical size={16} />
            </button>
            {isMenuOpen && (
              <div className="action-menu">
                <Link to={`/employee/${employee.id}`} className="action-item">
                  <Eye size={14} />
                  View Details
                </Link>
                <button className="action-item" onClick={onEdit}>
                  <Edit size={14} />
                  Edit
                </button>
                <button className="action-item delete" onClick={onDelete}>
                  <Trash2 size={14} />
                  Remove
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="tile-info">
          <h3 className="employee-name">{employee.name}</h3>
          <p className="employee-position">{employee.position}</p>
          <div className="department-tag">{employee.department}</div>
          
          <div className="tile-stats">
            <div className="tile-stat">
              <span className="stat-label">Attendance</span>
              <span className={`stat-value ${getAttendanceColor(employee.attendance)}`}>
                {employee.attendance}%
              </span>
            </div>
            <div className="tile-stat">
              <span className="stat-label">Projects</span>
              <span className="stat-value">{employee.projectsCompleted}</span>
            </div>
          </div>

          <div className="skills-preview">
            {employee.subjects.slice(0, 2).map((subject, index) => (
              <span key={index} className="skill-tag">
                {subject}
              </span>
            ))}
          </div>
        </div>
      </div>

      <Link to={`/employee/${employee.id}`} className="tile-overlay-link"></Link>
    </div>
  );
};

export default EmployeeGrid;