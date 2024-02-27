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
var number_precision_1 = __importStar(require("number-precision"));
var omit_1 = __importDefault(require("../_util/omit"));
var button_1 = __importDefault(require("./button"));
var marks_1 = __importDefault(require("./marks"));
var dots_1 = __importDefault(require("./dots"));
var input_1 = __importDefault(require("./input"));
var ticks_1 = __importDefault(require("./ticks"));
var is_1 = require("../_util/is");
var utils_1 = require("./utils");
var classNames_1 = __importDefault(require("../_util/classNames"));
var ConfigProvider_1 = require("../ConfigProvider");
var useMergeValue_1 = __importDefault(require("../_util/hooks/useMergeValue"));
var dom_1 = require("../_util/dom");
var useLegalValue_1 = __importDefault(require("./hooks/useLegalValue"));
var useInterval_1 = __importDefault(require("./hooks/useInterval"));
var useMergeProps_1 = __importDefault(require("../_util/hooks/useMergeProps"));
var useUpdate_1 = __importDefault(require("../_util/hooks/useUpdate"));
number_precision_1.default.enableBoundaryChecking(false);
var defaultProps = {
    max: 100,
    min: 0,
    step: 1,
};
function Slider(baseProps, ref) {
    var _a, _b, _c;
    var _d = (0, react_1.useContext)(ConfigProvider_1.ConfigContext), getPrefixCls = _d.getPrefixCls, componentConfig = _d.componentConfig, rtl = _d.rtl;
    var props = (0, useMergeProps_1.default)(baseProps, defaultProps, componentConfig === null || componentConfig === void 0 ? void 0 : componentConfig.Slider);
    var className = props.className, style = props.style, tooltipVisible = props.tooltipVisible, tooltipPosition = props.tooltipPosition, disabled = props.disabled, min = props.min, max = props.max, propRange = props.range, step = props.step, showTicks = props.showTicks, marks = props.marks, onlyMarkValue = props.onlyMarkValue, vertical = props.vertical, showInput = props.showInput, reverse = props.reverse, getIntervalConfig = props.getIntervalConfig, rest = __rest(props, ["className", "style", "tooltipVisible", "tooltipPosition", "disabled", "min", "max", "range", "step", "showTicks", "marks", "onlyMarkValue", "vertical", "showInput", "reverse", "getIntervalConfig"]);
    var range = !!propRange;
    var rangeConfig = (0, is_1.isObject)(propRange) ? __assign({}, propRange) : { draggableBar: false };
    var isReverse = rtl ? !reverse : reverse;
    var _e = (0, useInterval_1.default)({
        min: min,
        max: max,
        onlyMarkValue: onlyMarkValue,
        step: step,
        marks: marks,
        getIntervalConfig: getIntervalConfig,
    }), intervalConfigs = _e.intervalConfigs, markList = _e.markList;
    var _f = (0, useLegalValue_1.default)({
        isRange: range,
        min: min,
        max: max,
        onlyMarkValue: onlyMarkValue,
        step: step,
        intervalConfigs: intervalConfigs,
        marks: marks,
    }), getLegalValue = _f.getLegalValue, getLegalRangeValue = _f.getLegalRangeValue, isLegalValue = _f.isLegalValue, getNextMarkValue = _f.getNextMarkValue;
    // 受控与非受控值处理
    var _g = __read((0, useMergeValue_1.default)(range ? [min, min] : min, {
        defaultValue: props.defaultValue,
        value: props.value,
    }), 2), value = _g[0], setValue = _g[1];
    // 计算合法值
    var curVal = getLegalRangeValue(value);
    var lastVal = (0, react_1.useRef)(curVal);
    var _h = __read(curVal, 2), beginVal = _h[0], endVal = _h[1];
    var reverseOrder = (0, react_1.useRef)(beginVal > endVal);
    // value变化后 更新lastVal
    (0, useUpdate_1.default)(function () {
        lastVal.current = getLegalRangeValue(value);
    }, [value, getLegalRangeValue]);
    if (reverseOrder.current) {
        _a = __read([endVal, beginVal], 2), beginVal = _a[0], endVal = _a[1];
    }
    // 偏移比例
    var beginOffset = (0, utils_1.getIntervalOffset)(beginVal, intervalConfigs);
    var endOffset = (0, utils_1.getIntervalOffset)(endVal, intervalConfigs);
    // 是否显示输入框
    var isShowInput = showInput && !onlyMarkValue;
    var extraInputProps = (0, react_1.useMemo)(function () {
        if (isShowInput && ((0, is_1.isArray)(showInput) || (0, is_1.isObject)(showInput))) {
            return (0, is_1.isArray)(showInput) ? __spreadArray([], __read(showInput), false) : [__assign({}, showInput), __assign({}, showInput)];
        }
        return [];
    }, [isShowInput, showInput]);
    // 样式前缀
    var prefixCls = getPrefixCls('slider');
    // ref
    var roadRef = (0, react_1.useRef)(null);
    var position = (0, react_1.useRef)({
        left: 0,
        height: 0,
        top: 0,
        width: 0,
    });
    var isDragging = (0, react_1.useRef)(false);
    var barStartDragVal = (0, react_1.useRef)(0);
    function getEmitParams(_a) {
        var _b;
        var _c = __read(_a, 2), beginVal = _c[0], endVal = _c[1];
        if (beginVal > endVal) {
            _b = __read([endVal, beginVal], 2), beginVal = _b[0], endVal = _b[1];
        }
        return range ? [beginVal, endVal] : endVal;
    }
    function updateValue(val) {
        var _a = __read(val, 2), newBeginVal = _a[0], newEndVal = _a[1];
        newBeginVal = getLegalValue(newBeginVal);
        newEndVal = getLegalValue(newEndVal);
        lastVal.current = [newBeginVal, newEndVal];
        return [newBeginVal, newEndVal];
    }
    function onChange(val, reason) {
        var _a = __read(updateValue(val), 2), newBeginVal = _a[0], newEndVal = _a[1];
        var emitParams = getEmitParams([newBeginVal, newEndVal]);
        setValue(emitParams);
        // 在手动修改的情况下才可能出现反序问题。
        if (reason === 'inputValueChange') {
            reverseOrder.current = newBeginVal > newEndVal;
        }
        else {
            // 在mousemove 跟 jumpToClick 顺序会保持 [begin,end]
            reverseOrder.current = false;
        }
        if ((0, is_1.isFunction)(props.onChange)) {
            props.onChange(emitParams);
        }
    }
    function onMouseUp() {
        if ((0, is_1.isFunction)(props.onAfterChange)) {
            var emitParams = getEmitParams(lastVal.current);
            props.onAfterChange(emitParams);
        }
    }
    function inRange(val) {
        var _a;
        var _b = __read([beginVal, endVal], 2), range1 = _b[0], range2 = _b[1];
        if (range1 > range2) {
            _a = __read([range2, range1], 2), range1 = _a[0], range2 = _a[1];
        }
        if (range)
            return val >= range1 && val <= range2;
        return val <= range2;
    }
    // 通过坐标获取值
    function getValueByCoords(x, y) {
        var _a = position.current, left = _a.left, top = _a.top, width = _a.width, height = _a.height;
        var roadLength = width;
        var diff = isReverse ? left + width - x : x - left;
        if (vertical) {
            roadLength = height;
            diff = isReverse ? y - top : top + height - y;
        }
        if (roadLength <= 0) {
            return 0;
        }
        // 通过坐标点偏移算出当前值相对于整个滑动轴的比例位置
        var offset = Math.max((0, number_precision_1.divide)(diff, roadLength), 0);
        offset = Math.min(1, offset);
        // 通过偏移值算出当前值在哪个区间
        var currentInterval = intervalConfigs.find(function (config) {
            return offset >= config.beginOffset && offset <= config.endOffset;
        });
        var begin = currentInterval.begin, beginOffset = currentInterval.beginOffset, currentStep = currentInterval.step, endOffset = currentInterval.endOffset, end = currentInterval.end;
        // 当前值对整体来说，多出这个区间的比例
        var currentValueOffset = offset - beginOffset;
        // 这个区间整体的比例
        var currentIntervalOffset = endOffset - beginOffset;
        // 当前在这个区间的值 = （在这个区间的比例（相对于整体） / 这个区间相对于整体的比例）* 这个区间的总值
        var valueInInterval = (currentValueOffset / currentIntervalOffset) * (end - begin);
        // 算出当前值在这个区间的步数
        var stepNum = Math.round(valueInInterval / currentStep);
        // 当前值 = 区间起始值 + 区间步数 * 步长
        return (0, number_precision_1.plus)(begin, (0, number_precision_1.times)(stepNum, currentStep));
    }
    function getBarStyle(offsets) {
        var _a, _b, _c;
        var _d = __read(offsets, 2), begin = _d[0], end = _d[1];
        if (begin > end) {
            _a = __read([end, begin], 2), begin = _a[0], end = _a[1];
        }
        var beginOffset = (0, utils_1.formatPercent)(begin);
        var endOffset = (0, utils_1.formatPercent)(1 - end);
        return vertical
            ? (_b = {},
                _b[isReverse ? 'top' : 'bottom'] = beginOffset,
                _b[isReverse ? 'bottom' : 'top'] = endOffset,
                _b) : (_c = {},
            _c[isReverse ? 'right' : 'left'] = beginOffset,
            _c[isReverse ? 'left' : 'right'] = endOffset,
            _c);
    }
    function getBtnStyle(offset) {
        var _a, _b;
        return vertical
            ? (_a = {}, _a[isReverse ? 'top' : 'bottom'] = (0, utils_1.formatPercent)(offset), _a) : (_b = {}, _b[isReverse ? 'right' : 'left'] = (0, utils_1.formatPercent)(offset), _b);
    }
    function getTooltipProps() {
        var tooltipProps = {
            getTooltipContainer: props.getTooltipContainer,
            formatTooltip: props.formatTooltip,
        };
        if ('tooltipPosition' in props) {
            tooltipProps.tooltipPosition = tooltipPosition;
        }
        if ('tooltipVisible' in props) {
            tooltipProps.tooltipVisible = tooltipVisible;
        }
        return tooltipProps;
    }
    function getPosition() {
        position.current = roadRef.current.getBoundingClientRect();
    }
    function onRoadMouseDown(e) {
        getPosition();
        var val = getValueByCoords(e.clientX, e.clientY);
        if (rangeConfig.draggableBar && inRange(val)) {
            barStartDragVal.current = getLegalValue(val);
            (0, dom_1.on)(window, 'mousemove', onBarMouseMove);
            (0, dom_1.on)(window, 'mouseup', onBarMouseUp);
        }
        else {
            handleJumpClick(val);
        }
    }
    // 点击某个位置，快速跳转
    function handleJumpClick(val) {
        if (disabled)
            return;
        var value = getLegalValue(val);
        if (range && endVal - value > value - beginVal) {
            onChange([value, endVal], 'jumpToClick');
        }
        else {
            onChange([beginVal, value], 'jumpToClick');
        }
        onMouseUp();
    }
    function handleInputChange(val) {
        onChange(val, 'inputValueChange');
        onMouseUp();
    }
    // 拖动开始节点
    function handleBeginMove(x, y) {
        isDragging.current = true;
        onChange([getValueByCoords(x, y), endVal], 'mousemove');
    }
    // 拖动结束节点
    function handleEndMove(x, y) {
        isDragging.current = true;
        onChange([beginVal, getValueByCoords(x, y)], 'mousemove');
    }
    function handleMoveEnd() {
        isDragging.current = false;
        onMouseUp();
    }
    // 结束节点的 arrow event
    function handleEndArrowEvent(type) {
        if (disabled)
            return;
        onChange([beginVal, getNextMarkValue(endVal, type)]);
    }
    // 起始节点的 arrow event
    function handleBeginArrowEvent(type) {
        if (disabled)
            return;
        onChange([getNextMarkValue(beginVal, type), endVal]);
    }
    // bar 移动中
    function onBarMouseMove(e) {
        var newVal = getLegalValue(getValueByCoords(e.clientX, e.clientY));
        var offsetVal = newVal - barStartDragVal.current;
        var newBeginVal = beginVal + offsetVal;
        var newEndVal = endVal + offsetVal;
        if (isLegalValue(newBeginVal) && isLegalValue(newEndVal)) {
            onChange([newBeginVal, newEndVal], 'mousemove');
        }
    }
    // bar 停止移动
    function onBarMouseUp() {
        (0, dom_1.off)(window, 'mousemove', onBarMouseMove);
        (0, dom_1.off)(window, 'mouseup', onBarMouseUp);
        onMouseUp();
    }
    return (react_1.default.createElement("div", __assign({}, (0, omit_1.default)(rest, [
        'defaultValue',
        'value',
        'onChange',
        'getTooltipContainer',
        'formatTooltip',
        'onAfterChange',
    ]), { className: (0, classNames_1.default)(prefixCls, (_b = {},
            _b[prefixCls + "-vertical"] = vertical,
            _b[prefixCls + "-with-marks"] = marks,
            _b[prefixCls + "-reverse"] = isReverse,
            _b[prefixCls + "-rtl"] = rtl,
            _b), className), style: style, ref: ref }),
        react_1.default.createElement("div", { className: prefixCls + "-wrapper" },
            react_1.default.createElement("div", { ref: roadRef, className: (0, classNames_1.default)(prefixCls + "-road", (_c = {},
                    _c[prefixCls + "-road-disabled"] = disabled,
                    _c[prefixCls + "-road-vertical"] = vertical,
                    _c)), onMouseDown: onRoadMouseDown },
                react_1.default.createElement("div", { className: prefixCls + "-bar", style: getBarStyle([beginOffset, endOffset]) }),
                showTicks && (react_1.default.createElement(ticks_1.default, { intervalConfigs: intervalConfigs, min: min, max: max, value: [beginVal, endVal], prefixCls: prefixCls, vertical: vertical, reverse: isReverse })),
                react_1.default.createElement(dots_1.default, { data: markList, intervalConfigs: intervalConfigs, value: [beginVal, endVal], vertical: vertical, prefixCls: prefixCls, reverse: isReverse, onMouseDown: handleJumpClick }),
                react_1.default.createElement(marks_1.default, { data: markList, intervalConfigs: intervalConfigs, vertical: vertical, prefixCls: prefixCls, reverse: isReverse, onMouseDown: handleJumpClick }),
                range && (react_1.default.createElement(button_1.default, __assign({ style: getBtnStyle(beginOffset), disabled: disabled, prefixCls: prefixCls, value: beginVal, maxValue: max, minValue: min, vertical: vertical }, getTooltipProps(), { onMoveBegin: getPosition, onMoving: handleBeginMove, onMoveEnd: handleMoveEnd, onArrowEvent: handleBeginArrowEvent }))),
                react_1.default.createElement(button_1.default, __assign({ style: getBtnStyle(endOffset), disabled: disabled, prefixCls: prefixCls, value: endVal, maxValue: max, minValue: min, vertical: vertical }, getTooltipProps(), { onMoveBegin: getPosition, onMoving: handleEndMove, onMoveEnd: handleMoveEnd, onArrowEvent: handleEndArrowEvent }))),
            isShowInput && (react_1.default.createElement(input_1.default, { min: min, max: max, step: step, value: [beginVal, endVal], range: range, disabled: disabled, prefixCls: prefixCls, onChange: handleInputChange, extra: extraInputProps })))));
}
var SliderComponent = (0, react_1.forwardRef)(Slider);
SliderComponent.displayName = 'Slider';
exports.default = (0, react_1.memo)(SliderComponent);