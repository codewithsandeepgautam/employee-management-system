import React, { useState, useEffect } from 'react';
import { X, Upload, User } from 'lucide-react';
import './Modal.css';

const EditEmployeeModal = ({ employee, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: 'Engineering',
    position: '',
    attendance: 90,
    location: '',
    manager: '',
    subjects: [],
    projectsCompleted: 0,
    currentTasks: 0
  });
  const [newSkill, setNewSkill] = useState('');

  const departments = ['Engineering', 'Design', 'Marketing', 'Sales', 'HR', 'Finance', 'Operations'];

  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name || '',
        email: employee.email || '',
        phone: employee.phone || '',
        department: employee.department || 'Engineering',
        position: employee.position || '',
        attendance: employee.attendance || 90,
        location: employee.location || '',
        manager: employee.manager || '',
        subjects: employee.subjects || [],
        projectsCompleted: employee.projectsCompleted || 0,
        currentTasks: employee.currentTasks || 0
      });
    }
  }, [employee]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...employee, ...formData });
    onClose();
  };

  const addSkill = () => {
    if (newSkill.trim() && !formData.subjects.includes(newSkill.trim())) {
      setFormData({
        ...formData,
        subjects: [...formData.subjects, newSkill.trim()]
      });
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setFormData({
      ...formData,
      subjects: formData.subjects.filter(skill => skill !== skillToRemove)
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Edit Team Member</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-grid">
            <div className="form-group">
              <label>Full Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
                placeholder="Enter full name"
              />
            </div>

            <div className="form-group">
              <label>Email Address *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
                placeholder="Enter email address"
              />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                placeholder="Enter phone number"
              />
            </div>

            <div className="form-group">
              <label>Department *</label>
              <select
                value={formData.department}
                onChange={(e) => setFormData({...formData, department: e.target.value})}
              >
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Position *</label>
              <input
                type="text"
                value={formData.position}
                onChange={(e) => setFormData({...formData, position: e.target.value})}
                required
                placeholder="Enter job position"
              />
            </div>

            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                placeholder="Enter location"
              />
            </div>

            <div className="form-group">
              <label>Attendance (%)</label>
              <input
                type="number"
                min="0"
                max="100"
                value={formData.attendance}
                onChange={(e) => setFormData({...formData, attendance: parseInt(e.target.value)})}
              />
            </div>

            <div className="form-group">
              <label>Manager</label>
              <input
                type="text"
                value={formData.manager}
                onChange={(e) => setFormData({...formData, manager: e.target.value})}
                placeholder="Enter manager's name"
              />
            </div>

            <div className="form-group">
              <label>Projects Completed</label>
              <input
                type="number"
                min="0"
                value={formData.projectsCompleted}
                onChange={(e) => setFormData({...formData, projectsCompleted: parseInt(e.target.value)})}
              />
            </div>

            <div className="form-group">
              <label>Current Tasks</label>
              <input
                type="number"
                min="0"
                value={formData.currentTasks}
                onChange={(e) => setFormData({...formData, currentTasks: parseInt(e.target.value)})}
              />
            </div>
          </div>

          <div className="form-group full-width">
            <label>Skills & Expertise</label>
            <div className="skills-input">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Add a skill"
              />
              <button type="button" onClick={addSkill} className="add-skill-btn">
                Add
              </button>
            </div>
            <div className="skills-list">
              {formData.subjects.map((skill, index) => (
                <span key={index} className="skill-tag">
                  {skill}
                  <button type="button" onClick={() => removeSkill(skill)}>×</button>
                </span>
              ))}
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="save-btn">
              Update Team Member
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEmployeeModal;