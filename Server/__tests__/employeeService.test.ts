import * as employeeService from '../src/services/employeeService';
import { Employee } from '../src/interfaces/employee';

describe('Employee Service', () => {
  let initialEmployees: Employee[];

  beforeEach(() => {
    initialEmployees = [
      { id: 1, name: "John Doe", position: "Manager" },
      { id: 2, name: "Jane Smith", position: "Waiter" },
      { id: 3, name: "Bob Johnson", position: "Chef" },
      { id: 4, name: "Alice Brown", position: "HR Specialist" },
      { id: 5, name: "Charlie Davis", position: "Marketing Coordinator" }
    ];
    (employeeService as any).employees = [...initialEmployees];
    (employeeService as any).nextId = initialEmployees.length + 1;
  });

  test('getAllEmployees returns all employees', () => {
    const employees = employeeService.getAllEmployees();
    expect(employees).toEqual(initialEmployees);
  });

  test('getEmployeeById returns the correct employee', () => {
    const employee = employeeService.getEmployeeById(1);
    expect(employee).toEqual(initialEmployees[0]);
  });

  test('getEmployeeById returns undefined for non-existent employee', () => {
    const employee = employeeService.getEmployeeById(999);
    expect(employee).toBeUndefined();
  });

  test('createEmployee adds a new employee', () => {
    const newEmployee = employeeService.createEmployee("Arik Einstein", "Vocalist");
    expect(newEmployee.id).toBe(6);
    expect(newEmployee.name).toBe("Arik Einstein");
    expect(newEmployee.position).toBe("Vocalist");
    expect(employeeService.getAllEmployees()).toHaveLength(6);
  });

  test('updateEmployee modifies an existing employee', () => {
    const updatedEmployee = employeeService.updateEmployee(1, "John Updated", "Senior Manager");
    expect(updatedEmployee).toEqual({ id: 1, name: "John Updated", position: "Senior Manager" });
  });

  test('updateEmployee returns null for non-existent employee', () => {
    const result = employeeService.updateEmployee(999, "Non-existent", "Employee");
    expect(result).toBeNull();
  });

  test('deleteEmployee removes an employee', () => {
    const result = employeeService.deleteEmployee(1);
    expect(result).toBe(true);
    expect(employeeService.getAllEmployees()).toHaveLength(5);
  });

  test('deleteEmployee returns false for non-existent employee', () => {
    const result = employeeService.deleteEmployee(999);
    expect(result).toBe(false);
    expect(employeeService.getAllEmployees()).toHaveLength(5);
  });
});