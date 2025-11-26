const API_URL = 'http://localhost:4000/graphql';
const getMockEmployees = () => [
  {
    id: '1',
    name: 'Sarah Johnson',
    age: 32,
    email: 'sarah.j@company.com',
    phone: '+1-555-0123',
    department: 'Engineering',
    position: 'Senior Frontend Developer',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face',
    attendance: 95,
    location: 'New York, NY',
    joinDate: 'Mar 15, 2020',
    manager: 'Michael Chen',
    subjects: ['React', 'TypeScript', 'GraphQL', 'Node.js', 'UI/UX'],
    projectsCompleted: 24,
    currentTasks: 3
  },
  {
    id: '2',
    name: 'Michael Chen',
    age: 35,
    email: 'michael.c@company.com',
    phone: '+1-555-0124',
    department: 'Engineering',
    position: 'Tech Lead',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
    attendance: 98,
    location: 'San Francisco, CA',
    joinDate: 'Jun 10, 2019',
    manager: 'CTO',
    subjects: ['Architecture', 'Leadership', 'Microservices', 'AWS'],
    projectsCompleted: 42,
    currentTasks: 2
  },
  {
    id: '3',
    name: 'Emily Davis',
    age: 28,
    email: 'emily.d@company.com',
    phone: '+1-555-0125',
    department: 'Design',
    position: 'Senior UI/UX Designer',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face',
    attendance: 88,
    location: 'Austin, TX',
    joinDate: 'Jan 20, 2021',
    manager: 'Design Director',
    subjects: ['Figma', 'User Research', 'Prototyping', 'Design Systems'],
    projectsCompleted: 18,
    currentTasks: 5
  },
  {
    id: '4',
    name: 'David Wilson',
    age: 29,
    email: 'david.w@company.com',
    phone: '+1-555-0126',
    department: 'Marketing',
    position: 'Marketing Manager',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
    attendance: 92,
    location: 'Chicago, IL',
    joinDate: 'Aug 12, 2020',
    manager: 'CMO',
    subjects: ['SEO', 'Content Strategy', 'Analytics', 'Social Media'],
    projectsCompleted: 31,
    currentTasks: 4
  },
  {
    id: '5',
    name: 'Lisa Rodriguez',
    age: 26,
    email: 'lisa.r@company.com',
    phone: '+1-555-0127',
    department: 'HR',
    position: 'HR Specialist',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop&crop=face',
    attendance: 96,
    location: 'Miami, FL',
    joinDate: 'Nov 5, 2021',
    manager: 'HR Director',
    subjects: ['Recruitment', 'Employee Relations', 'Training', 'Benefits'],
    projectsCompleted: 15,
    currentTasks: 6
  },
  {
    id: '6',
    name: 'Alex Thompson',
    age: 31,
    email: 'alex.t@company.com',
    phone: '+1-555-0128',
    department: 'Engineering',
    position: 'Backend Developer',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face',
    attendance: 91,
    location: 'Seattle, WA',
    joinDate: 'Feb 28, 2020',
    manager: 'Michael Chen',
    subjects: ['Python', 'Django', 'PostgreSQL', 'Docker', 'Kubernetes'],
    projectsCompleted: 28,
    currentTasks: 4
  },
  {
    id: '7',
    name: 'Sophia Martinez',
    age: 27,
    email: 'sophia.m@company.com',
    phone: '+1-555-0129',
    department: 'Design',
    position: 'Product Designer',
    avatar: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=300&h=300&fit=crop&crop=face',
    attendance: 94,
    location: 'Portland, OR',
    joinDate: 'Jul 15, 2021',
    manager: 'Emily Davis',
    subjects: ['UI Design', 'User Testing', 'Wireframing', 'Animation'],
    projectsCompleted: 22,
    currentTasks: 3
  },
  {
    id: '8',
    name: 'James Anderson',
    age: 34,
    email: 'james.a@company.com',
    phone: '+1-555-0130',
    department: 'Sales',
    position: 'Sales Director',
    avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=300&h=300&fit=crop&crop=face',
    attendance: 89,
    location: 'Boston, MA',
    joinDate: 'Apr 3, 2019',
    manager: 'VP Sales',
    subjects: ['CRM', 'Negotiation', 'Enterprise Sales', 'Strategy'],
    projectsCompleted: 35,
    currentTasks: 2
  },
  {
    id: '9',
    name: 'Rachel Kim',
    age: 25,
    email: 'rachel.k@company.com',
    phone: '+1-555-0131',
    department: 'Engineering',
    position: 'Mobile Developer',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&h=300&fit=crop&crop=face',
    attendance: 97,
    location: 'Denver, CO',
    joinDate: 'Sep 8, 2022',
    manager: 'Michael Chen',
    subjects: ['React Native', 'iOS', 'Android', 'Firebase'],
    projectsCompleted: 12,
    currentTasks: 5
  },
  {
    id: '10',
    name: 'Daniel Park',
    age: 30,
    email: 'daniel.p@company.com',
    phone: '+1-555-0132',
    department: 'Operations',
    position: 'Operations Manager',
    avatar: 'https://images.unsplash.com/photo-1517070208541-6ddc4d3efbcb?w=300&h=300&fit=crop&crop=face',
    attendance: 93,
    location: 'Atlanta, GA',
    joinDate: 'May 22, 2020',
    manager: 'COO',
    subjects: ['Process Improvement', 'Logistics', 'Supply Chain', 'Analytics'],
    projectsCompleted: 19,
    currentTasks: 4
  },
  {
    id: '11',
    name: 'Olivia Chen',
    age: 29,
    email: 'olivia.c@company.com',
    phone: '+1-555-0133',
    department: 'Marketing',
    position: 'Content Strategist',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&h=300&fit=crop&crop=face',
    attendance: 90,
    location: 'Los Angeles, CA',
    joinDate: 'Dec 10, 2021',
    manager: 'David Wilson',
    subjects: ['Content Writing', 'SEO', 'Social Media', 'Brand Strategy'],
    projectsCompleted: 26,
    currentTasks: 3
  },
  {
    id: '12',
    name: 'Kevin Zhang',
    age: 33,
    email: 'kevin.z@company.com',
    phone: '+1-555-0134',
    department: 'Engineering',
    position: 'DevOps Engineer',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop&crop=face',
    attendance: 96,
    location: 'Remote',
    joinDate: 'Mar 3, 2020',
    manager: 'Michael Chen',
    subjects: ['AWS', 'Terraform', 'CI/CD', 'Monitoring', 'Security'],
    projectsCompleted: 33,
    currentTasks: 2
  },
  {
    id: '13',
    name: 'Amanda Wilson',
    age: 31,
    email: 'amanda.w@company.com',
    phone: '+1-555-0135',
    department: 'HR',
    position: 'Talent Acquisition',
    avatar: 'https://images.unsplash.com/photo-1491349174775-aaafddd81942?w=300&h=300&fit=crop&crop=face',
    attendance: 94,
    location: 'Chicago, IL',
    joinDate: 'Aug 18, 2021',
    manager: 'Lisa Rodriguez',
    subjects: ['Recruitment', 'Interviewing', 'Onboarding', 'Employer Branding'],
    projectsCompleted: 17,
    currentTasks: 5
  },
  {
    id: '14',
    name: 'Marcus Brown',
    age: 36,
    email: 'marcus.b@company.com',
    phone: '+1-555-0136',
    department: 'Finance',
    position: 'Financial Analyst',
    avatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=300&h=300&fit=crop&crop=face',
    attendance: 91,
    location: 'New York, NY',
    joinDate: 'Jan 7, 2019',
    manager: 'CFO',
    subjects: ['Financial Modeling', 'Excel', 'Data Analysis', 'Reporting'],
    projectsCompleted: 29,
    currentTasks: 3
  },
  {
    id: '15',
    name: 'Jessica Lee',
    age: 26,
    email: 'jessica.l@company.com',
    phone: '+1-555-0137',
    department: 'Design',
    position: 'UX Researcher',
    avatar: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=300&h=300&fit=crop&crop=face',
    attendance: 95,
    location: 'San Diego, CA',
    joinDate: 'Oct 12, 2022',
    manager: 'Emily Davis',
    subjects: ['User Research', 'Data Analysis', 'Usability Testing', 'Personas'],
    projectsCompleted: 14,
    currentTasks: 4
  }
];
// Mock data storage - using localStorage for persistence
let mockEmployees = [];

// Initialize with mock data if empty
const initializeMockData = () => {
  if (mockEmployees.length === 0) {
    mockEmployees = getMockEmployees();
    // Save to localStorage for persistence
    localStorage.setItem('employees', JSON.stringify(mockEmployees));
  }
};

// Load from localStorage on module load
if (typeof window !== 'undefined') {
  const saved = localStorage.getItem('employees');
  if (saved) {
    mockEmployees = JSON.parse(saved);
  } else {
    initializeMockData();
  }
}

export const fetchEmployees = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Always load from localStorage to get latest data
      const saved = localStorage.getItem('employees');
      if (saved) {
        mockEmployees = JSON.parse(saved);
      } else {
        initializeMockData();
      }
      resolve([...mockEmployees]);
    }, 500);
  });
};

export const fetchEmployee = async (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const saved = localStorage.getItem('employees');
      if (saved) {
        mockEmployees = JSON.parse(saved);
      }
      const employee = mockEmployees.find(emp => emp.id === id);
      if (employee) {
        resolve(employee);
      } else {
        reject(new Error('Employee not found'));
      }
    }, 300);
  });
};

export const addEmployee = async (employee) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const saved = localStorage.getItem('employees');
      if (saved) {
        mockEmployees = JSON.parse(saved);
      }
      const newEmployee = { 
        ...employee, 
        id: Date.now().toString(),
        avatar: employee.avatar || `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face&${Date.now()}`
      };
      mockEmployees.push(newEmployee);
      localStorage.setItem('employees', JSON.stringify(mockEmployees));
      resolve(newEmployee);
    }, 500);
  });
};

export const updateEmployee = async (id, updates) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const saved = localStorage.getItem('employees');
      if (saved) {
        mockEmployees = JSON.parse(saved);
      }
      const index = mockEmployees.findIndex(emp => emp.id === id);
      if (index !== -1) {
        mockEmployees[index] = { ...mockEmployees[index], ...updates };
        localStorage.setItem('employees', JSON.stringify(mockEmployees));
        resolve(mockEmployees[index]);
      } else {
        reject(new Error('Employee not found'));
      }
    }, 500);
  });
};

export const deleteEmployee = async (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const saved = localStorage.getItem('employees');
      if (saved) {
        mockEmployees = JSON.parse(saved);
      }
      const index = mockEmployees.findIndex(emp => emp.id === id);
      if (index !== -1) {
        mockEmployees.splice(index, 1);
        localStorage.setItem('employees', JSON.stringify(mockEmployees));
        resolve(true);
      } else {
        reject(new Error('Employee not found'));
      }
    }, 500);
  });
};
