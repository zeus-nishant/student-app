import React, { useEffect, useState } from "react";
import { TextField, Button, CircularProgress, Alert, MenuItem } from "@mui/material";
import { toast } from "react-toastify";
import { StudentRegistrationRequest } from "../context/StudentContext";
import { useClassContext } from "../context/ClassContext";
import { useStudentContext } from "../context/StudentContext";
import "../css/studentRegistrationForm.css";

interface RegistrationFormProps {
  onSuccess: () => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onSuccess }) => {
  const [studentData, setStudentData] = useState<StudentRegistrationRequest>({
    name: "",
    email: "",
    alternateEmail: "",
    phoneNumber: "",
    parentsNumber: "",
    classId: "",
    gender: "",
    school: "",
    gradePercentage: 0,
  });

  const { classes } = useClassContext();
  const { loading, error, registerStudentInContext } = useStudentContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setStudentData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const errorMessage = await registerStudentInContext(studentData);
    
    if (!errorMessage) {
      toast.success("Student registered successfully!");
      onSuccess();
    } else {
      toast.error(errorMessage);
    }
  };

  // Debugging: Log `error` when it changes
  useEffect(() => {
    console.log("Updated error state:", error);
  }, [error]);

  return (
    <form className="styled-form" onSubmit={handleSubmit}>
      <h2 className="title">Register Student</h2>
      <p className="subtitle">Enter student details to register them in the system.</p>

      <TextField label="Name" name="name" value={studentData.name} onChange={handleChange} fullWidth required className="styled-text-field" />
      <TextField label="Email" name="email" type="email" value={studentData.email} onChange={handleChange} fullWidth required className="styled-text-field" />
      <TextField label="Alternate Email" name="alternateEmail" type="email" value={studentData.alternateEmail} onChange={handleChange} fullWidth className="styled-text-field" />
      <TextField label="Phone Number" name="phoneNumber" value={studentData.phoneNumber} onChange={handleChange} fullWidth required className="styled-text-field" />
      <TextField label="Parent's Number" name="parentsNumber" value={studentData.parentsNumber} onChange={handleChange} fullWidth required className="styled-text-field" />
      <TextField label="School" name="school" value={studentData.school} onChange={handleChange} fullWidth required className="styled-text-field" />
      <TextField label="Last Year percentage (eg: 80)" name="gradePercentage" value={studentData.gradePercentage} onChange={handleChange} fullWidth required className="styled-text-field" />

      <TextField select label="Class" name="classId" value={studentData.classId} onChange={handleChange} fullWidth required className="styled-text-field">
        <MenuItem value="">Select Class</MenuItem>
        {classes.map((cls) => (
          <MenuItem key={cls.classId} value={cls.classId}>
            {cls.class}
          </MenuItem>
        ))}
      </TextField>

      <TextField select label="Gender" name="gender" value={studentData.gender} onChange={handleChange} fullWidth required className="styled-text-field">
        <MenuItem value="">Select Gender</MenuItem>
        <MenuItem value="Male">Male</MenuItem>
        <MenuItem value="Female">Female</MenuItem>
        <MenuItem value="Other">Other</MenuItem>
      </TextField>

      <Button type="submit" disabled={loading} fullWidth className="submit-button">
        {loading ? <CircularProgress size={24} color="inherit" /> : "Register"}
      </Button>

      {error && <Alert severity="error" className="alert">{error}</Alert>}
    </form>
  );
};

export default RegistrationForm;
