import http from "./http";

const apiEndPoint = "/teacherInfos";

export const getTeachers = () => {
  return http.get(apiEndPoint);
};

export const addTeacher = async (
  _id,
  name,
  courseTitle,
  courseNo,
  email,
  phoneNumber,
  batchId
) => {
  if (_id) {
    return http.put(apiEndPoint + `/${_id}`, {
      name,
      courseTitle,
      courseNo,
      email,
      phoneNumber,
      batchId,
    });
  }

  return await http.post(apiEndPoint, {
    name,
    courseTitle,
    courseNo,
    email,
    phoneNumber,
    batchId,
  });
};

export function deleteTeacher(id) {
  return http.delete(apiEndPoint + `/${id}`);
}

export function getTeacherById(id) {
  return http.get(apiEndPoint + `/${id}`);
}
