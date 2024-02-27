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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var b_tween_1 = __importDefault(require("b-tween"));
var dayjs_1 = __importDefault(require("dayjs"));
var omit_1 = __importDefault(require("../_util/omit"));
var classNames_1 = __importDefault(require("../_util/classNames"));
var countdown_1 = __importDefault(require("./countdown"));
var is_1 = require("../_util/is");
var ConfigProvider_1 = require("../ConfigProvider");
var Skeleton_1 = __importDefault(require("../Skeleton"));
var useMergeProps_1 = __importDefault(require("../_util/hooks/useMergeProps"));
var defaultProps = {
    countFrom: 0,
    countDuration: 2000,
};
function Statistic(baseProps, ref) {
    var _a;
    var _b = (0, react_1.useContext)(ConfigProvider_1.ConfigContext), getPrefixCls = _b.getPrefixCls, componentConfig = _b.componentConfig, rtl = _b.rtl;
    var props = (0, useMergeProps_1.default)(baseProps, defaultProps, componentConfig === null || componentConfig === void 0 ? void 0 : componentConfig.Statistic);
    var className = props.className, style = props.style, title = props.title, extra = props.extra, groupSeparator = props.groupSeparator, precision = props.precision, prefix = props.prefix, suffix = props.suffix, format = props.format, renderFormat = props.renderFormat, styleValue = props.styleValue, styleDecimal = props.styleDecimal, loading = props.loading, rest = __rest(props, ["className", "style", "title", "extra", "groupSeparator", "precision", "prefix", "suffix", "format", "renderFormat", "styleValue", "styleDecimal", "loading"]);
    var tween = (0, react_1.useRef)();
    var _c = __read((0, react_1.useState)('value' in props ? props.value : undefined), 2), value = _c[0], setValue = _c[1];
    var prefixCls = getPrefixCls('statistic');
    var countUp = function (from, to) {
        if (from === void 0) { from = props.countFrom; }
        if (to === void 0) { to = props.value; }
        var countDuration = props.countDuration;
        if (from !== to) {
            tween.current = new b_tween_1.default({
                from: {
                    value: from,
                },
                to: {
                    value: to,
                },
                duration: countDuration,
                easing: 'quartOut',
                onUpdate: function (keys) {
                    setValue(keys.value.toFixed(precision));
                },
                onFinish: function () {
                    setValue(to);
                },
            });
            tween.current.start();
        }
    };
    (0, react_1.useEffect)(function () {
        if (props.countUp) {
            if (tween.current) {
                tween.current.stop();
            }
            if (value !== props.value) {
                countUp(Number(value), props.value);
            }
            else {
                countUp();
            }
        }
        else {
            setValue(props.value);
        }
        return function () {
            tween.current && tween.current.stop();
            tween.current = null;
        };
    }, [props.value]);
    (0, react_1.useImperativeHandle)(ref, function () { return ({
        countUp: countUp,
    }); });
    var _d = (0, react_1.useMemo)(function () {
        var _value = value;
        if (format) {
            _value = (0, dayjs_1.default)(value).format(format);
        }
        if ((0, is_1.isNumber)(precision) && precision >= 0) {
            _value = Number(value).toFixed(precision);
        }
        var int = String(_value).split('.')[0];
        var decimal = String(_value).split('.')[1];
        if (groupSeparator && (0, is_1.isNumber)(Number(value))) {
            int = Number(int).toLocaleString('en-US');
        }
        return {
            int: int,
            decimal: decimal,
        };
    }, [format, groupSeparator, precision, value]), int = _d.int, decimal = _d.decimal;
    var valueFormatted = (0, is_1.isFunction)(renderFormat)
        ? renderFormat
        : function (_, formattedValue) { return formattedValue; };
    var isNumberValue = (0, is_1.isNumber)(Number(value));
    var eleValueWithPrefix = (react_1.default.createElement(react_1.default.Fragment, null,
        prefix !== null && prefix !== undefined ? (react_1.default.createElement("span", { className: prefixCls + "-value-prefix" }, prefix)) : null,
        valueFormatted(value, isNumberValue ? int : value)));
    return (react_1.default.createElement("div", __assign({ className: (0, classNames_1.default)("" + prefixCls, (_a = {}, _a[prefixCls + "-rtl"] = rtl, _a), className), style: style }, (0, omit_1.default)(rest, ['value', 'countUp', 'countFrom', 'countDuration'])),
        title && react_1.default.createElement("div", { className: prefixCls + "-title" }, title),
        react_1.default.createElement("div", { className: prefixCls + "-content" },
            react_1.default.createElement(Skeleton_1.default, { animation: true, loading: !!loading, text: { rows: 1, width: '100%' } },
                react_1.default.createElement("div", { className: prefixCls + "-value", style: styleValue },
                    isNumberValue ? (react_1.default.createElement("span", { className: prefixCls + "-value-int" }, eleValueWithPrefix)) : (eleValueWithPrefix),
                    decimal !== undefined || suffix ? (react_1.default.createElement("span", { className: prefixCls + "-value-decimal", style: styleDecimal },
                        (0, is_1.isNumber)(Number(value)) && decimal !== undefined && "." + decimal,
                        suffix !== null && suffix !== undefined ? (react_1.default.createElement("span", { className: prefixCls + "-value-suffix" }, suffix)) : null)) : null)),
            extra && react_1.default.createElement("div", { className: prefixCls + "-extra" }, extra))));
}
var ForwardRefStatistic = (0, react_1.forwardRef)(Statistic);
var StatisticComponent = ForwardRefStatistic;
StatisticComponent.displayName = 'Statistic';
StatisticComponent.Countdown = countdown_1.default;
exports.default = StatisticComponent;