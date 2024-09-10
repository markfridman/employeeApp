"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../src/app"));
describe('Employee API', () => {
    const randomEmployee = () => ({
        id: 6,
        name: "Eyal Shani",
        position: "Chef",
    });
    const createEmployee = (employee) => __awaiter(void 0, void 0, void 0, function* () {
        return yield (0, supertest_1.default)(app_1.default).post('/api/v1/employees').send(employee);
    });
    const deleteEmployee = (id) => __awaiter(void 0, void 0, void 0, function* () {
        return yield (0, supertest_1.default)(app_1.default).delete(`/api/v1/employees/${id}`);
    });
    const getEmployee = (id) => __awaiter(void 0, void 0, void 0, function* () {
        return yield (0, supertest_1.default)(app_1.default).get(`/api/v1/employees/${id}`);
    });
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        // Clear the employee data before each test
        // This assumes you have an endpoint to clear the data, if not, you might need to modify the service directly
        yield (0, supertest_1.default)(app_1.default).post('/api/v1/employees/clear').send();
    }));
    describe('POST /api/v1/employees', () => {
        it('should create a new employee', () => __awaiter(void 0, void 0, void 0, function* () {
            const employee = randomEmployee();
            const response = yield createEmployee(employee);
            expect(response.status).toBe(201);
            expect(response.body).toMatchObject(employee);
        }));
    });
    describe('GET /api/v1/employees', () => {
        it('should return all employees', () => __awaiter(void 0, void 0, void 0, function* () {
            const employee1 = randomEmployee();
            const employee2 = Object.assign(Object.assign({}, randomEmployee()), { id: 8, name: "Jane Doe" });
            yield createEmployee(employee1);
            yield createEmployee(employee2);
            const response = yield (0, supertest_1.default)(app_1.default).get('/api/v1/employees');
            expect(response.status).toBe(200);
            expect(response.body).toHaveLength(8);
            expect(response.body).toEqual(expect.arrayContaining([
                expect.objectContaining(employee1),
                expect.objectContaining(employee2)
            ]));
        }));
    });
    describe('GET /api/v1/employees/:id', () => {
        it('should return a specific employee', () => __awaiter(void 0, void 0, void 0, function* () {
            const employee = randomEmployee();
            yield createEmployee(employee);
            const response = yield getEmployee(employee.id);
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(employee);
        }));
        it('should return 404 for non-existent employee', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield getEmployee(999);
            expect(response.status).toBe(404);
        }));
    });
    describe('PUT /api/v1/employees/:id', () => {
        it('should update an existing employee', () => __awaiter(void 0, void 0, void 0, function* () {
            const employee = randomEmployee();
            yield createEmployee(employee);
            const updatedEmployee = Object.assign(Object.assign({}, employee), { name: "Jane Doe" });
            const response = yield (0, supertest_1.default)(app_1.default)
                .put(`/api/v1/employees/${employee.id}`)
                .send(updatedEmployee);
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(updatedEmployee);
        }));
    });
    describe('DELETE /api/v1/employees/:id', () => {
        it('should delete an existing employee', () => __awaiter(void 0, void 0, void 0, function* () {
            const employee = randomEmployee();
            yield createEmployee(employee);
            const deleteResponse = yield (0, supertest_1.default)(app_1.default).delete(`/api/v1/employees/${employee.id}`);
            expect(deleteResponse.status).toBe(204);
            const getResponse = yield getEmployee(employee.id);
            expect(getResponse.status).toBe(404);
        }));
    });
});
