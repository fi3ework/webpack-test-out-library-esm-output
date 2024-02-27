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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var get_1 = __importDefault(require("lodash/get"));
var Trigger_1 = __importStar(require("../Trigger"));
var button_1 = __importDefault(require("./button"));
var ConfigProvider_1 = require("../ConfigProvider");
var classNames_1 = __importDefault(require("../_util/classNames"));
var useMergeValue_1 = __importDefault(require("../_util/hooks/useMergeValue"));
var omit_1 = __importDefault(require("../_util/omit"));
var pick_1 = __importStar(require("../_util/pick"));
var useMergeProps_1 = __importDefault(require("../_util/hooks/useMergeProps"));
var defaultProps = {
    position: 'bl',
    trigger: 'hover',
    unmountOnExit: true,
};
var trigerPopupAlign = {
    left: 4,
    right: 4,
    top: 4,
    bottom: 4,
};
function Dropdown(baseProps, _) {
    var _a;
    var _b = (0, react_1.useContext)(ConfigProvider_1.ConfigContext), getPrefixCls = _b.getPrefixCls, componentConfig = _b.componentConfig, rtl = _b.rtl;
    var props = (0, useMergeProps_1.default)(baseProps, defaultProps, componentConfig === null || componentConfig === void 0 ? void 0 : componentConfig.Button);
    var trigger = props.trigger, droplist = props.droplist, children = props.children, position = props.position, disabled = props.disabled, unmountOnExit = props.unmountOnExit, triggerProps = props.triggerProps, getPopupContainer = props.getPopupContainer, onVisibleChange = props.onVisibleChange, rest = __rest(props, ["trigger", "droplist", "children", "position", "disabled", "unmountOnExit", "triggerProps", "getPopupContainer", "onVisibleChange"]);
    var prefixCls = getPrefixCls('dropdown');
    var triggerRef = (0, react_1.useRef)(null);
    var _c = __read((0, useMergeValue_1.default)(false, {
        defaultValue: props.defaultPopupVisible,
        value: props.popupVisible,
    }), 2), popupVisible = _c[0], setPopupVisible = _c[1];
    var getPopupContent = function () {
        return react_1.default.Children.only(droplist || react_1.default.createElement("span", null));
    };
    var changePopupVisible = function (visible) {
        setPopupVisible(visible);
        onVisibleChange && onVisibleChange(visible);
        triggerProps && triggerProps.onVisibleChange && triggerProps.onVisibleChange(visible);
    };
    var handleVisibleChange = function (visible) {
        if (visible !== popupVisible) {
            changePopupVisible(visible);
        }
    };
    var renderPopup = function () {
        var e_1, _a, _b;
        var content = getPopupContent();
        // props.isMenu: Compatible Menu.defaultProps.isMenu = true
        if ((0, get_1.default)(content, 'type.__ARCO_MENU__') || (0, get_1.default)(content, 'props.isMenu')) {
            var isEmpty = true;
            try {
                for (var _c = __values(react_1.default.Children.toArray(content.props.children)), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var child = _d.value;
                    if (child !== null && child !== undefined) {
                        isEmpty = false;
                        break;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return react_1.default.cloneElement(content, {
                prefixCls: (0, classNames_1.default)(prefixCls + "-menu", (_b = {},
                    _b[prefixCls + "-menu-hidden"] = isEmpty,
                    _b)),
                inDropdown: true,
                selectable: false,
                onClickMenuItem: function () {
                    var _a;
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    var returnValueOfOnClickMenuItem = null;
                    // Trigger onClickMenuItem first
                    var content = getPopupContent();
                    if (content.props.onClickMenuItem) {
                        returnValueOfOnClickMenuItem = (_a = content.props).onClickMenuItem.apply(_a, __spreadArray([], __read(args), false));
                    }
                    // Set focus to avoid onblur
                    var child = triggerRef.current && triggerRef.current.getRootElement();
                    child && child.focus && child.focus();
                    // Trigger onVisibleChange. Outer component can determine whether to change the state based on the current visibility value.
                    if (returnValueOfOnClickMenuItem instanceof Promise) {
                        returnValueOfOnClickMenuItem.finally(function () { return changePopupVisible(false); });
                    }
                    else if (returnValueOfOnClickMenuItem !== false) {
                        changePopupVisible(false);
                    }
                },
            });
        }
        return content;
    };
    return (react_1.default.createElement(Trigger_1.default, __assign({ ref: function (ref) { return (triggerRef.current = ref); }, classNames: "slideDynamicOrigin", childrenPrefix: prefixCls, trigger: trigger, popup: renderPopup, mouseEnterDelay: 400, mouseLeaveDelay: 400, disabled: disabled, unmountOnExit: unmountOnExit, position: position, popupVisible: popupVisible, popupAlign: trigerPopupAlign, getPopupContainer: getPopupContainer, alignPoint: trigger === 'contextMenu' }, (0, pick_1.default)(rest, Trigger_1.EventsByTriggerNeed), (0, pick_1.pickDataAttributes)(rest), (0, omit_1.default)(triggerProps, ['onVisibleChange']), { onVisibleChange: handleVisibleChange }), react_1.default.isValidElement(children)
        ? react_1.default.cloneElement(children, __assign(__assign({}, (typeof disabled === 'boolean' ? { disabled: disabled } : {})), { className: (0, classNames_1.default)((_a = {},
                _a[prefixCls + "-popup-visible"] = popupVisible,
                _a[[prefixCls] + "-rtl"] = rtl,
                _a), children.props.className) }))
        : children));
}
var ForwardRefDropdown = react_1.default.forwardRef(Dropdown);
var DropdownComponent = ForwardRefDropdown;
DropdownComponent.displayName = 'Dropdown';
DropdownComponent.Button = button_1.default;
exports.default = DropdownComponent;
