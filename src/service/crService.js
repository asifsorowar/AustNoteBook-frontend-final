import http from "./http";

const apiEndPoint = "/crInfos";

export const getCrs = () => {
  return http.get(apiEndPoint);
};

export const addCr = async (
  _id,
  name,
  section,
  group,
  varsityId,
  phoneNumber,
  batchId
) => {
  if (_id) {
    return http.put(apiEndPoint + `/${_id}`, {
      name,
      section,
      group,
      varsityId,
      phoneNumber,
      batchId,
    });
  }

  return await http.post(apiEndPoint, {
    name,
    section,
    group,
    varsityId,
    phoneNumber,
    batchId,
  });
};

export function deleteCr(id) {
  return http.delete(apiEndPoint + `/${id}`);
}

export function getCrById(id) {
  return http.get(apiEndPoint + `/${id}`);
}
