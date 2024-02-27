"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var classNames_1 = __importDefault(require("../_util/classNames"));
var ConfigProvider_1 = require("../ConfigProvider");
function Meta(props, ref) {
    var getPrefixCls = (0, react_1.useContext)(ConfigProvider_1.ConfigContext).getPrefixCls;
    var className = props.className, avatar = props.avatar, title = props.title, description = props.description, others = __rest(props, ["className", "avatar", "title", "description"]);
    var prefixCls = getPrefixCls('list');
    var baseClassName = prefixCls + "-item-meta";
    var hasAvatar = !!avatar;
    var hasContent = !!(title || description);
    return (react_1.default.createElement("div", __assign({ ref: ref }, others, { className: (0, classNames_1.default)(baseClassName, className) }),
        hasAvatar && react_1.default.createElement("div", { className: baseClassName + "-avatar" }, avatar),
        hasContent && (react_1.default.createElement("div", { className: baseClassName + "-content" },
            title && react_1.default.createElement("div", { className: baseClassName + "-title" }, title),
            description && react_1.default.createElement("div", { className: baseClassName + "-description" }, description)))));
}
var MetaComponent = react_1.default.forwardRef(Meta);
MetaComponent.displayName = 'ListItemMeta';
exports.default = MetaComponent;
