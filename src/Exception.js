import {
  isString,
  isNumeric,
  isEmpty,
  isFunction,
  isDate,
  isObject,
} from "@locustjs/base";
import StackTrace from "./StackTrace";

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
  let _message = "";
  let _code = undefined;
  let _status = undefined;
  let _host = undefined;
  let _data = null;
  let _stack = "";
  let _stackTrace = null;
  let _inner = null;
  let _date = new Date();
  let _fileName = undefined;
  let _lineNumber = undefined;
  let _columnNumber = undefined;
  let _name = this.constructor.name;
  let _baseName = "";

  if (settings instanceof Error) {
    _message = settings.message;
    _fileName = settings.fileName;
    _lineNumber = settings.lineNumber;
    _columnNumber = settings.columnNumber;
    _baseName = settings.name;
    _stack = settings.stack;
  } else {
    const _settings = Object.assign({}, settings);

    _message = isString(_settings.message) ? _settings.message : _message;
    _code = isNumeric(_settings.code) ? _settings.code : _code;
    _status = isString(_settings.status) ? _settings.status : _status;
    _host = isString(_settings.host) ? _settings.host : _host;
    _data = _settings.data;
    _date = isDate(_settings.date) ? _settings.date : _date;
    _stack = isString(_settings.stack) ? _settings.stack : _stack;
    _fileName = isString(_settings.fileName) ? _settings.fileName : _fileName;
    _lineNumber = isNumeric(_settings.lineNumber)
      ? _settings.lineNumber
      : _lineNumber;
    _columnNumber = isNumeric(_settings.columnNumber)
      ? _settings.columnNumber
      : _columnNumber;
    _baseName = isString(_settings.baseName) ? _settings.baseName : _baseName;

    const _innerException = _settings.innerException;

    if (_innerException) {
      if (_innerException instanceof Exception) {
        _inner = _innerException;
      } else if (
        _innerException instanceof Error ||
        isObject(_innerException)
      ) {
        _inner = new Exception(_innerException);
      } else if (isString(_innerException)) {
        if (_innerException.indexOf(" ") > 0) {
          _inner = new Exception({ message: _innerException });
        } else {
          _inner = new Exception({ status: _innerException });
        }
      } else if (isNumeric(_innerException)) {
        _inner = new Exception({ code: _innerException });
      } else {
        throw `Exception.ctor: innerException must be a string, an object or instance of Error/Exception`;
      }
    }
  }

  if (isEmpty(_stack) && isFunction(Error.captureStackTrace)) {
    try {
      let temp = {};
      Error.captureStackTrace(temp, Exception);
      _stack = temp.stack;

      if (_stack.startsWith("Error\n")) {
        _stack = _message + "\n" + _stack.substr(7);
      }
    } catch {}
  }

  _stackTrace = isEmpty(_stack) ? null : new StackTrace(_stack);

  const propertyIsReadOnly = (propertyName) => (value) => {
    throw new PropertyReadOnlyException(propertyName, _host);
  };

  Object.defineProperties(this, {
    name: {
      enumerable: true,
      get: function () {
        return _name;
      },
      set: propertyIsReadOnly("Exception.name"),
    },
    baseName: {
      enumerable: true,
      get: function () {
        return _baseName;
      },
      set: propertyIsReadOnly("Exception.baseName"),
    },
    code: {
      enumerable: true,
      get: function () {
        return _code;
      },
      set: propertyIsReadOnly("Exception.code"),
    },
    status: {
      enumerable: true,
      get: function () {
        return _status;
      },
      set: propertyIsReadOnly("Exception.status"),
    },
    host: {
      enumerable: true,
      get: function () {
        return _host;
      },
      set: propertyIsReadOnly("Exception.host"),
    },
    message: {
      enumerable: true,
      get: function () {
        return _message;
      },
      set: propertyIsReadOnly("Exception.message"),
    },
    stack: {
      enumerable: true,
      get: function () {
        return _stack;
      },
      set: propertyIsReadOnly("Exception.stack"),
    },
    stackTrace: {
      enumerable: true,
      get: function () {
        return _stackTrace;
      },
      set: propertyIsReadOnly("Exception.stackTrace"),
    },
    innerException: {
      enumerable: true,
      get: function () {
        return _inner;
      },
      set: propertyIsReadOnly("Exception.innerException"),
    },
    data: {
      enumerable: true,
      get: function () {
        return _data;
      },
      set: propertyIsReadOnly("Exception.data"),
    },
    date: {
      enumerable: true,
      get: function () {
        return _date;
      },
      set: propertyIsReadOnly("Exception.date"),
    },
    fileName: {
      enumerable: true,
      get: function () {
        return _fileName;
      },
      set: propertyIsReadOnly("Exception.fileName"),
    },
    lineNumber: {
      enumerable: true,
      get: function () {
        return _lineNumber;
      },
      set: propertyIsReadOnly("Exception.lineNumber"),
    },
    columnNumber: {
      enumerable: true,
      get: function () {
        return _columnNumber;
      },
      set: propertyIsReadOnly("Exception.columnNumber"),
    },
  });
}

Exception.prototype.toString = function (separator = "\n") {
  const arr = [];
  let current = this;

  while (current) {
    arr.push(current.message);
    current = current.innerException;
  }

  return arr.join(separator);
};

Exception.prototype.flatten = function () {
  const arr = [];
  let current = this;

  while (current) {
    arr.push(current);
    current = current.innerException;
  }

  return arr;
};

class PropertyReadOnlyException extends Exception {
  constructor(propertyName, host) {
    super({
      message: `property '${propertyName || "?"}' is read-only.`,
      status: "property-readonly",
      host,
    });
  }
}

export { Exception, PropertyReadOnlyException }