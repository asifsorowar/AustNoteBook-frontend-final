import http from "./http";

const apiEndPoint = "/notes";

export function getNotes() {
  return http.get(apiEndPoint);
}

export function saveNote(_id, name, semester, url, courseId) {
  if (_id) {
    return http.put(apiEndPoint + `/${_id}`, { name, semester, url });
  }

  return http.post(apiEndPoint, { name, semester, url, courseId });
}

export function deleteNote(id) {
  return http.delete(apiEndPoint + `/${id}`);
}

export function getNoteById(id) {
  return http.get(apiEndPoint + `/${id}`);
}
