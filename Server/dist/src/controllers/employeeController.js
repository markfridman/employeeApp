"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEmployee = exports.updateEmployee = exports.createEmployee = exports.getEmployeeById = exports.getAllEmployees = void 0;
const employeeService = __importStar(require("../services/employeeService"));
const getAllEmployees = (req, res, next) => {
    // TODO: for production add cursur or offset pagination
    try {
        const employees = employeeService.getAllEmployees();
        res.json(employees);
    }
    catch (error) {
        next(error);
    }
};
exports.getAllEmployees = getAllEmployees;
const getEmployeeById = (req, res, next) => {
    try {
        const employee = employeeService.getEmployeeById(parseInt(req.params.id));
        if (!employee)
            return res.status(404).json({ message: 'Employee not found' });
        res.json(employee);
    }
    catch (error) {
        next(error);
    }
};
exports.getEmployeeById = getEmployeeById;
const createEmployee = (req, res, next) => {
    try {
        const { name, position } = req.body;
        if (!name || !position)
            return res.status(400).json({ message: 'Name and position are required' });
        const newEmployee = employeeService.createEmployee(name, position);
        res.status(201).json(newEmployee);
    }
    catch (error) {
        next(error);
    }
};
exports.createEmployee = createEmployee;
const updateEmployee = (req, res, next) => {
    try {
        const { name, position } = req.body;
        const updatedEmployee = employeeService.updateEmployee(parseInt(req.params.id), name, position);
        if (!updatedEmployee)
            return res.status(404).json({ message: 'Employee not found' });
        res.json(updatedEmployee);
    }
    catch (error) {
        next(error);
    }
};
exports.updateEmployee = updateEmployee;
const deleteEmployee = (req, res, next) => {
    try {
        const deleted = employeeService.deleteEmployee(parseInt(req.params.id));
        if (!deleted)
            return res.status(404).json({ message: 'Employee not found' });
        res.status(204).send();
    }
    catch (error) {
        next(error);
    }
};
exports.deleteEmployee = deleteEmployee;
