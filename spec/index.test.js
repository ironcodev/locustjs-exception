import { isFunction } from "@locustjs/base";
import {
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
  TryCatch,
  Try,
  Catch,
  Finally,
  throwIfNullOrEmpty,
  throwIfLessThan,
  ComparisonFailedException,
  throwIfLessThanOrEqualTo,
  throwIfNotInShape,
  ArgumentNullOrUndefinedException,
  PropertyMissingException,
  InvalidValueException,
  throwIfNotBetween,
  ValueNotBetweenException,
  throwIfBetween,
  ValueIsBetweenException
} from "../src";

class FooBase {
  constructor() {
    throwIfInstantiateAbstract(FooBase, this);
  }
  test() {
    throwNotImplementedException("test", "FooBase");
  }
}

class Foo extends FooBase {}
class Fooo extends FooBase {
  test() {}
}
class Bar {}

describe("Main Exception class", function () {
  it("MyException", function () {
    const BASENAME = "MyException",
      CODE = 120,
      STATUS = "some-exception",
      HOST = "my-host",
      MESSAGE = "this is an exception",
      DATA = 25,
      FILENAME = "test.esm.js",
      LINENUMBER = 100,
      COLUMNNUMBER = 25,
      INNEREXCEPTION = new Error("some inner error");

    const ex = new Exception({
      baseName: BASENAME,
      code: CODE,
      status: STATUS,
      host: HOST,
      message: MESSAGE,
      data: DATA,
      fileName: FILENAME,
      lineNumber: LINENUMBER,
      columnNumber: COLUMNNUMBER,
      innerException: INNEREXCEPTION,
    });

    expect(ex).toBeDefined();
    expect(ex.name).toBe("Exception");
    expect(ex.baseName).toBe(BASENAME);
    expect(ex.code).toBe(CODE);
    expect(ex.status).toBe(STATUS);
    expect(ex.host).toBe(HOST);
    expect(ex.message).toBe(MESSAGE);
    expect(ex.data).toBe(DATA);
    expect(ex.fileName).toBe(FILENAME);
    expect(ex.lineNumber).toBe(LINENUMBER);
    expect(ex.columnNumber).toBe(COLUMNNUMBER);
    expect(ex.stack).toBeDefined();
    expect(ex.stackTrace).toBeDefined();
    expect(ex.stackTrace instanceof StackTrace).toBe(true);
    expect(ex.innerException).toBeDefined();
    expect(ex.innerException instanceof Exception).toBe(true);
    expect(ex.innerException.message).toBe("some inner error");

    const messages = ex.toString().split("\n");

    expect(messages.length).toBe(2);
    expect(messages[0]).toBe(MESSAGE);

    const arrMessages = ex.flatten();

    expect(arrMessages.length).toBe(2);
    expect(arrMessages[0]).toBe(ex);
    expect(arrMessages[1]).toBe(ex.innerException);

    expect(() => (ex.name = "")).toThrow();
    expect(() => (ex.baseName = "")).toThrow();
    expect(() => (ex.code = "")).toThrow();
    expect(() => (ex.status = "")).toThrow();
    expect(() => (ex.host = "")).toThrow();
    expect(() => (ex.message = "")).toThrow();
    expect(() => (ex.data = "")).toThrow();
    expect(() => (ex.fileName = "")).toThrow();
    expect(() => (ex.lineNumber = "")).toThrow();
    expect(() => (ex.columnNumber = "")).toThrow();
    expect(() => (ex.stack = "")).toThrow();
    expect(() => (ex.stackTrace = "")).toThrow();
    expect(() => (ex.stackTrace = "")).toThrow();
    expect(() => (ex.innerException = "")).toThrow();
  });

  it("StackTraceItem", function () {
    let error = "    at foo (file:///C:/path/to/my/app/test.html:10:5)";
    let sti = new StackTraceItem(error);

    expect(sti).toBeDefined();
    expect(sti.line).toBe(10);
    expect(sti.col).toBe(5);
    expect(sti.callSite).toBe("foo");
    expect(sti.source).toBe("file:///C:/path/to/my/app/test.html");

    error = "    at <anonymous>:1:10";
    sti = new StackTraceItem(error);

    expect(sti).toBeDefined();
    expect(sti.line).toBe(1);
    expect(sti.col).toBe(10);
    expect(sti.callSite).toBe("<anonymous>");
    expect(sti.source).toBe("");
  });

  it("PropertyReadOnlyException 1", function () {
    const HOST = "my-host";
    const ex = new PropertyReadOnlyException("someProp", HOST);

    expect(ex.message.indexOf("someProp") > 0).toBe(true);
    expect(ex.status).toBe("property-readonly");
    expect(ex.host).toBe(HOST);
  });

  it("PropertyReadOnlyException 2", function () {
    const HOST = "my-host";
    const ex = new PropertyReadOnlyException(null, HOST);

    expect(ex.message.indexOf("?") > 0).toBe(true);
    expect(ex.status).toBe("property-readonly");
    expect(ex.host).toBe(HOST);
  });

  it("AbstractInstantiationException 1", function () {
    const HOST = "my-host";
    const ex = new AbstractInstantiationException("FooBase", HOST);

    expect(ex.message.indexOf("FooBase") > 0).toBe(true);
    expect(ex.status).toBe("cannot-instantiate-from-abstract-class");
    expect(ex.host).toBe(HOST);
  });

  it("AbstractInstantiationException 2", function () {
    const HOST = "my-host";
    const ex = new AbstractInstantiationException(null, HOST);

    expect(ex.message.indexOf("?") > 0).toBe(true);
    expect(ex.status).toBe("cannot-instantiate-from-abstract-class");
    expect(ex.host).toBe(HOST);
  });

  it("NotImplementedException", function () {
    const HOST = "my-host";
    const ex = new NotImplementedException("someMethod", HOST);

    expect(ex.message.indexOf("someMethod") > 0).toBe(true);
    expect(ex.status).toBe("method-not-implemented");
    expect(ex.host).toBe(HOST);
  });

  it("IndexOutOfRangeException", function () {
    const HOST = "my-host";
    const ex = new IndexOutOfRangeException(10, 0, 5, HOST);

    expect(ex.message.indexOf("[0, 5]") > 0).toBe(true);
    expect(ex.status).toBe("index-out-of-range");
    expect(ex.host).toBe(HOST);
  });

  it("ArgumentNullException 1", function () {
    const HOST = "my-host";
    const ex = new ArgumentNullException("arg1", HOST);

    expect(ex.message.indexOf("arg1") > 0).toBe(true);
    expect(ex.status).toBe("argument-null");
    expect(ex.host).toBe(HOST);
  });

  it("ArgumentNullException 2", function () {
    const HOST = "my-host";
    const ex = new ArgumentNullException(null, HOST);

    expect(ex.message.indexOf("?") > 0).toBe(true);
    expect(ex.status).toBe("argument-null");
    expect(ex.host).toBe(HOST);
  });

  it("ArgumentEmptyException 3", function () {
    const HOST = "my-host";
    const ex = new ArgumentEmptyException("arg1", HOST);

    expect(ex.message.indexOf("arg1") > 0).toBe(true);
    expect(ex.status).toBe("argument-empty");
    expect(ex.host).toBe(HOST);
  });

  it("ArgumentEmptyException 4", function () {
    const HOST = "my-host";
    const ex = new ArgumentEmptyException(null, HOST);

    expect(ex.message.indexOf("?") > 0).toBe(true);
    expect(ex.status).toBe("argument-empty");
    expect(ex.host).toBe(HOST);
  });

  it("ArgumentTypeIncorrectException", function () {
    const HOST = "my-host";
    const ex = new ArgumentTypeIncorrectException("arg1", "?", "SomeType", HOST);

    expect(ex.message.indexOf("arg1") > 0).toBe(true);
    expect(ex.message.indexOf("SomeType") > 0).toBe(true);
    expect(ex.status).toBe("argument-type-incorrect");
    expect(ex.host).toBe(HOST);
  });

  it("ArgumentTypeIncorrectException", function () {
    const HOST = "my-host";
    const ex = new ArgumentTypeIncorrectException(null, "?", "SomeType", HOST);

    expect(ex.message.indexOf("?") > 0).toBe(true);
    expect(ex.message.indexOf("SomeType") > 0).toBe(true);
    expect(ex.status).toBe("argument-type-incorrect");
    expect(ex.host).toBe(HOST);
  });

  it("NotInstanceOfException", function () {
    const HOST = "my-host";
    const ex = new NotInstanceOfException("arg1", "SomeType", HOST);

    expect(ex.message.indexOf("arg1") > 0).toBe(true);
    expect(ex.message.indexOf("SomeType") > 0).toBe(true);
    expect(ex.status).toBe("argument-not-instance-of");
    expect(ex.host).toBe(HOST);
  });

  it("NotInstanceOfException", function () {
    const HOST = "my-host";
    const ex = new NotInstanceOfException(null, "SomeType", HOST);

    expect(ex.message.indexOf("?") > 0).toBe(true);
    expect(ex.message.indexOf("SomeType") > 0).toBe(true);
    expect(ex.status).toBe("argument-not-instance-of");
    expect(ex.host).toBe(HOST);
  });

  it("InvalidHttpMethodException 1", function () {
    const HOST = "my-host";
    const ex = new InvalidHttpMethodException("some-method", HOST);

    expect(ex.message.indexOf("some-method") > 0).toBe(true);
    expect(ex.status).toBe("invalid-http-method");
    expect(ex.host).toBe(HOST);
  });

  it("InvalidHttpMethodException 2", function () {
    const HOST = "my-host";
    const ex = new InvalidHttpMethodException(null, HOST);

    expect(ex.message.indexOf("?") > 0).toBe(true);
    expect(ex.status).toBe("invalid-http-method");
    expect(ex.host).toBe(HOST);
  });

  it("throwIfInstantiateAbstract", function () {
    expect(() => {
      new FooBase();
    }).toThrow();

    expect(() => {
      new Foo();
    }).not.toThrow();
  });

  it("throwIfNotInstanceOf", function () {
    expect(() => {
      throwIfNotInstanceOf("arg1", FooBase, new Bar());
    }).toThrow();

    expect(() => {
      throwIfNotInstanceOf("arg1", FooBase, new Foo());
    }).not.toThrow();
  });

  it("throwIfNull", function () {
    expect(() => {
      throwIfNull(null);
    }).toThrow();

    expect(() => {
      throwIfNullOrEmpty(undefined);
    }).toThrow();

    expect(() => {
      throwIfNull("");
    }).not.toThrow();
  });

  it("throwIfEmpty", function () {
    expect(() => {
      throwIfEmpty(null);
    }).toThrow();

    expect(() => {
      throwIfEmpty(undefined);
    }).toThrow();

    expect(() => {
      throwIfEmpty("");
    }).toThrow();

    expect(() => {
      throwIfEmpty(0);
    }).not.toThrow();
  });

  it("throwIfTypeIncorrect(a, 'a', 'int')", function () {
    const HOST = "my-host";
    const value = 23;

    try {
      throwIfTypeIncorrect(value, "value", "int", HOST);

      expect(true).toBe(true);
    } catch (e) {
      expect(false).toBe(true);
    }
  });

  it("throwIfTypeIncorrect(a, 'a', 'string')", function () {
    const HOST = "my-host";
    const value = 23;

    try {
      throwIfTypeIncorrect(value, "value", "string", HOST);

      expect(false).toBe(true);
    } catch (e) {
      expect(e instanceof ArgumentTypeIncorrectException).toBe(true);
      expect(e.host).toBe(HOST);
    }
  });

  it("throwIfNotInShape(shape, obj)", function () {
    const HOST = "my-host";
    const succeeded = (e) => {
      expect(true).toBe(true);
      if (e) {
        expect(e.host).toBe(HOST);
      }
    };
    const failed = (e) => {
      expect(false).toBe(true);
      if (e) {
        expect(e.host).toBe(HOST);
      }
    };
    const expectSuccess = (obj, shape) => {
      try {
        throwIfNotInShape(obj, "obj", shape, HOST);
        succeeded();
      } catch (e) {
          // console.log(e.message)
          failed(e);
      }
    }
    const expectFail = (obj, shape, ex, fn) => {
      try {
        throwIfNotInShape(obj, "obj", shape, HOST);
        failed();
      } catch (e) {
        if (ex) {
          // console.log(e.message)
          expect(e instanceof ex).toBe(true);

          if (isFunction(fn)) {
            expect(fn(e)).toBe(true)
          }
        }
        succeeded(e);
      }
    }
    let obj;

    const shape1 = {
      a: "number",
      b: "string",
      c: "bool?",
      d: "object",
      fn: "function",
    };

    expectFail(obj, shape1, ArgumentNullOrUndefinedException);
    obj = {};
    expectFail(obj, shape1, PropertyMissingException, ex => ex.propName == 'a');
    obj = { a: 'aa'};
    expectFail(obj, shape1, ArgumentTypeIncorrectException, ex => ex.argName == 'a' && ex.type == 'number');
    obj = { a: 10 };
    expectFail(obj, shape1, PropertyMissingException, ex => ex.propName == 'b');
    obj = { a: 10, b: '' };
    expectFail(obj, shape1, PropertyMissingException, ex => ex.propName == 'd');
    obj = { a: 10, b: '', d: {} };
    expectFail(obj, shape1, PropertyMissingException, ex => ex.propName == 'fn');
    obj = { a: 10, b: '', c: true, d: {} };
    expectFail(obj, shape1, PropertyMissingException, ex => ex.propName == 'fn');
    obj = { a: 10, b: '', d: {}, fn: () => 1 };
    expectSuccess(obj, shape1);
    
    const shape2 = {
      firstName: 'string+?',
      lastName: 'string+',
      age: 'int',
      phone: {
        required: true,
        validate: x => /^\d{3,5}$/.test(x)
      },
      location: {
        shape: {
          country: 'string',
          city: 'string'
        }
      },
      scores: {
        array: true,
        type: 'int',
        validate: x => x >= 0 && x <= 100
      }
    }

    obj = { };
    expectFail(obj, shape2, PropertyMissingException, ex => ex.propName == 'lastName');
    obj = { firstName: '' };
    expectFail(obj, shape2, ArgumentTypeIncorrectException, ex => ex.argName == 'firstName');
    obj = { firstName: 'fn', lastName: undefined };
    expectFail(obj, shape2, PropertyMissingException, ex => ex.propName == 'lastName');
    obj = { firstName: 'fn', lastName: 'ln' };
    expectFail(obj, shape2, PropertyMissingException, ex => ex.propName == 'age');
    obj = { firstName: 'fn', lastName: 'ln', age: 10 };
    expectFail(obj, shape2, PropertyMissingException, ex => ex.propName == 'phone');
    obj = { firstName: 'fn', lastName: 'ln', age: 10, phone: '12' };
    expectFail(obj, shape2, InvalidValueException, ex => ex.argName == 'phone');
    obj = { firstName: 'fn', lastName: 'ln', age: 10, phone: '123', location: undefined };
    expectSuccess(obj, shape2);
    obj = { firstName: 'fn', lastName: 'ln', age: 10, phone: '123', location: {} };
    expectFail(obj, shape2, PropertyMissingException, ex => ex.propName == 'country');
    obj = { firstName: 'fn', lastName: 'ln', age: 10, phone: '123', location: { country: '' } };
    expectFail(obj, shape2, PropertyMissingException, ex => ex.propName == 'city');
    obj = { firstName: 'fn', lastName: 'ln', age: 10, phone: '123', scores:[] };
    expectSuccess(obj, shape2);
    obj = { firstName: 'fn', lastName: 'ln', age: 10, phone: '123', scores:['a'] };
    expectFail(obj, shape2, ArgumentTypeIncorrectException);
    obj = { firstName: 'fn', lastName: 'ln', age: 10, phone: '123', scores:['10'] };
    expectFail(obj, shape2, ArgumentTypeIncorrectException);
    obj = { firstName: 'fn', lastName: 'ln', age: 10, phone: '123', scores:[150] };
    expectFail(obj, shape2, InvalidValueException);
    obj = { firstName: 'fn', lastName: 'ln', age: 10, phone: '123', scores:[85] };
    expectSuccess(obj, shape2);
  });

  it("throwIfLessThan", function () {
    const a = 23;
    const b = 49;

    try {
      throwIfLessThan(a, b);

      expect(false).toBe(true);
    } catch (e) {
      expect(e instanceof ComparisonFailedException).toBe(true);
    }
  });

  it("throwIfLessThanOrEqualTo", function () {
    const a = 23;
    const b = 23;

    try {
      throwIfLessThanOrEqualTo(a, b);

      expect(false).toBe(true);
    } catch (e) {
      expect(e instanceof ComparisonFailedException).toBe(true);
    }
  });

  it("throwNotImplementedException", function () {
    expect(() => {
      const f = new Foo();

      f.test();
    }).toThrow();

    expect(() => {
      const f = new Fooo();

      f.test();
    }).not.toThrow();
  });

  it("throwIfIndexOutOfRange", function () {
    try {
      throwIfIndexOutOfRange(10, 0, 5);

      expect(() => {
        throw "test";
      }).toThrow();
    } catch (ex) {
      expect(ex instanceof IndexOutOfRangeException).toBeTrue();
    }

    expect(() => {
      throwIfIndexOutOfRange(10, 0, 20);
    }).not.toThrow();
  });

  it("throwIfNotBetween", function () {
    try {
      throwIfNotBetween(10, 20, 30);

      expect(() => {
        throw "test";
      }).toThrow();
    } catch (ex) {
      expect(ex instanceof ValueNotBetweenException).toBeTrue();
    }

    expect(() => {
      throwIfNotBetween(10, 0, 20);
    }).not.toThrow();
  });

  it("throwIfBetween", function () {
    try {
      throwIfBetween(10, 0, 20);

      expect(() => {
        throw "test";
      }).toThrow();
    } catch (ex) {
      expect(ex instanceof ValueIsBetweenException).toBeTrue();
    }

    expect(() => {
      throwIfBetween(10, 15, 20);
    }).not.toThrow();
  });

  it("Try/Catch 1", function () {
    let x, foo;

    Try((_) => (foo.name = 1)).Catch((e) => (x = e));

    expect(x).toBeDefined();
    expect(x instanceof Exception).toBe(true);
  });

  it("Try/Catch 2", function () {
    let x;

    Try((_) => {
      new FooBase();
    })
      .Catch(NotInstanceOfException, (_) => (x = 2))
      .Catch(AbstractInstantiationException, (_) => (x = 1));

    expect(x).toBe(1);
  });

  it("Try/Catch 3", function () {
    let x;

    Try((_) => {
      new FooBase();

      x = 1;
    })
      .Catch((_) => (x = 2))
      .Finally((_) => (x = 3));

    expect(x).toBe(3);
  });

  it("Try/Catch 4", function () {
    let x;

    Try((_) => {
      new Foo();

      x = 1;
    }).Catch((_) => (x = 2));

    expect(x).toBe(1);
  });
});
