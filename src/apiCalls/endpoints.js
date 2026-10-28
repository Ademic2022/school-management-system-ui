// Set REACT_APP_API_URL to use another backend (.env.development points it at the local server)
const BASE_URL =
  process.env.REACT_APP_API_URL ||
  "https://school-management-system-alpha.vercel.app";

export const AUTH_ENDPOINTS = {
  LOGIN: `${BASE_URL}/users/login/`,
  LOGOUT: `${BASE_URL}/users/logout/`,
  REGISTER: `${BASE_URL}/auth/users/`,
  ACTIVATION: `${BASE_URL}/auth/users/activation/`
};
export const USER_ENDPOINTS = {
  USER: `${BASE_URL}/users/profiles`,
  UPLOAD_IMAGE: `${BASE_URL}/users/profile-images/`,
  GET_OR_UPDATE_USER: (userId) => `${BASE_URL}/auth/users/${userId}/`,
  PROFILE_IMAGE: (userId) => `${BASE_URL}/users/profile-images/?user=${userId}`,
  PROFILE_IMAGE_UPDATE: (userId) => `${BASE_URL}/users/profile-images/${userId}/`,
  NOTIFICATIONS: (userId) => `${BASE_URL}/users/notifications/?user=${userId}`,
  UPDATE_NOTIFICATION_STATUS: (notificationId) => `${BASE_URL}/users/notifications/${notificationId}/`,
  ACTIVATION: `${BASE_URL}/auth/users/activation/`,
  AUTHENTICATED_USER: `${BASE_URL}/auth/users/me/`,
  RESEND_ACTIVATION: `${BASE_URL}/auth/users/resend_activation/`,
  RESET_PASSWORD: `${BASE_URL}/auth/users/reset_password/`,
  CONFIRM_RESET_PASSWORD: `${BASE_URL}/auth/users/reset_password_confirm/`,
  SET_PASSWORD: `${BASE_URL}/auth/users/set_password/`,
  APROVE_USERS: `${BASE_URL}/users/profile/approve_new_users/`,
}

export const CORE = {
  ADMIN: `${BASE_URL}/core/admin/`,
  CLASSROOM: `${BASE_URL}/core/classrooms/`,
  STUDENT: `${BASE_URL}/core/students`,
  SUBJECT: `${BASE_URL}/core/subjects/`,
  FILTERED_SUBJECT: `${BASE_URL}/core/subjects/?class_room=10`,
  TEACHER: `${BASE_URL}/core/teachers`,
  GET_ASSIGNED_SUBJECTS: `${BASE_URL}/core/teachers/get_assigned_subjects/`,
  GET_ENROLLED_SUBJECTS: `${BASE_URL}/core/students/get_enrolled_subjects/`,
  GET_ADMIN: (adminId) => `${BASE_URL}/auth/users/${adminId}/`,
  GET_CLASSROOM: (classroomId) => `${BASE_URL}/core/classrooms/${classroomId}/`,
  GET_SUBJECT: (subjectId) => `${BASE_URL}/core/subjects/${subjectId}/`,
  GET_FILTERED_SUBJECT: (classroomId) =>
    `${BASE_URL}/core/subjects/?class_room=${classroomId}`,
  GET_STUDENT: (studentId) => `${BASE_URL}/core/students/${studentId}/`,
  GET_TEACHER: (teacherId) => `${BASE_URL}/core/teachers/${teacherId}/`,
  GET_CLASSROOM_STUDENTS: (classroomId) =>
    `${BASE_URL}/core/students/?classroom=${classroomId}`,
  ATTENDANCE: `${BASE_URL}/core/attendance/`,
  BULK_MARK_ATTENDANCE: `${BASE_URL}/core/attendance/bulk_mark/`,
  GET_FILTERED_ATTENDANCE: (classroomId, date) =>
    `${BASE_URL}/core/attendance/?classroom=${classroomId}&date=${date}`,
};
