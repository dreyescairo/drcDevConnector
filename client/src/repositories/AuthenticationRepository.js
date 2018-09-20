import axios from "axios";
import { resolve } from "dns";
//TRY AND  IMPLEMENT THE REPOSITORY PATTERN!!!
let userRepository = () => {
  let registerUser = newUser => {
    return new Promise((resolve, reject) => {
      axios
        .post("/api/users/register", newUser)
        .then(res => console.log(res.data))
        .catch(err => console.log(err.response.data));

      //resolve(res.data)
      //reject(err.response.data);
    });
  };
};
