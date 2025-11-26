import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Employee {
    id: ID!
    name: String!
    age: Int!
    email: String!
    phone: String!
    department: String!
    position: String!
    avatar: String
    attendance: Float!
    location: String
    joinDate: String!
    manager: String
    subjects: [String!]!
    projectsCompleted: Int!
    currentTasks: Int!
    createdAt: String!
    updatedAt: String!
  }

  input EmployeeInput {
    name: String!
    age: Int!
    email: String!
    phone: String!
    department: String!
    position: String!
    avatar: String
    attendance: Float!
    location: String
    joinDate: String!
    manager: String
    subjects: [String!]!
    projectsCompleted: Int!
    currentTasks: Int!
  }

  input EmployeeUpdateInput {
    name: String
    age: Int
    email: String
    phone: String
    department: String
    position: String
    avatar: String
    attendance: Float
    location: String
    manager: String
    subjects: [String!]
    projectsCompleted: Int
    currentTasks: Int
  }

  input EmployeeFilter {
    department: String
    position: String
    minAttendance: Float
    maxAttendance: Float
  }

  input SortOptions {
    field: String!
    order: String! # ASC or DESC
  }

  type EmployeeList {
    employees: [Employee!]!
    totalCount: Int!
    hasNextPage: Boolean!
  }

  type Query {
    # Get all employees with optional filtering
    employees(
      filter: EmployeeFilter
      sort: SortOptions
      search: String
    ): [Employee!]!

    # Get employee by ID
    employee(id: ID!): Employee

    # Get employees with pagination
    employeesPaginated(
      page: Int! = 1
      limit: Int! = 10
      filter: EmployeeFilter
      sort: SortOptions
      search: String
    ): EmployeeList!
  }

  type Mutation {
    # Add new employee
    addEmployee(input: EmployeeInput!): Employee!

    # Update employee
    updateEmployee(id: ID!, input: EmployeeUpdateInput!): Employee!

    # Delete employee
    deleteEmployee(id: ID!): Boolean!
  }

  type AuthPayload {
    token: String!
    user: Employee!
  }

  type Mutation {
    login(email: String!, password: String!): AuthPayload!
    register(input: EmployeeInput!): AuthPayload!
  }
`;