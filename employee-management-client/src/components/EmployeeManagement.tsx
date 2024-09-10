import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { fetchEmployees, createEmployee, updateEmployee, deleteEmployee } from '../store/slices/employeeSlice';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

interface Employee {
  id: number;
  name: string;
  position: string;
}

const EmployeeManagement: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { employees, loading, error } = useSelector((state: RootState) => state.employees);
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    dispatch(fetchEmployees({ page: 1, limit: 10 }));
  }, [dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      dispatch(updateEmployee({ id: editingId, name, position }));
      setEditingId(null);
    } else {
      dispatch(createEmployee({ name, position }));
    }
    setName('');
    setPosition('');
  };

  const handleEdit = (employee: Employee) => {
    setEditingId(employee.id);
    setName(employee.name);
    setPosition(employee.position);
  };

  const handleDelete = (id: number) => {
    dispatch(deleteEmployee(id));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Employee Management</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <Input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            placeholder="Position"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            required
          />
          <Button type="submit">{editingId ? 'Update' : 'Add'} Employee</Button>
        </form>

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
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.position}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEdit(employee)} className="mr-2">Edit</Button>
                  <Button onClick={() => handleDelete(employee.id)} variant="destructive">Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default EmployeeManagement;