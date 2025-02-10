# @locustjs/exception
This library provides a base Exception class and a TryCatch utlity class with three Try(), Catch() and Finally() functions.

## Current Version
```
2.1.0
```

## Installation

NPM
```
npm i @locustjs/exception
```

Yarn
```
yarn add @locustjs/exception
```

## Exception class
Exception class provides a better and more meaningful error compared to javascript errors. It is a base class from which all business exceptions could be derived.

### constructor
```javascript
Exception(settings)
```

parameters:
-	`settings`: an `Exception` instance, javascript Error object or a custom object in the shape of such errors.

### Properties
|Property|Type|Description |example |default|
|--|--|--|--|--|
| *name*			|string|exception name| ArgumentNullException  |exception class name|
| *baseName*		|string| Error object from which the exception is created| | undefined|
| *message*		|string| exception or error message|argument 'a' is null or undefined |empty string|
| *code*			|number| error code|200500 |undefined|
| *status*		|string| status code|argument-is-null |empty string|
| *host*			|string| Hosting application from which the exception is raised | Chrome58.0|undefined|
| *date*			|Date| date/time the exception is raised |2020-09-15T13:24:42|new Date()|
| *data*			|object |custom data included with the exception|{ fn: 'John', ln: 'Doe'}|null|
| *stack*			| string |function call stack at the time the exception was raised||Error.captureStackTrace()|
| *stackTrace*	| StackTrace |a helper StackTrace object that simplifies iterating in the stack info||null|
| *innerException*		|Exception|an exception by which current exception is raised | |null|
| *fileName*		|string|name of the javascript source file in which the exception was raised | myapp.js|undefined|
| *lineNumber*	|number |line number in the javascript source file in which the exception was raised|12|undefined|
| *columnNumber*	|number |column number in the javascript source file in which the exception was raised|5|undefined|

### Methods
- `toString(separator)`: converts the exception including its inner exception(s) hierarchy to a string separated by given separator (default = \n).
- `flatten()`: converts the hierarchy of inner exceptions to a flattened array.

example 1:

```javascript
	const ex = new Exception({
		message: 'calling web api failed',
		code: 100324,
		status: 'call-api-failed',
		data: { url: '/api/v1/product', method: 'POST' data: { id: 1, title: 'Product II' } }
	});
```

example 2:

```javascript
	try {
		var f;

		console.log(f.test())
	} catch (e) {
		const ex = new Exception(e);

		console.log(JSON.stringify(e));
	}

/*
{
 "name": "Exception",
 "baseName": "TypeError",
 "message": "Cannot read property 'test' of undefined",
 "stack": "TypeError: Cannot read properties of undefined (reading 'test')
    at foo (file:///C:/path/to/my/app/test.html:46:7)
    at HTMLButtonElement.<anonymous> (file:///C:/path/to/my/app/test.html:51:7)
    at HTMLButtonElement.dispatch (https://code.jquery.com/jquery-1.8.3.min.js:2:38053)
    at HTMLButtonElement.u (https://code.jquery.com/jquery-1.8.3.min.js:2:33916)",
 "stackTrace": {
 "items": [
	  {
	   "line": 46,
	   "col": 7,
	   "callSite": "foo",
	   "source": "file:///C:/path/to/my/app/test.html",
	   "message": "    at foo (file:///C:/path/to/my/app/test.html:46:7)"
	  },
	  {
	   "line": 51,
	   "col": 7,
	   "callSite": "HTMLButtonElement.<anonymous>",
	   "source": "file:///C:/path/to/my/app/test.html",
	   "message": "    at HTMLButtonElement.<anonymous> (file:///C:/path/to/my/app/test.html:51:7)"
	  },
	  {
	   "line": 2,
	   "col": 38053,
	   "callSite": "HTMLButtonElement.dispatch",
	   "source": "https://code.jquery.com/jquery-1.8.3.min.js",
	   "message": "    at HTMLButtonElement.dispatch (https://code.jquery.com/jquery-1.8.3.min.js:2:38053)"
	  },
	  {
	   "line": 2,
	   "col": 33916,
	   "callSite": "HTMLButtonElement.u",
	   "source": "https://code.jquery.com/jquery-1.8.3.min.js",
	   "message": "    at HTMLButtonElement.u (https://code.jquery.com/jquery-1.8.3.min.js:2:33916)\""
	  }
	 ]
	},
 "innerException": null,
 "data": null,
 "date": "2022-10-16T11:42:10.223Z"
}
*/
```

### Derived classes

- `PropertyReadOnlyException`
- `AbstractInstantiationException`
- `NotImplementedException`
- `NotSupportedException`
- `IndexOutOfRangeException`
- `ValueNotBetweenException`
- `ValueIsBetweenException`
- `ArgumentNullException`
- `ArgumentUndefinedException`
- `ArgumentNullOrUndefinedException`
- `ArgumentNullOrEmptyException`
- `ArgumentEmptyException`
- `ArgumentNothingException`
- `ArgumentTypeIncorrectException`
- `PropertyMissingException`
- `ComparisonFailedException`
- `NotInstanceOfException`
- `InvalidValueException`
- `InvalidHttpMethodException`

## StackTrace
Processes a stack-trace value and populates a list of `StackTraceItem` objects to facilitate working with a stack-trace information.

>> By default, `Exception` class processes `stackTrace` of a javascript `Error` object into a `StackTrace` instance.

### constructor
```javascript
	StackTrace(stackTrace: string)
```

parameters:
-	`stackTrace`: strack trace of a javascript error object

### Properties

|Property|Type|Description|
|--|--|--|
| *items*			|`StackTraceItem`| List of stack-trace items|

example:

```javascript
	const st = new StackTrace(`"TypeError: Cannot read properties of undefined (reading 'test')
    at foo (file:///C:/path/to/my/app/test.html:46:7)
    at HTMLButtonElement.<anonymous> (file:///C:/path/to/my/app/test.html:51:7)
    at HTMLButtonElement.dispatch (https://code.jquery.com/jquery-1.8.3.min.js:2:38053)
    at HTMLButtonElement.u (https://code.jquery.com/jquery-1.8.3.min.js:2:33916)"`);

	console.log(JSON.stringify(st, null, ' '));

/*
{
 "items": [
  {
   "line": 46,
   "col": 7,
   "callSite": "foo",
   "source": "file:///C:/path/to/my/app/test.html",
   "message": "    at foo (file:///C:/path/to/my/app/test.html:46:7)"
  },
  {
   "line": 51,
   "col": 7,
   "callSite": "HTMLButtonElement.<anonymous>",
   "source": "file:///C:/path/to/my/app/test.html",
   "message": "    at HTMLButtonElement.<anonymous> (file:///C:/path/to/my/app/test.html:51:7)"
  },
  {
   "line": 2,
   "col": 38053,
   "callSite": "HTMLButtonElement.dispatch",
   "source": "https://code.jquery.com/jquery-1.8.3.min.js",
   "message": "    at HTMLButtonElement.dispatch (https://code.jquery.com/jquery-1.8.3.min.js:2:38053)"
  },
  {
   "line": 2,
   "col": 33916,
   "callSite": "HTMLButtonElement.u",
   "source": "https://code.jquery.com/jquery-1.8.3.min.js",
   "message": "    at HTMLButtonElement.u (https://code.jquery.com/jquery-1.8.3.min.js:2:33916)\""
  }
 ]
}
*/
```

## StackTraceItem
Processes one line of a stack-trace information and presents it as an object by extracting its details.

### constructor
```javascript
	StackTraceItem(line: string)
```

parameters:
-	`line`: one line of a stack-trace information

### Properties

|Property|Type|Description|
|--|--|--|
| *line* |`number`| line number of error |
| *col* |`number`| column number of error |
| *callSite* |`string`| function name at which the error was raised |
| *source* |`string`| file name the error was raised at |
| *message* |`string`| given error info |

example:

```javascript
	let sti;
	
	sti = new StackTraceItem(`"	at foo (file:///C:/path/to/my/app/test.html:46:7)"`);

	console.log(JSON.stringify(sti, null, ' '));
	/*
	{
		line: 46,
		col: 7,
		callSite: "foo",
		source: "file:///C:/path/to/my/app/test.html"
	}
	*/

	sti = new StackTraceItem(`"	    at <anonymous>:1:10"`);

	console.log(JSON.stringify(sti, null, ' '));
	/*
	{
		line: 1,
		col: 10,
		callSite: "<anonymous>",
		source: ""
	}
	*/
```

## Utility functions
### `throwIfInstantiateAbstract(classType, instance, host)`
Checks whether `classType` is an abstract class and if so, throws a new `AbstractInstantiationException`.

```javascript
class MyAbstractClass {
	constructor() {
		throwIfInstantiateAbstract(MyAbstractClass, this)
	}
	...
}
class MyConcreteClass extends MyAbstractClass {
	...
}

let obj = new MyAbstractClass();   // throws AbstractInstantiationException
```

### `throwIfNotInstanceOf(argName, classType, instance, ignoreNull = false, host = '')`
Checks whether given object is an instance of the specified classType. If not, it throws a new `NotInstanceOfException`.

```javascript
class FooBase {
	get Code() {
		return this._code;
	}
	set Code(value) {
		this._code = value;
	}
	...
}
class Foo extends FooBase {
	...
}

function validate(f) {
	throwIfNotInstanceOf(f, FooBase);   // make sure f is an instance of FooBase

	// f is a FooBase object. so, it definitely has a 'Code' prop.
	
	if (f.Code.length < 3) {
		...
	}
}
```

- `throwNotImplementedException(method, host)`
This method is mainly used in abstract classes and throws a new `NotImplementedException` exception to show that child classes have to implement the method.


```javascript
class FooBase {
	doSomething() {
		throwNotImplementedException(`${this.constructor.name}.doSomething`)
	}
	...
}
```

- `throwIfNull(arg, argName, host)`
Checks `arg` and throws a `ArgumentNullException` exception if `arg` is `null`.
	
```javascript
class FooBase {
	doSomething(foo) {
		throwIfNull(foo, 'foo')

		...
	}
	...
}
```

- `throwIfUndefined(arg, argName, host)`
Checks `arg` and throws a `ArgumentUndefinedException` exception if `arg` is `undefined`.
	
```javascript
class FooBase {
	doSomething(foo) {
		throwIfUndefined(foo, 'foo')

		...
	}
	...
}
```

- `throwIfNullOrUndefined(arg, argName, host)`
Checks `arg` and throws a `ArgumentNullOrUndefinedException` exception if `arg` is `null` or `undefined`.
	
```javascript
class FooBase {
	doSomething(foo) {
		throwIfNullOrUndefined(foo, 'foo')

		...
	}
	...
}
```

- `throwIfNullOrEmpty(arg, argName, host)`
Checks `arg` and throws a `ArgumentNullOrEmptyException` exception if `arg` is `null`, `undefined` or zero-length string.
	
```javascript
class FooBase {
	doSomething(foo) {
		throwIfNullOrEmpty(foo, 'foo')

		...
	}
	...
}
```

- `throwIfEmpty`
Checks `arg` and throws a `ArgumentEmptyException` exception if `arg` is empty (`null`, `undefined` or empty strings).

```javascript
class FooBase {
	doSomething(foo) {
		throwIfEmpty(foo, 'foo')

		...
	}
	...
}
```

- `throwIfNothing`
Checks `arg` and throws a `ArgumentNothingException` exception if `arg` is empty (`null`, `undefined`, empty string or emty object).

```javascript
class FooBase {
	doSomething(foo) {
		throwIfNothing(foo, 'foo')

		...
	}
	...
}
```

- `throwIfTypeIncorrect(arg, argName, typeOrCheckType, host)`
Checks `arg` and throws a `ArgumentTypeIncorrectException` exception if `arg`'s type does not match `typeOrCheckType`'.

`typeOrCheckType` could be a string specifying the type to be checked or a custom function that checks type matching.

Intrinsic supported types:
- `number`: number
- `number+`: non-zero number
- `numeric`: number or a  string containing a number
- `int` or `integer` : integer
- `int+` or `integer+`: a non-zero integer
- `float`: float
- `float+`: non-zero float
- `string`: string
- `string+`: non-zero length string
- `bool`: bool
- `bool*`: bool or a non-trimmed string containing `true`, `false`, `True`, `False`, `TRUE`, `FALSE`
- `bool#`: bool or a string containing `true`, `false`, `True`, `False`, `TRUE`, `FALSE`
- `bool^`: bool or a string containing `true`, `false`, `True`, `False`
- `bool!`: bool or a string containing `true`, `false`
- `array`: array
- `array+`: non-zero length array
- `object`: object
- `object+`: non-empty object
- `date`: date
- `function`: function
- `basic`: `number`, `string`, `bool`, `date`
- `primitive`: basic data type or instances of `Number`, `String`, `Boolean`, `Date`
- other: arg should be an instance of 


```javascript
class Foo { }
class Bar { }
...
function doSomething(a, b, c, d, e) {
	throwIfTypeIncorrect(a, 'a', 'Foo')
	throwIfTypeIncorrect(b, 'b', 'bool')
	throwIfTypeIncorrect(c, 'c', 'number')
	throwIfTypeIncorrect(d, 'd', 'string')
	throwIfTypeIncorrect(e, 'e', x => x instanceof Bar)
	...
}
```

By default, `throwIfTypeIncorrect` requires the argument not to be `null` or `undefined`. Using the `?` suffix, we can make the argument optional.

```javascript
function doSomething(a, b) {
	throwIfTypeIncorrect(a, 'a', 'number?')
	throwIfTypeIncorrect(b, 'b', 'string+?')
	...
}
```

List of helpers created over `throwIfTypeIncorrect`:
- `throwIfNotNumber`
- `throwIfNotSomeNumber`
- `throwIfNotNumeric`
- `throwIfNotBool`
- `throwIfNotHasBool`
- `throwIfNotString`
- `throwIfNotSomeString`
- `throwIfNotDate`
- `throwIfNotObject`
- `throwIfNotSomeObject`
- `throwIfNotFunction`
- `throwIfNotInt`
- `throwIfNotSomeInt`
- `throwIfNotFloat`
- `throwIfNotSomeFloat`
- `throwIfNotArray`
- `throwIfNotSomeArray`
- `throwIfNotBasic`
- `throwIfNotPrimitive`
- `throwIfNotInShape`

All of the helpers, except `throwIfNotInShape` have the following signature:

`fn(arg, argName, host)`

example:
```javascript
function sum(arr, fromIndex, toIndex) {
	throwIfNotArray(arr, 'arr')
	throwIfNotNumber(fromIndex, 'fromIndex')
	throwIfNotNumber(toIndex, 'toIndex')

	// we are safe here
	...
}
```

`throwIfNotInShape` signature is as follows:

`throwIfNotInShape(arg, argName, shape, host)`
example:
```javascript
function validate(person) {
	throwIfNotInShape(person, 'person', {
		firstName: 'string+?',	// not required
		lastName: 'string+',	// required
		age: 'int?',	// not required
		phone: {
			required: true,
			validate: x => /^\d+$/.test(x)
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
	})

	// we are safe here
	...
}
```

- `throwIfIndexOutOfRange(index, min, max, host)`
Checks `index` and throws a `IndexOutOfRangeException` exception if `index` is not between `min` (inclusive) and `max` (exclusive).

```javascript
class Foo { }
...
function concat(arr, from, to) {
	throwIfIndexOutOfRange(from, `from`, 0, arr.length);
	throwIfIndexOutOfRange(to, `to`, 0, arr.length);
	...
}
```

- `throwIfMissingProperty(obj, objName, prop, host)`
Checks whether `obj` contains a property named `prop` and if not throws a `PropertyMissingException` exception.

```javascript
...
function login(credentials) {
	throwIfMissingProperty(credentials, `credentials`, 'username');
	throwIfMissingProperty(credentials, `credentials`, 'password');
	...
}
```

- `throwIfComparisonFailed(arg)`
Checks `arg.a` and `arg.b` and throws a `ComparisonFailedException` exception if comparing `arg.a` and `arg.b` based on `arg.operator` does not succeed.

Structure of `arg`:
```javascript
{
	a: 10,
	b: 20,
	operator: '<'
}
```

Example:
```javascript
...
function concat(arr, from, to) {
	throwIfComparisonFailed({ a: from, b: to, operator: '>' });
	...
}
```

List of helpers created over `throwIfComparisonFailed`:

- `throwIfLessThan(a, b)`
- `throwIfLessThanOrEqualTo(a, b)`
- `throwIfGreaterThan(a, b)`
- `throwIfGreaterThanOrEqualTo(a, b)`
- `throwIfEqualTo(a, b)`
- `throwIfNotEqualTo(a, b)`
- `throwIfTypeEqualTo(a, b)`
- `throwIfNotTypeEqualTo(a, b)`
- `throwIfNotBetween(x, from , to)`
- `throwIfBetween(x, from , to)`

Example:
```javascript
...
function concat(arr, from, to) {
	throwIfGreaterThan(from, to);
	...
}
```
	
## Try/Catch/Finally
### examples
Assume we have the following functions:

```javascript
function f1(a) { return a.length }
function f2(a) { console.log(f1(a)) }
```

The ordinary `try/catch` block is this way:

```javascript
	try {
		f2();
	} catch (e) {
		console.log(e);
	} finally {
		console.log('Finished.')
	}
```

Here is various examples of using `Try/Catch`:

Example 1 (basic):
```javascript
 Try(_ => f2())
.Catch(e => console.log(e))
.Finally(_ => console.log('Finished.'))
```

`Try/Catch` provides multiple `catch` ability, a feature javascript `try/catch` does not support.

Example 2:
```javascript
function f1(a) {
	if (a === null) {
		throw new ArgumentNullException('a');
	} else if (a === undefined) {
		throw new ArgumentUndefinedException('a');
	} else if (!isSomeString(a)) {
		throw new ArgumentTypeIncorrectException('a', 'string');
	}
	
	return a.length
}

function f2(a) {
	console.log(f1(a))
}

 Try(f1)
.Catch(ArgumentNullException, console.log)
.Catch(ArgumentUndefinedException, console.log)
.Catch(ArgumentTypeIncorrectException, console.log)
.Catch(e => console.log(`Other exception raised: ${e}`))	// this Catch() is not triggered
.Finally(_ => console.log('Finished.'))
```

Example 3: verbose
```javascript
const x = Try(f2);

console.log('do something outside of previous Try');

x.Catch(e => console.log(e));
x.Finally(_ => console.log('Finished.'));

/* output:
TypeError: Cannot read property 'length' of undefined
    at f2 (<anonymous>:1:69)
    at f1 (<anonymous>:1:30)
    at TryCatch._fn (<anonymous>:1:19)
    at TryCatch.Run (<anonymous>:93:22)
    at Try (<anonymous>:161:16)
    at <anonymous>:1:9
    at <anonymous>:3:42
*/
```

Example 4: external catch (not possible using traditional `try/catch`)

```javascript
function doSomething(a) {
	return Try(_ => {
		console.log(`name: ${a.name}`);
	});
}

doSomething()
	.Catch(e => console.log(e))
	.Finally('Finished');
```
