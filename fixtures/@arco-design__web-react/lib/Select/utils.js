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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.flatChildren = exports.isSelectOptGroup = exports.isSelectOption = exports.getValidValue = exports.isEmptyValue = exports.preventDefaultEvent = void 0;
var react_1 = __importDefault(require("react"));
var get_1 = __importDefault(require("lodash/get"));
var option_1 = __importDefault(require("./option"));
var is_1 = require("../_util/is");
var getHighlightText_1 = __importDefault(require("../_util/getHighlightText"));
var fillNBSP_1 = __importDefault(require("../_util/fillNBSP"));
function preventDefaultEvent(e) {
    e && e.preventDefault();
}
exports.preventDefaultEvent = preventDefaultEvent;
function isEmptyValue(value, isMultiple) {
    // Illegal value is considered as unselected
    return isMultiple ? !(0, is_1.isArray)(value) || !value.length : value === undefined;
}
exports.isEmptyValue = isEmptyValue;
function getValidValue(value, isMultiple, labelInValue) {
    // Compatible when labelInValue is set, value is passed in the object
    if (labelInValue) {
        if (isMultiple) {
            value = Array.isArray(value)
                ? value.map(function (item) { return ((0, is_1.isObject)(item) && 'label' in item ? item.value : item); })
                : value;
        }
        else {
            value = (0, is_1.isObject)(value) && 'label' in value ? value.value : value;
        }
    }
    return isEmptyValue(value, isMultiple)
        ? isMultiple
            ? Array.isArray(value)
                ? value
                : []
            : undefined
        : value;
}
exports.getValidValue = getValidValue;
function isSelectOption(child) {
    return (0, get_1.default)(child, 'props.isSelectOption') || (0, get_1.default)(child, 'type.__ARCO_SELECT_OPTION__');
}
exports.isSelectOption = isSelectOption;
function isSelectOptGroup(child) {
    return (0, get_1.default)(child, 'props.isSelectOptGroup') || (0, get_1.default)(child, 'type.__ARCO_SELECT_OPTGROUP__');
}
exports.isSelectOptGroup = isSelectOptGroup;
function flatChildren(_a, _b, 
// 递归过程中需要持续传递的数据
_c) {
    var children = _a.children, options = _a.options, filterOption = _a.filterOption;
    var _d = _b.inputValue, inputValue = _d === void 0 ? '' : _d, userCreatedOptions = _b.userCreatedOptions, userCreatingOption = _b.userCreatingOption, prefixCls = _b.prefixCls;
    var 
    // 递归过程中需要持续传递的数据
    _e = _c === void 0 ? {} : _c, _f = _e.optionInfoMap, optionInfoMap = _f === void 0 ? new Map() : _f, _g = _e.optionValueList, optionValueList = _g === void 0 ? [] : _g, _h = _e.customNodeCount, customNodeCount = _h === void 0 ? 0 : _h;
    // 是否存在 OptGroup
    var hasOptGroup = false;
    // 是否存在 children 不为字符串的 Option
    var hasComplexLabelInOptions = false;
    // 经过 value 去重并且包含了 OptGroup 的 children 数组
    var childrenList = [];
    var optionIndexListForArrowKey = [];
    var getChildValue = function (child) {
        var propValue = (0, get_1.default)(child, 'props.value');
        var propChildren = (0, get_1.default)(child, 'props.children');
        return propValue === undefined && propChildren !== null && propChildren !== undefined
            ? propChildren.toString()
            : propValue;
    };
    var getChildKey = function (_a, key, isGroupTitle) {
        var label = _a.label, value = _a.value;
        // 处理自定义节点的 key 值
        if (!label && !value && !key) {
            customNodeCount++;
            return "custom_node_" + customNodeCount;
        }
        return isGroupTitle
            ? key || "group_" + label
            : key || typeof value + "_" + value || label + "_" + optionInfoMap.size;
    };
    var handleOption = function (child, origin) {
        var optionValue = getChildValue(child);
        var isValidOption = true;
        if (filterOption === true) {
            isValidOption =
                optionValue !== undefined &&
                    String(optionValue).toLowerCase().indexOf(inputValue.toLowerCase()) !== -1;
        }
        else if (typeof filterOption === 'function') {
            isValidOption = !inputValue || filterOption(inputValue, child);
        }
        var existOption = optionInfoMap.get(optionValue);
        var needOverwriteUserCreatedOption = (existOption === null || existOption === void 0 ? void 0 : existOption._origin) === 'userCreatedOptions' ||
            (existOption === null || existOption === void 0 ? void 0 : existOption._origin) === 'userCreatingOption';
        // we don't allow two options with same value
        // however option created by user-inputting can be replaced by option from option property or children
        if (!existOption || needOverwriteUserCreatedOption) {
            if (!('_key' in child.props)) {
                child = react_1.default.cloneElement(child, {
                    _key: getChildKey(child.props, child.key),
                });
            }
            var index = optionInfoMap.size;
            var option = __assign(__assign({ child: child }, child.props), { value: optionValue, _index: index, _origin: origin, _valid: isValidOption });
            optionInfoMap.set(optionValue, option);
            if (needOverwriteUserCreatedOption) {
                var indexToUpdate = childrenList.findIndex(function (c) { var _a; return ((_a = c === null || c === void 0 ? void 0 : c.props) === null || _a === void 0 ? void 0 : _a.value) === optionValue; });
                if (indexToUpdate > -1) {
                    isValidOption
                        ? (childrenList[indexToUpdate] = child)
                        : childrenList.splice(indexToUpdate, 1);
                }
            }
            else {
                optionValueList.push(optionValue);
                if (isValidOption) {
                    childrenList.push(child);
                    if (!option.disabled) {
                        optionIndexListForArrowKey.push(index);
                    }
                }
            }
        }
        if (typeof child.props.children !== 'string') {
            hasComplexLabelInOptions = true;
        }
    };
    var extendChildren = function (arr, origin) {
        if (origin && (0, is_1.isArray)(arr) && arr.length) {
            arr.forEach(function (option) {
                if ((0, is_1.isString)(option) || (0, is_1.isNumber)(option)) {
                    option = {
                        label: option,
                        value: option,
                    };
                }
                var child = (react_1.default.createElement(option_1.default, { _key: getChildKey(option), value: option.value, disabled: option.disabled === true, extra: option.extra }, (0, fillNBSP_1.default)(option.label)));
                handleOption(child, origin);
            });
        }
    };
    if (userCreatingOption) {
        extendChildren([userCreatingOption], 'userCreatingOption');
    }
    if (children) {
        react_1.default.Children.map(children, function (child) {
            if (isSelectOptGroup(child)) {
                var _a = child.props, children_1 = _a.children, options_1 = _a.options;
                var _b = flatChildren({ children: children_1, options: options_1, filterOption: filterOption }, { inputValue: inputValue, prefixCls: prefixCls }, { optionInfoMap: optionInfoMap, optionValueList: optionValueList, customNodeCount: customNodeCount }), _childrenList = _b.childrenList, _optionIndexListForArrowKey = _b.optionIndexListForArrowKey, _hasComplexLabelInOptions = _b.hasComplexLabelInOptions;
                if (_childrenList.length) {
                    childrenList.push(react_1.default.cloneElement(child, {
                        children: null,
                        _key: getChildKey(child.props, child.key, true),
                    }));
                    childrenList = childrenList.concat(_childrenList);
                    optionIndexListForArrowKey = optionIndexListForArrowKey.concat(_optionIndexListForArrowKey);
                    hasOptGroup = true;
                    hasComplexLabelInOptions = hasComplexLabelInOptions || _hasComplexLabelInOptions;
                }
            }
            else if (isSelectOption(child)) {
                handleOption(child, 'children');
            }
            else if ((0, is_1.isObject)(child) && child.props) {
                childrenList.push(react_1.default.cloneElement(child, {
                    _key: getChildKey(child.props, child.key),
                }));
            }
        });
    }
    extendChildren(options, 'options');
    extendChildren(userCreatedOptions, 'userCreatedOptions');
    return {
        childrenList: (0, getHighlightText_1.default)({
            nodeList: childrenList,
            pattern: inputValue,
            highlightClassName: prefixCls + "-highlight",
        }),
        optionInfoMap: optionInfoMap,
        optionValueList: optionValueList,
        optionIndexListForArrowKey: optionIndexListForArrowKey,
        hasOptGroup: hasOptGroup,
        hasComplexLabelInOptions: hasComplexLabelInOptions,
    };
}
exports.flatChildren = flatChildren;