'use strict';

var base = require('@locustjs/base');

function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _assertThisInitialized(e) {
  if (undefined === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function _callSuper(t, o, e) {
  return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e));
}
function _classCallCheck(a, n) {
  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || false, o.configurable = true, "value" in o && (o.writable = true), Object.defineProperty(e, _toPropertyKey(o.key), o);
  }
}
function _createClass(e, r, t) {
  return r && _defineProperties(e.prototype, r), Object.defineProperty(e, "prototype", {
    writable: false
  }), e;
}
function _createForOfIteratorHelper(r, e) {
  var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (!t) {
    if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e) {
      t && (r = t);
      var n = 0,
        F = function () {};
      return {
        s: F,
        n: function () {
          return n >= r.length ? {
            done: true
          } : {
            done: false,
            value: r[n++]
          };
        },
        e: function (r) {
          throw r;
        },
        f: F
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var o,
    a = true,
    u = false;
  return {
    s: function () {
      t = t.call(r);
    },
    n: function () {
      var r = t.next();
      return a = r.done, r;
    },
    e: function (r) {
      u = true, o = r;
    },
    f: function () {
      try {
        a || null == t.return || t.return();
      } finally {
        if (u) throw o;
      }
    }
  };
}
function _getPrototypeOf(t) {
  return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
    return t.__proto__ || Object.getPrototypeOf(t);
  }, _getPrototypeOf(t);
}
function _inherits(t, e) {
  if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
  t.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: t,
      writable: true,
      configurable: true
    }
  }), Object.defineProperty(t, "prototype", {
    writable: false
  }), e && _setPrototypeOf(t, e);
}
function _isNativeReflectConstruct() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
  } catch (t) {}
  return (_isNativeReflectConstruct = function () {
    return !!t;
  })();
}
function _possibleConstructorReturn(t, e) {
  if (e && ("object" == typeof e || "function" == typeof e)) return e;
  if (undefined !== e) throw new TypeError("Derived constructors may only return object or undefined");
  return _assertThisInitialized(t);
}
function _setPrototypeOf(t, e) {
  return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
    return t.__proto__ = e, t;
  }, _setPrototypeOf(t, e);
}
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (undefined !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (String )(t);
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : undefined;
  }
}

var StackTraceItem = /*#__PURE__*/_createClass(function StackTraceItem(line) {
  _classCallCheck(this, StackTraceItem);
  if (base.isSomeString(line)) {
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
    this.message = line.trim();
  } else {
    this.line = 0;
    this.col = 0;
    this.callSite = "";
    this.source = "";
    this.message = "";
  }
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
var PropertyReadOnlyException = /*#__PURE__*/function (_Exception) {
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

var AbstractInstantiationException = /*#__PURE__*/function (_Exception) {
  function AbstractInstantiationException(type, host) {
    var _this;
    _classCallCheck(this, AbstractInstantiationException);
    _this = _callSuper(this, AbstractInstantiationException, [{
      message: "cannot instantiate from abstract class '".concat(type || "?", "'."),
      status: "cannot-instantiate-from-abstract-class",
      host: host
    }]);
    _this.type = type;
    return _this;
  }
  _inherits(AbstractInstantiationException, _Exception);
  return _createClass(AbstractInstantiationException);
}(Exception);
var NotImplementedException = /*#__PURE__*/function (_Exception2) {
  function NotImplementedException(methodName, host) {
    var _this2;
    _classCallCheck(this, NotImplementedException);
    _this2 = _callSuper(this, NotImplementedException, [{
      message: "method '".concat(methodName || "?", "' is not implemented."),
      status: "method-not-implemented",
      host: host
    }]);
    _this2.methodName = methodName;
    return _this2;
  }
  _inherits(NotImplementedException, _Exception2);
  return _createClass(NotImplementedException);
}(Exception);
var NotSupportedException = /*#__PURE__*/function (_Exception3) {
  function NotSupportedException(value, host) {
    var _this3;
    _classCallCheck(this, NotSupportedException);
    _this3 = _callSuper(this, NotSupportedException, [{
      message: "'".concat(value || "?", "' is not supported."),
      status: "not-supported",
      host: host
    }]);
    _this3.value = value;
    return _this3;
  }
  _inherits(NotSupportedException, _Exception3);
  return _createClass(NotSupportedException);
}(Exception);
var IndexOutOfRangeException = /*#__PURE__*/function (_Exception4) {
  function IndexOutOfRangeException(index, min, max, host) {
    var _this4;
    _classCallCheck(this, IndexOutOfRangeException);
    _this4 = _callSuper(this, IndexOutOfRangeException, [{
      message: "index ".concat(base.isEmpty(index) ? "" : "'".concat(index, "'"), " is out of range [").concat(min || "0", ", ").concat(max, "]."),
      status: "index-out-of-range",
      host: host
    }]);
    _this4.index = index;
    _this4.min = min;
    _this4.max = max;
    return _this4;
  }
  _inherits(IndexOutOfRangeException, _Exception4);
  return _createClass(IndexOutOfRangeException);
}(Exception);
var ArgumentNullException = /*#__PURE__*/function (_Exception5) {
  function ArgumentNullException(argName, host) {
    var _this5;
    _classCallCheck(this, ArgumentNullException);
    _this5 = _callSuper(this, ArgumentNullException, [{
      message: "argument '".concat(argName || "?", "' cannot be null."),
      status: "argument-null",
      host: host
    }]);
    _this5.argName = argName;
    return _this5;
  }
  _inherits(ArgumentNullException, _Exception5);
  return _createClass(ArgumentNullException);
}(Exception);
var ArgumentUndefinedException = /*#__PURE__*/function (_Exception6) {
  function ArgumentUndefinedException(argName, host) {
    var _this6;
    _classCallCheck(this, ArgumentUndefinedException);
    _this6 = _callSuper(this, ArgumentUndefinedException, [{
      message: "argument '".concat(argName || "?", "' cannot be undefined."),
      status: "argument-undefined",
      host: host
    }]);
    _this6.argName = argName;
    return _this6;
  }
  _inherits(ArgumentUndefinedException, _Exception6);
  return _createClass(ArgumentUndefinedException);
}(Exception);
var ArgumentNullOrUndefinedException = /*#__PURE__*/function (_Exception7) {
  function ArgumentNullOrUndefinedException(argName, host) {
    var _this7;
    _classCallCheck(this, ArgumentNullOrUndefinedException);
    _this7 = _callSuper(this, ArgumentNullOrUndefinedException, [{
      message: "argument '".concat(argName || "?", "' cannot be null or undefined."),
      status: "argument-null-or-undefined",
      host: host
    }]);
    _this7.argName = argName;
    return _this7;
  }
  _inherits(ArgumentNullOrUndefinedException, _Exception7);
  return _createClass(ArgumentNullOrUndefinedException);
}(Exception);
var ArgumentNullOrEmptyException = /*#__PURE__*/function (_Exception8) {
  function ArgumentNullOrEmptyException(argName, host) {
    var _this8;
    _classCallCheck(this, ArgumentNullOrEmptyException);
    _this8 = _callSuper(this, ArgumentNullOrEmptyException, [{
      message: "argument '".concat(argName || "?", "' cannot be null, undefined or zero-length string."),
      status: "argument-null-or-empty",
      host: host
    }]);
    _this8.argName = argName;
    return _this8;
  }
  _inherits(ArgumentNullOrEmptyException, _Exception8);
  return _createClass(ArgumentNullOrEmptyException);
}(Exception);
var ArgumentEmptyException = /*#__PURE__*/function (_Exception9) {
  function ArgumentEmptyException(argName, host) {
    var _this9;
    _classCallCheck(this, ArgumentEmptyException);
    _this9 = _callSuper(this, ArgumentEmptyException, [{
      message: "argument '".concat(argName || "?", "' cannot be null, undefined or empty strings."),
      status: "argument-empty",
      host: host
    }]);
    _this9.argName = argName;
    return _this9;
  }
  _inherits(ArgumentEmptyException, _Exception9);
  return _createClass(ArgumentEmptyException);
}(Exception);
var ArgumentNothingException = /*#__PURE__*/function (_Exception10) {
  function ArgumentNothingException(argName, host) {
    var _this10;
    _classCallCheck(this, ArgumentNothingException);
    _this10 = _callSuper(this, ArgumentNothingException, [{
      message: "argument '".concat(argName || "?", "' cannot be null, undefined, empty strings or empty object."),
      status: "argument-nothing",
      host: host
    }]);
    _this10.argName = argName;
    return _this10;
  }
  _inherits(ArgumentNothingException, _Exception10);
  return _createClass(ArgumentNothingException);
}(Exception);
var ArgumentTypeIncorrectException = /*#__PURE__*/function (_Exception11) {
  function ArgumentTypeIncorrectException(argName, argType, type, host) {
    var _this11;
    _classCallCheck(this, ArgumentTypeIncorrectException);
    _this11 = _callSuper(this, ArgumentTypeIncorrectException, [{
      message: "argument '".concat(argName || "?", "' has an incorrect type (").concat(argType, "). expected '").concat(type, "'."),
      status: "argument-type-incorrect",
      host: host
    }]);
    _this11.argName = argName;
    _this11.argType = argType;
    _this11.type = type;
    return _this11;
  }
  _inherits(ArgumentTypeIncorrectException, _Exception11);
  return _createClass(ArgumentTypeIncorrectException);
}(Exception);
var PropertyMissingException = /*#__PURE__*/function (_Exception12) {
  function PropertyMissingException(objName, propName, host) {
    var _this12;
    _classCallCheck(this, PropertyMissingException);
    _this12 = _callSuper(this, PropertyMissingException, [{
      message: "object '".concat(objName || "?", "' misses '").concat(propName, "' property."),
      status: "property-missing",
      host: host
    }]);
    _this12.objName = objName;
    _this12.propName = propName;
    return _this12;
  }
  _inherits(PropertyMissingException, _Exception12);
  return _createClass(PropertyMissingException);
}(Exception);
var ComparisonFailedException = /*#__PURE__*/function (_Exception13) {
  function ComparisonFailedException(arg1Name, arg1Value, arg2Name, arg2Value, operator, host) {
    var _this13;
    _classCallCheck(this, ComparisonFailedException);
    var comparison;
    var not = "not ";
    switch (operator) {
      case "<":
        comparison = "less than";
        break;
      case "<=":
        comparison = "less than or equal to";
        break;
      case ">":
        comparison = "greater than";
        break;
      case ">=":
        comparison = "greater than or equal to";
        break;
      case "==":
        comparison = "equal to";
        break;
      case "===":
        comparison = "type-equal to";
        break;
      case "!=":
        comparison = "equal to";
        not = "";
        break;
      case "!==":
        comparison = "type-equal to";
        not = "";
        break;
      default:
        comparison = "?";
        break;
    }
    _this13 = _callSuper(this, ComparisonFailedException, [{
      message: "'".concat(arg1Name, "' should ").concat(not, "be ").concat(comparison, " '").concat(arg2Name, "' (").concat(arg1Value, " is ").concat(comparison, " ").concat(arg2Value, ")."),
      status: "comparison-failed",
      host: host
    }]);
    _this13.arg1Name = arg1Name;
    _this13.arg1Value = arg1Value;
    _this13.arg2Name = arg2Name;
    _this13.arg2Value = arg2Value;
    _this13.operator = operator;
    return _this13;
  }
  _inherits(ComparisonFailedException, _Exception13);
  return _createClass(ComparisonFailedException);
}(Exception);
var NotInstanceOfException = /*#__PURE__*/function (_Exception14) {
  function NotInstanceOfException(argName, type, host) {
    var _this14;
    _classCallCheck(this, NotInstanceOfException);
    _this14 = _callSuper(this, NotInstanceOfException, [{
      message: "argument '".concat(argName || "?", "' must be an instance of ").concat(type),
      status: "argument-not-instance-of",
      host: host
    }]);
    _this14.argName = argName;
    _this14.type = type;
    return _this14;
  }
  _inherits(NotInstanceOfException, _Exception14);
  return _createClass(NotInstanceOfException);
}(Exception);
var InvalidValueException = /*#__PURE__*/function (_Exception15) {
  function InvalidValueException(argName, argValue, host) {
    var _this15;
    _classCallCheck(this, InvalidValueException);
    _this15 = _callSuper(this, InvalidValueException, [{
      message: "argument ".concat(argName || "?", " has an invalid value '").concat(argValue, "'."),
      status: "invalid-value",
      host: host
    }]);
    _this15.argName = argName;
    _this15.argValue = argValue;
    return _this15;
  }
  _inherits(InvalidValueException, _Exception15);
  return _createClass(InvalidValueException);
}(Exception);
var InvalidHttpMethodException = /*#__PURE__*/function (_Exception16) {
  function InvalidHttpMethodException(httpMethod, host) {
    var _this16;
    _classCallCheck(this, InvalidHttpMethodException);
    _this16 = _callSuper(this, InvalidHttpMethodException, [{
      message: "invalid http method '".concat(httpMethod || "?", "'. expected GET, POST, PUT or DELETE."),
      status: "invalid-http-method",
      host: host
    }]);
    _this16.httpMethod = httpMethod;
    return _this16;
  }
  _inherits(InvalidHttpMethodException, _Exception16);
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
  if (base.isNullOrUndefined(instance)) {
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
function throwIfUndefined(arg, argName, host) {
  if (base.isUndefined(arg)) {
    throw new ArgumentUndefinedException(argName, host);
  }
}
function throwIfNullOrUndefined(arg, argName, host) {
  if (base.isNullOrUndefined(arg)) {
    throw new ArgumentNullOrUndefinedException(argName, host);
  }
}
function throwIfNullOrEmpty(arg, argName, host) {
  if (base.isNullOrEmpty(arg)) {
    throw new ArgumentNullOrEmptyException(argName, host);
  }
}
function throwIfEmpty(arg, argName, host) {
  if (base.isEmpty(arg)) {
    throw new ArgumentEmptyException(argName, host);
  }
}
function throwIfNothing(arg, argName, host) {
  if (base.isNothing(arg)) {
    throw new ArgumentNothingException(argName, host);
  }
}
function throwIfInvalid(arg, argName, fnValidate, host) {
  throwIfNotSomeString(argName, "argName", host);
  throwIfNotFunction(fnValidate, "fnValidate", host);
  if (!fnValidate(arg)) {
    throw new InvalidValueException(argName, arg, host);
  }
}
function throwIfMissingProperty(obj, objName, prop, host) {
  throwIfNotObject(obj);
  throwIfNotString(prop, 'prop', host);
  if (base.isNullOrUndefined(obj[prop])) {
    throw new PropertyMissingException(objName, prop, host);
  }
}
function throwIfTypeIncorrect(arg, argName, typeOrCheckType, host) {
  var err;
  var type;
  if (base.isFunction(typeOrCheckType)) {
    type = err = typeOrCheckType(arg);
  } else if (base.isSomeString(typeOrCheckType)) {
    type = typeOrCheckType;
    var required = true;
    if (type.endsWith("?")) {
      required = false;
      type = type.substr(0, type.length - 1);
    }
    if (required) {
      throwIfNullOrUndefined(arg, argName, host);
    }
    if (!base.isUndefined(arg)) {
      switch (type) {
        case "number":
          err = !base.isNumber(arg);
          break;
        case "number+":
          err = !base.isSomeNumber(arg);
          break;
        case "numeric":
          err = !base.isNumeric(arg);
          break;
        case "int":
        case "integer":
          err = !base.isInteger(arg);
          break;
        case "int+":
        case "integer+":
          err = !(base.isInteger(arg) && arg == 0);
          break;
        case "float":
          err = !base.isFloat(arg);
          break;
        case "float+":
          err = !(base.isFloat(arg) && arg == 0);
          break;
        case "string":
          err = !base.isString(arg);
          break;
        case "string+":
          err = !base.isSomeString(arg);
          break;
        case "bool":
          err = !base.isBool(arg);
          break;
        case "bool*":
          err = !base.hasBool(arg);
          break;
        case "bool#":
          err = !base.hasBool(arg, "pu");
          break;
        case "bool^":
          err = !base.hasBool(arg, "p");
          break;
        case "bool!":
          err = !base.hasBool(arg, "");
          break;
        case "array":
          err = !base.isArray(arg);
          break;
        case "array+":
          err = !base.isSomeArray(arg);
          break;
        case "object":
          err = !base.isObject(arg);
          break;
        case "object+":
          err = !base.isSomeObject(arg);
          break;
        case "date":
          err = !base.isDate(arg);
          break;
        case "function":
          err = !base.isFunction(arg);
          break;
        case "basic":
          err = !base.isBasic(arg);
          break;
        case "primitive":
          err = !base.isPrimitive(arg);
          break;
        default:
          if (base.isObject(arg) && base.isFunction(arg.constructor)) {
            err = arg.constructor.name != type;
          } else {
            err = _typeof(arg) == type;
          }
          break;
      }
    }
  }
  if (err) {
    throw new ArgumentTypeIncorrectException(argName, _typeof(arg), type, host);
  }
}
function throwIfNotNumber(arg, argName, host) {
  throwIfTypeIncorrect(arg, argName, "number", host);
}
function throwIfNotSomeNumber(arg, argName, host) {
  throwIfTypeIncorrect(arg, argName, "number+", host);
}
function throwIfNotNumeric(arg, argName, host) {
  throwIfTypeIncorrect(arg, argName, "numeric", host);
}
function throwIfNotBool(arg, argName, host) {
  throwIfTypeIncorrect(arg, argName, "bool", host);
}
function throwIfNotHasBool(arg, argName, host) {
  throwIfTypeIncorrect(arg, argName, "bool#", host);
}
function throwIfNotString(arg, argName, host) {
  throwIfTypeIncorrect(arg, argName, "string", host);
}
function throwIfNotSomeString(arg, argName, host) {
  throwIfTypeIncorrect(arg, argName, "string+", host);
}
function throwIfNotDate(arg, argName, host) {
  throwIfTypeIncorrect(arg, argName, "date", host);
}
function throwIfNotObject(arg, argName, host) {
  throwIfTypeIncorrect(arg, argName, "object", host);
}
function throwIfNotSomeObject(arg, argName, host) {
  throwIfTypeIncorrect(arg, argName, "object+", host);
}
function throwIfNotFunction(arg, argName, host) {
  throwIfTypeIncorrect(arg, argName, "function", host);
}
function throwIfNotInt(arg, argName, host) {
  throwIfTypeIncorrect(arg, argName, "int", host);
}
function throwIfNotSomeInt(arg, argName, host) {
  throwIfTypeIncorrect(arg, argName, "int+", host);
}
function throwIfNotFloat(arg, argName, host) {
  throwIfTypeIncorrect(arg, argName, "float", host);
}
function throwIfNotSomeFloat(arg, argName, host) {
  throwIfTypeIncorrect(arg, argName, "float+", host);
}
function throwIfNotArray(arg, argName, host) {
  throwIfTypeIncorrect(arg, argName, "array", host);
}
function throwIfNotSomeArray(arg, argName, host) {
  throwIfTypeIncorrect(arg, argName, "array+", host);
}
function throwIfNotBasic(arg, argName, host) {
  throwIfTypeIncorrect(arg, argName, "basic", host);
}
function throwIfNotPrimitive(arg, argName, host) {
  throwIfTypeIncorrect(arg, argName, "primitive", host);
}
function throwIfNotInShape(arg, argName, shape, host) {
  throwIfNotObject(shape, "shape", host);
  throwIfNotObject(arg, argName, host);
  for (var _i = 0, _Object$keys = Object.keys(shape); _i < _Object$keys.length; _i++) {
    var key = _Object$keys[_i];
    var type = shape[key];
    var required = true;
    if (base.isObject(type)) {
      required = type.required ? true : false;
      var array = type.array ? true : false;
      var _type = type.type;
      var validate = type.validate;
      if (required) {
        throwIfMissingProperty(arg, argName, key, host);
      }
      if (array) {
        if (!base.isNullOrUndefined(arg[key])) {
          throwIfNotArray(arg[key], key, host);
          var i = 0;
          var _iterator = _createForOfIteratorHelper(arg[key]),
            _step;
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var value = _step.value;
              if (base.isObject(type.shape)) {
                throwIfNotInShape(value, key, type.shape, host);
              } else {
                throwIfTypeIncorrect(value, i, _type, host);
              }
              if (base.isFunction(validate)) {
                throwIfInvalid(arg[key], key, validate, host);
              }
              i++;
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        }
      } else {
        if (base.isObject(type.shape)) {
          if (!base.isNullOrUndefined(arg[key])) {
            throwIfNotInShape(arg[key], key, type.shape, host);
          }
        } else {
          throwIfTypeIncorrect(arg[key], key, _type, host);
        }
        if (base.isFunction(validate)) {
          throwIfInvalid(arg[key], key, validate, host);
        }
      }
    } else if (base.isString(type)) {
      if (type.endsWith("?")) {
        required = false;
      }
      if (required) {
        throwIfMissingProperty(arg, argName, key, host);
      }
      throwIfTypeIncorrect(arg[key], key, type, host);
    } else if (base.isFunction(type)) {
      throwIfTypeIncorrect(arg[key], key, type, host);
    } else {
      throw new InvalidValueException(key, type, host);
    }
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
function throwIfComparisonFailed(arg) {
  var comparisonFailed;
  throwIfTypeIncorrect(arg, "arg", "object");
  var arg1Value = arg.a;
  var arg1Name = "a";
  var arg2Value = arg.b;
  var arg2Name = "b";
  var operator = arg.operator;
  var host = arg.host;
  switch (operator) {
    case "<":
      comparisonFailed = arg1Value < arg2Value;
      break;
    case "<=":
      comparisonFailed = arg1Value <= arg2Value;
      break;
    case ">":
      comparisonFailed = arg1Value > arg2Value;
      break;
    case ">=":
      comparisonFailed = arg1Value >= arg2Value;
      break;
    case "==":
      comparisonFailed = arg1Value == arg2Value;
      break;
    case "===":
      comparisonFailed = arg1Value === arg2Value;
      break;
    case "!=":
      comparisonFailed = arg1Value != arg2Value;
      break;
    case "!==":
      comparisonFailed = arg1Value !== arg2Value;
      break;
    default:
      throw new InvalidValueException("operator", operator, host);
  }
  if (comparisonFailed) {
    throw new ComparisonFailedException(arg1Name, arg1Value, arg2Name, arg2Value, operator, host);
  }
}
function throwIfLessThan(a, b) {
  throwIfComparisonFailed({
    a: a,
    b: b,
    operator: "<"
  });
}
function throwIfLessThanOrEqualTo(a, b) {
  throwIfComparisonFailed({
    a: a,
    b: b,
    operator: "<="
  });
}
function throwIfGreaterThan(a, b) {
  throwIfComparisonFailed({
    a: a,
    b: b,
    operator: ">"
  });
}
function throwIfGreaterThanOrEqualTo(a, b) {
  throwIfComparisonFailed({
    a: a,
    b: b,
    operator: ">="
  });
}
function throwIfEqualTo(a, b) {
  throwIfComparisonFailed({
    a: a,
    b: b,
    operator: "=="
  });
}
function throwIfNotEqualTo(a, b) {
  throwIfComparisonFailed({
    a: a,
    b: b,
    operator: "!="
  });
}
function throwIfTypeEqualTo(a, b) {
  throwIfComparisonFailed({
    a: a,
    b: b,
    operator: "==="
  });
}
function throwIfNotTypeEqualTo(a, b) {
  throwIfComparisonFailed({
    a: a,
    b: b,
    operator: "!=="
  });
}
function throwNotImplementedException(method, host) {
  throw new NotImplementedException(method, host);
}
function throwNotSupportedException(member, host) {
  throw new NotSupportedException(member, host);
}

var TryCatch = /*#__PURE__*/function () {
  function TryCatch(fn, context) {
    _classCallCheck(this, TryCatch);
    throwIfNotFunction(fn, 'fn', 'TryCatch.ctor');
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
          throwIfUndefined(callback, 'callback', 'TryCatch.Catch');
          raise = this.Exception instanceof exceptionType;
        } else {
          callback = exceptionType;
          throwIfNotFunction(callback, 'callback', 'TryCatch.Catch');
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
        throwIfNotFunction(fn, 'fn', 'TryCatch.Finally');
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
exports.ArgumentNothingException = ArgumentNothingException;
exports.ArgumentNullException = ArgumentNullException;
exports.ArgumentNullOrEmptyException = ArgumentNullOrEmptyException;
exports.ArgumentNullOrUndefinedException = ArgumentNullOrUndefinedException;
exports.ArgumentTypeIncorrectException = ArgumentTypeIncorrectException;
exports.ArgumentUndefinedException = ArgumentUndefinedException;
exports.Catch = Catch;
exports.ComparisonFailedException = ComparisonFailedException;
exports.Exception = Exception;
exports.Finally = Finally;
exports.IndexOutOfRangeException = IndexOutOfRangeException;
exports.InvalidHttpMethodException = InvalidHttpMethodException;
exports.InvalidValueException = InvalidValueException;
exports.NotImplementedException = NotImplementedException;
exports.NotInstanceOfException = NotInstanceOfException;
exports.NotSupportedException = NotSupportedException;
exports.PropertyMissingException = PropertyMissingException;
exports.PropertyReadOnlyException = PropertyReadOnlyException;
exports.StackTrace = StackTrace;
exports.StackTraceItem = StackTraceItem;
exports.Try = Try;
exports.TryCatch = TryCatch;
exports.throwIfComparisonFailed = throwIfComparisonFailed;
exports.throwIfEmpty = throwIfEmpty;
exports.throwIfEqualTo = throwIfEqualTo;
exports.throwIfGreaterThan = throwIfGreaterThan;
exports.throwIfGreaterThanOrEqualTo = throwIfGreaterThanOrEqualTo;
exports.throwIfIndexOutOfRange = throwIfIndexOutOfRange;
exports.throwIfInstantiateAbstract = throwIfInstantiateAbstract;
exports.throwIfInvalid = throwIfInvalid;
exports.throwIfLessThan = throwIfLessThan;
exports.throwIfLessThanOrEqualTo = throwIfLessThanOrEqualTo;
exports.throwIfMissingProperty = throwIfMissingProperty;
exports.throwIfNotArray = throwIfNotArray;
exports.throwIfNotBasic = throwIfNotBasic;
exports.throwIfNotBool = throwIfNotBool;
exports.throwIfNotDate = throwIfNotDate;
exports.throwIfNotEqualTo = throwIfNotEqualTo;
exports.throwIfNotFloat = throwIfNotFloat;
exports.throwIfNotFunction = throwIfNotFunction;
exports.throwIfNotHasBool = throwIfNotHasBool;
exports.throwIfNotInShape = throwIfNotInShape;
exports.throwIfNotInstanceOf = throwIfNotInstanceOf;
exports.throwIfNotInt = throwIfNotInt;
exports.throwIfNotNumber = throwIfNotNumber;
exports.throwIfNotNumeric = throwIfNotNumeric;
exports.throwIfNotObject = throwIfNotObject;
exports.throwIfNotPrimitive = throwIfNotPrimitive;
exports.throwIfNotSomeArray = throwIfNotSomeArray;
exports.throwIfNotSomeFloat = throwIfNotSomeFloat;
exports.throwIfNotSomeInt = throwIfNotSomeInt;
exports.throwIfNotSomeNumber = throwIfNotSomeNumber;
exports.throwIfNotSomeObject = throwIfNotSomeObject;
exports.throwIfNotSomeString = throwIfNotSomeString;
exports.throwIfNotString = throwIfNotString;
exports.throwIfNotTypeEqualTo = throwIfNotTypeEqualTo;
exports.throwIfNothing = throwIfNothing;
exports.throwIfNull = throwIfNull;
exports.throwIfNullOrEmpty = throwIfNullOrEmpty;
exports.throwIfNullOrUndefined = throwIfNullOrUndefined;
exports.throwIfTypeEqualTo = throwIfTypeEqualTo;
exports.throwIfTypeIncorrect = throwIfTypeIncorrect;
exports.throwIfUndefined = throwIfUndefined;
exports.throwNotImplementedException = throwNotImplementedException;
exports.throwNotSupportedException = throwNotSupportedException;
