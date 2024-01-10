import { CORE } from "./endpoints";
import axios from "axios";

// ======================= AXIOS REQUEST HANDLER ======================= //
const axiosInstance = axios.create({
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    // Authorization: `Token ${localStorage.getItem('token')}`,
  },
});

const requestHandler = async (method, url, data = null, params = null) => {
  try {
    const config = {
      method,
      url,
      params,
    };

    if (method.toLowerCase() === "post" && data instanceof FormData) {
      // For file uploads, use FormData
      config.data = data;
      config.headers = {
        "Content-Type": "multipart/form-data",
        ...(localStorage.getItem("token") && {
          Authorization: `Token ${localStorage.getItem("token")}`,
        }),
      };
    } else {
      // For other requests, use JSON data
      config.data =
        method.toLowerCase() === "post" ? JSON.stringify(data) : data;
      config.headers = {
        ...config.headers,
        ...(localStorage.getItem("token") && {
          Authorization: `Token ${localStorage.getItem("token")}`,
        }),
      };
    }

    const response = await axiosInstance(config);

    return response.data;
  } catch (error) {
    console.error("Request failed:", error.message);
    throw error;
  }
};

export default requestHandler;

export const fetchSubjects = async (setSubject) => {
  /*
        The 'fetchSubjects' function is a utility function for fetching and updating the subjects based on
        the user's role. It uses the 'getRole' to determine whether the user is a student or teacher and
        then calls the corresponding subject-fetching function. The fetched subjects are updated using
        the 'setSubject' callback.
    */
  try {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const getRole = userData ? userData.role : null;
    if (getRole === "Student") {
      const enrolledSubjects = await requestHandler(
        "get",
        CORE.GET_ENROLLED_SUBJECTS
      );
      setSubject(enrolledSubjects);
    } else if (getRole === "Teacher") {
      const assignedSubjects = await requestHandler(
        "get",
        CORE.GET_ASSIGNED_SUBJECTS
      );
      setSubject(assignedSubjects);
    }
  } catch (error) {
    console.error("Error fetching enrolled subjects:");
  }
};