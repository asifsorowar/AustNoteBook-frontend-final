import http from "./http";

const apiEndPoint = "/courses";

export const getCourses = () => {
  return http.get(apiEndPoint);
};

export const getCourseById = (id) => {
  return http.get(apiEndPoint + `/${id}`);
};

export const addCourse = (courseTitle, courseNo, batchId) => {
  return http.post(apiEndPoint, {
    courseTitle,
    courseNo,
    batchId,
  });
};

export function deleteCourse(id) {
  return http.delete(apiEndPoint + `/${id}`);
}
