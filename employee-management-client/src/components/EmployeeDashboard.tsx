import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { fetchEmployees, createEmployee, updateEmployee, deleteEmployee } from '../store/slices/employeeSlice';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Edit, Trash2, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { Employee } from '../types/employee';

const EmployeeDashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { employees, totalPages, currentPage, loading, error } = useSelector((state: RootState) => state.employees);
  const [newEmployee, setNewEmployee] = useState({ name: '', position: '' });
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    dispatch(fetchEmployees({ page: currentPage, limit: 10 }));
  }, [dispatch, currentPage]);

  const handleAddEmployee = () => {
    if (newEmployee.name && newEmployee.position) {
      dispatch(createEmployee(newEmployee));
      setNewEmployee({ name: '', position: '' });
    }
  };

  const handleEditEmployee = (employee: Employee) => {
    setEditingEmployee(employee);
  };

  const handleUpdateEmployee = () => {
    if (editingEmployee) {
      dispatch(updateEmployee(editingEmployee));
      setEditingEmployee(null);
    }
  };

  const handleDeleteEmployee = (id: number) => {
    dispatch(deleteEmployee(id));
  };

  const handlePageChange = (newPage: number) => {
    dispatch(fetchEmployees({ page: newPage, limit: 10 }));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-4 pt-20">
      <h1 className="text-2xl font-bold mb-8 text-center">Employee Dashboard</h1>
      
      <div className="flex mb-20">
        <Input
          placeholder="Name"
          value={newEmployee.name}
          onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
          className="mr-2"
        />
        <Input
          placeholder="Position"
          value={newEmployee.position}
          onChange={(e) => setNewEmployee({ ...newEmployee, position: e.target.value })}
          className="mr-2"
        />
        <Button onClick={handleAddEmployee}>
          <Plus className="mr-2 h-4 w-4" /> Add Employee
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Position</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell>
                {editingEmployee?.id === employee.id ? (
                  <Input
                    value={editingEmployee.name}
                    onChange={(e) => setEditingEmployee({ ...editingEmployee, name: e.target.value })}
                  />
                ) : (
                  employee.name
                )}
              </TableCell>
              <TableCell>
                {editingEmployee?.id === employee.id ? (
                  <Input
                    value={editingEmployee.position}
                    onChange={(e) => setEditingEmployee({ ...editingEmployee, position: e.target.value })}
                  />
                ) : (
                  employee.position
                )}
              </TableCell>
              <TableCell>
                {editingEmployee?.id === employee.id ? (
                  <Button onClick={handleUpdateEmployee} className="mr-2">Save</Button>
                ) : (
                  <Button onClick={() => handleEditEmployee(employee)} className="mr-2">
                    <Edit className="h-4 w-4" />
                  </Button>
                )}
                <Button onClick={() => handleDeleteEmployee(employee.id)} variant="destructive">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-center mt-4">
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="mr-2"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="mx-2">Page {currentPage} of {totalPages}</span>
        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="ml-2"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default EmployeeDashboard;