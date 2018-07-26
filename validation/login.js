//rules for login
//rules for registration
const validator = require("validator");
//import is an es6 syntax way of basically using require.
//Require:
// You can have dynamic loading where the loaded module name isn't predefined /static, or where you conditionally load a module only if it's "truly required" (depending on certain code flow).
// Loading is synchronous. That means if you have multiple requires, they are loaded and processed one by one.
// ES6 Imports:
// You can use named imports to selectively load only the pieces you need. That can save memory.
// Import can be asynchronous (and in current ES6 Module Loader, it in fact is) and can perform a little better.
//https://stackoverflow.com/questions/31354559/using-node-js-require-vs-es6-import-export
const isEmptyHelper = require("../helpers/is-empty");

//export this function so we can access it from outside this file
module.exports = function validateLoginInput(data) {
  let errors = {};

  //first test if name isEmpty from our custom helper. if it is, set it to empty string so validator can check it against its different cases.
  data.email = !isEmptyHelper(data.email) ? data.email : "";
  data.password = !isEmptyHelper(data.password) ? data.password : "";


  if (validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }


  return {
    errors,
    isValid: isEmptyHelper(errors)
  };
};