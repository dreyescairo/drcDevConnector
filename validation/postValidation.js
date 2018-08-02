const validator = require("validator");

const isEmptyHelper = require("../helpers/is-empty");

//export this function so we can access it from outside this file
module.exports = function validatePostInput(data) {
  let errors = {};

  //first test if text isEmpty from our custom helper. if it is, set it to empty string so validator can check it against its different cases.
  data.text = !isEmptyHelper(data.text) ? data.text : "";


  if (validator.isEmpty(data.text)) {
    errors.text = "Text field is required";
  } else if (!validator.isLength(data.text, {
      min: 10,
      max: 300
    })) {
    errors.text = "Post must be between 30 and 300 characters.";
  }




  return {
    errors,
    isValid: isEmptyHelper(errors)
  };
};