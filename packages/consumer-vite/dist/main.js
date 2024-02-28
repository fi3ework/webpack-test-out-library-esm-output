var __webpack_require__$e = {};
(() => {
  __webpack_require__$e.d = (exports, definition) => {
    for (var key in definition) {
      if (__webpack_require__$e.o(definition, key) && !__webpack_require__$e.o(exports, key)) {
        Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
      }
    }
  };
})();
(() => {
  __webpack_require__$e.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
})();
(() => {
  __webpack_require__$e.r = (exports) => {
    if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
      Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
    }
    Object.defineProperty(exports, "__esModule", { value: true });
  };
})();
var __webpack_exports__$e = {};
__webpack_require__$e.r(__webpack_exports__$e);
__webpack_require__$e.d(__webpack_exports__$e, {
  /* harmony export */
  "default": () => __WEBPACK_DEFAULT_EXPORT__$1
  /* harmony export */
});
const $$observable = /* @__PURE__ */ (() => typeof Symbol === "function" && Symbol.observable || "@@observable")();
const __WEBPACK_DEFAULT_EXPORT__$1 = $$observable;
var __webpack_exports__default$7 = __webpack_exports__$e["default"];
const __WEBPACK_EXTERNAL_MODULE__utils_symbol_observable_cf197379__ = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: __webpack_exports__default$7
}, Symbol.toStringTag, { value: "Module" }));
var __webpack_require__$d = {};
(() => {
  __webpack_require__$d.d = (exports, definition) => {
    for (var key in definition) {
      if (__webpack_require__$d.o(definition, key) && !__webpack_require__$d.o(exports, key)) {
        Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
      }
    }
  };
})();
(() => {
  __webpack_require__$d.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
})();
(() => {
  __webpack_require__$d.r = (exports) => {
    if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
      Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
    }
    Object.defineProperty(exports, "__esModule", { value: true });
  };
})();
var __webpack_exports__$d = {};
__webpack_require__$d.r(__webpack_exports__$d);
__webpack_require__$d.d(__webpack_exports__$d, {
  /* harmony export */
  "default": () => __WEBPACK_DEFAULT_EXPORT__
  /* harmony export */
});
const randomString = () => Math.random().toString(36).substring(7).split("").join(".");
const ActionTypes = {
  INIT: `@@redux/INIT${randomString()}`,
  REPLACE: `@@redux/REPLACE${randomString()}`,
  PROBE_UNKNOWN_ACTION: () => `@@redux/PROBE_UNKNOWN_ACTION${randomString()}`
};
const __WEBPACK_DEFAULT_EXPORT__ = ActionTypes;
var __webpack_exports__default$6 = __webpack_exports__$d["default"];
const __WEBPACK_EXTERNAL_MODULE__utils_actionTypes_9538f43c__ = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: __webpack_exports__default$6
}, Symbol.toStringTag, { value: "Module" }));
var __webpack_require__$c = {};
(() => {
  __webpack_require__$c.d = (exports, definition) => {
    for (var key in definition) {
      if (__webpack_require__$c.o(definition, key) && !__webpack_require__$c.o(exports, key)) {
        Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
      }
    }
  };
})();
(() => {
  __webpack_require__$c.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
})();
(() => {
  __webpack_require__$c.r = (exports) => {
    if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
      Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
    }
    Object.defineProperty(exports, "__esModule", { value: true });
  };
})();
var __webpack_exports__$c = {};
__webpack_require__$c.r(__webpack_exports__$c);
__webpack_require__$c.d(__webpack_exports__$c, {
  /* harmony export */
  "default": () => (
    /* binding */
    isPlainObject
  )
  /* harmony export */
});
function isPlainObject(obj) {
  if (typeof obj !== "object" || obj === null)
    return false;
  let proto = obj;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }
  return Object.getPrototypeOf(obj) === proto || Object.getPrototypeOf(obj) === null;
}
var __webpack_exports__default$5 = __webpack_exports__$c["default"];
const __WEBPACK_EXTERNAL_MODULE__utils_isPlainObject_8966eb53__ = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: __webpack_exports__default$5
}, Symbol.toStringTag, { value: "Module" }));
var __webpack_require__$b = {};
(() => {
  __webpack_require__$b.d = (exports, definition) => {
    for (var key in definition) {
      if (__webpack_require__$b.o(definition, key) && !__webpack_require__$b.o(exports, key)) {
        Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
      }
    }
  };
})();
(() => {
  __webpack_require__$b.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
})();
(() => {
  __webpack_require__$b.r = (exports) => {
    if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
      Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
    }
    Object.defineProperty(exports, "__esModule", { value: true });
  };
})();
var __webpack_exports__$b = {};
__webpack_require__$b.r(__webpack_exports__$b);
__webpack_require__$b.d(__webpack_exports__$b, {
  /* harmony export */
  kindOf: () => (
    /* binding */
    kindOf
  ),
  /* harmony export */
  miniKindOf: () => (
    /* binding */
    miniKindOf
  )
  /* harmony export */
});
function miniKindOf(val) {
  if (val === void 0)
    return "undefined";
  if (val === null)
    return "null";
  const type = typeof val;
  switch (type) {
    case "boolean":
    case "string":
    case "number":
    case "symbol":
    case "function": {
      return type;
    }
  }
  if (Array.isArray(val))
    return "array";
  if (isDate(val))
    return "date";
  if (isError(val))
    return "error";
  const constructorName = ctorName(val);
  switch (constructorName) {
    case "Symbol":
    case "Promise":
    case "WeakMap":
    case "WeakSet":
    case "Map":
    case "Set":
      return constructorName;
  }
  return Object.prototype.toString.call(val).slice(8, -1).toLowerCase().replace(/\s/g, "");
}
function ctorName(val) {
  return typeof val.constructor === "function" ? val.constructor.name : null;
}
function isError(val) {
  return val instanceof Error || typeof val.message === "string" && val.constructor && typeof val.constructor.stackTraceLimit === "number";
}
function isDate(val) {
  if (val instanceof Date)
    return true;
  return typeof val.toDateString === "function" && typeof val.getDate === "function" && typeof val.setDate === "function";
}
function kindOf(val) {
  let typeOfVal = typeof val;
  return typeOfVal;
}
var __webpack_exports__kindOf = __webpack_exports__$b.kindOf;
var __webpack_exports__miniKindOf = __webpack_exports__$b.miniKindOf;
const __WEBPACK_EXTERNAL_MODULE__utils_kindOf_6678d308__ = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  kindOf: __webpack_exports__kindOf,
  miniKindOf: __webpack_exports__miniKindOf
}, Symbol.toStringTag, { value: "Module" }));
var __webpack_require__$a = {};
(() => {
  __webpack_require__$a.d = (exports, definition) => {
    for (var key in definition) {
      if (__webpack_require__$a.o(definition, key) && !__webpack_require__$a.o(exports, key)) {
        Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
      }
    }
  };
})();
(() => {
  __webpack_require__$a.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
})();
(() => {
  __webpack_require__$a.r = (exports) => {
    if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
      Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
    }
    Object.defineProperty(exports, "__esModule", { value: true });
  };
})();
var __webpack_exports__$a = {};
__webpack_require__$a.r(__webpack_exports__$a);
__webpack_require__$a.d(__webpack_exports__$a, {
  createStore: () => (
    /* binding */
    createStore
  ),
  legacy_createStore: () => (
    /* binding */
    legacy_createStore
  )
});
const symbol_observable_namespaceObject = __WEBPACK_EXTERNAL_MODULE__utils_symbol_observable_cf197379__;
const actionTypes_namespaceObject$2 = __WEBPACK_EXTERNAL_MODULE__utils_actionTypes_9538f43c__;
const isPlainObject_namespaceObject$1 = __WEBPACK_EXTERNAL_MODULE__utils_isPlainObject_8966eb53__;
const kindOf_namespaceObject$1 = __WEBPACK_EXTERNAL_MODULE__utils_kindOf_6678d308__;
function createStore(reducer, preloadedState, enhancer) {
  if (typeof reducer !== "function") {
    throw new Error(`Expected the root reducer to be a function. Instead, received: '${(0, kindOf_namespaceObject$1.kindOf)(reducer)}'`);
  }
  if (typeof preloadedState === "function" && typeof enhancer === "function" || typeof enhancer === "function" && typeof arguments[3] === "function") {
    throw new Error("It looks like you are passing several store enhancers to createStore(). This is not supported. Instead, compose them together to a single function. See https://redux.js.org/tutorials/fundamentals/part-4-store#creating-a-store-with-enhancers for an example.");
  }
  if (typeof preloadedState === "function" && typeof enhancer === "undefined") {
    enhancer = preloadedState;
    preloadedState = void 0;
  }
  if (typeof enhancer !== "undefined") {
    if (typeof enhancer !== "function") {
      throw new Error(`Expected the enhancer to be a function. Instead, received: '${(0, kindOf_namespaceObject$1.kindOf)(enhancer)}'`);
    }
    return enhancer(createStore)(reducer, preloadedState);
  }
  let currentReducer = reducer;
  let currentState = preloadedState;
  let currentListeners = /* @__PURE__ */ new Map();
  let nextListeners = currentListeners;
  let listenerIdCounter = 0;
  let isDispatching = false;
  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = /* @__PURE__ */ new Map();
      currentListeners.forEach((listener, key) => {
        nextListeners.set(key, listener);
      });
    }
  }
  function getState() {
    if (isDispatching) {
      throw new Error("You may not call store.getState() while the reducer is executing. The reducer has already received the state as an argument. Pass it down from the top reducer instead of reading it from the store.");
    }
    return currentState;
  }
  function subscribe(listener) {
    if (typeof listener !== "function") {
      throw new Error(`Expected the listener to be a function. Instead, received: '${(0, kindOf_namespaceObject$1.kindOf)(listener)}'`);
    }
    if (isDispatching) {
      throw new Error("You may not call store.subscribe() while the reducer is executing. If you would like to be notified after the store has been updated, subscribe from a component and invoke store.getState() in the callback to access the latest state. See https://redux.js.org/api/store#subscribelistener for more details.");
    }
    let isSubscribed = true;
    ensureCanMutateNextListeners();
    const listenerId = listenerIdCounter++;
    nextListeners.set(listenerId, listener);
    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }
      if (isDispatching) {
        throw new Error("You may not unsubscribe from a store listener while the reducer is executing. See https://redux.js.org/api/store#subscribelistener for more details.");
      }
      isSubscribed = false;
      ensureCanMutateNextListeners();
      nextListeners.delete(listenerId);
      currentListeners = null;
    };
  }
  function dispatch(action) {
    if (!(0, isPlainObject_namespaceObject$1["default"])(action)) {
      throw new Error(`Actions must be plain objects. Instead, the actual type was: '${(0, kindOf_namespaceObject$1.kindOf)(action)}'. You may need to add middleware to your store setup to handle dispatching other values, such as 'redux-thunk' to handle dispatching functions. See https://redux.js.org/tutorials/fundamentals/part-4-store#middleware and https://redux.js.org/tutorials/fundamentals/part-6-async-logic#using-the-redux-thunk-middleware for examples.`);
    }
    if (typeof action.type === "undefined") {
      throw new Error('Actions may not have an undefined "type" property. You may have misspelled an action type string constant.');
    }
    if (typeof action.type !== "string") {
      throw new Error(`Action "type" property must be a string. Instead, the actual type was: '${(0, kindOf_namespaceObject$1.kindOf)(action.type)}'. Value was: '${action.type}' (stringified)`);
    }
    if (isDispatching) {
      throw new Error("Reducers may not dispatch actions.");
    }
    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }
    const listeners = currentListeners = nextListeners;
    listeners.forEach((listener) => {
      listener();
    });
    return action;
  }
  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== "function") {
      throw new Error(`Expected the nextReducer to be a function. Instead, received: '${(0, kindOf_namespaceObject$1.kindOf)(nextReducer)}`);
    }
    currentReducer = nextReducer;
    dispatch({
      type: actionTypes_namespaceObject$2["default"].REPLACE
    });
  }
  function observable() {
    const outerSubscribe = subscribe;
    return {
      /**
      * The minimal observable subscription method.
      * @param observer Any object that can be used as an observer.
      * The observer object should have a `next` method.
      * @returns An object with an `unsubscribe` method that can
      * be used to unsubscribe the observable from the store, and prevent further
      * emission of values from the observable.
      */
      subscribe(observer) {
        if (typeof observer !== "object" || observer === null) {
          throw new TypeError(`Expected the observer to be an object. Instead, received: '${(0, kindOf_namespaceObject$1.kindOf)(observer)}'`);
        }
        function observeState() {
          const observerAsObserver = observer;
          if (observerAsObserver.next) {
            observerAsObserver.next(getState());
          }
        }
        observeState();
        const unsubscribe = outerSubscribe(observeState);
        return {
          unsubscribe
        };
      },
      [symbol_observable_namespaceObject["default"]]() {
        return this;
      }
    };
  }
  dispatch({
    type: actionTypes_namespaceObject$2["default"].INIT
  });
  const store = {
    dispatch,
    subscribe,
    getState,
    replaceReducer,
    [symbol_observable_namespaceObject["default"]]: observable
  };
  return store;
}
function legacy_createStore(reducer, preloadedState, enhancer) {
  return createStore(reducer, preloadedState, enhancer);
}
var __webpack_exports__createStore = __webpack_exports__$a.createStore;
var __webpack_exports__legacy_createStore = __webpack_exports__$a.legacy_createStore;
const __WEBPACK_EXTERNAL_MODULE__createStore_4b6949b8__ = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  createStore: __webpack_exports__createStore,
  legacy_createStore: __webpack_exports__legacy_createStore
}, Symbol.toStringTag, { value: "Module" }));
var __webpack_require__$9 = {};
(() => {
  __webpack_require__$9.d = (exports, definition) => {
    for (var key in definition) {
      if (__webpack_require__$9.o(definition, key) && !__webpack_require__$9.o(exports, key)) {
        Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
      }
    }
  };
})();
(() => {
  __webpack_require__$9.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
})();
(() => {
  __webpack_require__$9.r = (exports) => {
    if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
      Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
    }
    Object.defineProperty(exports, "__esModule", { value: true });
  };
})();
var __webpack_exports__$9 = {};
__webpack_require__$9.r(__webpack_exports__$9);
__webpack_require__$9.d(__webpack_exports__$9, {
  /* harmony export */
  "default": () => (
    /* binding */
    warning
  )
  /* harmony export */
});
function warning(message) {
  if (typeof console !== "undefined" && typeof console.error === "function") {
    console.error(message);
  }
  try {
    throw new Error(message);
  } catch (e) {
  }
}
__webpack_exports__$9["default"];
var __webpack_require__$8 = {};
(() => {
  __webpack_require__$8.d = (exports, definition) => {
    for (var key in definition) {
      if (__webpack_require__$8.o(definition, key) && !__webpack_require__$8.o(exports, key)) {
        Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
      }
    }
  };
})();
(() => {
  __webpack_require__$8.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
})();
(() => {
  __webpack_require__$8.r = (exports) => {
    if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
      Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
    }
    Object.defineProperty(exports, "__esModule", { value: true });
  };
})();
var __webpack_exports__$8 = {};
__webpack_require__$8.r(__webpack_exports__$8);
__webpack_require__$8.d(__webpack_exports__$8, {
  "default": () => (
    /* binding */
    combineReducers
  )
});
const actionTypes_namespaceObject$1 = __WEBPACK_EXTERNAL_MODULE__utils_actionTypes_9538f43c__;
function assertReducerShape(reducers) {
  Object.keys(reducers).forEach((key) => {
    const reducer = reducers[key];
    const initialState = reducer(void 0, {
      type: actionTypes_namespaceObject$1["default"].INIT
    });
    if (typeof initialState === "undefined") {
      throw new Error(`The slice reducer for key "${key}" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined. If you don't want to set a value for this reducer, you can use null instead of undefined.`);
    }
    if (typeof reducer(void 0, {
      type: actionTypes_namespaceObject$1["default"].PROBE_UNKNOWN_ACTION()
    }) === "undefined") {
      throw new Error(`The slice reducer for key "${key}" returned undefined when probed with a random type. Don't try to handle '${actionTypes_namespaceObject$1["default"].INIT}' or other actions in "redux/*" namespace. They are considered private. Instead, you must return the current state for any unknown actions, unless it is undefined, in which case you must return the initial state, regardless of the action type. The initial state may not be undefined, but can be null.`);
    }
  });
}
function combineReducers(reducers) {
  const reducerKeys = Object.keys(reducers);
  const finalReducers = {};
  for (let i = 0; i < reducerKeys.length; i++) {
    const key = reducerKeys[i];
    if (typeof reducers[key] === "function") {
      finalReducers[key] = reducers[key];
    }
  }
  const finalReducerKeys = Object.keys(finalReducers);
  let shapeAssertionError;
  try {
    assertReducerShape(finalReducers);
  } catch (e) {
    shapeAssertionError = e;
  }
  return function combination() {
    let state = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, action = arguments.length > 1 ? arguments[1] : void 0;
    if (shapeAssertionError) {
      throw shapeAssertionError;
    }
    let hasChanged = false;
    const nextState = {};
    for (let i = 0; i < finalReducerKeys.length; i++) {
      const key = finalReducerKeys[i];
      const reducer = finalReducers[key];
      const previousStateForKey = state[key];
      const nextStateForKey = reducer(previousStateForKey, action);
      if (typeof nextStateForKey === "undefined") {
        const actionType = action && action.type;
        throw new Error(`When called with an action of type ${actionType ? `"${String(actionType)}"` : "(unknown type)"}, the slice reducer for key "${key}" returned undefined. To ignore an action, you must explicitly return the previous state. If you want this reducer to hold no value, you can return null instead of undefined.`);
      }
      nextState[key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }
    hasChanged = hasChanged || finalReducerKeys.length !== Object.keys(state).length;
    return hasChanged ? nextState : state;
  };
}
var __webpack_exports__default$4 = __webpack_exports__$8["default"];
const __WEBPACK_EXTERNAL_MODULE__combineReducers_49f527c5__ = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: __webpack_exports__default$4
}, Symbol.toStringTag, { value: "Module" }));
var __webpack_require__$7 = {};
(() => {
  __webpack_require__$7.d = (exports, definition) => {
    for (var key in definition) {
      if (__webpack_require__$7.o(definition, key) && !__webpack_require__$7.o(exports, key)) {
        Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
      }
    }
  };
})();
(() => {
  __webpack_require__$7.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
})();
(() => {
  __webpack_require__$7.r = (exports) => {
    if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
      Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
    }
    Object.defineProperty(exports, "__esModule", { value: true });
  };
})();
var __webpack_exports__$7 = {};
__webpack_require__$7.r(__webpack_exports__$7);
__webpack_require__$7.d(__webpack_exports__$7, {
  "default": () => (
    /* binding */
    bindActionCreators
  )
});
const kindOf_namespaceObject = __WEBPACK_EXTERNAL_MODULE__utils_kindOf_6678d308__;
function bindActionCreator(actionCreator, dispatch) {
  return function() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return dispatch(actionCreator.apply(this, args));
  };
}
function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === "function") {
    return bindActionCreator(actionCreators, dispatch);
  }
  if (typeof actionCreators !== "object" || actionCreators === null) {
    throw new Error(`bindActionCreators expected an object or a function, but instead received: '${(0, kindOf_namespaceObject.kindOf)(actionCreators)}'. Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?`);
  }
  const boundActionCreators = {};
  for (const key in actionCreators) {
    const actionCreator = actionCreators[key];
    if (typeof actionCreator === "function") {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
    }
  }
  return boundActionCreators;
}
var __webpack_exports__default$3 = __webpack_exports__$7["default"];
const __WEBPACK_EXTERNAL_MODULE__bindActionCreators_668d9911__ = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: __webpack_exports__default$3
}, Symbol.toStringTag, { value: "Module" }));
var __webpack_require__$6 = {};
(() => {
  __webpack_require__$6.d = (exports, definition) => {
    for (var key in definition) {
      if (__webpack_require__$6.o(definition, key) && !__webpack_require__$6.o(exports, key)) {
        Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
      }
    }
  };
})();
(() => {
  __webpack_require__$6.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
})();
(() => {
  __webpack_require__$6.r = (exports) => {
    if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
      Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
    }
    Object.defineProperty(exports, "__esModule", { value: true });
  };
})();
var __webpack_exports__$6 = {};
__webpack_require__$6.r(__webpack_exports__$6);
__webpack_require__$6.d(__webpack_exports__$6, {
  /* harmony export */
  "default": () => (
    /* binding */
    compose
  )
  /* harmony export */
});
function compose() {
  for (var _len = arguments.length, funcs = new Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }
  if (funcs.length === 0) {
    return (arg) => arg;
  }
  if (funcs.length === 1) {
    return funcs[0];
  }
  return funcs.reduce((a, b) => function() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    return a(b(...args));
  });
}
var __webpack_exports__default$2 = __webpack_exports__$6["default"];
const __WEBPACK_EXTERNAL_MODULE__compose_4a10d98c__ = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: __webpack_exports__default$2
}, Symbol.toStringTag, { value: "Module" }));
var __webpack_require__$5 = {};
(() => {
  __webpack_require__$5.d = (exports, definition) => {
    for (var key in definition) {
      if (__webpack_require__$5.o(definition, key) && !__webpack_require__$5.o(exports, key)) {
        Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
      }
    }
  };
})();
(() => {
  __webpack_require__$5.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
})();
(() => {
  __webpack_require__$5.r = (exports) => {
    if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
      Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
    }
    Object.defineProperty(exports, "__esModule", { value: true });
  };
})();
var __webpack_exports__$5 = {};
__webpack_require__$5.r(__webpack_exports__$5);
__webpack_require__$5.d(__webpack_exports__$5, {
  "default": () => (
    /* binding */
    applyMiddleware
  )
});
const external_compose_namespaceObject$1 = __WEBPACK_EXTERNAL_MODULE__compose_4a10d98c__;
function applyMiddleware() {
  for (var _len = arguments.length, middlewares = new Array(_len), _key = 0; _key < _len; _key++) {
    middlewares[_key] = arguments[_key];
  }
  return (createStore2) => (reducer, preloadedState) => {
    const store = createStore2(reducer, preloadedState);
    let dispatch = () => {
      throw new Error("Dispatching while constructing your middleware is not allowed. Other middleware would not be applied to this dispatch.");
    };
    const middlewareAPI = {
      getState: store.getState,
      dispatch: function(action) {
        for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          args[_key2 - 1] = arguments[_key2];
        }
        return dispatch(action, ...args);
      }
    };
    const chain = middlewares.map((middleware) => middleware(middlewareAPI));
    dispatch = (0, external_compose_namespaceObject$1["default"])(...chain)(store.dispatch);
    return {
      ...store,
      dispatch
    };
  };
}
var __webpack_exports__default$1 = __webpack_exports__$5["default"];
const __WEBPACK_EXTERNAL_MODULE__applyMiddleware_619de95e__ = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: __webpack_exports__default$1
}, Symbol.toStringTag, { value: "Module" }));
var __webpack_require__$4 = {};
(() => {
  __webpack_require__$4.d = (exports, definition) => {
    for (var key in definition) {
      if (__webpack_require__$4.o(definition, key) && !__webpack_require__$4.o(exports, key)) {
        Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
      }
    }
  };
})();
(() => {
  __webpack_require__$4.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
})();
(() => {
  __webpack_require__$4.r = (exports) => {
    if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
      Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
    }
    Object.defineProperty(exports, "__esModule", { value: true });
  };
})();
var __webpack_exports__$4 = {};
__webpack_require__$4.r(__webpack_exports__$4);
__webpack_require__$4.d(__webpack_exports__$4, {
  "default": () => (
    /* binding */
    isAction
  )
});
const external_isPlainObject_namespaceObject = __WEBPACK_EXTERNAL_MODULE__utils_isPlainObject_8966eb53__;
function isAction(action) {
  return (0, external_isPlainObject_namespaceObject["default"])(action) && "type" in action && typeof action.type === "string";
}
var __webpack_exports__default = __webpack_exports__$4["default"];
const __WEBPACK_EXTERNAL_MODULE__utils_isAction_9698ea9b__ = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: __webpack_exports__default
}, Symbol.toStringTag, { value: "Module" }));
var __webpack_require__$3 = {};
(() => {
  __webpack_require__$3.r = (exports) => {
    if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
      Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
    }
    Object.defineProperty(exports, "__esModule", { value: true });
  };
})();
var __webpack_exports__$3 = {};
__webpack_require__$3.r(__webpack_exports__$3);
const __WEBPACK_EXTERNAL_MODULE__types_reducers_a62409b6__ = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: "Module" }));
var __webpack_require__$2 = {};
(() => {
  __webpack_require__$2.r = (exports) => {
    if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
      Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
    }
    Object.defineProperty(exports, "__esModule", { value: true });
  };
})();
var __webpack_exports__$2 = {};
__webpack_require__$2.r(__webpack_exports__$2);
const __WEBPACK_EXTERNAL_MODULE__types_actions_3a35fb5a__ = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: "Module" }));
var __webpack_require__$1 = {};
(() => {
  __webpack_require__$1.r = (exports) => {
    if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
      Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
    }
    Object.defineProperty(exports, "__esModule", { value: true });
  };
})();
var __webpack_exports__$1 = {};
__webpack_require__$1.r(__webpack_exports__$1);
const __WEBPACK_EXTERNAL_MODULE__types_middleware_540be810__ = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: "Module" }));
var __webpack_require__ = {};
(() => {
  __webpack_require__.d = (exports, definition) => {
    for (var key in definition) {
      if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
        Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
      }
    }
  };
})();
(() => {
  __webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
})();
(() => {
  __webpack_require__.r = (exports) => {
    if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
      Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
    }
    Object.defineProperty(exports, "__esModule", { value: true });
  };
})();
var __webpack_exports__ = {};
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  Action: () => (
    /* reexport */
    actions_namespaceObject.Action
  ),
  ActionCreator: () => (
    /* reexport */
    actions_namespaceObject.ActionCreator
  ),
  ActionCreatorsMapObject: () => (
    /* reexport */
    actions_namespaceObject.ActionCreatorsMapObject
  ),
  ActionFromReducer: () => (
    /* reexport */
    reducers_namespaceObject.ActionFromReducer
  ),
  ActionFromReducersMapObject: () => (
    /* reexport */
    reducers_namespaceObject.ActionFromReducersMapObject
  ),
  AnyAction: () => (
    /* reexport */
    actions_namespaceObject.AnyAction
  ),
  Middleware: () => (
    /* reexport */
    middleware_namespaceObject.Middleware
  ),
  MiddlewareAPI: () => (
    /* reexport */
    middleware_namespaceObject.MiddlewareAPI
  ),
  PreloadedStateShapeFromReducersMapObject: () => (
    /* reexport */
    reducers_namespaceObject.PreloadedStateShapeFromReducersMapObject
  ),
  Reducer: () => (
    /* reexport */
    reducers_namespaceObject.Reducer
  ),
  ReducerFromReducersMapObject: () => (
    /* reexport */
    reducers_namespaceObject.ReducerFromReducersMapObject
  ),
  ReducersMapObject: () => (
    /* reexport */
    reducers_namespaceObject.ReducersMapObject
  ),
  StateFromReducersMapObject: () => (
    /* reexport */
    reducers_namespaceObject.StateFromReducersMapObject
  ),
  UnknownAction: () => (
    /* reexport */
    actions_namespaceObject.UnknownAction
  ),
  __DO_NOT_USE__ActionTypes: () => (
    /* reexport */
    actionTypes_namespaceObject["default"]
  ),
  applyMiddleware: () => (
    /* reexport */
    external_applyMiddleware_namespaceObject["default"]
  ),
  bindActionCreators: () => (
    /* reexport */
    external_bindActionCreators_namespaceObject["default"]
  ),
  combineReducers: () => (
    /* reexport */
    external_combineReducers_namespaceObject["default"]
  ),
  compose: () => (
    /* reexport */
    external_compose_namespaceObject["default"]
  ),
  createStore: () => (
    /* reexport */
    external_createStore_namespaceObject.createStore
  ),
  isAction: () => (
    /* reexport */
    isAction_namespaceObject["default"]
  ),
  isPlainObject: () => (
    /* reexport */
    isPlainObject_namespaceObject["default"]
  ),
  legacy_createStore: () => (
    /* reexport */
    external_createStore_namespaceObject.legacy_createStore
  )
});
const external_createStore_namespaceObject = __WEBPACK_EXTERNAL_MODULE__createStore_4b6949b8__;
const external_combineReducers_namespaceObject = __WEBPACK_EXTERNAL_MODULE__combineReducers_49f527c5__;
const external_bindActionCreators_namespaceObject = __WEBPACK_EXTERNAL_MODULE__bindActionCreators_668d9911__;
const external_applyMiddleware_namespaceObject = __WEBPACK_EXTERNAL_MODULE__applyMiddleware_619de95e__;
const external_compose_namespaceObject = __WEBPACK_EXTERNAL_MODULE__compose_4a10d98c__;
const isAction_namespaceObject = __WEBPACK_EXTERNAL_MODULE__utils_isAction_9698ea9b__;
const isPlainObject_namespaceObject = __WEBPACK_EXTERNAL_MODULE__utils_isPlainObject_8966eb53__;
const actionTypes_namespaceObject = __WEBPACK_EXTERNAL_MODULE__utils_actionTypes_9538f43c__;
const reducers_namespaceObject = __WEBPACK_EXTERNAL_MODULE__types_reducers_a62409b6__;
const actions_namespaceObject = __WEBPACK_EXTERNAL_MODULE__types_actions_3a35fb5a__;
const middleware_namespaceObject = __WEBPACK_EXTERNAL_MODULE__types_middleware_540be810__;
__webpack_exports__.Action;
__webpack_exports__.ActionCreator;
__webpack_exports__.ActionCreatorsMapObject;
__webpack_exports__.ActionFromReducer;
__webpack_exports__.ActionFromReducersMapObject;
__webpack_exports__.AnyAction;
__webpack_exports__.Middleware;
__webpack_exports__.MiddlewareAPI;
__webpack_exports__.PreloadedStateShapeFromReducersMapObject;
__webpack_exports__.Reducer;
__webpack_exports__.ReducerFromReducersMapObject;
__webpack_exports__.ReducersMapObject;
__webpack_exports__.StateFromReducersMapObject;
__webpack_exports__.UnknownAction;
__webpack_exports__.__DO_NOT_USE__ActionTypes;
__webpack_exports__.applyMiddleware;
__webpack_exports__.bindActionCreators;
var __webpack_exports__combineReducers = __webpack_exports__.combineReducers;
__webpack_exports__.compose;
__webpack_exports__.createStore;
__webpack_exports__.isAction;
__webpack_exports__.isPlainObject;
__webpack_exports__.legacy_createStore;
document.querySelector("#app").innerHTML = `
  <div>
    <pre>
      <code>${__webpack_exports__combineReducers}</code>
    </pre>
  </div>
`;
