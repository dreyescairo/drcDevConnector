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
const isEmpty = require("../helpers/is-empty");

//export this function so we can access it from outside this file
module.exports = function validateRegisterInput(data) {
  let errors = {};

  if (!validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 and 30 characters";
  }
  //check if email is in correct format. I want to see if I can validate if the email already exists from here
  //   if(!validator.isEmail){
  //       errors.email = ''
  //   }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
