# @locustjs/exception
This library provides a base Exception class and a TryCatch utlity class with three Try(), Catch() and Finally() functions.

## Current Version
```
2.0.3
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
Exception class provides a better and more meaningful error compared to javascript's internal object. It is a base class from which all business exceptions should be derived.

### constructor
```javascript
Exception(settings)
```

parameters:
-	`settings`: an Exception, Error or custom object.

### Properties
It has the following properties:

|Property|Type|Description |example |default|
|--|--|--|--|--|
| *name*			|string|exception name| ArgumentNullException  |exception class name|
| *baseName*		|string| Error object from which the exception is created| | undefined|
| *message*		|string| exception message|argument 'a' is null or undefined |empty string|
| *code*			|number| error code|200500 |undefined|
| *status*		|string| status code|argument-is-null |empty string|
| *host*			|string| Hosting application from which the exception is raised | Chrome58.0|undefined|
| *date*			|Date| The time the exception is raised |2020-09-15T13:24:42|new Date()|
| *data*			|object |custom data included with the exception|{ fn: 'John', ln: 'Doe'}|null|
| *stack*			| string |function call stack at the time the exception was raised||Error.captureStackTrace()|
| *stackTrace*	| StackTrace |a helper StackTrace object that simplifies iterating in the stack info||null|
| *innerException*		|Exception|an exception by which current exception is raised | |null|
| *fileName*		|string|name of the javascript source file in which the exception was raised | myapp.js|undefined|
| *lineNumber*	|number |line number in the javascript source file in which the exception was raised|12|undefined|
| *columnNumber*	|number |column number in the javascript source file in which the exception was raised|5|undefined|

### Methods
- toString(separator): converts the exception including with its inner exception into a string separated by given separator (default = \n).
- flatten(): converts he hierarchy of the exception and its inner exceptions into an array.

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

- PropertyReadOnlyException
- AbstractInstantiationException
- NotImplementedException
- ArgumentNullException
- ArgumentEmptyException
- NotInstanceOfException
- InvalidHttpMethodException

## StackTrace
This utility class processes a string stack-trace value and populates a list of `StackTraceItem` objects to facilitate working with a stack-trace information.

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
This utility class processes one line of a stack-trace information and presents it as an object by extracting its details.

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
- throwIfInstantiateAbstract(classType, instance, host)

	checks whether classType is an abstract class and if so, throws a new AbstractInstantiationException()
- throwIfNotInstanceOf(argName, classType, instance, ignoreNull = false, host = '')
	
	checks whether given object is an instance of the specified classType. If not, it throws a new NotInstanceOfException()
- throwIfNull(arg, argName, host)

	checks whether arg is null or not and if so, it throws a new ArgumentNullException().
- throwIfEmpty

	checks whether arg is empty or not and if so, it throws a new ArgumentEmptyException().
- throwNotImplementedException

	throws a new NotImplementedException()
- throwPropertyReadOnlyException

	throws a new PropertyReadOnlyException()
	
## Try/Catch/Finally
### examples
Assume we have the following functions:
```javascript
function f1(a) { return a.length }
function f2(a) { console.log(f1(a)) }
```

The ordinary try/catch approach is this way:
```javascript
	try {
		f2();
	} catch (e) {
		console.log(e);
	} finally {
		console.log('Finished.')
	}
```

Here is various examples of using Try/Catch:

example 1 (basic):
```javascript
 Try(_ => f2())
.Catch(e => console.log(e))
.Finally(_ => console.log('Finished.'))
```

example 2:
```javascript
function f1(a) {
	if (a == null) {
		throw new ArgumentNullException('a');
	}
	
	return a.length
}
function f2(a) { console.log(f1(a)) }

 Try(f1)
.Catch(ArgumentNullException, e => console.log(e.message)
.Catch(e => console.log(`Other exception raised: ${e}`))	// this Catch() is not triggered
.Finally(_ => console.log('Finished.'))
```

example 3: verbose
```javascript
const x = Try(_ => f2());

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

example 4: external catch (not possible using traditional try/catch)

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
