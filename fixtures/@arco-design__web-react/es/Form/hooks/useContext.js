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
import { useContext, useEffect, useState, useCallback } from 'react';
import { SubmitStatus } from '../interface';
import { FormContext } from '../context';
import warn from '../../_util/warning';
/**
 * useFormContext 只会返回一些 Form 全局的状态，避免返回某个表单项的状态
 */
var useFormContext = function () {
    var formCtx = useContext(FormContext);
    var formInstance = formCtx.store;
    var _a = __read(useState(false), 2), isSubmitting = _a[0], setIsSubmitting = _a[1];
    var setSubmitting = useCallback(function () {
        var submitStatus = (formInstance === null || formInstance === void 0 ? void 0 : formInstance.getInnerMethods(true).innerGetStoreStatus()).submitStatus;
        var newIsSubmitting = submitStatus === SubmitStatus.submitting;
        if (isSubmitting !== newIsSubmitting) {
            setIsSubmitting(newIsSubmitting);
        }
    }, [isSubmitting]);
    useEffect(function () {
        if (!formInstance) {
            warn(true, 'formInstance is not available');
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
export default useFormContext;
