"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var form_1 = __importDefault(require("./form"));
var form_item_1 = __importDefault(require("./form-item"));
var control_1 = __importDefault(require("./control"));
var form_list_1 = __importDefault(require("./form-list"));
var form_provider_1 = __importDefault(require("./form-provider"));
var useForm_1 = __importDefault(require("./useForm"));
var useWatch_1 = __importDefault(require("./hooks/useWatch"));
var useContext_1 = __importDefault(require("./hooks/useContext"));
var useState_1 = __importDefault(require("./hooks/useState"));
var FormComp = form_1.default;
FormComp.Provider = form_provider_1.default;
FormComp.Item = form_item_1.default;
FormComp.List = form_list_1.default;
FormComp.Control = control_1.default;
FormComp.useForm = useForm_1.default;
FormComp.useFormContext = useContext_1.default;
FormComp.useWatch = useWatch_1.default;
FormComp.useFormState = useState_1.default;
exports.default = FormComp;