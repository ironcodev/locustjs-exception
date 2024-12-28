import { isFunction } from "@locustjs/base";
import Exception from "./Exception";

class TryCatch {
  constructor(fn, context) {
    if (!isFunction(fn)) {
      throw `TryCatch.ctor: function expected`;
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
        throw `Catch cannot be used after Finally`;
      }

      if (callback !== undefined) {
        if (!isFunction(callback)) {
          throw `Catch: callback must be a function`;
        }

        raise = this.Exception instanceof exceptionType;
      } else {
        callback = exceptionType;

        if (!isFunction(callback)) {
          throw `Catch: expected callback function`;
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
        throw `Finally: callback must be a function`;
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
};

const Catch = (x, exceptionType, fn) => {
  if (x instanceof TryCatch && x.hasError) {
    x.Catch(exceptionType, fn);
  }
};

const Finally = (x, fn) => {
  if (x instanceof TryCatch) {
    x.Finally(fn);
  }
};

export { TryCatch, Try, Catch, Finally };
