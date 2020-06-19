import http from "./http";

const apiEndPoint = "/questions";

export function getQuestions() {
  return http.get(apiEndPoint);
}

export function saveQuestion(_id, name, semester, url, courseId) {
  if (_id) {
    return http.put(apiEndPoint + `/${_id}`, { name, semester, url });
  }

  return http.post(apiEndPoint, { name, semester, url, courseId });
}

export function deleteQuestion(id) {
  return http.delete(apiEndPoint + `/${id}`);
}

export function getQuestionById(id) {
  return http.get(apiEndPoint + `/${id}`);
}
