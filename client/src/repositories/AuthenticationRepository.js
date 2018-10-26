import axios from "axios";

export class AuthenticationRepository {
  constructor() {}

  async getData() {
    let resp = "";
    const response = await axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then(res => (resp = res.data))
      .catch(err => console.log(err.response.data));

    return resp;
  }

  //TRY AND  IMPLEMENT THE REPOSITORY PATTERN!!!
}
