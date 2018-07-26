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
module.exports = function validateRegisterInput(data) {
  let errors = {};

  //first test if name isEmpty from our custom helper. if it is, set it to empty string so validator can check it against its different cases.
  data.name = !isEmptyHelper(data.name) ? data.name : "";
  data.email = !isEmptyHelper(data.email) ? data.email : "";
  data.password = !isEmptyHelper(data.password) ? data.password : "";
  data.passwordConfirm = !isEmptyHelper(data.passwordConfirm) ?
    data.passwordConfirm :
    "";

  if (!validator.isLength(data.name, {
      min: 2,
      max: 30
    })) {
    errors.name = "Name must be between 2 and 30 characters";
  }
  //then test name with validators isEmpty. (not sure why I have to use validators if my custom one should do the trick.)
  if (validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  if (validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  } else if (!validator.isLength(data.password, {
      min: 6,
      max: 30
    })) {
    errors.password = "Password must be at least 6 characters";
  }

  if (validator.isEmpty(data.passwordConfirm)) {
    errors.passwordConfirm = "Password Confirmation field is required";
  } else if (!validator.equals(data.password, data.passwordConfirm)) {
    errors.passwordConfirm = "Passwords do not match!";
  }
  //check if email is in correct format. I want to see if I can validate if the email already exists from here
  //   if(!validator.isEmail){
  //       errors.email = ''
  //   }

  return {
    errors,
    isValid: isEmptyHelper(errors)
  };
};