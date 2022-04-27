/**
 * Deep JavaScript Foundations v3, Kyle Simpson
 * https://frontendmasters.com/courses/deep-javascript-v3/
 */

jest.useFakeTimers();

describe("Types", () => {
  test("typeof operator", () => {
    /**
     * typeof operator will always return a string.
     *
     * Functions are callable objects, and have their own type.
     *
     * Arrays are objects, but don't have their own type. They should have
     * been treated the same way as functions. To know if a value is an
     * array, we should use Array.isArray(x).
     *
     * Null returns the string "object" and is a bug, it should have been
     * the string "null"; a fix was suggested, didn't pass throug because
     * it could have broken a lot of code. It is "object", because null
     * is a values used when we deal with objects, is a undefined object.
     */

    expect(typeof undefined).toEqual("undefined");
    expect(typeof null).toEqual("object");
    expect(typeof {}).toEqual("object");
    expect(typeof []).toEqual("object");
    expect(Array.isArray([])).toBeTruthy();
    expect(typeof function func() {}).toEqual("function");
    expect(typeof "string").toEqual("string");
    expect(typeof true).toEqual("boolean");
    expect(typeof 5).toEqual("number");
    expect(typeof BigInt(5)).toEqual("bigint");
    expect(typeof Symbol("symbol")).toEqual("symbol");

    /**
     * We don't have array type, but there is Array.isArray([]) for that.
     */

    expect(typeof [1, 2, 3]).toEqual("object");
    expect(Array.isArray([1, 2, 3])).toEqual(true);
  });

  test("BigInt", () => {
    /**
     * BigInt allows us to have a number as big as the space of the machine
     * allows it. It is not supported in all browsers. It cannot be used
     * in operations with numbers, only other BigInts.
     */

    expect(BigInt(2) + BigInt(3)).toEqual(BigInt(5));
    expect(2n + 3n).toEqual(5n);
  });

  test("NaN, isNaN(x) & Number.IsNaN(x)", () => {
    /**
     * NaN = not a number, according to the IEEE 754 floating point number
     * representation, and the mental model should be that it is the result
     * of an invalid arithmetic operation (eg. "abc" / "xyz");
     *
     * NaN is the only value that is not equal to itself and the only ways to
     * know if the value is NaN is via isNaN() and Number.isNaN() functions.
     */

    expect(NaN == NaN).toBeFalsy();

    /**
     * isNaN(x) will return true if using that value in an arithmetic operation
     * will return the NaN value by trying to coerce the value to a number. If
     * it can, it will return false.
     */

    expect(isNaN(NaN)).toBeTruthy();
    expect(isNaN("string")).toBeTruthy();
    expect(isNaN({})).toBeTruthy();
    expect(isNaN("32")).toBeFalsy();
    expect(isNaN(32)).toBeFalsy();
    expect(isNaN(true)).toBeFalsy();

    /**
     * Number.isNaN(x) will return true only if the NaN value is passed to it.
     */
    expect(Number.isNaN(NaN)).toBeTruthy();
    expect(Number.isNaN("string")).toBeFalsy();
    expect(Number.isNaN({})).toBeFalsy();
  });

  test("undefined vs undeclared vs uninitialized (tdz)", () => {
    /**
     * "undefined" > the variable is declared and no value was given to it
     * yet. Because of hoisting (2 passes of the JavaScript file), all
     * variables are initialized with undefined (var, let, const); Let and
     * const live in TDZ before the execution passes them.
     *
     * "undeclared" > the variable was not declared and it doesn't exist in
     * the scope hierarchy.
     *
     * "uninitialized" > the variable is declared but the execution thread
     * didn't reach the line they were declared on yet. We get TDZ (temporaly
     * dead zone) error for let and const if we try to access them befor the
     * execution passes the line they were defined on;
     */

    expect(typeof undeclared_variable).toEqual("undefined");
  });

  test("Fundamental objects", () => {
    /**
     * Use "new" with Date, RegExp, Error, etc, but don't use "new" with
     * String, Number, Boolean, because we usually need the primitive, not
     * the object equivalent.
     *
     * See "new keyword" test suit to see how to recreate the behaviour for
     * String that makes it work with and without new.
     */

    expect(typeof new String(123)).toEqual("object");
    expect(typeof String(123)).toEqual("string");

    expect(typeof new Date(123)).toEqual("object");
    expect(typeof Date(123)).toEqual("string");
  });
});

describe("Coercion", () => {
  test("String()", () => {
    expect(String(null)).toBe("null");
    expect(String(undefined)).toBe("undefined");
    expect(String(true)).toBe("true");
    expect(String(false)).toBe("false");
    expect(String(-23)).toBe("-23");
    expect(String({ x: 12 })).toBe("[object Object]");
    expect(
      String({
        toString() {
          return "this is a string";
        },
      })
    ).toBe("this is a string");
    expect(String([1, 2, 3])).toBe("1,2,3");
    expect(String([[1, 2, [3]], undefined, null, [{}]])).toBe(
      "1,2,3,,,[object Object]"
    );
  });

  test("Boolean()", () => {
    /**
     * Falsy values: false, "", 0, null, undefined, NaN;
     * Truthy values: true, "str", 23, -23, [], {}, function(){}, ...;
     */

    expect(false || "" || 0 || null || undefined || NaN).toBeFalsy();
    expect(true && "str" && 23 && [] && {} && function () {}).toBeTruthy();
  });

  test("Number()", () => {
    expect(Number("")).toBe(0);
    expect(Number("0009")).toBe(9);
    expect(Number("3.14")).toBe(3.14);
    expect(Number(false)).toBe(0);
    expect(Number(true)).toBe(1);
    expect(Number(null)).toBe(0);
    expect(Number(undefined)).toBe(NaN);
    expect(Number("abc")).toBe(NaN);
  });

  test("Boxing", () => {
    /**
     * The statement "in JavaScript everything is an object" is false.
     * We have primitives and objects. When we call an object method
     * on a primitive, it is wrapped in a corresponding object and then,
     * that method is called. This is called "BOXING". Boxing is automatic
     * coersion.
     */

    expect("string".toUpperCase()).toEqual("STRING");
    expect(true.toString()).toEqual("true");
    expect((5).toString()).toEqual("5");
  });

  test("Importance of coersion", () => {
    /**
     * Many experts say not to care about the types and coersion and skip it
     * from learning, because we can work without using it. WRONG! We are
     * using all the time, even if we don't know it explicitally.
     */

    const number = 21;
    const bool = false;
    expect(`value: ${number}`).toEqual("value: 21");
    expect(`value: ${bool}`).toEqual("value: false");

    expect(23 - "34").toBe(-11);
    expect(23 + "34").toBe("2334");
    expect(23 + Number("34")).toBe(57);

    /**
     * The coersion is recursive, meaning that it will try to coerse the
     * values till will get a result, or will rais an error because of type
     * incompatibilities.
     *
     * 1 < 2       true
     * 2 < 3       true
     * ----------------
     * 1 < 2 < 3   true
     * ----------------
     * (1 < 2) < 3
     * true < 3
     * 1 < 3
     *
     * 3 > 2       true
     * 2 > 1       true
     * -----------------
     * 3 > 2 > 1   false
     * -----------------
     * (3 > 2) > 1
     * true > 1
     * 1 > 1
     */

    expect(1 < 2 < 3).toBeTruthy();
    expect(3 > 2 > 1).toBeFalsy();
  });

  test("Equality", () => {
    /**
     * Wrong statement:
     *   == checks only value (loos)
     *   === checks the value and the type (strict)
     *
     * Correct statement:
     *   == allows coersion and if they are the same type, will perform ===
     *   === doesn't allow coersion and will return false if the compared
     *   values have different types.
     *
     * [abstract-equality.jpg] (Documentation of ==)
     * Note here that the first operation is checking if the values are the
     * same type and if they are, return the result of performing ===.
     * Also, the coersion will try to convert the values to numbers and
     * repeat the process recursivly till it gets to the final answer.
     *
     * [strict-equality.jpg] (Documentation of ===)
     * Note here that the NaN and 0, -0 values are made artificially to be
     * equal or not.
     */

    expect(23 == "23").toBeTruthy();
    expect(23 === "23").toBeFalsy();

    /**
     * true == "1"
     * Number(true) == "1"
     * 1 == "1"
     * 1 == Number("1")
     * 1 == 1
     * true
     */
    expect(true == "1").toBeTruthy();

    /**
     * Objects are equal only if they have the same reference in memory
     */
    const a = { a: 1 };
    const b = a;
    const c = { a: 1 };

    expect(a == b).toBeTruthy();
    expect(a === b).toBeTruthy();
    expect(b == c).toBeFalsy();
  });
});

describe("Lexical Scope", () => {
  /**
   * JavaScript is generally considered an interpreted language, but it is
   * actually compiled by various engines, eg. V8 Engine (Chrome, NodeJS),
   * Spider Monkey (Firefox), JavaScriptCore (Safari), etc.
   *
   * It is compiled, because the engine needs to pass the javascript codebase
   * 2 time in order to complete an instruction. Proof of this is also that
   * we get syntax errors before the code is executed;
   */

  test("First pass: Compilation", () => {
    /**
     * Step 1 - Compilation:
     *   - at this step, the code is parsed top to bottom once for defining
     *   the lexical scopes and the result of this step is a blueprint used
     *   later by the engine to interogate the scope manager for the values
     *   of the needed variables. No code is executed at this step.
     *   - whenever the parser finds a variable declaration (var, let, const,
     *   function), it adds it's name to the current parent scope and
     *   initializez it with undefined (hoisting). Also, it saves the position
     *   it was fond on, so that it can rais a TDZ error at the execution step,
     *   if that's the case. Functions are initialized with their declared
     *   function body, not undefined, as their value.
     *   - whenever a function is declared, a new scope is created and the
     *   direct child variables declared in the function body will be attached
     *   to that scope. [REF: 1] If a function is declared inside a block scope, the name
     *   will be added to the first parent function scope, but the function body
     *   will first be made available only to the block scope, and only after the
     *   execution thread passes that block scope, the function body will be made
     *   available to the parent function body also.
     *   - in case of the block scopes, a scope will be created only if a value
     *   is declared inside of it.
     *   - only let and const will get attached to the parent block scope, var
     *   and function will be attached to the first function body.
     *
     * [nested-scopes.jpg] (Visual representation of lexical scopes)
     */

    expect(x1).toBe(undefined);
    var x1 = "x1";
    expect(x1).toBe("x1");

    expect(x2).toBe(undefined);
    // expect(x3)... throws a reference error, meaning that it is not in our scope
    {
      var x2 = "x2";

      // expect(x3)... throws TDZ error
      let x3 = "x3";
      expect(x3).toBe("x3");
    }
    expect(x2).toBe("x2");

    const array1 = [];
    for (var i = 0; i < 3; i++) {
      setTimeout(() => {
        array1.push(i);
      }, 0);
    }
    jest.runAllTimers();
    expect(array1).toEqual([3, 3, 3]);

    const array2 = [];
    // i is added to the block scope of the for loop
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        array2.push(i);
      }, 0);
    }
    jest.runAllTimers();
    expect(array2).toEqual([0, 1, 2]);

    // [REF: 1]
    (function () {
      expect(print1).toBe(undefined);
      expect(print2).toBe(undefined);
      expect(typeof print3).toBe("function");

      if (true) {
        expect(typeof print1).toBe("function");

        function print1() {}
      } else {
        function print2() {}
      }

      function print3() {}

      expect(typeof print1).toBe("function");
      expect(print2).toBe(undefined);
    })();
  });

  test("Second pass: Execution", () => {
    /**
     * Step 2 - Execution:
     *   - at this step, the code is execute top to bottom once. The JavaScript
     *   Engine communicates with the scope manager on 2 actions: value retrieval
     *   and value assignation.
     *   - if the scope manager doesn't find a variable in the current scope, it
     *   will search recursively all parent scopes till it reaches the global
     *   scope. In that case, if it was about value retrievel, will rais a
     *   reference error, but if it was about value assignation and we are not in
     *   strict mode, it will create a global variable with that access name and
     *   asign that value to it. But in strict mode the assignation to a non
     *   existing variable will rais an error.
     *   - if there are 2 variables declared with var, with the same name, they
     *   will be treated as the same. If the variables are defined with let or
     *   const, an error will be raised.
     */

    var x = 1;
    var y = 2;
    (function () {
      var x = 2;
      y = 3;
      z = 12;
      expect(x).toBe(2);
      expect(y).toBe(3);
      expect(global.z).toBe(12);
    })();
    expect(x).toBe(1);
    expect(y).toBe(3);
    expect(global.z).toBe(12);

    var a = 1;
    var a = 2;
    expect(a).toBe(2);
  });

  test("Closure", () => {
    /**
     * Closure is when a function accesses its original lexical scope when it
     * is executed outside that lexical scope. Closure is only when these two
     * conditions are met.
     *
     * Closure helps up keep variables private to the outside world so that we
     * have the ability to change those variables only from within the functions,
     * that make the object of closuer, because they are the only one able to
     * access that scope.
     *
     * Garbage collector will delete a scope only when there are no more
     * references to that scope.
     *
     * Module pattern is a way for us to hide functionality from the outer scope
     * so that we can encapsulate functionality that is private. We should use
     * the module pattern only when we need to hide functionality or properties,
     * otherways we should simply create a name space
     */

    // Singleton Module pattern
    const funcWithClosure = (function getFuncWithClosure() {
      let value = 0;
      return function funcWithClosure() {
        value++;
        return value;
      };
    })();

    expect(funcWithClosure()).toEqual(1);
    expect(funcWithClosure()).toEqual(2);

    // Module Factory pattern
    function getFuncWithClosureModule(initialValue) {
      let value = initialValue;
      return function funcWithClosure() {
        value++;
        return value;
      };
    }
    const funcWithClosure2 = getFuncWithClosureModule(10);

    expect(funcWithClosure2()).toEqual(11);
    expect(funcWithClosure2()).toEqual(12);

    // this is not Module Pattern, because we can access obj.value
    const obj = {
      value: 0,
      funcWithClosure: function () {
        this.value++;
        return this.value;
      },
    };

    expect(obj.funcWithClosure()).toEqual(1);
    expect(obj.value).toEqual(1);
  });

  test("Import/Export & Require", () => {
    /**
     * Import/Export & Require
     *
     * Both approaches help us create modules out of files automatically. The
     * content of the file is wrapped in a singleton module pattern function,
     * the same way we've seen previously and it returns the exports object.
     *
     * If we require or import the same file multiple times, the exports object
     * is cached and reused. It is a singleton.
     *
     * Modern browsers support the use of modules but still, it is better to
     * bundle the code with the help of Webpack and Babel.
     *
     * Require works out of the box with node, because is's part of CommonJS,
     * but import/export need a more specific setup, being part of ES6 now.
     *
     * Require loads resourses synchronous (step by step) and can import them
     * later in the program and imports the entire module. Import/Export is
     * asynchronous, so it's faster, it loads from the module only what is used,
     * but it is loaded entierly at the beginning, and cannot load new modules
     * later in the program execution.
     */

    const { func1 } = require("./module_1");
    const { func2 } = require("./module_2");
    expect(func1()).toEqual(1);
    expect(func2()).toEqual(2);
  });
});

describe("Objects", () => {
  /**
   * JavaScript makes use of 2 types of scopes:
   *   - Lexical Scopes: created at the parsing step, and cannot be changed
   *   at the execution time.
   *   - Dynamic Scopes: created at the execution time and can be changed
   *   during the execution of the JavaScript codebase and they are referenced
   *   by the 'this' keyword.
   */

  test("new keyword", () => {
    /**
     *
     */

    function Str(value) {
      this.value = `${value}`;
      return this.value;
    }

    const str1 = new Str(32);
    const str2 = Str(32);

    expect(typeof str1).toEqual("object");
    expect(str1.value).toBe("32");
    expect(str2).toBe("32");

    function Person(name, age, withReturn) {
      this.name = name;

      if (withReturn) {
        return { age };
      }
    }

    const person1 = new Person("abc", 32);
    const person2 = new Person("abc", 32, true);

    expect(person1.name).toEqual("abc");
    expect(person1.age).toBeFalsy();

    expect(person2.name).toBeFalsy();
    expect(person2.age).toEqual(32);
  });

  test("Prototype", () => {
    function Animal(name) {
      this.name = name;
    }
    Animal.prototype.getName = function () {
      return this.name;
    };

    const animal = new Animal("Dog");
    expect(animal.getName()).toEqual("Dog");

    function Human(name, age) {
      this.age = age;
      Animal.call(this, name);
    }
    Human.prototype = Object.create(Animal.prototype);
    Human.prototype.getAge = function () {
      return this.age;
    };
    Human.prototype.getName = function () {
      return (
        this.__proto__.__proto__.getName.call(this) +
        " " +
        this.__proto__.getAge.call(this)
      );
    };

    const human = new Human("Human", 12);
    expect(human.getName()).toEqual("Human 12");
  });
});
