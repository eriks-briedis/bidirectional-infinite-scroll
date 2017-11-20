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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _scroller = __webpack_require__(1);

var _scroller2 = _interopRequireDefault(_scroller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var scroller = new _scroller2.default({
    threshold: 300,
    itemsPerPage: 10,
    maxItemsVisible: 30,
    scrollTimeout: 50,
    maxTotalItems: 100
});
scroller.render().appendTo(document.getElementById('app'));

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _item = __webpack_require__(2);

var _item2 = _interopRequireDefault(_item);

var _scrollListener = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Scroller = function () {

    /**
     * @param {{itemsPerPage, maxItemsVisible, maxTotalItems, threshold, scrollTimeout}} params
     * @constructor
     * @return {Element}
     */
    function Scroller(params) {
        _classCallCheck(this, Scroller);

        this.params = params;
        this.scrollListener = new _scrollListener.ScrollListener(this.params.scrollTimeout, this.params.threshold, this.onModify.bind(this));
        this.initState();
    }

    /**
     * Appends a new .scroller node to parent element
     *
     * @return {Scroller}
     * @public
     */


    _createClass(Scroller, [{
        key: 'render',
        value: function render() {
            var itemsNode = document.createElement('div');
            itemsNode.className = 'scroller';
            this.itemsNode = itemsNode;
            this._renderList();

            return this;
        }

        /**
         * @private
         */

    }, {
        key: '_renderList',
        value: function _renderList() {
            this.setItems();
            this.itemsNode.innerHTML = '';
            this.state.itemsVisible.map(this._renderItem.bind(this));
            this._updateOffsetFromTop();
        }

        /**
         * @param {Item} item
         * @private
         */

    }, {
        key: '_renderItem',
        value: function _renderItem(item) {
            item.render().appendTo(this.itemsNode);
        }

        /**
         * Callback method for ScrollListener
         * Fires when top/bottom threshold is reached
         *
         * @param {string} type
         */

    }, {
        key: 'onModify',
        value: function onModify(type) {
            switch (type) {
                case _scrollListener.EVENT_TYPE_ADD:
                    this.add();
                    break;
                case _scrollListener.EVENT_TYPE_SUBTRACT:
                    this.subtract();
                    break;
            }
            this._renderList();
        }

        /**
         * @public
         */

    }, {
        key: 'subtract',
        value: function subtract() {
            this.setState('from', Math.max(1, this.state.from - this.params.itemsPerPage));
            this.setState('to', Math.max(this.params.itemsPerPage, this.state.to - this.params.itemsPerPage));
        }

        /**
         * @return {boolean}
         * @public
         */

    }, {
        key: 'add',
        value: function add() {
            if (this.state.to >= this.params.maxTotalItems) {
                return false;
            }

            this.setState('to', this.state.to + this.params.itemsPerPage);

            if (this.state.to - this.state.from >= this.params.maxItemsVisible) {
                this.setState('from', this.state.from + this.params.itemsPerPage);
            }
        }

        /**
         * Offset from top needed to compensate removed (hidden) items height
         *
         * @private
         */

    }, {
        key: '_updateOffsetFromTop',
        value: function _updateOffsetFromTop() {
            var offset = this._getOffsetFromHiddenItems();
            this.scrollListener.setOffsetFromTop(offset);
            this.itemsNode.style.top = offset + 'px';
        }

        /**
         * Sums all hidden items height
         *
         * @return {number}
         * @private
         */

    }, {
        key: '_getOffsetFromHiddenItems',
        value: function _getOffsetFromHiddenItems() {
            return this.state.itemsHidden.reduce(function (prevVal, item) {
                return prevVal + item.getHeight();
            }, 0);
        }

        /**
         * Adds items to hidden or visible arrays depending on visible range
         *
         * And updates state
         */

    }, {
        key: 'setItems',
        value: function setItems() {
            var itemsVisible = [];
            var itemsHidden = [];
            var index = 0;

            while (index < this.state.to) {
                index++;
                var item = new _item2.default(index);
                this.state.from === 1 || index >= this.state.from ? itemsVisible.push(item) : itemsHidden.push(item);
            }

            this.setState('itemsVisible', itemsVisible);
            this.setState('itemsHidden', itemsHidden);
        }

        /**
         * Set initial state
         */

    }, {
        key: 'initState',
        value: function initState() {
            this.state = {
                itemsVisible: [],
                itemsHidden: [],
                from: 1,
                to: this.params.itemsPerPage
            };
        }

        /**
         * Updates/inserts state value and updates state object
         *
         * @param {String} key
         * @param {String|Number|Object} value
         */

    }, {
        key: 'setState',
        value: function setState(key, value) {
            var state = {};
            state[key] = value;
            this.state = Object.assign({}, this.state, state);
        }

        /**
         * @param {Element} node
         */

    }, {
        key: 'appendTo',
        value: function appendTo(node) {
            node.appendChild(this.itemsNode);
        }
    }]);

    return Scroller;
}();

exports.default = Scroller;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Item = function () {

    /**
     * @param {Number} index
     */
    function Item(index) {
        _classCallCheck(this, Item);

        this.index = index;
        this.height = 115;
    }

    /**
     * @return {Item}
     */


    _createClass(Item, [{
        key: 'render',
        value: function render() {
            this.node = document.createElement('div');
            this.node.className = 'scroller__item';
            this.node.innerHTML = 'Element ' + this.index;

            return this;
        }

        /**
         * @param {Element} parentNode
         * @public
         */

    }, {
        key: 'appendTo',
        value: function appendTo(parentNode) {
            parentNode.appendChild(this.node);
        }

        /**
         * TODO Height is hard-coded for now.
         * @return {number}
         * @public
         */

    }, {
        key: 'getHeight',
        value: function getHeight() {
            return this.height;
        }
    }]);

    return Item;
}();

exports.default = Item;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ScrollListener = exports.ScrollListener = function () {

    /**
     * Handles scroll events and fires callback when top/bottom threshold is reached
     *
     * @param {Number} timeout
     * @param {Number} threshold
     * @param {function} callback
     */
    function ScrollListener(timeout, threshold, callback) {
        _classCallCheck(this, ScrollListener);

        this.timeout = timeout;
        this.threshold = threshold;
        this.offsetFromTop = 0;
        this.timer = 0;
        this.callback = callback;

        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', this._timer.bind(this, this._onScroll));
        }
    }

    /**
     * Throttle scroll events for performance
     *
     * @param {function} callback
     * @private
     */


    _createClass(ScrollListener, [{
        key: '_timer',
        value: function _timer(callback) {
            clearTimeout(this.timer);
            this.timer = setTimeout(callback.bind(this), this.timeout);
        }

        /**
         * @private
         */

    }, {
        key: '_onScroll',
        value: function _onScroll() {
            var scrollFromTop = (window.pageYOffset || document.documentElement.scrollTop) - (document.documentElement.clientTop || 0);
            if (this._isBottomThresholdReached(scrollFromTop)) {
                this.callback(EVENT_TYPE_ADD);
            } else if (this._isTopThresholdReached(scrollFromTop)) {
                this.callback(EVENT_TYPE_SUBTRACT);
            }
        }

        /**
         * @param {Number} scrollFromTop
         * @return {boolean}
         * @private
         */

    }, {
        key: '_isBottomThresholdReached',
        value: function _isBottomThresholdReached(scrollFromTop) {
            return scrollFromTop + document.documentElement.clientHeight + this.threshold >= document.documentElement.scrollHeight;
        }

        /**
         * @param {Number} scrollFromTop
         * @return {boolean}
         * @private
         */

    }, {
        key: '_isTopThresholdReached',
        value: function _isTopThresholdReached(scrollFromTop) {
            return scrollFromTop - this.offsetFromTop <= this.threshold;
        }

        /**
         * @param {Number} offset
         * @public
         */

    }, {
        key: 'setOffsetFromTop',
        value: function setOffsetFromTop(offset) {
            this.offsetFromTop = offset;
        }
    }]);

    return ScrollListener;
}();

var EVENT_TYPE_ADD = exports.EVENT_TYPE_ADD = 'add';
var EVENT_TYPE_SUBTRACT = exports.EVENT_TYPE_SUBTRACT = 'subtract';

/***/ })
/******/ ]);