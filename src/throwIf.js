import { isNumeric, isEmpty, isNull, isNullOrEmpty } from "@locustjs/base";
import {
  AbstractInstantiationException,
  ArgumentEmptyException,
  ArgumentNullException,
  ArgumentTypeIncorrectException,
  IndexOutOfRangeException,
  NotImplementedException,
  NotInstanceOfException,
  NotSupportedException,
  PropertyReadOnlyException,
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

function throwIfNullOrEmpty(arg, argName, host) {
  if (isNullOrEmpty(arg)) {
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
  if (index < min || index > max) {
    throw new IndexOutOfRangeException(index, min, max, host);
  }
}

function throwNotImplementedException(method, host) {
  throw new NotImplementedException(method, host);
}

function throwNotSupportedException(member, host) {
  throw new NotSupportedException(member, host);
}

function throwPropertyReadOnlyException(propName, host) {
  throw new PropertyReadOnlyException(propName, host);
}

export {
  throwIfInstantiateAbstract,
  throwIfNotInstanceOf,
  throwIfNull,
  throwIfNullOrEmpty,
  throwIfEmpty,
  throwIfTypeIncorrect,
  throwNotImplementedException,
  throwNotSupportedException,
  throwIfIndexOutOfRange,
  throwPropertyReadOnlyException,
};
