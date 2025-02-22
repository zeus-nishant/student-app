import React from "react";
import { Routes, Route } from "react-router-dom";
import StudentRegistrationPage from "./pages/StudentRegistrationPage";
import { StudentProvider } from "./context/StudentContext";
import { ClassProvider } from "./context/ClassContext"; // Import ClassProvider

const App = () => {
  return (
    <StudentProvider>
      <ClassProvider> {/* Ensure ClassProvider wraps Routes */}
        <Routes>
          <Route path="/" element={<StudentRegistrationPage />} />
        </Routes>
      </ClassProvider>
    </StudentProvider>
  );
};

export default App;
