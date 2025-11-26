import { Employee } from '../models/Employee.js';

const mockEmployees = [
  {
    id: '1',
    name: 'Sarah Johnson',
    age: 32,
    email: 'sarah.j@company.com',
    phone: '+1-555-0123',
    department: 'Engineering',
    position: 'Senior Developer',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    attendance: 95,
    location: 'New York, NY',
    joinDate: '2020-03-15',
    manager: 'Michael Chen',
    subjects: ['JavaScript', 'React', 'Node.js'],
    projectsCompleted: 24,
    currentTasks: 3,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Michael Chen',
    age: 35,
    email: 'michael.c@company.com',
    phone: '+1-555-0124',
    department: 'Engineering',
    position: 'Tech Lead',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    attendance: 98,
    location: 'San Francisco, CA',
    joinDate: '2019-06-10',
    manager: 'CTO',
    subjects: ['Architecture', 'Leadership', 'TypeScript'],
    projectsCompleted: 42,
    currentTasks: 2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Emily Davis',
    age: 28,
    email: 'emily.d@company.com',
    phone: '+1-555-0125',
    department: 'Design',
    position: 'UI/UX Designer',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    attendance: 88,
    location: 'Austin, TX',
    joinDate: '2021-01-20',
    manager: 'Design Director',
    subjects: ['Figma', 'User Research', 'Prototyping'],
    projectsCompleted: 18,
    currentTasks: 5,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '4',
    name: 'David Wilson',
    age: 29,
    email: 'david.w@company.com',
    phone: '+1-555-0126',
    department: 'Marketing',
    position: 'Marketing Manager',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    attendance: 92,
    location: 'Chicago, IL',
    joinDate: '2020-08-12',
    manager: 'CMO',
    subjects: ['SEO', 'Content Strategy', 'Analytics'],
    projectsCompleted: 31,
    currentTasks: 4,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '5',
    name: 'Lisa Rodriguez',
    age: 26,
    email: 'lisa.r@company.com',
    phone: '+1-555-0127',
    department: 'HR',
    position: 'HR Specialist',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
    attendance: 96,
    location: 'Miami, FL',
    joinDate: '2021-11-05',
    manager: 'HR Director',
    subjects: ['Recruitment', 'Employee Relations', 'Training'],
    projectsCompleted: 15,
    currentTasks: 6,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Check if MongoDB is connected
const isMongoConnected = () => {
  return mongoose.connection.readyState === 1;
};

export const resolvers = {
  Query: {
    employees: async (_, { filter, sort, search }) => {
      try {
        // Try to use MongoDB if connected
        if (isMongoConnected()) {
          let query = {};

          // Apply filters
          if (filter) {
            if (filter.department) query.department = filter.department;
            if (filter.position) query.position = { $regex: filter.position, $options: 'i' };
            if (filter.minAttendance || filter.maxAttendance) {
              query.attendance = {};
              if (filter.minAttendance) query.attendance.$gte = filter.minAttendance;
              if (filter.maxAttendance) query.attendance.$lte = filter.maxAttendance;
            }
          }

          // Apply search
          if (search) {
            query.$or = [
              { name: { $regex: search, $options: 'i' } },
              { email: { $regex: search, $options: 'i' } },
              { department: { $regex: search, $options: 'i' } }
            ];
          }

          let employeesQuery = Employee.find(query);

          // Apply sorting
          if (sort) {
            const sortOrder = sort.order === 'DESC' ? -1 : 1;
            employeesQuery = employeesQuery.sort({ [sort.field]: sortOrder });
          }

          const employees = await employeesQuery.exec();
          return employees;
        }

        // Fallback to mock data
        console.log('🔄 Using mock data for employees query');
        let employees = [...mockEmployees];

        // Apply search to mock data
        if (search) {
          employees = employees.filter(emp => 
            emp.name.toLowerCase().includes(search.toLowerCase()) ||
            emp.email.toLowerCase().includes(search.toLowerCase()) ||
            emp.department.toLowerCase().includes(search.toLowerCase())
          );
        }

        // Apply filters to mock data
        if (filter) {
          if (filter.department) {
            employees = employees.filter(emp => emp.department === filter.department);
          }
          if (filter.position) {
            employees = employees.filter(emp => 
              emp.position.toLowerCase().includes(filter.position.toLowerCase())
            );
          }
          if (filter.minAttendance) {
            employees = employees.filter(emp => emp.attendance >= filter.minAttendance);
          }
          if (filter.maxAttendance) {
            employees = employees.filter(emp => emp.attendance <= filter.maxAttendance);
          }
        }

        // Apply sorting to mock data
        if (sort) {
          employees.sort((a, b) => {
            const aVal = a[sort.field];
            const bVal = b[sort.field];
            if (sort.order === 'DESC') {
              return aVal < bVal ? 1 : -1;
            }
            return aVal > bVal ? 1 : -1;
          });
        }

        return employees;
      } catch (error) {
        console.error('Error in employees query:', error);
        throw new Error(`Failed to fetch employees: ${error.message}`);
      }
    },

    employee: async (_, { id }) => {
      try {
        // Try MongoDB first
        if (isMongoConnected()) {
          const employee = await Employee.findById(id);
          if (!employee) {
            throw new Error('Employee not found');
          }
          return employee;
        }

        // Fallback to mock data
        const employee = mockEmployees.find(emp => emp.id === id);
        if (!employee) {
          throw new Error('Employee not found');
        }
        return employee;
      } catch (error) {
        throw new Error(`Failed to fetch employee: ${error.message}`);
      }
    },

    employeesPaginated: async (_, { 
      page = 1, 
      limit = 10, 
      filter, 
      sort, 
      search 
    }) => {
      try {
        // Get all employees with filters
        const allEmployees = await resolvers.Query.employees(null, { filter, sort, search });
        
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        
        const employees = allEmployees.slice(startIndex, endIndex);
        const totalCount = allEmployees.length;
        const hasNextPage = endIndex < totalCount;

        return {
          employees,
          totalCount,
          hasNextPage
        };
      } catch (error) {
        throw new Error(`Failed to fetch paginated employees: ${error.message}`);
      }
    }
  },

  Mutation: {
    addEmployee: async (_, { input }) => {
      try {
        // Try MongoDB first
        if (isMongoConnected()) {
          const existingEmployee = await Employee.findOne({ email: input.email });
          if (existingEmployee) {
            throw new Error('Employee with this email already exists');
          }

          const employee = new Employee({
            ...input,
            joinDate: new Date(input.joinDate)
          });

          await employee.save();
          return employee;
        }

        // Fallback to mock data
        const newEmployee = {
          id: String(mockEmployees.length + 1),
          ...input,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        
        mockEmployees.push(newEmployee);
        return newEmployee;
      } catch (error) {
        throw new Error(`Failed to add employee: ${error.message}`);
      }
    },

    updateEmployee: async (_, { id, input }) => {
      try {
        // Try MongoDB first
        if (isMongoConnected()) {
          const employee = await Employee.findByIdAndUpdate(
            id,
            { 
              ...input,
              updatedAt: new Date()
            },
            { new: true, runValidators: true }
          );

          if (!employee) {
            throw new Error('Employee not found');
          }

          return employee;
        }

        // Fallback to mock data
        const index = mockEmployees.findIndex(emp => emp.id === id);
        if (index === -1) {
          throw new Error('Employee not found');
        }

        mockEmployees[index] = {
          ...mockEmployees[index],
          ...input,
          updatedAt: new Date().toISOString()
        };

        return mockEmployees[index];
      } catch (error) {
        throw new Error(`Failed to update employee: ${error.message}`);
      }
    },

    deleteEmployee: async (_, { id }) => {
      try {
        // Try MongoDB first
        if (isMongoConnected()) {
          const result = await Employee.findByIdAndDelete(id);
          return !!result;
        }

        const index = mockEmployees.findIndex(emp => emp.id === id);
        if (index === -1) {
          throw new Error('Employee not found');
        }

        mockEmployees.splice(index, 1);
        return true;
      } catch (error) {
        throw new Error(`Failed to delete employee: ${error.message}`);
      }
    }
  }
};