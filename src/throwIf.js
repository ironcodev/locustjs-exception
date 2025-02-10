import {
  isNumeric,
  isEmpty,
  isNull,
  isNullOrEmpty,
  isUndefined,
  isNullOrUndefined,
  isFunction,
  isSomeString,
  isNumber,
  isString,
  isBool,
  isArray,
  isObject,
  isDate,
  isPrimitive,
  isInteger,
  isFloat,
  isBasic,
  isNothing,
  hasBool,
  isSomeNumber,
  isSomeObject,
  isSomeArray,
} from "@locustjs/base";
import {
  AbstractInstantiationException,
  ArgumentEmptyException,
  ArgumentNothingException,
  ArgumentNullException,
  ArgumentNullOrEmptyException,
  ArgumentNullOrUndefinedException,
  ArgumentTypeIncorrectException,
  ArgumentUndefinedException,
  ComparisonFailedException,
  IndexOutOfRangeException,
  ValueNotBetweenException,
  ValueIsBetweenException,
  InvalidValueException,
  NotImplementedException,
  NotInstanceOfException,
  NotSupportedException,
  PropertyMissingException,
} from "./Exceptions";

function throwIfInstantiateAbstract(classType, instance, host) {
  if (instance.constructor === classType) {
    throw new AbstractInstantiationException(classType.name, host);
  }
}

function throwIfNotInstanceOf(
  argName,
  classType,
  instance,
  ignoreNull = false,
  host = ""
) {
  if (isNullOrUndefined(instance)) {
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

function throwIfUndefined(arg, argName, host) {
  if (isUndefined(arg)) {
    throw new ArgumentUndefinedException(argName, host);
  }
}

function throwIfNullOrUndefined(arg, argName, host) {
  if (isNullOrUndefined(arg)) {
    throw new ArgumentNullOrUndefinedException(argName, host);
  }
}

function throwIfNullOrEmpty(arg, argName, host) {
  if (isNullOrEmpty(arg)) {
    throw new ArgumentNullOrEmptyException(argName, host);
  }
}

function throwIfEmpty(arg, argName, host) {
  if (isEmpty(arg)) {
    throw new ArgumentEmptyException(argName, host);
  }
}

function throwIfNothing(arg, argName, host) {
  if (isNothing(arg)) {
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

  if (isNullOrUndefined(obj[prop])) {
    throw new PropertyMissingException(objName, prop, host);
  }
}

function throwIfTypeIncorrect(arg, argName, typeOrCheckType, host) {
  let err;
  let type;

  if (isFunction(typeOrCheckType)) {
    type = err = typeOrCheckType(arg);
  } else if (isSomeString(typeOrCheckType)) {
    type = typeOrCheckType;
    let required = true;

    if (type.endsWith("?")) {
      required = false;
      type = type.substr(0, type.length - 1);
    }

    if (required) {
      throwIfNullOrUndefined(arg, argName, host);
    }
    
    if (!isUndefined(arg)) {
      switch (type) {
        case "number":
          err = !isNumber(arg);
          break;
        case "number+":
          err = !isSomeNumber(arg);
          break;
        case "numeric":
          err = !isNumeric(arg);
          break;
        case "int":
        case "integer":
          err = !isInteger(arg);
          break;
        case "int+":
        case "integer+":
          err = !(isInteger(arg) && arg == 0);
          break;
        case "float":
          err = !isFloat(arg);
          break;
        case "float+":
          err = !(isFloat(arg) && arg == 0);
          break;
        case "string":
          err = !isString(arg);
          break;
        case "string+":
          err = !isSomeString(arg);
          break;
        case "bool":
          err = !isBool(arg);
          break;
        case "bool*":
          err = !hasBool(arg);
          break;
        case "bool#":
          err = !hasBool(arg, "pu");
          break;
        case "bool^":
          err = !hasBool(arg, "p");
          break;
        case "bool!":
          err = !hasBool(arg, "");
          break;
        case "array":
          err = !isArray(arg);
          break;
        case "array+":
          err = !isSomeArray(arg);
          break;
        case "object":
          err = !isObject(arg);
          break;
        case "object+":
          err = !isSomeObject(arg);
          break;
        case "date":
          err = !isDate(arg);
          break;
        case "function":
          err = !isFunction(arg);
          break;
        case "basic":
          err = !isBasic(arg);
          break;
        case "primitive":
          err = !isPrimitive(arg);
          break;
        default:
          if (isObject(arg) && isFunction(arg.constructor)) {
            err = arg.constructor.name != type;
          } else {
            err = typeof arg == type;
          }
  
          break;
      }
    }
  }

  if (err) {
    throw new ArgumentTypeIncorrectException(argName, typeof arg, type, host);
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

  for (let key of Object.keys(shape)) {
    let type = shape[key];
    let required = true;

    if (isObject(type)) {
      required = type.required ? true : false;

      const array = type.array ? true : false;
      const _type = type.type;
      const validate = type.validate;

      if (required) {
        throwIfMissingProperty(arg, argName, key, host);
      }

      if (array) {
        if (!isNullOrUndefined(arg[key])) {
          throwIfNotArray(arg[key], key, host);
  
          let i = 0;
  
          for (let value of arg[key]) {
            if (isObject(type.shape)) {
              throwIfNotInShape(value, key, type.shape, host);
            } else {
              throwIfTypeIncorrect(value, i, _type, host);
            }
  
            if (isFunction(validate)) {
              throwIfInvalid(arg[key], key, validate, host);
            }
            
            i++;
          }
        }
      } else {
        if (isObject(type.shape)) {
          if (!isNullOrUndefined(arg[key])) {
            throwIfNotInShape(arg[key], key, type.shape, host);
          }
        } else {
          throwIfTypeIncorrect(arg[key], key, _type, host);
        }

        if (isFunction(validate)) {
          throwIfInvalid(arg[key], key, validate, host);
        }
      }
    } else if (isString(type)) {
      if (type.endsWith("?")) {
        required = false;
      }
      if (required) {
        throwIfMissingProperty(arg, argName, key, host);
      }

      throwIfTypeIncorrect(arg[key], key, type, host);
    } else if (isFunction(type)) {
      throwIfTypeIncorrect(arg[key], key, type, host);
    } else {
      throw new InvalidValueException(key, type, host);
    }
  }
}

function throwIfIndexOutOfRange(index, min, max, host) {
  throwIfEmpty(index, "index", host);

  if (!isNumeric(min)) {
    min = 0;
  }
  if (!isNumeric(max)) {
    max = 0;
  }
  if (!isNumeric(index)) {
    index = -1;
  }
  if (index < min || index >= max) {
    throw new IndexOutOfRangeException(index, min, max, host);
  }
}

function throwIfNotBetween(value, from, to, host) {
  throwIfEmpty(value, "value", host);

  if (value < from || value > to) {
    throw new ValueNotBetweenException(value, from, to, host);
  }
}

function throwIfBetween(value, from, to, host) {
  throwIfEmpty(value, "value", host);

  if (value >= from && value <= to) {
    throw new ValueIsBetweenException(value, from, to, host);
  }
}

function throwIfComparisonFailed(arg) {
  let comparisonFailed;

  throwIfTypeIncorrect(arg, "arg", "object");

  const arg1Value = arg.a;
  const arg1Name = "a";
  const arg2Value = arg.b;
  const arg2Name = "b";
  const operator = arg.operator;
  const host = arg.host;

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
    throw new ComparisonFailedException(
      arg1Name,
      arg1Value,
      arg2Name,
      arg2Value,
      operator,
      host
    );
  }
}

function throwIfLessThan(a, b) {
  throwIfComparisonFailed({ a, b, operator: "<" });
}

function throwIfLessThanOrEqualTo(a, b) {
  throwIfComparisonFailed({ a, b, operator: "<=" });
}

function throwIfGreaterThan(a, b) {
  throwIfComparisonFailed({ a, b, operator: ">" });
}

function throwIfGreaterThanOrEqualTo(a, b) {
  throwIfComparisonFailed({ a, b, operator: ">=" });
}

function throwIfEqualTo(a, b) {
  throwIfComparisonFailed({ a, b, operator: "==" });
}

function throwIfNotEqualTo(a, b) {
  throwIfComparisonFailed({ a, b, operator: "!=" });
}

function throwIfTypeEqualTo(a, b) {
  throwIfComparisonFailed({ a, b, operator: "===" });
}

function throwIfNotTypeEqualTo(a, b) {
  throwIfComparisonFailed({ a, b, operator: "!==" });
}

function throwNotImplementedException(method, host) {
  throw new NotImplementedException(method, host);
}

function throwNotSupportedException(member, host) {
  throw new NotSupportedException(member, host);
}

export {
  throwIfInstantiateAbstract,
  throwIfNotInstanceOf,
  throwIfNull,
  throwIfUndefined,
  throwIfNullOrUndefined,
  throwIfNullOrEmpty,
  throwIfEmpty,
  throwIfNothing,
  throwIfInvalid,
  throwIfMissingProperty,
  throwIfTypeIncorrect,
  throwIfNotNumber,
  throwIfNotSomeNumber,
  throwIfNotNumeric,
  throwIfNotBool,
  throwIfNotHasBool,
  throwIfNotString,
  throwIfNotSomeString,
  throwIfNotDate,
  throwIfNotObject,
  throwIfNotSomeObject,
  throwIfNotFunction,
  throwIfNotInt,
  throwIfNotSomeInt,
  throwIfNotFloat,
  throwIfNotSomeFloat,
  throwIfNotArray,
  throwIfNotSomeArray,
  throwIfNotBasic,
  throwIfNotPrimitive,
  throwIfNotInShape,
  throwNotImplementedException,
  throwNotSupportedException,
  throwIfIndexOutOfRange,
  throwIfNotBetween,
  throwIfBetween,
  throwIfComparisonFailed,
  throwIfLessThan,
  throwIfLessThanOrEqualTo,
  throwIfGreaterThan,
  throwIfGreaterThanOrEqualTo,
  throwIfEqualTo,
  throwIfNotEqualTo,
  throwIfTypeEqualTo,
  throwIfNotTypeEqualTo,
};
