import { isEmpty } from "@locustjs/base";
import Exception from "./Exception";

class PropertyReadOnlyException extends Exception {
  constructor(propertyName, host) {
    super({
      message: `property '${propertyName || "?"}' is read-only.`,
      status: "property-readonly",
      host,
    });
  }
}

class AbstractInstantiationException extends Exception {
  constructor(type, host) {
    super({
      message: `cannot instantiate from abstract class '${type || "?"}'.`,
      status: "cannot-instantiate-from-abstract-class",
      host,
    });
  }
}

class NotImplementedException extends Exception {
  constructor(method, host) {
    super({
      message: `method '${method || "?"}' is not implemented.`,
      status: "method-not-implemented",
      host,
    });
  }
}

class NotSupportedException extends Exception {
  constructor(value, host) {
    super({
      message: `'${value || "?"}' is not supported.`,
      status: "not-supported",
      host,
    });
  }
}

class IndexOutOfRangeException extends Exception {
  constructor(index, min, max, host) {
    super({
      message: `index${isEmpty(index) ? "" : ` '${index}'`} is out of range [${
        min || "0"
      }, ${max}].`,
      status: "index-out-of-range",
      host,
    });
  }
}

class ArgumentNullException extends Exception {
  constructor(arg, host) {
    super({
      message: `argument '${arg || "?"}' cannot be null or undefined.`,
      status: "argument-null",
      host,
    });
  }
}

class ArgumentEmptyException extends Exception {
  constructor(arg, host) {
    super({
      message: `argument '${
        arg || "?"
      }' cannot be null, undefined or empty strings.`,
      status: "argument-empty",
      host,
    });
  }
}

class ArgumentTypeIncorrectException extends Exception {
  constructor(arg, type, host) {
    super({
      message: `argument '${
        arg || "?"
      }' has an incorrect type. ${type} expected.`,
      status: "argument-type-incorrect",
      host,
    });
  }
}

class NotInstanceOfException extends Exception {
  constructor(arg, type, host) {
    super({
      message: `argument '${arg || "?"}' must be an instance of ${type}`,
      status: "argument-not-instance-of",
      host,
    });
  }
}

class InvalidHttpMethodException extends Exception {
  constructor(method, host) {
    super({
      message: `invalid http method '${
        method || "?"
      }'. expected GET, POST, PUT or DELETE.`,
      status: "invalid-http-method",
      host,
    });
  }
}

export {
  Exception,
  PropertyReadOnlyException,
  AbstractInstantiationException,
  NotImplementedException,
  NotSupportedException,
  ArgumentNullException,
  ArgumentEmptyException,
  ArgumentTypeIncorrectException,
  NotInstanceOfException,
  InvalidHttpMethodException,
  IndexOutOfRangeException,
};
