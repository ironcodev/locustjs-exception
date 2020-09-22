"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Exception = Exception;
exports.throwIfInstantiateAbstract = throwIfInstantiateAbstract;
exports.throwIfNotInstanceOf = throwIfNotInstanceOf;
exports.throwIfNull = throwIfNull;
exports.throwIfEmpty = throwIfEmpty;
exports.throwNotImplementedException = throwNotImplementedException;
exports.Finally = exports.Catch = exports.Try = exports.TryCatch = exports.InvalidHttpMethodException = exports.NotInstanceOfException = exports.ArgumentEmptyException = exports.ArgumentNullException = exports.NotImplementedException = exports.AbstractInstantiationException = exports.PropertyReadOnlyException = exports.StackTrace = exports.StackTraceItem = void 0;

var _locustjsBase = require("locustjs-base");

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

  if (_instanceof(settings, Error)) {
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
    _data = (0, _locustjsBase.isObject)(_settings.data) ? _settings.data : _data;
    _date = (0, _locustjsBase.isDate)(_settings.date) ? _settings.date : _date;
    _stack = (0, _locustjsBase.isString)(_settings.stack) ? _settings.stack : _stack;
    _fileName = (0, _locustjsBase.isString)(_settings.fileName) ? _settings.fileName : _fileName;
    _lineNumber = (0, _locustjsBase.isNumeric)(_settings.lineNumber) ? _settings.lineNumber : _lineNumber;
    _columnNumber = (0, _locustjsBase.isNumeric)(_settings.columnNumber) ? _settings.columnNumber : _columnNumber;
    _baseName = (0, _locustjsBase.isString)(_settings.baseName) ? _settings.baseName : _baseName;

    if (_settings.innerException) {
      if (_instanceof(_settings.innerException, Exception)) {
        _inner = _settings.innerException;
      } else if (_instanceof(_settings.innerException, Error)) {
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
    } catch {}
  }

  _stackTrace = (0, _locustjsBase.isEmpty)(_stack) ? null : new StackTrace(_stack);
  Object.defineProperties(this, {
    name: {
      enumerable: true,
      get: function get() {
        return _name;
      },
      set: function set(value) {
        throw new PropertyReadOnlyException({
          property: 'Exception.name',
          host: _host
        });
      }
    },
    baseName: {
      enumerable: true,
      get: function get() {
        return _baseName;
      },
      set: function set(value) {
        throw new PropertyReadOnlyException({
          property: 'Exception.baseName',
          host: _host
        });
      }
    },
    code: {
      enumerable: true,
      get: function get() {
        return _code;
      },
      set: function set(value) {
        throw new PropertyReadOnlyException({
          property: 'Exception.code',
          host: _host
        });
      }
    },
    status: {
      enumerable: true,
      get: function get() {
        return _status;
      },
      set: function set(value) {
        throw new PropertyReadOnlyException({
          property: 'Exception.status',
          host: _host
        });
      }
    },
    host: {
      enumerable: true,
      get: function get() {
        return _host;
      },
      set: function set(value) {
        throw new PropertyReadOnlyException({
          property: 'Exception.host',
          host: _host
        });
      }
    },
    message: {
      enumerable: true,
      get: function get() {
        return _message;
      },
      set: function set(value) {
        throw new PropertyReadOnlyException({
          property: 'Exception.message',
          host: _host
        });
      }
    },
    stack: {
      enumerable: true,
      get: function get() {
        return _stack;
      },
      set: function set(value) {
        throw new PropertyReadOnlyException({
          property: 'Exception.stack',
          host: _host
        });
      }
    },
    stackTrace: {
      enumerable: true,
      get: function get() {
        return _stackTrace;
      },
      set: function set(value) {
        throw new PropertyReadOnlyException({
          property: 'Exception.stackTrace',
          host: _host
        });
      }
    },
    innerException: {
      enumerable: true,
      get: function get() {
        return _inner;
      },
      set: function set(value) {
        throw new PropertyReadOnlyException({
          property: 'Exception.innerException',
          host: _host
        });
      }
    },
    data: {
      enumerable: true,
      get: function get() {
        return _data;
      },
      set: function set(value) {
        throw new PropertyReadOnlyException({
          property: 'Exception.data',
          host: _host
        });
      }
    },
    date: {
      enumerable: true,
      get: function get() {
        return _date;
      },
      set: function set(value) {
        throw new PropertyReadOnlyException({
          property: 'Exception.date',
          host: _host
        });
      }
    },
    fileName: {
      enumerable: true,
      get: function get() {
        return _fileName;
      },
      set: function set(value) {
        throw new PropertyReadOnlyException({
          property: 'Exception.fileName',
          host: _host
        });
      }
    },
    lineNumber: {
      enumerable: true,
      get: function get() {
        return _lineNumber;
      },
      set: function set(value) {
        throw new PropertyReadOnlyException({
          property: 'Exception.lineNumber',
          host: _host
        });
      }
    },
    columnNumber: {
      enumerable: true,
      get: function get() {
        return _columnNumber;
      },
      set: function set(value) {
        throw new PropertyReadOnlyException({
          property: 'Exception.columnNumber',
          host: _host
        });
      }
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
  var separator = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '\n';
  var arr = [];
  var current = this;

  while (current) {
    arr.push(current);
    current = current.innerException;
  }

  return current;
};

var PropertyReadOnlyException = /*#__PURE__*/function (_Exception) {
  _inherits(PropertyReadOnlyException, _Exception);

  var _super = _createSuper(PropertyReadOnlyException);

  function PropertyReadOnlyException(settings) {
    _classCallCheck(this, PropertyReadOnlyException);

    var property = (0, _locustjsBase.isString)(settings) ? settings : '';

    var _settings = Object.assign({}, settings);

    property = (0, _locustjsBase.isEmpty)(property) ? _settings.property : property;
    property = (0, _locustjsBase.isEmpty)(property) ? '?' : property;
    _settings.message = (0, _locustjsBase.isEmpty)(_settings.message) ? "property '".concat(property, "' is read-only.") : _settings.message;
    _settings.status = 'property-readonly';
    return _super.call(this, _settings);
  }

  return PropertyReadOnlyException;
}(Exception);

exports.PropertyReadOnlyException = PropertyReadOnlyException;

var AbstractInstantiationException = /*#__PURE__*/function (_Exception2) {
  _inherits(AbstractInstantiationException, _Exception2);

  var _super2 = _createSuper(AbstractInstantiationException);

  function AbstractInstantiationException(settings) {
    _classCallCheck(this, AbstractInstantiationException);

    var type = (0, _locustjsBase.isString)(settings) ? settings : '';

    var _settings = Object.assign({}, settings);

    type = (0, _locustjsBase.isEmpty)(type) ? _settings.type : type;
    type = (0, _locustjsBase.isEmpty)(type) ? '?' : type;
    _settings.message = (0, _locustjsBase.isEmpty)(_settings.message) ? "cannot instantiate from abstract class '".concat(type, "'.") : _settings.message;
    _settings.status = 'cannot-instantiate-from-abstract';
    return _super2.call(this, _settings);
  }

  return AbstractInstantiationException;
}(Exception);

exports.AbstractInstantiationException = AbstractInstantiationException;

var NotImplementedException = /*#__PURE__*/function (_Exception3) {
  _inherits(NotImplementedException, _Exception3);

  var _super3 = _createSuper(NotImplementedException);

  function NotImplementedException(settings) {
    _classCallCheck(this, NotImplementedException);

    var method = (0, _locustjsBase.isString)(settings) ? settings : '';

    var _settings = Object.assign({}, settings);

    method = (0, _locustjsBase.isEmpty)(method) ? _settings.method : method;
    method = (0, _locustjsBase.isEmpty)(method) ? '?' : method;
    _settings.message = (0, _locustjsBase.isEmpty)(_settings.message) ? "method '".concat(method, "' is not implemented.") : _settings.message;
    _settings.status = 'method-not-implemented';
    return _super3.call(this, _settings);
  }

  return NotImplementedException;
}(Exception);

exports.NotImplementedException = NotImplementedException;

var ArgumentNullException = /*#__PURE__*/function (_Exception4) {
  _inherits(ArgumentNullException, _Exception4);

  var _super4 = _createSuper(ArgumentNullException);

  function ArgumentNullException(settings) {
    _classCallCheck(this, ArgumentNullException);

    var argName = (0, _locustjsBase.isString)(settings) ? settings : '';

    var _settings = Object.assign({}, settings);

    argName = (0, _locustjsBase.isNull)(argName) ? _settings.arg : argName;
    argName = (0, _locustjsBase.isEmpty)(argName) ? '?' : argName;
    _settings.message = (0, _locustjsBase.isNull)(_settings.message) ? "argument '".concat(argName, "' cannot be null or undefined.") : _settings.message;
    _settings.status = 'argument-null';
    return _super4.call(this, _settings);
  }

  return ArgumentNullException;
}(Exception);

exports.ArgumentNullException = ArgumentNullException;

var ArgumentEmptyException = /*#__PURE__*/function (_Exception5) {
  _inherits(ArgumentEmptyException, _Exception5);

  var _super5 = _createSuper(ArgumentEmptyException);

  function ArgumentEmptyException(settings) {
    _classCallCheck(this, ArgumentEmptyException);

    var argName = (0, _locustjsBase.isString)(settings) ? settings : '';

    var _settings = Object.assign({}, settings);

    argName = (0, _locustjsBase.isEmpty)(argName) ? _settings.arg : argName;
    argName = (0, _locustjsBase.isEmpty)(argName) ? '?' : argName;
    _settings.message = (0, _locustjsBase.isEmpty)(_settings.message) ? "argument '".concat(argName, "' cannot be null, undefined or empty strings.") : _settings.message;
    _settings.status = 'argument-empty';
    return _super5.call(this, _settings);
  }

  return ArgumentEmptyException;
}(Exception);

exports.ArgumentEmptyException = ArgumentEmptyException;

var NotInstanceOfException = /*#__PURE__*/function (_Exception6) {
  _inherits(NotInstanceOfException, _Exception6);

  var _super6 = _createSuper(NotInstanceOfException);

  function NotInstanceOfException(settings) {
    _classCallCheck(this, NotInstanceOfException);

    var argName = (0, _locustjsBase.isString)(settings) ? settings : '';
    var type = arguments.length > 1 && (0, _locustjsBase.isString)(arguments[1]) ? arguments[2] : '';

    var _settings = Object.assign({}, settings);

    argName = (0, _locustjsBase.isEmpty)(argName) ? _settings.arg : argName;
    argName = (0, _locustjsBase.isEmpty)(argName) ? '?' : argName;
    type = (0, _locustjsBase.isEmpty)(type) ? _settings.type : type;
    type = (0, _locustjsBase.isEmpty)(type) ? '?' : type;
    _settings.message = (0, _locustjsBase.isEmpty)(_settings.message) ? "argument '".concat(argName, "' must be an instance of ").concat(type) : _settings.message;
    _settings.status = 'not-instance-of';
    return _super6.call(this, _settings);
  }

  return NotInstanceOfException;
}(Exception);

exports.NotInstanceOfException = NotInstanceOfException;

var InvalidHttpMethodException = /*#__PURE__*/function (_Exception7) {
  _inherits(InvalidHttpMethodException, _Exception7);

  var _super7 = _createSuper(InvalidHttpMethodException);

  function InvalidHttpMethodException(settings) {
    _classCallCheck(this, InvalidHttpMethodException);

    var method = (0, _locustjsBase.isString)(settings) ? settings : '';

    var _settings = Object.assign({}, settings);

    method = (0, _locustjsBase.isEmpty)(method) ? _settings.method : method;
    method = (0, _locustjsBase.isEmpty)(method) ? '?' : method;
    _settings.message = (0, _locustjsBase.isEmpty)(_settings.message) ? "invalid http method '".concat(method, "'. expected GET, POST, PUT or DELETE.") : _settings.message;
    _settings.status = 'invalid-http-method';
    return _super7.call(this, _settings);
  }

  return InvalidHttpMethodException;
}(Exception);

exports.InvalidHttpMethodException = InvalidHttpMethodException;

function throwIfInstantiateAbstract(classType, instance, host) {
  if (instance.constructor === classType) {
    throw new AbstractInstantiationException({
      type: classType.name,
      host: host
    });
  }
}

function throwIfNotInstanceOf(argName, classType, instance) {
  var ignoreNull = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var host = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '';

  if ((0, _locustjsBase.isNull)(instance)) {
    if (ignoreNull) {
      return;
    } else {
      throw new ArgumentNullException({
        arg: argName,
        host: host
      });
    }
  }

  if (!_instanceof(instance, classType)) {
    throw new NotInstanceOfException({
      arg: argName,
      type: classType.name,
      host: host
    });
  }
}

function throwIfNull(arg, argName, host) {
  if ((0, _locustjsBase.isEmpty)(arg)) {
    throw new ArgumentNullException({
      arg: argName,
      host: host
    });
  }
}

function throwIfEmpty(arg, argName, host) {
  if ((0, _locustjsBase.isEmpty)(arg)) {
    throw new ArgumentEmptyException({
      arg: argName,
      host: host
    });
  }
}

function throwNotImplementedException(method, host) {
  throw new NotImplementedException({
    method: method,
    host: host
  });
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

          raise = _instanceof(this.Exception, exceptionType);
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