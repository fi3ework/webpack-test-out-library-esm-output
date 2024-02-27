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
var react_1 = __importDefault(require("react"));
var is_1 = require("../../_util/is");
var classNames_1 = __importDefault(require("../../_util/classNames"));
var useComponent_1 = __importDefault(require("../hooks/useComponent"));
var VirtualList_1 = __importDefault(require("../../_class/VirtualList"));
var tr_1 = __importDefault(require("./tr"));
var utils_1 = require("../utils");
function TBody(props) {
    var _a = props.childrenColumnName, childrenColumnName = _a === void 0 ? 'children' : _a, _b = props.expandProps, expandProps = _b === void 0 ? {} : _b, expandedRowRender = props.expandedRowRender, expandedRowKeys = props.expandedRowKeys, data = props.data, columns = props.columns, prefixCls = props.prefixCls, components = props.components, rowSelection = props.rowSelection, noDataElement = props.noDataElement, scroll = props.scroll, _c = props.indentSize, indentSize = _c === void 0 ? 16 : _c, hasFixedColumn = props.hasFixedColumn, tableViewWidth = props.tableViewWidth, virtualized = props.virtualized, virtualListProps = props.virtualListProps, getRowKey = props.getRowKey, saveVirtualListRef = props.saveVirtualListRef;
    var er = expandedRowRender
        ? function (r, i) { return expandedRowRender((0, utils_1.getOriginData)(r), i); }
        : expandedRowRender;
    var ComponentTbody = (0, useComponent_1.default)(components).ComponentTbody;
    var type;
    if (rowSelection && 'type' in rowSelection) {
        type = rowSelection.type;
    }
    else if (rowSelection && !('type' in rowSelection)) {
        type = 'checkbox';
    }
    function isChildrenNotEmpty(record) {
        return (0, is_1.isArray)(record[childrenColumnName]) && record[childrenColumnName].length;
    }
    function shouldRowExpand(record, index) {
        if ('rowExpandable' in expandProps && typeof expandProps.rowExpandable === 'function') {
            return expandProps.rowExpandable(record);
        }
        return er && er(record, index) !== null;
    }
    var trProps = __assign(__assign({}, props), { type: type, shouldRowExpand: shouldRowExpand });
    function renderTreeTrs(record, index) {
        var trList = [];
        trList.push(react_1.default.createElement(tr_1.default, __assign({ key: getRowKey(record) }, trProps, { record: record, level: 0, index: index })));
        var travel = function (children, rowKey, level) {
            if (level === void 0) { level = 0; }
            if ((0, is_1.isArray)(children) && children.length) {
                children.forEach(function (child, i) {
                    if (expandedRowKeys.indexOf(rowKey) !== -1) {
                        trList.push(react_1.default.createElement(tr_1.default, __assign({}, trProps, { key: getRowKey(child), record: child, level: level + 1, index: i })));
                        if (isChildrenNotEmpty(child)) {
                            travel(child[childrenColumnName], getRowKey(child), level + 1);
                        }
                    }
                });
            }
        };
        if (!er) {
            travel(record[childrenColumnName], getRowKey(record));
        }
        return trList;
    }
    var scrollStyleX = {};
    var scrollStyleY = {};
    if (scroll) {
        if (scroll.x && (typeof scroll.x === 'number' || typeof scroll.x === 'string')) {
            scrollStyleX = {
                width: scroll.x,
            };
        }
        if (scroll.y && (typeof scroll.y === 'number' || typeof scroll.y === 'string')) {
            scrollStyleY = {
                maxHeight: scroll.y,
            };
        }
    }
    var noElementProps = {
        className: prefixCls + "-no-data",
    };
    if (tableViewWidth) {
        noElementProps.className = prefixCls + "-no-data " + prefixCls + "-expand-fixed-row";
        noElementProps.style = { width: tableViewWidth };
    }
    var noDataTr = (react_1.default.createElement("tr", { className: (0, classNames_1.default)(prefixCls + "-tr", prefixCls + "-empty-row") },
        react_1.default.createElement("td", { className: prefixCls + "-td", colSpan: columns.length },
            react_1.default.createElement("div", __assign({}, noElementProps), noDataElement))));
    // https://github.com/arco-design/arco-design/issues/644
    // except the real scroll container, all parent nodes should not have a overflow style.
    if (virtualized) {
        return data.length > 0 ? (react_1.default.createElement(VirtualList_1.default, __assign({ data: data, height: scrollStyleY.maxHeight, isStaticItemHeight: false, 
            // position sticky works
            outerStyle: __assign(__assign({}, scrollStyleX), { minWidth: '100%', overflow: 'visible' }), innerStyle: { right: 'auto', minWidth: '100%' }, className: prefixCls + "-body", ref: function (ref) { return saveVirtualListRef(ref); }, itemKey: getRowKey }, virtualListProps), function (child, index) { return (react_1.default.createElement(tr_1.default, __assign({}, trProps, { key: getRowKey(child), record: child, index: index, level: 0 }))); })) : (react_1.default.createElement("div", { className: prefixCls + "-body" },
            react_1.default.createElement("table", null,
                react_1.default.createElement("tbody", null, noDataTr))));
    }
    return (react_1.default.createElement(ComponentTbody, null, data.length > 0
        ? data.map(function (record, index) {
            var rowK = getRowKey(record);
            var shouldRenderExpandIcon = shouldRowExpand(record, index) && expandedRowKeys.indexOf(rowK) !== -1;
            return (react_1.default.createElement(react_1.default.Fragment, { key: rowK },
                renderTreeTrs(record, index),
                shouldRenderExpandIcon && (react_1.default.createElement("tr", { className: (0, classNames_1.default)(prefixCls + "-tr", prefixCls + "-expand-content"), key: rowK + "-expanded" },
                    react_1.default.createElement("td", { className: prefixCls + "-td", colSpan: columns.length, style: { paddingLeft: indentSize } }, hasFixedColumn ? (react_1.default.createElement("div", { className: prefixCls + "-expand-fixed-row", style: { width: tableViewWidth } }, er && er(record, index))) : (er && er(record, index)))))));
        })
        : noDataTr));
}
exports.default = TBody;