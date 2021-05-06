"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Exception = Exception;
exports.throwIfInstantiateAbstract = throwIfInstantiateAbstract;
exports.throwIfNotInstanceOf = throwIfNotInstanceOf;
exports.throwIfNull = throwIfNull;
exports.throwIfEmpty = throwIfEmpty;
exports.throwIfTypeIncorrect = throwIfTypeIncorrect;
exports.throwNotImplementedException = throwNotImplementedException;
exports.throwIfIndexOutOfRange = throwIfIndexOutOfRange;
exports.Finally = exports.Catch = exports.Try = exports.TryCatch = exports.IndexOutOfRangeException = exports.InvalidHttpMethodException = exports.NotInstanceOfException = exports.ArgumentTypeIncorrectException = exports.ArgumentEmptyException = exports.ArgumentNullException = exports.NotImplementedException = exports.AbstractInstantiationException = exports.PropertyReadOnlyException = exports.StackTrace = exports.StackTraceItem = void 0;

var _locustjsBase = require("locustjs-base");

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

  this.items = [];

  if ((0, _locustjsBase.isSomeString)(stack)) {
    var lines = stack.split('\n');

    if (lines.length) {
      for (var i = 1; i < lines.length; i++) {
        this.items.push(new StackTraceItem(lines[i]));
      }
    }
  }
};
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


exports.StackTrace = StackTrace;

function Exception(settings) {
  var _message = '';
  var _code = undefined;
  var _status = undefined;
  var _host = undefined;
  var _data = null;
  var _stack = '';
  var _stackTrace = null;
  var _inner = null;

  var _date = new Date();

  var _fileName = undefined;
  var _lineNumber = undefined;
  var _columnNumber = undefined;
  var _name = this.constructor.name;
  var _baseName = '';

  if (settings instanceof Error) {
    _message = settings.message;
    _fileName = settings.fileName;
    _lineNumber = settings.lineNumber;
    _columnNumber = settings.columnNumber;
    _baseName = settings.name;
    _stack = settings.stack;
  } else {
    var _settings = Object.assign({}, settings);

    _message = (0, _locustjsBase.isString)(_settings.message) ? _settings.message : _message;
    _code = (0, _locustjsBase.isNumeric)(_settings.code) ? _settings.code : _code;
    _status = (0, _locustjsBase.isString)(_settings.status) ? _settings.status : _status;
    _host = (0, _locustjsBase.isString)(_settings.host) ? _settings.host : _host;
    _data = _settings.data;
    _date = (0, _locustjsBase.isDate)(_settings.date) ? _settings.date : _date;
    _stack = (0, _locustjsBase.isString)(_settings.stack) ? _settings.stack : _stack;
    _fileName = (0, _locustjsBase.isString)(_settings.fileName) ? _settings.fileName : _fileName;
    _lineNumber = (0, _locustjsBase.isNumeric)(_settings.lineNumber) ? _settings.lineNumber : _lineNumber;
    _columnNumber = (0, _locustjsBase.isNumeric)(_settings.columnNumber) ? _settings.columnNumber : _columnNumber;
    _baseName = (0, _locustjsBase.isString)(_settings.baseName) ? _settings.baseName : _baseName;

    if (_settings.innerException) {
      if (_settings.innerException instanceof Exception) {
        _inner = _settings.innerException;
      } else if (_settings.innerException instanceof Error) {
        _inner = new Exception(_settings.innerException);
      } else {
        throw "Exception.ctor: innerException must be an instance of Error or Exception";
      }
    }
  }

  if ((0, _locustjsBase.isEmpty)(_stack) && (0, _locustjsBase.isFunction)(Error.captureStackTrace)) {
    try {
      var temp = {};
      Error.captureStackTrace(temp, Exception);
      _stack = temp.stack;

      if (_stack.startsWith('Error\n')) {
        _stack = _message + '\n' + _stack.substr(7);
      }
    } catch (_unused) {}
  }

  _stackTrace = (0, _locustjsBase.isEmpty)(_stack) ? null : new StackTrace(_stack);

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
      set: propertyIsReadOnly('Exception.name')
    },
    baseName: {
      enumerable: true,
      get: function get() {
        return _baseName;
      },
      set: propertyIsReadOnly('Exception.baseName')
    },
    code: {
      enumerable: true,
      get: function get() {
        return _code;
      },
      set: propertyIsReadOnly('Exception.code')
    },
    status: {
      enumerable: true,
      get: function get() {
        return _status;
      },
      set: propertyIsReadOnly('Exception.status')
    },
    host: {
      enumerable: true,
      get: function get() {
        return _host;
      },
      set: propertyIsReadOnly('Exception.host')
    },
    message: {
      enumerable: true,
      get: function get() {
        return _message;
      },
      set: propertyIsReadOnly('Exception.message')
    },
    stack: {
      enumerable: true,
      get: function get() {
        return _stack;
      },
      set: propertyIsReadOnly('Exception.stack')
    },
    stackTrace: {
      enumerable: true,
      get: function get() {
        return _stackTrace;
      },
      set: propertyIsReadOnly('Exception.stackTrace')
    },
    innerException: {
      enumerable: true,
      get: function get() {
        return _inner;
      },
      set: propertyIsReadOnly('Exception.innerException')
    },
    data: {
      enumerable: true,
      get: function get() {
        return _data;
      },
      set: propertyIsReadOnly('Exception.data')
    },
    date: {
      enumerable: true,
      get: function get() {
        return _date;
      },
      set: propertyIsReadOnly('Exception.date')
    },
    fileName: {
      enumerable: true,
      get: function get() {
        return _fileName;
      },
      set: propertyIsReadOnly('Exception.fileName')
    },
    lineNumber: {
      enumerable: true,
      get: function get() {
        return _lineNumber;
      },
      set: propertyIsReadOnly('Exception.lineNumber')
    },
    columnNumber: {
      enumerable: true,
      get: function get() {
        return _columnNumber;
      },
      set: propertyIsReadOnly('Exception.columnNumber')
    }
  });
}

Exception.prototype.toString = function () {
  var separator = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '\n';
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
  _inherits(PropertyReadOnlyException, _Exception);

  var _super = _createSuper(PropertyReadOnlyException);

  function PropertyReadOnlyException(propertyName, host) {
    _classCallCheck(this, PropertyReadOnlyException);

    return _super.call(this, {
      message: "property '".concat(propertyName || '?', "' is read-only."),
      status: 'property-readonly',
      host: host
    });
  }

  return PropertyReadOnlyException;
}(Exception);

exports.PropertyReadOnlyException = PropertyReadOnlyException;

var AbstractInstantiationException = /*#__PURE__*/function (_Exception2) {
  _inherits(AbstractInstantiationException, _Exception2);

  var _super2 = _createSuper(AbstractInstantiationException);

  function AbstractInstantiationException(type, host) {
    _classCallCheck(this, AbstractInstantiationException);

    return _super2.call(this, {
      message: "cannot instantiate from abstract class '".concat(type || '?', "'."),
      status: 'cannot-instantiate-from-abstract',
      host: host
    });
  }

  return AbstractInstantiationException;
}(Exception);

exports.AbstractInstantiationException = AbstractInstantiationException;

var NotImplementedException = /*#__PURE__*/function (_Exception3) {
  _inherits(NotImplementedException, _Exception3);

  var _super3 = _createSuper(NotImplementedException);

  function NotImplementedException(method, host) {
    _classCallCheck(this, NotImplementedException);

    return _super3.call(this, {
      message: "method '".concat(method || '?', "' is not implemented."),
      status: 'method-not-implemented',
      host: host
    });
  }

  return NotImplementedException;
}(Exception);

exports.NotImplementedException = NotImplementedException;

var IndexOutOfRangeException = /*#__PURE__*/function (_Exception4) {
  _inherits(IndexOutOfRangeException, _Exception4);

  var _super4 = _createSuper(IndexOutOfRangeException);

  function IndexOutOfRangeException(index, min, max, host) {
    _classCallCheck(this, IndexOutOfRangeException);

    return _super4.call(this, {
      message: "index".concat((0, _locustjsBase.isEmpty)(index) ? '' : " '".concat(index, "'"), " is out of range [").concat(min || '0', ", ").concat(max, "]."),
      status: 'index-out-of-range',
      host: host
    });
  }

  return IndexOutOfRangeException;
}(Exception);

exports.IndexOutOfRangeException = IndexOutOfRangeException;

var ArgumentNullException = /*#__PURE__*/function (_Exception5) {
  _inherits(ArgumentNullException, _Exception5);

  var _super5 = _createSuper(ArgumentNullException);

  function ArgumentNullException(arg, host) {
    _classCallCheck(this, ArgumentNullException);

    return _super5.call(this, {
      message: "argument '".concat(arg || '?', "' cannot be null or undefined."),
      status: 'argument-null',
      host: host
    });
  }

  return ArgumentNullException;
}(Exception);

exports.ArgumentNullException = ArgumentNullException;

var ArgumentEmptyException = /*#__PURE__*/function (_Exception6) {
  _inherits(ArgumentEmptyException, _Exception6);

  var _super6 = _createSuper(ArgumentEmptyException);

  function ArgumentEmptyException(arg, host) {
    _classCallCheck(this, ArgumentEmptyException);

    return _super6.call(this, {
      message: "argument '".concat(arg || '?', "' cannot be null, undefined or empty strings."),
      status: 'argument-empty',
      host: host
    });
  }

  return ArgumentEmptyException;
}(Exception);

exports.ArgumentEmptyException = ArgumentEmptyException;

var ArgumentTypeIncorrectException = /*#__PURE__*/function (_Exception7) {
  _inherits(ArgumentTypeIncorrectException, _Exception7);

  var _super7 = _createSuper(ArgumentTypeIncorrectException);

  function ArgumentTypeIncorrectException(arg, type, host) {
    _classCallCheck(this, ArgumentTypeIncorrectException);

    return _super7.call(this, {
      message: "argument '".concat(arg || '?', "' has an incorrect type. ").concat(type, " expected."),
      status: 'argument-type-incorrect',
      host: host
    });
  }

  return ArgumentTypeIncorrectException;
}(Exception);

exports.ArgumentTypeIncorrectException = ArgumentTypeIncorrectException;

var NotInstanceOfException = /*#__PURE__*/function (_Exception8) {
  _inherits(NotInstanceOfException, _Exception8);

  var _super8 = _createSuper(NotInstanceOfException);

  function NotInstanceOfException(arg, type, host) {
    _classCallCheck(this, NotInstanceOfException);

    return _super8.call(this, {
      message: "argument '".concat(arg || '?', "' must be an instance of ").concat(type),
      status: 'argument-not-instance-of',
      host: host
    });
  }

  return NotInstanceOfException;
}(Exception);

exports.NotInstanceOfException = NotInstanceOfException;

var InvalidHttpMethodException = /*#__PURE__*/function (_Exception9) {
  _inherits(InvalidHttpMethodException, _Exception9);

  var _super9 = _createSuper(InvalidHttpMethodException);

  function InvalidHttpMethodException(method, host) {
    _classCallCheck(this, InvalidHttpMethodException);

    return _super9.call(this, {
      message: "invalid http method '".concat(method || '?', "'. expected GET, POST, PUT or DELETE."),
      status: 'invalid-http-method',
      host: host
    });
  }

  return InvalidHttpMethodException;
}(Exception);

exports.InvalidHttpMethodException = InvalidHttpMethodException;

function throwIfInstantiateAbstract(classType, instance, host) {
  if (instance.constructor === classType) {
    throw new AbstractInstantiationException(classType.name, host);
  }
}

function throwIfNotInstanceOf(argName, classType, instance) {
  var ignoreNull = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var host = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '';

  if ((0, _locustjsBase.isNull)(instance)) {
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
  if ((0, _locustjsBase.isNull)(arg)) {
    throw new ArgumentNullException(argName, host);
  }
}

function throwIfEmpty(arg, argName, host) {
  if ((0, _locustjsBase.isEmpty)(arg)) {
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
  throwIfEmpty(index, 'index', host);

  if (!(0, _locustjsBase.isNumeric)(min)) {
    min = 0;
  }

  if (!(0, _locustjsBase.isNumeric)(max)) {
    max = 0;
  }

  if (!(0, _locustjsBase.isNumeric)(index)) {
    index = -1;
  }

  if (index < min || index > max) {
    throw new IndexOutOfRangeException(index, min, max, host);
  }
}

function throwNotImplementedException(method, host) {
  throw new NotImplementedException(method, host);
}

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
          if (!(0, _locustjsBase.isFunction)(callback)) {
            throw "Catch: callback must be a function";
          }

          raise = this.Exception instanceof exceptionType;
        } else {
          callback = exceptionType;

          if (!(0, _locustjsBase.isFunction)(callback)) {
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
  }]);

  return TryCatch;
}();

exports.TryCatch = TryCatch;

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

exports.Try = Try;

var Catch = function Catch(x, exceptionType, fn) {
  if (x instanceof TryCatch && x.hasError) {
    x.Catch(exceptionType, fn);
  }
};

exports.Catch = Catch;

var Finally = function Finally(x, fn) {
  if (x instanceof TryCatch) {
    x.Finally(fn);
  }
};

exports.Finally = Finally;
