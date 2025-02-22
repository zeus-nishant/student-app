import React, { createContext, useState, useEffect, useContext } from "react";
import { getClassList } from "../services/classService"; // Ensure correct import

// Define the shape of the class data
interface Class {
  classId: string;
  class: string;
}

// Define the context type
interface ClassContextType {
  classes: Class[];
  loading: boolean;
}

// Create a context with default values
const ClassContext = createContext<ClassContextType | undefined>(undefined);

export const ClassProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchClasses = async () => {
      setLoading(true);
      try {
        const response = await getClassList();
        if (response.success) {
          setClasses(response.data.data);
        } else {
          console.error("Error fetching class list:", response.message);
        }
      } catch (error) {
        console.error("Error fetching class list:", error);
      }
      setLoading(false);
    };

    fetchClasses();
  }, []);

  return (
    <ClassContext.Provider value={{ classes, loading }}>
      {children}
    </ClassContext.Provider>
  );
};

// Custom hook to use the ClassContext
export const useClassContext = () => {
  const context = useContext(ClassContext);
  if (!context) {
    throw new Error("useClassContext must be used within a ClassProvider");
  }
  return context;
};
