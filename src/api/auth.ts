import axios from "axios";

export function login(username: string, password: string) {
  return axios.post(
    "http://127.0.0.1:5679/login",
    { username, password },
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    },
  );
}
