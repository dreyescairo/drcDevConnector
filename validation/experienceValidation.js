//rules for login
//rules for registration
const validator = require("validator");

const isEmptyHelper = require("../helpers/is-empty");

//export this function so we can access it from outside this file
module.exports = function validateExperienceInput(data) {
  let errors = {};

  //first test if name isEmpty from our custom helper. if it is, set it to empty string so validator can check it against its different cases.
  data.title = !isEmptyHelper(data.title) ? data.title : "";
  data.company = !isEmptyHelper(data.company) ? data.company : "";
  data.from = !isEmptyHelper(data.from) ? data.from : "";



  if (validator.isEmpty(data.title)) {
    errors.title = "Job title field is required";
  }


  if (validator.isEmpty(data.company)) {
    errors.company = "company field is required";
  }

  if (validator.isEmpty(data.from)) {
    errors.from = "From date field is required";
  }



  return {
    errors,
    isValid: isEmptyHelper(errors)
  };
};