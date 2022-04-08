/**
 * Deep JavaScript Foundations v3, Kyle Simpson
 * https://frontendmasters.com/courses/deep-javascript-v3/
 */

////////////////
/// 1. Types ///
////////////////

test("typeof operator", () => {
  /**
   * typeof operator will always return a string. Functions are
   * callable objects. Null returns the string "object" and is a bug,
   * it should have been the string "null"; a fix was suggested, didn't
   * pass throug because it might have broken a lot of code.
   */

  expect(typeof undefined).toEqual("undefined");
  expect(typeof null).toEqual("object");
  expect(typeof new Object()).toEqual("object");
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

test("undefined vs undeclared vs uninitialized (tdz)", () => {
  /**
   * "undefined" > the variable is declared and no value was given to it yet.
   * Because of hoisting (2 passes of the JavaScript file), all variables are
   * initialized with undefined (var, let, const); Let and const live in TDZ
   * before the execution passes them.
   *
   * "undeclared" > the variable was not declared and it doesn't exist in the
   * scope hierarchy.
   *
   * "uninitialized" > the variable is declared but the execution thread didn't
   * reach the line they were declared on yet. We get TDZ (temporaly dead zone) error
   * for let and const if we try to access them befor the execution passes the line
   * they were defined on;
   */

  expect(typeof undeclared_variable).toEqual("undefined");
});

////////////////
/// 2. Scope ///
////////////////

//////////////////
/// 3. Objects ///
//////////////////
