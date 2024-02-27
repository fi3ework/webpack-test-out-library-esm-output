"use strict";
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
var react_1 = require("react");
var interface_1 = require("../interface");
var context_1 = require("../context");
var warning_1 = __importDefault(require("../../_util/warning"));
/**
 * useFormContext 只会返回一些 Form 全局的状态，避免返回某个表单项的状态
 */
var useFormContext = function () {
    var formCtx = (0, react_1.useContext)(context_1.FormContext);
    var formInstance = formCtx.store;
    var _a = __read((0, react_1.useState)(false), 2), isSubmitting = _a[0], setIsSubmitting = _a[1];
    var setSubmitting = (0, react_1.useCallback)(function () {
        var submitStatus = (formInstance === null || formInstance === void 0 ? void 0 : formInstance.getInnerMethods(true).innerGetStoreStatus()).submitStatus;
        var newIsSubmitting = submitStatus === interface_1.SubmitStatus.submitting;
        if (isSubmitting !== newIsSubmitting) {
            setIsSubmitting(newIsSubmitting);
        }
    }, [isSubmitting]);
    (0, react_1.useEffect)(function () {
        if (!formInstance) {
            (0, warning_1.default)(true, 'formInstance is not available');
            return;
        }
        var registerFormWatcher = (formInstance === null || formInstance === void 0 ? void 0 : formInstance.getInnerMethods(true)).registerFormWatcher;
        var update = function () { return setSubmitting(); };
        update();
        var cancelWatch = registerFormWatcher && registerFormWatcher(update);
        return function () {
            cancelWatch === null || cancelWatch === void 0 ? void 0 : cancelWatch();
        };
    }, []);
    return {
        form: formInstance,
        disabled: formCtx.disabled,
        isSubmitting: isSubmitting,
    };
};
exports.default = useFormContext;
