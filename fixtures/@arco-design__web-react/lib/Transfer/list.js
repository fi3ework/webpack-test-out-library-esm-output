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
exports.TransferList = void 0;
var react_1 = __importStar(require("react"));
var classNames_1 = __importDefault(require("../_util/classNames"));
var Checkbox_1 = __importDefault(require("../Checkbox"));
var Button_1 = __importDefault(require("../Button"));
var Input_1 = __importDefault(require("../Input"));
var List_1 = __importDefault(require("../List"));
var item_1 = __importDefault(require("./item"));
var IconSearch_1 = __importDefault(require("../../icon/react-icon-cjs/IconSearch"));
var IconDelete_1 = __importDefault(require("../../icon/react-icon-cjs/IconDelete"));
var icon_hover_1 = __importDefault(require("../_class/icon-hover"));
var ConfigProvider_1 = require("../ConfigProvider");
var is_1 = require("../_util/is");
var useKeyboardEvent_1 = __importDefault(require("../_util/hooks/useKeyboardEvent"));
var TransferList = function (props, ref) {
    var getKeyboardEvents = (0, useKeyboardEvent_1.default)();
    var style = props.style, prefixCls = props.prefixCls, className = props.className, listType = props.listType, dataSource = props.dataSource, _a = props.selectedKeys, selectedKeys = _a === void 0 ? [] : _a, validKeys = props.validKeys, selectedDisabledKeys = props.selectedDisabledKeys, _b = props.title, title = _b === void 0 ? '' : _b, disabled = props.disabled, draggable = props.draggable, allowClear = props.allowClear, showSearch = props.showSearch, showFooter = props.showFooter, searchPlaceholder = props.searchPlaceholder, render = props.render, renderList = props.renderList, pagination = props.pagination, handleSelect = props.handleSelect, handleRemove = props.handleRemove, filterOption = props.filterOption, renderHeaderUnit = props.renderHeaderUnit, virtualListProps = props.virtualListProps, onSearch = props.onSearch, onResetData = props.onResetData, onDragStart = props.onDragStart, onDragEnd = props.onDragEnd, onDragLeave = props.onDragLeave, onDragOver = props.onDragOver, onDrop = props.onDrop;
    var baseClassName = prefixCls + "-view";
    var locale = (0, react_1.useContext)(ConfigProvider_1.ConfigContext).locale;
    var _c = __read((0, react_1.useState)(null), 2), dragItem = _c[0], setDragItem = _c[1];
    var _d = __read((0, react_1.useState)(''), 2), filterText = _d[0], setFilterText = _d[1];
    var _e = __read((0, react_1.useState)(dataSource), 2), itemsToRender = _e[0], setItemsToRender = _e[1];
    (0, react_1.useEffect)(function () {
        setItemsToRender(filterText ? dataSource.filter(function (item) { return filterOption(filterText, item); }) : dataSource);
    }, [dataSource, filterText, filterOption]);
    // 处理单个条目复选框改变
    var handleItemChecked = function (key, checked) {
        return handleSelect(checked ? selectedKeys.concat(key) : selectedKeys.filter(function (_key) { return _key !== key; }));
    };
    // 处理全选复选框改变，始终避免操作已禁用的选项
    var handleItemAllChecked = function (keys, checked) {
        return handleSelect(checked
            ? __spreadArray([], __read(new Set(selectedKeys.concat(keys))), false) : selectedKeys.filter(function (selectedKey) { return keys.indexOf(selectedKey) === -1; }));
    };
    var clearItems = function (keys) { return function () { return handleRemove(keys); }; };
    var searchInput = (react_1.default.createElement(Input_1.default, __assign({ size: "small", disabled: disabled, placeholder: searchPlaceholder, suffix: react_1.default.createElement(IconSearch_1.default, null) }, ((0, is_1.isObject)(showSearch) ? showSearch : {}), { onChange: function (value, event) {
            setFilterText(value);
            onSearch && onSearch(value);
            (0, is_1.isObject)(showSearch) && showSearch.onChange && showSearch.onChange(value, event);
        } })));
    var renderHeader = function () {
        var countSelected = selectedKeys.length;
        var countRendered = itemsToRender.length;
        var keysCanBeChecked = filterText
            ? validKeys.filter(function (validKey) { return itemsToRender.find(function (_a) {
                var key = _a.key;
                return key === validKey;
            }); })
            : validKeys;
        var countCheckedOfRenderedItems = keysCanBeChecked.filter(function (key) { return selectedKeys.indexOf(key) > -1; }).length;
        var checkboxProps = {
            disabled: disabled,
            checked: countCheckedOfRenderedItems > 0 && countCheckedOfRenderedItems === keysCanBeChecked.length,
            indeterminate: countCheckedOfRenderedItems > 0 && countCheckedOfRenderedItems < keysCanBeChecked.length,
            onChange: function (checked) { return handleItemAllChecked(keysCanBeChecked, checked); },
        };
        if (typeof title === 'function') {
            return title({
                countTotal: countRendered,
                countSelected: countSelected,
                clear: clearItems(keysCanBeChecked),
                checkbox: react_1.default.createElement(Checkbox_1.default, __assign({}, checkboxProps)),
                searchInput: searchInput,
            });
        }
        var eleHeaderUnit = (react_1.default.createElement("span", { className: baseClassName + "-header-unit" }, renderHeaderUnit(countSelected, countRendered)));
        return allowClear ? (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("span", { className: baseClassName + "-header-title" }, title),
            eleHeaderUnit,
            !disabled && validKeys.length ? (react_1.default.createElement(icon_hover_1.default, __assign({ className: baseClassName + "-icon-clear", onClick: clearItems(keysCanBeChecked), tabIndex: 0, role: "button" }, getKeyboardEvents({
                onPressEnter: clearItems(keysCanBeChecked),
            })),
                react_1.default.createElement(IconDelete_1.default, null))) : null)) : (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("span", { className: baseClassName + "-header-title" },
                react_1.default.createElement(Checkbox_1.default, __assign({}, checkboxProps), title)),
            eleHeaderUnit));
    };
    var renderListBody = function () {
        var customList = renderList &&
            renderList({
                listType: listType,
                disabled: disabled,
                selectedKeys: selectedKeys,
                validKeys: validKeys,
                selectedDisabledKeys: selectedDisabledKeys,
                filteredItems: itemsToRender,
                onItemRemove: function (key) { return handleRemove([key]); },
                onItemSelect: handleItemChecked,
                onItemSelectAll: function (keys, checked) {
                    handleSelect(checked ? keys.concat(selectedDisabledKeys) : __spreadArray([], __read(selectedDisabledKeys), false));
                },
            });
        return customList ? (react_1.default.createElement("div", { className: baseClassName + "-custom-list" }, customList)) : (react_1.default.createElement(List_1.default, { bordered: false, paginationInFooter: true, virtualListProps: virtualListProps, wrapperClassName: baseClassName + "-list", dataSource: itemsToRender, pagination: pagination
                ? __assign({ simple: true, size: 'mini' }, (typeof pagination === 'object' ? pagination : {})) : undefined, footer: showFooter === true ? (react_1.default.createElement(Button_1.default, { size: "mini", disabled: disabled, onClick: onResetData }, locale.Transfer.resetText)) : (showFooter || null), render: function (item) { return (react_1.default.createElement(item_1.default, { key: item.key, prefixCls: prefixCls, item: item, disabled: disabled, draggable: draggable, droppable: !!dragItem, allowClear: allowClear, render: render, selectedKeys: selectedKeys, onItemSelect: function (key, selected) { return handleItemChecked(key, selected); }, onItemRemove: function (key) { return handleRemove([key]); }, onDragStart: function (e, item) {
                    setDragItem(item);
                    onDragStart && onDragStart(e, item);
                }, onDragEnd: function (e, item) {
                    setDragItem(null);
                    onDragEnd && onDragEnd(e, item);
                }, onDragLeave: function (e, item) { return onDragLeave && onDragLeave(e, item); }, onDragOver: function (e, item) { return onDragOver && onDragOver(e, item); }, onDrop: function (e, dropItem, dropPosition) {
                    if (onDrop && dragItem && dragItem.key !== dropItem.key) {
                        onDrop({
                            e: e,
                            dropItem: dropItem,
                            dropPosition: dropPosition,
                            dragItem: dragItem,
                        });
                    }
                } })); } }));
    };
    return (react_1.default.createElement("div", { ref: ref, className: (0, classNames_1.default)(baseClassName, className), style: style },
        react_1.default.createElement("div", { className: baseClassName + "-header" }, renderHeader()),
        showSearch && react_1.default.createElement("div", { className: baseClassName + "-search" }, searchInput),
        renderListBody()));
};
exports.TransferList = TransferList;
var TransferListComponent = react_1.default.forwardRef(exports.TransferList);
exports.default = TransferListComponent;