const {
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
} = require('../index.esm.js');

class FooBase {
    constructor() {
        throwIfInstantiateAbstract(FooBase, this);
    }
    test() {
        throwNotImplementedException('test', 'FooBase')
    }
}

class Foo extends FooBase { }
class Fooo extends FooBase {
    test() { }
}
class Bar { }

describe('Testing Exceptions', () => {
    // -------------------- Main Exception class -------------------
    test('Test Exception class', () => {
        const BASENAME = 'MyException',
            CODE = 120,
            STATUS = 'some-exception',
            HOST = 'my-host',
            MESSAGE = 'this is an exception',
            DATA = 25,
            FILENAME = 'test.esm.js',
            LINENUMBER = 100,
            COLUMNNUMBER = 25,
            INNEREXCEPTION = new Error('some inner error');

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
            innerException: INNEREXCEPTION
        });

        expect(ex).toBeDefined();
        expect(ex.name).toBe('Exception');
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
        expect(ex.innerException.message).toBe('some inner error');
        
        const messages = ex.toString().split('\n');
        
        expect(messages.length).toBe(2);
        expect(messages[0]).toBe(MESSAGE);

        const arrMessages = ex.flatten();

        expect(arrMessages.length).toBe(2);
        expect(arrMessages[0]).toBe(ex);
        expect(arrMessages[1]).toBe(ex.innerException);

        expect(() => ex.name = '').toThrow();
        expect(() => ex.baseName = '').toThrow();
        expect(() => ex.code = '').toThrow();
        expect(() => ex.status = '').toThrow();
        expect(() => ex.host = '').toThrow();
        expect(() => ex.message = '').toThrow();
        expect(() => ex.data = '').toThrow();
        expect(() => ex.fileName = '').toThrow();
        expect(() => ex.lineNumber = '').toThrow();
        expect(() => ex.columnNumber = '').toThrow();
        expect(() => ex.stack = '').toThrow();
        expect(() => ex.stackTrace = '').toThrow();
        expect(() => ex.stackTrace = '').toThrow();
        expect(() => ex.innerException = '').toThrow();
    });

    // -------------------- StackTraceItem -------------------
    test('Test StackTraceItem class', () => {
        let error = "    at foo (file:///C:/path/to/my/app/test.html:10:5)";
        let sti = new StackTraceItem(error);
        
        expect(sti).toBeDefined();
        expect(sti.line).toBe(10);
        expect(sti.col).toBe(5);
        expect(sti.callSite).toBe('foo');
        expect(sti.source).toBe('file:///C:/path/to/my/app/test.html');
        
        error = "    at <anonymous>:1:10";
        sti = new StackTraceItem(error);

        expect(sti).toBeDefined();
        expect(sti.line).toBe(1);
        expect(sti.col).toBe(10);
        expect(sti.callSite).toBe('<anonymous>');
        expect(sti.source).toBe('');
    });

    // -------------------- Exception classes -------------------

    test('PropertyReadOnlyException', () => {
        const HOST = 'my-host'
        const ex = new PropertyReadOnlyException('someProp', HOST);

        expect(ex.message.indexOf('someProp') > 0).toBe(true);
        expect(ex.status).toBe('property-readonly');
        expect(ex.host).toBe(HOST);
    });

    test('PropertyReadOnlyException', () => {
        const HOST = 'my-host'
        const ex = new PropertyReadOnlyException(null, HOST);

        expect(ex.message.indexOf('?') > 0).toBe(true);
        expect(ex.status).toBe('property-readonly');
        expect(ex.host).toBe(HOST);
    });

    test('AbstractInstantiationException', () => {
        const HOST = 'my-host'
        const ex = new AbstractInstantiationException('FooBase', HOST);

        expect(ex.message.indexOf('FooBase') > 0).toBe(true);
        expect(ex.status).toBe('cannot-instantiate-from-abstract-class');
        expect(ex.host).toBe(HOST);
    });

    test('AbstractInstantiationException', () => {
        const HOST = 'my-host'
        const ex = new AbstractInstantiationException(null, HOST);

        expect(ex.message.indexOf('?') > 0).toBe(true);
        expect(ex.status).toBe('cannot-instantiate-from-abstract-class');
        expect(ex.host).toBe(HOST);
    });

    test('NotImplementedException', () => {
        const HOST = 'my-host'
        const ex = new NotImplementedException('someMethod', HOST);

        expect(ex.message.indexOf('someMethod') > 0).toBe(true);
        expect(ex.status).toBe('method-not-implemented');
        expect(ex.host).toBe(HOST);
    });

    test('IndexOutOfRangeException', () => {
        const HOST = 'my-host'
        const ex = new IndexOutOfRangeException(10, 0, 5, HOST);

        expect(ex.message.indexOf('[0, 5]') > 0).toBe(true);
        expect(ex.status).toBe('index-out-of-range');
        expect(ex.host).toBe(HOST);
    });

    test('ArgumentNullException', () => {
        const HOST = 'my-host'
        const ex = new ArgumentNullException('arg1', HOST);

        expect(ex.message.indexOf('arg1') > 0).toBe(true);
        expect(ex.status).toBe('argument-null');
        expect(ex.host).toBe(HOST);
    });

    test('ArgumentNullException', () => {
        const HOST = 'my-host'
        const ex = new ArgumentNullException(null, HOST);

        expect(ex.message.indexOf('?') > 0).toBe(true);
        expect(ex.status).toBe('argument-null');
        expect(ex.host).toBe(HOST);
    });

    test('ArgumentEmptyException', () => {
        const HOST = 'my-host'
        const ex = new ArgumentEmptyException('arg1', HOST);

        expect(ex.message.indexOf('arg1') > 0).toBe(true);
        expect(ex.status).toBe('argument-empty');
        expect(ex.host).toBe(HOST);
    });

    test('ArgumentEmptyException', () => {
        const HOST = 'my-host'
        const ex = new ArgumentEmptyException(null, HOST);

        expect(ex.message.indexOf('?') > 0).toBe(true);
        expect(ex.status).toBe('argument-empty');
        expect(ex.host).toBe(HOST);
    });

    test('ArgumentTypeIncorrectException', () => {
        const HOST = 'my-host'
        const ex = new ArgumentTypeIncorrectException('arg1', 'SomeType', HOST);

        expect(ex.message.indexOf('arg1') > 0).toBe(true);
        expect(ex.message.indexOf('SomeType') > 0).toBe(true);
        expect(ex.status).toBe('argument-type-incorrect');
        expect(ex.host).toBe(HOST);
    });

    test('ArgumentTypeIncorrectException', () => {
        const HOST = 'my-host'
        const ex = new ArgumentTypeIncorrectException(null, 'SomeType', HOST);

        expect(ex.message.indexOf('?') > 0).toBe(true);
        expect(ex.message.indexOf('SomeType') > 0).toBe(true);
        expect(ex.status).toBe('argument-type-incorrect');
        expect(ex.host).toBe(HOST);
    });

    test('NotInstanceOfException', () => {
        const HOST = 'my-host'
        const ex = new NotInstanceOfException('arg1', 'SomeType', HOST);

        expect(ex.message.indexOf('arg1') > 0).toBe(true);
        expect(ex.message.indexOf('SomeType') > 0).toBe(true);
        expect(ex.status).toBe('argument-not-instance-of');
        expect(ex.host).toBe(HOST);
    });

    test('NotInstanceOfException', () => {
        const HOST = 'my-host'
        const ex = new NotInstanceOfException(null, 'SomeType', HOST);

        expect(ex.message.indexOf('?') > 0).toBe(true);
        expect(ex.message.indexOf('SomeType') > 0).toBe(true);
        expect(ex.status).toBe('argument-not-instance-of');
        expect(ex.host).toBe(HOST);
    });

    test('InvalidHttpMethodException', () => {
        const HOST = 'my-host'
        const ex = new InvalidHttpMethodException('some-method', HOST);

        expect(ex.message.indexOf('some-method') > 0).toBe(true);
        expect(ex.status).toBe('invalid-http-method');
        expect(ex.host).toBe(HOST);
    });

    test('InvalidHttpMethodException', () => {
        const HOST = 'my-host'
        const ex = new InvalidHttpMethodException(null, HOST);

        expect(ex.message.indexOf('?') > 0).toBe(true);
        expect(ex.status).toBe('invalid-http-method');
        expect(ex.host).toBe(HOST);
    });

    // -------------------- throw helpers -------------------

    test('throwIfInstantiateAbstract', () => {
        expect(() => {
            new FooBase();
        }).toThrow();

        expect(() => {
            new Foo();
        }).not.toThrow();
    });

    test('throwIfNotInstanceOf', () => {
        expect(() => {
            throwIfNotInstanceOf('arg1', FooBase, new Bar())
        }).toThrow();

        expect(() => {
            throwIfNotInstanceOf('arg1', FooBase, new Foo())
        }).not.toThrow();
    });

    test('throwIfNull', () => {
        expect(() => {
            throwIfNull(null)
        }).toThrow();

        expect(() => {
            throwIfNull(undefined)
        }).toThrow();

        expect(() => {
            throwIfNull('')
        }).not.toThrow();
    });

    test('throwIfEmpty', () => {
        expect(() => {
            throwIfEmpty(null)
        }).toThrow();

        expect(() => {
            throwIfEmpty(undefined)
        }).toThrow();

        expect(() => {
            throwIfEmpty('')
        }).toThrow();

        expect(() => {
            throwIfEmpty(0)
        }).not.toThrow();
    });

    test('throwIfTypeIncorrect', () => {
        const HOST = 'my-host'

        try {
            throwIfTypeIncorrect('arg1', () => 'Function', HOST)
        } catch (e) {
            expect(e instanceof ArgumentTypeIncorrectException).toBe(true);
            expect(e.host).toBe(HOST);
        }

        throwIfTypeIncorrect('arg1', () => '', HOST);

        expect(true).toBe(true);
    });

    test('throwNotImplementedException', () => {
        expect(() => {
            const f = new Foo();

            f.test();
        }).toThrow();

        expect(() => {
            const f = new Fooo();

            f.test();
        }).not.toThrow();
    });

    test('throwIfIndexOutOfRange', () => {
        expect(() => {
            throwIfIndexOutOfRange(10, 0, 5);
        }).toThrow();

        expect(() => {
            throwIfIndexOutOfRange(10, 0, 20);
        }).not.toThrow();
    });

    // -------------------- Try/Catch -------------------

    test('Try/Catch', () => {
        let x, foo;

         Try(_ => foo.name = 1)
        .Catch(e => x = e);

        expect(x).toBeDefined();
        expect(x instanceof Exception).toBe(true);
    });

    test('Try/Catch', () => {
        let x;

         Try(_ => {
            new FooBase();
         })
        .Catch(NotInstanceOfException, _ => x = 2)
        .Catch(AbstractInstantiationException, _ => x = 1)

        expect(x).toBe(1);
    });

    test('Try/Catch', () => {
        let x;

         Try(_ => {
            new FooBase();

            x = 1;
         })
        .Catch(_ => x = 2)
        .Finally(_ => x = 3)

        expect(x).toBe(3);
    });

    test('Try/Catch', () => {
        let x;

         Try(_ => {
            new Foo();

            x = 1;
         })
        .Catch(_ => x = 2)

        expect(x).toBe(1);
    });
})