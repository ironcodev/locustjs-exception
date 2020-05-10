"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.List = void 0;

var _locustjsBase = require("locustjs-base");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || 
_nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array 
objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right
[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = 
_unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { 
done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn 
order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: 
function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { 
didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = 
Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return 
Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = 
arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a 
function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = 
descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, 
descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if 
(staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var List = /*#__PURE__*/function () {
  function List(itemType) {
    _classCallCheck(this, List);

    this._items = [];
    this.type = itemType;
  }

  _createClass(List, [{
    key: Symbol.iterator,
    value: /*#__PURE__*/regeneratorRuntime.mark(function value() {
      var _iterator, _step, item;

      return regeneratorRuntime.wrap(function value$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _iterator = _createForOfIteratorHelper(this._items);
              _context.prev = 1;

              _iterator.s();

            case 3:
              if ((_step = _iterator.n()).done) {
                _context.next = 9;
                break;
              }

              item = _step.value;
              _context.next = 7;
              return item;

            case 7:
              _context.next = 3;
              break;

            case 9:
              _context.next = 14;
              break;

            case 11:
              _context.prev = 11;
              _context.t0 = _context["catch"](1);

              _iterator.e(_context.t0);

            case 14:
              _context.prev = 14;

              _iterator.f();

              return _context.finish(14);

            case 17:
            case "end":
              return _context.stop();
          }
        }
      }, value, this, [[1, 11, 14, 17]]);
    })
  }, {
    key: "canAdd",
    value: function canAdd(item) {
      var result = true;

      if (this.type != undefined) {
        if ((0, _locustjsBase.isSomeString)(this.type)) {
          result = false || this.type == 'number' && (0, _locustjsBase.isNumber)(item) || this.type == 'string' && (0, _locustjsBase.isString)(item) || 
this.type == 'date' && (0, _locustjsBase.isDate)(item) || this.type == 'object' && (0, _locustjsBase.isObject)(item) || this.type == 'bool' && (0, 
_locustjsBase.isBool)(item) || this.type == 'array' && (0, _locustjsBase.isArray)(item) || this.type == 'function' && (0, _locustjsBase.isFunction)
(item) || this.type == 'primitive' && (0, _locustjsBase.isPrimitive)(item) || (0, _locustjsBase.isObject)(item) && x.constructor && 
x.constructor.name == this.type;
        } else {
          result = _instanceof(item, this.type);
        }
      }

      return result;
    }
  }, {
    key: "add",
    value: function add(item) {
      var ok = this.canAdd(item);

      if (ok) {
        this._items.push(item);
      } else {
        throw "List.add(): invalid item type. expected ".concat(this.type);
      }
    }
  }, {
    key: "push",
    value: function push(item) {
      this.add(item);
    }
  }, {
    key: "append",
    value: function append(item) {
      this.add(item);
    }
  }, {
    key: "remove",
    value: function remove(item) {
      var index = this._items.indexOf(item);

      var result;

      if (index >= 0) {
        result = this._items.splice(index, 1)[0];
      }

      return result;
    }
  }, {
    key: "removeAt",
    value: function removeAt(index) {
      var result;

      if (index >= 0 && index < this.length) {
        result = this._items.splice(index, 1)[0];
      } else {
        throw new RangeError("index out of range: ".concat(index));
      }

      return result;
    }
  }, {
    key: "clear",
    value: function clear() {
      this._items = [];
    }
  }, {
    key: "toArray",
    value: function toArray() {
      return _toConsumableArray(this._items);
    }
  }, {
    key: "type",
    get: function get() {
      return this._type;
    },
    set: function set(t) {
      if (this.length > 0) {
        throw "List.type can only be set when the list is empty.";
      }

      if (t == undefined) {
        this._type = undefined;
      } else if ((0, _locustjsBase.isSomeString)(t)) {
        if (t != 'any') {
          this._type = t;
        } else {
          this._type = undefined;
        }
      } else if ((0, _locustjsBase.isFunction)(t)) {
        this._type = t;
      } else {
        throw "List: invalid item type ".concat(t);
      }
    }
  }, {
    key: "length",
    get: function get() {
      return this._items.length;
    }
  }]);

  return List;
}();

exports.List = List;
