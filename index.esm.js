import { isString, isFunction } from 'locustjs-base';
import { List } from 'locustjs-collections';

class StackTraceItem {
	constructor(line) {
		const colonIndex = line.lastIndexOf(':');
				
		colonIndex = line.lastIndexOf(':', colonIndex - 1);
		
		const numbers = line.substr(colonIndex + 1).split(':');
		
		this.line = numbers.length > 0 ? numbers[0]: 0;
		this.col = numbers.length > 1 ? numbers[1]: 0;
	}
}

class StackTrace extends List {
	constructor(stack) {
		super();
		
		if (isSomeString(stack)) {
			const lines = stack.split('\n');
			
			if (lines.length) {
				this.message = lines[0];
				
				for (let i = 1; i < lines.length; i++) {
					this.add(new StackTraceItem(lines[i]));
				}
			}
		}
	}
}

class Exception extends TypeError {
	constructor(e, inner) {
		super();
		
		this.line = 0;
		this.col = 0;
		
		if (isString(e)) {
			this.message = e;
			this.name = 'Exception';
			this.callSite = '';
			this.source = '';
		} else if (e instanceof TypeError) {
			this.message = e.message;
			this.stack = e.stack;
			this.stackTrace = new StackTrace(e.stack);
			this.name = e.name;
		}
		
		if (inner !== undefined) {
			if (inner instanceof Exception) {
				this.innerException = inner;
			} else if (inner instanceof TypeError) {
				this.innerException = new Exception(inner);
			} else {
				throw `Exception.ctor: inner must be an instance of TypeError, Exception or one of their derived classes`
			}
		}
	}
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
		if (fn !== undefined) {
			if (!isFunction(fn)) {
				throw `Catch: callback must be a function`
			}
			
			if (this._finalized) {
				throw `Catch cannot be used after Finally`
			}
			
			if (this.hasError && this.Exception instanceof exceptionType) {
				fn(this.Exception, this.Context);
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
	TryCatch,
	Try,
	Catch,
	Finally
}
