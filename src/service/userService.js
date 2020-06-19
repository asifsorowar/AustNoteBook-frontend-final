import http from "./http";

const apiEndPoint = "/users";
const tokenKey = "token";

export const registration = async ({
  firstName,
  lastName,
  varsityId,
  departmentId,
  batchId,
  email,
  password,
}) => {
  const { headers } = await http.post(apiEndPoint, {
    firstName,
    lastName,
    varsityId,
    departmentId,
    batchId,
    email,
    password,
  });

  localStorage.setItem(tokenKey, headers["x-auth-token"]);
};

export const getProfile = () => {
  return http.get(apiEndPoint + "/me");
};

export const addProfilePicture = (file) => {
  const formData = new FormData();
  formData.append("file", file);

  return http.put(apiEndPoint + "/me/photo", formData);
};
