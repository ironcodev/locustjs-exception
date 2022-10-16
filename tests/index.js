import { isArray } from "locustjs-base";
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
} from "../index.esm.js";

function test1() {
  const BASENAME = "MyException",
    CODE = 120,
    STATUS = "some-exception",
    HOST = "my-host",
    MESSAGE = "this is an exception",
    DATA = 25,
    FILENAME = "test.esm.js",
    LINENUMBER = 100,
    COLUMNNUMBER = 25;

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
  });

  console.log(ex.stackTrace instanceof StackTrace);
}

function test2() {
  try {
    var f;

    console.log(f.test());
  } catch (e) {
    const ex = new Exception(e);

    console.log(JSON.stringify(ex, null, " "));
  }
}

function test3() {
  const st = new StackTrace(`"TypeError: Cannot read properties of undefined (reading 'test')
    at foo (file:///C:/path/to/my/app/test.html:46:7)
    at HTMLButtonElement.<anonymous> (file:///C:/path/to/my/app/test.html:51:7)
    at HTMLButtonElement.dispatch (https://code.jquery.com/jquery-1.8.3.min.js:2:38053)
    at HTMLButtonElement.u (https://code.jquery.com/jquery-1.8.3.min.js:2:33916)"`);

  console.log(JSON.stringify(st, null, " "));
}

test3()