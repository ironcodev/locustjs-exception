import { isString, isSomeString, isObject, isNumeric, isEmpty, isFunction, isNull, isDate } from 'locustjs-base';

class StackTraceItem {
	constructor(line) {
		if (line.length) {
			let colonIndex1 = line.lastIndexOf(':');
	  		let colonIndex2 = line.lastIndexOf(':', colonIndex1 - 1);
			let openParIndex = line.indexOf('(');
	  
	  		if (openParIndex < 0) {
				openParIndex = colonIndex2;
			}
	  
	  		let closeParIndex = line.lastIndexOf(')');
	  
			if (closeParIndex < 0) {
				closeParIndex = line.length;
			}
	  
			let numbers = line.substr(colonIndex2 + 1, closeParIndex - colonIndex2 - 1);

			numbers = numbers.split(':');

			this.line = numbers.length > 0 ? parseInt(numbers[0]) : 0;
			this.col = numbers.length > 1 ? parseInt(numbers[1]) : 0;
			this.callSite = line.substr(0, openParIndex).replace('at ', '').trim();
			this.source = line.substr(openParIndex + 1, colonIndex2 - openParIndex - 1);
		} else {
			this.line = 0;
			this.col = 0;
			this.callSite = '';
			this.source = '';
		}
		
		this.message = line;
	}
}

class StackTrace {
	constructor(stack) {
		this.items = [];

		if (isSomeString(stack)) {
			const lines = stack.split('\n');

			if (lines.length) {
				for (let i = 1; i < lines.length; i++) {
					this.items.push(new StackTraceItem(lines[i]));
				}
			}
		}
	}
}

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
	let _message = '';
	let _code = undefined;
	let _status = undefined;
	let _host = undefined;
	let _data = null;
	let _stack = '';
	let _stackTrace = null;
	let _inner = null;
	let _date = new Date();
	let _fileName = undefined;
	let _lineNumber = undefined;
	let _columnNumber = undefined;
	let _name = this.constructor.name;
	let _baseName = '';

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
		_lineNumber = isNumeric(_settings.lineNumber) ? _settings.lineNumber : _lineNumber;
		_columnNumber = isNumeric(_settings.columnNumber) ? _settings.columnNumber : _columnNumber;
		_baseName = isString(_settings.baseName) ? _settings.baseName : _baseName;

		if (_settings.innerException) {
			if (_settings.innerException instanceof Exception) {
				_inner = _settings.innerException;
			} else if (_settings.innerException instanceof Error) {
				_inner = new Exception(_settings.innerException);
			} else {
				throw `Exception.ctor: innerException must be an instance of Error or Exception`
			}
		}
	}

	if (isEmpty(_stack) && isFunction(Error.captureStackTrace)) {
		try {
			let temp = {};
			Error.captureStackTrace(temp, Exception);
			_stack = temp.stack;

			if (_stack.startsWith('Error\n')) {
				_stack = _message + '\n' + _stack.substr(7);
			}
		} catch { }
	}

	_stackTrace = isEmpty(_stack) ? null : new StackTrace(_stack);

	const propertyIsReadOnly = (propertyName) => (value) => {
		throw new PropertyReadOnlyException(propertyName, _host)
	}

	Object.defineProperties(this, {
		name: {
			enumerable: true,
			get: function () { return _name },
			set: propertyIsReadOnly('Exception.name')
		},
		baseName: {
			enumerable: true,
			get: function () { return _baseName },
			set: propertyIsReadOnly('Exception.baseName')
		},
		code: {
			enumerable: true,
			get: function () { return _code },
			set: propertyIsReadOnly('Exception.code')
		},
		status: {
			enumerable: true,
			get: function () { return _status },
			set: propertyIsReadOnly('Exception.status')
		},
		host: {
			enumerable: true,
			get: function () { return _host },
			set: propertyIsReadOnly('Exception.host')
		},
		message: {
			enumerable: true,
			get: function () { return _message },
			set: propertyIsReadOnly('Exception.message')
		},
		stack: {
			enumerable: true,
			get: function () { return _stack },
			set: propertyIsReadOnly('Exception.stack')
		},
		stackTrace: {
			enumerable: true,
			get: function () { return _stackTrace },
			set: propertyIsReadOnly('Exception.stackTrace')
		},
		innerException: {
			enumerable: true,
			get: function () { return _inner },
			set: propertyIsReadOnly('Exception.innerException')
		},
		data: {
			enumerable: true,
			get: function () { return _data },
			set: propertyIsReadOnly('Exception.data')
		},
		date: {
			enumerable: true,
			get: function () { return _date },
			set: propertyIsReadOnly('Exception.date')
		},
		fileName: {
			enumerable: true,
			get: function () { return _fileName },
			set: propertyIsReadOnly('Exception.fileName')
		},
		lineNumber: {
			enumerable: true,
			get: function () { return _lineNumber },
			set: propertyIsReadOnly('Exception.lineNumber')
		},
		columnNumber: {
			enumerable: true,
			get: function () { return _columnNumber },
			set: propertyIsReadOnly('Exception.columnNumber')
		}
	});
}

Exception.prototype.toString = function (separator = '\n') {
	const arr = [];
	let current = this;

	while (current) {
		arr.push(current.message);
		current = current.innerException;
	}

	return arr.join(separator);
}

Exception.prototype.flatten = function () {
	const arr = [];
	let current = this;

	while (current) {
		arr.push(current);
		current = current.innerException;
	}

	return arr;
}

class PropertyReadOnlyException extends Exception {
	constructor(propertyName, host) {
		super({
			message: `property '${propertyName || '?'}' is read-only.`,
			status: 'property-readonly',
			host
		});
	}
}

class AbstractInstantiationException extends Exception {
	constructor(type, host) {
		super({
			message: `cannot instantiate from abstract class '${type || '?'}'.`,
			status: 'cannot-instantiate-from-abstract',
			host
		});
	}
}

class NotImplementedException extends Exception {
	constructor(method, host) {
		super({
			message: `method '${method || '?'}' is not implemented.`,
			status: 'method-not-implemented',
			host
		});
	}
}

class IndexOutOfRangeException extends Exception {
	constructor(index, min, max, host) {
		super({
			message: `index${(isEmpty(index) ? '': ` '${index}'`)} is out of range [${(min || '0')}, ${max}].`,
			status: 'index-out-of-range',
			host
		});
	}
}

class ArgumentNullException extends Exception {
	constructor(arg, host) {
		super({
			message: `argument '${arg || '?'}' cannot be null or undefined.`,
			status: 'argument-null',
			host
		});
	}
}

class ArgumentEmptyException extends Exception {
	constructor(arg, host) {
		super({
			message: `argument '${arg || '?'}' cannot be null, undefined or empty strings.`,
			status: 'argument-empty',
			host
		});
	}
}

class ArgumentTypeIncorrectException extends Exception {
	constructor(arg, type, host) {
		super({
			message: `argument '${arg || '?'}' has an incorrect type. ${type} expected.`,
			status: 'argument-type-incorrect',
			host
		});
	}
}

class NotInstanceOfException extends Exception {
	constructor(arg, type, host) {
		super({
			message: `argument '${arg || '?'}' must be an instance of ${type}`,
			status: 'argument-not-instance-of',
			host
		});
	}
}

class InvalidHttpMethodException extends Exception {
	constructor(method, host) {
		super({
			message: `invalid http method '${method || '?'}'. expected GET, POST, PUT or DELETE.`,
			status: 'invalid-http-method',
			host
		});
	}
}

function throwIfInstantiateAbstract(classType, instance, host) {
	if (instance.constructor === classType) {
		throw new AbstractInstantiationException(classType.name, host)
	}
}

function throwIfNotInstanceOf(argName, classType, instance, ignoreNull = false, host = '') {
	if (isNull(instance)) {
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
	if (isNull(arg)) {
		throw new ArgumentNullException(argName, host);
	}
}

function throwIfEmpty(arg, argName, host) {
	if (isEmpty(arg)) {
		throw new ArgumentEmptyException(argName, host);
	}
}

function throwIfTypeIncorrect(arg, checkType, host) {
	const type = checkType();

	if (type) {
		throw new ArgumentTypeIncorrectException(arg, type, host);
	}
}

function throwIfIndexOutOfRange(index, min, max, host) {
	throwIfEmpty(index, 'index', host);

	if (!isNumeric(min)) {
		min = 0;
	}
	if (!isNumeric(max)) {
		max = 0;
	}
	if (!isNumeric(index)) {
		index = -1;
	}
	if (index < min || index > max) {
		throw new IndexOutOfRangeException(index, min, max, host);
	}
}

function throwNotImplementedException(method, host) {
	throw new NotImplementedException(method, host);
}

function throwPropertyReadOnlyException(propName, host) {
	throw new PropertyReadOnlyException(propName, host);
}

class TryCatch {
	constructor(fn, context) {
		if (!isFunction(fn)) {
			throw `TryCatch.ctor: function expected`
		}

		this.Result = null;
		this.Context = context === undefined ? this : context;
		this._fn = fn;
		this._exception = null;
		this._caught = false;
		this._finalized = false;
	}
	Run() {
		this.Result = this._fn(this.Context);
	}
	get Exception() {
		return this._exception;
	}
	set Exception(value) {
		if (this._exception === null) {
			this._exception = value;
		}
	}
	Catch(exceptionType, fn) {
		let raise = this.hasError;

		if (raise) {
			let callback = fn;

			if (this._finalized) {
				throw `Catch cannot be used after Finally`
			}

			if (callback !== undefined) {
				if (!isFunction(callback)) {
					throw `Catch: callback must be a function`
				}

				raise = this.Exception instanceof exceptionType;
			} else {
				callback = exceptionType;

				if (!isFunction(callback)) {
					throw `Catch: expected callback function`
				}
			}

			if (raise) {
				callback(this.Exception, this.Context);
				this._caught = true;
			}
		}

		return this;
	}
	get hasError() {
		return this.Exception && !this._caught;
	}
	Finally(fn) {
		if (this.hasError) {
			throw this.Exception;
		}

		if (fn !== undefined) {
			if (!isFunction(fn)) {
				throw `Finally: callback must be a function`
			}

			if (!this._finalized) {
				fn(this.Context);
				this._finalized = true;
			}
		}

		return this;
	}
}
const Try = (fn, context) => {
	const result = new TryCatch(fn, context);

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
}

const Catch = (x, exceptionType, fn) => {
	if (x instanceof TryCatch && x.hasError) {
		x.Catch(exceptionType, fn);
	}
}

const Finally = (x, fn) => {
	if (x instanceof TryCatch) {
		x.Finally(fn);
	}
}

export {
	StackTraceItem,
	StackTrace,

	Exception,

	PropertyReadOnlyException,
	AbstractInstantiationException,
	NotImplementedException,
	ArgumentNullException,
	ArgumentEmptyException,
	ArgumentTypeIncorrectException,
	NotInstanceOfException,
	InvalidHttpMethodException,
	IndexOutOfRangeException,

	throwIfInstantiateAbstract,
	throwIfNotInstanceOf,
	throwIfNull,
	throwIfEmpty,
	throwIfTypeIncorrect,
	throwNotImplementedException,
	throwIfIndexOutOfRange,
	throwPropertyReadOnlyException,

	TryCatch,
	Try,
	Catch,
	Finally
}
