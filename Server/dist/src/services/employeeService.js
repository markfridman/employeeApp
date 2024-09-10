"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEmployee = exports.updateEmployee = exports.createEmployee = exports.getEmployeeById = exports.getAllEmployees = void 0;
const mockEmployees_1 = __importDefault(require("../data/mockEmployees"));
let employees = [...mockEmployees_1.default];
let nextId = employees.length + 1;
const getAllEmployees = () => {
    return employees;
};
exports.getAllEmployees = getAllEmployees;
const getEmployeeById = (id) => {
    return employees.find(e => e.id === id);
};
exports.getEmployeeById = getEmployeeById;
const createEmployee = (name, position) => {
    const newEmployee = { id: nextId++, name, position };
    employees.push(newEmployee);
    return newEmployee;
};
exports.createEmployee = createEmployee;
const updateEmployee = (id, name, position) => {
    const employee = employees.find(e => e.id === id);
    if (!employee)
        return null;
    if (name)
        employee.name = name;
    if (position)
        employee.position = position;
    return employee;
};
exports.updateEmployee = updateEmployee;
const deleteEmployee = (id) => {
    const index = employees.findIndex(e => e.id === id);
    if (index === -1)
        return false;
    employees.splice(index, 1);
    return true;
};
exports.deleteEmployee = deleteEmployee;
