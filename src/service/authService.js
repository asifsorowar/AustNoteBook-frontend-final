import http from "./http";
import jwt from "jsonwebtoken";

const apiEndPoint = "/auth";
const tokenKey = "token";

export async function login(email, password) {
  const { data: JwtToken } = await http.post(apiEndPoint + "/login", {
    email,
    password,
  });
  localStorage.setItem(tokenKey, JwtToken);
}

export async function logout() {
  await http.get(apiEndPoint + "/logout");
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const token = localStorage.getItem(tokenKey);
    return jwt.decode(token);
  } catch (error) {
    return null;
  }
}

http.setJwt(getJwt());

export function getJwt() {
  return localStorage.getItem(tokenKey);
}
