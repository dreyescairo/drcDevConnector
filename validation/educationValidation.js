//rules for login
//rules for registration
const validator = require("validator");

const isEmptyHelper = require("../helpers/is-empty");

//export this function so we can access it fieldOfStudy outside this file
module.exports = function validateExperienceInput(data) {
  let errors = {};

  //first test if name isEmpty from our custom helper. if it is, set it to empty string so validator can check it against its different cases.
  data.school = !isEmptyHelper(data.school) ? data.school : "";
  data.degree = !isEmptyHelper(data.degree) ? data.degree : "";
  data.fieldOfStudy = !isEmptyHelper(data.fieldOfStudy) ? data.fieldOfStudy : "";
  data.from = !isEmptyHelper(data.from) ? data.from : "";



  if (validator.isEmpty(data.school)) {
    errors.school = "Job school field is required";
  }


  if (validator.isEmpty(data.degree)) {
    errors.degree = "degree field is required";
  }

  if (validator.isEmpty(data.fieldOfStudy)) {
    errors.fieldOfStudy = "Field of Study is required";
  }



  if (validator.isEmpty(data.from)) {
    errors.from = "From date is required";
  }



  return {
    errors,
    isValid: isEmptyHelper(errors)
  };
};