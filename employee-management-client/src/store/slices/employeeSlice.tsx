import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../services/api';
import { Employee } from '../../types/employee';

export const fetchEmployees = createAsyncThunk(
  'employees/fetchEmployees',
  async ({ page, limit }: { page: number; limit: number }) => {
    return await api.getEmployees(page, limit);
  }
);

export const createEmployee = createAsyncThunk(
  'employees/createEmployee',
  async (employeeData: { name: string; position: string }) => {
    return await api.createEmployee(employeeData);
  }
);

export const updateEmployee = createAsyncThunk(
  'employees/updateEmployee',
  async (employeeData: { id: number; name: string; position: string }) => {
    return await api.updateEmployee(employeeData.id, employeeData);
  }
);

export const deleteEmployee = createAsyncThunk(
  'employees/deleteEmployee',
  async (id: number) => {
    await api.deleteEmployee(id);
    return id;
  }
);

interface EmployeeState {
  employees: Employee[];
  totalPages: number;
  currentPage: number;
  loading: boolean;
  error: string | null;
}

const initialState: EmployeeState = {
  employees: [],
  totalPages: 0,
  currentPage: 1,
  loading: false,
  error: null,
};

const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload.employees;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.employees.push(action.payload);
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        const index = state.employees.findIndex(emp => emp.id === action.payload.id);
        if (index !== -1) {
          state.employees[index] = action.payload;
        }
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.employees = state.employees.filter(emp => emp.id !== action.payload);
      });
  },
});

export default employeeSlice.reducer;