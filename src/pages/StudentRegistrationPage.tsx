import React, { useState } from "react";
import RegistrationForm from "../components/RegistrationForm";
import SuccessMessage from "../components/SuccessMessage";

const StudentRegistrationPage = () => {
  const [isRegistered, setIsRegistered] = useState(false);

  return (
    <div className="registration-page">
      <div className="form-container">
        {isRegistered ? (
          <SuccessMessage />
        ) : (
          <RegistrationForm onSuccess={() => setIsRegistered(true)} />
        )}
      </div>
    </div>
  );
};

export default StudentRegistrationPage;
