import axios from "axios";
import { loginForm } from "../schema/login.schema";
import { signupForm } from "../schema/signup.schema";

export async function signup(values: signupForm) {
  const options = {
    url: "https://brands-system-production-c110.up.railway.app/api/Auth/register",
    method: "POST",
    data: values,
  };
  const { data } = await axios.request(options);

  return data;
}

export async function signin(values: loginForm) {
  const options = {
    url: "https://brands-system-production-c110.up.railway.app/api/Auth/login",
    method: "POST",
    data: values,
  };
  const { data } = await axios.request(options);
  return data;
}
