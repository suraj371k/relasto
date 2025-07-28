"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const db_1 = __importDefault(require("./config/db"));
//routes
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const property_routes_1 = __importDefault(require("./routes/property.routes"));
const contact_routes_1 = __importDefault(require("./routes/contact.routes"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "http://localhot:3000",
    credentials: true
}));
//routes
app.use('/api/auth', user_routes_1.default);
app.use('/api/property', property_routes_1.default);
app.use('/api/contact', contact_routes_1.default);
//database connection
(0, db_1.default)();
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
