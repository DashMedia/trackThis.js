/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 14);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uuid = exports.assign = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /**
                                                                                                                                                                                                                                                                               * Copyright 2016 Google Inc. All Rights Reserved.
                                                                                                                                                                                                                                                                               *
                                                                                                                                                                                                                                                                               * Licensed under the Apache License, Version 2.0 (the "License");
                                                                                                                                                                                                                                                                               * you may not use this file except in compliance with the License.
                                                                                                                                                                                                                                                                               * You may obtain a copy of the License at
                                                                                                                                                                                                                                                                               *
                                                                                                                                                                                                                                                                               *     http://www.apache.org/licenses/LICENSE-2.0
                                                                                                                                                                                                                                                                               *
                                                                                                                                                                                                                                                                               * Unless required by applicable law or agreed to in writing, software
                                                                                                                                                                                                                                                                               * distributed under the License is distributed on an "AS IS" BASIS,
                                                                                                                                                                                                                                                                               * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
                                                                                                                                                                                                                                                                               * See the License for the specific language governing permissions and
                                                                                                                                                                                                                                                                               * limitations under the License.
                                                                                                                                                                                                                                                                               */

exports.createFieldsObj = createFieldsObj;
exports.getAttributeFields = getAttributeFields;
exports.domReady = domReady;
exports.debounce = debounce;
exports.withTimeout = withTimeout;
exports.deferUntilPluginsLoaded = deferUntilPluginsLoaded;
exports.camelCase = camelCase;
exports.capitalize = capitalize;
exports.isObject = isObject;
exports.toArray = toArray;
exports.now = now;

var _domUtils = __webpack_require__(2);

var _methodChain = __webpack_require__(4);

var _methodChain2 = _interopRequireDefault(_methodChain);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Accepts default and user override fields and an optional tracker, hit
 * filter, and target element and returns a single object that can be used in
 * `ga('send', ...)` commands.
 * @param {FieldsObj} defaultFields The default fields to return.
 * @param {FieldsObj} userFields Fields set by the user to override the
 *     defaults.
 * @param {Tracker=} tracker The tracker object to apply the hit filter to.
 * @param {Function=} hitFilter A filter function that gets
 *     called with the tracker model right before the `buildHitTask`. It can
 *     be used to modify the model for the current hit only.
 * @param {Element=} target If the hit originated from an interaction
 *     with a DOM element, hitFilter is invoked with that element as the
 *     second argument.
 * @param {(Event|TwttrEvent)=} event If the hit originated via a DOM event,
 *     hitFilter is invoked with that event as the third argument.
 * @return {!FieldsObj} The final fields object.
 */
function createFieldsObj(defaultFields, userFields) {
  var tracker = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
  var hitFilter = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;
  var target = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : undefined;
  var event = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : undefined;

  if (typeof hitFilter == 'function') {
    var originalBuildHitTask = tracker.get('buildHitTask');
    return {
      buildHitTask: function buildHitTask( /** @type {!Model} */model) {
        model.set(defaultFields, null, true);
        model.set(userFields, null, true);
        hitFilter(model, target, event);
        originalBuildHitTask(model);
      }
    };
  } else {
    return assign({}, defaultFields, userFields);
  }
}

/**
 * Retrieves the attributes from an DOM element and returns a fields object
 * for all attributes matching the passed prefix string.
 * @param {Element} element The DOM element to get attributes from.
 * @param {string} prefix An attribute prefix. Only the attributes matching
 *     the prefix will be returned on the fields object.
 * @return {FieldsObj} An object of analytics.js fields and values
 */
function getAttributeFields(element, prefix) {
  var attributes = (0, _domUtils.getAttributes)(element);
  var attributeFields = {};

  Object.keys(attributes).forEach(function (attribute) {
    // The `on` prefix is used for event handling but isn't a field.
    if (attribute.indexOf(prefix) === 0 && attribute != prefix + 'on') {
      var value = attributes[attribute];

      // Detects Boolean value strings.
      if (value == 'true') value = true;
      if (value == 'false') value = false;

      var field = camelCase(attribute.slice(prefix.length));
      attributeFields[field] = value;
    }
  });

  return attributeFields;
}

/**
 * Accepts a function to be invoked once the DOM is ready. If the DOM is
 * already ready, the callback is invoked immediately.
 * @param {!Function} callback The ready callback.
 */
function domReady(callback) {
  if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', function fn() {
      document.removeEventListener('DOMContentLoaded', fn);
      callback();
    });
  } else {
    callback();
  }
}

/**
 * Returns a function, that, as long as it continues to be called, will not
 * actually run. The function will only run after it stops being called for
 * `wait` milliseconds.
 * @param {!Function} fn The function to debounce.
 * @param {number} wait The debounce wait timeout in ms.
 * @return {!Function} The debounced function.
 */
function debounce(fn, wait) {
  var timeout = void 0;
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    clearTimeout(timeout);
    timeout = setTimeout(function () {
      return fn.apply(undefined, args);
    }, wait);
  };
}

/**
 * Accepts a function and returns a wrapped version of the function that is
 * expected to be called elsewhere in the system. If it's not called
 * elsewhere after the timeout period, it's called regardless. The wrapper
 * function also prevents the callback from being called more than once.
 * @param {!Function} callback The function to call.
 * @param {number=} wait How many milliseconds to wait before invoking
 *     the callback.
 * @return {!Function} The wrapped version of the passed function.
 */
function withTimeout(callback) {
  var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2000;

  var called = false;
  var fn = function fn() {
    if (!called) {
      called = true;
      callback();
    }
  };
  setTimeout(fn, wait);
  return fn;
}

// Maps trackers to queue by tracking ID.
var queueMap = {};

/**
 * Queues a function for execution in the next call stack, or immediately
 * before any send commands are executed on the tracker. This allows
 * autotrack plugins to defer running commands until after all other plugins
 * are required but before any other hits are sent.
 * @param {!Tracker} tracker
 * @param {!Function} fn
 */
function deferUntilPluginsLoaded(tracker, fn) {
  var trackingId = tracker.get('trackingId');
  var ref = queueMap[trackingId] = queueMap[trackingId] || {};

  var processQueue = function processQueue() {
    clearTimeout(ref.timeout);
    if (ref.send) {
      _methodChain2.default.remove(tracker, 'send', ref.send);
    }
    delete queueMap[trackingId];

    ref.queue.forEach(function (fn) {
      return fn();
    });
  };

  clearTimeout(ref.timeout);
  ref.timeout = setTimeout(processQueue, 0);
  ref.queue = ref.queue || [];
  ref.queue.push(fn);

  if (!ref.send) {
    ref.send = function (originalMethod) {
      return function () {
        processQueue();
        originalMethod.apply(undefined, arguments);
      };
    };
    _methodChain2.default.add(tracker, 'send', ref.send);
  }
}

/**
 * A small shim of Object.assign that aims for brevity over spec-compliant
 * handling all the edge cases.
 * @param {!Object} target The target object to assign to.
 * @param {...?Object} sources Additional objects who properties should be
 *     assigned to target. Non-objects are converted to objects.
 * @return {!Object} The modified target object.
 */
var assign = exports.assign = Object.assign || function (target) {
  for (var _len2 = arguments.length, sources = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    sources[_key2 - 1] = arguments[_key2];
  }

  for (var i = 0, len = sources.length; i < len; i++) {
    var source = Object(sources[i]);
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};

/**
 * Accepts a string containing hyphen or underscore word separators and
 * converts it to camelCase.
 * @param {string} str The string to camelCase.
 * @return {string} The camelCased version of the string.
 */
function camelCase(str) {
  return str.replace(/[\-\_]+(\w?)/g, function (match, p1) {
    return p1.toUpperCase();
  });
}

/**
 * Capitalizes the first letter of a string.
 * @param {string} str The input string.
 * @return {string} The capitalized string
 */
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Indicates whether the passed variable is a JavaScript object.
 * @param {*} value The input variable to test.
 * @return {boolean} Whether or not the test is an object.
 */
function isObject(value) {
  return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object' && value !== null;
}

/**
 * Accepts a value that may or may not be an array. If it is not an array,
 * it is returned as the first item in a single-item array.
 * @param {*} value The value to convert to an array if it is not.
 * @return {!Array} The array-ified value.
 */
function toArray(value) {
  return Array.isArray(value) ? value : [value];
}

/**
 * @return {number} The current date timestamp
 */
function now() {
  return +new Date();
}

/*eslint-disable */
// https://gist.github.com/jed/982883
/** @param {?=} a */
var uuid = exports.uuid = function b(a) {
  return a ? (a ^ Math.random() * 16 >> a / 4).toString(16) : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, b);
};
/*eslint-enable */

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = provide;

var _constants = __webpack_require__(5);

var _utilities = __webpack_require__(0);

/**
 * Provides a plugin for use with analytics.js, accounting for the possibility
 * that the global command queue has been renamed or not yet defined.
 * @param {string} pluginName The plugin name identifier.
 * @param {Function} pluginConstructor The plugin constructor function.
 */
/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

function provide(pluginName, pluginConstructor) {
  var gaAlias = window.GoogleAnalyticsObject || 'ga';
  window[gaAlias] = window[gaAlias] || function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    (window[gaAlias].q = window[gaAlias].q || []).push(args);
  };

  // Adds the autotrack dev ID if not already included.
  window.gaDevIds = window.gaDevIds || [];
  if (window.gaDevIds.indexOf(_constants.DEV_ID) < 0) {
    window.gaDevIds.push(_constants.DEV_ID);
  }

  // Formally provides the plugin for use with analytics.js.
  window[gaAlias]('provide', pluginName, pluginConstructor);

  // Registers the plugin on the global gaplugins object.
  window.gaplugins = window.gaplugins || {};
  window.gaplugins[(0, _utilities.capitalize)(pluginName)] = pluginConstructor;
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseUrl = exports.parents = exports.matches = exports.getAttributes = exports.dispatch = exports.delegate = exports.closest = undefined;

var _closest = __webpack_require__(8);

var _closest2 = _interopRequireDefault(_closest);

var _delegate = __webpack_require__(17);

var _delegate2 = _interopRequireDefault(_delegate);

var _dispatch = __webpack_require__(18);

var _dispatch2 = _interopRequireDefault(_dispatch);

var _getAttributes = __webpack_require__(19);

var _getAttributes2 = _interopRequireDefault(_getAttributes);

var _matches = __webpack_require__(6);

var _matches2 = _interopRequireDefault(_matches);

var _parents = __webpack_require__(9);

var _parents2 = _interopRequireDefault(_parents);

var _parseUrl = __webpack_require__(20);

var _parseUrl2 = _interopRequireDefault(_parseUrl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.closest = _closest2.default;
exports.delegate = _delegate2.default;
exports.dispatch = _dispatch2.default;
exports.getAttributes = _getAttributes2.default;
exports.matches = _matches2.default;
exports.parents = _parents2.default;
exports.parseUrl = _parseUrl2.default;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.plugins = undefined;
exports.trackUsage = trackUsage;

var _constants = __webpack_require__(5);

var plugins = exports.plugins = {
  CLEAN_URL_TRACKER: 1,
  EVENT_TRACKER: 2,
  IMPRESSION_TRACKER: 3,
  MEDIA_QUERY_TRACKER: 4,
  OUTBOUND_FORM_TRACKER: 5,
  OUTBOUND_LINK_TRACKER: 6,
  PAGE_VISIBILITY_TRACKER: 7,
  SOCIAL_WIDGET_TRACKER: 8,
  URL_CHANGE_TRACKER: 9,
  MAX_SCROLL_TRACKER: 10
}; /**
    * Copyright 2016 Google Inc. All Rights Reserved.
    *
    * Licensed under the Apache License, Version 2.0 (the "License");
    * you may not use this file except in compliance with the License.
    * You may obtain a copy of the License at
    *
    *     http://www.apache.org/licenses/LICENSE-2.0
    *
    * Unless required by applicable law or agreed to in writing, software
    * distributed under the License is distributed on an "AS IS" BASIS,
    * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    * See the License for the specific language governing permissions and
    * limitations under the License.
    */

var PLUGIN_COUNT = Object.keys(plugins).length;

/**
 * Tracks the usage of the passed plugin by encoding a value into a usage
 * string sent with all hits for the passed tracker.
 * @param {!Tracker} tracker The analytics.js tracker object.
 * @param {number} plugin The plugin enum.
 */
function trackUsage(tracker, plugin) {
  trackVersion(tracker);
  trackPlugin(tracker, plugin);
}

/**
 * Converts a hexadecimal string to a binary string.
 * @param {string} hex A hexadecimal numeric string.
 * @return {string} a binary numeric string.
 */
function convertHexToBin(hex) {
  return parseInt(hex || '0', 16).toString(2);
}

/**
 * Converts a binary string to a hexadecimal string.
 * @param {string} bin A binary numeric string.
 * @return {string} a hexadecimal numeric string.
 */
function convertBinToHex(bin) {
  return parseInt(bin || '0', 2).toString(16);
}

/**
 * Adds leading zeros to a string if it's less than a minimum length.
 * @param {string} str A string to pad.
 * @param {number} len The minimum length of the string
 * @return {string} The padded string.
 */
function padZeros(str, len) {
  if (str.length < len) {
    var toAdd = len - str.length;
    while (toAdd) {
      str = '0' + str;
      toAdd--;
    }
  }
  return str;
}

/**
 * Accepts a binary numeric string and flips the digit from 0 to 1 at the
 * specified index.
 * @param {string} str The binary numeric string.
 * @param {number} index The index to flip the bit.
 * @return {string} The new binary string with the bit flipped on
 */
function flipBitOn(str, index) {
  return str.substr(0, index) + 1 + str.substr(index + 1);
}

/**
 * Accepts a tracker and a plugin index and flips the bit at the specified
 * index on the tracker's usage parameter.
 * @param {Object} tracker An analytics.js tracker.
 * @param {number} pluginIndex The index of the plugin in the global list.
 */
function trackPlugin(tracker, pluginIndex) {
  var usageHex = tracker.get('&' + _constants.USAGE_PARAM);
  var usageBin = padZeros(convertHexToBin(usageHex), PLUGIN_COUNT);

  // Flip the bit of the plugin being tracked.
  usageBin = flipBitOn(usageBin, PLUGIN_COUNT - pluginIndex);

  // Stores the modified usage string back on the tracker.
  tracker.set('&' + _constants.USAGE_PARAM, convertBinToHex(usageBin));
}

/**
 * Accepts a tracker and adds the current version to the version param.
 * @param {Object} tracker An analytics.js tracker.
 */
function trackVersion(tracker) {
  tracker.set('&' + _constants.VERSION_PARAM, _constants.VERSION);
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview
 * The functions exported by this module make it easier (and safer) to override
 * foreign object methods (in a modular way) and respond to or modify their
 * invocation. The primary feature is the ability to override a method without
 * worrying if it's already been overridden somewhere else in the codebase. It
 * also allows for safe restoring of an overridden method by only fully
 * restoring a method once all overrides have been removed.
 */

var instances = [];

/**
 * A class that wraps a foreign object method and emit events before and
 * after the original method is called.
 */

var MethodChain = function () {
  _createClass(MethodChain, null, [{
    key: "add",

    /**
     * Adds the passed override method to the list of method chain overrides.
     * @param {!Object} context The object containing the method to chain.
     * @param {string} methodName The name of the method on the object.
     * @param {!Function} methodOverride The override method to add.
     */
    value: function add(context, methodName, methodOverride) {
      getOrCreateMethodChain(context, methodName).add(methodOverride);
    }

    /**
     * Removes a method chain added via `add()`. If the override is the
     * only override added, the original method is restored.
     * @param {!Object} context The object containing the method to unchain.
     * @param {string} methodName The name of the method on the object.
     * @param {!Function} methodOverride The override method to remove.
     */

  }, {
    key: "remove",
    value: function remove(context, methodName, methodOverride) {
      getOrCreateMethodChain(context, methodName).remove(methodOverride);
    }

    /**
     * Wraps a foreign object method and overrides it. Also stores a reference
     * to the original method so it can be restored later.
     * @param {!Object} context The object containing the method.
     * @param {string} methodName The name of the method on the object.
     */

  }]);

  function MethodChain(context, methodName) {
    var _this = this;

    _classCallCheck(this, MethodChain);

    this.context = context;
    this.methodName = methodName;
    this.isTask = /Task$/.test(methodName);

    this.originalMethodReference = this.isTask ? context.get(methodName) : context[methodName];

    this.methodChain = [];
    this.boundMethodChain = [];

    // Wraps the original method.
    this.wrappedMethod = function () {
      var lastBoundMethod = _this.boundMethodChain[_this.boundMethodChain.length - 1];

      return lastBoundMethod.apply(undefined, arguments);
    };

    // Override original method with the wrapped one.
    if (this.isTask) {
      context.set(methodName, this.wrappedMethod);
    } else {
      context[methodName] = this.wrappedMethod;
    }
  }

  /**
   * Adds a method to the method chain.
   * @param {!Function} overrideMethod The override method to add.
   */


  _createClass(MethodChain, [{
    key: "add",
    value: function add(overrideMethod) {
      this.methodChain.push(overrideMethod);
      this.rebindMethodChain();
    }

    /**
     * Removes a method from the method chain and restores the prior order.
     * @param {!Function} overrideMethod The override method to remove.
     */

  }, {
    key: "remove",
    value: function remove(overrideMethod) {
      var index = this.methodChain.indexOf(overrideMethod);
      if (index > -1) {
        this.methodChain.splice(index, 1);
        if (this.methodChain.length > 0) {
          this.rebindMethodChain();
        } else {
          this.destroy();
        }
      }
    }

    /**
     * Loops through the method chain array and recreates the bound method
     * chain array. This is necessary any time a method is added or removed
     * to ensure proper original method context and order.
     */

  }, {
    key: "rebindMethodChain",
    value: function rebindMethodChain() {
      this.boundMethodChain = [];
      for (var method, i = 0; method = this.methodChain[i]; i++) {
        var previousMethod = this.boundMethodChain[i - 1] || this.originalMethodReference.bind(this.context);
        this.boundMethodChain.push(method(previousMethod));
      }
    }

    /**
     * Calls super and destroys the instance if no registered handlers remain.
     */

  }, {
    key: "destroy",
    value: function destroy() {
      var index = instances.indexOf(this);
      if (index > -1) {
        instances.splice(index, 1);
        if (this.isTask) {
          this.context.set(this.methodName, this.originalMethodReference);
        } else {
          this.context[this.methodName] = this.originalMethodReference;
        }
      }
    }
  }]);

  return MethodChain;
}();

/**
 * Gets a MethodChain instance for the passed object and method. If the method
 * has already been wrapped via an existing MethodChain instance, that
 * instance is returned.
 * @param {!Object} context The object containing the method.
 * @param {string} methodName The name of the method on the object.
 * @return {!MethodChain}
 */


exports.default = MethodChain;
function getOrCreateMethodChain(context, methodName) {
  var methodChain = instances.filter(function (h) {
    return h.context == context && h.methodName == methodName;
  })[0];

  if (!methodChain) {
    methodChain = new MethodChain(context, methodName);
    instances.push(methodChain);
  }
  return methodChain;
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var VERSION = exports.VERSION = '2.4.1';
var DEV_ID = exports.DEV_ID = 'i5iSjo';

var VERSION_PARAM = exports.VERSION_PARAM = '_av';
var USAGE_PARAM = exports.USAGE_PARAM = '_au';

var NULL_DIMENSION = exports.NULL_DIMENSION = '(not set)';

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = matches;
var proto = window.Element.prototype;
var nativeMatches = proto.matches || proto.matchesSelector || proto.webkitMatchesSelector || proto.mozMatchesSelector || proto.msMatchesSelector || proto.oMatchesSelector;

/**
 * Tests if a DOM elements matches any of the test DOM elements or selectors.
 * @param {Element} element The DOM element to test.
 * @param {Element|string|Array<Element|string>} test A DOM element, a CSS
 *     selector, or an array of DOM elements or CSS selectors to match against.
 * @return {boolean} True of any part of the test matches.
 */
function matches(element, test) {
  // Validate input.
  if (element && element.nodeType == 1 && test) {
    // if test is a string or DOM element test it.
    if (typeof test == 'string' || test.nodeType == 1) {
      return element == test || matchesSelector(element, /** @type {string} */test);
    } else if ('length' in test) {
      // if it has a length property iterate over the items
      // and return true if any match.
      for (var i = 0, item; item = test[i]; i++) {
        if (element == item || matchesSelector(element, item)) return true;
      }
    }
  }
  // Still here? Return false
  return false;
}

/**
 * Tests whether a DOM element matches a selector. This polyfills the native
 * Element.prototype.matches method across browsers.
 * @param {!Element} element The DOM element to test.
 * @param {string} selector The CSS selector to test element against.
 * @return {boolean} True if the selector matches.
 */
function matchesSelector(element, selector) {
  if (typeof selector != 'string') return false;
  if (nativeMatches) return nativeMatches.call(element, selector);
  var nodes = element.parentNode.querySelectorAll(selector);
  for (var i = 0, node; node = nodes[i]; i++) {
    if (node == element) return true;
  }
  return false;
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _eventEmitter = __webpack_require__(29);

var _eventEmitter2 = _interopRequireDefault(_eventEmitter);

var _utilities = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2016 Google Inc. All Rights Reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Licensed under the Apache License, Version 2.0 (the "License");
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * you may not use this file except in compliance with the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * You may obtain a copy of the License at
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *     http://www.apache.org/licenses/LICENSE-2.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Unless required by applicable law or agreed to in writing, software
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * distributed under the License is distributed on an "AS IS" BASIS,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * See the License for the specific language governing permissions and
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * limitations under the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var AUTOTRACK_PREFIX = 'autotrack';
var instances = {};
var isListening = false;

/** @type {boolean|undefined} */
var browserSupportsLocalStorage = void 0;

/**
 * A storage object to simplify interacting with localStorage.
 */

var Store = function (_EventEmitter) {
  _inherits(Store, _EventEmitter);

  _createClass(Store, null, [{
    key: 'getOrCreate',

    /**
     * Gets an existing instance for the passed arguements or creates a new
     * instance if one doesn't exist.
     * @param {string} trackingId The tracking ID for the GA property.
     * @param {string} namespace A namespace unique to this store.
     * @param {Object=} defaults An optional object of key/value defaults.
     * @return {Store} The Store instance.
     */
    value: function getOrCreate(trackingId, namespace, defaults) {
      var key = [AUTOTRACK_PREFIX, trackingId, namespace].join(':');

      // Don't create multiple instances for the same tracking Id and namespace.
      if (!instances[key]) {
        instances[key] = new Store(key, defaults);
        if (!isListening) initStorageListener();
      }
      return instances[key];
    }

    /**
     * Returns true if the browser supports and can successfully write to
     * localStorage. The results is cached so this method can be invoked many
     * times with no extra performance cost.
     * @private
     * @return {boolean}
     */

  }, {
    key: 'isSupported_',
    value: function isSupported_() {
      if (browserSupportsLocalStorage != null) {
        return browserSupportsLocalStorage;
      }

      try {
        window.localStorage.setItem(AUTOTRACK_PREFIX, AUTOTRACK_PREFIX);
        window.localStorage.removeItem(AUTOTRACK_PREFIX);
        browserSupportsLocalStorage = true;
      } catch (err) {
        browserSupportsLocalStorage = false;
      }
      return browserSupportsLocalStorage;
    }

    /**
     * Wraps the native localStorage method for each stubbing in tests.
     * @private
     * @param {string} key The store key.
     * @return {string|null} The stored value.
     */

  }, {
    key: 'get_',
    value: function get_(key) {
      return window.localStorage.getItem(key);
    }

    /**
     * Wraps the native localStorage method for each stubbing in tests.
     * @private
     * @param {string} key The store key.
     * @param {string} value The value to store.
     */

  }, {
    key: 'set_',
    value: function set_(key, value) {
      window.localStorage.setItem(key, value);
    }

    /**
     * Wraps the native localStorage method for each stubbing in tests.
     * @private
     * @param {string} key The store key.
     */

  }, {
    key: 'clear_',
    value: function clear_(key) {
      window.localStorage.removeItem(key);
    }

    /**
     * @param {string} key A key unique to this store.
     * @param {Object=} defaults An optional object of key/value defaults.
     */

  }]);

  function Store(key) {
    var defaults = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Store);

    var _this = _possibleConstructorReturn(this, (Store.__proto__ || Object.getPrototypeOf(Store)).call(this));

    _this.key_ = key;
    _this.defaults_ = defaults;

    /** @type {?Object} */
    _this.cache_ = null; // Will be set after the first get.
    return _this;
  }

  /**
   * Gets the data stored in localStorage for this store. If the cache is
   * already populated, return it as is (since it's always kept up-to-date
   * and in sync with activity in other windows via the `storage` event).
   * TODO(philipwalton): Implement schema migrations if/when a new
   * schema version is introduced.
   * @return {!Object} The stored data merged with the defaults.
   */


  _createClass(Store, [{
    key: 'get',
    value: function get() {
      if (this.cache_) {
        return this.cache_;
      } else {
        if (Store.isSupported_()) {
          try {
            this.cache_ = parse(Store.get_(this.key_));
          } catch (err) {
            // Do nothing.
          }
        }
        return this.cache_ = (0, _utilities.assign)({}, this.defaults_, this.cache_);
      }
    }

    /**
     * Saves the passed data object to localStorage,
     * merging it with the existing data.
     * @param {Object} newData The data to save.
     */

  }, {
    key: 'set',
    value: function set(newData) {
      this.cache_ = (0, _utilities.assign)({}, this.defaults_, this.cache_, newData);

      if (Store.isSupported_()) {
        try {
          Store.set_(this.key_, JSON.stringify(this.cache_));
        } catch (err) {
          // Do nothing.
        }
      }
    }

    /**
     * Clears the data in localStorage for the current store.
     */

  }, {
    key: 'clear',
    value: function clear() {
      this.cache_ = {};
      if (Store.isSupported_()) {
        try {
          Store.clear_(this.key_);
        } catch (err) {
          // Do nothing.
        }
      }
    }

    /**
     * Removes the store instance for the global instances map. If this is the
     * last store instance, the storage listener is also removed.
     * Note: this does not erase the stored data. Use `clear()` for that.
     */

  }, {
    key: 'destroy',
    value: function destroy() {
      delete instances[this.key_];
      if (!Object.keys(instances).length) {
        removeStorageListener();
      }
    }
  }]);

  return Store;
}(_eventEmitter2.default);

/**
 * Adds a single storage event listener and flips the global `isListening`
 * flag so multiple events aren't added.
 */


exports.default = Store;
function initStorageListener() {
  window.addEventListener('storage', storageListener);
  isListening = true;
}

/**
 * Removes the storage event listener and flips the global `isListening`
 * flag so it can be re-added later.
 */
function removeStorageListener() {
  window.removeEventListener('storage', storageListener);
  isListening = false;
}

/**
 * The global storage event listener.
 * @param {!Event} event The DOM event.
 */
function storageListener(event) {
  var store = instances[event.key];
  if (store) {
    var oldData = (0, _utilities.assign)({}, store.defaults_, parse(event.oldValue));
    var newData = (0, _utilities.assign)({}, store.defaults_, parse(event.newValue));

    store.cache_ = newData;
    store.emit('externalSet', newData, oldData);
  }
}

/**
 * Parses a source string as JSON
 * @param {string|null} source
 * @return {!Object} The JSON object.
 */
function parse(source) {
  var data = {};
  if (source) {
    try {
      data = /** @type {!Object} */JSON.parse(source);
    } catch (err) {
      // Do nothing.
    }
  }
  return data;
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = closest;

var _matches = __webpack_require__(6);

var _matches2 = _interopRequireDefault(_matches);

var _parents = __webpack_require__(9);

var _parents2 = _interopRequireDefault(_parents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Gets the closest parent element that matches the passed selector.
 * @param {Element} element The element whose parents to check.
 * @param {string} selector The CSS selector to match against.
 * @param {boolean=} shouldCheckSelf True if the selector should test against
 *     the passed element itself.
 * @return {Element|undefined} The matching element or undefined.
 */
function closest(element, selector) {
  var shouldCheckSelf = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  if (!(element && element.nodeType == 1 && selector)) return;
  var parentElements = (shouldCheckSelf ? [element] : []).concat((0, _parents2.default)(element));

  for (var i = 0, parent; parent = parentElements[i]; i++) {
    if ((0, _matches2.default)(parent, selector)) return parent;
  }
}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parents;
/**
 * Returns an array of a DOM element's parent elements.
 * @param {!Element} element The DOM element whose parents to get.
 * @return {!Array} An array of all parent elemets, or an empty array if no
 *     parent elements are found.
 */
function parents(element) {
  var list = [];
  while (element && element.parentNode && element.parentNode.nodeType == 1) {
    element = /** @type {!Element} */element.parentNode;
    list.push(element);
  }
  return list;
}

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright 2017 Google Inc. All Rights Reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Licensed under the Apache License, Version 2.0 (the "License");
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * you may not use this file except in compliance with the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * You may obtain a copy of the License at
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *     http://www.apache.org/licenses/LICENSE-2.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Unless required by applicable law or agreed to in writing, software
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * distributed under the License is distributed on an "AS IS" BASIS,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * See the License for the specific language governing permissions and
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * limitations under the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _domUtils = __webpack_require__(2);

var _methodChain = __webpack_require__(4);

var _methodChain2 = _interopRequireDefault(_methodChain);

var _provide = __webpack_require__(1);

var _provide2 = _interopRequireDefault(_provide);

var _session = __webpack_require__(11);

var _session2 = _interopRequireDefault(_session);

var _store = __webpack_require__(7);

var _store2 = _interopRequireDefault(_store);

var _usage = __webpack_require__(3);

var _utilities = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Class for the `maxScrollQueryTracker` analytics.js plugin.
 * @implements {MaxScrollTrackerPublicInterface}
 */
var MaxScrollTracker = function () {
  /**
   * Registers outbound link tracking on tracker object.
   * @param {!Tracker} tracker Passed internally by analytics.js
   * @param {?Object} opts Passed by the require command.
   */
  function MaxScrollTracker(tracker, opts) {
    _classCallCheck(this, MaxScrollTracker);

    (0, _usage.trackUsage)(tracker, _usage.plugins.MAX_SCROLL_TRACKER);

    // Feature detects to prevent errors in unsupporting browsers.
    if (!window.addEventListener) return;

    /** @type {MaxScrollTrackerOpts} */
    var defaultOpts = {
      increaseThreshold: 20,
      sessionTimeout: _session2.default.DEFAULT_TIMEOUT,
      // timeZone: undefined,
      // maxScrollMetricIndex: undefined,
      fieldsObj: {}
      // hitFilter: undefined
    };

    this.opts = /** @type {MaxScrollTrackerOpts} */(0, _utilities.assign)(defaultOpts, opts);

    this.tracker = tracker;
    this.pagePath = this.getPagePath();

    // Binds methods to `this`.
    this.handleScroll = (0, _utilities.debounce)(this.handleScroll.bind(this), 500);
    this.trackerSetOverride = this.trackerSetOverride.bind(this);

    // Creates the store and binds storage change events.
    this.store = _store2.default.getOrCreate(tracker.get('trackingId'), 'plugins/max-scroll-tracker');

    // Creates the session and binds session events.
    this.session = _session2.default.getOrCreate(tracker, this.opts.sessionTimeout, this.opts.timeZone);

    // Override the built-in tracker.set method to watch for changes.
    _methodChain2.default.add(tracker, 'set', this.trackerSetOverride);

    this.listenForMaxScrollChanges();
  }

  /**
   * Adds a scroll event listener if the max scroll percentage for the
   * current page isn't already at 100%.
   */


  _createClass(MaxScrollTracker, [{
    key: 'listenForMaxScrollChanges',
    value: function listenForMaxScrollChanges() {
      var maxScrollPercentage = this.getMaxScrollPercentageForCurrentPage();
      if (maxScrollPercentage < 100) {
        window.addEventListener('scroll', this.handleScroll);
      }
    }

    /**
     * Removes an added scroll listener.
     */

  }, {
    key: 'stopListeningForMaxScrollChanges',
    value: function stopListeningForMaxScrollChanges() {
      window.removeEventListener('scroll', this.handleScroll);
    }

    /**
     * Handles the scroll event. If the current scroll percentage is greater
     * that the stored scroll event by at least the specified increase threshold,
     * send an event with the increase amount.
     */

  }, {
    key: 'handleScroll',
    value: function handleScroll() {
      var pageHeight = getPageHeight();
      var scrollPos = window.pageYOffset; // scrollY isn't supported in IE.
      var windowHeight = window.innerHeight;

      // Ensure scrollPercentage is an integer between 0 and 100.
      var scrollPercentage = Math.min(100, Math.max(0, Math.round(100 * (scrollPos / (pageHeight - windowHeight)))));

      // If the max scroll data gets out of the sync with the session data
      // (for whatever reason), clear it.
      var sessionId = this.session.getId();
      if (sessionId != this.store.get().sessionId) {
        this.store.clear();
        this.store.set({ sessionId: sessionId });
      }

      // If the session has expired, clear the stored data and don't send any
      // events (since they'd start a new session). Note: this check is needed,
      // in addition to the above check, to handle cases where the session IDs
      // got out of sync, but the session didn't expire.
      if (this.session.isExpired(this.store.get().sessionId)) {
        this.store.clear();
      } else {
        var maxScrollPercentage = this.getMaxScrollPercentageForCurrentPage();

        if (scrollPercentage > maxScrollPercentage) {
          if (scrollPercentage == 100 || maxScrollPercentage == 100) {
            this.stopListeningForMaxScrollChanges();
          }
          var increaseAmount = scrollPercentage - maxScrollPercentage;
          if (scrollPercentage == 100 || increaseAmount >= this.opts.increaseThreshold) {
            this.setMaxScrollPercentageForCurrentPage(scrollPercentage);
            this.sendMaxScrollEvent(increaseAmount, scrollPercentage);
          }
        }
      }
    }

    /**
     * Detects changes to the tracker object and triggers an update if the page
     * field has changed.
     * @param {function((Object|string), (string|undefined))} originalMethod
     *     A reference to the overridden method.
     * @return {function((Object|string), (string|undefined))}
     */

  }, {
    key: 'trackerSetOverride',
    value: function trackerSetOverride(originalMethod) {
      var _this = this;

      return function (field, value) {
        originalMethod(field, value);

        /** @type {!FieldsObj} */
        var fields = (0, _utilities.isObject)(field) ? field : _defineProperty({}, field, value);
        if (fields.page) {
          var lastPagePath = _this.pagePath;
          _this.pagePath = _this.getPagePath();

          if (_this.pagePath != lastPagePath) {
            // Since event listeners for the same function are never added twice,
            // we don't need to worry about whether we're already listening. We
            // can just add the event listener again.
            _this.listenForMaxScrollChanges();
          }
        }
      };
    }

    /**
     * Sends an event for the increased max scroll percentage amount.
     * @param {number} increaseAmount
     * @param {number} scrollPercentage
     */

  }, {
    key: 'sendMaxScrollEvent',
    value: function sendMaxScrollEvent(increaseAmount, scrollPercentage) {
      /** @type {FieldsObj} */
      var defaultFields = {
        transport: 'beacon',
        eventCategory: 'Max Scroll',
        eventAction: 'increase',
        eventValue: increaseAmount,
        eventLabel: String(scrollPercentage),
        nonInteraction: true
      };

      // If a custom metric was specified, set it equal to the event value.
      if (this.opts.maxScrollMetricIndex) {
        defaultFields['metric' + this.opts.maxScrollMetricIndex] = increaseAmount;
      }

      this.tracker.send('event', (0, _utilities.createFieldsObj)(defaultFields, this.opts.fieldsObj, this.tracker, this.opts.hitFilter));
    }

    /**
     * Stores the current max scroll percentage for the current page.
     * @param {number} maxScrollPercentage
     */

  }, {
    key: 'setMaxScrollPercentageForCurrentPage',
    value: function setMaxScrollPercentageForCurrentPage(maxScrollPercentage) {
      var _store$set;

      this.store.set((_store$set = {}, _defineProperty(_store$set, this.pagePath, maxScrollPercentage), _defineProperty(_store$set, 'sessionId', this.session.getId()), _store$set));
    }

    /**
     * Gets the stored max scroll percentage for the current page.
     * @return {number}
     */

  }, {
    key: 'getMaxScrollPercentageForCurrentPage',
    value: function getMaxScrollPercentageForCurrentPage() {
      return this.store.get()[this.pagePath] || 0;
    }

    /**
     * Gets the page path from the tracker object.
     * @return {number}
     */

  }, {
    key: 'getPagePath',
    value: function getPagePath() {
      var url = (0, _domUtils.parseUrl)(this.tracker.get('page') || this.tracker.get('location'));
      return url.pathname + url.search;
    }

    /**
     * Removes all event listeners and restores overridden methods.
     */

  }, {
    key: 'remove',
    value: function remove() {
      this.session.destroy();
      this.stopListeningForMaxScrollChanges();
      _methodChain2.default.remove(this.tracker, 'set', this.trackerSetOverride);
    }
  }]);

  return MaxScrollTracker;
}();

(0, _provide2.default)('maxScrollTracker', MaxScrollTracker);

/**
 * Gets the maximum height of the page including scrollable area.
 * @return {number}
 */
function getPageHeight() {
  var html = document.documentElement;
  var body = document.body;
  return Math.max(html.offsetHeight, html.scrollHeight, body.offsetHeight, body.scrollHeight);
}

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright 2016 Google Inc. All Rights Reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Licensed under the Apache License, Version 2.0 (the "License");
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * you may not use this file except in compliance with the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * You may obtain a copy of the License at
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *     http://www.apache.org/licenses/LICENSE-2.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Unless required by applicable law or agreed to in writing, software
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * distributed under the License is distributed on an "AS IS" BASIS,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * See the License for the specific language governing permissions and
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * limitations under the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _methodChain = __webpack_require__(4);

var _methodChain2 = _interopRequireDefault(_methodChain);

var _store = __webpack_require__(7);

var _store2 = _interopRequireDefault(_store);

var _utilities = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SECONDS = 1000;
var MINUTES = 60 * SECONDS;

var instances = {};

/**
 * A session management class that helps track session boundaries
 * across multiple open tabs/windows.
 */

var Session = function () {
  _createClass(Session, null, [{
    key: 'getOrCreate',

    /**
     * Gets an existing instance for the passed arguments or creates a new
     * instance if one doesn't exist.
     * @param {!Tracker} tracker An analytics.js tracker object.
     * @param {number} timeout The session timeout (in minutes). This value
     *     should match what's set in the "Session settings" section of the
     *     Google Analytics admin.
     * @param {string=} timeZone The optional IANA time zone of the view. This
     *     value should match what's set in the "View settings" section of the
     *     Google Analytics admin. (Note: this assumes all views for the property
     *     use the same time zone. If that's not true, it's better not to use
     *     this feature).
     * @return {Session} The Session instance.
     */
    value: function getOrCreate(tracker, timeout, timeZone) {
      // Don't create multiple instances for the same property.
      var trackingId = tracker.get('trackingId');
      if (instances[trackingId]) {
        return instances[trackingId];
      } else {
        return instances[trackingId] = new Session(tracker, timeout, timeZone);
      }
    }

    /**
     * @param {!Tracker} tracker An analytics.js tracker object.
     * @param {number} timeout The session timeout (in minutes). This value
     *     should match what's set in the "Session settings" section of the
     *     Google Analytics admin.
     * @param {string=} timeZone The optional IANA time zone of the view. This
     *     value should match what's set in the "View settings" section of the
     *     Google Analytics admin. (Note: this assumes all views for the property
     *     use the same time zone. If that's not true, it's better not to use
     *     this feature).
     */

  }]);

  function Session(tracker, timeout, timeZone) {
    _classCallCheck(this, Session);

    this.tracker = tracker;
    this.timeout = timeout || Session.DEFAULT_TIMEOUT;
    this.timeZone = timeZone;

    // Binds methods.
    this.sendHitTaskOverride = this.sendHitTaskOverride.bind(this);

    // Overrides into the trackers sendHitTask method.
    _methodChain2.default.add(tracker, 'sendHitTask', this.sendHitTaskOverride);

    // Some browser doesn't support various features of the
    // `Intl.DateTimeFormat` API, so we have to try/catch it. Consequently,
    // this allows us to assume the presence of `this.dateTimeFormatter` means
    // it works in the current browser.
    try {
      this.dateTimeFormatter = new Intl.DateTimeFormat('en-US', { timeZone: this.timeZone });
    } catch (err) {}
    // Do nothing.


    /** @type {SessionStoreData} */
    var defaultProps = {
      hitTime: 0,
      isExpired: false
    };
    this.store = _store2.default.getOrCreate(tracker.get('trackingId'), 'session', defaultProps);

    // Ensure the session has an ID.
    if (!this.store.get().id) {
      this.store.set( /** @type {SessionStoreData} */{ id: (0, _utilities.uuid)() });
    }
  }

  /**
   * Returns the ID of the current session.
   * @return {string}
   */


  _createClass(Session, [{
    key: 'getId',
    value: function getId() {
      return this.store.get().id;
    }

    /**
     * Accepts a session ID and returns true if the specified session has
     * evidentially expired. A session can expire for two reasons:
     *   - More than 30 minutes has elapsed since the previous hit
     *     was sent (The 30 minutes number is the Google Analytics default, but
     *     it can be modified in GA admin "Session settings").
     *   - A new day has started since the previous hit, in the
     *     specified time zone (should correspond to the time zone of the
     *     property's views).
     *
     * Note: since real session boundaries are determined at processing time,
     * this is just a best guess rather than a source of truth.
     *
     * @param {string} id The ID of a session to check for expiry.
     * @return {boolean} True if the session has not exp
     */

  }, {
    key: 'isExpired',
    value: function isExpired() {
      var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.getId();

      // If a session ID is passed and it doesn't match the current ID,
      // assume it's from an expired session. If no ID is passed, assume the ID
      // of the current session.
      if (id != this.getId()) return true;

      /** @type {SessionStoreData} */
      var sessionData = this.store.get();

      // `isExpired` will be `true` if the sessionControl field was set to
      // 'end' on the previous hit.
      if (sessionData.isExpired) return true;

      var oldHitTime = sessionData.hitTime;

      // Only consider a session expired if previous hit time data exists, and
      // the previous hit time is greater than that session timeout period or
      // the hits occurred on different days in the session timezone.
      if (oldHitTime) {
        var currentDate = new Date();
        var oldHitDate = new Date(oldHitTime);
        if (currentDate - oldHitDate > this.timeout * MINUTES || this.datesAreDifferentInTimezone(currentDate, oldHitDate)) {
          return true;
        }
      }

      // For all other cases return false.
      return false;
    }

    /**
     * Returns true if (and only if) the timezone date formatting is supported
     * in the current browser and if the two dates are definitively not the
     * same date in the session timezone. Anything short of this returns false.
     * @param {!Date} d1
     * @param {!Date} d2
     * @return {boolean}
     */

  }, {
    key: 'datesAreDifferentInTimezone',
    value: function datesAreDifferentInTimezone(d1, d2) {
      if (!this.dateTimeFormatter) {
        return false;
      } else {
        return this.dateTimeFormatter.format(d1) != this.dateTimeFormatter.format(d2);
      }
    }

    /**
     * Keeps track of when the previous hit was sent to determine if a session
     * has expired. Also inspects the `sessionControl` field to handles
     * expiration accordingly.
     * @param {function(!Model)} originalMethod A reference to the overridden
     *     method.
     * @return {function(!Model)}
     */

  }, {
    key: 'sendHitTaskOverride',
    value: function sendHitTaskOverride(originalMethod) {
      var _this = this;

      return function (model) {
        originalMethod(model);

        var sessionControl = model.get('sessionControl');
        var sessionWillStart = sessionControl == 'start' || _this.isExpired();
        var sessionWillEnd = sessionControl == 'end';

        /** @type {SessionStoreData} */
        var sessionData = _this.store.get();
        sessionData.hitTime = (0, _utilities.now)();
        if (sessionWillStart) {
          sessionData.isExpired = false;
          sessionData.id = (0, _utilities.uuid)();
        }
        if (sessionWillEnd) {
          sessionData.isExpired = true;
        }
        _this.store.set(sessionData);
      };
    }

    /**
     * Restores the tracker's original `sendHitTask` to the state before
     * session control was initialized and removes this instance from the global
     * store.
     */

  }, {
    key: 'destroy',
    value: function destroy() {
      _methodChain2.default.remove(this.tracker, 'sendHitTask', this.sendHitTaskOverride);
      this.store.destroy();
      delete instances[this.tracker.get('trackingId')];
    }
  }]);

  return Session;
}();

exports.default = Session;


Session.DEFAULT_TIMEOUT = 30; // minutes

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright 2016 Google Inc. All Rights Reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Licensed under the Apache License, Version 2.0 (the "License");
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * you may not use this file except in compliance with the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * You may obtain a copy of the License at
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *     http://www.apache.org/licenses/LICENSE-2.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Unless required by applicable law or agreed to in writing, software
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * distributed under the License is distributed on an "AS IS" BASIS,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * See the License for the specific language governing permissions and
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * limitations under the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _domUtils = __webpack_require__(2);

var _provide = __webpack_require__(1);

var _provide2 = _interopRequireDefault(_provide);

var _usage = __webpack_require__(3);

var _utilities = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Class for the `outboundFormTracker` analytics.js plugin.
 * @implements {OutboundFormTrackerPublicInterface}
 */
var OutboundFormTracker = function () {
  /**
   * Registers outbound form tracking.
   * @param {!Tracker} tracker Passed internally by analytics.js
   * @param {?Object} opts Passed by the require command.
   */
  function OutboundFormTracker(tracker, opts) {
    _classCallCheck(this, OutboundFormTracker);

    (0, _usage.trackUsage)(tracker, _usage.plugins.OUTBOUND_FORM_TRACKER);

    // Feature detects to prevent errors in unsupporting browsers.
    if (!window.addEventListener) return;

    /** @type {OutboundFormTrackerOpts} */
    var defaultOpts = {
      formSelector: 'form',
      shouldTrackOutboundForm: this.shouldTrackOutboundForm,
      fieldsObj: {},
      attributePrefix: 'ga-'
      // hitFilter: undefined
    };

    this.opts = /** @type {OutboundFormTrackerOpts} */(0, _utilities.assign)(defaultOpts, opts);

    this.tracker = tracker;

    this.delegate = (0, _domUtils.delegate)(document, 'submit', this.opts.formSelector, this.handleFormSubmits.bind(this), { composed: true, useCapture: true });
  }

  /**
   * Handles all submits on form elements. A form submit is considered outbound
   * if its action attribute starts with http and does not contain
   * location.hostname.
   * When the beacon transport method is not available, the event's default
   * action is prevented and re-emitted after the hit is sent.
   * @param {Event} event The DOM submit event.
   * @param {Element} form The delegated event target.
   */


  _createClass(OutboundFormTracker, [{
    key: 'handleFormSubmits',
    value: function handleFormSubmits(event, form) {
      var action = (0, _domUtils.parseUrl)(form.action).href;

      /** @type {FieldsObj} */
      var defaultFields = {
        transport: 'beacon',
        eventCategory: 'Outbound Form',
        eventAction: 'submit',
        eventLabel: action
      };

      if (this.opts.shouldTrackOutboundForm(form, _domUtils.parseUrl)) {
        if (!navigator.sendBeacon) {
          // Stops the submit and waits until the hit is complete (with timeout)
          // for browsers that don't support beacon.
          event.preventDefault();
          defaultFields.hitCallback = (0, _utilities.withTimeout)(function () {
            form.submit();
          });
        }

        var userFields = (0, _utilities.assign)({}, this.opts.fieldsObj, (0, _utilities.getAttributeFields)(form, this.opts.attributePrefix));

        this.tracker.send('event', (0, _utilities.createFieldsObj)(defaultFields, userFields, this.tracker, this.opts.hitFilter, form, event));
      }
    }

    /**
     * Determines whether or not the tracker should send a hit when a form is
     * submitted. By default, forms with an action attribute that starts with
     * "http" and doesn't contain the current hostname are tracked.
     * @param {Element} form The form that was submitted.
     * @param {Function} parseUrlFn A cross-browser utility method for url
     *     parsing (note: renamed to disambiguate when compiling).
     * @return {boolean} Whether or not the form should be tracked.
     */

  }, {
    key: 'shouldTrackOutboundForm',
    value: function shouldTrackOutboundForm(form, parseUrlFn) {
      var url = parseUrlFn(form.action);
      return url.hostname != location.hostname && url.protocol.slice(0, 4) == 'http';
    }

    /**
     * Removes all event listeners and instance properties.
     */

  }, {
    key: 'remove',
    value: function remove() {
      this.delegate.destroy();
    }
  }]);

  return OutboundFormTracker;
}();

(0, _provide2.default)('outboundFormTracker', OutboundFormTracker);

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright 2016 Google Inc. All Rights Reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Licensed under the Apache License, Version 2.0 (the "License");
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * you may not use this file except in compliance with the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * You may obtain a copy of the License at
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *     http://www.apache.org/licenses/LICENSE-2.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Unless required by applicable law or agreed to in writing, software
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * distributed under the License is distributed on an "AS IS" BASIS,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * See the License for the specific language governing permissions and
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * limitations under the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _domUtils = __webpack_require__(2);

var _provide = __webpack_require__(1);

var _provide2 = _interopRequireDefault(_provide);

var _usage = __webpack_require__(3);

var _utilities = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Class for the `outboundLinkTracker` analytics.js plugin.
 * @implements {OutboundLinkTrackerPublicInterface}
 */
var OutboundLinkTracker = function () {
  /**
   * Registers outbound link tracking on a tracker object.
   * @param {!Tracker} tracker Passed internally by analytics.js
   * @param {?Object} opts Passed by the require command.
   */
  function OutboundLinkTracker(tracker, opts) {
    var _this = this;

    _classCallCheck(this, OutboundLinkTracker);

    (0, _usage.trackUsage)(tracker, _usage.plugins.OUTBOUND_LINK_TRACKER);

    // Feature detects to prevent errors in unsupporting browsers.
    if (!window.addEventListener) return;

    /** @type {OutboundLinkTrackerOpts} */
    var defaultOpts = {
      events: ['click'],
      linkSelector: 'a, area',
      shouldTrackOutboundLink: this.shouldTrackOutboundLink,
      fieldsObj: {},
      attributePrefix: 'ga-'
      // hitFilter: undefined,
    };

    this.opts = /** @type {OutboundLinkTrackerOpts} */(0, _utilities.assign)(defaultOpts, opts);

    this.tracker = tracker;

    // Binds methods.
    this.handleLinkInteractions = this.handleLinkInteractions.bind(this);

    // Creates a mapping of events to their delegates
    this.delegates = {};
    this.opts.events.forEach(function (event) {
      _this.delegates[event] = (0, _domUtils.delegate)(document, event, _this.opts.linkSelector, _this.handleLinkInteractions, { composed: true, useCapture: true });
    });
  }

  /**
   * Handles all interactions on link elements. A link is considered an outbound
   * link if its hostname property does not match location.hostname. When the
   * beacon transport method is not available, the links target is set to
   * "_blank" to ensure the hit can be sent.
   * @param {Event} event The DOM click event.
   * @param {Element} link The delegated event target.
   */


  _createClass(OutboundLinkTracker, [{
    key: 'handleLinkInteractions',
    value: function handleLinkInteractions(event, link) {
      var _this2 = this;

      if (this.opts.shouldTrackOutboundLink(link, _domUtils.parseUrl)) {
        var href = link.getAttribute('href') || link.getAttribute('xlink:href');
        var url = (0, _domUtils.parseUrl)(href);

        /** @type {FieldsObj} */
        var defaultFields = {
          transport: 'beacon',
          eventCategory: 'Outbound Link',
          eventAction: event.type,
          eventLabel: url.href
        };

        /** @type {FieldsObj} */
        var userFields = (0, _utilities.assign)({}, this.opts.fieldsObj, (0, _utilities.getAttributeFields)(link, this.opts.attributePrefix));

        var fieldsObj = (0, _utilities.createFieldsObj)(defaultFields, userFields, this.tracker, this.opts.hitFilter, link, event);

        if (!navigator.sendBeacon && linkClickWillUnloadCurrentPage(event, link)) {
          // Adds a new event handler at the last minute to minimize the chances
          // that another event handler for this click will run after this logic.
          var clickHandler = function clickHandler() {
            window.removeEventListener('click', clickHandler);

            // Checks to make sure another event handler hasn't already prevented
            // the default action. If it has the custom redirect isn't needed.
            if (!event.defaultPrevented) {
              // Stops the click and waits until the hit is complete (with
              // timeout) for browsers that don't support beacon.
              event.preventDefault();

              var oldHitCallback = fieldsObj.hitCallback;
              fieldsObj.hitCallback = (0, _utilities.withTimeout)(function () {
                if (typeof oldHitCallback == 'function') oldHitCallback();
                location.href = href;
              });
            }
            _this2.tracker.send('event', fieldsObj);
          };
          window.addEventListener('click', clickHandler);
        } else {
          this.tracker.send('event', fieldsObj);
        }
      }
    }

    /**
     * Determines whether or not the tracker should send a hit when a link is
     * clicked. By default links with a hostname property not equal to the current
     * hostname are tracked.
     * @param {Element} link The link that was clicked on.
     * @param {Function} parseUrlFn A cross-browser utility method for url
     *     parsing (note: renamed to disambiguate when compiling).
     * @return {boolean} Whether or not the link should be tracked.
     */

  }, {
    key: 'shouldTrackOutboundLink',
    value: function shouldTrackOutboundLink(link, parseUrlFn) {
      var href = link.getAttribute('href') || link.getAttribute('xlink:href');
      var url = parseUrlFn(href);
      return url.hostname != location.hostname && url.protocol.slice(0, 4) == 'http';
    }

    /**
     * Removes all event listeners and instance properties.
     */

  }, {
    key: 'remove',
    value: function remove() {
      var _this3 = this;

      Object.keys(this.delegates).forEach(function (key) {
        _this3.delegates[key].destroy();
      });
    }
  }]);

  return OutboundLinkTracker;
}();

(0, _provide2.default)('outboundLinkTracker', OutboundLinkTracker);

/**
 * Determines if a link click event will cause the current page to upload.
 * Note: most link clicks *will* cause the current page to unload because they
 * initiate a page navigation. The most common reason a link click won't cause
 * the page to unload is if the clicked was to open the link in a new tab.
 * @param {Event} event The DOM event.
 * @param {Element} link The link element clicked on.
 * @return {boolean} True if the current page will be unloaded.
 */
function linkClickWillUnloadCurrentPage(event, link) {
  return !(
  // The event type can be customized; we only care about clicks here.
  event.type != 'click' ||
  // Links with target="_blank" set will open in a new window/tab.
  link.target == '_blank' ||
  // On mac, command clicking will open a link in a new tab. Control
  // clicking does this on windows.
  event.metaKey || event.ctrlKey ||
  // Shift clicking in Chrome/Firefox opens the link in a new window
  // In Safari it adds the URL to a favorites list.
  event.shiftKey ||
  // On Mac, clicking with the option key is used to download a resouce.
  event.altKey ||
  // Middle mouse button clicks (which == 2) are used to open a link
  // in a new tab, and right clicks (which == 3) on Firefox trigger
  // a click event.
  event.which > 1);
}

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(15);
__webpack_require__(24);
module.exports = __webpack_require__(35);


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(16);

__webpack_require__(21);

__webpack_require__(22);

__webpack_require__(23);

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _provide = __webpack_require__(1);

var _provide2 = _interopRequireDefault(_provide);

var _domUtils = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TrackThisOpenExternalInTab = function TrackThisOpenExternalInTab() {
  _classCallCheck(this, TrackThisOpenExternalInTab);

  var links = document.querySelectorAll('a[href]');
  links.forEach(function (link) {
    var linkUrl = (0, _domUtils.parseUrl)(link.getAttribute('href'));
    if (linkUrl.host !== location.host) {
      link.setAttribute('rel', 'external');
      link.setAttribute('target', '_blank');
    }
  });
};

(0, _provide2.default)('trackThisOpenExternalInTab', TrackThisOpenExternalInTab);

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = delegate;

var _closest = __webpack_require__(8);

var _closest2 = _interopRequireDefault(_closest);

var _matches = __webpack_require__(6);

var _matches2 = _interopRequireDefault(_matches);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Delegates the handling of events for an element matching a selector to an
 * ancestor of the matching element.
 * @param {!Node} ancestor The ancestor element to add the listener to.
 * @param {string} eventType The event type to listen to.
 * @param {string} selector A CSS selector to match against child elements.
 * @param {!Function} callback A function to run any time the event happens.
 * @param {Object=} opts A configuration options object. The available options:
 *     - useCapture<boolean>: If true, bind to the event capture phase.
 *     - deep<boolean>: If true, delegate into shadow trees.
 * @return {Object} The delegate object. It contains a destroy method.
 */
function delegate(ancestor, eventType, selector, callback) {
  var opts = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};

  // Defines the event listener.
  var listener = function listener(event) {
    var delegateTarget = void 0;

    // If opts.composed is true and the event originated from inside a Shadow
    // tree, check the composed path nodes.
    if (opts.composed && typeof event.composedPath == 'function') {
      var composedPath = event.composedPath();
      for (var i = 0, node; node = composedPath[i]; i++) {
        if (node.nodeType == 1 && (0, _matches2.default)(node, selector)) {
          delegateTarget = node;
        }
      }
    } else {
      // Otherwise check the parents.
      delegateTarget = (0, _closest2.default)(event.target, selector, true);
    }

    if (delegateTarget) {
      callback.call(delegateTarget, event, delegateTarget);
    }
  };

  ancestor.addEventListener(eventType, listener, opts.useCapture);

  return {
    destroy: function destroy() {
      ancestor.removeEventListener(eventType, listener, opts.useCapture);
    }
  };
}

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = dispatch;
/**
 * Dispatches an event on the passed element.
 * @param {!Element} element The DOM element to dispatch the event on.
 * @param {string} eventType The type of event to dispatch.
 * @param {Object|string=} eventName A string name of the event constructor
 *     to use. Defaults to 'Event' if nothing is passed or 'CustomEvent' if
 *     a value is set on `initDict.detail`. If eventName is given an object
 *     it is assumed to be initDict and thus reassigned.
 * @param {Object=} initDict The initialization attributes for the
 *     event. A `detail` property can be used here to pass custom data.
 * @return {boolean} The return value of `element.dispatchEvent`, which will
 *     be false if any of the event listeners called `preventDefault`.
 */
function dispatch(element, eventType) {
  var eventName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'Event';
  var initDict = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  var event = void 0;
  var isCustom = void 0;

  // eventName is optional
  if ((typeof eventName === 'undefined' ? 'undefined' : _typeof(eventName)) == 'object') {
    initDict = eventName;
    eventName = 'Event';
  }

  initDict.bubbles = initDict.bubbles || false;
  initDict.cancelable = initDict.cancelable || false;
  initDict.composed = initDict.composed || false;

  // If a detail property is passed, this is a custom event.
  if ('detail' in initDict) isCustom = true;
  eventName = isCustom ? 'CustomEvent' : eventName;

  // Tries to create the event using constructors, if that doesn't work,
  // fallback to `document.createEvent()`.
  try {
    event = new window[eventName](eventType, initDict);
  } catch (err) {
    event = document.createEvent(eventName);
    var initMethod = 'init' + (isCustom ? 'Custom' : '') + 'Event';
    event[initMethod](eventType, initDict.bubbles, initDict.cancelable, initDict.detail);
  }

  return element.dispatchEvent(event);
}

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getAttributes;
/**
 * Gets all attributes of an element as a plain JavaScriot object.
 * @param {Element} element The element whose attributes to get.
 * @return {!Object} An object whose keys are the attribute keys and whose
 *     values are the attribute values. If no attributes exist, an empty
 *     object is returned.
 */
function getAttributes(element) {
  var attrs = {};

  // Validate input.
  if (!(element && element.nodeType == 1)) return attrs;

  // Return an empty object if there are no attributes.
  var map = element.attributes;
  if (map.length === 0) return {};

  for (var i = 0, attr; attr = map[i]; i++) {
    attrs[attr.name] = attr.value;
  }
  return attrs;
}

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parseUrl;
var HTTP_PORT = '80';
var HTTPS_PORT = '443';
var DEFAULT_PORT = RegExp(':(' + HTTP_PORT + '|' + HTTPS_PORT + ')$');

var a = document.createElement('a');
var cache = {};

/**
 * Parses the given url and returns an object mimicing a `Location` object.
 * @param {string} url The url to parse.
 * @return {!Object} An object with the same properties as a `Location`.
 */
function parseUrl(url) {
  // All falsy values (as well as ".") should map to the current URL.
  url = !url || url == '.' ? location.href : url;

  if (cache[url]) return cache[url];

  a.href = url;

  // When parsing file relative paths (e.g. `../index.html`), IE will correctly
  // resolve the `href` property but will keep the `..` in the `path` property.
  // It will also not include the `host` or `hostname` properties. Furthermore,
  // IE will sometimes return no protocol or just a colon, especially for things
  // like relative protocol URLs (e.g. "//google.com").
  // To workaround all of these issues, we reparse with the full URL from the
  // `href` property.
  if (url.charAt(0) == '.' || url.charAt(0) == '/') return parseUrl(a.href);

  // Don't include default ports.
  var port = a.port == HTTP_PORT || a.port == HTTPS_PORT ? '' : a.port;

  // PhantomJS sets the port to "0" when using the file: protocol.
  port = port == '0' ? '' : port;

  // Sometimes IE incorrectly includes a port for default ports
  // (e.g. `:80` or `:443`) even when no port is specified in the URL.
  // http://bit.ly/1rQNoMg
  var host = a.host.replace(DEFAULT_PORT, '');

  // Not all browser support `origin` so we have to build it.
  var origin = a.origin ? a.origin : a.protocol + '//' + host;

  // Sometimes IE doesn't include the leading slash for pathname.
  // http://bit.ly/1rQNoMg
  var pathname = a.pathname.charAt(0) == '/' ? a.pathname : '/' + a.pathname;

  return cache[url] = {
    hash: a.hash,
    host: host,
    hostname: a.hostname,
    href: a.href,
    origin: origin,
    pathname: pathname,
    port: port,
    protocol: a.protocol,
    search: a.search
  };
}

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _provide = __webpack_require__(1);

var _provide2 = _interopRequireDefault(_provide);

var _utilities = __webpack_require__(0);

var _domUtils = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TrackThisFileDownload = function () {
  function TrackThisFileDownload(tracker) {
    var _this = this;

    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, TrackThisFileDownload);

    this.tracker = tracker;
    var defaultOptions = {
      extensions: ['pdf', 'zip', '7zip', 'doc', 'docx']
    };
    this.options = (0, _utilities.assign)({}, defaultOptions, options);
    this.handleLinkInteractions = this.handleLinkInteractions.bind(this);
    this.delegates = {};

    this.options.extensions.forEach(function (extension) {
      var selector = 'a[href$=".' + extension + '"]';
      _this.delegates[extension] = (0, _domUtils.delegate)(document, 'click', selector, _this.handleLinkInteractions, {
        composed: true,
        useCapture: true
      });
    });
  }

  _createClass(TrackThisFileDownload, [{
    key: 'handleLinkInteractions',
    value: function handleLinkInteractions(event, link) {
      var linkUrl = (0, _domUtils.parseUrl)(link.getAttribute('href'));
      var eventOptions = {
        eventCategory: 'File download',
        eventAction: 'click',
        eventLabel: linkUrl.href,
        transport: 'beacon'
      };
      this.tracker.send('event', eventOptions);
    }
  }]);

  return TrackThisFileDownload;
}();

(0, _provide2.default)('trackThisFileDownload', TrackThisFileDownload);

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _provide = __webpack_require__(1);

var _provide2 = _interopRequireDefault(_provide);

var _utilities = __webpack_require__(0);

var _domUtils = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TrackThisLinkProtocol = function () {
  function TrackThisLinkProtocol(tracker) {
    var _this = this;

    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, TrackThisLinkProtocol);

    this.tracker = tracker;
    var defaultOptions = {
      protocols: {
        'mailto:': {
          category: 'Mail send'
        },
        'tel:': {
          category: 'Phone number'
        }
      }
    };
    this.options = (0, _utilities.assign)({}, defaultOptions, options);
    this.handleLinkInteractions = this.handleLinkInteractions.bind(this);
    this.delegates = {};

    Object.keys(this.options.protocols).forEach(function (protocol) {
      var selector = 'a[href^="' + protocol + '"]';
      console.log(selector);
      _this.delegates[protocol] = (0, _domUtils.delegate)(document, 'click', selector, _this.handleLinkInteractions, {
        composed: true,
        useCapture: true
      });
    });
  }

  _createClass(TrackThisLinkProtocol, [{
    key: 'handleLinkInteractions',
    value: function handleLinkInteractions(event, link) {
      var linkUrl = (0, _domUtils.parseUrl)(link.getAttribute('href'));
      var eventOptions = {
        eventCategory: this.options.protocols[linkUrl.protocol].category,
        eventAction: 'click',
        eventLabel: linkUrl.href,
        transport: 'beacon'
      };
      this.tracker.send('event', eventOptions);
    }
  }]);

  return TrackThisLinkProtocol;
}();

(0, _provide2.default)('trackThisLinkProtocol', TrackThisLinkProtocol);

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _provide = __webpack_require__(1);

var _provide2 = _interopRequireDefault(_provide);

var _domUtils = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TrackThisIntraPageLink = function () {
  function TrackThisIntraPageLink(tracker) {
    _classCallCheck(this, TrackThisIntraPageLink);

    this.tracker = tracker;
    this.handleLinkInteractions = this.handleLinkInteractions.bind(this);
    this.delegates = (0, _domUtils.delegate)(document, 'click', 'a', this.handleLinkInteractions, {
      composed: true,
      useCapture: true
    });
  }

  _createClass(TrackThisIntraPageLink, [{
    key: 'handleLinkInteractions',
    value: function handleLinkInteractions(event, link) {
      var linkUrl = (0, _domUtils.parseUrl)(link.getAttribute('href'));
      if (linkUrl.hostname === location.hostname && linkUrl.pathname === location.pathname && linkUrl.hash !== location.hash) {
        this.tracker.send('event', {
          eventCategory: 'Intra-Page Link',
          eventAction: 'click',
          eventLabel: linkUrl.href
        });
      }
    }
  }]);

  return TrackThisIntraPageLink;
}();

(0, _provide2.default)('trackThisIntraPageLink', TrackThisIntraPageLink);

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(25);

__webpack_require__(13);

__webpack_require__(12);

__webpack_require__(10);

__webpack_require__(34);

ga('require', 'outboundLinkTracker');
ga('require', 'outboundFormTracker');
ga('require', 'maxScrollTracker');
ga('require', 'trackThisIntraPageLink');
ga('require', 'trackThisLinkProtocol');
ga('require', 'trackThisFileDownload');
ga('require', 'trackThisOpenExternalInTab');

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(26);

__webpack_require__(27);

__webpack_require__(28);

__webpack_require__(10);

__webpack_require__(30);

__webpack_require__(12);

__webpack_require__(13);

__webpack_require__(31);

__webpack_require__(32);

__webpack_require__(33);

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright 2016 Google Inc. All Rights Reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Licensed under the Apache License, Version 2.0 (the "License");
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * you may not use this file except in compliance with the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * You may obtain a copy of the License at
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *     http://www.apache.org/licenses/LICENSE-2.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Unless required by applicable law or agreed to in writing, software
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * distributed under the License is distributed on an "AS IS" BASIS,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * See the License for the specific language governing permissions and
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * limitations under the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _domUtils = __webpack_require__(2);

var _constants = __webpack_require__(5);

var _methodChain = __webpack_require__(4);

var _methodChain2 = _interopRequireDefault(_methodChain);

var _provide = __webpack_require__(1);

var _provide2 = _interopRequireDefault(_provide);

var _usage = __webpack_require__(3);

var _utilities = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Class for the `cleanUrlTracker` analytics.js plugin.
 * @implements {CleanUrlTrackerPublicInterface}
 */
var CleanUrlTracker = function () {
  /**
   * Registers clean URL tracking on a tracker object. The clean URL tracker
   * removes query parameters from the page value reported to Google Analytics.
   * It also helps to prevent tracking similar URLs, e.g. sometimes ending a
   * URL with a slash and sometimes not.
   * @param {!Tracker} tracker Passed internally by analytics.js
   * @param {?CleanUrlTrackerOpts} opts Passed by the require command.
   */
  function CleanUrlTracker(tracker, opts) {
    _classCallCheck(this, CleanUrlTracker);

    (0, _usage.trackUsage)(tracker, _usage.plugins.CLEAN_URL_TRACKER);

    /** @type {CleanUrlTrackerOpts} */
    var defaultOpts = {
      // stripQuery: undefined,
      // queryParamsWhitelist: undefined,
      // queryDimensionIndex: undefined,
      // indexFilename: undefined,
      // trailingSlash: undefined,
      // urlFilter: undefined,
    };
    this.opts = /** @type {CleanUrlTrackerOpts} */(0, _utilities.assign)(defaultOpts, opts);

    this.tracker = tracker;

    /** @type {string|null} */
    this.queryDimension = this.opts.stripQuery && this.opts.queryDimensionIndex ? 'dimension' + this.opts.queryDimensionIndex : null;

    // Binds methods to `this`.
    this.trackerGetOverride = this.trackerGetOverride.bind(this);
    this.buildHitTaskOverride = this.buildHitTaskOverride.bind(this);

    // Override built-in tracker method to watch for changes.
    _methodChain2.default.add(tracker, 'get', this.trackerGetOverride);
    _methodChain2.default.add(tracker, 'buildHitTask', this.buildHitTaskOverride);
  }

  /**
   * Ensures reads of the tracker object by other plugins always see the
   * "cleaned" versions of all URL fields.
   * @param {function(string):*} originalMethod A reference to the overridden
   *     method.
   * @return {function(string):*}
   */


  _createClass(CleanUrlTracker, [{
    key: 'trackerGetOverride',
    value: function trackerGetOverride(originalMethod) {
      var _this = this;

      return function (field) {
        if (field == 'page' || field == _this.queryDimension) {
          var fieldsObj = /** @type {!FieldsObj} */{
            location: originalMethod('location'),
            page: originalMethod('page')
          };
          var cleanedFieldsObj = _this.cleanUrlFields(fieldsObj);
          return cleanedFieldsObj[field];
        } else {
          return originalMethod(field);
        }
      };
    }

    /**
     * Cleans URL fields passed in a send command.
     * @param {function(!Model)} originalMethod A reference to the
     *     overridden method.
     * @return {function(!Model)}
     */

  }, {
    key: 'buildHitTaskOverride',
    value: function buildHitTaskOverride(originalMethod) {
      var _this2 = this;

      return function (model) {
        var cleanedFieldsObj = _this2.cleanUrlFields({
          location: model.get('location'),
          page: model.get('page')
        });
        model.set(cleanedFieldsObj, null, true);
        originalMethod(model);
      };
    }

    /**
     * Accepts of fields object containing URL fields and returns a new
     * fields object with the URLs "cleaned" according to the tracker options.
     * @param {!FieldsObj} fieldsObj
     * @return {!FieldsObj}
     */

  }, {
    key: 'cleanUrlFields',
    value: function cleanUrlFields(fieldsObj) {
      var url = (0, _domUtils.parseUrl)(
      /** @type {string} */fieldsObj.page || fieldsObj.location);

      var pathname = url.pathname;

      // If an index filename was provided, remove it if it appears at the end
      // of the URL.
      if (this.opts.indexFilename) {
        var parts = pathname.split('/');
        if (this.opts.indexFilename == parts[parts.length - 1]) {
          parts[parts.length - 1] = '';
          pathname = parts.join('/');
        }
      }

      // Ensure the URL ends with or doesn't end with slash based on the
      // `trailingSlash` option. Note that filename URLs should never contain
      // a trailing slash.
      if (this.opts.trailingSlash == 'remove') {
        pathname = pathname.replace(/\/+$/, '');
      } else if (this.opts.trailingSlash == 'add') {
        var isFilename = /\.\w+$/.test(pathname);
        if (!isFilename && pathname.substr(-1) != '/') {
          pathname = pathname + '/';
        }
      }

      /** @type {!FieldsObj} */
      var cleanedFieldsObj = {
        page: pathname + (this.opts.stripQuery ? this.stripNonWhitelistedQueryParams(url.search) : url.search)
      };
      if (fieldsObj.location) {
        cleanedFieldsObj.location = fieldsObj.location;
      }
      if (this.queryDimension) {
        cleanedFieldsObj[this.queryDimension] = url.search.slice(1) || _constants.NULL_DIMENSION;
      }

      // Apply the `urlFieldsFilter()` option if passed.
      if (typeof this.opts.urlFieldsFilter == 'function') {
        /** @type {!FieldsObj} */
        var userCleanedFieldsObj = this.opts.urlFieldsFilter(cleanedFieldsObj, _domUtils.parseUrl);

        // Ensure only the URL fields are returned.
        var returnValue = {
          page: userCleanedFieldsObj.page,
          location: userCleanedFieldsObj.location
        };
        if (this.queryDimension) {
          returnValue[this.queryDimension] = userCleanedFieldsObj[this.queryDimension];
        }
        return returnValue;
      } else {
        return cleanedFieldsObj;
      }
    }

    /**
     * Accpets a raw URL search string and returns a new search string containing
     * only the site search params (if they exist).
     * @param {string} searchString The URL search string (starting with '?').
     * @return {string} The query string
     */

  }, {
    key: 'stripNonWhitelistedQueryParams',
    value: function stripNonWhitelistedQueryParams(searchString) {
      var _this3 = this;

      if (Array.isArray(this.opts.queryParamsWhitelist)) {
        var foundParams = [];
        searchString.slice(1).split('&').forEach(function (kv) {
          var _kv$split = kv.split('='),
              _kv$split2 = _slicedToArray(_kv$split, 2),
              key = _kv$split2[0],
              value = _kv$split2[1];

          if (_this3.opts.queryParamsWhitelist.indexOf(key) > -1 && value) {
            foundParams.push([key, value]);
          }
        });

        return foundParams.length ? '?' + foundParams.map(function (kv) {
          return kv.join('=');
        }).join('&') : '';
      } else {
        return '';
      }
    }

    /**
     * Restores all overridden tasks and methods.
     */

  }, {
    key: 'remove',
    value: function remove() {
      _methodChain2.default.remove(this.tracker, 'get', this.trackerGetOverride);
      _methodChain2.default.remove(this.tracker, 'buildHitTask', this.buildHitTaskOverride);
    }
  }]);

  return CleanUrlTracker;
}();

(0, _provide2.default)('cleanUrlTracker', CleanUrlTracker);

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright 2016 Google Inc. All Rights Reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Licensed under the Apache License, Version 2.0 (the "License");
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * you may not use this file except in compliance with the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * You may obtain a copy of the License at
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *     http://www.apache.org/licenses/LICENSE-2.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Unless required by applicable law or agreed to in writing, software
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * distributed under the License is distributed on an "AS IS" BASIS,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * See the License for the specific language governing permissions and
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * limitations under the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _domUtils = __webpack_require__(2);

var _provide = __webpack_require__(1);

var _provide2 = _interopRequireDefault(_provide);

var _usage = __webpack_require__(3);

var _utilities = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Class for the `eventTracker` analytics.js plugin.
 * @implements {EventTrackerPublicInterface}
 */
var EventTracker = function () {
  /**
   * Registers declarative event tracking.
   * @param {!Tracker} tracker Passed internally by analytics.js
   * @param {?EventTrackerOpts} opts Passed by the require command.
   */
  function EventTracker(tracker, opts) {
    var _this = this;

    _classCallCheck(this, EventTracker);

    (0, _usage.trackUsage)(tracker, _usage.plugins.EVENT_TRACKER);

    // Feature detects to prevent errors in unsupporting browsers.
    if (!window.addEventListener) return;

    /** @type {EventTrackerOpts} */
    var defaultOpts = {
      events: ['click'],
      fieldsObj: {},
      attributePrefix: 'ga-'
      // hitFilter: undefined,
    };

    this.opts = /** @type {EventTrackerOpts} */(0, _utilities.assign)(defaultOpts, opts);

    this.tracker = tracker;

    // Binds methods.
    this.handleEvents = this.handleEvents.bind(this);

    var selector = '[' + this.opts.attributePrefix + 'on]';

    // Creates a mapping of events to their delegates
    this.delegates = {};
    this.opts.events.forEach(function (event) {
      _this.delegates[event] = (0, _domUtils.delegate)(document, event, selector, _this.handleEvents, { composed: true, useCapture: true });
    });
  }

  /**
   * Handles all events on elements with event attributes.
   * @param {Event} event The DOM click event.
   * @param {Element} element The delegated DOM element target.
   */


  _createClass(EventTracker, [{
    key: 'handleEvents',
    value: function handleEvents(event, element) {
      var prefix = this.opts.attributePrefix;
      var events = element.getAttribute(prefix + 'on').split(/\s*,\s*/);

      // Ensures the type matches one of the events specified on the element.
      if (events.indexOf(event.type) < 0) return;

      /** @type {FieldsObj} */
      var defaultFields = { transport: 'beacon' };
      var attributeFields = (0, _utilities.getAttributeFields)(element, prefix);
      var userFields = (0, _utilities.assign)({}, this.opts.fieldsObj, attributeFields);
      var hitType = attributeFields.hitType || 'event';

      this.tracker.send(hitType, (0, _utilities.createFieldsObj)(defaultFields, userFields, this.tracker, this.opts.hitFilter, element, event));
    }

    /**
     * Removes all event listeners and instance properties.
     */

  }, {
    key: 'remove',
    value: function remove() {
      var _this2 = this;

      Object.keys(this.delegates).forEach(function (key) {
        _this2.delegates[key].destroy();
      });
    }
  }]);

  return EventTracker;
}();

(0, _provide2.default)('eventTracker', EventTracker);

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright 2016 Google Inc. All Rights Reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Licensed under the Apache License, Version 2.0 (the "License");
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * you may not use this file except in compliance with the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * You may obtain a copy of the License at
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *     http://www.apache.org/licenses/LICENSE-2.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Unless required by applicable law or agreed to in writing, software
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * distributed under the License is distributed on an "AS IS" BASIS,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * See the License for the specific language governing permissions and
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * limitations under the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _provide = __webpack_require__(1);

var _provide2 = _interopRequireDefault(_provide);

var _usage = __webpack_require__(3);

var _utilities = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Class for the `impressionTracker` analytics.js plugin.
 * @implements {ImpressionTrackerPublicInterface}
 */
var ImpressionTracker = function () {
  /**
   * Registers impression tracking.
   * @param {!Tracker} tracker Passed internally by analytics.js
   * @param {?ImpressionTrackerOpts} opts Passed by the require command.
   */
  function ImpressionTracker(tracker, opts) {
    var _this = this;

    _classCallCheck(this, ImpressionTracker);

    (0, _usage.trackUsage)(tracker, _usage.plugins.IMPRESSION_TRACKER);

    // Feature detects to prevent errors in unsupporting browsers.
    if (!(window.IntersectionObserver && window.MutationObserver)) return;

    /** type {ImpressionTrackerOpts} */
    var defaultOptions = {
      // elements: undefined,
      rootMargin: '0px',
      fieldsObj: {},
      attributePrefix: 'ga-'
      // hitFilter: undefined,
    };

    this.opts = /** type {ImpressionTrackerOpts} */(0, _utilities.assign)(defaultOptions, opts);

    this.tracker = tracker;

    // Binds methods.
    this.handleDomMutations = this.handleDomMutations.bind(this);
    this.handleIntersectionChanges = this.handleIntersectionChanges.bind(this);
    this.handleDomElementAdded = this.handleDomElementAdded.bind(this);
    this.handleDomElementRemoved = this.handleDomElementRemoved.bind(this);

    /** @type {MutationObserver} */
    this.mutationObserver = null;

    // The primary list of elements to observe. Each item contains the
    // element ID, threshold, and whether it's currently in-view.
    this.items = [];

    // A map of element IDs in the `items` array to DOM elements in the
    // document. The presence of a key indicates that the element ID is in the
    // `items` array, and the presence of an element value indicates that the
    // element is in the DOM.
    this.elementMap = {};

    // A map of threshold values. Each threshold is mapped to an
    // IntersectionObserver instance specific to that threshold.
    this.thresholdMap = {};

    // Once the DOM is ready, start observing for changes (if present).
    (0, _utilities.domReady)(function () {
      if (_this.opts.elements) {
        _this.observeElements(_this.opts.elements);
      }
    });
  }

  /**
   * Starts observing the passed elements for impressions.
   * @param {Array<!ImpressionTrackerElementsItem|string>} elements
   */


  _createClass(ImpressionTracker, [{
    key: 'observeElements',
    value: function observeElements(elements) {
      var _this2 = this;

      var data = this.deriveDataFromElements(elements);

      // Merge the new data with the data already on the plugin instance.
      this.items = this.items.concat(data.items);
      this.elementMap = (0, _utilities.assign)({}, data.elementMap, this.elementMap);
      this.thresholdMap = (0, _utilities.assign)({}, data.thresholdMap, this.thresholdMap);

      // Observe each new item.
      data.items.forEach(function (item) {
        var observer = _this2.thresholdMap[item.threshold] = _this2.thresholdMap[item.threshold] || new IntersectionObserver(_this2.handleIntersectionChanges, {
          rootMargin: _this2.opts.rootMargin,
          threshold: [+item.threshold]
        });

        var element = _this2.elementMap[item.id] || (_this2.elementMap[item.id] = document.getElementById(item.id));

        if (element) {
          observer.observe(element);
        }
      });

      if (!this.mutationObserver) {
        this.mutationObserver = new MutationObserver(this.handleDomMutations);
        this.mutationObserver.observe(document.body, {
          childList: true,
          subtree: true
        });
      }

      // TODO(philipwalton): Remove temporary hack to force a new frame
      // immediately after adding observers.
      // https://bugs.chromium.org/p/chromium/issues/detail?id=612323
      requestAnimationFrame(function () {});
    }

    /**
     * Stops observing the passed elements for impressions.
     * @param {Array<!ImpressionTrackerElementsItem|string>} elements
     * @return {undefined}
     */

  }, {
    key: 'unobserveElements',
    value: function unobserveElements(elements) {
      var itemsToKeep = [];
      var itemsToRemove = [];

      this.items.forEach(function (item) {
        var itemInItems = elements.some(function (element) {
          var itemToRemove = getItemFromElement(element);
          return itemToRemove.id === item.id && itemToRemove.threshold === item.threshold && itemToRemove.trackFirstImpressionOnly === item.trackFirstImpressionOnly;
        });
        if (itemInItems) {
          itemsToRemove.push(item);
        } else {
          itemsToKeep.push(item);
        }
      });

      // If there are no items to keep, run the `unobserveAllElements` logic.
      if (!itemsToKeep.length) {
        this.unobserveAllElements();
      } else {
        var dataToKeep = this.deriveDataFromElements(itemsToKeep);
        var dataToRemove = this.deriveDataFromElements(itemsToRemove);

        this.items = dataToKeep.items;
        this.elementMap = dataToKeep.elementMap;
        this.thresholdMap = dataToKeep.thresholdMap;

        // Unobserve removed elements.
        itemsToRemove.forEach(function (item) {
          if (!dataToKeep.elementMap[item.id]) {
            var observer = dataToRemove.thresholdMap[item.threshold];
            var element = dataToRemove.elementMap[item.id];

            if (element) {
              observer.unobserve(element);
            }

            // Disconnect unneeded threshold observers.
            if (!dataToKeep.thresholdMap[item.threshold]) {
              dataToRemove.thresholdMap[item.threshold].disconnect();
            }
          }
        });
      }
    }

    /**
     * Stops observing all currently observed elements.
     */

  }, {
    key: 'unobserveAllElements',
    value: function unobserveAllElements() {
      var _this3 = this;

      Object.keys(this.thresholdMap).forEach(function (key) {
        _this3.thresholdMap[key].disconnect();
      });

      this.mutationObserver.disconnect();
      this.mutationObserver = null;

      this.items = [];
      this.elementMap = {};
      this.thresholdMap = {};
    }

    /**
     * Loops through each of the passed elements and creates a map of element IDs,
     * threshold values, and a list of "items" (which contains each element's
     * `threshold` and `trackFirstImpressionOnly` property).
     * @param {Array} elements A list of elements to derive item data from.
     * @return {Object} An object with the properties `items`, `elementMap`
     *     and `threshold`.
     */

  }, {
    key: 'deriveDataFromElements',
    value: function deriveDataFromElements(elements) {
      var _this4 = this;

      var items = [];
      var thresholdMap = {};
      var elementMap = {};

      if (elements.length) {
        elements.forEach(function (element) {
          var item = getItemFromElement(element);

          items.push(item);
          elementMap[item.id] = _this4.elementMap[item.id] || null;
          thresholdMap[item.threshold] = _this4.thresholdMap[item.threshold] || null;
        });
      }

      return { items: items, elementMap: elementMap, thresholdMap: thresholdMap };
    }

    /**
     * Handles nodes being added or removed from the DOM. This function is passed
     * as the callback to `this.mutationObserver`.
     * @param {Array} mutations A list of `MutationRecord` instances
     */

  }, {
    key: 'handleDomMutations',
    value: function handleDomMutations(mutations) {
      for (var i = 0, mutation; mutation = mutations[i]; i++) {
        // Handles removed elements.
        for (var k = 0, removedEl; removedEl = mutation.removedNodes[k]; k++) {
          this.walkNodeTree(removedEl, this.handleDomElementRemoved);
        }
        // Handles added elements.
        for (var j = 0, addedEl; addedEl = mutation.addedNodes[j]; j++) {
          this.walkNodeTree(addedEl, this.handleDomElementAdded);
        }
      }
    }

    /**
     * Iterates through all descendents of a DOM node and invokes the passed
     * callback if any of them match an elememt in `elementMap`.
     * @param {Node} node The DOM node to walk.
     * @param {Function} callback A function to be invoked if a match is found.
     */

  }, {
    key: 'walkNodeTree',
    value: function walkNodeTree(node, callback) {
      if (node.nodeType == 1 && node.id in this.elementMap) {
        callback(node.id);
      }
      for (var i = 0, child; child = node.childNodes[i]; i++) {
        this.walkNodeTree(child, callback);
      }
    }

    /**
     * Handles intersection changes. This function is passed as the callback to
     * `this.intersectionObserver`
     * @param {Array} records A list of `IntersectionObserverEntry` records.
     */

  }, {
    key: 'handleIntersectionChanges',
    value: function handleIntersectionChanges(records) {
      var itemsToRemove = [];
      for (var i = 0, record; record = records[i]; i++) {
        for (var j = 0, item; item = this.items[j]; j++) {
          if (record.target.id !== item.id) continue;

          if (isTargetVisible(item.threshold, record)) {
            this.handleImpression(item.id);

            if (item.trackFirstImpressionOnly) {
              itemsToRemove.push(item);
            }
          }
        }
      }
      if (itemsToRemove.length) {
        this.unobserveElements(itemsToRemove);
      }
    }

    /**
     * Sends a hit to Google Analytics with the impression data.
     * @param {string} id The ID of the element making the impression.
     */

  }, {
    key: 'handleImpression',
    value: function handleImpression(id) {
      var element = document.getElementById(id);

      /** @type {FieldsObj} */
      var defaultFields = {
        transport: 'beacon',
        eventCategory: 'Viewport',
        eventAction: 'impression',
        eventLabel: id,
        nonInteraction: true
      };

      /** @type {FieldsObj} */
      var userFields = (0, _utilities.assign)({}, this.opts.fieldsObj, (0, _utilities.getAttributeFields)(element, this.opts.attributePrefix));

      this.tracker.send('event', (0, _utilities.createFieldsObj)(defaultFields, userFields, this.tracker, this.opts.hitFilter, element));
    }

    /**
     * Handles an element in the items array being added to the DOM.
     * @param {string} id The ID of the element that was added.
     */

  }, {
    key: 'handleDomElementAdded',
    value: function handleDomElementAdded(id) {
      var _this5 = this;

      var element = this.elementMap[id] = document.getElementById(id);
      this.items.forEach(function (item) {
        if (id == item.id) {
          _this5.thresholdMap[item.threshold].observe(element);
        }
      });
    }

    /**
     * Handles an element currently being observed for intersections being
     * removed from the DOM.
     * @param {string} id The ID of the element that was removed.
     */

  }, {
    key: 'handleDomElementRemoved',
    value: function handleDomElementRemoved(id) {
      var _this6 = this;

      var element = this.elementMap[id];
      this.items.forEach(function (item) {
        if (id == item.id) {
          _this6.thresholdMap[item.threshold].unobserve(element);
        }
      });

      this.elementMap[id] = null;
    }

    /**
     * Removes all listeners and observers.
     * @private
     */

  }, {
    key: 'remove',
    value: function remove() {
      this.unobserveAllElements();
    }
  }]);

  return ImpressionTracker;
}();

(0, _provide2.default)('impressionTracker', ImpressionTracker);

/**
 * Detects whether or not an intersection record represents a visible target
 * given a particular threshold.
 * @param {number} threshold The threshold the target is visible above.
 * @param {IntersectionObserverEntry} record The most recent record entry.
 * @return {boolean} True if the target is visible.
 */
function isTargetVisible(threshold, record) {
  if (threshold === 0) {
    var i = record.intersectionRect;
    return i.top > 0 || i.bottom > 0 || i.left > 0 || i.right > 0;
  } else {
    return record.intersectionRatio >= threshold;
  }
}

/**
 * Creates an item by merging the passed element with the item defaults.
 * If the passed element is just a string, that string is treated as
 * the item ID.
 * @param {!ImpressionTrackerElementsItem|string} element The element to
 *     convert to an item.
 * @return {!ImpressionTrackerElementsItem} The item object.
 */
function getItemFromElement(element) {
  /** @type {ImpressionTrackerElementsItem} */
  var defaultOpts = {
    threshold: 0,
    trackFirstImpressionOnly: true
  };

  if (typeof element == 'string') {
    element = /** @type {!ImpressionTrackerElementsItem} */{ id: element };
  }

  return (0, _utilities.assign)(defaultOpts, element);
}

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * An simple reimplementation of the native Node.js EventEmitter class.
 * The goal of this implementation is to be as small as possible.
 */
var EventEmitter = function () {
  /**
   * Creates the event registry.
   */
  function EventEmitter() {
    _classCallCheck(this, EventEmitter);

    this.registry_ = {};
  }

  /**
   * Adds a handler function to the registry for the passed event.
   * @param {string} event The event name.
   * @param {!Function} fn The handler to be invoked when the passed
   *     event is emitted.
   */


  _createClass(EventEmitter, [{
    key: "on",
    value: function on(event, fn) {
      this.getRegistry_(event).push(fn);
    }

    /**
     * Removes a handler function from the registry for the passed event.
     * @param {string=} event The event name.
     * @param {Function=} fn The handler to be removed.
     */

  }, {
    key: "off",
    value: function off() {
      var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
      var fn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

      if (event && fn) {
        var eventRegistry = this.getRegistry_(event);
        var handlerIndex = eventRegistry.indexOf(fn);
        if (handlerIndex > -1) {
          eventRegistry.splice(handlerIndex, 1);
        }
      } else {
        this.registry_ = {};
      }
    }

    /**
     * Runs all registered handlers for the passed event with the optional args.
     * @param {string} event The event name.
     * @param {...*} args The arguments to be passed to the handler.
     */

  }, {
    key: "emit",
    value: function emit(event) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      this.getRegistry_(event).forEach(function (fn) {
        return fn.apply(undefined, args);
      });
    }

    /**
     * Returns the total number of event handlers currently registered.
     * @return {number}
     */

  }, {
    key: "getEventCount",
    value: function getEventCount() {
      var _this = this;

      var eventCount = 0;
      Object.keys(this.registry_).forEach(function (event) {
        eventCount += _this.getRegistry_(event).length;
      });
      return eventCount;
    }

    /**
     * Returns an array of handlers associated with the passed event name.
     * If no handlers have been registered, an empty array is returned.
     * @private
     * @param {string} event The event name.
     * @return {!Array} An array of handler functions.
     */

  }, {
    key: "getRegistry_",
    value: function getRegistry_(event) {
      return this.registry_[event] = this.registry_[event] || [];
    }
  }]);

  return EventEmitter;
}();

exports.default = EventEmitter;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright 2016 Google Inc. All Rights Reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Licensed under the Apache License, Version 2.0 (the "License");
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * you may not use this file except in compliance with the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * You may obtain a copy of the License at
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *     http://www.apache.org/licenses/LICENSE-2.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Unless required by applicable law or agreed to in writing, software
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * distributed under the License is distributed on an "AS IS" BASIS,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * See the License for the specific language governing permissions and
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * limitations under the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _constants = __webpack_require__(5);

var _provide = __webpack_require__(1);

var _provide2 = _interopRequireDefault(_provide);

var _usage = __webpack_require__(3);

var _utilities = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Declares the MediaQueryList instance cache.
 */
var mediaMap = {};

/**
 * Class for the `mediaQueryTracker` analytics.js plugin.
 * @implements {MediaQueryTrackerPublicInterface}
 */

var MediaQueryTracker = function () {
  /**
   * Registers media query tracking.
   * @param {!Tracker} tracker Passed internally by analytics.js
   * @param {?Object} opts Passed by the require command.
   */
  function MediaQueryTracker(tracker, opts) {
    _classCallCheck(this, MediaQueryTracker);

    (0, _usage.trackUsage)(tracker, _usage.plugins.MEDIA_QUERY_TRACKER);

    // Feature detects to prevent errors in unsupporting browsers.
    if (!window.matchMedia) return;

    /** @type {MediaQueryTrackerOpts} */
    var defaultOpts = {
      // definitions: unefined,
      changeTemplate: this.changeTemplate,
      changeTimeout: 1000,
      fieldsObj: {}
      // hitFilter: undefined,
    };

    this.opts = /** @type {MediaQueryTrackerOpts} */(0, _utilities.assign)(defaultOpts, opts);

    // Exits early if media query data doesn't exist.
    if (!(0, _utilities.isObject)(this.opts.definitions)) return;

    this.opts.definitions = (0, _utilities.toArray)(this.opts.definitions);
    this.tracker = tracker;
    this.changeListeners = [];

    this.processMediaQueries();
  }

  /**
   * Loops through each media query definition, sets the custom dimenion data,
   * and adds the change listeners.
   */


  _createClass(MediaQueryTracker, [{
    key: 'processMediaQueries',
    value: function processMediaQueries() {
      var _this = this;

      this.opts.definitions.forEach(function (definition) {
        // Only processes definitions with a name and index.
        if (definition.name && definition.dimensionIndex) {
          var mediaName = _this.getMatchName(definition);
          _this.tracker.set('dimension' + definition.dimensionIndex, mediaName);

          _this.addChangeListeners(definition);
        }
      });
    }

    /**
     * Takes a definition object and return the name of the matching media item.
     * If no match is found, the NULL_DIMENSION value is returned.
     * @param {Object} definition A set of named media queries associated
     *     with a single custom dimension.
     * @return {string} The name of the matched media or NULL_DIMENSION.
     */

  }, {
    key: 'getMatchName',
    value: function getMatchName(definition) {
      var match = void 0;

      definition.items.forEach(function (item) {
        if (getMediaList(item.media).matches) {
          match = item;
        }
      });
      return match ? match.name : _constants.NULL_DIMENSION;
    }

    /**
     * Adds change listeners to each media query in the definition list.
     * Debounces the changes to prevent unnecessary hits from being sent.
     * @param {Object} definition A set of named media queries associated
     *     with a single custom dimension
     */

  }, {
    key: 'addChangeListeners',
    value: function addChangeListeners(definition) {
      var _this2 = this;

      definition.items.forEach(function (item) {
        var mql = getMediaList(item.media);
        var fn = (0, _utilities.debounce)(function () {
          _this2.handleChanges(definition);
        }, _this2.opts.changeTimeout);

        mql.addListener(fn);
        _this2.changeListeners.push({ mql: mql, fn: fn });
      });
    }

    /**
     * Handles changes to the matched media. When the new value differs from
     * the old value, a change event is sent.
     * @param {Object} definition A set of named media queries associated
     *     with a single custom dimension
     */

  }, {
    key: 'handleChanges',
    value: function handleChanges(definition) {
      var newValue = this.getMatchName(definition);
      var oldValue = this.tracker.get('dimension' + definition.dimensionIndex);

      if (newValue !== oldValue) {
        this.tracker.set('dimension' + definition.dimensionIndex, newValue);

        /** @type {FieldsObj} */
        var defaultFields = {
          transport: 'beacon',
          eventCategory: definition.name,
          eventAction: 'change',
          eventLabel: this.opts.changeTemplate(oldValue, newValue),
          nonInteraction: true
        };
        this.tracker.send('event', (0, _utilities.createFieldsObj)(defaultFields, this.opts.fieldsObj, this.tracker, this.opts.hitFilter));
      }
    }

    /**
     * Removes all event listeners and instance properties.
     */

  }, {
    key: 'remove',
    value: function remove() {
      for (var i = 0, listener; listener = this.changeListeners[i]; i++) {
        listener.mql.removeListener(listener.fn);
      }
    }

    /**
     * Sets the default formatting of the change event label.
     * This can be overridden by setting the `changeTemplate` option.
     * @param {string} oldValue The value of the media query prior to the change.
     * @param {string} newValue The value of the media query after the change.
     * @return {string} The formatted event label.
     */

  }, {
    key: 'changeTemplate',
    value: function changeTemplate(oldValue, newValue) {
      return oldValue + ' => ' + newValue;
    }
  }]);

  return MediaQueryTracker;
}();

(0, _provide2.default)('mediaQueryTracker', MediaQueryTracker);

/**
 * Accepts a media query and returns a MediaQueryList object.
 * Caches the values to avoid multiple unnecessary instances.
 * @param {string} media A media query value.
 * @return {MediaQueryList} The matched media.
 */
function getMediaList(media) {
  return mediaMap[media] || (mediaMap[media] = window.matchMedia(media));
}

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright 2016 Google Inc. All Rights Reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Licensed under the Apache License, Version 2.0 (the "License");
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * you may not use this file except in compliance with the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * You may obtain a copy of the License at
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *     http://www.apache.org/licenses/LICENSE-2.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Unless required by applicable law or agreed to in writing, software
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * distributed under the License is distributed on an "AS IS" BASIS,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * See the License for the specific language governing permissions and
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * limitations under the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _constants = __webpack_require__(5);

var _methodChain = __webpack_require__(4);

var _methodChain2 = _interopRequireDefault(_methodChain);

var _provide = __webpack_require__(1);

var _provide2 = _interopRequireDefault(_provide);

var _session = __webpack_require__(11);

var _session2 = _interopRequireDefault(_session);

var _store = __webpack_require__(7);

var _store2 = _interopRequireDefault(_store);

var _usage = __webpack_require__(3);

var _utilities = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HIDDEN = 'hidden';
var VISIBLE = 'visible';
var PAGE_ID = (0, _utilities.uuid)();
var SECONDS = 1000;

/**
 * Class for the `pageVisibilityTracker` analytics.js plugin.
 * @implements {PageVisibilityTrackerPublicInterface}
 */

var PageVisibilityTracker = function () {
  /**
   * Registers outbound link tracking on tracker object.
   * @param {!Tracker} tracker Passed internally by analytics.js
   * @param {?Object} opts Passed by the require command.
   */
  function PageVisibilityTracker(tracker, opts) {
    var _this = this;

    _classCallCheck(this, PageVisibilityTracker);

    (0, _usage.trackUsage)(tracker, _usage.plugins.PAGE_VISIBILITY_TRACKER);

    // Feature detects to prevent errors in unsupporting browsers.
    if (!document.visibilityState) return;

    /** @type {PageVisibilityTrackerOpts} */
    var defaultOpts = {
      sessionTimeout: _session2.default.DEFAULT_TIMEOUT,
      visibleThreshold: 5 * SECONDS,
      // timeZone: undefined,
      sendInitialPageview: false,
      // pageLoadsMetricIndex: undefined,
      // visibleMetricIndex: undefined,
      fieldsObj: {}
      // hitFilter: undefined
    };

    this.opts = /** @type {PageVisibilityTrackerOpts} */(0, _utilities.assign)(defaultOpts, opts);

    this.tracker = tracker;
    this.lastPageState = document.visibilityState;
    this.visibleThresholdTimeout_ = null;
    this.isInitialPageviewSent_ = false;

    // Binds methods to `this`.
    this.trackerSetOverride = this.trackerSetOverride.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleWindowUnload = this.handleWindowUnload.bind(this);
    this.handleExternalStoreSet = this.handleExternalStoreSet.bind(this);

    // Creates the store and binds storage change events.
    this.store = _store2.default.getOrCreate(tracker.get('trackingId'), 'plugins/page-visibility-tracker');
    this.store.on('externalSet', this.handleExternalStoreSet);

    // Creates the session and binds session events.
    this.session = _session2.default.getOrCreate(tracker, this.opts.sessionTimeout, this.opts.timeZone);

    // Override the built-in tracker.set method to watch for changes.
    _methodChain2.default.add(tracker, 'set', this.trackerSetOverride);

    window.addEventListener('unload', this.handleWindowUnload);
    document.addEventListener('visibilitychange', this.handleChange);

    // Postpone sending any hits until the next call stack, which allows all
    // autotrack plugins to be required sync before any hits are sent.
    (0, _utilities.deferUntilPluginsLoaded)(this.tracker, function () {
      if (document.visibilityState == VISIBLE) {
        if (_this.opts.sendInitialPageview) {
          _this.sendPageview({ isPageLoad: true });
          _this.isInitialPageviewSent_ = true;
        }
        _this.store.set( /** @type {PageVisibilityStoreData} */{
          time: (0, _utilities.now)(),
          state: VISIBLE,
          pageId: PAGE_ID,
          sessionId: _this.session.getId()
        });
      } else {
        if (_this.opts.sendInitialPageview && _this.opts.pageLoadsMetricIndex) {
          _this.sendPageLoad();
        }
      }
    });
  }

  /**
   * Inspects the last visibility state change data and determines if a
   * visibility event needs to be tracked based on the current visibility
   * state and whether or not the session has expired. If the session has
   * expired, a change to `visible` will trigger an additional pageview.
   * This method also sends as the event value (and optionally a custom metric)
   * the elapsed time between this event and the previously reported change
   * in the same session, allowing you to more accurately determine when users
   * were actually looking at your page versus when it was in the background.
   */


  _createClass(PageVisibilityTracker, [{
    key: 'handleChange',
    value: function handleChange() {
      var _this2 = this;

      if (!(document.visibilityState == VISIBLE || document.visibilityState == HIDDEN)) {
        return;
      }

      var lastStoredChange = this.getAndValidateChangeData();

      /** @type {PageVisibilityStoreData} */
      var change = {
        time: (0, _utilities.now)(),
        state: document.visibilityState,
        pageId: PAGE_ID,
        sessionId: this.session.getId()
      };

      // If the visibilityState has changed to visible and the initial pageview
      // has not been sent (and the `sendInitialPageview` option is `true`).
      // Send the initial pageview now.
      if (document.visibilityState == VISIBLE && this.opts.sendInitialPageview && !this.isInitialPageviewSent_) {
        this.sendPageview();
        this.isInitialPageviewSent_ = true;
      }

      // If the visibilityState has changed to hidden, clear any scheduled
      // pageviews waiting for the visibleThreshold timeout.
      if (document.visibilityState == HIDDEN && this.visibleThresholdTimeout_) {
        clearTimeout(this.visibleThresholdTimeout_);
      }

      if (this.session.isExpired(lastStoredChange.sessionId)) {
        this.store.clear();
        if (this.lastPageState == HIDDEN && document.visibilityState == VISIBLE) {
          // If the session has expired, changes from hidden to visible should
          // be considered a new pageview rather than a visibility event.
          // This behavior ensures all sessions contain a pageview so
          // session-level page dimensions and metrics (e.g. ga:landingPagePath
          // and ga:entrances) are correct.
          // Also, in order to prevent false positives, we add a small timeout
          // that is cleared if the visibilityState changes to hidden shortly
          // after the change to visible. This can happen if a user is quickly
          // switching through their open tabs but not actually interacting with
          // and of them. It can also happen when a user goes to a tab just to
          // immediately close it. Such cases should not be considered pageviews.
          clearTimeout(this.visibleThresholdTimeout_);
          this.visibleThresholdTimeout_ = setTimeout(function () {
            _this2.store.set(change);
            _this2.sendPageview({ hitTime: change.time });
          }, this.opts.visibleThreshold);
        }
      } else {
        if (lastStoredChange.pageId == PAGE_ID && lastStoredChange.state == VISIBLE) {
          this.sendPageVisibilityEvent(lastStoredChange);
        }
        this.store.set(change);
      }

      this.lastPageState = document.visibilityState;
    }

    /**
     * Retroactively updates the stored change data in cases where it's known to
     * be out of sync.
     * This plugin keeps track of each visiblity change and stores the last one
     * in localStorage. LocalStorage is used to handle situations where the user
     * has multiple page open at the same time and we don't want to
     * double-report page visibility in those cases.
     * However, a problem can occur if a user closes a page when one or more
     * visible pages are still open. In such cases it's impossible to know
     * which of the remaining pages the user will interact with next.
     * To solve this problem we wait for the next change on any page and then
     * retroactively update the stored data to reflect the current page as being
     * the page on which the last change event occured and measure visibility
     * from that point.
     * @return {!PageVisibilityStoreData}
     */

  }, {
    key: 'getAndValidateChangeData',
    value: function getAndValidateChangeData() {
      var lastStoredChange =
      /** @type {PageVisibilityStoreData} */this.store.get();

      if (this.lastPageState == VISIBLE && lastStoredChange.state == HIDDEN && lastStoredChange.pageId != PAGE_ID) {
        lastStoredChange.state = VISIBLE;
        lastStoredChange.pageId = PAGE_ID;
        this.store.set(lastStoredChange);
      }
      return lastStoredChange;
    }

    /**
     * Sends a Page Visibility event to track the time this page was in the
     * visible state (assuming it was in that state long enough to meet the
     * threshold).
     * @param {!PageVisibilityStoreData} lastStoredChange
     * @param {{hitTime: (number|undefined)}=} param1
     *     - hitTime: A hit timestap used to help ensure original order in cases
     *                where the send is delayed.
     */

  }, {
    key: 'sendPageVisibilityEvent',
    value: function sendPageVisibilityEvent(lastStoredChange) {
      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          hitTime = _ref.hitTime;

      var delta = this.getTimeSinceLastStoredChange(lastStoredChange, { hitTime: hitTime });

      // If the detla is greater than the visibileThreshold, report it.
      if (delta && delta >= this.opts.visibleThreshold) {
        var deltaInSeconds = Math.round(delta / SECONDS);

        /** @type {FieldsObj} */
        var defaultFields = {
          transport: 'beacon',
          nonInteraction: true,
          eventCategory: 'Page Visibility',
          eventAction: 'track',
          eventValue: deltaInSeconds,
          eventLabel: _constants.NULL_DIMENSION
        };

        if (hitTime) {
          defaultFields.queueTime = (0, _utilities.now)() - hitTime;
        }

        // If a custom metric was specified, set it equal to the event value.
        if (this.opts.visibleMetricIndex) {
          defaultFields['metric' + this.opts.visibleMetricIndex] = deltaInSeconds;
        }

        this.tracker.send('event', (0, _utilities.createFieldsObj)(defaultFields, this.opts.fieldsObj, this.tracker, this.opts.hitFilter));
      }
    }

    /**
     * Sends a page load event.
     */

  }, {
    key: 'sendPageLoad',
    value: function sendPageLoad() {
      var _defaultFields;

      /** @type {FieldsObj} */
      var defaultFields = (_defaultFields = {
        transport: 'beacon',
        eventCategory: 'Page Visibility',
        eventAction: 'page load',
        eventLabel: _constants.NULL_DIMENSION
      }, _defineProperty(_defaultFields, 'metric' + this.opts.pageLoadsMetricIndex, 1), _defineProperty(_defaultFields, 'nonInteraction', true), _defaultFields);
      this.tracker.send('event', (0, _utilities.createFieldsObj)(defaultFields, this.opts.fieldsObj, this.tracker, this.opts.hitFilter));
    }

    /**
     * Sends a pageview, optionally calculating an offset if hitTime is passed.
     * @param {{
     *   hitTime: (number|undefined),
     *   isPageLoad: (boolean|undefined)
     * }=} param1
     *     hitTime: The timestamp of the current hit.
     *     isPageLoad: True if this pageview was also a page load.
     */

  }, {
    key: 'sendPageview',
    value: function sendPageview() {
      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          hitTime = _ref2.hitTime,
          isPageLoad = _ref2.isPageLoad;

      /** @type {FieldsObj} */
      var defaultFields = { transport: 'beacon' };
      if (hitTime) {
        defaultFields.queueTime = (0, _utilities.now)() - hitTime;
      }
      if (isPageLoad && this.opts.pageLoadsMetricIndex) {
        defaultFields['metric' + this.opts.pageLoadsMetricIndex] = 1;
      }

      this.tracker.send('pageview', (0, _utilities.createFieldsObj)(defaultFields, this.opts.fieldsObj, this.tracker, this.opts.hitFilter));
    }

    /**
     * Detects changes to the tracker object and triggers an update if the page
     * field has changed.
     * @param {function((Object|string), (string|undefined))} originalMethod
     *     A reference to the overridden method.
     * @return {function((Object|string), (string|undefined))}
     */

  }, {
    key: 'trackerSetOverride',
    value: function trackerSetOverride(originalMethod) {
      var _this3 = this;

      return function (field, value) {
        /** @type {!FieldsObj} */
        var fields = (0, _utilities.isObject)(field) ? field : _defineProperty({}, field, value);
        if (fields.page && fields.page !== _this3.tracker.get('page')) {
          if (_this3.lastPageState == VISIBLE) {
            _this3.handleChange();
          }
        }
        originalMethod(field, value);
      };
    }

    /**
     * Calculates the time since the last visibility change event in the current
     * session. If the session has expired the reported time is zero.
     * @param {PageVisibilityStoreData} lastStoredChange
     * @param {{hitTime: (number|undefined)}=} param1
     *     hitTime: The time of the current hit (defaults to now).
     * @return {number} The time (in ms) since the last change.
     */

  }, {
    key: 'getTimeSinceLastStoredChange',
    value: function getTimeSinceLastStoredChange(lastStoredChange) {
      var _ref4 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          hitTime = _ref4.hitTime;

      return lastStoredChange.time ? (hitTime || (0, _utilities.now)()) - lastStoredChange.time : 0;
    }

    /**
     * Handles responding to the `storage` event.
     * The code on this page needs to be informed when other tabs or windows are
     * updating the stored page visibility state data. This method checks to see
     * if a hidden state is stored when there are still visible tabs open, which
     * can happen if multiple windows are open at the same time.
     * @param {PageVisibilityStoreData} newData
     * @param {PageVisibilityStoreData} oldData
     */

  }, {
    key: 'handleExternalStoreSet',
    value: function handleExternalStoreSet(newData, oldData) {
      // If the change times are the same, then the previous write only
      // updated the active page ID. It didn't enter a new state and thus no
      // hits should be sent.
      if (newData.time == oldData.time) return;

      // Page Visibility events must be sent by the tracker on the page
      // where the original event occurred. So if a change happens on another
      // page, but this page is where the previous change event occurred, then
      // this page is the one that needs to send the event (so all dimension
      // data is correct).
      if (oldData.pageId == PAGE_ID && oldData.state == VISIBLE && !this.session.isExpired(oldData.sessionId)) {
        this.sendPageVisibilityEvent(oldData, { hitTime: newData.time });
      }
    }

    /**
     * Handles responding to the `unload` event.
     * Since some browsers don't emit a `visibilitychange` event in all cases
     * where a page might be unloaded, it's necessary to hook into the `unload`
     * event to ensure the correct state is always stored.
     */

  }, {
    key: 'handleWindowUnload',
    value: function handleWindowUnload() {
      // If the stored visibility state isn't hidden when the unload event
      // fires, it means the visibilitychange event didn't fire as the document
      // was being unloaded, so we invoke it manually.
      if (this.lastPageState != HIDDEN) {
        this.handleChange();
      }
    }

    /**
     * Removes all event listeners and restores overridden methods.
     */

  }, {
    key: 'remove',
    value: function remove() {
      this.store.destroy();
      this.session.destroy();
      _methodChain2.default.remove(this.tracker, 'set', this.trackerSetOverride);
      window.removeEventListener('unload', this.handleWindowUnload);
      document.removeEventListener('visibilitychange', this.handleChange);
    }
  }]);

  return PageVisibilityTracker;
}();

(0, _provide2.default)('pageVisibilityTracker', PageVisibilityTracker);

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright 2016 Google Inc. All Rights Reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Licensed under the Apache License, Version 2.0 (the "License");
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * you may not use this file except in compliance with the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * You may obtain a copy of the License at
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *     http://www.apache.org/licenses/LICENSE-2.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Unless required by applicable law or agreed to in writing, software
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * distributed under the License is distributed on an "AS IS" BASIS,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * See the License for the specific language governing permissions and
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * limitations under the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _provide = __webpack_require__(1);

var _provide2 = _interopRequireDefault(_provide);

var _usage = __webpack_require__(3);

var _utilities = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Class for the `socialWidgetTracker` analytics.js plugin.
 * @implements {SocialWidgetTrackerPublicInterface}
 */
var SocialWidgetTracker = function () {
  /**
   * Registers social tracking on tracker object.
   * Supports both declarative social tracking via HTML attributes as well as
   * tracking for social events when using official Twitter or Facebook widgets.
   * @param {!Tracker} tracker Passed internally by analytics.js
   * @param {?Object} opts Passed by the require command.
   */
  function SocialWidgetTracker(tracker, opts) {
    _classCallCheck(this, SocialWidgetTracker);

    (0, _usage.trackUsage)(tracker, _usage.plugins.SOCIAL_WIDGET_TRACKER);

    // Feature detects to prevent errors in unsupporting browsers.
    if (!window.addEventListener) return;

    /** @type {SocialWidgetTrackerOpts} */
    var defaultOpts = {
      fieldsObj: {},
      hitFilter: null
    };

    this.opts = /** @type {SocialWidgetTrackerOpts} */(0, _utilities.assign)(defaultOpts, opts);

    this.tracker = tracker;

    // Binds methods to `this`.
    this.addWidgetListeners = this.addWidgetListeners.bind(this);
    this.addTwitterEventHandlers = this.addTwitterEventHandlers.bind(this);
    this.handleTweetEvents = this.handleTweetEvents.bind(this);
    this.handleFollowEvents = this.handleFollowEvents.bind(this);
    this.handleLikeEvents = this.handleLikeEvents.bind(this);
    this.handleUnlikeEvents = this.handleUnlikeEvents.bind(this);

    if (document.readyState != 'complete') {
      // Adds the widget listeners after the window's `load` event fires.
      // If loading widgets using the officially recommended snippets, they
      // will be available at `window.load`. If not users can call the
      // `addWidgetListeners` method manually.
      window.addEventListener('load', this.addWidgetListeners);
    } else {
      this.addWidgetListeners();
    }
  }

  /**
   * Invokes the methods to add Facebook and Twitter widget event listeners.
   * Ensures the respective global namespaces are present before adding.
   */


  _createClass(SocialWidgetTracker, [{
    key: 'addWidgetListeners',
    value: function addWidgetListeners() {
      if (window.FB) this.addFacebookEventHandlers();
      if (window.twttr) this.addTwitterEventHandlers();
    }

    /**
     * Adds event handlers for the "tweet" and "follow" events emitted by the
     * official tweet and follow buttons. Note: this does not capture tweet or
     * follow events emitted by other Twitter widgets (tweet, timeline, etc.).
     */

  }, {
    key: 'addTwitterEventHandlers',
    value: function addTwitterEventHandlers() {
      var _this = this;

      try {
        window.twttr.ready(function () {
          window.twttr.events.bind('tweet', _this.handleTweetEvents);
          window.twttr.events.bind('follow', _this.handleFollowEvents);
        });
      } catch (err) {
        // Do nothing.
      }
    }

    /**
     * Removes event handlers for the "tweet" and "follow" events emitted by the
     * official tweet and follow buttons.
     */

  }, {
    key: 'removeTwitterEventHandlers',
    value: function removeTwitterEventHandlers() {
      var _this2 = this;

      try {
        window.twttr.ready(function () {
          window.twttr.events.unbind('tweet', _this2.handleTweetEvents);
          window.twttr.events.unbind('follow', _this2.handleFollowEvents);
        });
      } catch (err) {
        // Do nothing.
      }
    }

    /**
     * Adds event handlers for the "like" and "unlike" events emitted by the
     * official Facebook like button.
     */

  }, {
    key: 'addFacebookEventHandlers',
    value: function addFacebookEventHandlers() {
      try {
        window.FB.Event.subscribe('edge.create', this.handleLikeEvents);
        window.FB.Event.subscribe('edge.remove', this.handleUnlikeEvents);
      } catch (err) {
        // Do nothing.
      }
    }

    /**
     * Removes event handlers for the "like" and "unlike" events emitted by the
     * official Facebook like button.
     */

  }, {
    key: 'removeFacebookEventHandlers',
    value: function removeFacebookEventHandlers() {
      try {
        window.FB.Event.unsubscribe('edge.create', this.handleLikeEvents);
        window.FB.Event.unsubscribe('edge.remove', this.handleUnlikeEvents);
      } catch (err) {
        // Do nothing.
      }
    }

    /**
     * Handles `tweet` events emitted by the Twitter JS SDK.
     * @param {TwttrEvent} event The Twitter event object passed to the handler.
     */

  }, {
    key: 'handleTweetEvents',
    value: function handleTweetEvents(event) {
      // Ignores tweets from widgets that aren't the tweet button.
      if (event.region != 'tweet') return;

      var url = event.data.url || event.target.getAttribute('data-url') || location.href;

      /** @type {FieldsObj} */
      var defaultFields = {
        transport: 'beacon',
        socialNetwork: 'Twitter',
        socialAction: 'tweet',
        socialTarget: url
      };
      this.tracker.send('social', (0, _utilities.createFieldsObj)(defaultFields, this.opts.fieldsObj, this.tracker, this.opts.hitFilter, event.target, event));
    }

    /**
     * Handles `follow` events emitted by the Twitter JS SDK.
     * @param {TwttrEvent} event The Twitter event object passed to the handler.
     */

  }, {
    key: 'handleFollowEvents',
    value: function handleFollowEvents(event) {
      // Ignore follows from widgets that aren't the follow button.
      if (event.region != 'follow') return;

      var screenName = event.data.screen_name || event.target.getAttribute('data-screen-name');

      /** @type {FieldsObj} */
      var defaultFields = {
        transport: 'beacon',
        socialNetwork: 'Twitter',
        socialAction: 'follow',
        socialTarget: screenName
      };
      this.tracker.send('social', (0, _utilities.createFieldsObj)(defaultFields, this.opts.fieldsObj, this.tracker, this.opts.hitFilter, event.target, event));
    }

    /**
     * Handles `like` events emitted by the Facebook JS SDK.
     * @param {string} url The URL corresponding to the like event.
     */

  }, {
    key: 'handleLikeEvents',
    value: function handleLikeEvents(url) {
      /** @type {FieldsObj} */
      var defaultFields = {
        transport: 'beacon',
        socialNetwork: 'Facebook',
        socialAction: 'like',
        socialTarget: url
      };
      this.tracker.send('social', (0, _utilities.createFieldsObj)(defaultFields, this.opts.fieldsObj, this.tracker, this.opts.hitFilter));
    }

    /**
     * Handles `unlike` events emitted by the Facebook JS SDK.
     * @param {string} url The URL corresponding to the unlike event.
     */

  }, {
    key: 'handleUnlikeEvents',
    value: function handleUnlikeEvents(url) {
      /** @type {FieldsObj} */
      var defaultFields = {
        transport: 'beacon',
        socialNetwork: 'Facebook',
        socialAction: 'unlike',
        socialTarget: url
      };
      this.tracker.send('social', (0, _utilities.createFieldsObj)(defaultFields, this.opts.fieldsObj, this.tracker, this.opts.hitFilter));
    }

    /**
     * Removes all event listeners and instance properties.
     */

  }, {
    key: 'remove',
    value: function remove() {
      window.removeEventListener('load', this.addWidgetListeners);
      this.removeFacebookEventHandlers();
      this.removeTwitterEventHandlers();
    }
  }]);

  return SocialWidgetTracker;
}();

(0, _provide2.default)('socialWidgetTracker', SocialWidgetTracker);

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright 2016 Google Inc. All Rights Reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Licensed under the Apache License, Version 2.0 (the "License");
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * you may not use this file except in compliance with the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * You may obtain a copy of the License at
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *     http://www.apache.org/licenses/LICENSE-2.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Unless required by applicable law or agreed to in writing, software
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * distributed under the License is distributed on an "AS IS" BASIS,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * See the License for the specific language governing permissions and
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * limitations under the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _methodChain = __webpack_require__(4);

var _methodChain2 = _interopRequireDefault(_methodChain);

var _provide = __webpack_require__(1);

var _provide2 = _interopRequireDefault(_provide);

var _usage = __webpack_require__(3);

var _utilities = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Class for the `urlChangeTracker` analytics.js plugin.
 * @implements {UrlChangeTrackerPublicInterface}
 */
var UrlChangeTracker = function () {
  /**
   * Adds handler for the history API methods
   * @param {!Tracker} tracker Passed internally by analytics.js
   * @param {?Object} opts Passed by the require command.
   */
  function UrlChangeTracker(tracker, opts) {
    _classCallCheck(this, UrlChangeTracker);

    (0, _usage.trackUsage)(tracker, _usage.plugins.URL_CHANGE_TRACKER);

    // Feature detects to prevent errors in unsupporting browsers.
    if (!history.pushState || !window.addEventListener) return;

    /** @type {UrlChangeTrackerOpts} */
    var defaultOpts = {
      shouldTrackUrlChange: this.shouldTrackUrlChange,
      trackReplaceState: false,
      fieldsObj: {},
      hitFilter: null
    };

    this.opts = /** @type {UrlChangeTrackerOpts} */(0, _utilities.assign)(defaultOpts, opts);

    this.tracker = tracker;

    // Sets the initial page field.
    // Don't set this on the tracker yet so campaign data can be retreived
    // from the location field.
    this.path = getPath();

    // Binds methods.
    this.pushStateOverride = this.pushStateOverride.bind(this);
    this.replaceStateOverride = this.replaceStateOverride.bind(this);
    this.handlePopState = this.handlePopState.bind(this);

    // Watches for history changes.
    _methodChain2.default.add(history, 'pushState', this.pushStateOverride);
    _methodChain2.default.add(history, 'replaceState', this.replaceStateOverride);
    window.addEventListener('popstate', this.handlePopState);
  }

  /**
   * Handles invocations of the native `history.pushState` and calls
   * `handleUrlChange()` indicating that the history updated.
   * @param {!Function} originalMethod A reference to the overridden method.
   * @return {!Function}
   */


  _createClass(UrlChangeTracker, [{
    key: 'pushStateOverride',
    value: function pushStateOverride(originalMethod) {
      var _this = this;

      return function () {
        originalMethod.apply(undefined, arguments);
        _this.handleUrlChange(true);
      };
    }

    /**
     * Handles invocations of the native `history.replaceState` and calls
     * `handleUrlChange()` indicating that history was replaced.
     * @param {!Function} originalMethod A reference to the overridden method.
     * @return {!Function}
     */

  }, {
    key: 'replaceStateOverride',
    value: function replaceStateOverride(originalMethod) {
      var _this2 = this;

      return function () {
        originalMethod.apply(undefined, arguments);
        _this2.handleUrlChange(false);
      };
    }

    /**
     * Handles responding to the popstate event and calls
     * `handleUrlChange()` indicating that history was updated.
     */

  }, {
    key: 'handlePopState',
    value: function handlePopState() {
      this.handleUrlChange(true);
    }

    /**
     * Updates the page and title fields on the tracker and sends a pageview
     * if a new history entry was created.
     * @param {boolean} historyDidUpdate True if the history was changed via
     *     `pushState()` or the `popstate` event. False if the history was just
     *     modified via `replaceState()`.
     */

  }, {
    key: 'handleUrlChange',
    value: function handleUrlChange(historyDidUpdate) {
      var _this3 = this;

      // Calls the update logic asychronously to help ensure that app logic
      // responding to the URL change happens prior to this.
      setTimeout(function () {
        var oldPath = _this3.path;
        var newPath = getPath();

        if (oldPath != newPath && _this3.opts.shouldTrackUrlChange.call(_this3, newPath, oldPath)) {
          _this3.path = newPath;
          _this3.tracker.set({
            page: newPath,
            title: document.title
          });

          if (historyDidUpdate || _this3.opts.trackReplaceState) {
            /** @type {FieldsObj} */
            var defaultFields = { transport: 'beacon' };
            _this3.tracker.send('pageview', (0, _utilities.createFieldsObj)(defaultFields, _this3.opts.fieldsObj, _this3.tracker, _this3.opts.hitFilter));
          }
        }
      }, 0);
    }

    /**
     * Determines whether or not the tracker should send a hit with the new page
     * data. This default implementation can be overrided in the config options.
     * @param {string} newPath The path after the URL change.
     * @param {string} oldPath The path prior to the URL change.
     * @return {boolean} Whether or not the URL change should be tracked.
     */

  }, {
    key: 'shouldTrackUrlChange',
    value: function shouldTrackUrlChange(newPath, oldPath) {
      return !!(newPath && oldPath);
    }

    /**
     * Removes all event listeners and restores overridden methods.
     */

  }, {
    key: 'remove',
    value: function remove() {
      _methodChain2.default.remove(history, 'pushState', this.pushStateOverride);
      _methodChain2.default.remove(history, 'replaceState', this.replaceStateOverride);
      window.removeEventListener('popstate', this.handlePopState);
    }
  }]);

  return UrlChangeTracker;
}();

(0, _provide2.default)('urlChangeTracker', UrlChangeTracker);

/**
 * @return {string} The path value of the current URL.
 */
function getPath() {
  return location.pathname + location.search;
}

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/******/(function (modules) {
  // webpackBootstrap
  /******/ // The module cache
  /******/var installedModules = {};
  /******/
  /******/ // The require function
  /******/function __webpack_require__(moduleId) {
    /******/
    /******/ // Check if module is in cache
    /******/if (installedModules[moduleId]) {
      /******/return installedModules[moduleId].exports;
      /******/
    }
    /******/ // Create a new module (and put it into the cache)
    /******/var module = installedModules[moduleId] = {
      /******/i: moduleId,
      /******/l: false,
      /******/exports: {}
      /******/ };
    /******/
    /******/ // Execute the module function
    /******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
    /******/
    /******/ // Flag the module as loaded
    /******/module.l = true;
    /******/
    /******/ // Return the exports of the module
    /******/return module.exports;
    /******/
  }
  /******/
  /******/
  /******/ // expose the modules object (__webpack_modules__)
  /******/__webpack_require__.m = modules;
  /******/
  /******/ // expose the module cache
  /******/__webpack_require__.c = installedModules;
  /******/
  /******/ // define getter function for harmony exports
  /******/__webpack_require__.d = function (exports, name, getter) {
    /******/if (!__webpack_require__.o(exports, name)) {
      /******/Object.defineProperty(exports, name, {
        /******/configurable: false,
        /******/enumerable: true,
        /******/get: getter
        /******/ });
      /******/
    }
    /******/
  };
  /******/
  /******/ // getDefaultExport function for compatibility with non-harmony modules
  /******/__webpack_require__.n = function (module) {
    /******/var getter = module && module.__esModule ?
    /******/function getDefault() {
      return module['default'];
    } :
    /******/function getModuleExports() {
      return module;
    };
    /******/__webpack_require__.d(getter, 'a', getter);
    /******/return getter;
    /******/
  };
  /******/
  /******/ // Object.prototype.hasOwnProperty.call
  /******/__webpack_require__.o = function (object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  };
  /******/
  /******/ // __webpack_public_path__
  /******/__webpack_require__.p = "";
  /******/
  /******/ // Load entry module and return exports
  /******/return __webpack_require__(__webpack_require__.s = 6);
  /******/
})(
/************************************************************************/
/******/[
/* 0 */
/***/function (module, exports, __webpack_require__) {

  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.parseUrl = exports.parents = exports.matches = exports.getAttributes = exports.dispatch = exports.delegate = exports.closest = undefined;

  var _closest = __webpack_require__(4);

  var _closest2 = _interopRequireDefault(_closest);

  var _delegate = __webpack_require__(9);

  var _delegate2 = _interopRequireDefault(_delegate);

  var _dispatch = __webpack_require__(10);

  var _dispatch2 = _interopRequireDefault(_dispatch);

  var _getAttributes = __webpack_require__(11);

  var _getAttributes2 = _interopRequireDefault(_getAttributes);

  var _matches = __webpack_require__(3);

  var _matches2 = _interopRequireDefault(_matches);

  var _parents = __webpack_require__(5);

  var _parents2 = _interopRequireDefault(_parents);

  var _parseUrl = __webpack_require__(12);

  var _parseUrl2 = _interopRequireDefault(_parseUrl);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  exports.closest = _closest2.default;
  exports.delegate = _delegate2.default;
  exports.dispatch = _dispatch2.default;
  exports.getAttributes = _getAttributes2.default;
  exports.matches = _matches2.default;
  exports.parents = _parents2.default;
  exports.parseUrl = _parseUrl2.default;

  /***/
},
/* 1 */
/***/function (module, exports, __webpack_require__) {

  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = provide;

  var _constants = __webpack_require__(8);

  var _utilities = __webpack_require__(2);

  /**
   * Provides a plugin for use with analytics.js, accounting for the possibility
   * that the global command queue has been renamed or not yet defined.
   * @param {string} pluginName The plugin name identifier.
   * @param {Function} pluginConstructor The plugin constructor function.
   */
  /**
   * Copyright 2016 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *     http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  function provide(pluginName, pluginConstructor) {
    var gaAlias = window.GoogleAnalyticsObject || 'ga';
    window[gaAlias] = window[gaAlias] || function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      (window[gaAlias].q = window[gaAlias].q || []).push(args);
    };

    // Adds the autotrack dev ID if not already included.
    window.gaDevIds = window.gaDevIds || [];
    if (window.gaDevIds.indexOf(_constants.DEV_ID) < 0) {
      window.gaDevIds.push(_constants.DEV_ID);
    }

    // Formally provides the plugin for use with analytics.js.
    window[gaAlias]('provide', pluginName, pluginConstructor);

    // Registers the plugin on the global gaplugins object.
    window.gaplugins = window.gaplugins || {};
    window.gaplugins[(0, _utilities.capitalize)(pluginName)] = pluginConstructor;
  }

  /***/
},
/* 2 */
/***/function (module, exports, __webpack_require__) {

  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.uuid = exports.assign = undefined;

  var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
  }; /**
      * Copyright 2016 Google Inc. All Rights Reserved.
      *
      * Licensed under the Apache License, Version 2.0 (the "License");
      * you may not use this file except in compliance with the License.
      * You may obtain a copy of the License at
      *
      *     http://www.apache.org/licenses/LICENSE-2.0
      *
      * Unless required by applicable law or agreed to in writing, software
      * distributed under the License is distributed on an "AS IS" BASIS,
      * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
      * See the License for the specific language governing permissions and
      * limitations under the License.
      */

  exports.createFieldsObj = createFieldsObj;
  exports.getAttributeFields = getAttributeFields;
  exports.domReady = domReady;
  exports.debounce = debounce;
  exports.withTimeout = withTimeout;
  exports.deferUntilPluginsLoaded = deferUntilPluginsLoaded;
  exports.camelCase = camelCase;
  exports.capitalize = capitalize;
  exports.isObject = isObject;
  exports.toArray = toArray;
  exports.now = now;

  var _domUtils = __webpack_require__(0);

  var _methodChain = __webpack_require__(13);

  var _methodChain2 = _interopRequireDefault(_methodChain);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  /**
   * Accepts default and user override fields and an optional tracker, hit
   * filter, and target element and returns a single object that can be used in
   * `ga('send', ...)` commands.
   * @param {FieldsObj} defaultFields The default fields to return.
   * @param {FieldsObj} userFields Fields set by the user to override the
   *     defaults.
   * @param {Tracker=} tracker The tracker object to apply the hit filter to.
   * @param {Function=} hitFilter A filter function that gets
   *     called with the tracker model right before the `buildHitTask`. It can
   *     be used to modify the model for the current hit only.
   * @param {Element=} target If the hit originated from an interaction
   *     with a DOM element, hitFilter is invoked with that element as the
   *     second argument.
   * @param {(Event|TwttrEvent)=} event If the hit originated via a DOM event,
   *     hitFilter is invoked with that event as the third argument.
   * @return {!FieldsObj} The final fields object.
   */
  function createFieldsObj(defaultFields, userFields) {
    var tracker = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
    var hitFilter = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;
    var target = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : undefined;
    var event = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : undefined;

    if (typeof hitFilter == 'function') {
      var originalBuildHitTask = tracker.get('buildHitTask');
      return {
        buildHitTask: function buildHitTask( /** @type {!Model} */model) {
          model.set(defaultFields, null, true);
          model.set(userFields, null, true);
          hitFilter(model, target, event);
          originalBuildHitTask(model);
        }
      };
    } else {
      return assign({}, defaultFields, userFields);
    }
  }

  /**
   * Retrieves the attributes from an DOM element and returns a fields object
   * for all attributes matching the passed prefix string.
   * @param {Element} element The DOM element to get attributes from.
   * @param {string} prefix An attribute prefix. Only the attributes matching
   *     the prefix will be returned on the fields object.
   * @return {FieldsObj} An object of analytics.js fields and values
   */
  function getAttributeFields(element, prefix) {
    var attributes = (0, _domUtils.getAttributes)(element);
    var attributeFields = {};

    Object.keys(attributes).forEach(function (attribute) {
      // The `on` prefix is used for event handling but isn't a field.
      if (attribute.indexOf(prefix) === 0 && attribute != prefix + 'on') {
        var value = attributes[attribute];

        // Detects Boolean value strings.
        if (value == 'true') value = true;
        if (value == 'false') value = false;

        var field = camelCase(attribute.slice(prefix.length));
        attributeFields[field] = value;
      }
    });

    return attributeFields;
  }

  /**
   * Accepts a function to be invoked once the DOM is ready. If the DOM is
   * already ready, the callback is invoked immediately.
   * @param {!Function} callback The ready callback.
   */
  function domReady(callback) {
    if (document.readyState == 'loading') {
      document.addEventListener('DOMContentLoaded', function fn() {
        document.removeEventListener('DOMContentLoaded', fn);
        callback();
      });
    } else {
      callback();
    }
  }

  /**
   * Returns a function, that, as long as it continues to be called, will not
   * actually run. The function will only run after it stops being called for
   * `wait` milliseconds.
   * @param {!Function} fn The function to debounce.
   * @param {number} wait The debounce wait timeout in ms.
   * @return {!Function} The debounced function.
   */
  function debounce(fn, wait) {
    var timeout = void 0;
    return function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      clearTimeout(timeout);
      timeout = setTimeout(function () {
        return fn.apply(undefined, args);
      }, wait);
    };
  }

  /**
   * Accepts a function and returns a wrapped version of the function that is
   * expected to be called elsewhere in the system. If it's not called
   * elsewhere after the timeout period, it's called regardless. The wrapper
   * function also prevents the callback from being called more than once.
   * @param {!Function} callback The function to call.
   * @param {number=} wait How many milliseconds to wait before invoking
   *     the callback.
   * @return {!Function} The wrapped version of the passed function.
   */
  function withTimeout(callback) {
    var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2000;

    var called = false;
    var fn = function fn() {
      if (!called) {
        called = true;
        callback();
      }
    };
    setTimeout(fn, wait);
    return fn;
  }

  // Maps trackers to queue by tracking ID.
  var queueMap = {};

  /**
   * Queues a function for execution in the next call stack, or immediately
   * before any send commands are executed on the tracker. This allows
   * autotrack plugins to defer running commands until after all other plugins
   * are required but before any other hits are sent.
   * @param {!Tracker} tracker
   * @param {!Function} fn
   */
  function deferUntilPluginsLoaded(tracker, fn) {
    var trackingId = tracker.get('trackingId');
    var ref = queueMap[trackingId] = queueMap[trackingId] || {};

    var processQueue = function processQueue() {
      clearTimeout(ref.timeout);
      if (ref.send) {
        _methodChain2.default.remove(tracker, 'send', ref.send);
      }
      delete queueMap[trackingId];

      ref.queue.forEach(function (fn) {
        return fn();
      });
    };

    clearTimeout(ref.timeout);
    ref.timeout = setTimeout(processQueue, 0);
    ref.queue = ref.queue || [];
    ref.queue.push(fn);

    if (!ref.send) {
      ref.send = function (originalMethod) {
        return function () {
          processQueue();
          originalMethod.apply(undefined, arguments);
        };
      };
      _methodChain2.default.add(tracker, 'send', ref.send);
    }
  }

  /**
   * A small shim of Object.assign that aims for brevity over spec-compliant
   * handling all the edge cases.
   * @param {!Object} target The target object to assign to.
   * @param {...?Object} sources Additional objects who properties should be
   *     assigned to target. Non-objects are converted to objects.
   * @return {!Object} The modified target object.
   */
  var assign = exports.assign = Object.assign || function (target) {
    for (var _len2 = arguments.length, sources = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      sources[_key2 - 1] = arguments[_key2];
    }

    for (var i = 0, len = sources.length; i < len; i++) {
      var source = Object(sources[i]);
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };

  /**
   * Accepts a string containing hyphen or underscore word separators and
   * converts it to camelCase.
   * @param {string} str The string to camelCase.
   * @return {string} The camelCased version of the string.
   */
  function camelCase(str) {
    return str.replace(/[\-\_]+(\w?)/g, function (match, p1) {
      return p1.toUpperCase();
    });
  }

  /**
   * Capitalizes the first letter of a string.
   * @param {string} str The input string.
   * @return {string} The capitalized string
   */
  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  /**
   * Indicates whether the passed variable is a JavaScript object.
   * @param {*} value The input variable to test.
   * @return {boolean} Whether or not the test is an object.
   */
  function isObject(value) {
    return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object' && value !== null;
  }

  /**
   * Accepts a value that may or may not be an array. If it is not an array,
   * it is returned as the first item in a single-item array.
   * @param {*} value The value to convert to an array if it is not.
   * @return {!Array} The array-ified value.
   */
  function toArray(value) {
    return Array.isArray(value) ? value : [value];
  }

  /**
   * @return {number} The current date timestamp
   */
  function now() {
    return +new Date();
  }

  /*eslint-disable */
  // https://gist.github.com/jed/982883
  /** @param {?=} a */
  var uuid = exports.uuid = function b(a) {
    return a ? (a ^ Math.random() * 16 >> a / 4).toString(16) : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, b);
  };
  /*eslint-enable */

  /***/
},
/* 3 */
/***/function (module, exports, __webpack_require__) {

  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = matches;
  var proto = window.Element.prototype;
  var nativeMatches = proto.matches || proto.matchesSelector || proto.webkitMatchesSelector || proto.mozMatchesSelector || proto.msMatchesSelector || proto.oMatchesSelector;

  /**
   * Tests if a DOM elements matches any of the test DOM elements or selectors.
   * @param {Element} element The DOM element to test.
   * @param {Element|string|Array<Element|string>} test A DOM element, a CSS
   *     selector, or an array of DOM elements or CSS selectors to match against.
   * @return {boolean} True of any part of the test matches.
   */
  function matches(element, test) {
    // Validate input.
    if (element && element.nodeType == 1 && test) {
      // if test is a string or DOM element test it.
      if (typeof test == 'string' || test.nodeType == 1) {
        return element == test || matchesSelector(element, /** @type {string} */test);
      } else if ('length' in test) {
        // if it has a length property iterate over the items
        // and return true if any match.
        for (var i = 0, item; item = test[i]; i++) {
          if (element == item || matchesSelector(element, item)) return true;
        }
      }
    }
    // Still here? Return false
    return false;
  }

  /**
   * Tests whether a DOM element matches a selector. This polyfills the native
   * Element.prototype.matches method across browsers.
   * @param {!Element} element The DOM element to test.
   * @param {string} selector The CSS selector to test element against.
   * @return {boolean} True if the selector matches.
   */
  function matchesSelector(element, selector) {
    if (typeof selector != 'string') return false;
    if (nativeMatches) return nativeMatches.call(element, selector);
    var nodes = element.parentNode.querySelectorAll(selector);
    for (var i = 0, node; node = nodes[i]; i++) {
      if (node == element) return true;
    }
    return false;
  }

  /***/
},
/* 4 */
/***/function (module, exports, __webpack_require__) {

  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = closest;

  var _matches = __webpack_require__(3);

  var _matches2 = _interopRequireDefault(_matches);

  var _parents = __webpack_require__(5);

  var _parents2 = _interopRequireDefault(_parents);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  /**
   * Gets the closest parent element that matches the passed selector.
   * @param {Element} element The element whose parents to check.
   * @param {string} selector The CSS selector to match against.
   * @param {boolean=} shouldCheckSelf True if the selector should test against
   *     the passed element itself.
   * @return {Element|undefined} The matching element or undefined.
   */
  function closest(element, selector) {
    var shouldCheckSelf = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    if (!(element && element.nodeType == 1 && selector)) return;
    var parentElements = (shouldCheckSelf ? [element] : []).concat((0, _parents2.default)(element));

    for (var i = 0, parent; parent = parentElements[i]; i++) {
      if ((0, _matches2.default)(parent, selector)) return parent;
    }
  }

  /***/
},
/* 5 */
/***/function (module, exports, __webpack_require__) {

  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = parents;
  /**
   * Returns an array of a DOM element's parent elements.
   * @param {!Element} element The DOM element whose parents to get.
   * @return {!Array} An array of all parent elemets, or an empty array if no
   *     parent elements are found.
   */
  function parents(element) {
    var list = [];
    while (element && element.parentNode && element.parentNode.nodeType == 1) {
      element = /** @type {!Element} */element.parentNode;
      list.push(element);
    }
    return list;
  }

  /***/
},
/* 6 */
/***/function (module, exports, __webpack_require__) {

  "use strict";

  __webpack_require__(7);

  __webpack_require__(14);

  __webpack_require__(15);

  __webpack_require__(16);

  /***/
},
/* 7 */
/***/function (module, exports, __webpack_require__) {

  "use strict";

  var _provide = __webpack_require__(1);

  var _provide2 = _interopRequireDefault(_provide);

  var _domUtils = __webpack_require__(0);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var TrackThisOpenExternalInTab = function TrackThisOpenExternalInTab() {
    _classCallCheck(this, TrackThisOpenExternalInTab);

    var links = document.querySelectorAll('a[href]');
    links.forEach(function (link) {
      var linkUrl = (0, _domUtils.parseUrl)(link.getAttribute('href'));
      if (linkUrl.host !== location.host) {
        link.setAttribute('rel', 'external');
        link.setAttribute('target', '_blank');
      }
    });
  };

  (0, _provide2.default)('trackThisOpenExternalInTab', TrackThisOpenExternalInTab);

  /***/
},
/* 8 */
/***/function (module, exports, __webpack_require__) {

  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  /**
   * Copyright 2016 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *     http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  var VERSION = exports.VERSION = '2.4.1';
  var DEV_ID = exports.DEV_ID = 'i5iSjo';

  var VERSION_PARAM = exports.VERSION_PARAM = '_av';
  var USAGE_PARAM = exports.USAGE_PARAM = '_au';

  var NULL_DIMENSION = exports.NULL_DIMENSION = '(not set)';

  /***/
},
/* 9 */
/***/function (module, exports, __webpack_require__) {

  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = delegate;

  var _closest = __webpack_require__(4);

  var _closest2 = _interopRequireDefault(_closest);

  var _matches = __webpack_require__(3);

  var _matches2 = _interopRequireDefault(_matches);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  /**
   * Delegates the handling of events for an element matching a selector to an
   * ancestor of the matching element.
   * @param {!Node} ancestor The ancestor element to add the listener to.
   * @param {string} eventType The event type to listen to.
   * @param {string} selector A CSS selector to match against child elements.
   * @param {!Function} callback A function to run any time the event happens.
   * @param {Object=} opts A configuration options object. The available options:
   *     - useCapture<boolean>: If true, bind to the event capture phase.
   *     - deep<boolean>: If true, delegate into shadow trees.
   * @return {Object} The delegate object. It contains a destroy method.
   */
  function delegate(ancestor, eventType, selector, callback) {
    var opts = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};

    // Defines the event listener.
    var listener = function listener(event) {
      var delegateTarget = void 0;

      // If opts.composed is true and the event originated from inside a Shadow
      // tree, check the composed path nodes.
      if (opts.composed && typeof event.composedPath == 'function') {
        var composedPath = event.composedPath();
        for (var i = 0, node; node = composedPath[i]; i++) {
          if (node.nodeType == 1 && (0, _matches2.default)(node, selector)) {
            delegateTarget = node;
          }
        }
      } else {
        // Otherwise check the parents.
        delegateTarget = (0, _closest2.default)(event.target, selector, true);
      }

      if (delegateTarget) {
        callback.call(delegateTarget, event, delegateTarget);
      }
    };

    ancestor.addEventListener(eventType, listener, opts.useCapture);

    return {
      destroy: function destroy() {
        ancestor.removeEventListener(eventType, listener, opts.useCapture);
      }
    };
  }

  /***/
},
/* 10 */
/***/function (module, exports, __webpack_require__) {

  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
  };

  exports.default = dispatch;
  /**
   * Dispatches an event on the passed element.
   * @param {!Element} element The DOM element to dispatch the event on.
   * @param {string} eventType The type of event to dispatch.
   * @param {Object|string=} eventName A string name of the event constructor
   *     to use. Defaults to 'Event' if nothing is passed or 'CustomEvent' if
   *     a value is set on `initDict.detail`. If eventName is given an object
   *     it is assumed to be initDict and thus reassigned.
   * @param {Object=} initDict The initialization attributes for the
   *     event. A `detail` property can be used here to pass custom data.
   * @return {boolean} The return value of `element.dispatchEvent`, which will
   *     be false if any of the event listeners called `preventDefault`.
   */
  function dispatch(element, eventType) {
    var eventName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'Event';
    var initDict = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

    var event = void 0;
    var isCustom = void 0;

    // eventName is optional
    if ((typeof eventName === 'undefined' ? 'undefined' : _typeof(eventName)) == 'object') {
      initDict = eventName;
      eventName = 'Event';
    }

    initDict.bubbles = initDict.bubbles || false;
    initDict.cancelable = initDict.cancelable || false;
    initDict.composed = initDict.composed || false;

    // If a detail property is passed, this is a custom event.
    if ('detail' in initDict) isCustom = true;
    eventName = isCustom ? 'CustomEvent' : eventName;

    // Tries to create the event using constructors, if that doesn't work,
    // fallback to `document.createEvent()`.
    try {
      event = new window[eventName](eventType, initDict);
    } catch (err) {
      event = document.createEvent(eventName);
      var initMethod = 'init' + (isCustom ? 'Custom' : '') + 'Event';
      event[initMethod](eventType, initDict.bubbles, initDict.cancelable, initDict.detail);
    }

    return element.dispatchEvent(event);
  }

  /***/
},
/* 11 */
/***/function (module, exports, __webpack_require__) {

  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = getAttributes;
  /**
   * Gets all attributes of an element as a plain JavaScriot object.
   * @param {Element} element The element whose attributes to get.
   * @return {!Object} An object whose keys are the attribute keys and whose
   *     values are the attribute values. If no attributes exist, an empty
   *     object is returned.
   */
  function getAttributes(element) {
    var attrs = {};

    // Validate input.
    if (!(element && element.nodeType == 1)) return attrs;

    // Return an empty object if there are no attributes.
    var map = element.attributes;
    if (map.length === 0) return {};

    for (var i = 0, attr; attr = map[i]; i++) {
      attrs[attr.name] = attr.value;
    }
    return attrs;
  }

  /***/
},
/* 12 */
/***/function (module, exports, __webpack_require__) {

  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = parseUrl;
  var HTTP_PORT = '80';
  var HTTPS_PORT = '443';
  var DEFAULT_PORT = RegExp(':(' + HTTP_PORT + '|' + HTTPS_PORT + ')$');

  var a = document.createElement('a');
  var cache = {};

  /**
   * Parses the given url and returns an object mimicing a `Location` object.
   * @param {string} url The url to parse.
   * @return {!Object} An object with the same properties as a `Location`.
   */
  function parseUrl(url) {
    // All falsy values (as well as ".") should map to the current URL.
    url = !url || url == '.' ? location.href : url;

    if (cache[url]) return cache[url];

    a.href = url;

    // When parsing file relative paths (e.g. `../index.html`), IE will correctly
    // resolve the `href` property but will keep the `..` in the `path` property.
    // It will also not include the `host` or `hostname` properties. Furthermore,
    // IE will sometimes return no protocol or just a colon, especially for things
    // like relative protocol URLs (e.g. "//google.com").
    // To workaround all of these issues, we reparse with the full URL from the
    // `href` property.
    if (url.charAt(0) == '.' || url.charAt(0) == '/') return parseUrl(a.href);

    // Don't include default ports.
    var port = a.port == HTTP_PORT || a.port == HTTPS_PORT ? '' : a.port;

    // PhantomJS sets the port to "0" when using the file: protocol.
    port = port == '0' ? '' : port;

    // Sometimes IE incorrectly includes a port for default ports
    // (e.g. `:80` or `:443`) even when no port is specified in the URL.
    // http://bit.ly/1rQNoMg
    var host = a.host.replace(DEFAULT_PORT, '');

    // Not all browser support `origin` so we have to build it.
    var origin = a.origin ? a.origin : a.protocol + '//' + host;

    // Sometimes IE doesn't include the leading slash for pathname.
    // http://bit.ly/1rQNoMg
    var pathname = a.pathname.charAt(0) == '/' ? a.pathname : '/' + a.pathname;

    return cache[url] = {
      hash: a.hash,
      host: host,
      hostname: a.hostname,
      href: a.href,
      origin: origin,
      pathname: pathname,
      port: port,
      protocol: a.protocol,
      search: a.search
    };
  }

  /***/
},
/* 13 */
/***/function (module, exports, __webpack_require__) {

  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
      }
    }return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
  }();

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  /**
   * Copyright 2017 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *     http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  /**
   * @fileoverview
   * The functions exported by this module make it easier (and safer) to override
   * foreign object methods (in a modular way) and respond to or modify their
   * invocation. The primary feature is the ability to override a method without
   * worrying if it's already been overridden somewhere else in the codebase. It
   * also allows for safe restoring of an overridden method by only fully
   * restoring a method once all overrides have been removed.
   */

  var instances = [];

  /**
   * A class that wraps a foreign object method and emit events before and
   * after the original method is called.
   */

  var MethodChain = function () {
    _createClass(MethodChain, null, [{
      key: "add",

      /**
       * Adds the passed override method to the list of method chain overrides.
       * @param {!Object} context The object containing the method to chain.
       * @param {string} methodName The name of the method on the object.
       * @param {!Function} methodOverride The override method to add.
       */
      value: function add(context, methodName, methodOverride) {
        getOrCreateMethodChain(context, methodName).add(methodOverride);
      }

      /**
       * Removes a method chain added via `add()`. If the override is the
       * only override added, the original method is restored.
       * @param {!Object} context The object containing the method to unchain.
       * @param {string} methodName The name of the method on the object.
       * @param {!Function} methodOverride The override method to remove.
       */

    }, {
      key: "remove",
      value: function remove(context, methodName, methodOverride) {
        getOrCreateMethodChain(context, methodName).remove(methodOverride);
      }

      /**
       * Wraps a foreign object method and overrides it. Also stores a reference
       * to the original method so it can be restored later.
       * @param {!Object} context The object containing the method.
       * @param {string} methodName The name of the method on the object.
       */

    }]);

    function MethodChain(context, methodName) {
      var _this = this;

      _classCallCheck(this, MethodChain);

      this.context = context;
      this.methodName = methodName;
      this.isTask = /Task$/.test(methodName);

      this.originalMethodReference = this.isTask ? context.get(methodName) : context[methodName];

      this.methodChain = [];
      this.boundMethodChain = [];

      // Wraps the original method.
      this.wrappedMethod = function () {
        var lastBoundMethod = _this.boundMethodChain[_this.boundMethodChain.length - 1];

        return lastBoundMethod.apply(undefined, arguments);
      };

      // Override original method with the wrapped one.
      if (this.isTask) {
        context.set(methodName, this.wrappedMethod);
      } else {
        context[methodName] = this.wrappedMethod;
      }
    }

    /**
     * Adds a method to the method chain.
     * @param {!Function} overrideMethod The override method to add.
     */

    _createClass(MethodChain, [{
      key: "add",
      value: function add(overrideMethod) {
        this.methodChain.push(overrideMethod);
        this.rebindMethodChain();
      }

      /**
       * Removes a method from the method chain and restores the prior order.
       * @param {!Function} overrideMethod The override method to remove.
       */

    }, {
      key: "remove",
      value: function remove(overrideMethod) {
        var index = this.methodChain.indexOf(overrideMethod);
        if (index > -1) {
          this.methodChain.splice(index, 1);
          if (this.methodChain.length > 0) {
            this.rebindMethodChain();
          } else {
            this.destroy();
          }
        }
      }

      /**
       * Loops through the method chain array and recreates the bound method
       * chain array. This is necessary any time a method is added or removed
       * to ensure proper original method context and order.
       */

    }, {
      key: "rebindMethodChain",
      value: function rebindMethodChain() {
        this.boundMethodChain = [];
        for (var method, i = 0; method = this.methodChain[i]; i++) {
          var previousMethod = this.boundMethodChain[i - 1] || this.originalMethodReference.bind(this.context);
          this.boundMethodChain.push(method(previousMethod));
        }
      }

      /**
       * Calls super and destroys the instance if no registered handlers remain.
       */

    }, {
      key: "destroy",
      value: function destroy() {
        var index = instances.indexOf(this);
        if (index > -1) {
          instances.splice(index, 1);
          if (this.isTask) {
            this.context.set(this.methodName, this.originalMethodReference);
          } else {
            this.context[this.methodName] = this.originalMethodReference;
          }
        }
      }
    }]);

    return MethodChain;
  }();

  /**
   * Gets a MethodChain instance for the passed object and method. If the method
   * has already been wrapped via an existing MethodChain instance, that
   * instance is returned.
   * @param {!Object} context The object containing the method.
   * @param {string} methodName The name of the method on the object.
   * @return {!MethodChain}
   */

  exports.default = MethodChain;
  function getOrCreateMethodChain(context, methodName) {
    var methodChain = instances.filter(function (h) {
      return h.context == context && h.methodName == methodName;
    })[0];

    if (!methodChain) {
      methodChain = new MethodChain(context, methodName);
      instances.push(methodChain);
    }
    return methodChain;
  }

  /***/
},
/* 14 */
/***/function (module, exports, __webpack_require__) {

  "use strict";

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
      }
    }return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
  }();

  var _provide = __webpack_require__(1);

  var _provide2 = _interopRequireDefault(_provide);

  var _utilities = __webpack_require__(2);

  var _domUtils = __webpack_require__(0);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var TrackThisFileDownload = function () {
    function TrackThisFileDownload(tracker) {
      var _this = this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _classCallCheck(this, TrackThisFileDownload);

      this.tracker = tracker;
      var defaultOptions = {
        extensions: ['pdf', 'zip', '7zip', 'doc', 'docx']
      };
      this.options = (0, _utilities.assign)({}, defaultOptions, options);
      this.handleLinkInteractions = this.handleLinkInteractions.bind(this);
      this.delegates = {};

      this.options.extensions.forEach(function (extension) {
        var selector = 'a[href$=".' + extension + '"]';
        _this.delegates[extension] = (0, _domUtils.delegate)(document, 'click', selector, _this.handleLinkInteractions, {
          composed: true,
          useCapture: true
        });
      });
    }

    _createClass(TrackThisFileDownload, [{
      key: 'handleLinkInteractions',
      value: function handleLinkInteractions(event, link) {
        var linkUrl = (0, _domUtils.parseUrl)(link.getAttribute('href'));
        var eventOptions = {
          eventCategory: 'File download',
          eventAction: 'click',
          eventLabel: linkUrl.href,
          transport: 'beacon'
        };
        this.tracker.send('event', eventOptions);
      }
    }]);

    return TrackThisFileDownload;
  }();

  (0, _provide2.default)('trackThisFileDownload', TrackThisFileDownload);

  /***/
},
/* 15 */
/***/function (module, exports, __webpack_require__) {

  "use strict";

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
      }
    }return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
  }();

  var _provide = __webpack_require__(1);

  var _provide2 = _interopRequireDefault(_provide);

  var _utilities = __webpack_require__(2);

  var _domUtils = __webpack_require__(0);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var TrackThisLinkProtocol = function () {
    function TrackThisLinkProtocol(tracker) {
      var _this = this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _classCallCheck(this, TrackThisLinkProtocol);

      this.tracker = tracker;
      var defaultOptions = {
        protocols: {
          'mailto:': {
            category: 'Mail send'
          },
          'tel:': {
            category: 'Phone number'
          }
        }
      };
      this.options = (0, _utilities.assign)({}, defaultOptions, options);
      this.handleLinkInteractions = this.handleLinkInteractions.bind(this);
      this.delegates = {};

      Object.keys(this.options.protocols).forEach(function (protocol) {
        var selector = 'a[href^="' + protocol + '"]';
        console.log(selector);
        _this.delegates[protocol] = (0, _domUtils.delegate)(document, 'click', selector, _this.handleLinkInteractions, {
          composed: true,
          useCapture: true
        });
      });
    }

    _createClass(TrackThisLinkProtocol, [{
      key: 'handleLinkInteractions',
      value: function handleLinkInteractions(event, link) {
        var linkUrl = (0, _domUtils.parseUrl)(link.getAttribute('href'));
        var eventOptions = {
          eventCategory: this.options.protocols[linkUrl.protocol].category,
          eventAction: 'click',
          eventLabel: linkUrl.href,
          transport: 'beacon'
        };
        this.tracker.send('event', eventOptions);
      }
    }]);

    return TrackThisLinkProtocol;
  }();

  (0, _provide2.default)('trackThisLinkProtocol', TrackThisLinkProtocol);

  /***/
},
/* 16 */
/***/function (module, exports, __webpack_require__) {

  "use strict";

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
      }
    }return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
  }();

  var _provide = __webpack_require__(1);

  var _provide2 = _interopRequireDefault(_provide);

  var _domUtils = __webpack_require__(0);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var TrackThisIntraPageLink = function () {
    function TrackThisIntraPageLink(tracker) {
      _classCallCheck(this, TrackThisIntraPageLink);

      this.tracker = tracker;
      this.handleLinkInteractions = this.handleLinkInteractions.bind(this);
      this.delegates = (0, _domUtils.delegate)(document, 'click', 'a', this.handleLinkInteractions, {
        composed: true,
        useCapture: true
      });
    }

    _createClass(TrackThisIntraPageLink, [{
      key: 'handleLinkInteractions',
      value: function handleLinkInteractions(event, link) {
        var linkUrl = (0, _domUtils.parseUrl)(link.getAttribute('href'));
        if (linkUrl.hostname === location.hostname && linkUrl.pathname === location.pathname && linkUrl.hash !== location.hash) {
          this.tracker.send('event', {
            eventCategory: 'Intra-Page Link',
            eventAction: 'click',
            eventLabel: linkUrl.href
          });
        }
      }
    }]);

    return TrackThisIntraPageLink;
  }();

  (0, _provide2.default)('trackThisIntraPageLink', TrackThisIntraPageLink);

  /***/
}]
/******/);

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/******/(function (modules) {
  // webpackBootstrap
  /******/ // The module cache
  /******/var installedModules = {};
  /******/
  /******/ // The require function
  /******/function __webpack_require__(moduleId) {
    /******/
    /******/ // Check if module is in cache
    /******/if (installedModules[moduleId]) {
      /******/return installedModules[moduleId].exports;
      /******/
    }
    /******/ // Create a new module (and put it into the cache)
    /******/var module = installedModules[moduleId] = {
      /******/i: moduleId,
      /******/l: false,
      /******/exports: {}
      /******/ };
    /******/
    /******/ // Execute the module function
    /******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
    /******/
    /******/ // Flag the module as loaded
    /******/module.l = true;
    /******/
    /******/ // Return the exports of the module
    /******/return module.exports;
    /******/
  }
  /******/
  /******/
  /******/ // expose the modules object (__webpack_modules__)
  /******/__webpack_require__.m = modules;
  /******/
  /******/ // expose the module cache
  /******/__webpack_require__.c = installedModules;
  /******/
  /******/ // define getter function for harmony exports
  /******/__webpack_require__.d = function (exports, name, getter) {
    /******/if (!__webpack_require__.o(exports, name)) {
      /******/Object.defineProperty(exports, name, {
        /******/configurable: false,
        /******/enumerable: true,
        /******/get: getter
        /******/ });
      /******/
    }
    /******/
  };
  /******/
  /******/ // getDefaultExport function for compatibility with non-harmony modules
  /******/__webpack_require__.n = function (module) {
    /******/var getter = module && module.__esModule ?
    /******/function getDefault() {
      return module['default'];
    } :
    /******/function getModuleExports() {
      return module;
    };
    /******/__webpack_require__.d(getter, 'a', getter);
    /******/return getter;
    /******/
  };
  /******/
  /******/ // Object.prototype.hasOwnProperty.call
  /******/__webpack_require__.o = function (object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  };
  /******/
  /******/ // __webpack_public_path__
  /******/__webpack_require__.p = "";
  /******/
  /******/ // Load entry module and return exports
  /******/return __webpack_require__(__webpack_require__.s = 14);
  /******/
})(
/************************************************************************/
/******/[
/* 0 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";
  /* harmony export (immutable) */
  __webpack_exports__["c"] = createFieldsObj;
  /* harmony export (immutable) */__webpack_exports__["g"] = getAttributeFields;
  /* harmony export (immutable) */__webpack_exports__["f"] = domReady;
  /* harmony export (immutable) */__webpack_exports__["d"] = debounce;
  /* harmony export (immutable) */__webpack_exports__["l"] = withTimeout;
  /* harmony export (immutable) */__webpack_exports__["e"] = deferUntilPluginsLoaded;
  /* unused harmony export camelCase */
  /* harmony export (immutable) */__webpack_exports__["b"] = capitalize;
  /* harmony export (immutable) */__webpack_exports__["h"] = isObject;
  /* harmony export (immutable) */__webpack_exports__["j"] = toArray;
  /* harmony export (immutable) */__webpack_exports__["i"] = now;
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_0_dom_utils__ = __webpack_require__(3);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__method_chain__ = __webpack_require__(4);
  /**
   * Copyright 2016 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *     http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  /**
   * Accepts default and user override fields and an optional tracker, hit
   * filter, and target element and returns a single object that can be used in
   * `ga('send', ...)` commands.
   * @param {FieldsObj} defaultFields The default fields to return.
   * @param {FieldsObj} userFields Fields set by the user to override the
   *     defaults.
   * @param {Tracker=} tracker The tracker object to apply the hit filter to.
   * @param {Function=} hitFilter A filter function that gets
   *     called with the tracker model right before the `buildHitTask`. It can
   *     be used to modify the model for the current hit only.
   * @param {Element=} target If the hit originated from an interaction
   *     with a DOM element, hitFilter is invoked with that element as the
   *     second argument.
   * @param {(Event|TwttrEvent)=} event If the hit originated via a DOM event,
   *     hitFilter is invoked with that event as the third argument.
   * @return {!FieldsObj} The final fields object.
   */
  function createFieldsObj(defaultFields, userFields) {
    var tracker = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
    var hitFilter = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;
    var target = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : undefined;
    var event = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : undefined;

    if (typeof hitFilter == 'function') {
      var originalBuildHitTask = tracker.get('buildHitTask');
      return {
        buildHitTask: function buildHitTask( /** @type {!Model} */model) {
          model.set(defaultFields, null, true);
          model.set(userFields, null, true);
          hitFilter(model, target, event);
          originalBuildHitTask(model);
        }
      };
    } else {
      return assign({}, defaultFields, userFields);
    }
  }

  /**
   * Retrieves the attributes from an DOM element and returns a fields object
   * for all attributes matching the passed prefix string.
   * @param {Element} element The DOM element to get attributes from.
   * @param {string} prefix An attribute prefix. Only the attributes matching
   *     the prefix will be returned on the fields object.
   * @return {FieldsObj} An object of analytics.js fields and values
   */
  function getAttributeFields(element, prefix) {
    var attributes = Object(__WEBPACK_IMPORTED_MODULE_0_dom_utils__["b" /* getAttributes */])(element);
    var attributeFields = {};

    Object.keys(attributes).forEach(function (attribute) {
      // The `on` prefix is used for event handling but isn't a field.
      if (attribute.indexOf(prefix) === 0 && attribute != prefix + 'on') {
        var value = attributes[attribute];

        // Detects Boolean value strings.
        if (value == 'true') value = true;
        if (value == 'false') value = false;

        var field = camelCase(attribute.slice(prefix.length));
        attributeFields[field] = value;
      }
    });

    return attributeFields;
  }

  /**
   * Accepts a function to be invoked once the DOM is ready. If the DOM is
   * already ready, the callback is invoked immediately.
   * @param {!Function} callback The ready callback.
   */
  function domReady(callback) {
    if (document.readyState == 'loading') {
      document.addEventListener('DOMContentLoaded', function fn() {
        document.removeEventListener('DOMContentLoaded', fn);
        callback();
      });
    } else {
      callback();
    }
  }

  /**
   * Returns a function, that, as long as it continues to be called, will not
   * actually run. The function will only run after it stops being called for
   * `wait` milliseconds.
   * @param {!Function} fn The function to debounce.
   * @param {number} wait The debounce wait timeout in ms.
   * @return {!Function} The debounced function.
   */
  function debounce(fn, wait) {
    var timeout = void 0;
    return function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      clearTimeout(timeout);
      timeout = setTimeout(function () {
        return fn.apply(undefined, args);
      }, wait);
    };
  }

  /**
   * Accepts a function and returns a wrapped version of the function that is
   * expected to be called elsewhere in the system. If it's not called
   * elsewhere after the timeout period, it's called regardless. The wrapper
   * function also prevents the callback from being called more than once.
   * @param {!Function} callback The function to call.
   * @param {number=} wait How many milliseconds to wait before invoking
   *     the callback.
   * @return {!Function} The wrapped version of the passed function.
   */
  function withTimeout(callback) {
    var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2000;

    var called = false;
    var fn = function fn() {
      if (!called) {
        called = true;
        callback();
      }
    };
    setTimeout(fn, wait);
    return fn;
  }

  // Maps trackers to queue by tracking ID.
  var queueMap = {};

  /**
   * Queues a function for execution in the next call stack, or immediately
   * before any send commands are executed on the tracker. This allows
   * autotrack plugins to defer running commands until after all other plugins
   * are required but before any other hits are sent.
   * @param {!Tracker} tracker
   * @param {!Function} fn
   */
  function deferUntilPluginsLoaded(tracker, fn) {
    var trackingId = tracker.get('trackingId');
    var ref = queueMap[trackingId] = queueMap[trackingId] || {};

    var processQueue = function processQueue() {
      clearTimeout(ref.timeout);
      if (ref.send) {
        __WEBPACK_IMPORTED_MODULE_1__method_chain__["a" /* default */].remove(tracker, 'send', ref.send);
      }
      delete queueMap[trackingId];

      ref.queue.forEach(function (fn) {
        return fn();
      });
    };

    clearTimeout(ref.timeout);
    ref.timeout = setTimeout(processQueue, 0);
    ref.queue = ref.queue || [];
    ref.queue.push(fn);

    if (!ref.send) {
      ref.send = function (originalMethod) {
        return function () {
          processQueue();
          originalMethod.apply(undefined, arguments);
        };
      };
      __WEBPACK_IMPORTED_MODULE_1__method_chain__["a" /* default */].add(tracker, 'send', ref.send);
    }
  }

  /**
   * A small shim of Object.assign that aims for brevity over spec-compliant
   * handling all the edge cases.
   * @param {!Object} target The target object to assign to.
   * @param {...?Object} sources Additional objects who properties should be
   *     assigned to target. Non-objects are converted to objects.
   * @return {!Object} The modified target object.
   */
  var assign = Object.assign || function (target) {
    for (var _len2 = arguments.length, sources = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      sources[_key2 - 1] = arguments[_key2];
    }

    for (var i = 0, len = sources.length; i < len; i++) {
      var source = Object(sources[i]);
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  /* harmony export (immutable) */__webpack_exports__["a"] = assign;

  /**
   * Accepts a string containing hyphen or underscore word separators and
   * converts it to camelCase.
   * @param {string} str The string to camelCase.
   * @return {string} The camelCased version of the string.
   */
  function camelCase(str) {
    return str.replace(/[\-\_]+(\w?)/g, function (match, p1) {
      return p1.toUpperCase();
    });
  }

  /**
   * Capitalizes the first letter of a string.
   * @param {string} str The input string.
   * @return {string} The capitalized string
   */
  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  /**
   * Indicates whether the passed variable is a JavaScript object.
   * @param {*} value The input variable to test.
   * @return {boolean} Whether or not the test is an object.
   */
  function isObject(value) {
    return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object' && value !== null;
  }

  /**
   * Accepts a value that may or may not be an array. If it is not an array,
   * it is returned as the first item in a single-item array.
   * @param {*} value The value to convert to an array if it is not.
   * @return {!Array} The array-ified value.
   */
  function toArray(value) {
    return Array.isArray(value) ? value : [value];
  }

  /**
   * @return {number} The current date timestamp
   */
  function now() {
    return +new Date();
  }

  /*eslint-disable */
  // https://gist.github.com/jed/982883
  /** @param {?=} a */
  var uuid = function b(a) {
    return a ? (a ^ Math.random() * 16 >> a / 4).toString(16) : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, b);
  };
  /* harmony export (immutable) */__webpack_exports__["k"] = uuid;

  /*eslint-enable */

  /***/
},
/* 1 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";
  /* harmony export (immutable) */
  __webpack_exports__["a"] = provide;
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__constants__ = __webpack_require__(5);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__utilities__ = __webpack_require__(0);
  /**
   * Copyright 2016 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *     http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  /**
   * Provides a plugin for use with analytics.js, accounting for the possibility
   * that the global command queue has been renamed or not yet defined.
   * @param {string} pluginName The plugin name identifier.
   * @param {Function} pluginConstructor The plugin constructor function.
   */
  function provide(pluginName, pluginConstructor) {
    var gaAlias = window.GoogleAnalyticsObject || 'ga';
    window[gaAlias] = window[gaAlias] || function () {
      for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      (window[gaAlias].q = window[gaAlias].q || []).push(args);
    };

    // Adds the autotrack dev ID if not already included.
    window.gaDevIds = window.gaDevIds || [];
    if (window.gaDevIds.indexOf(__WEBPACK_IMPORTED_MODULE_0__constants__["a" /* DEV_ID */]) < 0) {
      window.gaDevIds.push(__WEBPACK_IMPORTED_MODULE_0__constants__["a" /* DEV_ID */]);
    }

    // Formally provides the plugin for use with analytics.js.
    window[gaAlias]('provide', pluginName, pluginConstructor);

    // Registers the plugin on the global gaplugins object.
    window.gaplugins = window.gaplugins || {};
    window.gaplugins[Object(__WEBPACK_IMPORTED_MODULE_1__utilities__["b" /* capitalize */])(pluginName)] = pluginConstructor;
  }

  /***/
},
/* 2 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";
  /* harmony export (immutable) */
  __webpack_exports__["b"] = trackUsage;
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__constants__ = __webpack_require__(5);
  /**
   * Copyright 2016 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *     http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  var plugins = {
    CLEAN_URL_TRACKER: 1,
    EVENT_TRACKER: 2,
    IMPRESSION_TRACKER: 3,
    MEDIA_QUERY_TRACKER: 4,
    OUTBOUND_FORM_TRACKER: 5,
    OUTBOUND_LINK_TRACKER: 6,
    PAGE_VISIBILITY_TRACKER: 7,
    SOCIAL_WIDGET_TRACKER: 8,
    URL_CHANGE_TRACKER: 9,
    MAX_SCROLL_TRACKER: 10
  };
  /* harmony export (immutable) */__webpack_exports__["a"] = plugins;

  var PLUGIN_COUNT = Object.keys(plugins).length;

  /**
   * Tracks the usage of the passed plugin by encoding a value into a usage
   * string sent with all hits for the passed tracker.
   * @param {!Tracker} tracker The analytics.js tracker object.
   * @param {number} plugin The plugin enum.
   */
  function trackUsage(tracker, plugin) {
    trackVersion(tracker);
    trackPlugin(tracker, plugin);
  }

  /**
   * Converts a hexadecimal string to a binary string.
   * @param {string} hex A hexadecimal numeric string.
   * @return {string} a binary numeric string.
   */
  function convertHexToBin(hex) {
    return parseInt(hex || '0', 16).toString(2);
  }

  /**
   * Converts a binary string to a hexadecimal string.
   * @param {string} bin A binary numeric string.
   * @return {string} a hexadecimal numeric string.
   */
  function convertBinToHex(bin) {
    return parseInt(bin || '0', 2).toString(16);
  }

  /**
   * Adds leading zeros to a string if it's less than a minimum length.
   * @param {string} str A string to pad.
   * @param {number} len The minimum length of the string
   * @return {string} The padded string.
   */
  function padZeros(str, len) {
    if (str.length < len) {
      var toAdd = len - str.length;
      while (toAdd) {
        str = '0' + str;
        toAdd--;
      }
    }
    return str;
  }

  /**
   * Accepts a binary numeric string and flips the digit from 0 to 1 at the
   * specified index.
   * @param {string} str The binary numeric string.
   * @param {number} index The index to flip the bit.
   * @return {string} The new binary string with the bit flipped on
   */
  function flipBitOn(str, index) {
    return str.substr(0, index) + 1 + str.substr(index + 1);
  }

  /**
   * Accepts a tracker and a plugin index and flips the bit at the specified
   * index on the tracker's usage parameter.
   * @param {Object} tracker An analytics.js tracker.
   * @param {number} pluginIndex The index of the plugin in the global list.
   */
  function trackPlugin(tracker, pluginIndex) {
    var usageHex = tracker.get('&' + __WEBPACK_IMPORTED_MODULE_0__constants__["c" /* USAGE_PARAM */]);
    var usageBin = padZeros(convertHexToBin(usageHex), PLUGIN_COUNT);

    // Flip the bit of the plugin being tracked.
    usageBin = flipBitOn(usageBin, PLUGIN_COUNT - pluginIndex);

    // Stores the modified usage string back on the tracker.
    tracker.set('&' + __WEBPACK_IMPORTED_MODULE_0__constants__["c" /* USAGE_PARAM */], convertBinToHex(usageBin));
  }

  /**
   * Accepts a tracker and adds the current version to the version param.
   * @param {Object} tracker An analytics.js tracker.
   */
  function trackVersion(tracker) {
    tracker.set('&' + __WEBPACK_IMPORTED_MODULE_0__constants__["e" /* VERSION_PARAM */], __WEBPACK_IMPORTED_MODULE_0__constants__["d" /* VERSION */]);
  }

  /***/
},
/* 3 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";
  /* harmony import */
  var __WEBPACK_IMPORTED_MODULE_0__lib_closest__ = __webpack_require__(8);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__lib_delegate__ = __webpack_require__(17);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_2__lib_dispatch__ = __webpack_require__(18);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_3__lib_get_attributes__ = __webpack_require__(19);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_4__lib_matches__ = __webpack_require__(6);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_5__lib_parents__ = __webpack_require__(9);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_6__lib_parse_url__ = __webpack_require__(20);
  /* unused harmony reexport closest */
  /* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__, "a", function () {
    return __WEBPACK_IMPORTED_MODULE_1__lib_delegate__["a"];
  });
  /* unused harmony reexport dispatch */
  /* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__, "b", function () {
    return __WEBPACK_IMPORTED_MODULE_3__lib_get_attributes__["a"];
  });
  /* unused harmony reexport matches */
  /* unused harmony reexport parents */
  /* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__, "c", function () {
    return __WEBPACK_IMPORTED_MODULE_6__lib_parse_url__["a"];
  });

  /***/
},
/* 4 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";
  /**
   * Copyright 2017 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *     http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  /**
   * @fileoverview
   * The functions exported by this module make it easier (and safer) to override
   * foreign object methods (in a modular way) and respond to or modify their
   * invocation. The primary feature is the ability to override a method without
   * worrying if it's already been overridden somewhere else in the codebase. It
   * also allows for safe restoring of an overridden method by only fully
   * restoring a method once all overrides have been removed.
   */

  var instances = [];

  /**
   * A class that wraps a foreign object method and emit events before and
   * after the original method is called.
   */

  var MethodChain = function () {
    _createClass(MethodChain, null, [{
      key: 'add',

      /**
       * Adds the passed override method to the list of method chain overrides.
       * @param {!Object} context The object containing the method to chain.
       * @param {string} methodName The name of the method on the object.
       * @param {!Function} methodOverride The override method to add.
       */
      value: function add(context, methodName, methodOverride) {
        getOrCreateMethodChain(context, methodName).add(methodOverride);
      }

      /**
       * Removes a method chain added via `add()`. If the override is the
       * only override added, the original method is restored.
       * @param {!Object} context The object containing the method to unchain.
       * @param {string} methodName The name of the method on the object.
       * @param {!Function} methodOverride The override method to remove.
       */

    }, {
      key: 'remove',
      value: function remove(context, methodName, methodOverride) {
        getOrCreateMethodChain(context, methodName).remove(methodOverride);
      }

      /**
       * Wraps a foreign object method and overrides it. Also stores a reference
       * to the original method so it can be restored later.
       * @param {!Object} context The object containing the method.
       * @param {string} methodName The name of the method on the object.
       */

    }]);

    function MethodChain(context, methodName) {
      var _this = this;

      _classCallCheck(this, MethodChain);

      this.context = context;
      this.methodName = methodName;
      this.isTask = /Task$/.test(methodName);

      this.originalMethodReference = this.isTask ? context.get(methodName) : context[methodName];

      this.methodChain = [];
      this.boundMethodChain = [];

      // Wraps the original method.
      this.wrappedMethod = function () {
        var lastBoundMethod = _this.boundMethodChain[_this.boundMethodChain.length - 1];

        return lastBoundMethod.apply(undefined, arguments);
      };

      // Override original method with the wrapped one.
      if (this.isTask) {
        context.set(methodName, this.wrappedMethod);
      } else {
        context[methodName] = this.wrappedMethod;
      }
    }

    /**
     * Adds a method to the method chain.
     * @param {!Function} overrideMethod The override method to add.
     */


    _createClass(MethodChain, [{
      key: 'add',
      value: function add(overrideMethod) {
        this.methodChain.push(overrideMethod);
        this.rebindMethodChain();
      }

      /**
       * Removes a method from the method chain and restores the prior order.
       * @param {!Function} overrideMethod The override method to remove.
       */

    }, {
      key: 'remove',
      value: function remove(overrideMethod) {
        var index = this.methodChain.indexOf(overrideMethod);
        if (index > -1) {
          this.methodChain.splice(index, 1);
          if (this.methodChain.length > 0) {
            this.rebindMethodChain();
          } else {
            this.destroy();
          }
        }
      }

      /**
       * Loops through the method chain array and recreates the bound method
       * chain array. This is necessary any time a method is added or removed
       * to ensure proper original method context and order.
       */

    }, {
      key: 'rebindMethodChain',
      value: function rebindMethodChain() {
        this.boundMethodChain = [];
        for (var method, i = 0; method = this.methodChain[i]; i++) {
          var previousMethod = this.boundMethodChain[i - 1] || this.originalMethodReference.bind(this.context);
          this.boundMethodChain.push(method(previousMethod));
        }
      }

      /**
       * Calls super and destroys the instance if no registered handlers remain.
       */

    }, {
      key: 'destroy',
      value: function destroy() {
        var index = instances.indexOf(this);
        if (index > -1) {
          instances.splice(index, 1);
          if (this.isTask) {
            this.context.set(this.methodName, this.originalMethodReference);
          } else {
            this.context[this.methodName] = this.originalMethodReference;
          }
        }
      }
    }]);

    return MethodChain;
  }();
  /* harmony export (immutable) */

  __webpack_exports__["a"] = MethodChain;

  /**
   * Gets a MethodChain instance for the passed object and method. If the method
   * has already been wrapped via an existing MethodChain instance, that
   * instance is returned.
   * @param {!Object} context The object containing the method.
   * @param {string} methodName The name of the method on the object.
   * @return {!MethodChain}
   */
  function getOrCreateMethodChain(context, methodName) {
    var methodChain = instances.filter(function (h) {
      return h.context == context && h.methodName == methodName;
    })[0];

    if (!methodChain) {
      methodChain = new MethodChain(context, methodName);
      instances.push(methodChain);
    }
    return methodChain;
  }

  /***/
},
/* 5 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";
  /**
   * Copyright 2016 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *     http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  var VERSION = '2.4.1';
  /* harmony export (immutable) */__webpack_exports__["d"] = VERSION;

  var DEV_ID = 'i5iSjo';
  /* harmony export (immutable) */__webpack_exports__["a"] = DEV_ID;

  var VERSION_PARAM = '_av';
  /* harmony export (immutable) */__webpack_exports__["e"] = VERSION_PARAM;

  var USAGE_PARAM = '_au';
  /* harmony export (immutable) */__webpack_exports__["c"] = USAGE_PARAM;

  var NULL_DIMENSION = '(not set)';
  /* harmony export (immutable) */__webpack_exports__["b"] = NULL_DIMENSION;

  /***/
},
/* 6 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";
  /* harmony export (immutable) */
  __webpack_exports__["a"] = matches;
  var proto = window.Element.prototype;
  var nativeMatches = proto.matches || proto.matchesSelector || proto.webkitMatchesSelector || proto.mozMatchesSelector || proto.msMatchesSelector || proto.oMatchesSelector;

  /**
   * Tests if a DOM elements matches any of the test DOM elements or selectors.
   * @param {Element} element The DOM element to test.
   * @param {Element|string|Array<Element|string>} test A DOM element, a CSS
   *     selector, or an array of DOM elements or CSS selectors to match against.
   * @return {boolean} True of any part of the test matches.
   */
  function matches(element, test) {
    // Validate input.
    if (element && element.nodeType == 1 && test) {
      // if test is a string or DOM element test it.
      if (typeof test == 'string' || test.nodeType == 1) {
        return element == test || matchesSelector(element, /** @type {string} */test);
      } else if ('length' in test) {
        // if it has a length property iterate over the items
        // and return true if any match.
        for (var i = 0, item; item = test[i]; i++) {
          if (element == item || matchesSelector(element, item)) return true;
        }
      }
    }
    // Still here? Return false
    return false;
  }

  /**
   * Tests whether a DOM element matches a selector. This polyfills the native
   * Element.prototype.matches method across browsers.
   * @param {!Element} element The DOM element to test.
   * @param {string} selector The CSS selector to test element against.
   * @return {boolean} True if the selector matches.
   */
  function matchesSelector(element, selector) {
    if (typeof selector != 'string') return false;
    if (nativeMatches) return nativeMatches.call(element, selector);
    var nodes = element.parentNode.querySelectorAll(selector);
    for (var i = 0, node; node = nodes[i]; i++) {
      if (node == element) return true;
    }
    return false;
  }

  /***/
},
/* 7 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";
  /* harmony import */
  var __WEBPACK_IMPORTED_MODULE_0__event_emitter__ = __webpack_require__(23);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__utilities__ = __webpack_require__(0);
  /**
   * Copyright 2016 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *     http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  var AUTOTRACK_PREFIX = 'autotrack';
  var instances = {};
  var isListening = false;

  /** @type {boolean|undefined} */
  var browserSupportsLocalStorage = void 0;

  /**
   * A storage object to simplify interacting with localStorage.
   */

  var Store = function (_WEBPACK_IMPORTED_MO) {
    _inherits(Store, _WEBPACK_IMPORTED_MO);

    _createClass(Store, null, [{
      key: 'getOrCreate',

      /**
       * Gets an existing instance for the passed arguements or creates a new
       * instance if one doesn't exist.
       * @param {string} trackingId The tracking ID for the GA property.
       * @param {string} namespace A namespace unique to this store.
       * @param {Object=} defaults An optional object of key/value defaults.
       * @return {Store} The Store instance.
       */
      value: function getOrCreate(trackingId, namespace, defaults) {
        var key = [AUTOTRACK_PREFIX, trackingId, namespace].join(':');

        // Don't create multiple instances for the same tracking Id and namespace.
        if (!instances[key]) {
          instances[key] = new Store(key, defaults);
          if (!isListening) initStorageListener();
        }
        return instances[key];
      }

      /**
       * Returns true if the browser supports and can successfully write to
       * localStorage. The results is cached so this method can be invoked many
       * times with no extra performance cost.
       * @private
       * @return {boolean}
       */

    }, {
      key: 'isSupported_',
      value: function isSupported_() {
        if (browserSupportsLocalStorage != null) {
          return browserSupportsLocalStorage;
        }

        try {
          window.localStorage.setItem(AUTOTRACK_PREFIX, AUTOTRACK_PREFIX);
          window.localStorage.removeItem(AUTOTRACK_PREFIX);
          browserSupportsLocalStorage = true;
        } catch (err) {
          browserSupportsLocalStorage = false;
        }
        return browserSupportsLocalStorage;
      }

      /**
       * Wraps the native localStorage method for each stubbing in tests.
       * @private
       * @param {string} key The store key.
       * @return {string|null} The stored value.
       */

    }, {
      key: 'get_',
      value: function get_(key) {
        return window.localStorage.getItem(key);
      }

      /**
       * Wraps the native localStorage method for each stubbing in tests.
       * @private
       * @param {string} key The store key.
       * @param {string} value The value to store.
       */

    }, {
      key: 'set_',
      value: function set_(key, value) {
        window.localStorage.setItem(key, value);
      }

      /**
       * Wraps the native localStorage method for each stubbing in tests.
       * @private
       * @param {string} key The store key.
       */

    }, {
      key: 'clear_',
      value: function clear_(key) {
        window.localStorage.removeItem(key);
      }

      /**
       * @param {string} key A key unique to this store.
       * @param {Object=} defaults An optional object of key/value defaults.
       */

    }]);

    function Store(key) {
      var defaults = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _classCallCheck(this, Store);

      var _this2 = _possibleConstructorReturn(this, (Store.__proto__ || Object.getPrototypeOf(Store)).call(this));

      _this2.key_ = key;
      _this2.defaults_ = defaults;

      /** @type {?Object} */
      _this2.cache_ = null; // Will be set after the first get.
      return _this2;
    }

    /**
     * Gets the data stored in localStorage for this store. If the cache is
     * already populated, return it as is (since it's always kept up-to-date
     * and in sync with activity in other windows via the `storage` event).
     * TODO(philipwalton): Implement schema migrations if/when a new
     * schema version is introduced.
     * @return {!Object} The stored data merged with the defaults.
     */


    _createClass(Store, [{
      key: 'get',
      value: function get() {
        if (this.cache_) {
          return this.cache_;
        } else {
          if (Store.isSupported_()) {
            try {
              this.cache_ = parse(Store.get_(this.key_));
            } catch (err) {
              // Do nothing.
            }
          }
          return this.cache_ = Object(__WEBPACK_IMPORTED_MODULE_1__utilities__["a" /* assign */])({}, this.defaults_, this.cache_);
        }
      }

      /**
       * Saves the passed data object to localStorage,
       * merging it with the existing data.
       * @param {Object} newData The data to save.
       */

    }, {
      key: 'set',
      value: function set(newData) {
        this.cache_ = Object(__WEBPACK_IMPORTED_MODULE_1__utilities__["a" /* assign */])({}, this.defaults_, this.cache_, newData);

        if (Store.isSupported_()) {
          try {
            Store.set_(this.key_, JSON.stringify(this.cache_));
          } catch (err) {
            // Do nothing.
          }
        }
      }

      /**
       * Clears the data in localStorage for the current store.
       */

    }, {
      key: 'clear',
      value: function clear() {
        this.cache_ = {};
        if (Store.isSupported_()) {
          try {
            Store.clear_(this.key_);
          } catch (err) {
            // Do nothing.
          }
        }
      }

      /**
       * Removes the store instance for the global instances map. If this is the
       * last store instance, the storage listener is also removed.
       * Note: this does not erase the stored data. Use `clear()` for that.
       */

    }, {
      key: 'destroy',
      value: function destroy() {
        delete instances[this.key_];
        if (!Object.keys(instances).length) {
          removeStorageListener();
        }
      }
    }]);

    return Store;
  }(__WEBPACK_IMPORTED_MODULE_0__event_emitter__["a" /* default */]);
  /* harmony export (immutable) */

  __webpack_exports__["a"] = Store;

  /**
   * Adds a single storage event listener and flips the global `isListening`
   * flag so multiple events aren't added.
   */
  function initStorageListener() {
    window.addEventListener('storage', storageListener);
    isListening = true;
  }

  /**
   * Removes the storage event listener and flips the global `isListening`
   * flag so it can be re-added later.
   */
  function removeStorageListener() {
    window.removeEventListener('storage', storageListener);
    isListening = false;
  }

  /**
   * The global storage event listener.
   * @param {!Event} event The DOM event.
   */
  function storageListener(event) {
    var store = instances[event.key];
    if (store) {
      var oldData = Object(__WEBPACK_IMPORTED_MODULE_1__utilities__["a" /* assign */])({}, store.defaults_, parse(event.oldValue));
      var newData = Object(__WEBPACK_IMPORTED_MODULE_1__utilities__["a" /* assign */])({}, store.defaults_, parse(event.newValue));

      store.cache_ = newData;
      store.emit('externalSet', newData, oldData);
    }
  }

  /**
   * Parses a source string as JSON
   * @param {string|null} source
   * @return {!Object} The JSON object.
   */
  function parse(source) {
    var data = {};
    if (source) {
      try {
        data = /** @type {!Object} */JSON.parse(source);
      } catch (err) {
        // Do nothing.
      }
    }
    return data;
  }

  /***/
},
/* 8 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";
  /* harmony export (immutable) */
  __webpack_exports__["a"] = closest;
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__matches__ = __webpack_require__(6);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__parents__ = __webpack_require__(9);

  /**
   * Gets the closest parent element that matches the passed selector.
   * @param {Element} element The element whose parents to check.
   * @param {string} selector The CSS selector to match against.
   * @param {boolean=} shouldCheckSelf True if the selector should test against
   *     the passed element itself.
   * @return {Element|undefined} The matching element or undefined.
   */
  function closest(element, selector) {
    var shouldCheckSelf = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    if (!(element && element.nodeType == 1 && selector)) return;
    var parentElements = (shouldCheckSelf ? [element] : []).concat(Object(__WEBPACK_IMPORTED_MODULE_1__parents__["a" /* default */])(element));

    for (var i = 0, parent; parent = parentElements[i]; i++) {
      if (Object(__WEBPACK_IMPORTED_MODULE_0__matches__["a" /* default */])(parent, selector)) return parent;
    }
  }

  /***/
},
/* 9 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";
  /* harmony export (immutable) */
  __webpack_exports__["a"] = parents;
  /**
   * Returns an array of a DOM element's parent elements.
   * @param {!Element} element The DOM element whose parents to get.
   * @return {!Array} An array of all parent elemets, or an empty array if no
   *     parent elements are found.
   */
  function parents(element) {
    var list = [];
    while (element && element.parentNode && element.parentNode.nodeType == 1) {
      element = /** @type {!Element} */element.parentNode;
      list.push(element);
    }
    return list;
  }

  /***/
},
/* 10 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";
  /* harmony import */
  var __WEBPACK_IMPORTED_MODULE_0_dom_utils__ = __webpack_require__(3);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__method_chain__ = __webpack_require__(4);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_2__provide__ = __webpack_require__(1);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_3__session__ = __webpack_require__(11);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_4__store__ = __webpack_require__(7);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_5__usage__ = __webpack_require__(2);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_6__utilities__ = __webpack_require__(0);
  /**
   * Copyright 2017 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *     http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  /**
   * Class for the `maxScrollQueryTracker` analytics.js plugin.
   * @implements {MaxScrollTrackerPublicInterface}
   */

  var MaxScrollTracker = function () {
    /**
     * Registers outbound link tracking on tracker object.
     * @param {!Tracker} tracker Passed internally by analytics.js
     * @param {?Object} opts Passed by the require command.
     */
    function MaxScrollTracker(tracker, opts) {
      _classCallCheck(this, MaxScrollTracker);

      Object(__WEBPACK_IMPORTED_MODULE_5__usage__["b" /* trackUsage */])(tracker, __WEBPACK_IMPORTED_MODULE_5__usage__["a" /* plugins */].MAX_SCROLL_TRACKER);

      // Feature detects to prevent errors in unsupporting browsers.
      if (!window.addEventListener) return;

      /** @type {MaxScrollTrackerOpts} */
      var defaultOpts = {
        increaseThreshold: 20,
        sessionTimeout: __WEBPACK_IMPORTED_MODULE_3__session__["a" /* default */].DEFAULT_TIMEOUT,
        // timeZone: undefined,
        // maxScrollMetricIndex: undefined,
        fieldsObj: {}
        // hitFilter: undefined
      };

      this.opts = /** @type {MaxScrollTrackerOpts} */Object(__WEBPACK_IMPORTED_MODULE_6__utilities__["a" /* assign */])(defaultOpts, opts);

      this.tracker = tracker;
      this.pagePath = this.getPagePath();

      // Binds methods to `this`.
      this.handleScroll = Object(__WEBPACK_IMPORTED_MODULE_6__utilities__["d" /* debounce */])(this.handleScroll.bind(this), 500);
      this.trackerSetOverride = this.trackerSetOverride.bind(this);

      // Creates the store and binds storage change events.
      this.store = __WEBPACK_IMPORTED_MODULE_4__store__["a" /* default */].getOrCreate(tracker.get('trackingId'), 'plugins/max-scroll-tracker');

      // Creates the session and binds session events.
      this.session = __WEBPACK_IMPORTED_MODULE_3__session__["a" /* default */].getOrCreate(tracker, this.opts.sessionTimeout, this.opts.timeZone);

      // Override the built-in tracker.set method to watch for changes.
      __WEBPACK_IMPORTED_MODULE_1__method_chain__["a" /* default */].add(tracker, 'set', this.trackerSetOverride);

      this.listenForMaxScrollChanges();
    }

    /**
     * Adds a scroll event listener if the max scroll percentage for the
     * current page isn't already at 100%.
     */


    _createClass(MaxScrollTracker, [{
      key: 'listenForMaxScrollChanges',
      value: function listenForMaxScrollChanges() {
        var maxScrollPercentage = this.getMaxScrollPercentageForCurrentPage();
        if (maxScrollPercentage < 100) {
          window.addEventListener('scroll', this.handleScroll);
        }
      }

      /**
       * Removes an added scroll listener.
       */

    }, {
      key: 'stopListeningForMaxScrollChanges',
      value: function stopListeningForMaxScrollChanges() {
        window.removeEventListener('scroll', this.handleScroll);
      }

      /**
       * Handles the scroll event. If the current scroll percentage is greater
       * that the stored scroll event by at least the specified increase threshold,
       * send an event with the increase amount.
       */

    }, {
      key: 'handleScroll',
      value: function handleScroll() {
        var pageHeight = getPageHeight();
        var scrollPos = window.pageYOffset; // scrollY isn't supported in IE.
        var windowHeight = window.innerHeight;

        // Ensure scrollPercentage is an integer between 0 and 100.
        var scrollPercentage = Math.min(100, Math.max(0, Math.round(100 * (scrollPos / (pageHeight - windowHeight)))));

        // If the max scroll data gets out of the sync with the session data
        // (for whatever reason), clear it.
        var sessionId = this.session.getId();
        if (sessionId != this.store.get().sessionId) {
          this.store.clear();
          this.store.set({ sessionId: sessionId });
        }

        // If the session has expired, clear the stored data and don't send any
        // events (since they'd start a new session). Note: this check is needed,
        // in addition to the above check, to handle cases where the session IDs
        // got out of sync, but the session didn't expire.
        if (this.session.isExpired(this.store.get().sessionId)) {
          this.store.clear();
        } else {
          var maxScrollPercentage = this.getMaxScrollPercentageForCurrentPage();

          if (scrollPercentage > maxScrollPercentage) {
            if (scrollPercentage == 100 || maxScrollPercentage == 100) {
              this.stopListeningForMaxScrollChanges();
            }
            var increaseAmount = scrollPercentage - maxScrollPercentage;
            if (scrollPercentage == 100 || increaseAmount >= this.opts.increaseThreshold) {
              this.setMaxScrollPercentageForCurrentPage(scrollPercentage);
              this.sendMaxScrollEvent(increaseAmount, scrollPercentage);
            }
          }
        }
      }

      /**
       * Detects changes to the tracker object and triggers an update if the page
       * field has changed.
       * @param {function((Object|string), (string|undefined))} originalMethod
       *     A reference to the overridden method.
       * @return {function((Object|string), (string|undefined))}
       */

    }, {
      key: 'trackerSetOverride',
      value: function trackerSetOverride(originalMethod) {
        var _this3 = this;

        return function (field, value) {
          originalMethod(field, value);

          /** @type {!FieldsObj} */
          var fields = Object(__WEBPACK_IMPORTED_MODULE_6__utilities__["h" /* isObject */])(field) ? field : _defineProperty({}, field, value);
          if (fields.page) {
            var lastPagePath = _this3.pagePath;
            _this3.pagePath = _this3.getPagePath();

            if (_this3.pagePath != lastPagePath) {
              // Since event listeners for the same function are never added twice,
              // we don't need to worry about whether we're already listening. We
              // can just add the event listener again.
              _this3.listenForMaxScrollChanges();
            }
          }
        };
      }

      /**
       * Sends an event for the increased max scroll percentage amount.
       * @param {number} increaseAmount
       * @param {number} scrollPercentage
       */

    }, {
      key: 'sendMaxScrollEvent',
      value: function sendMaxScrollEvent(increaseAmount, scrollPercentage) {
        /** @type {FieldsObj} */
        var defaultFields = {
          transport: 'beacon',
          eventCategory: 'Max Scroll',
          eventAction: 'increase',
          eventValue: increaseAmount,
          eventLabel: String(scrollPercentage),
          nonInteraction: true
        };

        // If a custom metric was specified, set it equal to the event value.
        if (this.opts.maxScrollMetricIndex) {
          defaultFields['metric' + this.opts.maxScrollMetricIndex] = increaseAmount;
        }

        this.tracker.send('event', Object(__WEBPACK_IMPORTED_MODULE_6__utilities__["c" /* createFieldsObj */])(defaultFields, this.opts.fieldsObj, this.tracker, this.opts.hitFilter));
      }

      /**
       * Stores the current max scroll percentage for the current page.
       * @param {number} maxScrollPercentage
       */

    }, {
      key: 'setMaxScrollPercentageForCurrentPage',
      value: function setMaxScrollPercentageForCurrentPage(maxScrollPercentage) {
        var _store$set;

        this.store.set((_store$set = {}, _defineProperty(_store$set, this.pagePath, maxScrollPercentage), _defineProperty(_store$set, 'sessionId', this.session.getId()), _store$set));
      }

      /**
       * Gets the stored max scroll percentage for the current page.
       * @return {number}
       */

    }, {
      key: 'getMaxScrollPercentageForCurrentPage',
      value: function getMaxScrollPercentageForCurrentPage() {
        return this.store.get()[this.pagePath] || 0;
      }

      /**
       * Gets the page path from the tracker object.
       * @return {number}
       */

    }, {
      key: 'getPagePath',
      value: function getPagePath() {
        var url = Object(__WEBPACK_IMPORTED_MODULE_0_dom_utils__["c" /* parseUrl */])(this.tracker.get('page') || this.tracker.get('location'));
        return url.pathname + url.search;
      }

      /**
       * Removes all event listeners and restores overridden methods.
       */

    }, {
      key: 'remove',
      value: function remove() {
        this.session.destroy();
        this.stopListeningForMaxScrollChanges();
        __WEBPACK_IMPORTED_MODULE_1__method_chain__["a" /* default */].remove(this.tracker, 'set', this.trackerSetOverride);
      }
    }]);

    return MaxScrollTracker;
  }();

  Object(__WEBPACK_IMPORTED_MODULE_2__provide__["a" /* default */])('maxScrollTracker', MaxScrollTracker);

  /**
   * Gets the maximum height of the page including scrollable area.
   * @return {number}
   */
  function getPageHeight() {
    var html = document.documentElement;
    var body = document.body;
    return Math.max(html.offsetHeight, html.scrollHeight, body.offsetHeight, body.scrollHeight);
  }

  /***/
},
/* 11 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";
  /* harmony import */
  var __WEBPACK_IMPORTED_MODULE_0__method_chain__ = __webpack_require__(4);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__store__ = __webpack_require__(7);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_2__utilities__ = __webpack_require__(0);
  /**
   * Copyright 2016 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *     http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  var SECONDS = 1000;
  var MINUTES = 60 * SECONDS;

  var instances = {};

  /**
   * A session management class that helps track session boundaries
   * across multiple open tabs/windows.
   */

  var Session = function () {
    _createClass(Session, null, [{
      key: 'getOrCreate',

      /**
       * Gets an existing instance for the passed arguments or creates a new
       * instance if one doesn't exist.
       * @param {!Tracker} tracker An analytics.js tracker object.
       * @param {number} timeout The session timeout (in minutes). This value
       *     should match what's set in the "Session settings" section of the
       *     Google Analytics admin.
       * @param {string=} timeZone The optional IANA time zone of the view. This
       *     value should match what's set in the "View settings" section of the
       *     Google Analytics admin. (Note: this assumes all views for the property
       *     use the same time zone. If that's not true, it's better not to use
       *     this feature).
       * @return {Session} The Session instance.
       */
      value: function getOrCreate(tracker, timeout, timeZone) {
        // Don't create multiple instances for the same property.
        var trackingId = tracker.get('trackingId');
        if (instances[trackingId]) {
          return instances[trackingId];
        } else {
          return instances[trackingId] = new Session(tracker, timeout, timeZone);
        }
      }

      /**
       * @param {!Tracker} tracker An analytics.js tracker object.
       * @param {number} timeout The session timeout (in minutes). This value
       *     should match what's set in the "Session settings" section of the
       *     Google Analytics admin.
       * @param {string=} timeZone The optional IANA time zone of the view. This
       *     value should match what's set in the "View settings" section of the
       *     Google Analytics admin. (Note: this assumes all views for the property
       *     use the same time zone. If that's not true, it's better not to use
       *     this feature).
       */

    }]);

    function Session(tracker, timeout, timeZone) {
      _classCallCheck(this, Session);

      this.tracker = tracker;
      this.timeout = timeout || Session.DEFAULT_TIMEOUT;
      this.timeZone = timeZone;

      // Binds methods.
      this.sendHitTaskOverride = this.sendHitTaskOverride.bind(this);

      // Overrides into the trackers sendHitTask method.
      __WEBPACK_IMPORTED_MODULE_0__method_chain__["a" /* default */].add(tracker, 'sendHitTask', this.sendHitTaskOverride);

      // Some browser doesn't support various features of the
      // `Intl.DateTimeFormat` API, so we have to try/catch it. Consequently,
      // this allows us to assume the presence of `this.dateTimeFormatter` means
      // it works in the current browser.
      try {
        this.dateTimeFormatter = new Intl.DateTimeFormat('en-US', { timeZone: this.timeZone });
      } catch (err) {}
      // Do nothing.


      /** @type {SessionStoreData} */
      var defaultProps = {
        hitTime: 0,
        isExpired: false
      };
      this.store = __WEBPACK_IMPORTED_MODULE_1__store__["a" /* default */].getOrCreate(tracker.get('trackingId'), 'session', defaultProps);

      // Ensure the session has an ID.
      if (!this.store.get().id) {
        this.store.set( /** @type {SessionStoreData} */{ id: Object(__WEBPACK_IMPORTED_MODULE_2__utilities__["k" /* uuid */])() });
      }
    }

    /**
     * Returns the ID of the current session.
     * @return {string}
     */


    _createClass(Session, [{
      key: 'getId',
      value: function getId() {
        return this.store.get().id;
      }

      /**
       * Accepts a session ID and returns true if the specified session has
       * evidentially expired. A session can expire for two reasons:
       *   - More than 30 minutes has elapsed since the previous hit
       *     was sent (The 30 minutes number is the Google Analytics default, but
       *     it can be modified in GA admin "Session settings").
       *   - A new day has started since the previous hit, in the
       *     specified time zone (should correspond to the time zone of the
       *     property's views).
       *
       * Note: since real session boundaries are determined at processing time,
       * this is just a best guess rather than a source of truth.
       *
       * @param {string} id The ID of a session to check for expiry.
       * @return {boolean} True if the session has not exp
       */

    }, {
      key: 'isExpired',
      value: function isExpired() {
        var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.getId();

        // If a session ID is passed and it doesn't match the current ID,
        // assume it's from an expired session. If no ID is passed, assume the ID
        // of the current session.
        if (id != this.getId()) return true;

        /** @type {SessionStoreData} */
        var sessionData = this.store.get();

        // `isExpired` will be `true` if the sessionControl field was set to
        // 'end' on the previous hit.
        if (sessionData.isExpired) return true;

        var oldHitTime = sessionData.hitTime;

        // Only consider a session expired if previous hit time data exists, and
        // the previous hit time is greater than that session timeout period or
        // the hits occurred on different days in the session timezone.
        if (oldHitTime) {
          var currentDate = new Date();
          var oldHitDate = new Date(oldHitTime);
          if (currentDate - oldHitDate > this.timeout * MINUTES || this.datesAreDifferentInTimezone(currentDate, oldHitDate)) {
            return true;
          }
        }

        // For all other cases return false.
        return false;
      }

      /**
       * Returns true if (and only if) the timezone date formatting is supported
       * in the current browser and if the two dates are definitively not the
       * same date in the session timezone. Anything short of this returns false.
       * @param {!Date} d1
       * @param {!Date} d2
       * @return {boolean}
       */

    }, {
      key: 'datesAreDifferentInTimezone',
      value: function datesAreDifferentInTimezone(d1, d2) {
        if (!this.dateTimeFormatter) {
          return false;
        } else {
          return this.dateTimeFormatter.format(d1) != this.dateTimeFormatter.format(d2);
        }
      }

      /**
       * Keeps track of when the previous hit was sent to determine if a session
       * has expired. Also inspects the `sessionControl` field to handles
       * expiration accordingly.
       * @param {function(!Model)} originalMethod A reference to the overridden
       *     method.
       * @return {function(!Model)}
       */

    }, {
      key: 'sendHitTaskOverride',
      value: function sendHitTaskOverride(originalMethod) {
        var _this4 = this;

        return function (model) {
          originalMethod(model);

          var sessionControl = model.get('sessionControl');
          var sessionWillStart = sessionControl == 'start' || _this4.isExpired();
          var sessionWillEnd = sessionControl == 'end';

          /** @type {SessionStoreData} */
          var sessionData = _this4.store.get();
          sessionData.hitTime = Object(__WEBPACK_IMPORTED_MODULE_2__utilities__["i" /* now */])();
          if (sessionWillStart) {
            sessionData.isExpired = false;
            sessionData.id = Object(__WEBPACK_IMPORTED_MODULE_2__utilities__["k" /* uuid */])();
          }
          if (sessionWillEnd) {
            sessionData.isExpired = true;
          }
          _this4.store.set(sessionData);
        };
      }

      /**
       * Restores the tracker's original `sendHitTask` to the state before
       * session control was initialized and removes this instance from the global
       * store.
       */

    }, {
      key: 'destroy',
      value: function destroy() {
        __WEBPACK_IMPORTED_MODULE_0__method_chain__["a" /* default */].remove(this.tracker, 'sendHitTask', this.sendHitTaskOverride);
        this.store.destroy();
        delete instances[this.tracker.get('trackingId')];
      }
    }]);

    return Session;
  }();
  /* harmony export (immutable) */

  __webpack_exports__["a"] = Session;

  Session.DEFAULT_TIMEOUT = 30; // minutes


  /***/
},
/* 12 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";
  /* harmony import */
  var __WEBPACK_IMPORTED_MODULE_0_dom_utils__ = __webpack_require__(3);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__provide__ = __webpack_require__(1);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_2__usage__ = __webpack_require__(2);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_3__utilities__ = __webpack_require__(0);
  /**
   * Copyright 2016 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *     http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  /**
   * Class for the `outboundFormTracker` analytics.js plugin.
   * @implements {OutboundFormTrackerPublicInterface}
   */

  var OutboundFormTracker = function () {
    /**
     * Registers outbound form tracking.
     * @param {!Tracker} tracker Passed internally by analytics.js
     * @param {?Object} opts Passed by the require command.
     */
    function OutboundFormTracker(tracker, opts) {
      _classCallCheck(this, OutboundFormTracker);

      Object(__WEBPACK_IMPORTED_MODULE_2__usage__["b" /* trackUsage */])(tracker, __WEBPACK_IMPORTED_MODULE_2__usage__["a" /* plugins */].OUTBOUND_FORM_TRACKER);

      // Feature detects to prevent errors in unsupporting browsers.
      if (!window.addEventListener) return;

      /** @type {OutboundFormTrackerOpts} */
      var defaultOpts = {
        formSelector: 'form',
        shouldTrackOutboundForm: this.shouldTrackOutboundForm,
        fieldsObj: {},
        attributePrefix: 'ga-'
        // hitFilter: undefined
      };

      this.opts = /** @type {OutboundFormTrackerOpts} */Object(__WEBPACK_IMPORTED_MODULE_3__utilities__["a" /* assign */])(defaultOpts, opts);

      this.tracker = tracker;

      this.delegate = Object(__WEBPACK_IMPORTED_MODULE_0_dom_utils__["a" /* delegate */])(document, 'submit', this.opts.formSelector, this.handleFormSubmits.bind(this), { composed: true, useCapture: true });
    }

    /**
     * Handles all submits on form elements. A form submit is considered outbound
     * if its action attribute starts with http and does not contain
     * location.hostname.
     * When the beacon transport method is not available, the event's default
     * action is prevented and re-emitted after the hit is sent.
     * @param {Event} event The DOM submit event.
     * @param {Element} form The delegated event target.
     */


    _createClass(OutboundFormTracker, [{
      key: 'handleFormSubmits',
      value: function handleFormSubmits(event, form) {
        var action = Object(__WEBPACK_IMPORTED_MODULE_0_dom_utils__["c" /* parseUrl */])(form.action).href;

        /** @type {FieldsObj} */
        var defaultFields = {
          transport: 'beacon',
          eventCategory: 'Outbound Form',
          eventAction: 'submit',
          eventLabel: action
        };

        if (this.opts.shouldTrackOutboundForm(form, __WEBPACK_IMPORTED_MODULE_0_dom_utils__["c" /* parseUrl */])) {
          if (!navigator.sendBeacon) {
            // Stops the submit and waits until the hit is complete (with timeout)
            // for browsers that don't support beacon.
            event.preventDefault();
            defaultFields.hitCallback = Object(__WEBPACK_IMPORTED_MODULE_3__utilities__["l" /* withTimeout */])(function () {
              form.submit();
            });
          }

          var userFields = Object(__WEBPACK_IMPORTED_MODULE_3__utilities__["a" /* assign */])({}, this.opts.fieldsObj, Object(__WEBPACK_IMPORTED_MODULE_3__utilities__["g" /* getAttributeFields */])(form, this.opts.attributePrefix));

          this.tracker.send('event', Object(__WEBPACK_IMPORTED_MODULE_3__utilities__["c" /* createFieldsObj */])(defaultFields, userFields, this.tracker, this.opts.hitFilter, form, event));
        }
      }

      /**
       * Determines whether or not the tracker should send a hit when a form is
       * submitted. By default, forms with an action attribute that starts with
       * "http" and doesn't contain the current hostname are tracked.
       * @param {Element} form The form that was submitted.
       * @param {Function} parseUrlFn A cross-browser utility method for url
       *     parsing (note: renamed to disambiguate when compiling).
       * @return {boolean} Whether or not the form should be tracked.
       */

    }, {
      key: 'shouldTrackOutboundForm',
      value: function shouldTrackOutboundForm(form, parseUrlFn) {
        var url = parseUrlFn(form.action);
        return url.hostname != location.hostname && url.protocol.slice(0, 4) == 'http';
      }

      /**
       * Removes all event listeners and instance properties.
       */

    }, {
      key: 'remove',
      value: function remove() {
        this.delegate.destroy();
      }
    }]);

    return OutboundFormTracker;
  }();

  Object(__WEBPACK_IMPORTED_MODULE_1__provide__["a" /* default */])('outboundFormTracker', OutboundFormTracker);

  /***/
},
/* 13 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";
  /* harmony import */
  var __WEBPACK_IMPORTED_MODULE_0_dom_utils__ = __webpack_require__(3);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__provide__ = __webpack_require__(1);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_2__usage__ = __webpack_require__(2);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_3__utilities__ = __webpack_require__(0);
  /**
   * Copyright 2016 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *     http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  /**
   * Class for the `outboundLinkTracker` analytics.js plugin.
   * @implements {OutboundLinkTrackerPublicInterface}
   */

  var OutboundLinkTracker = function () {
    /**
     * Registers outbound link tracking on a tracker object.
     * @param {!Tracker} tracker Passed internally by analytics.js
     * @param {?Object} opts Passed by the require command.
     */
    function OutboundLinkTracker(tracker, opts) {
      var _this5 = this;

      _classCallCheck(this, OutboundLinkTracker);

      Object(__WEBPACK_IMPORTED_MODULE_2__usage__["b" /* trackUsage */])(tracker, __WEBPACK_IMPORTED_MODULE_2__usage__["a" /* plugins */].OUTBOUND_LINK_TRACKER);

      // Feature detects to prevent errors in unsupporting browsers.
      if (!window.addEventListener) return;

      /** @type {OutboundLinkTrackerOpts} */
      var defaultOpts = {
        events: ['click'],
        linkSelector: 'a, area',
        shouldTrackOutboundLink: this.shouldTrackOutboundLink,
        fieldsObj: {},
        attributePrefix: 'ga-'
        // hitFilter: undefined,
      };

      this.opts = /** @type {OutboundLinkTrackerOpts} */Object(__WEBPACK_IMPORTED_MODULE_3__utilities__["a" /* assign */])(defaultOpts, opts);

      this.tracker = tracker;

      // Binds methods.
      this.handleLinkInteractions = this.handleLinkInteractions.bind(this);

      // Creates a mapping of events to their delegates
      this.delegates = {};
      this.opts.events.forEach(function (event) {
        _this5.delegates[event] = Object(__WEBPACK_IMPORTED_MODULE_0_dom_utils__["a" /* delegate */])(document, event, _this5.opts.linkSelector, _this5.handleLinkInteractions, { composed: true, useCapture: true });
      });
    }

    /**
     * Handles all interactions on link elements. A link is considered an outbound
     * link if its hostname property does not match location.hostname. When the
     * beacon transport method is not available, the links target is set to
     * "_blank" to ensure the hit can be sent.
     * @param {Event} event The DOM click event.
     * @param {Element} link The delegated event target.
     */


    _createClass(OutboundLinkTracker, [{
      key: 'handleLinkInteractions',
      value: function handleLinkInteractions(event, link) {
        var _this6 = this;

        if (this.opts.shouldTrackOutboundLink(link, __WEBPACK_IMPORTED_MODULE_0_dom_utils__["c" /* parseUrl */])) {
          var href = link.getAttribute('href') || link.getAttribute('xlink:href');
          var url = Object(__WEBPACK_IMPORTED_MODULE_0_dom_utils__["c" /* parseUrl */])(href);

          /** @type {FieldsObj} */
          var defaultFields = {
            transport: 'beacon',
            eventCategory: 'Outbound Link',
            eventAction: event.type,
            eventLabel: url.href
          };

          /** @type {FieldsObj} */
          var userFields = Object(__WEBPACK_IMPORTED_MODULE_3__utilities__["a" /* assign */])({}, this.opts.fieldsObj, Object(__WEBPACK_IMPORTED_MODULE_3__utilities__["g" /* getAttributeFields */])(link, this.opts.attributePrefix));

          var fieldsObj = Object(__WEBPACK_IMPORTED_MODULE_3__utilities__["c" /* createFieldsObj */])(defaultFields, userFields, this.tracker, this.opts.hitFilter, link, event);

          if (!navigator.sendBeacon && linkClickWillUnloadCurrentPage(event, link)) {
            // Adds a new event handler at the last minute to minimize the chances
            // that another event handler for this click will run after this logic.
            var clickHandler = function clickHandler() {
              window.removeEventListener('click', clickHandler);

              // Checks to make sure another event handler hasn't already prevented
              // the default action. If it has the custom redirect isn't needed.
              if (!event.defaultPrevented) {
                // Stops the click and waits until the hit is complete (with
                // timeout) for browsers that don't support beacon.
                event.preventDefault();

                var oldHitCallback = fieldsObj.hitCallback;
                fieldsObj.hitCallback = Object(__WEBPACK_IMPORTED_MODULE_3__utilities__["l" /* withTimeout */])(function () {
                  if (typeof oldHitCallback == 'function') oldHitCallback();
                  location.href = href;
                });
              }
              _this6.tracker.send('event', fieldsObj);
            };
            window.addEventListener('click', clickHandler);
          } else {
            this.tracker.send('event', fieldsObj);
          }
        }
      }

      /**
       * Determines whether or not the tracker should send a hit when a link is
       * clicked. By default links with a hostname property not equal to the current
       * hostname are tracked.
       * @param {Element} link The link that was clicked on.
       * @param {Function} parseUrlFn A cross-browser utility method for url
       *     parsing (note: renamed to disambiguate when compiling).
       * @return {boolean} Whether or not the link should be tracked.
       */

    }, {
      key: 'shouldTrackOutboundLink',
      value: function shouldTrackOutboundLink(link, parseUrlFn) {
        var href = link.getAttribute('href') || link.getAttribute('xlink:href');
        var url = parseUrlFn(href);
        return url.hostname != location.hostname && url.protocol.slice(0, 4) == 'http';
      }

      /**
       * Removes all event listeners and instance properties.
       */

    }, {
      key: 'remove',
      value: function remove() {
        var _this7 = this;

        Object.keys(this.delegates).forEach(function (key) {
          _this7.delegates[key].destroy();
        });
      }
    }]);

    return OutboundLinkTracker;
  }();

  Object(__WEBPACK_IMPORTED_MODULE_1__provide__["a" /* default */])('outboundLinkTracker', OutboundLinkTracker);

  /**
   * Determines if a link click event will cause the current page to upload.
   * Note: most link clicks *will* cause the current page to unload because they
   * initiate a page navigation. The most common reason a link click won't cause
   * the page to unload is if the clicked was to open the link in a new tab.
   * @param {Event} event The DOM event.
   * @param {Element} link The link element clicked on.
   * @return {boolean} True if the current page will be unloaded.
   */
  function linkClickWillUnloadCurrentPage(event, link) {
    return !(
    // The event type can be customized; we only care about clicks here.
    event.type != 'click' ||
    // Links with target="_blank" set will open in a new window/tab.
    link.target == '_blank' ||
    // On mac, command clicking will open a link in a new tab. Control
    // clicking does this on windows.
    event.metaKey || event.ctrlKey ||
    // Shift clicking in Chrome/Firefox opens the link in a new window
    // In Safari it adds the URL to a favorites list.
    event.shiftKey ||
    // On Mac, clicking with the option key is used to download a resouce.
    event.altKey ||
    // Middle mouse button clicks (which == 2) are used to open a link
    // in a new tab, and right clicks (which == 3) on Firefox trigger
    // a click event.
    event.which > 1);
  }

  /***/
},
/* 14 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";

  Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_0_autotrack__ = __webpack_require__(15);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_1_autotrack_lib_plugins_outbound_link_tracker__ = __webpack_require__(13);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_2_autotrack_lib_plugins_outbound_form_tracker__ = __webpack_require__(12);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_3_autotrack_lib_plugins_max_scroll_tracker__ = __webpack_require__(10);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_4__dist_TrackThis_js__ = __webpack_require__(28);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_4__dist_TrackThis_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__dist_TrackThis_js__);

  ga('require', 'outboundLinkTracker');
  ga('require', 'outboundFormTracker');
  ga('require', 'maxScrollTracker');
  ga('require', 'trackThisIntraPageLink');
  ga('require', 'trackThisLinkProtocol');
  ga('require', 'trackThisFileDownload');
  ga('require', 'trackThisOpenExternalInTab');

  /***/
},
/* 15 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";
  /* harmony import */
  var __WEBPACK_IMPORTED_MODULE_0__plugins_clean_url_tracker__ = __webpack_require__(16);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__plugins_event_tracker__ = __webpack_require__(21);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_2__plugins_impression_tracker__ = __webpack_require__(22);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_3__plugins_max_scroll_tracker__ = __webpack_require__(10);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_4__plugins_media_query_tracker__ = __webpack_require__(24);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_5__plugins_outbound_form_tracker__ = __webpack_require__(12);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_6__plugins_outbound_link_tracker__ = __webpack_require__(13);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_7__plugins_page_visibility_tracker__ = __webpack_require__(25);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_8__plugins_social_widget_tracker__ = __webpack_require__(26);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_9__plugins_url_change_tracker__ = __webpack_require__(27);
  /**
   * Copyright 2016 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *     http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  // Imports all sub-plugins.


  /***/
},
/* 16 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";
  /* harmony import */
  var __WEBPACK_IMPORTED_MODULE_0_dom_utils__ = __webpack_require__(3);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__constants__ = __webpack_require__(5);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_2__method_chain__ = __webpack_require__(4);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_3__provide__ = __webpack_require__(1);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_4__usage__ = __webpack_require__(2);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_5__utilities__ = __webpack_require__(0);
  /**
   * Copyright 2016 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *     http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  /**
   * Class for the `cleanUrlTracker` analytics.js plugin.
   * @implements {CleanUrlTrackerPublicInterface}
   */

  var CleanUrlTracker = function () {
    /**
     * Registers clean URL tracking on a tracker object. The clean URL tracker
     * removes query parameters from the page value reported to Google Analytics.
     * It also helps to prevent tracking similar URLs, e.g. sometimes ending a
     * URL with a slash and sometimes not.
     * @param {!Tracker} tracker Passed internally by analytics.js
     * @param {?CleanUrlTrackerOpts} opts Passed by the require command.
     */
    function CleanUrlTracker(tracker, opts) {
      _classCallCheck(this, CleanUrlTracker);

      Object(__WEBPACK_IMPORTED_MODULE_4__usage__["b" /* trackUsage */])(tracker, __WEBPACK_IMPORTED_MODULE_4__usage__["a" /* plugins */].CLEAN_URL_TRACKER);

      /** @type {CleanUrlTrackerOpts} */
      var defaultOpts = {
        // stripQuery: undefined,
        // queryParamsWhitelist: undefined,
        // queryDimensionIndex: undefined,
        // indexFilename: undefined,
        // trailingSlash: undefined,
        // urlFilter: undefined,
      };
      this.opts = /** @type {CleanUrlTrackerOpts} */Object(__WEBPACK_IMPORTED_MODULE_5__utilities__["a" /* assign */])(defaultOpts, opts);

      this.tracker = tracker;

      /** @type {string|null} */
      this.queryDimension = this.opts.stripQuery && this.opts.queryDimensionIndex ? 'dimension' + this.opts.queryDimensionIndex : null;

      // Binds methods to `this`.
      this.trackerGetOverride = this.trackerGetOverride.bind(this);
      this.buildHitTaskOverride = this.buildHitTaskOverride.bind(this);

      // Override built-in tracker method to watch for changes.
      __WEBPACK_IMPORTED_MODULE_2__method_chain__["a" /* default */].add(tracker, 'get', this.trackerGetOverride);
      __WEBPACK_IMPORTED_MODULE_2__method_chain__["a" /* default */].add(tracker, 'buildHitTask', this.buildHitTaskOverride);
    }

    /**
     * Ensures reads of the tracker object by other plugins always see the
     * "cleaned" versions of all URL fields.
     * @param {function(string):*} originalMethod A reference to the overridden
     *     method.
     * @return {function(string):*}
     */


    _createClass(CleanUrlTracker, [{
      key: 'trackerGetOverride',
      value: function trackerGetOverride(originalMethod) {
        var _this8 = this;

        return function (field) {
          if (field == 'page' || field == _this8.queryDimension) {
            var fieldsObj = /** @type {!FieldsObj} */{
              location: originalMethod('location'),
              page: originalMethod('page')
            };
            var cleanedFieldsObj = _this8.cleanUrlFields(fieldsObj);
            return cleanedFieldsObj[field];
          } else {
            return originalMethod(field);
          }
        };
      }

      /**
       * Cleans URL fields passed in a send command.
       * @param {function(!Model)} originalMethod A reference to the
       *     overridden method.
       * @return {function(!Model)}
       */

    }, {
      key: 'buildHitTaskOverride',
      value: function buildHitTaskOverride(originalMethod) {
        var _this9 = this;

        return function (model) {
          var cleanedFieldsObj = _this9.cleanUrlFields({
            location: model.get('location'),
            page: model.get('page')
          });
          model.set(cleanedFieldsObj, null, true);
          originalMethod(model);
        };
      }

      /**
       * Accepts of fields object containing URL fields and returns a new
       * fields object with the URLs "cleaned" according to the tracker options.
       * @param {!FieldsObj} fieldsObj
       * @return {!FieldsObj}
       */

    }, {
      key: 'cleanUrlFields',
      value: function cleanUrlFields(fieldsObj) {
        var url = Object(__WEBPACK_IMPORTED_MODULE_0_dom_utils__["c" /* parseUrl */])(
        /** @type {string} */fieldsObj.page || fieldsObj.location);

        var pathname = url.pathname;

        // If an index filename was provided, remove it if it appears at the end
        // of the URL.
        if (this.opts.indexFilename) {
          var parts = pathname.split('/');
          if (this.opts.indexFilename == parts[parts.length - 1]) {
            parts[parts.length - 1] = '';
            pathname = parts.join('/');
          }
        }

        // Ensure the URL ends with or doesn't end with slash based on the
        // `trailingSlash` option. Note that filename URLs should never contain
        // a trailing slash.
        if (this.opts.trailingSlash == 'remove') {
          pathname = pathname.replace(/\/+$/, '');
        } else if (this.opts.trailingSlash == 'add') {
          var isFilename = /\.\w+$/.test(pathname);
          if (!isFilename && pathname.substr(-1) != '/') {
            pathname = pathname + '/';
          }
        }

        /** @type {!FieldsObj} */
        var cleanedFieldsObj = {
          page: pathname + (this.opts.stripQuery ? this.stripNonWhitelistedQueryParams(url.search) : url.search)
        };
        if (fieldsObj.location) {
          cleanedFieldsObj.location = fieldsObj.location;
        }
        if (this.queryDimension) {
          cleanedFieldsObj[this.queryDimension] = url.search.slice(1) || __WEBPACK_IMPORTED_MODULE_1__constants__["b" /* NULL_DIMENSION */];
        }

        // Apply the `urlFieldsFilter()` option if passed.
        if (typeof this.opts.urlFieldsFilter == 'function') {
          /** @type {!FieldsObj} */
          var userCleanedFieldsObj = this.opts.urlFieldsFilter(cleanedFieldsObj, __WEBPACK_IMPORTED_MODULE_0_dom_utils__["c" /* parseUrl */]);

          // Ensure only the URL fields are returned.
          var returnValue = {
            page: userCleanedFieldsObj.page,
            location: userCleanedFieldsObj.location
          };
          if (this.queryDimension) {
            returnValue[this.queryDimension] = userCleanedFieldsObj[this.queryDimension];
          }
          return returnValue;
        } else {
          return cleanedFieldsObj;
        }
      }

      /**
       * Accpets a raw URL search string and returns a new search string containing
       * only the site search params (if they exist).
       * @param {string} searchString The URL search string (starting with '?').
       * @return {string} The query string
       */

    }, {
      key: 'stripNonWhitelistedQueryParams',
      value: function stripNonWhitelistedQueryParams(searchString) {
        var _this10 = this;

        if (Array.isArray(this.opts.queryParamsWhitelist)) {
          var foundParams = [];
          searchString.slice(1).split('&').forEach(function (kv) {
            var _kv$split = kv.split('='),
                _kv$split2 = _slicedToArray(_kv$split, 2),
                key = _kv$split2[0],
                value = _kv$split2[1];

            if (_this10.opts.queryParamsWhitelist.indexOf(key) > -1 && value) {
              foundParams.push([key, value]);
            }
          });

          return foundParams.length ? '?' + foundParams.map(function (kv) {
            return kv.join('=');
          }).join('&') : '';
        } else {
          return '';
        }
      }

      /**
       * Restores all overridden tasks and methods.
       */

    }, {
      key: 'remove',
      value: function remove() {
        __WEBPACK_IMPORTED_MODULE_2__method_chain__["a" /* default */].remove(this.tracker, 'get', this.trackerGetOverride);
        __WEBPACK_IMPORTED_MODULE_2__method_chain__["a" /* default */].remove(this.tracker, 'buildHitTask', this.buildHitTaskOverride);
      }
    }]);

    return CleanUrlTracker;
  }();

  Object(__WEBPACK_IMPORTED_MODULE_3__provide__["a" /* default */])('cleanUrlTracker', CleanUrlTracker);

  /***/
},
/* 17 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";
  /* harmony export (immutable) */
  __webpack_exports__["a"] = delegate;
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__closest__ = __webpack_require__(8);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__matches__ = __webpack_require__(6);

  /**
   * Delegates the handling of events for an element matching a selector to an
   * ancestor of the matching element.
   * @param {!Node} ancestor The ancestor element to add the listener to.
   * @param {string} eventType The event type to listen to.
   * @param {string} selector A CSS selector to match against child elements.
   * @param {!Function} callback A function to run any time the event happens.
   * @param {Object=} opts A configuration options object. The available options:
   *     - useCapture<boolean>: If true, bind to the event capture phase.
   *     - deep<boolean>: If true, delegate into shadow trees.
   * @return {Object} The delegate object. It contains a destroy method.
   */
  function delegate(ancestor, eventType, selector, callback) {
    var opts = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};

    // Defines the event listener.
    var listener = function listener(event) {
      var delegateTarget = void 0;

      // If opts.composed is true and the event originated from inside a Shadow
      // tree, check the composed path nodes.
      if (opts.composed && typeof event.composedPath == 'function') {
        var composedPath = event.composedPath();
        for (var i = 0, node; node = composedPath[i]; i++) {
          if (node.nodeType == 1 && Object(__WEBPACK_IMPORTED_MODULE_1__matches__["a" /* default */])(node, selector)) {
            delegateTarget = node;
          }
        }
      } else {
        // Otherwise check the parents.
        delegateTarget = Object(__WEBPACK_IMPORTED_MODULE_0__closest__["a" /* default */])(event.target, selector, true);
      }

      if (delegateTarget) {
        callback.call(delegateTarget, event, delegateTarget);
      }
    };

    ancestor.addEventListener(eventType, listener, opts.useCapture);

    return {
      destroy: function destroy() {
        ancestor.removeEventListener(eventType, listener, opts.useCapture);
      }
    };
  }

  /***/
},
/* 18 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";
  /* unused harmony export default */
  /**
   * Dispatches an event on the passed element.
   * @param {!Element} element The DOM element to dispatch the event on.
   * @param {string} eventType The type of event to dispatch.
   * @param {Object|string=} eventName A string name of the event constructor
   *     to use. Defaults to 'Event' if nothing is passed or 'CustomEvent' if
   *     a value is set on `initDict.detail`. If eventName is given an object
   *     it is assumed to be initDict and thus reassigned.
   * @param {Object=} initDict The initialization attributes for the
   *     event. A `detail` property can be used here to pass custom data.
   * @return {boolean} The return value of `element.dispatchEvent`, which will
   *     be false if any of the event listeners called `preventDefault`.
   */

  function dispatch(element, eventType) {
    var eventName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'Event';
    var initDict = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

    var event = void 0;
    var isCustom = void 0;

    // eventName is optional
    if ((typeof eventName === 'undefined' ? 'undefined' : _typeof(eventName)) == 'object') {
      initDict = eventName;
      eventName = 'Event';
    }

    initDict.bubbles = initDict.bubbles || false;
    initDict.cancelable = initDict.cancelable || false;
    initDict.composed = initDict.composed || false;

    // If a detail property is passed, this is a custom event.
    if ('detail' in initDict) isCustom = true;
    eventName = isCustom ? 'CustomEvent' : eventName;

    // Tries to create the event using constructors, if that doesn't work,
    // fallback to `document.createEvent()`.
    try {
      event = new window[eventName](eventType, initDict);
    } catch (err) {
      event = document.createEvent(eventName);
      var initMethod = 'init' + (isCustom ? 'Custom' : '') + 'Event';
      event[initMethod](eventType, initDict.bubbles, initDict.cancelable, initDict.detail);
    }

    return element.dispatchEvent(event);
  }

  /***/
},
/* 19 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";
  /* harmony export (immutable) */
  __webpack_exports__["a"] = getAttributes;
  /**
   * Gets all attributes of an element as a plain JavaScriot object.
   * @param {Element} element The element whose attributes to get.
   * @return {!Object} An object whose keys are the attribute keys and whose
   *     values are the attribute values. If no attributes exist, an empty
   *     object is returned.
   */
  function getAttributes(element) {
    var attrs = {};

    // Validate input.
    if (!(element && element.nodeType == 1)) return attrs;

    // Return an empty object if there are no attributes.
    var map = element.attributes;
    if (map.length === 0) return {};

    for (var i = 0, attr; attr = map[i]; i++) {
      attrs[attr.name] = attr.value;
    }
    return attrs;
  }

  /***/
},
/* 20 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";
  /* harmony export (immutable) */
  __webpack_exports__["a"] = parseUrl;
  var HTTP_PORT = '80';
  var HTTPS_PORT = '443';
  var DEFAULT_PORT = RegExp(':(' + HTTP_PORT + '|' + HTTPS_PORT + ')$');

  var a = document.createElement('a');
  var cache = {};

  /**
   * Parses the given url and returns an object mimicing a `Location` object.
   * @param {string} url The url to parse.
   * @return {!Object} An object with the same properties as a `Location`.
   */
  function parseUrl(url) {
    // All falsy values (as well as ".") should map to the current URL.
    url = !url || url == '.' ? location.href : url;

    if (cache[url]) return cache[url];

    a.href = url;

    // When parsing file relative paths (e.g. `../index.html`), IE will correctly
    // resolve the `href` property but will keep the `..` in the `path` property.
    // It will also not include the `host` or `hostname` properties. Furthermore,
    // IE will sometimes return no protocol or just a colon, especially for things
    // like relative protocol URLs (e.g. "//google.com").
    // To workaround all of these issues, we reparse with the full URL from the
    // `href` property.
    if (url.charAt(0) == '.' || url.charAt(0) == '/') return parseUrl(a.href);

    // Don't include default ports.
    var port = a.port == HTTP_PORT || a.port == HTTPS_PORT ? '' : a.port;

    // PhantomJS sets the port to "0" when using the file: protocol.
    port = port == '0' ? '' : port;

    // Sometimes IE incorrectly includes a port for default ports
    // (e.g. `:80` or `:443`) even when no port is specified in the URL.
    // http://bit.ly/1rQNoMg
    var host = a.host.replace(DEFAULT_PORT, '');

    // Not all browser support `origin` so we have to build it.
    var origin = a.origin ? a.origin : a.protocol + '//' + host;

    // Sometimes IE doesn't include the leading slash for pathname.
    // http://bit.ly/1rQNoMg
    var pathname = a.pathname.charAt(0) == '/' ? a.pathname : '/' + a.pathname;

    return cache[url] = {
      hash: a.hash,
      host: host,
      hostname: a.hostname,
      href: a.href,
      origin: origin,
      pathname: pathname,
      port: port,
      protocol: a.protocol,
      search: a.search
    };
  }

  /***/
},
/* 21 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";
  /* harmony import */
  var __WEBPACK_IMPORTED_MODULE_0_dom_utils__ = __webpack_require__(3);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__provide__ = __webpack_require__(1);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_2__usage__ = __webpack_require__(2);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_3__utilities__ = __webpack_require__(0);
  /**
   * Copyright 2016 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *     http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  /**
   * Class for the `eventTracker` analytics.js plugin.
   * @implements {EventTrackerPublicInterface}
   */

  var EventTracker = function () {
    /**
     * Registers declarative event tracking.
     * @param {!Tracker} tracker Passed internally by analytics.js
     * @param {?EventTrackerOpts} opts Passed by the require command.
     */
    function EventTracker(tracker, opts) {
      var _this11 = this;

      _classCallCheck(this, EventTracker);

      Object(__WEBPACK_IMPORTED_MODULE_2__usage__["b" /* trackUsage */])(tracker, __WEBPACK_IMPORTED_MODULE_2__usage__["a" /* plugins */].EVENT_TRACKER);

      // Feature detects to prevent errors in unsupporting browsers.
      if (!window.addEventListener) return;

      /** @type {EventTrackerOpts} */
      var defaultOpts = {
        events: ['click'],
        fieldsObj: {},
        attributePrefix: 'ga-'
        // hitFilter: undefined,
      };

      this.opts = /** @type {EventTrackerOpts} */Object(__WEBPACK_IMPORTED_MODULE_3__utilities__["a" /* assign */])(defaultOpts, opts);

      this.tracker = tracker;

      // Binds methods.
      this.handleEvents = this.handleEvents.bind(this);

      var selector = '[' + this.opts.attributePrefix + 'on]';

      // Creates a mapping of events to their delegates
      this.delegates = {};
      this.opts.events.forEach(function (event) {
        _this11.delegates[event] = Object(__WEBPACK_IMPORTED_MODULE_0_dom_utils__["a" /* delegate */])(document, event, selector, _this11.handleEvents, { composed: true, useCapture: true });
      });
    }

    /**
     * Handles all events on elements with event attributes.
     * @param {Event} event The DOM click event.
     * @param {Element} element The delegated DOM element target.
     */


    _createClass(EventTracker, [{
      key: 'handleEvents',
      value: function handleEvents(event, element) {
        var prefix = this.opts.attributePrefix;
        var events = element.getAttribute(prefix + 'on').split(/\s*,\s*/);

        // Ensures the type matches one of the events specified on the element.
        if (events.indexOf(event.type) < 0) return;

        /** @type {FieldsObj} */
        var defaultFields = { transport: 'beacon' };
        var attributeFields = Object(__WEBPACK_IMPORTED_MODULE_3__utilities__["g" /* getAttributeFields */])(element, prefix);
        var userFields = Object(__WEBPACK_IMPORTED_MODULE_3__utilities__["a" /* assign */])({}, this.opts.fieldsObj, attributeFields);
        var hitType = attributeFields.hitType || 'event';

        this.tracker.send(hitType, Object(__WEBPACK_IMPORTED_MODULE_3__utilities__["c" /* createFieldsObj */])(defaultFields, userFields, this.tracker, this.opts.hitFilter, element, event));
      }

      /**
       * Removes all event listeners and instance properties.
       */

    }, {
      key: 'remove',
      value: function remove() {
        var _this12 = this;

        Object.keys(this.delegates).forEach(function (key) {
          _this12.delegates[key].destroy();
        });
      }
    }]);

    return EventTracker;
  }();

  Object(__WEBPACK_IMPORTED_MODULE_1__provide__["a" /* default */])('eventTracker', EventTracker);

  /***/
},
/* 22 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";
  /* harmony import */
  var __WEBPACK_IMPORTED_MODULE_0__provide__ = __webpack_require__(1);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__usage__ = __webpack_require__(2);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_2__utilities__ = __webpack_require__(0);
  /**
   * Copyright 2016 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *     http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  /**
   * Class for the `impressionTracker` analytics.js plugin.
   * @implements {ImpressionTrackerPublicInterface}
   */

  var ImpressionTracker = function () {
    /**
     * Registers impression tracking.
     * @param {!Tracker} tracker Passed internally by analytics.js
     * @param {?ImpressionTrackerOpts} opts Passed by the require command.
     */
    function ImpressionTracker(tracker, opts) {
      var _this13 = this;

      _classCallCheck(this, ImpressionTracker);

      Object(__WEBPACK_IMPORTED_MODULE_1__usage__["b" /* trackUsage */])(tracker, __WEBPACK_IMPORTED_MODULE_1__usage__["a" /* plugins */].IMPRESSION_TRACKER);

      // Feature detects to prevent errors in unsupporting browsers.
      if (!(window.IntersectionObserver && window.MutationObserver)) return;

      /** type {ImpressionTrackerOpts} */
      var defaultOptions = {
        // elements: undefined,
        rootMargin: '0px',
        fieldsObj: {},
        attributePrefix: 'ga-'
        // hitFilter: undefined,
      };

      this.opts = /** type {ImpressionTrackerOpts} */Object(__WEBPACK_IMPORTED_MODULE_2__utilities__["a" /* assign */])(defaultOptions, opts);

      this.tracker = tracker;

      // Binds methods.
      this.handleDomMutations = this.handleDomMutations.bind(this);
      this.handleIntersectionChanges = this.handleIntersectionChanges.bind(this);
      this.handleDomElementAdded = this.handleDomElementAdded.bind(this);
      this.handleDomElementRemoved = this.handleDomElementRemoved.bind(this);

      /** @type {MutationObserver} */
      this.mutationObserver = null;

      // The primary list of elements to observe. Each item contains the
      // element ID, threshold, and whether it's currently in-view.
      this.items = [];

      // A map of element IDs in the `items` array to DOM elements in the
      // document. The presence of a key indicates that the element ID is in the
      // `items` array, and the presence of an element value indicates that the
      // element is in the DOM.
      this.elementMap = {};

      // A map of threshold values. Each threshold is mapped to an
      // IntersectionObserver instance specific to that threshold.
      this.thresholdMap = {};

      // Once the DOM is ready, start observing for changes (if present).
      Object(__WEBPACK_IMPORTED_MODULE_2__utilities__["f" /* domReady */])(function () {
        if (_this13.opts.elements) {
          _this13.observeElements(_this13.opts.elements);
        }
      });
    }

    /**
     * Starts observing the passed elements for impressions.
     * @param {Array<!ImpressionTrackerElementsItem|string>} elements
     */


    _createClass(ImpressionTracker, [{
      key: 'observeElements',
      value: function observeElements(elements) {
        var _this14 = this;

        var data = this.deriveDataFromElements(elements);

        // Merge the new data with the data already on the plugin instance.
        this.items = this.items.concat(data.items);
        this.elementMap = Object(__WEBPACK_IMPORTED_MODULE_2__utilities__["a" /* assign */])({}, data.elementMap, this.elementMap);
        this.thresholdMap = Object(__WEBPACK_IMPORTED_MODULE_2__utilities__["a" /* assign */])({}, data.thresholdMap, this.thresholdMap);

        // Observe each new item.
        data.items.forEach(function (item) {
          var observer = _this14.thresholdMap[item.threshold] = _this14.thresholdMap[item.threshold] || new IntersectionObserver(_this14.handleIntersectionChanges, {
            rootMargin: _this14.opts.rootMargin,
            threshold: [+item.threshold]
          });

          var element = _this14.elementMap[item.id] || (_this14.elementMap[item.id] = document.getElementById(item.id));

          if (element) {
            observer.observe(element);
          }
        });

        if (!this.mutationObserver) {
          this.mutationObserver = new MutationObserver(this.handleDomMutations);
          this.mutationObserver.observe(document.body, {
            childList: true,
            subtree: true
          });
        }

        // TODO(philipwalton): Remove temporary hack to force a new frame
        // immediately after adding observers.
        // https://bugs.chromium.org/p/chromium/issues/detail?id=612323
        requestAnimationFrame(function () {});
      }

      /**
       * Stops observing the passed elements for impressions.
       * @param {Array<!ImpressionTrackerElementsItem|string>} elements
       * @return {undefined}
       */

    }, {
      key: 'unobserveElements',
      value: function unobserveElements(elements) {
        var itemsToKeep = [];
        var itemsToRemove = [];

        this.items.forEach(function (item) {
          var itemInItems = elements.some(function (element) {
            var itemToRemove = getItemFromElement(element);
            return itemToRemove.id === item.id && itemToRemove.threshold === item.threshold && itemToRemove.trackFirstImpressionOnly === item.trackFirstImpressionOnly;
          });
          if (itemInItems) {
            itemsToRemove.push(item);
          } else {
            itemsToKeep.push(item);
          }
        });

        // If there are no items to keep, run the `unobserveAllElements` logic.
        if (!itemsToKeep.length) {
          this.unobserveAllElements();
        } else {
          var dataToKeep = this.deriveDataFromElements(itemsToKeep);
          var dataToRemove = this.deriveDataFromElements(itemsToRemove);

          this.items = dataToKeep.items;
          this.elementMap = dataToKeep.elementMap;
          this.thresholdMap = dataToKeep.thresholdMap;

          // Unobserve removed elements.
          itemsToRemove.forEach(function (item) {
            if (!dataToKeep.elementMap[item.id]) {
              var observer = dataToRemove.thresholdMap[item.threshold];
              var element = dataToRemove.elementMap[item.id];

              if (element) {
                observer.unobserve(element);
              }

              // Disconnect unneeded threshold observers.
              if (!dataToKeep.thresholdMap[item.threshold]) {
                dataToRemove.thresholdMap[item.threshold].disconnect();
              }
            }
          });
        }
      }

      /**
       * Stops observing all currently observed elements.
       */

    }, {
      key: 'unobserveAllElements',
      value: function unobserveAllElements() {
        var _this15 = this;

        Object.keys(this.thresholdMap).forEach(function (key) {
          _this15.thresholdMap[key].disconnect();
        });

        this.mutationObserver.disconnect();
        this.mutationObserver = null;

        this.items = [];
        this.elementMap = {};
        this.thresholdMap = {};
      }

      /**
       * Loops through each of the passed elements and creates a map of element IDs,
       * threshold values, and a list of "items" (which contains each element's
       * `threshold` and `trackFirstImpressionOnly` property).
       * @param {Array} elements A list of elements to derive item data from.
       * @return {Object} An object with the properties `items`, `elementMap`
       *     and `threshold`.
       */

    }, {
      key: 'deriveDataFromElements',
      value: function deriveDataFromElements(elements) {
        var _this16 = this;

        var items = [];
        var thresholdMap = {};
        var elementMap = {};

        if (elements.length) {
          elements.forEach(function (element) {
            var item = getItemFromElement(element);

            items.push(item);
            elementMap[item.id] = _this16.elementMap[item.id] || null;
            thresholdMap[item.threshold] = _this16.thresholdMap[item.threshold] || null;
          });
        }

        return { items: items, elementMap: elementMap, thresholdMap: thresholdMap };
      }

      /**
       * Handles nodes being added or removed from the DOM. This function is passed
       * as the callback to `this.mutationObserver`.
       * @param {Array} mutations A list of `MutationRecord` instances
       */

    }, {
      key: 'handleDomMutations',
      value: function handleDomMutations(mutations) {
        for (var i = 0, mutation; mutation = mutations[i]; i++) {
          // Handles removed elements.
          for (var k = 0, removedEl; removedEl = mutation.removedNodes[k]; k++) {
            this.walkNodeTree(removedEl, this.handleDomElementRemoved);
          }
          // Handles added elements.
          for (var j = 0, addedEl; addedEl = mutation.addedNodes[j]; j++) {
            this.walkNodeTree(addedEl, this.handleDomElementAdded);
          }
        }
      }

      /**
       * Iterates through all descendents of a DOM node and invokes the passed
       * callback if any of them match an elememt in `elementMap`.
       * @param {Node} node The DOM node to walk.
       * @param {Function} callback A function to be invoked if a match is found.
       */

    }, {
      key: 'walkNodeTree',
      value: function walkNodeTree(node, callback) {
        if (node.nodeType == 1 && node.id in this.elementMap) {
          callback(node.id);
        }
        for (var i = 0, child; child = node.childNodes[i]; i++) {
          this.walkNodeTree(child, callback);
        }
      }

      /**
       * Handles intersection changes. This function is passed as the callback to
       * `this.intersectionObserver`
       * @param {Array} records A list of `IntersectionObserverEntry` records.
       */

    }, {
      key: 'handleIntersectionChanges',
      value: function handleIntersectionChanges(records) {
        var itemsToRemove = [];
        for (var i = 0, record; record = records[i]; i++) {
          for (var j = 0, item; item = this.items[j]; j++) {
            if (record.target.id !== item.id) continue;

            if (isTargetVisible(item.threshold, record)) {
              this.handleImpression(item.id);

              if (item.trackFirstImpressionOnly) {
                itemsToRemove.push(item);
              }
            }
          }
        }
        if (itemsToRemove.length) {
          this.unobserveElements(itemsToRemove);
        }
      }

      /**
       * Sends a hit to Google Analytics with the impression data.
       * @param {string} id The ID of the element making the impression.
       */

    }, {
      key: 'handleImpression',
      value: function handleImpression(id) {
        var element = document.getElementById(id);

        /** @type {FieldsObj} */
        var defaultFields = {
          transport: 'beacon',
          eventCategory: 'Viewport',
          eventAction: 'impression',
          eventLabel: id,
          nonInteraction: true
        };

        /** @type {FieldsObj} */
        var userFields = Object(__WEBPACK_IMPORTED_MODULE_2__utilities__["a" /* assign */])({}, this.opts.fieldsObj, Object(__WEBPACK_IMPORTED_MODULE_2__utilities__["g" /* getAttributeFields */])(element, this.opts.attributePrefix));

        this.tracker.send('event', Object(__WEBPACK_IMPORTED_MODULE_2__utilities__["c" /* createFieldsObj */])(defaultFields, userFields, this.tracker, this.opts.hitFilter, element));
      }

      /**
       * Handles an element in the items array being added to the DOM.
       * @param {string} id The ID of the element that was added.
       */

    }, {
      key: 'handleDomElementAdded',
      value: function handleDomElementAdded(id) {
        var _this17 = this;

        var element = this.elementMap[id] = document.getElementById(id);
        this.items.forEach(function (item) {
          if (id == item.id) {
            _this17.thresholdMap[item.threshold].observe(element);
          }
        });
      }

      /**
       * Handles an element currently being observed for intersections being
       * removed from the DOM.
       * @param {string} id The ID of the element that was removed.
       */

    }, {
      key: 'handleDomElementRemoved',
      value: function handleDomElementRemoved(id) {
        var _this18 = this;

        var element = this.elementMap[id];
        this.items.forEach(function (item) {
          if (id == item.id) {
            _this18.thresholdMap[item.threshold].unobserve(element);
          }
        });

        this.elementMap[id] = null;
      }

      /**
       * Removes all listeners and observers.
       * @private
       */

    }, {
      key: 'remove',
      value: function remove() {
        this.unobserveAllElements();
      }
    }]);

    return ImpressionTracker;
  }();

  Object(__WEBPACK_IMPORTED_MODULE_0__provide__["a" /* default */])('impressionTracker', ImpressionTracker);

  /**
   * Detects whether or not an intersection record represents a visible target
   * given a particular threshold.
   * @param {number} threshold The threshold the target is visible above.
   * @param {IntersectionObserverEntry} record The most recent record entry.
   * @return {boolean} True if the target is visible.
   */
  function isTargetVisible(threshold, record) {
    if (threshold === 0) {
      var i = record.intersectionRect;
      return i.top > 0 || i.bottom > 0 || i.left > 0 || i.right > 0;
    } else {
      return record.intersectionRatio >= threshold;
    }
  }

  /**
   * Creates an item by merging the passed element with the item defaults.
   * If the passed element is just a string, that string is treated as
   * the item ID.
   * @param {!ImpressionTrackerElementsItem|string} element The element to
   *     convert to an item.
   * @return {!ImpressionTrackerElementsItem} The item object.
   */
  function getItemFromElement(element) {
    /** @type {ImpressionTrackerElementsItem} */
    var defaultOpts = {
      threshold: 0,
      trackFirstImpressionOnly: true
    };

    if (typeof element == 'string') {
      element = /** @type {!ImpressionTrackerElementsItem} */{ id: element };
    }

    return Object(__WEBPACK_IMPORTED_MODULE_2__utilities__["a" /* assign */])(defaultOpts, element);
  }

  /***/
},
/* 23 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";
  /**
   * Copyright 2016 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *     http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  /**
   * An simple reimplementation of the native Node.js EventEmitter class.
   * The goal of this implementation is to be as small as possible.
   */

  var EventEmitter = function () {
    /**
     * Creates the event registry.
     */
    function EventEmitter() {
      _classCallCheck(this, EventEmitter);

      this.registry_ = {};
    }

    /**
     * Adds a handler function to the registry for the passed event.
     * @param {string} event The event name.
     * @param {!Function} fn The handler to be invoked when the passed
     *     event is emitted.
     */


    _createClass(EventEmitter, [{
      key: 'on',
      value: function on(event, fn) {
        this.getRegistry_(event).push(fn);
      }

      /**
       * Removes a handler function from the registry for the passed event.
       * @param {string=} event The event name.
       * @param {Function=} fn The handler to be removed.
       */

    }, {
      key: 'off',
      value: function off() {
        var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
        var fn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

        if (event && fn) {
          var eventRegistry = this.getRegistry_(event);
          var handlerIndex = eventRegistry.indexOf(fn);
          if (handlerIndex > -1) {
            eventRegistry.splice(handlerIndex, 1);
          }
        } else {
          this.registry_ = {};
        }
      }

      /**
       * Runs all registered handlers for the passed event with the optional args.
       * @param {string} event The event name.
       * @param {...*} args The arguments to be passed to the handler.
       */

    }, {
      key: 'emit',
      value: function emit(event) {
        for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
          args[_key4 - 1] = arguments[_key4];
        }

        this.getRegistry_(event).forEach(function (fn) {
          return fn.apply(undefined, args);
        });
      }

      /**
       * Returns the total number of event handlers currently registered.
       * @return {number}
       */

    }, {
      key: 'getEventCount',
      value: function getEventCount() {
        var _this19 = this;

        var eventCount = 0;
        Object.keys(this.registry_).forEach(function (event) {
          eventCount += _this19.getRegistry_(event).length;
        });
        return eventCount;
      }

      /**
       * Returns an array of handlers associated with the passed event name.
       * If no handlers have been registered, an empty array is returned.
       * @private
       * @param {string} event The event name.
       * @return {!Array} An array of handler functions.
       */

    }, {
      key: 'getRegistry_',
      value: function getRegistry_(event) {
        return this.registry_[event] = this.registry_[event] || [];
      }
    }]);

    return EventEmitter;
  }();
  /* harmony export (immutable) */

  __webpack_exports__["a"] = EventEmitter;

  /***/
},
/* 24 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";
  /* harmony import */
  var __WEBPACK_IMPORTED_MODULE_0__constants__ = __webpack_require__(5);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__provide__ = __webpack_require__(1);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_2__usage__ = __webpack_require__(2);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_3__utilities__ = __webpack_require__(0);
  /**
   * Copyright 2016 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *     http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  /**
   * Declares the MediaQueryList instance cache.
   */
  var mediaMap = {};

  /**
   * Class for the `mediaQueryTracker` analytics.js plugin.
   * @implements {MediaQueryTrackerPublicInterface}
   */

  var MediaQueryTracker = function () {
    /**
     * Registers media query tracking.
     * @param {!Tracker} tracker Passed internally by analytics.js
     * @param {?Object} opts Passed by the require command.
     */
    function MediaQueryTracker(tracker, opts) {
      _classCallCheck(this, MediaQueryTracker);

      Object(__WEBPACK_IMPORTED_MODULE_2__usage__["b" /* trackUsage */])(tracker, __WEBPACK_IMPORTED_MODULE_2__usage__["a" /* plugins */].MEDIA_QUERY_TRACKER);

      // Feature detects to prevent errors in unsupporting browsers.
      if (!window.matchMedia) return;

      /** @type {MediaQueryTrackerOpts} */
      var defaultOpts = {
        // definitions: unefined,
        changeTemplate: this.changeTemplate,
        changeTimeout: 1000,
        fieldsObj: {}
        // hitFilter: undefined,
      };

      this.opts = /** @type {MediaQueryTrackerOpts} */Object(__WEBPACK_IMPORTED_MODULE_3__utilities__["a" /* assign */])(defaultOpts, opts);

      // Exits early if media query data doesn't exist.
      if (!Object(__WEBPACK_IMPORTED_MODULE_3__utilities__["h" /* isObject */])(this.opts.definitions)) return;

      this.opts.definitions = Object(__WEBPACK_IMPORTED_MODULE_3__utilities__["j" /* toArray */])(this.opts.definitions);
      this.tracker = tracker;
      this.changeListeners = [];

      this.processMediaQueries();
    }

    /**
     * Loops through each media query definition, sets the custom dimenion data,
     * and adds the change listeners.
     */


    _createClass(MediaQueryTracker, [{
      key: 'processMediaQueries',
      value: function processMediaQueries() {
        var _this20 = this;

        this.opts.definitions.forEach(function (definition) {
          // Only processes definitions with a name and index.
          if (definition.name && definition.dimensionIndex) {
            var mediaName = _this20.getMatchName(definition);
            _this20.tracker.set('dimension' + definition.dimensionIndex, mediaName);

            _this20.addChangeListeners(definition);
          }
        });
      }

      /**
       * Takes a definition object and return the name of the matching media item.
       * If no match is found, the NULL_DIMENSION value is returned.
       * @param {Object} definition A set of named media queries associated
       *     with a single custom dimension.
       * @return {string} The name of the matched media or NULL_DIMENSION.
       */

    }, {
      key: 'getMatchName',
      value: function getMatchName(definition) {
        var match = void 0;

        definition.items.forEach(function (item) {
          if (getMediaList(item.media).matches) {
            match = item;
          }
        });
        return match ? match.name : __WEBPACK_IMPORTED_MODULE_0__constants__["b" /* NULL_DIMENSION */];
      }

      /**
       * Adds change listeners to each media query in the definition list.
       * Debounces the changes to prevent unnecessary hits from being sent.
       * @param {Object} definition A set of named media queries associated
       *     with a single custom dimension
       */

    }, {
      key: 'addChangeListeners',
      value: function addChangeListeners(definition) {
        var _this21 = this;

        definition.items.forEach(function (item) {
          var mql = getMediaList(item.media);
          var fn = Object(__WEBPACK_IMPORTED_MODULE_3__utilities__["d" /* debounce */])(function () {
            _this21.handleChanges(definition);
          }, _this21.opts.changeTimeout);

          mql.addListener(fn);
          _this21.changeListeners.push({ mql: mql, fn: fn });
        });
      }

      /**
       * Handles changes to the matched media. When the new value differs from
       * the old value, a change event is sent.
       * @param {Object} definition A set of named media queries associated
       *     with a single custom dimension
       */

    }, {
      key: 'handleChanges',
      value: function handleChanges(definition) {
        var newValue = this.getMatchName(definition);
        var oldValue = this.tracker.get('dimension' + definition.dimensionIndex);

        if (newValue !== oldValue) {
          this.tracker.set('dimension' + definition.dimensionIndex, newValue);

          /** @type {FieldsObj} */
          var defaultFields = {
            transport: 'beacon',
            eventCategory: definition.name,
            eventAction: 'change',
            eventLabel: this.opts.changeTemplate(oldValue, newValue),
            nonInteraction: true
          };
          this.tracker.send('event', Object(__WEBPACK_IMPORTED_MODULE_3__utilities__["c" /* createFieldsObj */])(defaultFields, this.opts.fieldsObj, this.tracker, this.opts.hitFilter));
        }
      }

      /**
       * Removes all event listeners and instance properties.
       */

    }, {
      key: 'remove',
      value: function remove() {
        for (var i = 0, listener; listener = this.changeListeners[i]; i++) {
          listener.mql.removeListener(listener.fn);
        }
      }

      /**
       * Sets the default formatting of the change event label.
       * This can be overridden by setting the `changeTemplate` option.
       * @param {string} oldValue The value of the media query prior to the change.
       * @param {string} newValue The value of the media query after the change.
       * @return {string} The formatted event label.
       */

    }, {
      key: 'changeTemplate',
      value: function changeTemplate(oldValue, newValue) {
        return oldValue + ' => ' + newValue;
      }
    }]);

    return MediaQueryTracker;
  }();

  Object(__WEBPACK_IMPORTED_MODULE_1__provide__["a" /* default */])('mediaQueryTracker', MediaQueryTracker);

  /**
   * Accepts a media query and returns a MediaQueryList object.
   * Caches the values to avoid multiple unnecessary instances.
   * @param {string} media A media query value.
   * @return {MediaQueryList} The matched media.
   */
  function getMediaList(media) {
    return mediaMap[media] || (mediaMap[media] = window.matchMedia(media));
  }

  /***/
},
/* 25 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";
  /* harmony import */
  var __WEBPACK_IMPORTED_MODULE_0__constants__ = __webpack_require__(5);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__method_chain__ = __webpack_require__(4);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_2__provide__ = __webpack_require__(1);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_3__session__ = __webpack_require__(11);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_4__store__ = __webpack_require__(7);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_5__usage__ = __webpack_require__(2);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_6__utilities__ = __webpack_require__(0);
  /**
   * Copyright 2016 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *     http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  var HIDDEN = 'hidden';
  var VISIBLE = 'visible';
  var PAGE_ID = Object(__WEBPACK_IMPORTED_MODULE_6__utilities__["k" /* uuid */])();
  var SECONDS = 1000;

  /**
   * Class for the `pageVisibilityTracker` analytics.js plugin.
   * @implements {PageVisibilityTrackerPublicInterface}
   */

  var PageVisibilityTracker = function () {
    /**
     * Registers outbound link tracking on tracker object.
     * @param {!Tracker} tracker Passed internally by analytics.js
     * @param {?Object} opts Passed by the require command.
     */
    function PageVisibilityTracker(tracker, opts) {
      var _this22 = this;

      _classCallCheck(this, PageVisibilityTracker);

      Object(__WEBPACK_IMPORTED_MODULE_5__usage__["b" /* trackUsage */])(tracker, __WEBPACK_IMPORTED_MODULE_5__usage__["a" /* plugins */].PAGE_VISIBILITY_TRACKER);

      // Feature detects to prevent errors in unsupporting browsers.
      if (!document.visibilityState) return;

      /** @type {PageVisibilityTrackerOpts} */
      var defaultOpts = {
        sessionTimeout: __WEBPACK_IMPORTED_MODULE_3__session__["a" /* default */].DEFAULT_TIMEOUT,
        visibleThreshold: 5 * SECONDS,
        // timeZone: undefined,
        sendInitialPageview: false,
        // pageLoadsMetricIndex: undefined,
        // visibleMetricIndex: undefined,
        fieldsObj: {}
        // hitFilter: undefined
      };

      this.opts = /** @type {PageVisibilityTrackerOpts} */Object(__WEBPACK_IMPORTED_MODULE_6__utilities__["a" /* assign */])(defaultOpts, opts);

      this.tracker = tracker;
      this.lastPageState = document.visibilityState;
      this.visibleThresholdTimeout_ = null;
      this.isInitialPageviewSent_ = false;

      // Binds methods to `this`.
      this.trackerSetOverride = this.trackerSetOverride.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleWindowUnload = this.handleWindowUnload.bind(this);
      this.handleExternalStoreSet = this.handleExternalStoreSet.bind(this);

      // Creates the store and binds storage change events.
      this.store = __WEBPACK_IMPORTED_MODULE_4__store__["a" /* default */].getOrCreate(tracker.get('trackingId'), 'plugins/page-visibility-tracker');
      this.store.on('externalSet', this.handleExternalStoreSet);

      // Creates the session and binds session events.
      this.session = __WEBPACK_IMPORTED_MODULE_3__session__["a" /* default */].getOrCreate(tracker, this.opts.sessionTimeout, this.opts.timeZone);

      // Override the built-in tracker.set method to watch for changes.
      __WEBPACK_IMPORTED_MODULE_1__method_chain__["a" /* default */].add(tracker, 'set', this.trackerSetOverride);

      window.addEventListener('unload', this.handleWindowUnload);
      document.addEventListener('visibilitychange', this.handleChange);

      // Postpone sending any hits until the next call stack, which allows all
      // autotrack plugins to be required sync before any hits are sent.
      Object(__WEBPACK_IMPORTED_MODULE_6__utilities__["e" /* deferUntilPluginsLoaded */])(this.tracker, function () {
        if (document.visibilityState == VISIBLE) {
          if (_this22.opts.sendInitialPageview) {
            _this22.sendPageview({ isPageLoad: true });
            _this22.isInitialPageviewSent_ = true;
          }
          _this22.store.set( /** @type {PageVisibilityStoreData} */{
            time: Object(__WEBPACK_IMPORTED_MODULE_6__utilities__["i" /* now */])(),
            state: VISIBLE,
            pageId: PAGE_ID,
            sessionId: _this22.session.getId()
          });
        } else {
          if (_this22.opts.sendInitialPageview && _this22.opts.pageLoadsMetricIndex) {
            _this22.sendPageLoad();
          }
        }
      });
    }

    /**
     * Inspects the last visibility state change data and determines if a
     * visibility event needs to be tracked based on the current visibility
     * state and whether or not the session has expired. If the session has
     * expired, a change to `visible` will trigger an additional pageview.
     * This method also sends as the event value (and optionally a custom metric)
     * the elapsed time between this event and the previously reported change
     * in the same session, allowing you to more accurately determine when users
     * were actually looking at your page versus when it was in the background.
     */


    _createClass(PageVisibilityTracker, [{
      key: 'handleChange',
      value: function handleChange() {
        var _this23 = this;

        if (!(document.visibilityState == VISIBLE || document.visibilityState == HIDDEN)) {
          return;
        }

        var lastStoredChange = this.getAndValidateChangeData();

        /** @type {PageVisibilityStoreData} */
        var change = {
          time: Object(__WEBPACK_IMPORTED_MODULE_6__utilities__["i" /* now */])(),
          state: document.visibilityState,
          pageId: PAGE_ID,
          sessionId: this.session.getId()
        };

        // If the visibilityState has changed to visible and the initial pageview
        // has not been sent (and the `sendInitialPageview` option is `true`).
        // Send the initial pageview now.
        if (document.visibilityState == VISIBLE && this.opts.sendInitialPageview && !this.isInitialPageviewSent_) {
          this.sendPageview();
          this.isInitialPageviewSent_ = true;
        }

        // If the visibilityState has changed to hidden, clear any scheduled
        // pageviews waiting for the visibleThreshold timeout.
        if (document.visibilityState == HIDDEN && this.visibleThresholdTimeout_) {
          clearTimeout(this.visibleThresholdTimeout_);
        }

        if (this.session.isExpired(lastStoredChange.sessionId)) {
          this.store.clear();
          if (this.lastPageState == HIDDEN && document.visibilityState == VISIBLE) {
            // If the session has expired, changes from hidden to visible should
            // be considered a new pageview rather than a visibility event.
            // This behavior ensures all sessions contain a pageview so
            // session-level page dimensions and metrics (e.g. ga:landingPagePath
            // and ga:entrances) are correct.
            // Also, in order to prevent false positives, we add a small timeout
            // that is cleared if the visibilityState changes to hidden shortly
            // after the change to visible. This can happen if a user is quickly
            // switching through their open tabs but not actually interacting with
            // and of them. It can also happen when a user goes to a tab just to
            // immediately close it. Such cases should not be considered pageviews.
            clearTimeout(this.visibleThresholdTimeout_);
            this.visibleThresholdTimeout_ = setTimeout(function () {
              _this23.store.set(change);
              _this23.sendPageview({ hitTime: change.time });
            }, this.opts.visibleThreshold);
          }
        } else {
          if (lastStoredChange.pageId == PAGE_ID && lastStoredChange.state == VISIBLE) {
            this.sendPageVisibilityEvent(lastStoredChange);
          }
          this.store.set(change);
        }

        this.lastPageState = document.visibilityState;
      }

      /**
       * Retroactively updates the stored change data in cases where it's known to
       * be out of sync.
       * This plugin keeps track of each visiblity change and stores the last one
       * in localStorage. LocalStorage is used to handle situations where the user
       * has multiple page open at the same time and we don't want to
       * double-report page visibility in those cases.
       * However, a problem can occur if a user closes a page when one or more
       * visible pages are still open. In such cases it's impossible to know
       * which of the remaining pages the user will interact with next.
       * To solve this problem we wait for the next change on any page and then
       * retroactively update the stored data to reflect the current page as being
       * the page on which the last change event occured and measure visibility
       * from that point.
       * @return {!PageVisibilityStoreData}
       */

    }, {
      key: 'getAndValidateChangeData',
      value: function getAndValidateChangeData() {
        var lastStoredChange =
        /** @type {PageVisibilityStoreData} */this.store.get();

        if (this.lastPageState == VISIBLE && lastStoredChange.state == HIDDEN && lastStoredChange.pageId != PAGE_ID) {
          lastStoredChange.state = VISIBLE;
          lastStoredChange.pageId = PAGE_ID;
          this.store.set(lastStoredChange);
        }
        return lastStoredChange;
      }

      /**
       * Sends a Page Visibility event to track the time this page was in the
       * visible state (assuming it was in that state long enough to meet the
       * threshold).
       * @param {!PageVisibilityStoreData} lastStoredChange
       * @param {{hitTime: (number|undefined)}=} param1
       *     - hitTime: A hit timestap used to help ensure original order in cases
       *                where the send is delayed.
       */

    }, {
      key: 'sendPageVisibilityEvent',
      value: function sendPageVisibilityEvent(lastStoredChange) {
        var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
            hitTime = _ref2.hitTime;

        var delta = this.getTimeSinceLastStoredChange(lastStoredChange, { hitTime: hitTime });

        // If the detla is greater than the visibileThreshold, report it.
        if (delta && delta >= this.opts.visibleThreshold) {
          var deltaInSeconds = Math.round(delta / SECONDS);

          /** @type {FieldsObj} */
          var defaultFields = {
            transport: 'beacon',
            nonInteraction: true,
            eventCategory: 'Page Visibility',
            eventAction: 'track',
            eventValue: deltaInSeconds,
            eventLabel: __WEBPACK_IMPORTED_MODULE_0__constants__["b" /* NULL_DIMENSION */]
          };

          if (hitTime) {
            defaultFields.queueTime = Object(__WEBPACK_IMPORTED_MODULE_6__utilities__["i" /* now */])() - hitTime;
          }

          // If a custom metric was specified, set it equal to the event value.
          if (this.opts.visibleMetricIndex) {
            defaultFields['metric' + this.opts.visibleMetricIndex] = deltaInSeconds;
          }

          this.tracker.send('event', Object(__WEBPACK_IMPORTED_MODULE_6__utilities__["c" /* createFieldsObj */])(defaultFields, this.opts.fieldsObj, this.tracker, this.opts.hitFilter));
        }
      }

      /**
       * Sends a page load event.
       */

    }, {
      key: 'sendPageLoad',
      value: function sendPageLoad() {
        var _defaultFields;

        /** @type {FieldsObj} */
        var defaultFields = (_defaultFields = {
          transport: 'beacon',
          eventCategory: 'Page Visibility',
          eventAction: 'page load',
          eventLabel: __WEBPACK_IMPORTED_MODULE_0__constants__["b" /* NULL_DIMENSION */]
        }, _defineProperty(_defaultFields, 'metric' + this.opts.pageLoadsMetricIndex, 1), _defineProperty(_defaultFields, 'nonInteraction', true), _defaultFields);
        this.tracker.send('event', Object(__WEBPACK_IMPORTED_MODULE_6__utilities__["c" /* createFieldsObj */])(defaultFields, this.opts.fieldsObj, this.tracker, this.opts.hitFilter));
      }

      /**
       * Sends a pageview, optionally calculating an offset if hitTime is passed.
       * @param {{
       *   hitTime: (number|undefined),
       *   isPageLoad: (boolean|undefined)
       * }=} param1
       *     hitTime: The timestamp of the current hit.
       *     isPageLoad: True if this pageview was also a page load.
       */

    }, {
      key: 'sendPageview',
      value: function sendPageview() {
        var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            hitTime = _ref3.hitTime,
            isPageLoad = _ref3.isPageLoad;

        /** @type {FieldsObj} */
        var defaultFields = { transport: 'beacon' };
        if (hitTime) {
          defaultFields.queueTime = Object(__WEBPACK_IMPORTED_MODULE_6__utilities__["i" /* now */])() - hitTime;
        }
        if (isPageLoad && this.opts.pageLoadsMetricIndex) {
          defaultFields['metric' + this.opts.pageLoadsMetricIndex] = 1;
        }

        this.tracker.send('pageview', Object(__WEBPACK_IMPORTED_MODULE_6__utilities__["c" /* createFieldsObj */])(defaultFields, this.opts.fieldsObj, this.tracker, this.opts.hitFilter));
      }

      /**
       * Detects changes to the tracker object and triggers an update if the page
       * field has changed.
       * @param {function((Object|string), (string|undefined))} originalMethod
       *     A reference to the overridden method.
       * @return {function((Object|string), (string|undefined))}
       */

    }, {
      key: 'trackerSetOverride',
      value: function trackerSetOverride(originalMethod) {
        var _this24 = this;

        return function (field, value) {
          /** @type {!FieldsObj} */
          var fields = Object(__WEBPACK_IMPORTED_MODULE_6__utilities__["h" /* isObject */])(field) ? field : _defineProperty({}, field, value);
          if (fields.page && fields.page !== _this24.tracker.get('page')) {
            if (_this24.lastPageState == VISIBLE) {
              _this24.handleChange();
            }
          }
          originalMethod(field, value);
        };
      }

      /**
       * Calculates the time since the last visibility change event in the current
       * session. If the session has expired the reported time is zero.
       * @param {PageVisibilityStoreData} lastStoredChange
       * @param {{hitTime: (number|undefined)}=} param1
       *     hitTime: The time of the current hit (defaults to now).
       * @return {number} The time (in ms) since the last change.
       */

    }, {
      key: 'getTimeSinceLastStoredChange',
      value: function getTimeSinceLastStoredChange(lastStoredChange) {
        var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
            hitTime = _ref5.hitTime;

        return lastStoredChange.time ? (hitTime || Object(__WEBPACK_IMPORTED_MODULE_6__utilities__["i" /* now */])()) - lastStoredChange.time : 0;
      }

      /**
       * Handles responding to the `storage` event.
       * The code on this page needs to be informed when other tabs or windows are
       * updating the stored page visibility state data. This method checks to see
       * if a hidden state is stored when there are still visible tabs open, which
       * can happen if multiple windows are open at the same time.
       * @param {PageVisibilityStoreData} newData
       * @param {PageVisibilityStoreData} oldData
       */

    }, {
      key: 'handleExternalStoreSet',
      value: function handleExternalStoreSet(newData, oldData) {
        // If the change times are the same, then the previous write only
        // updated the active page ID. It didn't enter a new state and thus no
        // hits should be sent.
        if (newData.time == oldData.time) return;

        // Page Visibility events must be sent by the tracker on the page
        // where the original event occurred. So if a change happens on another
        // page, but this page is where the previous change event occurred, then
        // this page is the one that needs to send the event (so all dimension
        // data is correct).
        if (oldData.pageId == PAGE_ID && oldData.state == VISIBLE && !this.session.isExpired(oldData.sessionId)) {
          this.sendPageVisibilityEvent(oldData, { hitTime: newData.time });
        }
      }

      /**
       * Handles responding to the `unload` event.
       * Since some browsers don't emit a `visibilitychange` event in all cases
       * where a page might be unloaded, it's necessary to hook into the `unload`
       * event to ensure the correct state is always stored.
       */

    }, {
      key: 'handleWindowUnload',
      value: function handleWindowUnload() {
        // If the stored visibility state isn't hidden when the unload event
        // fires, it means the visibilitychange event didn't fire as the document
        // was being unloaded, so we invoke it manually.
        if (this.lastPageState != HIDDEN) {
          this.handleChange();
        }
      }

      /**
       * Removes all event listeners and restores overridden methods.
       */

    }, {
      key: 'remove',
      value: function remove() {
        this.store.destroy();
        this.session.destroy();
        __WEBPACK_IMPORTED_MODULE_1__method_chain__["a" /* default */].remove(this.tracker, 'set', this.trackerSetOverride);
        window.removeEventListener('unload', this.handleWindowUnload);
        document.removeEventListener('visibilitychange', this.handleChange);
      }
    }]);

    return PageVisibilityTracker;
  }();

  Object(__WEBPACK_IMPORTED_MODULE_2__provide__["a" /* default */])('pageVisibilityTracker', PageVisibilityTracker);

  /***/
},
/* 26 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";
  /* harmony import */
  var __WEBPACK_IMPORTED_MODULE_0__provide__ = __webpack_require__(1);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__usage__ = __webpack_require__(2);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_2__utilities__ = __webpack_require__(0);
  /**
   * Copyright 2016 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *     http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  /**
   * Class for the `socialWidgetTracker` analytics.js plugin.
   * @implements {SocialWidgetTrackerPublicInterface}
   */

  var SocialWidgetTracker = function () {
    /**
     * Registers social tracking on tracker object.
     * Supports both declarative social tracking via HTML attributes as well as
     * tracking for social events when using official Twitter or Facebook widgets.
     * @param {!Tracker} tracker Passed internally by analytics.js
     * @param {?Object} opts Passed by the require command.
     */
    function SocialWidgetTracker(tracker, opts) {
      _classCallCheck(this, SocialWidgetTracker);

      Object(__WEBPACK_IMPORTED_MODULE_1__usage__["b" /* trackUsage */])(tracker, __WEBPACK_IMPORTED_MODULE_1__usage__["a" /* plugins */].SOCIAL_WIDGET_TRACKER);

      // Feature detects to prevent errors in unsupporting browsers.
      if (!window.addEventListener) return;

      /** @type {SocialWidgetTrackerOpts} */
      var defaultOpts = {
        fieldsObj: {},
        hitFilter: null
      };

      this.opts = /** @type {SocialWidgetTrackerOpts} */Object(__WEBPACK_IMPORTED_MODULE_2__utilities__["a" /* assign */])(defaultOpts, opts);

      this.tracker = tracker;

      // Binds methods to `this`.
      this.addWidgetListeners = this.addWidgetListeners.bind(this);
      this.addTwitterEventHandlers = this.addTwitterEventHandlers.bind(this);
      this.handleTweetEvents = this.handleTweetEvents.bind(this);
      this.handleFollowEvents = this.handleFollowEvents.bind(this);
      this.handleLikeEvents = this.handleLikeEvents.bind(this);
      this.handleUnlikeEvents = this.handleUnlikeEvents.bind(this);

      if (document.readyState != 'complete') {
        // Adds the widget listeners after the window's `load` event fires.
        // If loading widgets using the officially recommended snippets, they
        // will be available at `window.load`. If not users can call the
        // `addWidgetListeners` method manually.
        window.addEventListener('load', this.addWidgetListeners);
      } else {
        this.addWidgetListeners();
      }
    }

    /**
     * Invokes the methods to add Facebook and Twitter widget event listeners.
     * Ensures the respective global namespaces are present before adding.
     */


    _createClass(SocialWidgetTracker, [{
      key: 'addWidgetListeners',
      value: function addWidgetListeners() {
        if (window.FB) this.addFacebookEventHandlers();
        if (window.twttr) this.addTwitterEventHandlers();
      }

      /**
       * Adds event handlers for the "tweet" and "follow" events emitted by the
       * official tweet and follow buttons. Note: this does not capture tweet or
       * follow events emitted by other Twitter widgets (tweet, timeline, etc.).
       */

    }, {
      key: 'addTwitterEventHandlers',
      value: function addTwitterEventHandlers() {
        var _this25 = this;

        try {
          window.twttr.ready(function () {
            window.twttr.events.bind('tweet', _this25.handleTweetEvents);
            window.twttr.events.bind('follow', _this25.handleFollowEvents);
          });
        } catch (err) {
          // Do nothing.
        }
      }

      /**
       * Removes event handlers for the "tweet" and "follow" events emitted by the
       * official tweet and follow buttons.
       */

    }, {
      key: 'removeTwitterEventHandlers',
      value: function removeTwitterEventHandlers() {
        var _this26 = this;

        try {
          window.twttr.ready(function () {
            window.twttr.events.unbind('tweet', _this26.handleTweetEvents);
            window.twttr.events.unbind('follow', _this26.handleFollowEvents);
          });
        } catch (err) {
          // Do nothing.
        }
      }

      /**
       * Adds event handlers for the "like" and "unlike" events emitted by the
       * official Facebook like button.
       */

    }, {
      key: 'addFacebookEventHandlers',
      value: function addFacebookEventHandlers() {
        try {
          window.FB.Event.subscribe('edge.create', this.handleLikeEvents);
          window.FB.Event.subscribe('edge.remove', this.handleUnlikeEvents);
        } catch (err) {
          // Do nothing.
        }
      }

      /**
       * Removes event handlers for the "like" and "unlike" events emitted by the
       * official Facebook like button.
       */

    }, {
      key: 'removeFacebookEventHandlers',
      value: function removeFacebookEventHandlers() {
        try {
          window.FB.Event.unsubscribe('edge.create', this.handleLikeEvents);
          window.FB.Event.unsubscribe('edge.remove', this.handleUnlikeEvents);
        } catch (err) {
          // Do nothing.
        }
      }

      /**
       * Handles `tweet` events emitted by the Twitter JS SDK.
       * @param {TwttrEvent} event The Twitter event object passed to the handler.
       */

    }, {
      key: 'handleTweetEvents',
      value: function handleTweetEvents(event) {
        // Ignores tweets from widgets that aren't the tweet button.
        if (event.region != 'tweet') return;

        var url = event.data.url || event.target.getAttribute('data-url') || location.href;

        /** @type {FieldsObj} */
        var defaultFields = {
          transport: 'beacon',
          socialNetwork: 'Twitter',
          socialAction: 'tweet',
          socialTarget: url
        };
        this.tracker.send('social', Object(__WEBPACK_IMPORTED_MODULE_2__utilities__["c" /* createFieldsObj */])(defaultFields, this.opts.fieldsObj, this.tracker, this.opts.hitFilter, event.target, event));
      }

      /**
       * Handles `follow` events emitted by the Twitter JS SDK.
       * @param {TwttrEvent} event The Twitter event object passed to the handler.
       */

    }, {
      key: 'handleFollowEvents',
      value: function handleFollowEvents(event) {
        // Ignore follows from widgets that aren't the follow button.
        if (event.region != 'follow') return;

        var screenName = event.data.screen_name || event.target.getAttribute('data-screen-name');

        /** @type {FieldsObj} */
        var defaultFields = {
          transport: 'beacon',
          socialNetwork: 'Twitter',
          socialAction: 'follow',
          socialTarget: screenName
        };
        this.tracker.send('social', Object(__WEBPACK_IMPORTED_MODULE_2__utilities__["c" /* createFieldsObj */])(defaultFields, this.opts.fieldsObj, this.tracker, this.opts.hitFilter, event.target, event));
      }

      /**
       * Handles `like` events emitted by the Facebook JS SDK.
       * @param {string} url The URL corresponding to the like event.
       */

    }, {
      key: 'handleLikeEvents',
      value: function handleLikeEvents(url) {
        /** @type {FieldsObj} */
        var defaultFields = {
          transport: 'beacon',
          socialNetwork: 'Facebook',
          socialAction: 'like',
          socialTarget: url
        };
        this.tracker.send('social', Object(__WEBPACK_IMPORTED_MODULE_2__utilities__["c" /* createFieldsObj */])(defaultFields, this.opts.fieldsObj, this.tracker, this.opts.hitFilter));
      }

      /**
       * Handles `unlike` events emitted by the Facebook JS SDK.
       * @param {string} url The URL corresponding to the unlike event.
       */

    }, {
      key: 'handleUnlikeEvents',
      value: function handleUnlikeEvents(url) {
        /** @type {FieldsObj} */
        var defaultFields = {
          transport: 'beacon',
          socialNetwork: 'Facebook',
          socialAction: 'unlike',
          socialTarget: url
        };
        this.tracker.send('social', Object(__WEBPACK_IMPORTED_MODULE_2__utilities__["c" /* createFieldsObj */])(defaultFields, this.opts.fieldsObj, this.tracker, this.opts.hitFilter));
      }

      /**
       * Removes all event listeners and instance properties.
       */

    }, {
      key: 'remove',
      value: function remove() {
        window.removeEventListener('load', this.addWidgetListeners);
        this.removeFacebookEventHandlers();
        this.removeTwitterEventHandlers();
      }
    }]);

    return SocialWidgetTracker;
  }();

  Object(__WEBPACK_IMPORTED_MODULE_0__provide__["a" /* default */])('socialWidgetTracker', SocialWidgetTracker);

  /***/
},
/* 27 */
/***/function (module, __webpack_exports__, __webpack_require__) {

  "use strict";
  /* harmony import */
  var __WEBPACK_IMPORTED_MODULE_0__method_chain__ = __webpack_require__(4);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__provide__ = __webpack_require__(1);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_2__usage__ = __webpack_require__(2);
  /* harmony import */var __WEBPACK_IMPORTED_MODULE_3__utilities__ = __webpack_require__(0);
  /**
   * Copyright 2016 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *     http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  /**
   * Class for the `urlChangeTracker` analytics.js plugin.
   * @implements {UrlChangeTrackerPublicInterface}
   */

  var UrlChangeTracker = function () {
    /**
     * Adds handler for the history API methods
     * @param {!Tracker} tracker Passed internally by analytics.js
     * @param {?Object} opts Passed by the require command.
     */
    function UrlChangeTracker(tracker, opts) {
      _classCallCheck(this, UrlChangeTracker);

      Object(__WEBPACK_IMPORTED_MODULE_2__usage__["b" /* trackUsage */])(tracker, __WEBPACK_IMPORTED_MODULE_2__usage__["a" /* plugins */].URL_CHANGE_TRACKER);

      // Feature detects to prevent errors in unsupporting browsers.
      if (!history.pushState || !window.addEventListener) return;

      /** @type {UrlChangeTrackerOpts} */
      var defaultOpts = {
        shouldTrackUrlChange: this.shouldTrackUrlChange,
        trackReplaceState: false,
        fieldsObj: {},
        hitFilter: null
      };

      this.opts = /** @type {UrlChangeTrackerOpts} */Object(__WEBPACK_IMPORTED_MODULE_3__utilities__["a" /* assign */])(defaultOpts, opts);

      this.tracker = tracker;

      // Sets the initial page field.
      // Don't set this on the tracker yet so campaign data can be retreived
      // from the location field.
      this.path = getPath();

      // Binds methods.
      this.pushStateOverride = this.pushStateOverride.bind(this);
      this.replaceStateOverride = this.replaceStateOverride.bind(this);
      this.handlePopState = this.handlePopState.bind(this);

      // Watches for history changes.
      __WEBPACK_IMPORTED_MODULE_0__method_chain__["a" /* default */].add(history, 'pushState', this.pushStateOverride);
      __WEBPACK_IMPORTED_MODULE_0__method_chain__["a" /* default */].add(history, 'replaceState', this.replaceStateOverride);
      window.addEventListener('popstate', this.handlePopState);
    }

    /**
     * Handles invocations of the native `history.pushState` and calls
     * `handleUrlChange()` indicating that the history updated.
     * @param {!Function} originalMethod A reference to the overridden method.
     * @return {!Function}
     */


    _createClass(UrlChangeTracker, [{
      key: 'pushStateOverride',
      value: function pushStateOverride(originalMethod) {
        var _this27 = this;

        return function () {
          originalMethod.apply(undefined, arguments);
          _this27.handleUrlChange(true);
        };
      }

      /**
       * Handles invocations of the native `history.replaceState` and calls
       * `handleUrlChange()` indicating that history was replaced.
       * @param {!Function} originalMethod A reference to the overridden method.
       * @return {!Function}
       */

    }, {
      key: 'replaceStateOverride',
      value: function replaceStateOverride(originalMethod) {
        var _this28 = this;

        return function () {
          originalMethod.apply(undefined, arguments);
          _this28.handleUrlChange(false);
        };
      }

      /**
       * Handles responding to the popstate event and calls
       * `handleUrlChange()` indicating that history was updated.
       */

    }, {
      key: 'handlePopState',
      value: function handlePopState() {
        this.handleUrlChange(true);
      }

      /**
       * Updates the page and title fields on the tracker and sends a pageview
       * if a new history entry was created.
       * @param {boolean} historyDidUpdate True if the history was changed via
       *     `pushState()` or the `popstate` event. False if the history was just
       *     modified via `replaceState()`.
       */

    }, {
      key: 'handleUrlChange',
      value: function handleUrlChange(historyDidUpdate) {
        var _this29 = this;

        // Calls the update logic asychronously to help ensure that app logic
        // responding to the URL change happens prior to this.
        setTimeout(function () {
          var oldPath = _this29.path;
          var newPath = getPath();

          if (oldPath != newPath && _this29.opts.shouldTrackUrlChange.call(_this29, newPath, oldPath)) {
            _this29.path = newPath;
            _this29.tracker.set({
              page: newPath,
              title: document.title
            });

            if (historyDidUpdate || _this29.opts.trackReplaceState) {
              /** @type {FieldsObj} */
              var defaultFields = { transport: 'beacon' };
              _this29.tracker.send('pageview', Object(__WEBPACK_IMPORTED_MODULE_3__utilities__["c" /* createFieldsObj */])(defaultFields, _this29.opts.fieldsObj, _this29.tracker, _this29.opts.hitFilter));
            }
          }
        }, 0);
      }

      /**
       * Determines whether or not the tracker should send a hit with the new page
       * data. This default implementation can be overrided in the config options.
       * @param {string} newPath The path after the URL change.
       * @param {string} oldPath The path prior to the URL change.
       * @return {boolean} Whether or not the URL change should be tracked.
       */

    }, {
      key: 'shouldTrackUrlChange',
      value: function shouldTrackUrlChange(newPath, oldPath) {
        return !!(newPath && oldPath);
      }

      /**
       * Removes all event listeners and restores overridden methods.
       */

    }, {
      key: 'remove',
      value: function remove() {
        __WEBPACK_IMPORTED_MODULE_0__method_chain__["a" /* default */].remove(history, 'pushState', this.pushStateOverride);
        __WEBPACK_IMPORTED_MODULE_0__method_chain__["a" /* default */].remove(history, 'replaceState', this.replaceStateOverride);
        window.removeEventListener('popstate', this.handlePopState);
      }
    }]);

    return UrlChangeTracker;
  }();

  Object(__WEBPACK_IMPORTED_MODULE_1__provide__["a" /* default */])('urlChangeTracker', UrlChangeTracker);

  /**
   * @return {string} The path value of the current URL.
   */
  function getPath() {
    return location.pathname + location.search;
  }

  /***/
},
/* 28 */
/***/function (module, exports) {

  /******/(function (modules) {
    // webpackBootstrap
    /******/ // The module cache
    /******/var installedModules = {};
    /******/
    /******/ // The require function
    /******/function __webpack_require__(moduleId) {
      /******/
      /******/ // Check if module is in cache
      /******/if (installedModules[moduleId]) {
        /******/return installedModules[moduleId].exports;
        /******/
      }
      /******/ // Create a new module (and put it into the cache)
      /******/var module = installedModules[moduleId] = {
        /******/i: moduleId,
        /******/l: false,
        /******/exports: {}
        /******/ };
      /******/
      /******/ // Execute the module function
      /******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
      /******/
      /******/ // Flag the module as loaded
      /******/module.l = true;
      /******/
      /******/ // Return the exports of the module
      /******/return module.exports;
      /******/
    }
    /******/
    /******/
    /******/ // expose the modules object (__webpack_modules__)
    /******/__webpack_require__.m = modules;
    /******/
    /******/ // expose the module cache
    /******/__webpack_require__.c = installedModules;
    /******/
    /******/ // define getter function for harmony exports
    /******/__webpack_require__.d = function (exports, name, getter) {
      /******/if (!__webpack_require__.o(exports, name)) {
        /******/Object.defineProperty(exports, name, {
          /******/configurable: false,
          /******/enumerable: true,
          /******/get: getter
          /******/ });
        /******/
      }
      /******/
    };
    /******/
    /******/ // getDefaultExport function for compatibility with non-harmony modules
    /******/__webpack_require__.n = function (module) {
      /******/var getter = module && module.__esModule ?
      /******/function getDefault() {
        return module['default'];
      } :
      /******/function getModuleExports() {
        return module;
      };
      /******/__webpack_require__.d(getter, 'a', getter);
      /******/return getter;
      /******/
    };
    /******/
    /******/ // Object.prototype.hasOwnProperty.call
    /******/__webpack_require__.o = function (object, property) {
      return Object.prototype.hasOwnProperty.call(object, property);
    };
    /******/
    /******/ // __webpack_public_path__
    /******/__webpack_require__.p = "";
    /******/
    /******/ // Load entry module and return exports
    /******/return __webpack_require__(__webpack_require__.s = 6);
    /******/
  })(
  /************************************************************************/
  /******/[
  /* 0 */
  /***/function (module, __webpack_exports__, __webpack_require__) {

    "use strict";
    /* harmony import */
    var __WEBPACK_IMPORTED_MODULE_0__lib_closest__ = __webpack_require__(4);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__lib_delegate__ = __webpack_require__(9);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_2__lib_dispatch__ = __webpack_require__(10);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_3__lib_get_attributes__ = __webpack_require__(11);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_4__lib_matches__ = __webpack_require__(3);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_5__lib_parents__ = __webpack_require__(5);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_6__lib_parse_url__ = __webpack_require__(12);
    /* unused harmony reexport closest */
    /* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__, "a", function () {
      return __WEBPACK_IMPORTED_MODULE_1__lib_delegate__["a"];
    });
    /* unused harmony reexport dispatch */
    /* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__, "b", function () {
      return __WEBPACK_IMPORTED_MODULE_3__lib_get_attributes__["a"];
    });
    /* unused harmony reexport matches */
    /* unused harmony reexport parents */
    /* harmony reexport (binding) */__webpack_require__.d(__webpack_exports__, "c", function () {
      return __WEBPACK_IMPORTED_MODULE_6__lib_parse_url__["a"];
    });

    /***/
  },
  /* 1 */
  /***/function (module, __webpack_exports__, __webpack_require__) {

    "use strict";
    /* harmony export (immutable) */
    __webpack_exports__["a"] = provide;
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__constants__ = __webpack_require__(8);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__utilities__ = __webpack_require__(2);
    /**
     * Copyright 2016 Google Inc. All Rights Reserved.
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *     http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */

    /**
     * Provides a plugin for use with analytics.js, accounting for the possibility
     * that the global command queue has been renamed or not yet defined.
     * @param {string} pluginName The plugin name identifier.
     * @param {Function} pluginConstructor The plugin constructor function.
     */
    function provide(pluginName, pluginConstructor) {
      var gaAlias = window.GoogleAnalyticsObject || 'ga';
      window[gaAlias] = window[gaAlias] || function () {
        for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
          args[_key5] = arguments[_key5];
        }

        (window[gaAlias].q = window[gaAlias].q || []).push(args);
      };

      // Adds the autotrack dev ID if not already included.
      window.gaDevIds = window.gaDevIds || [];
      if (window.gaDevIds.indexOf(__WEBPACK_IMPORTED_MODULE_0__constants__["a" /* DEV_ID */]) < 0) {
        window.gaDevIds.push(__WEBPACK_IMPORTED_MODULE_0__constants__["a" /* DEV_ID */]);
      }

      // Formally provides the plugin for use with analytics.js.
      window[gaAlias]('provide', pluginName, pluginConstructor);

      // Registers the plugin on the global gaplugins object.
      window.gaplugins = window.gaplugins || {};
      window.gaplugins[Object(__WEBPACK_IMPORTED_MODULE_1__utilities__["b" /* capitalize */])(pluginName)] = pluginConstructor;
    }

    /***/
  },
  /* 2 */
  /***/function (module, __webpack_exports__, __webpack_require__) {

    "use strict";
    /* unused harmony export createFieldsObj */
    /* unused harmony export getAttributeFields */
    /* unused harmony export domReady */
    /* unused harmony export debounce */
    /* unused harmony export withTimeout */
    /* unused harmony export deferUntilPluginsLoaded */
    /* unused harmony export camelCase */
    /* harmony export (immutable) */
    __webpack_exports__["b"] = capitalize;
    /* unused harmony export isObject */
    /* unused harmony export toArray */
    /* unused harmony export now */
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_0_dom_utils__ = __webpack_require__(0);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__method_chain__ = __webpack_require__(13);
    /**
     * Copyright 2016 Google Inc. All Rights Reserved.
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *     http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */

    /**
     * Accepts default and user override fields and an optional tracker, hit
     * filter, and target element and returns a single object that can be used in
     * `ga('send', ...)` commands.
     * @param {FieldsObj} defaultFields The default fields to return.
     * @param {FieldsObj} userFields Fields set by the user to override the
     *     defaults.
     * @param {Tracker=} tracker The tracker object to apply the hit filter to.
     * @param {Function=} hitFilter A filter function that gets
     *     called with the tracker model right before the `buildHitTask`. It can
     *     be used to modify the model for the current hit only.
     * @param {Element=} target If the hit originated from an interaction
     *     with a DOM element, hitFilter is invoked with that element as the
     *     second argument.
     * @param {(Event|TwttrEvent)=} event If the hit originated via a DOM event,
     *     hitFilter is invoked with that event as the third argument.
     * @return {!FieldsObj} The final fields object.
     */
    function createFieldsObj(defaultFields, userFields) {
      var tracker = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
      var hitFilter = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;
      var target = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : undefined;
      var event = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : undefined;

      if (typeof hitFilter == 'function') {
        var originalBuildHitTask = tracker.get('buildHitTask');
        return {
          buildHitTask: function buildHitTask( /** @type {!Model} */model) {
            model.set(defaultFields, null, true);
            model.set(userFields, null, true);
            hitFilter(model, target, event);
            originalBuildHitTask(model);
          }
        };
      } else {
        return assign({}, defaultFields, userFields);
      }
    }

    /**
     * Retrieves the attributes from an DOM element and returns a fields object
     * for all attributes matching the passed prefix string.
     * @param {Element} element The DOM element to get attributes from.
     * @param {string} prefix An attribute prefix. Only the attributes matching
     *     the prefix will be returned on the fields object.
     * @return {FieldsObj} An object of analytics.js fields and values
     */
    function getAttributeFields(element, prefix) {
      var attributes = Object(__WEBPACK_IMPORTED_MODULE_0_dom_utils__["b" /* getAttributes */])(element);
      var attributeFields = {};

      Object.keys(attributes).forEach(function (attribute) {
        // The `on` prefix is used for event handling but isn't a field.
        if (attribute.indexOf(prefix) === 0 && attribute != prefix + 'on') {
          var value = attributes[attribute];

          // Detects Boolean value strings.
          if (value == 'true') value = true;
          if (value == 'false') value = false;

          var field = camelCase(attribute.slice(prefix.length));
          attributeFields[field] = value;
        }
      });

      return attributeFields;
    }

    /**
     * Accepts a function to be invoked once the DOM is ready. If the DOM is
     * already ready, the callback is invoked immediately.
     * @param {!Function} callback The ready callback.
     */
    function domReady(callback) {
      if (document.readyState == 'loading') {
        document.addEventListener('DOMContentLoaded', function fn() {
          document.removeEventListener('DOMContentLoaded', fn);
          callback();
        });
      } else {
        callback();
      }
    }

    /**
     * Returns a function, that, as long as it continues to be called, will not
     * actually run. The function will only run after it stops being called for
     * `wait` milliseconds.
     * @param {!Function} fn The function to debounce.
     * @param {number} wait The debounce wait timeout in ms.
     * @return {!Function} The debounced function.
     */
    function debounce(fn, wait) {
      var timeout = void 0;
      return function () {
        for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
          args[_key6] = arguments[_key6];
        }

        clearTimeout(timeout);
        timeout = setTimeout(function () {
          return fn.apply(undefined, args);
        }, wait);
      };
    }

    /**
     * Accepts a function and returns a wrapped version of the function that is
     * expected to be called elsewhere in the system. If it's not called
     * elsewhere after the timeout period, it's called regardless. The wrapper
     * function also prevents the callback from being called more than once.
     * @param {!Function} callback The function to call.
     * @param {number=} wait How many milliseconds to wait before invoking
     *     the callback.
     * @return {!Function} The wrapped version of the passed function.
     */
    function withTimeout(callback) {
      var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2000;

      var called = false;
      var fn = function fn() {
        if (!called) {
          called = true;
          callback();
        }
      };
      setTimeout(fn, wait);
      return fn;
    }

    // Maps trackers to queue by tracking ID.
    var queueMap = {};

    /**
     * Queues a function for execution in the next call stack, or immediately
     * before any send commands are executed on the tracker. This allows
     * autotrack plugins to defer running commands until after all other plugins
     * are required but before any other hits are sent.
     * @param {!Tracker} tracker
     * @param {!Function} fn
     */
    function deferUntilPluginsLoaded(tracker, fn) {
      var trackingId = tracker.get('trackingId');
      var ref = queueMap[trackingId] = queueMap[trackingId] || {};

      var processQueue = function processQueue() {
        clearTimeout(ref.timeout);
        if (ref.send) {
          __WEBPACK_IMPORTED_MODULE_1__method_chain__["a" /* default */].remove(tracker, 'send', ref.send);
        }
        delete queueMap[trackingId];

        ref.queue.forEach(function (fn) {
          return fn();
        });
      };

      clearTimeout(ref.timeout);
      ref.timeout = setTimeout(processQueue, 0);
      ref.queue = ref.queue || [];
      ref.queue.push(fn);

      if (!ref.send) {
        ref.send = function (originalMethod) {
          return function () {
            processQueue();
            originalMethod.apply(undefined, arguments);
          };
        };
        __WEBPACK_IMPORTED_MODULE_1__method_chain__["a" /* default */].add(tracker, 'send', ref.send);
      }
    }

    /**
     * A small shim of Object.assign that aims for brevity over spec-compliant
     * handling all the edge cases.
     * @param {!Object} target The target object to assign to.
     * @param {...?Object} sources Additional objects who properties should be
     *     assigned to target. Non-objects are converted to objects.
     * @return {!Object} The modified target object.
     */
    var assign = Object.assign || function (target) {
      for (var _len7 = arguments.length, sources = Array(_len7 > 1 ? _len7 - 1 : 0), _key7 = 1; _key7 < _len7; _key7++) {
        sources[_key7 - 1] = arguments[_key7];
      }

      for (var i = 0, len = sources.length; i < len; i++) {
        var source = Object(sources[i]);
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    /* harmony export (immutable) */__webpack_exports__["a"] = assign;

    /**
     * Accepts a string containing hyphen or underscore word separators and
     * converts it to camelCase.
     * @param {string} str The string to camelCase.
     * @return {string} The camelCased version of the string.
     */
    function camelCase(str) {
      return str.replace(/[\-\_]+(\w?)/g, function (match, p1) {
        return p1.toUpperCase();
      });
    }

    /**
     * Capitalizes the first letter of a string.
     * @param {string} str The input string.
     * @return {string} The capitalized string
     */
    function capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }

    /**
     * Indicates whether the passed variable is a JavaScript object.
     * @param {*} value The input variable to test.
     * @return {boolean} Whether or not the test is an object.
     */
    function isObject(value) {
      return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object' && value !== null;
    }

    /**
     * Accepts a value that may or may not be an array. If it is not an array,
     * it is returned as the first item in a single-item array.
     * @param {*} value The value to convert to an array if it is not.
     * @return {!Array} The array-ified value.
     */
    function toArray(value) {
      return Array.isArray(value) ? value : [value];
    }

    /**
     * @return {number} The current date timestamp
     */
    function now() {
      return +new Date();
    }

    /*eslint-disable */
    // https://gist.github.com/jed/982883
    /** @param {?=} a */
    var uuid = function b(a) {
      return a ? (a ^ Math.random() * 16 >> a / 4).toString(16) : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, b);
    };
    /* unused harmony export uuid */

    /*eslint-enable */

    /***/
  },
  /* 3 */
  /***/function (module, __webpack_exports__, __webpack_require__) {

    "use strict";
    /* harmony export (immutable) */
    __webpack_exports__["a"] = matches;
    var proto = window.Element.prototype;
    var nativeMatches = proto.matches || proto.matchesSelector || proto.webkitMatchesSelector || proto.mozMatchesSelector || proto.msMatchesSelector || proto.oMatchesSelector;

    /**
     * Tests if a DOM elements matches any of the test DOM elements or selectors.
     * @param {Element} element The DOM element to test.
     * @param {Element|string|Array<Element|string>} test A DOM element, a CSS
     *     selector, or an array of DOM elements or CSS selectors to match against.
     * @return {boolean} True of any part of the test matches.
     */
    function matches(element, test) {
      // Validate input.
      if (element && element.nodeType == 1 && test) {
        // if test is a string or DOM element test it.
        if (typeof test == 'string' || test.nodeType == 1) {
          return element == test || matchesSelector(element, /** @type {string} */test);
        } else if ('length' in test) {
          // if it has a length property iterate over the items
          // and return true if any match.
          for (var i = 0, item; item = test[i]; i++) {
            if (element == item || matchesSelector(element, item)) return true;
          }
        }
      }
      // Still here? Return false
      return false;
    }

    /**
     * Tests whether a DOM element matches a selector. This polyfills the native
     * Element.prototype.matches method across browsers.
     * @param {!Element} element The DOM element to test.
     * @param {string} selector The CSS selector to test element against.
     * @return {boolean} True if the selector matches.
     */
    function matchesSelector(element, selector) {
      if (typeof selector != 'string') return false;
      if (nativeMatches) return nativeMatches.call(element, selector);
      var nodes = element.parentNode.querySelectorAll(selector);
      for (var i = 0, node; node = nodes[i]; i++) {
        if (node == element) return true;
      }
      return false;
    }

    /***/
  },
  /* 4 */
  /***/function (module, __webpack_exports__, __webpack_require__) {

    "use strict";
    /* harmony export (immutable) */
    __webpack_exports__["a"] = closest;
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__matches__ = __webpack_require__(3);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__parents__ = __webpack_require__(5);

    /**
     * Gets the closest parent element that matches the passed selector.
     * @param {Element} element The element whose parents to check.
     * @param {string} selector The CSS selector to match against.
     * @param {boolean=} shouldCheckSelf True if the selector should test against
     *     the passed element itself.
     * @return {Element|undefined} The matching element or undefined.
     */
    function closest(element, selector) {
      var shouldCheckSelf = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (!(element && element.nodeType == 1 && selector)) return;
      var parentElements = (shouldCheckSelf ? [element] : []).concat(Object(__WEBPACK_IMPORTED_MODULE_1__parents__["a" /* default */])(element));

      for (var i = 0, parent; parent = parentElements[i]; i++) {
        if (Object(__WEBPACK_IMPORTED_MODULE_0__matches__["a" /* default */])(parent, selector)) return parent;
      }
    }

    /***/
  },
  /* 5 */
  /***/function (module, __webpack_exports__, __webpack_require__) {

    "use strict";
    /* harmony export (immutable) */
    __webpack_exports__["a"] = parents;
    /**
     * Returns an array of a DOM element's parent elements.
     * @param {!Element} element The DOM element whose parents to get.
     * @return {!Array} An array of all parent elemets, or an empty array if no
     *     parent elements are found.
     */
    function parents(element) {
      var list = [];
      while (element && element.parentNode && element.parentNode.nodeType == 1) {
        element = /** @type {!Element} */element.parentNode;
        list.push(element);
      }
      return list;
    }

    /***/
  },
  /* 6 */
  /***/function (module, __webpack_exports__, __webpack_require__) {

    "use strict";

    Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__plugins_TrackThisOpenExternalInTab__ = __webpack_require__(7);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__plugins_TrackThisFileDownload__ = __webpack_require__(14);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_2__plugins_TrackThisLinkProtocol__ = __webpack_require__(15);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_3__plugins_TrackThisIntraPageLink__ = __webpack_require__(16);

    /***/
  },
  /* 7 */
  /***/function (module, __webpack_exports__, __webpack_require__) {

    "use strict";
    /* harmony import */
    var __WEBPACK_IMPORTED_MODULE_0_autotrack_lib_provide__ = __webpack_require__(1);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_1_dom_utils__ = __webpack_require__(0);

    var TrackThisOpenExternalInTab = function TrackThisOpenExternalInTab() {
      _classCallCheck(this, TrackThisOpenExternalInTab);

      var links = document.querySelectorAll('a[href]');
      links.forEach(function (link) {
        var linkUrl = Object(__WEBPACK_IMPORTED_MODULE_1_dom_utils__["c" /* parseUrl */])(link.getAttribute('href'));
        if (linkUrl.host !== location.host) {
          link.setAttribute('rel', 'external');
          link.setAttribute('target', '_blank');
        }
      });
    };

    Object(__WEBPACK_IMPORTED_MODULE_0_autotrack_lib_provide__["a" /* default */])('trackThisOpenExternalInTab', TrackThisOpenExternalInTab);

    /***/
  },
  /* 8 */
  /***/function (module, __webpack_exports__, __webpack_require__) {

    "use strict";
    /**
     * Copyright 2016 Google Inc. All Rights Reserved.
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *     http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */

    var VERSION = '2.4.1';
    /* unused harmony export VERSION */

    var DEV_ID = 'i5iSjo';
    /* harmony export (immutable) */__webpack_exports__["a"] = DEV_ID;

    var VERSION_PARAM = '_av';
    /* unused harmony export VERSION_PARAM */

    var USAGE_PARAM = '_au';
    /* unused harmony export USAGE_PARAM */

    var NULL_DIMENSION = '(not set)';
    /* unused harmony export NULL_DIMENSION */

    /***/
  },
  /* 9 */
  /***/function (module, __webpack_exports__, __webpack_require__) {

    "use strict";
    /* harmony export (immutable) */
    __webpack_exports__["a"] = delegate;
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__closest__ = __webpack_require__(4);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__matches__ = __webpack_require__(3);

    /**
     * Delegates the handling of events for an element matching a selector to an
     * ancestor of the matching element.
     * @param {!Node} ancestor The ancestor element to add the listener to.
     * @param {string} eventType The event type to listen to.
     * @param {string} selector A CSS selector to match against child elements.
     * @param {!Function} callback A function to run any time the event happens.
     * @param {Object=} opts A configuration options object. The available options:
     *     - useCapture<boolean>: If true, bind to the event capture phase.
     *     - deep<boolean>: If true, delegate into shadow trees.
     * @return {Object} The delegate object. It contains a destroy method.
     */
    function delegate(ancestor, eventType, selector, callback) {
      var opts = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};

      // Defines the event listener.
      var listener = function listener(event) {
        var delegateTarget = void 0;

        // If opts.composed is true and the event originated from inside a Shadow
        // tree, check the composed path nodes.
        if (opts.composed && typeof event.composedPath == 'function') {
          var composedPath = event.composedPath();
          for (var i = 0, node; node = composedPath[i]; i++) {
            if (node.nodeType == 1 && Object(__WEBPACK_IMPORTED_MODULE_1__matches__["a" /* default */])(node, selector)) {
              delegateTarget = node;
            }
          }
        } else {
          // Otherwise check the parents.
          delegateTarget = Object(__WEBPACK_IMPORTED_MODULE_0__closest__["a" /* default */])(event.target, selector, true);
        }

        if (delegateTarget) {
          callback.call(delegateTarget, event, delegateTarget);
        }
      };

      ancestor.addEventListener(eventType, listener, opts.useCapture);

      return {
        destroy: function destroy() {
          ancestor.removeEventListener(eventType, listener, opts.useCapture);
        }
      };
    }

    /***/
  },
  /* 10 */
  /***/function (module, __webpack_exports__, __webpack_require__) {

    "use strict";
    /* unused harmony export default */
    /**
     * Dispatches an event on the passed element.
     * @param {!Element} element The DOM element to dispatch the event on.
     * @param {string} eventType The type of event to dispatch.
     * @param {Object|string=} eventName A string name of the event constructor
     *     to use. Defaults to 'Event' if nothing is passed or 'CustomEvent' if
     *     a value is set on `initDict.detail`. If eventName is given an object
     *     it is assumed to be initDict and thus reassigned.
     * @param {Object=} initDict The initialization attributes for the
     *     event. A `detail` property can be used here to pass custom data.
     * @return {boolean} The return value of `element.dispatchEvent`, which will
     *     be false if any of the event listeners called `preventDefault`.
     */

    function dispatch(element, eventType) {
      var eventName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'Event';
      var initDict = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

      var event = void 0;
      var isCustom = void 0;

      // eventName is optional
      if ((typeof eventName === 'undefined' ? 'undefined' : _typeof(eventName)) == 'object') {
        initDict = eventName;
        eventName = 'Event';
      }

      initDict.bubbles = initDict.bubbles || false;
      initDict.cancelable = initDict.cancelable || false;
      initDict.composed = initDict.composed || false;

      // If a detail property is passed, this is a custom event.
      if ('detail' in initDict) isCustom = true;
      eventName = isCustom ? 'CustomEvent' : eventName;

      // Tries to create the event using constructors, if that doesn't work,
      // fallback to `document.createEvent()`.
      try {
        event = new window[eventName](eventType, initDict);
      } catch (err) {
        event = document.createEvent(eventName);
        var initMethod = 'init' + (isCustom ? 'Custom' : '') + 'Event';
        event[initMethod](eventType, initDict.bubbles, initDict.cancelable, initDict.detail);
      }

      return element.dispatchEvent(event);
    }

    /***/
  },
  /* 11 */
  /***/function (module, __webpack_exports__, __webpack_require__) {

    "use strict";
    /* harmony export (immutable) */
    __webpack_exports__["a"] = getAttributes;
    /**
     * Gets all attributes of an element as a plain JavaScriot object.
     * @param {Element} element The element whose attributes to get.
     * @return {!Object} An object whose keys are the attribute keys and whose
     *     values are the attribute values. If no attributes exist, an empty
     *     object is returned.
     */
    function getAttributes(element) {
      var attrs = {};

      // Validate input.
      if (!(element && element.nodeType == 1)) return attrs;

      // Return an empty object if there are no attributes.
      var map = element.attributes;
      if (map.length === 0) return {};

      for (var i = 0, attr; attr = map[i]; i++) {
        attrs[attr.name] = attr.value;
      }
      return attrs;
    }

    /***/
  },
  /* 12 */
  /***/function (module, __webpack_exports__, __webpack_require__) {

    "use strict";
    /* harmony export (immutable) */
    __webpack_exports__["a"] = parseUrl;
    var HTTP_PORT = '80';
    var HTTPS_PORT = '443';
    var DEFAULT_PORT = RegExp(':(' + HTTP_PORT + '|' + HTTPS_PORT + ')$');

    var a = document.createElement('a');
    var cache = {};

    /**
     * Parses the given url and returns an object mimicing a `Location` object.
     * @param {string} url The url to parse.
     * @return {!Object} An object with the same properties as a `Location`.
     */
    function parseUrl(url) {
      // All falsy values (as well as ".") should map to the current URL.
      url = !url || url == '.' ? location.href : url;

      if (cache[url]) return cache[url];

      a.href = url;

      // When parsing file relative paths (e.g. `../index.html`), IE will correctly
      // resolve the `href` property but will keep the `..` in the `path` property.
      // It will also not include the `host` or `hostname` properties. Furthermore,
      // IE will sometimes return no protocol or just a colon, especially for things
      // like relative protocol URLs (e.g. "//google.com").
      // To workaround all of these issues, we reparse with the full URL from the
      // `href` property.
      if (url.charAt(0) == '.' || url.charAt(0) == '/') return parseUrl(a.href);

      // Don't include default ports.
      var port = a.port == HTTP_PORT || a.port == HTTPS_PORT ? '' : a.port;

      // PhantomJS sets the port to "0" when using the file: protocol.
      port = port == '0' ? '' : port;

      // Sometimes IE incorrectly includes a port for default ports
      // (e.g. `:80` or `:443`) even when no port is specified in the URL.
      // http://bit.ly/1rQNoMg
      var host = a.host.replace(DEFAULT_PORT, '');

      // Not all browser support `origin` so we have to build it.
      var origin = a.origin ? a.origin : a.protocol + '//' + host;

      // Sometimes IE doesn't include the leading slash for pathname.
      // http://bit.ly/1rQNoMg
      var pathname = a.pathname.charAt(0) == '/' ? a.pathname : '/' + a.pathname;

      return cache[url] = {
        hash: a.hash,
        host: host,
        hostname: a.hostname,
        href: a.href,
        origin: origin,
        pathname: pathname,
        port: port,
        protocol: a.protocol,
        search: a.search
      };
    }

    /***/
  },
  /* 13 */
  /***/function (module, __webpack_exports__, __webpack_require__) {

    "use strict";
    /**
     * Copyright 2017 Google Inc. All Rights Reserved.
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *     http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */

    /**
     * @fileoverview
     * The functions exported by this module make it easier (and safer) to override
     * foreign object methods (in a modular way) and respond to or modify their
     * invocation. The primary feature is the ability to override a method without
     * worrying if it's already been overridden somewhere else in the codebase. It
     * also allows for safe restoring of an overridden method by only fully
     * restoring a method once all overrides have been removed.
     */

    var instances = [];

    /**
     * A class that wraps a foreign object method and emit events before and
     * after the original method is called.
     */

    var MethodChain = function () {
      _createClass(MethodChain, null, [{
        key: 'add',

        /**
         * Adds the passed override method to the list of method chain overrides.
         * @param {!Object} context The object containing the method to chain.
         * @param {string} methodName The name of the method on the object.
         * @param {!Function} methodOverride The override method to add.
         */
        value: function add(context, methodName, methodOverride) {
          getOrCreateMethodChain(context, methodName).add(methodOverride);
        }

        /**
         * Removes a method chain added via `add()`. If the override is the
         * only override added, the original method is restored.
         * @param {!Object} context The object containing the method to unchain.
         * @param {string} methodName The name of the method on the object.
         * @param {!Function} methodOverride The override method to remove.
         */

      }, {
        key: 'remove',
        value: function remove(context, methodName, methodOverride) {
          getOrCreateMethodChain(context, methodName).remove(methodOverride);
        }

        /**
         * Wraps a foreign object method and overrides it. Also stores a reference
         * to the original method so it can be restored later.
         * @param {!Object} context The object containing the method.
         * @param {string} methodName The name of the method on the object.
         */

      }]);

      function MethodChain(context, methodName) {
        var _this30 = this;

        _classCallCheck(this, MethodChain);

        this.context = context;
        this.methodName = methodName;
        this.isTask = /Task$/.test(methodName);

        this.originalMethodReference = this.isTask ? context.get(methodName) : context[methodName];

        this.methodChain = [];
        this.boundMethodChain = [];

        // Wraps the original method.
        this.wrappedMethod = function () {
          var lastBoundMethod = _this30.boundMethodChain[_this30.boundMethodChain.length - 1];

          return lastBoundMethod.apply(undefined, arguments);
        };

        // Override original method with the wrapped one.
        if (this.isTask) {
          context.set(methodName, this.wrappedMethod);
        } else {
          context[methodName] = this.wrappedMethod;
        }
      }

      /**
       * Adds a method to the method chain.
       * @param {!Function} overrideMethod The override method to add.
       */


      _createClass(MethodChain, [{
        key: 'add',
        value: function add(overrideMethod) {
          this.methodChain.push(overrideMethod);
          this.rebindMethodChain();
        }

        /**
         * Removes a method from the method chain and restores the prior order.
         * @param {!Function} overrideMethod The override method to remove.
         */

      }, {
        key: 'remove',
        value: function remove(overrideMethod) {
          var index = this.methodChain.indexOf(overrideMethod);
          if (index > -1) {
            this.methodChain.splice(index, 1);
            if (this.methodChain.length > 0) {
              this.rebindMethodChain();
            } else {
              this.destroy();
            }
          }
        }

        /**
         * Loops through the method chain array and recreates the bound method
         * chain array. This is necessary any time a method is added or removed
         * to ensure proper original method context and order.
         */

      }, {
        key: 'rebindMethodChain',
        value: function rebindMethodChain() {
          this.boundMethodChain = [];
          for (var method, i = 0; method = this.methodChain[i]; i++) {
            var previousMethod = this.boundMethodChain[i - 1] || this.originalMethodReference.bind(this.context);
            this.boundMethodChain.push(method(previousMethod));
          }
        }

        /**
         * Calls super and destroys the instance if no registered handlers remain.
         */

      }, {
        key: 'destroy',
        value: function destroy() {
          var index = instances.indexOf(this);
          if (index > -1) {
            instances.splice(index, 1);
            if (this.isTask) {
              this.context.set(this.methodName, this.originalMethodReference);
            } else {
              this.context[this.methodName] = this.originalMethodReference;
            }
          }
        }
      }]);

      return MethodChain;
    }();
    /* harmony export (immutable) */

    __webpack_exports__["a"] = MethodChain;

    /**
     * Gets a MethodChain instance for the passed object and method. If the method
     * has already been wrapped via an existing MethodChain instance, that
     * instance is returned.
     * @param {!Object} context The object containing the method.
     * @param {string} methodName The name of the method on the object.
     * @return {!MethodChain}
     */
    function getOrCreateMethodChain(context, methodName) {
      var methodChain = instances.filter(function (h) {
        return h.context == context && h.methodName == methodName;
      })[0];

      if (!methodChain) {
        methodChain = new MethodChain(context, methodName);
        instances.push(methodChain);
      }
      return methodChain;
    }

    /***/
  },
  /* 14 */
  /***/function (module, __webpack_exports__, __webpack_require__) {

    "use strict";
    /* harmony import */
    var __WEBPACK_IMPORTED_MODULE_0_autotrack_lib_provide__ = __webpack_require__(1);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_1_autotrack_lib_utilities__ = __webpack_require__(2);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_2_dom_utils__ = __webpack_require__(0);

    var TrackThisFileDownload = function () {
      function TrackThisFileDownload(tracker) {
        var _this31 = this;

        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        _classCallCheck(this, TrackThisFileDownload);

        this.tracker = tracker;
        var defaultOptions = {
          extensions: ['pdf', 'zip', '7zip', 'doc', 'docx']
        };
        this.options = Object(__WEBPACK_IMPORTED_MODULE_1_autotrack_lib_utilities__["a" /* assign */])({}, defaultOptions, options);
        this.handleLinkInteractions = this.handleLinkInteractions.bind(this);
        this.delegates = {};

        this.options.extensions.forEach(function (extension) {
          var selector = 'a[href$=".' + extension + '"]';
          _this31.delegates[extension] = Object(__WEBPACK_IMPORTED_MODULE_2_dom_utils__["a" /* delegate */])(document, 'click', selector, _this31.handleLinkInteractions, {
            composed: true,
            useCapture: true
          });
        });
      }

      _createClass(TrackThisFileDownload, [{
        key: 'handleLinkInteractions',
        value: function handleLinkInteractions(event, link) {
          var linkUrl = Object(__WEBPACK_IMPORTED_MODULE_2_dom_utils__["c" /* parseUrl */])(link.getAttribute('href'));
          var eventOptions = {
            eventCategory: 'File download',
            eventAction: 'click',
            eventLabel: linkUrl.href,
            transport: 'beacon'
          };
          this.tracker.send('event', eventOptions);
        }
      }]);

      return TrackThisFileDownload;
    }();

    Object(__WEBPACK_IMPORTED_MODULE_0_autotrack_lib_provide__["a" /* default */])('trackThisFileDownload', TrackThisFileDownload);

    /***/
  },
  /* 15 */
  /***/function (module, __webpack_exports__, __webpack_require__) {

    "use strict";
    /* harmony import */
    var __WEBPACK_IMPORTED_MODULE_0_autotrack_lib_provide__ = __webpack_require__(1);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_1_autotrack_lib_utilities__ = __webpack_require__(2);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_2_dom_utils__ = __webpack_require__(0);

    var TrackThisLinkProtocol = function () {
      function TrackThisLinkProtocol(tracker) {
        var _this32 = this;

        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        _classCallCheck(this, TrackThisLinkProtocol);

        this.tracker = tracker;
        var defaultOptions = {
          protocols: {
            'mailto:': {
              category: 'Mail send'
            },
            'tel:': {
              category: 'Phone number'
            }
          }
        };
        this.options = Object(__WEBPACK_IMPORTED_MODULE_1_autotrack_lib_utilities__["a" /* assign */])({}, defaultOptions, options);
        this.handleLinkInteractions = this.handleLinkInteractions.bind(this);
        this.delegates = {};

        Object.keys(this.options.protocols).forEach(function (protocol) {
          var selector = 'a[href^="' + protocol + '"]';
          console.log(selector);
          _this32.delegates[protocol] = Object(__WEBPACK_IMPORTED_MODULE_2_dom_utils__["a" /* delegate */])(document, 'click', selector, _this32.handleLinkInteractions, {
            composed: true,
            useCapture: true
          });
        });
      }

      _createClass(TrackThisLinkProtocol, [{
        key: 'handleLinkInteractions',
        value: function handleLinkInteractions(event, link) {
          var linkUrl = Object(__WEBPACK_IMPORTED_MODULE_2_dom_utils__["c" /* parseUrl */])(link.getAttribute('href'));
          var eventOptions = {
            eventCategory: this.options.protocols[linkUrl.protocol].category,
            eventAction: 'click',
            eventLabel: linkUrl.href,
            transport: 'beacon'
          };
          this.tracker.send('event', eventOptions);
        }
      }]);

      return TrackThisLinkProtocol;
    }();

    Object(__WEBPACK_IMPORTED_MODULE_0_autotrack_lib_provide__["a" /* default */])('trackThisLinkProtocol', TrackThisLinkProtocol);

    /***/
  },
  /* 16 */
  /***/function (module, __webpack_exports__, __webpack_require__) {

    "use strict";
    /* harmony import */
    var __WEBPACK_IMPORTED_MODULE_0_autotrack_lib_provide__ = __webpack_require__(1);
    /* harmony import */var __WEBPACK_IMPORTED_MODULE_1_dom_utils__ = __webpack_require__(0);

    var TrackThisIntraPageLink = function () {
      function TrackThisIntraPageLink(tracker) {
        _classCallCheck(this, TrackThisIntraPageLink);

        this.tracker = tracker;
        this.handleLinkInteractions = this.handleLinkInteractions.bind(this);
        this.delegates = Object(__WEBPACK_IMPORTED_MODULE_1_dom_utils__["a" /* delegate */])(document, 'click', 'a', this.handleLinkInteractions, {
          composed: true,
          useCapture: true
        });
      }

      _createClass(TrackThisIntraPageLink, [{
        key: 'handleLinkInteractions',
        value: function handleLinkInteractions(event, link) {
          var linkUrl = Object(__WEBPACK_IMPORTED_MODULE_1_dom_utils__["c" /* parseUrl */])(link.getAttribute('href'));
          if (linkUrl.hostname === location.hostname && linkUrl.pathname === location.pathname && linkUrl.hash !== location.hash) {
            this.tracker.send('event', {
              eventCategory: 'Intra-Page Link',
              eventAction: 'click',
              eventLabel: linkUrl.href
            });
          }
        }
      }]);

      return TrackThisIntraPageLink;
    }();

    Object(__WEBPACK_IMPORTED_MODULE_0_autotrack_lib_provide__["a" /* default */])('trackThisIntraPageLink', TrackThisIntraPageLink);

    /***/
  }]
  /******/);

  /***/
}]
/******/);

/***/ })
/******/ ]);