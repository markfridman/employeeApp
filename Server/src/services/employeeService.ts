import { Employee } from '../interfaces/employee';
import mockEmployees from '../data/mockEmployees';

let employees: Employee[] = [...mockEmployees];
let nextId = employees.length + 1;

export const getAllEmployees = async (page: number, limit: number) => {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const totalEmployees = employees.length;
  const totalPages = Math.ceil(totalEmployees / limit);

  const paginatedEmployees = employees.slice(startIndex, endIndex);

  return {
    employees: paginatedEmployees,
    currentPage: page,
    totalPages: totalPages,
    totalEmployees: totalEmployees,
  };
};

export const getEmployeeById = async (id: number) => {
  return employees.find(emp => emp.id === id);
};

export const createEmployee = async (name: string, position: string) => {
  const newEmployee: Employee = {
    id: employees.length + 1,
    name,
    position,
  };
  employees.push(newEmployee);
  return newEmployee;
};

export const updateEmployee = async (id: number, name?: string, position?: string) => {
  const employee = employees.find(emp => emp.id === id);
  if (!employee) return null;

  if (name) employee.name = name;
  if (position) employee.position = position;

  return employee;
};

export const deleteEmployee = async (id: number) => {
  const index = employees.findIndex(emp => emp.id === id);
  if (index === -1) return false;

  employees.splice(index, 1);
  return true;
};