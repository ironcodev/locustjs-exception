import { isArray } from 'locustjs-base';
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
    Finally
} from '../index.esm.js';

const BASENAME = 'MyException',
    CODE = 120,
    STATUS = 'some-exception',
    HOST = 'my-host',
    MESSAGE = 'this is an exception',
    DATA = 25,
    FILENAME = 'test.esm.js',
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
    columnNumber: COLUMNNUMBER
});

console.log(ex.stackTrace instanceof StackTrace)
