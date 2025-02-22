import { createContext, useContext, useState } from "react";
import { registerStudent } from "../services/studentService";

export interface StudentRegistrationRequest {
  name: string;
  classId: string;
  phoneNumber: string;
  parentsNumber: string;
  email: string;
  alternateEmail?: string; // Optional field
  gender: "Male" | "Female" | "Other"| "";
  school: string;
  gradePercentage: number;
}

interface StudentContextType {
  loading: boolean;
  error: string | null;
  registerStudentInContext: (studentData: StudentRegistrationRequest) => Promise<void>;
}

const StudentContext = createContext<StudentContextType | undefined>(undefined);

export const StudentProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const registerStudentInContext = async (studentData: StudentRegistrationRequest) => {
    setLoading(true);
    setError(null);

    try {
      const response = await registerStudent(studentData);
      console.log(response);

      if (!response.success) {
        // Display the error message from the API
        setError(response.message || "Failed to register student");
      }
    } catch (err: any) {
      // Handle unexpected errors, like network issues
      console.error("Unexpected error:", err);
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <StudentContext.Provider value={{ loading, error, registerStudentInContext }}>
      {children}
    </StudentContext.Provider>
  );
};

export const useStudentContext = () => {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error("useStudentContext must be used within a StudentProvider");
  }
  return context;
};
