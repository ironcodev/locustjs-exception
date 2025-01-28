import { isEmpty } from "@locustjs/base";
import { Exception } from "./Exception";

class AbstractInstantiationException extends Exception {
  constructor(type, host) {
    super({
      message: `cannot instantiate from abstract class '${type || "?"}'.`,
      status: "cannot-instantiate-from-abstract-class",
      host,
    });
    this.type = type;
  }
}
class NotImplementedException extends Exception {
  constructor(methodName, host) {
    super({
      message: `method '${methodName || "?"}' is not implemented.`,
      status: "method-not-implemented",
      host,
    });
    this.methodName = methodName;
  }
}
class NotSupportedException extends Exception {
  constructor(value, host) {
    super({
      message: `'${value || "?"}' is not supported.`,
      status: "not-supported",
      host,
    });
    this.value = value;
  }
}
class IndexOutOfRangeException extends Exception {
  constructor(index, min, max, host) {
    super({
      message: `index ${
        isEmpty(index) ? "" : `'${index}'`
      } is out of range [${min || "0"}, ${max}].`,
      status: "index-out-of-range",
      host,
    });
    this.index = index;
    this.min = min;
    this.max = max;
  }
}
class ArgumentNullException extends Exception {
  constructor(argName, host) {
    super({
      message: `argument '${argName || "?"}' cannot be null.`,
      status: "argument-null",
      host,
    });
    this.argName = argName;
  }
}
class ArgumentUndefinedException extends Exception {
  constructor(argName, host) {
    super({
      message: `argument '${argName || "?"}' cannot be undefined.`,
      status: "argument-undefined",
      host,
    });
    this.argName = argName;
  }
}
class ArgumentNullOrUndefinedException extends Exception {
  constructor(argName, host) {
    super({
      message: `argument '${argName || "?"}' cannot be null or undefined.`,
      status: "argument-null-or-undefined",
      host,
    });
    this.argName = argName;
  }
}
class ArgumentNullOrEmptyException extends Exception {
  constructor(argName, host) {
    super({
      message: `argument '${
        argName || "?"
      }' cannot be null, undefined or zero-length string.`,
      status: "argument-null-or-empty",
      host,
    });
    this.argName = argName;
  }
}
class ArgumentEmptyException extends Exception {
  constructor(argName, host) {
    super({
      message: `argument '${
        argName || "?"
      }' cannot be null, undefined or empty strings.`,
      status: "argument-empty",
      host,
    });
    this.argName = argName;
  }
}
class ArgumentNothingException extends Exception {
  constructor(argName, host) {
    super({
      message: `argument '${
        argName || "?"
      }' cannot be null, undefined, empty strings or empty object.`,
      status: "argument-nothing",
      host,
    });
    this.argName = argName;
  }
}
class ArgumentTypeIncorrectException extends Exception {
  constructor(argName, argType, type, host) {
    super({
      message: `argument '${
        argName || "?"
      }' has an incorrect type (${argType}). expected '${type}'.`,
      status: "argument-type-incorrect",
      host,
    });
    this.argName = argName;
    this.argType = argType;
    this.type = type;
  }
}
class PropertyMissingException extends Exception {
  constructor(objName, propName, host) {
    super({
      message: `object '${objName || "?"}' misses '${propName}' property.`,
      status: "property-missing",
      host,
    });
    this.objName = objName;
    this.propName = propName;
  }
}
class ComparisonFailedException extends Exception {
  constructor(arg1Name, arg1Value, arg2Name, arg2Value, operator, host) {
    let comparison;
    let not = "not ";

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

    super({
      message: `'${arg1Name}' should ${not}be ${comparison} '${arg2Name}' (${arg1Value} is ${comparison} ${arg2Value}).`,
      status: "comparison-failed",
      host,
    });
    this.arg1Name = arg1Name;
    this.arg1Value = arg1Value;
    this.arg2Name = arg2Name;
    this.arg2Value = arg2Value;
    this.operator = operator;
  }
}
class NotInstanceOfException extends Exception {
  constructor(argName, type, host) {
    super({
      message: `argument '${argName || "?"}' must be an instance of ${type}`,
      status: "argument-not-instance-of",
      host,
    });
    this.argName = argName;
    this.type = type;
  }
}
class InvalidValueException extends Exception {
  constructor(argName, argValue, host) {
    super({
      message: `argument ${argName || "?"} has an invalid value '${argValue}'.`,
      status: "invalid-value",
      host,
    });
    this.argName = argName;
    this.argValue = argValue;
  }
}
class InvalidHttpMethodException extends Exception {
  constructor(httpMethod, host) {
    super({
      message: `invalid http method '${
        httpMethod || "?"
      }'. expected GET, POST, PUT or DELETE.`,
      status: "invalid-http-method",
      host,
    });
    this.httpMethod = httpMethod;
  }
}

export {
  AbstractInstantiationException,
  NotImplementedException,
  NotSupportedException,
  IndexOutOfRangeException,
  ArgumentNullException,
  ArgumentUndefinedException,
  ArgumentNullOrUndefinedException,
  ArgumentNullOrEmptyException,
  ArgumentEmptyException,
  ArgumentNothingException,
  ArgumentTypeIncorrectException,
  PropertyMissingException,
  ComparisonFailedException,
  NotInstanceOfException,
  InvalidValueException,
  InvalidHttpMethodException,
};
