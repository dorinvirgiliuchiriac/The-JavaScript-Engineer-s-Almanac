/**
 * Deep JavaScript Foundations v3, Kyle Simpson
 * https://frontendmasters.com/courses/deep-javascript-v3/
 */

/////////////
/// Types ///
/////////////

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
   * Use "new" with Date, RegExp, Error, etc, but don't use "new" with String,
   * Number, Boolean, because we usually need the primitive, not the object
   * equivalent.
   *
   * See "new keyword" test suit to see how to recreate the behaviour for String
   * that makes it work with and without new.
   */

  expect(typeof new String(123)).toEqual("object");
  expect(typeof String(123)).toEqual("string");

  expect(typeof new Date(123)).toEqual("object");
  expect(typeof Date(123)).toEqual("string");
});

////////////////
/// Coercion ///
////////////////

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
   * Many experts say not to care about the types and coersion and skip it from
   * learning, because we can work without using it. WRONG! We are using all the
   * time, even if we don't know it explicitally.
   */

  const number = 21;
  const bool = false;
  expect(`value: ${number}`).toEqual("value: 21");
  expect(`value: ${bool}`).toEqual("value: false");

  expect(23 - "34").toBe(-11);
  expect(23 + "34").toBe("2334");
  expect(23 + Number("34")).toBe(57);

  /**
   * The coersion is recursive, meaning that it will try to coerse the values
   * till will get a result, or will rais an error because of type incompatibilities.
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
   *   === doesn't allow coersion and will return false if the compared values
   *   have different types.
   *
   * [images/abstract-equality.jpg] (Documentation of ==)
   * Note here that the first operation is checking if the values are the same
   * type and if they are, return the result of performing ===.
   * Also, the coersion will try to convert the values to numbers and repeat the
   * process recursivly till it gets to the final answer.
   *
   * [images/strict-equality.jpg] (Documentation of ===)
   * Note here that the NaN and 0, -0 values are made artificially to be equal
   * or not.
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

/////////////
/// Scope ///
/////////////

// here

///////////////
/// Objects ///
///////////////

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
