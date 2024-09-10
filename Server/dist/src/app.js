"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const config_1 = __importDefault(require("./config"));
const employeeRouter_1 = __importDefault(require("./api/routes/employeeRouter"));
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
app.use('/api/v1/employees', employeeRouter_1.default);
app.use(errorHandler_1.default);
if (require.main === module) {
    app.listen(config_1.default.port, () => {
        console.log(`Server running on port ${config_1.default.port}`);
    });
}
exports.default = app;
