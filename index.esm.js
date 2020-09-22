import { isString, isSomeString, isObject, isNumeric, isEmpty, isFunction, isNull, isDate } from 'locustjs-base';

class StackTraceItem {
	constructor(line) {
		if (isSomeString(line)) {
			let colonIndex = line.indexOf(':');
			let openParIndex = line.indexOf('(');
			if (openParIndex < 0) {
				openParIndex = colonIndex;
			}
			let numbers = line.substr(colonIndex + 1);
			
			if (numbers[numbers.length - 1] == ')') {
				numbers = numbers.substr(0, numbers.length - 1);
			}
			
			numbers = numbers.split(':');
			
			this.line = numbers.length > 0 ? numbers[0]: 0;
			this.col = numbers.length > 1 ? numbers[1]: 0;
			this.callSite = line.substr(0, openParIndex).replace('at ', '').trim();
			this.source = line.substr(openParIndex + 1, colonIndex - openParIndex - 1);
		} else {
			this.line = 0;
			this.col = 0;
			this.callSite = '';
			this.source = '';
		}
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
	let _message		= '';
	let _code			= undefined;
	let _status			= undefined;
	let _host			= undefined;
	let _data			= null;
	let _stack			= '';
	let _stackTrace		= null;
	let _inner			= null;
	let _date			= new Date();
	let _fileName		= undefined;
	let _lineNumber		= undefined;
	let _columnNumber	= undefined;
	let _name			= this.constructor.name;
	let _baseName		= '';
	
	if (settings instanceof Error) {
		_message		= settings.message;
		_fileName		= settings.fileName;
		_lineNumber		= settings.lineNumber;
		_columnNumber	= settings.columnNumber;
		_baseName		= settings.name;
		_stack			= settings.stack;
	} else {
		const _settings = Object.assign({ }, settings);
		
		_message		= isString (_settings.message     ) ? _settings.message			: _message;
		_code			= isNumeric(_settings.code        ) ? _settings.code			: _code;
		_status			= isString (_settings.status      ) ? _settings.status			: _status;
		_host			= isString (_settings.host        ) ? _settings.host			: _host;
		_data			= isObject (_settings.data        ) ? _settings.data			: _data;
		_date			= isDate   (_settings.date        ) ? _settings.date			: _date;
		_stack			= isString (_settings.stack       ) ? _settings.stack			: _stack;
		_fileName		= isString (_settings.fileName    ) ? _settings.fileName		: _fileName;
		_lineNumber		= isNumeric(_settings.lineNumber  ) ? _settings.lineNumber		: _lineNumber;
		_columnNumber	= isNumeric(_settings.columnNumber) ? _settings.columnNumber	: _columnNumber;
		_baseName		= isString (_settings.baseName    ) ? _settings.baseName		: _baseName;
		
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
			let temp = { };
			Error.captureStackTrace(temp, Exception);
			_stack = temp.stack;
			
			if (_stack.startsWith('Error\n')) {
				_stack = _message + '\n' + _stack.substr(7);
			}
		} catch { }
	}
	
	_stackTrace = isEmpty(_stack) ? null: new StackTrace(_stack);
	
	Object.defineProperties(this, {
		name: {
			enumerable: true,
			get: function() { return _name },
			set: function(value) {
				throw new PropertyReadOnlyException({ property: 'Exception.name', host: _host });
			}
		},
		baseName: {
			enumerable: true,
			get: function() { return _baseName },
			set: function(value) {
				throw new PropertyReadOnlyException({ property: 'Exception.baseName', host: _host });
			}
		},
		code: {
			enumerable: true,
			get: function() { return _code },
			set: function(value) {
				throw new PropertyReadOnlyException({ property: 'Exception.code', host: _host });
			}
		},
		status: {
			enumerable: true,
			get: function() { return _status },
			set: function(value) {
				throw new PropertyReadOnlyException({ property: 'Exception.status', host: _host });
			}
		},
		host: {
			enumerable: true,
			get: function() { return _host },
			set: function(value) {
				throw new PropertyReadOnlyException({ property: 'Exception.host', host: _host });
			}
		},
		message: {
			enumerable: true,
			get: function() { return _message },
			set: function(value) {
				throw new PropertyReadOnlyException({ property: 'Exception.message', host: _host });
			}
		},
		stack: {
			enumerable: true,
			get: function() { return _stack },
			set: function(value) {
				throw new PropertyReadOnlyException({ property: 'Exception.stack', host: _host });
			}
		},
		stackTrace: {
			enumerable: true,
			get: function() { return _stackTrace },
			set: function(value) {
				throw new PropertyReadOnlyException({ property: 'Exception.stackTrace', host: _host });
			}
		},
		innerException: {
			enumerable: true,
			get: function() { return _inner },
			set: function(value) {
				throw new PropertyReadOnlyException({ property: 'Exception.innerException', host: _host });
			}
		},
		data: {
			enumerable: true,
			get: function() { return _data },
			set: function(value) {
				throw new PropertyReadOnlyException({ property: 'Exception.data', host: _host });
			}
		},
		date: {
			enumerable: true,
			get: function() { return _date },
			set: function(value) {
				throw new PropertyReadOnlyException({ property: 'Exception.date', host: _host });
			}
		},
		fileName: {
			enumerable: true,
			get: function() { return _fileName },
			set: function(value) {
				throw new PropertyReadOnlyException({ property: 'Exception.fileName', host: _host });
			}
		},
		lineNumber: {
			enumerable: true,
			get: function() { return _lineNumber },
			set: function(value) {
				throw new PropertyReadOnlyException({ property: 'Exception.lineNumber', host: _host });
			}
		},
		columnNumber: {
			enumerable: true,
			get: function() { return _columnNumber },
			set: function(value) {
				throw new PropertyReadOnlyException({ property: 'Exception.columnNumber', host: _host });
			}
		}
	});
}

Exception.prototype.toString = function(separator = '\n') {
	const arr = [];
	let current = this;

	while (current) {
		arr.push(current.message);
		current = current.innerException;
	}

	return arr.join(separator);
}

Exception.prototype.flatten = function(separator = '\n') {
	const arr = [];
	let current = this;

	while (current) {
		arr.push(current);
		current = current.innerException;
	}

	return current;
}

class PropertyReadOnlyException extends Exception {
	constructor(settings) {
		let property = isString(settings) ? settings: '';
		const _settings = Object.assign({}, settings);
		property = isEmpty(property) ? _settings.property: property;
		property = isEmpty(property) ? '?': property;
		
		_settings.message = isEmpty(_settings.message) ? `property '${property}' is read-only.`: _settings.message;
		_settings.status = 'property-readonly';
		
		super(_settings);
	}
}

class AbstractInstantiationException extends Exception {
    constructor(settings) {
		let type = isString(settings) ? settings: '';
		const _settings = Object.assign({}, settings);
		type = isEmpty(type) ? _settings.type: type;
		type = isEmpty(type) ? '?': type;
		
		_settings.message = isEmpty(_settings.message) ? `cannot instantiate from abstract class '${type}'.`: _settings.message;
		_settings.status = 'cannot-instantiate-from-abstract';
		
		super(_settings);
    }
}

class NotImplementedException extends Exception {
    constructor(settings) {
		let method = isString(settings) ? settings: '';
		const _settings = Object.assign({}, settings);
		method = isEmpty(method) ? _settings.method: method;
		method = isEmpty(method) ? '?': method;
		
		_settings.message = isEmpty(_settings.message) ? `method '${method}' is not implemented.`: _settings.message;
		_settings.status = 'method-not-implemented';
		
		super(_settings);
    }
}

class ArgumentNullException extends Exception {
    constructor(settings) {
		let argName = isString(settings) ? settings: '';
		const _settings = Object.assign({}, settings);
		argName = isNull(argName) ? _settings.arg: argName;
		argName = isEmpty(argName) ? '?': argName;
		
		_settings.message = isNull(_settings.message) ? `argument '${argName}' cannot be null or undefined.`: _settings.message;
		_settings.status = 'argument-null';
		
		super(_settings);
    }
}

class ArgumentEmptyException extends Exception {
    constructor(settings) {
		let argName = isString(settings) ? settings: '';
		const _settings = Object.assign({}, settings);
		argName = isEmpty(argName) ? _settings.arg: argName;
		argName = isEmpty(argName) ? '?': argName;
		
		_settings.message = isEmpty(_settings.message) ? `argument '${argName}' cannot be null, undefined or empty strings.`: _settings.message;
		_settings.status = 'argument-empty';
		
		super(_settings);
    }
}

class NotInstanceOfException extends Exception {
    constructor(settings) {
		let argName = isString(settings) ? settings: '';
		let type = arguments.length > 1 && isString(arguments[1]) ? arguments[2]: '';
		const _settings = Object.assign({}, settings);
		argName = isEmpty(argName) ? _settings.arg: argName;
		argName = isEmpty(argName) ? '?': argName;
		type = isEmpty(type) ? _settings.type: type;
		type = isEmpty(type) ? '?': type;
		
		_settings.message = isEmpty(_settings.message) ? `argument '${argName}' must be an instance of ${type}`: _settings.message;
		_settings.status = 'not-instance-of';
		
		super(_settings);
    }
}

class InvalidHttpMethodException extends Exception {
    constructor(settings) {
		let method = isString(settings) ? settings: '';
		const _settings = Object.assign({}, settings);
		method = isEmpty(method) ? _settings.method: method;
		method = isEmpty(method) ? '?': method;
		
		_settings.message = isEmpty(_settings.message) ? `invalid http method '${method}'. expected GET, POST, PUT or DELETE.`: _settings.message;
		_settings.status = 'invalid-http-method';
		
		super(_settings);
    }
}

function throwIfInstantiateAbstract(classType, instance, host) {
    if (instance.constructor === classType) {
        throw new AbstractInstantiationException({ type: classType.name, host })
    }
}

function throwIfNotInstanceOf(argName, classType, instance, ignoreNull = false, host = '') {
    if (isNull(instance)) {
        if (ignoreNull) {
            return;
        } else {
            throw new ArgumentNullException({ arg: argName, host });
        }
    }

    if (!(instance instanceof classType)) {
        throw new NotInstanceOfException({ arg: argName, type: classType.name, host });
    }
}

function throwIfNull(arg, argName, host) {
    if (isEmpty(arg)) {
        throw new ArgumentNullException({ arg: argName, host });
    }
}

function throwIfEmpty(arg, argName, host) {
    if (isEmpty(arg)) {
        throw new ArgumentEmptyException({ arg: argName, host });
    }
}

function throwNotImplementedException(method, host) {
    throw new NotImplementedException({ method, host });
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
	NotInstanceOfException,
	InvalidHttpMethodException,

	throwIfInstantiateAbstract,
	throwIfNotInstanceOf,
	throwIfNull,
	throwIfEmpty,
	throwNotImplementedException,

	TryCatch,
	Try,
	Catch,
	Finally
}
