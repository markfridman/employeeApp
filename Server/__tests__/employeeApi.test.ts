import request from 'supertest';
import app from '../src/app';
import { Employee } from '../src/interfaces/employee';

describe('Employee API', () => {
  const randomEmployee = (): Employee => ({
    id: 6,
    name: "Eyal Shani",
    position: "Chef",
  });

  const createEmployee = async (employee: Employee) => {
    return await request(app).post('/api/v1/employees').send(employee);
  };
  const deleteEmployee = async (id: number) => {
    return await request(app).delete(`/api/v1/employees/${id}`);
  };

  const getEmployee = async (id: number) => {
    return await request(app).get(`/api/v1/employees/${id}`);
  };

  beforeEach(async () => {
    // Clear the employee data before each test
    // This assumes you have an endpoint to clear the data, if not, you might need to modify the service directly
    await request(app).post('/api/v1/employees/clear').send();
  });
  describe('POST /api/v1/employees', () => {
    it('should create a new employee', async () => {
      const employee = randomEmployee();
      const response = await createEmployee(employee);

      expect(response.status).toBe(201);
      expect(response.body).toMatchObject(employee);
    });
  });
  
  describe('GET /api/v1/employees', () => {
    it('should return all employees', async () => {
      const employee1 = randomEmployee();
      const employee2 = { ...randomEmployee(), id: 8, name: "Jane Doe" };

      await createEmployee(employee1);
      await createEmployee(employee2);

      const response = await request(app).get('/api/v1/employees');

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(8);
      expect(response.body).toEqual(expect.arrayContaining([
        expect.objectContaining(employee1),
        expect.objectContaining(employee2)
      ]));
    });
  });


  describe('GET /api/v1/employees/:id', () => {
    it('should return a specific employee', async () => {
      const employee = randomEmployee();
      await createEmployee(employee);

      const response = await getEmployee(employee.id);

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject(employee);
    });

    it('should return 404 for non-existent employee', async () => {
      const response = await getEmployee(999);
      expect(response.status).toBe(404);
    });
  });

  describe('PUT /api/v1/employees/:id', () => {
    it('should update an existing employee', async () => {
      const employee = randomEmployee();
      await createEmployee(employee);

      const updatedEmployee = { ...employee, name: "Jane Doe" };
      const response = await request(app)
        .put(`/api/v1/employees/${employee.id}`)
        .send(updatedEmployee);

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject(updatedEmployee);
    });
  });

  describe('DELETE /api/v1/employees/:id', () => {
    it('should delete an existing employee', async () => {
      const employee = randomEmployee();
      await createEmployee(employee);

      const deleteResponse = await request(app).delete(`/api/v1/employees/${employee.id}`);
      expect(deleteResponse.status).toBe(204);

      const getResponse = await getEmployee(employee.id);
      expect(getResponse.status).toBe(404);
    });
  });


});