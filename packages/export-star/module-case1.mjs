import * as __WEBPACK_EXTERNAL_MODULE_react233__ from 'react233'
import * as __WEBPACK_EXTERNAL_MODULE_vue233__ from 'vue233'
var __webpack_modules__ = {
  945: function (module) {
    module.exports = __WEBPACK_EXTERNAL_MODULE_react233__
  },
  769: function (module) {
    module.exports = __WEBPACK_EXTERNAL_MODULE_vue233__
  },
}
/************************************************************************/
// The module cache
var __webpack_module_cache__ = {}

// The require function
function __webpack_require__(moduleId) {
  // Check if module is in cache
  var cachedModule = __webpack_module_cache__[moduleId]
  if (cachedModule !== undefined) {
    return cachedModule.exports
  }
  // Create a new module (and put it into the cache)
  var module = (__webpack_module_cache__[moduleId] = {
    exports: {},
  })
  // Execute the module function
  __webpack_modules__[moduleId](module, module.exports, __webpack_require__)

  // Return the exports of the module
  return module.exports
}

/************************************************************************/
// webpack/runtime/define_property_getters
;(() => {
  __webpack_require__.d = function (exports, definition) {
    for (var key in definition) {
      if (
        __webpack_require__.o(definition, key) &&
        !__webpack_require__.o(exports, key)
      ) {
        Object.defineProperty(exports, key, {
          enumerable: true,
          get: definition[key],
        })
      }
    }
  }
})()
// webpack/runtime/has_own_property
;(() => {
  __webpack_require__.o = function (obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop)
  }
})()
// webpack/runtime/make_namespace_object
;(() => {
  // define __esModule on exports
  __webpack_require__.r = function (exports) {
    if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
      Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' })
    }
    Object.defineProperty(exports, '__esModule', { value: true })
  }
})()
/************************************************************************/
var __webpack_exports__ = {}
__webpack_require__.r(__webpack_exports__)
__webpack_require__.d(__webpack_exports__, {
  case1: function () {
    return case1
  },
})
/* ESM import */ var react__WEBPACK_IMPORTED_MODULE_0__ =
  __webpack_require__(945)

/* ESM reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {}
/* ESM reexport (unknown) */ for (var __WEBPACK_IMPORT_KEY__ in react__WEBPACK_IMPORTED_MODULE_0__)
  if (['case1', 'default'].indexOf(__WEBPACK_IMPORT_KEY__) < 0)
    __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = function (key) {
      return react__WEBPACK_IMPORTED_MODULE_0__[key]
    }.bind(0, __WEBPACK_IMPORT_KEY__)
/* ESM reexport (unknown) */ __webpack_require__.d(
  __webpack_exports__,
  __WEBPACK_REEXPORT_OBJECT__
)
/* ESM import */ var vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(769)

/* ESM reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {}
/* ESM reexport (unknown) */ for (var __WEBPACK_IMPORT_KEY__ in vue__WEBPACK_IMPORTED_MODULE_1__)
  if (['case1', 'default'].indexOf(__WEBPACK_IMPORT_KEY__) < 0)
    __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = function (key) {
      return vue__WEBPACK_IMPORTED_MODULE_1__[key]
    }.bind(0, __WEBPACK_IMPORT_KEY__)
/* ESM reexport (unknown) */ __webpack_require__.d(
  __webpack_exports__,
  __WEBPACK_REEXPORT_OBJECT__
)
// export * from 'react'
const case1 = 1
// export {} from 'react'

// export * as K from 'react'

var __webpack_exports__case1 = __webpack_exports__.case1
var __webpack_exports__default = __webpack_exports__['default']
export {
  __webpack_exports__case1 as case1,
  __webpack_exports__default as default,
}
