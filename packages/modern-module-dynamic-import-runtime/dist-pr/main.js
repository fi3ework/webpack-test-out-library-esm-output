import * as __WEBPACK_EXTERNAL_MODULE_lit_alias__ from "lit-alias";
import * as __WEBPACK_EXTERNAL_MODULE_svelte_alias__ from "svelte-alias";
import * as __WEBPACK_EXTERNAL_MODULE_react_alias__ from "react-alias";
import * as __WEBPACK_EXTERNAL_MODULE_angular_alias__ from "angular-alias";
var __webpack_modules__ = ({
"78": (function (module) {

module.exports = __WEBPACK_EXTERNAL_MODULE_lit_alias__;


}),
"904": (function (module) {

module.exports = __WEBPACK_EXTERNAL_MODULE_svelte_alias__;


}),

});
/************************************************************************/
// The module cache
var __webpack_module_cache__ = {};

// The require function
function __webpack_require__(moduleId) {

// Check if module is in cache
var cachedModule = __webpack_module_cache__[moduleId];
if (cachedModule !== undefined) {
return cachedModule.exports;
}
// Create a new module (and put it into the cache)
var module = (__webpack_module_cache__[moduleId] = {
exports: {}
});
// Execute the module function
__webpack_modules__[moduleId](module, module.exports, __webpack_require__);

// Return the exports of the module
return module.exports;

}

// expose the modules object (__webpack_modules__)
__webpack_require__.m = __webpack_modules__;

/************************************************************************/
// webpack/runtime/define_property_getters
(() => {
__webpack_require__.d = function(exports, definition) {
	for(var key in definition) {
        if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
            Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
        }
    }
};
})();
// webpack/runtime/ensure_chunk
(() => {
__webpack_require__.f = {};
// This file contains only the entry chunk.
// The chunk loading function for additional chunks
__webpack_require__.e = function (chunkId) {
	return Promise.all(
		Object.keys(__webpack_require__.f).reduce(function (promises, key) {
			__webpack_require__.f[key](chunkId, promises);
			return promises;
		}, [])
	);
};

})();
// webpack/runtime/get javascript chunk filename
(() => {
// This function allow to reference chunks
        __webpack_require__.u = function (chunkId) {
          // return url for filenames not based on template
          
          // return url for filenames based on template
          return "async.js";
        };
      
})();
// webpack/runtime/has_own_property
(() => {
__webpack_require__.o = function (obj, prop) {
	return Object.prototype.hasOwnProperty.call(obj, prop);
};

})();
// webpack/runtime/make_namespace_object
(() => {
// define __esModule on exports
__webpack_require__.r = function(exports) {
	if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
		Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
	}
	Object.defineProperty(exports, '__esModule', { value: true });
};

})();
// webpack/runtime/module_chunk_loading
(() => {

      // object to store loaded and loading chunks
      // undefined = chunk not loaded, null = chunk preloaded/prefetched
      // [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
      var installedChunks = {"909": 0,};
      var installChunk = function (data) {
    var ids = data.ids;
    var modules = data.modules;
    var runtime = data.runtime;
    // add "modules" to the modules object,
    // then flag all "ids" as loaded and fire callback
    var moduleId, chunkId, i = 0;
    for (moduleId in modules) {
        if (__webpack_require__.o(modules, moduleId)) {
            __webpack_require__.m[moduleId] = modules[moduleId];
        }
    }
    if (runtime) runtime(__webpack_require__);
    for (; i < ids.length; i++) {
        chunkId = ids[i];
        if (__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
            installedChunks[chunkId][0]();
        }
        installedChunks[ids[i]] = 0;
    }
    
};
        __webpack_require__.f.j = function (chunkId, promises) {
          // import() chunk loading for javascript
var installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
if (installedChunkData !== 0) { // 0 means "already installed".'
    // a Promise means "currently loading".
    if (installedChunkData) {
        promises.push(installedChunkData[1]);
    } else {
        if (true) {
            // setup Promise in chunk cache
            var promise = import("./" + __webpack_require__.u(chunkId)).then(installChunk, function (e) {
                if (installedChunks[chunkId] !== 0) installedChunks[chunkId] = undefined;
                throw e;
            });
            var promise = Promise.race([promise, new Promise(function (resolve) {
                installedChunkData = installedChunks[chunkId] = [resolve];
            })]);
            promises.push(installedChunkData[1] = promise);
        }
        
    }
}
        }
        
})();
/************************************************************************/
var __webpack_exports__ = {};

;// CONCATENATED MODULE: external "react-alias"

var external_react_alias_namespaceObject = __WEBPACK_EXTERNAL_MODULE_react_alias__;

;// CONCATENATED MODULE: external "angular-alias"

var external_angular_alias_namespaceObject = __WEBPACK_EXTERNAL_MODULE_angular_alias__;

;// CONCATENATED MODULE: ./main.js



const main = async () => {
  const dyn = await __webpack_require__.e(/* import() */ "476").then(__webpack_require__.bind(__webpack_require__, 630))
  const reactNs = await import("react-alias")
  const vueNs = await import("vue-alias")
  console.log(external_angular_alias_namespaceObject.angular, external_react_alias_namespaceObject.react, reactNs, vueNs, dyn)
}

export { main };
