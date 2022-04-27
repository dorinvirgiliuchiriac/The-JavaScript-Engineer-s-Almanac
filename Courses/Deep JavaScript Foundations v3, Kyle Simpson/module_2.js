exports.func2 = function () {
  const { func1 } = require("./module_1");
  return func1();
};
