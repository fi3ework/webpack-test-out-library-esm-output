/******/ var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ (() => {




/***/ }),
/* 2 */
/***/ (() => {




/***/ }),
/* 3 */
/***/ (() => {




/***/ })
/******/ ]);
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/******/ /* webpack/runtime/make namespace object */
/******/ (() => {
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ })();
/******/ 
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Action: () => (/* reexport */ actions.Action),
  ActionCreator: () => (/* reexport */ actions.ActionCreator),
  ActionCreatorsMapObject: () => (/* reexport */ actions.ActionCreatorsMapObject),
  ActionFromReducer: () => (/* reexport */ reducers.ActionFromReducer),
  ActionFromReducersMapObject: () => (/* reexport */ reducers.ActionFromReducersMapObject),
  AnyAction: () => (/* reexport */ actions.AnyAction),
  Middleware: () => (/* reexport */ middleware.Middleware),
  MiddlewareAPI: () => (/* reexport */ middleware.MiddlewareAPI),
  PreloadedStateShapeFromReducersMapObject: () => (/* reexport */ reducers.PreloadedStateShapeFromReducersMapObject),
  Reducer: () => (/* reexport */ reducers.Reducer),
  ReducerFromReducersMapObject: () => (/* reexport */ reducers.ReducerFromReducersMapObject),
  ReducersMapObject: () => (/* reexport */ reducers.ReducersMapObject),
  StateFromReducersMapObject: () => (/* reexport */ reducers.StateFromReducersMapObject),
  UnknownAction: () => (/* reexport */ actions.UnknownAction),
  __DO_NOT_USE__ActionTypes: () => (/* reexport */ actionTypes),
  applyMiddleware: () => (/* reexport */ applyMiddleware),
  bindActionCreators: () => (/* reexport */ bindActionCreators),
  combineReducers: () => (/* reexport */ combineReducers),
  compose: () => (/* reexport */ compose),
  createStore: () => (/* reexport */ createStore),
  isAction: () => (/* reexport */ isAction),
  isPlainObject: () => (/* reexport */ isPlainObject),
  legacy_createStore: () => (/* reexport */ legacy_createStore)
});

;// CONCATENATED MODULE: ../../submodules/redux/src/utils/symbol-observable.ts

const $$observable = /* @__PURE__ */ (() => typeof Symbol === "function" && Symbol.observable || "@@observable")();
/* harmony default export */ const symbol_observable = ($$observable);

;// CONCATENATED MODULE: ../../submodules/redux/src/utils/actionTypes.ts

const randomString = () => Math.random().toString(36).substring(7).split("").join(".");
const ActionTypes = {
  INIT: `@@redux/INIT${/* @__PURE__ */ randomString()}`,
  REPLACE: `@@redux/REPLACE${/* @__PURE__ */ randomString()}`,
  PROBE_UNKNOWN_ACTION: () => `@@redux/PROBE_UNKNOWN_ACTION${randomString()}`
};
/* harmony default export */ const actionTypes = (ActionTypes);

;// CONCATENATED MODULE: ../../submodules/redux/src/utils/isPlainObject.ts

function isPlainObject(obj) {
  if (typeof obj !== "object" || obj === null)
    return false;
  let proto = obj;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }
  return Object.getPrototypeOf(obj) === proto || Object.getPrototypeOf(obj) === null;
}

;// CONCATENATED MODULE: ../../submodules/redux/src/utils/kindOf.ts

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
  if (process.env.NODE_ENV !== "production") {
    typeOfVal = miniKindOf(val);
  }
  return typeOfVal;
}

;// CONCATENATED MODULE: ../../submodules/redux/src/createStore.ts





function createStore(reducer, preloadedState, enhancer) {
  if (typeof reducer !== "function") {
    throw new Error(
      `Expected the root reducer to be a function. Instead, received: '${kindOf(
        reducer
      )}'`
    );
  }
  if (typeof preloadedState === "function" && typeof enhancer === "function" || typeof enhancer === "function" && typeof arguments[3] === "function") {
    throw new Error(
      "It looks like you are passing several store enhancers to createStore(). This is not supported. Instead, compose them together to a single function. See https://redux.js.org/tutorials/fundamentals/part-4-store#creating-a-store-with-enhancers for an example."
    );
  }
  if (typeof preloadedState === "function" && typeof enhancer === "undefined") {
    enhancer = preloadedState;
    preloadedState = void 0;
  }
  if (typeof enhancer !== "undefined") {
    if (typeof enhancer !== "function") {
      throw new Error(
        `Expected the enhancer to be a function. Instead, received: '${kindOf(
          enhancer
        )}'`
      );
    }
    return enhancer(createStore)(
      reducer,
      preloadedState
    );
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
      throw new Error(
        "You may not call store.getState() while the reducer is executing. The reducer has already received the state as an argument. Pass it down from the top reducer instead of reading it from the store."
      );
    }
    return currentState;
  }
  function subscribe(listener) {
    if (typeof listener !== "function") {
      throw new Error(
        `Expected the listener to be a function. Instead, received: '${kindOf(
          listener
        )}'`
      );
    }
    if (isDispatching) {
      throw new Error(
        "You may not call store.subscribe() while the reducer is executing. If you would like to be notified after the store has been updated, subscribe from a component and invoke store.getState() in the callback to access the latest state. See https://redux.js.org/api/store#subscribelistener for more details."
      );
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
        throw new Error(
          "You may not unsubscribe from a store listener while the reducer is executing. See https://redux.js.org/api/store#subscribelistener for more details."
        );
      }
      isSubscribed = false;
      ensureCanMutateNextListeners();
      nextListeners.delete(listenerId);
      currentListeners = null;
    };
  }
  function dispatch(action) {
    if (!isPlainObject(action)) {
      throw new Error(
        `Actions must be plain objects. Instead, the actual type was: '${kindOf(
          action
        )}'. You may need to add middleware to your store setup to handle dispatching other values, such as 'redux-thunk' to handle dispatching functions. See https://redux.js.org/tutorials/fundamentals/part-4-store#middleware and https://redux.js.org/tutorials/fundamentals/part-6-async-logic#using-the-redux-thunk-middleware for examples.`
      );
    }
    if (typeof action.type === "undefined") {
      throw new Error(
        'Actions may not have an undefined "type" property. You may have misspelled an action type string constant.'
      );
    }
    if (typeof action.type !== "string") {
      throw new Error(
        `Action "type" property must be a string. Instead, the actual type was: '${kindOf(
          action.type
        )}'. Value was: '${action.type}' (stringified)`
      );
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
      throw new Error(
        `Expected the nextReducer to be a function. Instead, received: '${kindOf(
          nextReducer
        )}`
      );
    }
    currentReducer = nextReducer;
    dispatch({ type: actionTypes.REPLACE });
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
          throw new TypeError(
            `Expected the observer to be an object. Instead, received: '${kindOf(
              observer
            )}'`
          );
        }
        function observeState() {
          const observerAsObserver = observer;
          if (observerAsObserver.next) {
            observerAsObserver.next(getState());
          }
        }
        observeState();
        const unsubscribe = outerSubscribe(observeState);
        return { unsubscribe };
      },
      [symbol_observable]() {
        return this;
      }
    };
  }
  dispatch({ type: actionTypes.INIT });
  const store = {
    dispatch,
    subscribe,
    getState,
    replaceReducer,
    [symbol_observable]: observable
  };
  return store;
}
function legacy_createStore(reducer, preloadedState, enhancer) {
  return createStore(reducer, preloadedState, enhancer);
}

;// CONCATENATED MODULE: ../../submodules/redux/src/utils/warning.ts

function warning(message) {
  if (typeof console !== "undefined" && typeof console.error === "function") {
    console.error(message);
  }
  try {
    throw new Error(message);
  } catch (e) {
  }
}

;// CONCATENATED MODULE: ../../submodules/redux/src/combineReducers.ts





function getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {
  const reducerKeys = Object.keys(reducers);
  const argumentName = action && action.type === actionTypes.INIT ? "preloadedState argument passed to createStore" : "previous state received by the reducer";
  if (reducerKeys.length === 0) {
    return "Store does not have a valid reducer. Make sure the argument passed to combineReducers is an object whose values are reducers.";
  }
  if (!isPlainObject(inputState)) {
    return `The ${argumentName} has unexpected type of "${kindOf(
      inputState
    )}". Expected argument to be an object with the following keys: "${reducerKeys.join('", "')}"`;
  }
  const unexpectedKeys = Object.keys(inputState).filter(
    (key) => !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key]
  );
  unexpectedKeys.forEach((key) => {
    unexpectedKeyCache[key] = true;
  });
  if (action && action.type === actionTypes.REPLACE)
    return;
  if (unexpectedKeys.length > 0) {
    return `Unexpected ${unexpectedKeys.length > 1 ? "keys" : "key"} "${unexpectedKeys.join('", "')}" found in ${argumentName}. Expected to find one of the known reducer keys instead: "${reducerKeys.join('", "')}". Unexpected keys will be ignored.`;
  }
}
function assertReducerShape(reducers) {
  Object.keys(reducers).forEach((key) => {
    const reducer = reducers[key];
    const initialState = reducer(void 0, { type: actionTypes.INIT });
    if (typeof initialState === "undefined") {
      throw new Error(
        `The slice reducer for key "${key}" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined. If you don't want to set a value for this reducer, you can use null instead of undefined.`
      );
    }
    if (typeof reducer(void 0, {
      type: actionTypes.PROBE_UNKNOWN_ACTION()
    }) === "undefined") {
      throw new Error(
        `The slice reducer for key "${key}" returned undefined when probed with a random type. Don't try to handle '${actionTypes.INIT}' or other actions in "redux/*" namespace. They are considered private. Instead, you must return the current state for any unknown actions, unless it is undefined, in which case you must return the initial state, regardless of the action type. The initial state may not be undefined, but can be null.`
      );
    }
  });
}
function combineReducers(reducers) {
  const reducerKeys = Object.keys(reducers);
  const finalReducers = {};
  for (let i = 0; i < reducerKeys.length; i++) {
    const key = reducerKeys[i];
    if (process.env.NODE_ENV !== "production") {
      if (typeof reducers[key] === "undefined") {
        warning(`No reducer provided for key "${key}"`);
      }
    }
    if (typeof reducers[key] === "function") {
      finalReducers[key] = reducers[key];
    }
  }
  const finalReducerKeys = Object.keys(finalReducers);
  let unexpectedKeyCache;
  if (process.env.NODE_ENV !== "production") {
    unexpectedKeyCache = {};
  }
  let shapeAssertionError;
  try {
    assertReducerShape(finalReducers);
  } catch (e) {
    shapeAssertionError = e;
  }
  return function combination(state = {}, action) {
    if (shapeAssertionError) {
      throw shapeAssertionError;
    }
    if (process.env.NODE_ENV !== "production") {
      const warningMessage = getUnexpectedStateShapeWarningMessage(
        state,
        finalReducers,
        action,
        unexpectedKeyCache
      );
      if (warningMessage) {
        warning(warningMessage);
      }
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
        throw new Error(
          `When called with an action of type ${actionType ? `"${String(actionType)}"` : "(unknown type)"}, the slice reducer for key "${key}" returned undefined. To ignore an action, you must explicitly return the previous state. If you want this reducer to hold no value, you can return null instead of undefined.`
        );
      }
      nextState[key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }
    hasChanged = hasChanged || finalReducerKeys.length !== Object.keys(state).length;
    return hasChanged ? nextState : state;
  };
}

;// CONCATENATED MODULE: ../../submodules/redux/src/bindActionCreators.ts


function bindActionCreator(actionCreator, dispatch) {
  return function(...args) {
    return dispatch(actionCreator.apply(this, args));
  };
}
function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === "function") {
    return bindActionCreator(actionCreators, dispatch);
  }
  if (typeof actionCreators !== "object" || actionCreators === null) {
    throw new Error(
      `bindActionCreators expected an object or a function, but instead received: '${kindOf(
        actionCreators
      )}'. Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?`
    );
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

;// CONCATENATED MODULE: ../../submodules/redux/src/compose.ts

function compose(...funcs) {
  if (funcs.length === 0) {
    return (arg) => arg;
  }
  if (funcs.length === 1) {
    return funcs[0];
  }
  return funcs.reduce(
    (a, b) => (...args) => a(b(...args))
  );
}

;// CONCATENATED MODULE: ../../submodules/redux/src/applyMiddleware.ts

var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));

function applyMiddleware(...middlewares) {
  return (createStore) => (reducer, preloadedState) => {
    const store = createStore(reducer, preloadedState);
    let dispatch = () => {
      throw new Error(
        "Dispatching while constructing your middleware is not allowed. Other middleware would not be applied to this dispatch."
      );
    };
    const middlewareAPI = {
      getState: store.getState,
      dispatch: (action, ...args) => dispatch(action, ...args)
    };
    const chain = middlewares.map((middleware) => middleware(middlewareAPI));
    dispatch = compose(...chain)(store.dispatch);
    return __spreadProps(__spreadValues({}, store), {
      dispatch
    });
  };
}

;// CONCATENATED MODULE: ../../submodules/redux/src/utils/isAction.ts


function isAction(action) {
  return isPlainObject(action) && "type" in action && typeof action.type === "string";
}

// EXTERNAL MODULE: ../../submodules/redux/src/types/reducers.ts
var reducers = __webpack_require__(1);
// EXTERNAL MODULE: ../../submodules/redux/src/types/actions.ts
var actions = __webpack_require__(2);
// EXTERNAL MODULE: ../../submodules/redux/src/types/middleware.ts
var middleware = __webpack_require__(3);
;// CONCATENATED MODULE: ../../submodules/redux/src/index.ts















})();

var __webpack_exports__Action = __webpack_exports__.Action;
var __webpack_exports__ActionCreator = __webpack_exports__.ActionCreator;
var __webpack_exports__ActionCreatorsMapObject = __webpack_exports__.ActionCreatorsMapObject;
var __webpack_exports__ActionFromReducer = __webpack_exports__.ActionFromReducer;
var __webpack_exports__ActionFromReducersMapObject = __webpack_exports__.ActionFromReducersMapObject;
var __webpack_exports__AnyAction = __webpack_exports__.AnyAction;
var __webpack_exports__Middleware = __webpack_exports__.Middleware;
var __webpack_exports__MiddlewareAPI = __webpack_exports__.MiddlewareAPI;
var __webpack_exports__PreloadedStateShapeFromReducersMapObject = __webpack_exports__.PreloadedStateShapeFromReducersMapObject;
var __webpack_exports__Reducer = __webpack_exports__.Reducer;
var __webpack_exports__ReducerFromReducersMapObject = __webpack_exports__.ReducerFromReducersMapObject;
var __webpack_exports__ReducersMapObject = __webpack_exports__.ReducersMapObject;
var __webpack_exports__StateFromReducersMapObject = __webpack_exports__.StateFromReducersMapObject;
var __webpack_exports__UnknownAction = __webpack_exports__.UnknownAction;
var __webpack_exports___DO_NOT_USE_ActionTypes = __webpack_exports__.__DO_NOT_USE__ActionTypes;
var __webpack_exports__applyMiddleware = __webpack_exports__.applyMiddleware;
var __webpack_exports__bindActionCreators = __webpack_exports__.bindActionCreators;
var __webpack_exports__combineReducers = __webpack_exports__.combineReducers;
var __webpack_exports__compose = __webpack_exports__.compose;
var __webpack_exports__createStore = __webpack_exports__.createStore;
var __webpack_exports__isAction = __webpack_exports__.isAction;
var __webpack_exports__isPlainObject = __webpack_exports__.isPlainObject;
var __webpack_exports__legacy_createStore = __webpack_exports__.legacy_createStore;
export { __webpack_exports__Action as Action, __webpack_exports__ActionCreator as ActionCreator, __webpack_exports__ActionCreatorsMapObject as ActionCreatorsMapObject, __webpack_exports__ActionFromReducer as ActionFromReducer, __webpack_exports__ActionFromReducersMapObject as ActionFromReducersMapObject, __webpack_exports__AnyAction as AnyAction, __webpack_exports__Middleware as Middleware, __webpack_exports__MiddlewareAPI as MiddlewareAPI, __webpack_exports__PreloadedStateShapeFromReducersMapObject as PreloadedStateShapeFromReducersMapObject, __webpack_exports__Reducer as Reducer, __webpack_exports__ReducerFromReducersMapObject as ReducerFromReducersMapObject, __webpack_exports__ReducersMapObject as ReducersMapObject, __webpack_exports__StateFromReducersMapObject as StateFromReducersMapObject, __webpack_exports__UnknownAction as UnknownAction, __webpack_exports___DO_NOT_USE_ActionTypes as __DO_NOT_USE__ActionTypes, __webpack_exports__applyMiddleware as applyMiddleware, __webpack_exports__bindActionCreators as bindActionCreators, __webpack_exports__combineReducers as combineReducers, __webpack_exports__compose as compose, __webpack_exports__createStore as createStore, __webpack_exports__isAction as isAction, __webpack_exports__isPlainObject as isPlainObject, __webpack_exports__legacy_createStore as legacy_createStore };

//# sourceMappingURL=webpack-dist.mjs.map