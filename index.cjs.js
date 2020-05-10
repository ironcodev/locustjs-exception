"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Finally = exports.Catch = exports.Try = exports.TryCatch = exports.Exception = exports.StackTrace = exports.StackTraceItem = void 0;

var _locustjsBase = require("locustjs-base");

var _locustjsCollections = require("locustjs-collections");

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = 
descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, 
descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if 
(staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function 
_typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === 
Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression 
must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, 
writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = 
_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = 
Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, 
result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return 
_assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } 
return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function 
_wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError
("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); 
_cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } 
Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); 
return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function 
_construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new 
Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return 
false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } 
catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return 
_setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return 
o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right
[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a 
function"); } }

var StackTraceItem = function StackTraceItem(line) {
  _classCallCheck(this, StackTraceItem);

  if ((0, _locustjsBase.isSomeString)(line)) {
    var colonIndex = line.indexOf(':');
    var openParIndex = line.indexOf('(');

    if (openParIndex < 0) {
      openParIndex = colonIndex;
    }

    var numbers = line.substr(colonIndex + 1);

    if (numbers[numbers.length - 1] == ')') {
      numbers = numbers.substr(0, numbers.length - 1);
    }

    numbers = numbers.split(':');
    this.line = numbers.length > 0 ? numbers[0] : 0;
    this.col = numbers.length > 1 ? numbers[1] : 0;
    this.callSite = line.substr(0, openParIndex).replace('at ', '').trim();
    this.source = line.substr(openParIndex + 1, colonIndex - openParIndex - 1);
  } else {
    this.line = 0;
    this.col = 0;
    this.callSite = '';
    this.source = '';
  }
};

exports.StackTraceItem = StackTraceItem;

var StackTrace = function StackTrace(stack) {
  _classCallCheck(this, StackTrace);

  this.message = '';
  this.items = new _locustjsCollections.List(StackTraceItem);

  if ((0, _locustjsBase.isSomeString)(stack)) {
    var lines = stack.split('\n');

    if (lines.length) {
      this.message = lines[0];

      for (var i = 1; i < lines.length; i++) {
        this.items.add(new StackTraceItem(lines[i]));
      }
    }
  }
};

exports.StackTrace = StackTrace;

var Exception = /*#__PURE__*/function (_TypeError) {
  _inherits(Exception, _TypeError);

  var _super = _createSuper(Exception);

  function Exception(e, inner) {
    var _this;

    _classCallCheck(this, Exception);

    _this = _super.call(this);
    _this.line = 0;
    _this.col = 0;

    if ((0, _locustjsBase.isString)(e)) {
      _this.message = e;
      _this.name = 'Exception';
    } else if (_instanceof(e, TypeError)) {
      _this.message = e.message;
      _this.stack = e.stack;
      _this.stackTrace = new StackTrace(e.stack);
      _this.name = e.name;
    }

    if (inner !== undefined) {
      if (_instanceof(inner, Exception)) {
        _this.innerException = inner;
      } else if (_instanceof(inner, TypeError)) {
        _this.innerException = new Exception(inner);
      } else {
        throw "Exception.ctor: inner must be an instance of TypeError, Exception or one of their derived classes";
      }
    }

    return _this;
  }

  return Exception;
}( /*#__PURE__*/_wrapNativeSuper(TypeError));

exports.Exception = Exception;

var TryCatch = /*#__PURE__*/function () {
  function TryCatch(fn, context) {
    _classCallCheck(this, TryCatch);

    if (!(0, _locustjsBase.isFunction)(fn)) {
      throw "TryCatch.ctor: function expected";
    }

    this.Result = null;
    this.Context = context === undefined ? this : context;
    this._fn = fn;
    this._exception = null;
    this._caught = false;
    this._finalized = false;
  }

  _createClass(TryCatch, [{
    key: "Run",
    value: function Run() {
      this.Result = this._fn(this.Context);
    }
  }, {
    key: "Catch",
    value: function Catch(exceptionType, fn) {
      if (fn !== undefined) {
        if (!(0, _locustjsBase.isFunction)(fn)) {
          throw "Catch: callback must be a function";
        }

        if (this._finalized) {
          throw "Catch cannot be used after Finally";
        }

        if (this.hasError && _instanceof(this.Exception, exceptionType)) {
          fn(this.Exception, this.Context);
          this._caught = true;
        }
      }

      return this;
    }
  }, {
    key: "Finally",
    value: function Finally(fn) {
      if (this.hasError) {
        throw this.Exception;
      }

      if (fn !== undefined) {
        if (!(0, _locustjsBase.isFunction)(fn)) {
          throw "Finally: callback must be a function";
        }

        if (!this._finalized) {
          fn(this.Context);
          this._finalized = true;
        }
      }

      return this;
    }
  }, {
    key: "Exception",
    get: function get() {
      return this._exception;
    },
    set: function set(value) {
      if (this._exception === null) {
        this._exception = value;
      }
    }
  }, {
    key: "hasError",
    get: function get() {
      return this.Exception && !this._caught;
    }
  }]);

  return TryCatch;
}();

exports.TryCatch = TryCatch;

var Try = function Try(fn, context) {
  var result = new TryCatch(fn, context);

  try {
    result.Run();
  } catch (e) {
    if (_instanceof(e, Exception)) {
      result.Exception = e;
    } else {
      result.Exception = new Exception(e);
    }
  }

  return result;
};

exports.Try = Try;

var Catch = function Catch(x, exceptionType, fn) {
  if (_instanceof(x, TryCatch) && x.hasError) {
    x.Catch(exceptionType, fn);
  }
};

exports.Catch = Catch;

var Finally = function Finally(x, fn) {
  if (_instanceof(x, TryCatch)) {
    x.Finally(fn);
  }
};

exports.Finally = Finally;
