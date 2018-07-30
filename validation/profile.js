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
module.exports = function validateProfileInput(data) {
  let errors = {};

  //first test if name isEmpty from our custom helper. if it is, set it to empty string so validator can check it against its different cases.
  data.handle = !isEmptyHelper(data.handle) ? data.handle : "";
  data.status = !isEmptyHelper(data.status) ? data.status : "";
  data.skills = !isEmptyHelper(data.skills) ? data.skills : "";


  if (!validator.isLength(data.handle, {
      min: 2,
      max: 40
    })) {
    errors.handle = 'Handle needs to be between 2 and 4 characters';
  }


  if (validator.isEmpty(data.handle)) {
    errors.handle = 'Profile handle is required';
  }


  if (validator.isEmpty(data.status)) {
    errors.status = 'Status field is required';
  }

  if (validator.isEmpty(data.skills)) {
    errors.skills = 'Skills field is required';
  }

  if (!isEmptyHelper(data.website)) {
    if (!validator.isURL(data.website)) {
      errors.website = 'Not a valid URL';
    }
  }

  if (!isEmptyHelper(data.youtube)) {
    if (!validator.isURL(data.youtube)) {
      errors.youtube = 'Not a valid URL';
    }
  }

  if (!isEmptyHelper(data.twitter)) {
    if (!validator.isURL(data.twitter)) {
      errors.twitter = 'Not a valid URL';
    }
  }

  if (!isEmptyHelper(data.facebook)) {
    if (!validator.isURL(data.facebook)) {
      errors.facebook = 'Not a valid URL';
    }
  }

  if (!isEmptyHelper(data.linkedin)) {
    if (!validator.isURL(data.linkedin)) {
      errors.linkedin = 'Not a valid URL';
    }
  }

  if (!isEmptyHelper(data.instagram)) {
    if (!validator.isURL(data.instagram)) {
      errors.instagram = 'Not a valid URL';
    }
  }


  return {
    errors,
    isValid: isEmptyHelper(errors)
  };
};