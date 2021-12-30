"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
const express_1 = __importStar(require("express"));
const app = (0, express_1.default)();
const router = (0, express_1.Router)();
const port = 3000;
// router.use('/users', usersRouter);
router.get('/', (req, resp) => {
    resp.send("Hello World");
});
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.listen(port, () => `running on port ${port}`);
////
// const route = Router()
// app.use(express.json())
// route.get('/', (req: Request, res: Response) => {
//   res.json({ message: 'hello world with Typescript' })
// })
// app.use(route)
// app.listen(3333, () => 'server running on port 3333')
