import api from "../utils/api";
import { StudentRegistrationRequest } from "../context/StudentContext";

// Fetch students
export const fetchStudents = async () => {
  try {
    const response = await api.get("/students");
    return response.data;
  } catch (error: any) {
    console.error("Fetch students error:", error);
    return { success: false, message: error.message || "Failed to fetch students" };
  }
};

// Register student
export const registerStudent = async (studentData: StudentRegistrationRequest) => {
  try {
    const response:any = await api.post("/auth/student-registration", studentData);
    return { success: response.success, message: response.message, data: response.data };
  } catch (error: any) {
    console.error("Register student error:", error);
    const errorMessage = error?.response?.data?.message || "Failed to register student";
    return { success: false, message: errorMessage };
  }
};
