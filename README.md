# locustjs-exception
This library provides a base Exception class and a TryCatch utlity class with three Try(), Catch() and Finally() functions.

## Exception class
Exception class is the base class of all excetions.

### constructor
	Exception(settings)
		settings: an Exception, Error or custom object.
example

```javascript
	const ex = new Exception({
		message: 'calling web api failed',
		code: 100324,
		status: 'call-api-failed',
		data: { url: '/api/v1/product', method: 'POST' data: { id: 1, title: 'Product II' } }
	});
```

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

### Derived classes

- PropertyReadOnlyException
- AbstractInstantiationException
- NotImplementedException
- ArgumentNullException
- ArgumentEmptyException
- NotInstanceOfException
- InvalidHttpMethodException

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
