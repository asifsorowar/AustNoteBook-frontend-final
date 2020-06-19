import http from "./http";

const apiEndPoint = "/departments";

export const getDepartments = () => {
  return http.get(apiEndPoint);
};
