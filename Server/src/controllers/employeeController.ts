import { Request, Response, NextFunction } from 'express';
import * as employeeService from '../services/employeeService';

export const getAllEmployees = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const result = await employeeService.getAllEmployees(page, limit);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const getEmployeeById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const employee = await employeeService.getEmployeeById(parseInt(req.params.id));
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    res.json(employee);
  } catch (error) {
    next(error);
  }
};

export const createEmployee = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, position } = req.body;
    if (!name || !position) return res.status(400).json({ message: 'Name and position are required' });
    
    const newEmployee = await employeeService.createEmployee(name, position);
    res.status(201).json(newEmployee);
  } catch (error) {
    next(error);
  }
};

export const updateEmployee = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, position } = req.body;
    const updatedEmployee = await employeeService.updateEmployee(parseInt(req.params.id), name, position);
    if (!updatedEmployee) return res.status(404).json({ message: 'Employee not found' });
    res.json(updatedEmployee);
  } catch (error) {
    next(error);
  }
};

export const deleteEmployee = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deleted = await employeeService.deleteEmployee(parseInt(req.params.id));
    if (!deleted) return res.status(404).json({ message: 'Employee not found' });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};