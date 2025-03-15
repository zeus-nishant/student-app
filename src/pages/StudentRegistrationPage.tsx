import React, { useState } from "react";
import RegistrationForm from "../components/RegistrationForm";
import SuccessMessage from "../components/SuccessMessage";
import "../css/registration.css"

const StudentRegistrationPage = () => {
  const [isRegistered, setIsRegistered] = useState(false);

  return (
    <div className="registration-page">
      <div className="banner">PRATIPAD... on the right path</div>
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
