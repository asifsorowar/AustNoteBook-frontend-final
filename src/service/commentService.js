import http from "./http";

const apiEndPoint = "/courses";

export const getCommentsByCourse = (courseId, path) => {
  return http.get(apiEndPoint + `/${courseId}/comments?path=${path}`);
};

export const postComment = (courseId, comment, path) => {
  return http.post(apiEndPoint + `/${courseId}/comments`, { comment, path });
};

export const deleteComment = (courseId, id) => {
  return http.delete(apiEndPoint + `/${courseId}/comments/${id}`);
};
