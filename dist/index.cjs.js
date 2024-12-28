'use strict';

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
var base = require('@locustjs/base');
var StackTraceItem = /*#__PURE__*/_createClass(function StackTraceItem(line) {
  _classCallCheck(this, StackTraceItem);
  if (line.length) {
    var colonIndex1 = line.lastIndexOf(":");
    var colonIndex2 = line.lastIndexOf(":", colonIndex1 - 1);
    var openParIndex = line.indexOf("(");
    if (openParIndex < 0) {
      openParIndex = colonIndex2;
    }
    var closeParIndex = line.lastIndexOf(")");
    if (closeParIndex < 0) {
      closeParIndex = line.length;
    }
    var numbers = line.substr(colonIndex2 + 1, closeParIndex - colonIndex2 - 1);
    numbers = numbers.split(":");
    this.line = numbers.length > 0 ? parseInt(numbers[0]) : 0;
    this.col = numbers.length > 1 ? parseInt(numbers[1]) : 0;
    this.callSite = line.substr(0, openParIndex).replace("at ", "").trim();
    this.source = line.substr(openParIndex + 1, colonIndex2 - openParIndex - 1);
  } else {
    this.line = 0;
    this.col = 0;
    this.callSite = "";
    this.source = "";
  }
  this.message = line;
});
var StackTrace = /*#__PURE__*/_createClass(function StackTrace(stack) {
  _classCallCheck(this, StackTrace);
  this.items = [];
  if (base.isSomeString(stack)) {
    var lines = stack.split("\n");
    if (lines.length) {
      for (var i = 1; i < lines.length; i++) {
        this.items.push(new StackTraceItem(lines[i]));
      }
    }
  }
});
/*
      examples:
          new Exception({
              message: '',
              code: 23,
              host: '',
              data: { name: 'foo' },
              stack: '',
              inner: new Exception()
          })
          new Exception(new TypeError('this is an error'))
          new Exception(new AnotherException())
  */
function Exception(settings) {
  var _message = "";
  var _code = undefined;
  var _status = undefined;
  var _host = undefined;
  var _data = null;
  var _stack = "";
  var _stackTrace = null;
  var _inner = null;
  var _date = new Date();
  var _fileName = undefined;
  var _lineNumber = undefined;
  var _columnNumber = undefined;
  var _name = this.constructor.name;
  var _baseName = "";
  if (settings instanceof Error) {
    _message = settings.message;
    _fileName = settings.fileName;
    _lineNumber = settings.lineNumber;
    _columnNumber = settings.columnNumber;
    _baseName = settings.name;
    _stack = settings.stack;
  } else {
    var _settings = Object.assign({}, settings);
    _message = base.isString(_settings.message) ? _settings.message : _message;
    _code = base.isNumeric(_settings.code) ? _settings.code : _code;
    _status = base.isString(_settings.status) ? _settings.status : _status;
    _host = base.isString(_settings.host) ? _settings.host : _host;
    _data = _settings.data;
    _date = base.isDate(_settings.date) ? _settings.date : _date;
    _stack = base.isString(_settings.stack) ? _settings.stack : _stack;
    _fileName = base.isString(_settings.fileName) ? _settings.fileName : _fileName;
    _lineNumber = base.isNumeric(_settings.lineNumber) ? _settings.lineNumber : _lineNumber;
    _columnNumber = base.isNumeric(_settings.columnNumber) ? _settings.columnNumber : _columnNumber;
    _baseName = base.isString(_settings.baseName) ? _settings.baseName : _baseName;
    var _innerException = _settings.innerException;
    if (_innerException) {
      if (_innerException instanceof Exception) {
        _inner = _innerException;
      } else if (_innerException instanceof Error || base.isObject(_innerException)) {
        _inner = new Exception(_innerException);
      } else if (base.isString(_innerException)) {
        if (_innerException.indexOf(" ") > 0) {
          _inner = new Exception({
            message: _innerException
          });
        } else {
          _inner = new Exception({
            status: _innerException
          });
        }
      } else if (base.isNumeric(_innerException)) {
        _inner = new Exception({
          code: _innerException
        });
      } else {
        throw "Exception.ctor: innerException must be a string, an object or instance of Error/Exception";
      }
    }
  }
  if (base.isEmpty(_stack) && base.isFunction(Error.captureStackTrace)) {
    try {
      var temp = {};
      Error.captureStackTrace(temp, Exception);
      _stack = temp.stack;
      if (_stack.startsWith("Error\n")) {
        _stack = _message + "\n" + _stack.substr(7);
      }
    } catch (_unused) {}
  }
  _stackTrace = base.isEmpty(_stack) ? null : new StackTrace(_stack);
  var propertyIsReadOnly = function propertyIsReadOnly(propertyName) {
    return function (value) {
      throw new PropertyReadOnlyException(propertyName, _host);
    };
  };
  Object.defineProperties(this, {
    name: {
      enumerable: true,
      get: function get() {
        return _name;
      },
      set: propertyIsReadOnly("Exception.name")
    },
    baseName: {
      enumerable: true,
      get: function get() {
        return _baseName;
      },
      set: propertyIsReadOnly("Exception.baseName")
    },
    code: {
      enumerable: true,
      get: function get() {
        return _code;
      },
      set: propertyIsReadOnly("Exception.code")
    },
    status: {
      enumerable: true,
      get: function get() {
        return _status;
      },
      set: propertyIsReadOnly("Exception.status")
    },
    host: {
      enumerable: true,
      get: function get() {
        return _host;
      },
      set: propertyIsReadOnly("Exception.host")
    },
    message: {
      enumerable: true,
      get: function get() {
        return _message;
      },
      set: propertyIsReadOnly("Exception.message")
    },
    stack: {
      enumerable: true,
      get: function get() {
        return _stack;
      },
      set: propertyIsReadOnly("Exception.stack")
    },
    stackTrace: {
      enumerable: true,
      get: function get() {
        return _stackTrace;
      },
      set: propertyIsReadOnly("Exception.stackTrace")
    },
    innerException: {
      enumerable: true,
      get: function get() {
        return _inner;
      },
      set: propertyIsReadOnly("Exception.innerException")
    },
    data: {
      enumerable: true,
      get: function get() {
        return _data;
      },
      set: propertyIsReadOnly("Exception.data")
    },
    date: {
      enumerable: true,
      get: function get() {
        return _date;
      },
      set: propertyIsReadOnly("Exception.date")
    },
    fileName: {
      enumerable: true,
      get: function get() {
        return _fileName;
      },
      set: propertyIsReadOnly("Exception.fileName")
    },
    lineNumber: {
      enumerable: true,
      get: function get() {
        return _lineNumber;
      },
      set: propertyIsReadOnly("Exception.lineNumber")
    },
    columnNumber: {
      enumerable: true,
      get: function get() {
        return _columnNumber;
      },
      set: propertyIsReadOnly("Exception.columnNumber")
    }
  });
}
Exception.prototype.toString = function () {
  var separator = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "\n";
  var arr = [];
  var current = this;
  while (current) {
    arr.push(current.message);
    current = current.innerException;
  }
  return arr.join(separator);
};
Exception.prototype.flatten = function () {
  var arr = [];
  var current = this;
  while (current) {
    arr.push(current);
    current = current.innerException;
  }
  return arr;
};
var PropertyReadOnlyException$1 = /*#__PURE__*/function (_Exception) {
  function PropertyReadOnlyException(propertyName, host) {
    _classCallCheck(this, PropertyReadOnlyException);
    return _callSuper(this, PropertyReadOnlyException, [{
      message: "property '".concat(propertyName || "?", "' is read-only."),
      status: "property-readonly",
      host: host
    }]);
  }
  _inherits(PropertyReadOnlyException, _Exception);
  return _createClass(PropertyReadOnlyException);
}(Exception);
var AbstractInstantiationException = /*#__PURE__*/function (_Exception2) {
  function AbstractInstantiationException(type, host) {
    _classCallCheck(this, AbstractInstantiationException);
    return _callSuper(this, AbstractInstantiationException, [{
      message: "cannot instantiate from abstract class '".concat(type || "?", "'."),
      status: "cannot-instantiate-from-abstract-class",
      host: host
    }]);
  }
  _inherits(AbstractInstantiationException, _Exception2);
  return _createClass(AbstractInstantiationException);
}(Exception);
var NotImplementedException = /*#__PURE__*/function (_Exception3) {
  function NotImplementedException(method, host) {
    _classCallCheck(this, NotImplementedException);
    return _callSuper(this, NotImplementedException, [{
      message: "method '".concat(method || "?", "' is not implemented."),
      status: "method-not-implemented",
      host: host
    }]);
  }
  _inherits(NotImplementedException, _Exception3);
  return _createClass(NotImplementedException);
}(Exception);
var NotSupportedException = /*#__PURE__*/function (_Exception4) {
  function NotSupportedException(value, host) {
    _classCallCheck(this, NotSupportedException);
    return _callSuper(this, NotSupportedException, [{
      message: "'".concat(value || "?", "' is not supported."),
      status: "not-supported",
      host: host
    }]);
  }
  _inherits(NotSupportedException, _Exception4);
  return _createClass(NotSupportedException);
}(Exception);
var IndexOutOfRangeException = /*#__PURE__*/function (_Exception5) {
  function IndexOutOfRangeException(index, min, max, host) {
    _classCallCheck(this, IndexOutOfRangeException);
    return _callSuper(this, IndexOutOfRangeException, [{
      message: "index".concat(base.isEmpty(index) ? "" : " '".concat(index, "'"), " is out of range [").concat(min || "0", ", ").concat(max, "]."),
      status: "index-out-of-range",
      host: host
    }]);
  }
  _inherits(IndexOutOfRangeException, _Exception5);
  return _createClass(IndexOutOfRangeException);
}(Exception);
var ArgumentNullException = /*#__PURE__*/function (_Exception6) {
  function ArgumentNullException(arg, host) {
    _classCallCheck(this, ArgumentNullException);
    return _callSuper(this, ArgumentNullException, [{
      message: "argument '".concat(arg || "?", "' cannot be null or undefined."),
      status: "argument-null",
      host: host
    }]);
  }
  _inherits(ArgumentNullException, _Exception6);
  return _createClass(ArgumentNullException);
}(Exception);
var ArgumentEmptyException = /*#__PURE__*/function (_Exception7) {
  function ArgumentEmptyException(arg, host) {
    _classCallCheck(this, ArgumentEmptyException);
    return _callSuper(this, ArgumentEmptyException, [{
      message: "argument '".concat(arg || "?", "' cannot be null, undefined or empty strings."),
      status: "argument-empty",
      host: host
    }]);
  }
  _inherits(ArgumentEmptyException, _Exception7);
  return _createClass(ArgumentEmptyException);
}(Exception);
var ArgumentTypeIncorrectException = /*#__PURE__*/function (_Exception8) {
  function ArgumentTypeIncorrectException(arg, type, host) {
    _classCallCheck(this, ArgumentTypeIncorrectException);
    return _callSuper(this, ArgumentTypeIncorrectException, [{
      message: "argument '".concat(arg || "?", "' has an incorrect type. ").concat(type, " expected."),
      status: "argument-type-incorrect",
      host: host
    }]);
  }
  _inherits(ArgumentTypeIncorrectException, _Exception8);
  return _createClass(ArgumentTypeIncorrectException);
}(Exception);
var NotInstanceOfException = /*#__PURE__*/function (_Exception9) {
  function NotInstanceOfException(arg, type, host) {
    _classCallCheck(this, NotInstanceOfException);
    return _callSuper(this, NotInstanceOfException, [{
      message: "argument '".concat(arg || "?", "' must be an instance of ").concat(type),
      status: "argument-not-instance-of",
      host: host
    }]);
  }
  _inherits(NotInstanceOfException, _Exception9);
  return _createClass(NotInstanceOfException);
}(Exception);
var InvalidHttpMethodException = /*#__PURE__*/function (_Exception10) {
  function InvalidHttpMethodException(method, host) {
    _classCallCheck(this, InvalidHttpMethodException);
    return _callSuper(this, InvalidHttpMethodException, [{
      message: "invalid http method '".concat(method || "?", "'. expected GET, POST, PUT or DELETE."),
      status: "invalid-http-method",
      host: host
    }]);
  }
  _inherits(InvalidHttpMethodException, _Exception10);
  return _createClass(InvalidHttpMethodException);
}(Exception);
function throwIfInstantiateAbstract(classType, instance, host) {
  if (instance.constructor === classType) {
    throw new AbstractInstantiationException(classType.name, host);
  }
}
function throwIfNotInstanceOf(argName, classType, instance) {
  var ignoreNull = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var host = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "";
  if (base.isNull(instance)) {
    if (ignoreNull) {
      return;
    } else {
      throw new ArgumentNullException(argName, host);
    }
  }
  if (!(instance instanceof classType)) {
    throw new NotInstanceOfException(argName, classType.name, host);
  }
}
function throwIfNull(arg, argName, host) {
  if (base.isNull(arg)) {
    throw new ArgumentNullException(argName, host);
  }
}
function throwIfNullOrEmpty(arg, argName, host) {
  if (base.isNullOrEmpty(arg)) {
    throw new ArgumentNullException(argName, host);
  }
}
function throwIfEmpty(arg, argName, host) {
  if (base.isEmpty(arg)) {
    throw new ArgumentEmptyException(argName, host);
  }
}
function throwIfTypeIncorrect(arg, checkType, host) {
  var type = checkType();
  if (type) {
    throw new ArgumentTypeIncorrectException(arg, type, host);
  }
}
function throwIfIndexOutOfRange(index, min, max, host) {
  throwIfEmpty(index, "index", host);
  if (!base.isNumeric(min)) {
    min = 0;
  }
  if (!base.isNumeric(max)) {
    max = 0;
  }
  if (!base.isNumeric(index)) {
    index = -1;
  }
  if (index < min || index > max) {
    throw new IndexOutOfRangeException(index, min, max, host);
  }
}
function throwNotImplementedException(method, host) {
  throw new NotImplementedException(method, host);
}
function throwNotSupportedException(member, host) {
  throw new NotSupportedException(member, host);
}
function throwPropertyReadOnlyException(propName, host) {
  throw new PropertyReadOnlyException$1(propName, host);
}
var TryCatch = /*#__PURE__*/function () {
  function TryCatch(fn, context) {
    _classCallCheck(this, TryCatch);
    if (!base.isFunction(fn)) {
      throw "TryCatch.ctor: function expected";
    }
    this.Result = null;
    this.Context = context === undefined ? this : context;
    this._fn = fn;
    this._exception = null;
    this._caught = false;
    this._finalized = false;
  }
  return _createClass(TryCatch, [{
    key: "Run",
    value: function Run() {
      this.Result = this._fn(this.Context);
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
    key: "Catch",
    value: function Catch(exceptionType, fn) {
      var raise = this.hasError;
      if (raise) {
        var callback = fn;
        if (this._finalized) {
          throw "Catch cannot be used after Finally";
        }
        if (callback !== undefined) {
          if (!base.isFunction(callback)) {
            throw "Catch: callback must be a function";
          }
          raise = this.Exception instanceof exceptionType;
        } else {
          callback = exceptionType;
          if (!base.isFunction(callback)) {
            throw "Catch: expected callback function";
          }
        }
        if (raise) {
          callback(this.Exception, this.Context);
          this._caught = true;
        }
      }
      return this;
    }
  }, {
    key: "hasError",
    get: function get() {
      return this.Exception && !this._caught;
    }
  }, {
    key: "Finally",
    value: function Finally(fn) {
      if (this.hasError) {
        throw this.Exception;
      }
      if (fn !== undefined) {
        if (!base.isFunction(fn)) {
          throw "Finally: callback must be a function";
        }
        if (!this._finalized) {
          fn(this.Context);
          this._finalized = true;
        }
      }
      return this;
    }
  }]);
}();
var Try = function Try(fn, context) {
  var result = new TryCatch(fn, context);
  try {
    result.Run();
  } catch (e) {
    if (e instanceof Exception) {
      result.Exception = e;
    } else {
      result.Exception = new Exception(e);
    }
  }
  return result;
};
var Catch = function Catch(x, exceptionType, fn) {
  if (x instanceof TryCatch && x.hasError) {
    x.Catch(exceptionType, fn);
  }
};
var Finally = function Finally(x, fn) {
  if (x instanceof TryCatch) {
    x.Finally(fn);
  }
};
exports.AbstractInstantiationException = AbstractInstantiationException;
exports.ArgumentEmptyException = ArgumentEmptyException;
exports.ArgumentNullException = ArgumentNullException;
exports.ArgumentTypeIncorrectException = ArgumentTypeIncorrectException;
exports.Catch = Catch;
exports.Exception = Exception;
exports.Finally = Finally;
exports.IndexOutOfRangeException = IndexOutOfRangeException;
exports.InvalidHttpMethodException = InvalidHttpMethodException;
exports.NotImplementedException = NotImplementedException;
exports.NotInstanceOfException = NotInstanceOfException;
exports.NotSupportedException = NotSupportedException;
exports.PropertyReadOnlyException = PropertyReadOnlyException$1;
exports.StackTrace = StackTrace;
exports.StackTraceItem = StackTraceItem;
exports.Try = Try;
exports.TryCatch = TryCatch;
exports.throwIfEmpty = throwIfEmpty;
exports.throwIfIndexOutOfRange = throwIfIndexOutOfRange;
exports.throwIfInstantiateAbstract = throwIfInstantiateAbstract;
exports.throwIfNotInstanceOf = throwIfNotInstanceOf;
exports.throwIfNull = throwIfNull;
exports.throwIfNullOrEmpty = throwIfNullOrEmpty;
exports.throwIfTypeIncorrect = throwIfTypeIncorrect;
exports.throwNotImplementedException = throwNotImplementedException;
exports.throwNotSupportedException = throwNotSupportedException;
exports.throwPropertyReadOnlyException = throwPropertyReadOnlyException;
