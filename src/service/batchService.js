import http from "./http";

const apiEndPoint = "/batches";
const apiEndPoint2 = "/departments";

export const getBatches = () => {
  return http.get(apiEndPoint);
};

export const getBatchById = (id) => {
  return http.get(apiEndPoint2 + `/${id}/batches`);
};
