import React, { useState } from 'react';
import "./Form.css"
import axios from "axios";

const Form = () => {
  const [form, setForm] = useState({
    fname: "",
    lname: "",
    employeeId: "",
    email: "",
    phoneNumber: "",
    department: "",
    dateOfJoining: "",
    role: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const validate = (formData) => {
    let tempErrors = {};

    // Validate first name
    if (!formData.fname) {
      tempErrors.fname = "First Name is required.";
    }

    // Validate last name
    if (!formData.lname) {
      tempErrors.lname = "Last Name is required.";
    }

    // Validate employee ID
    if (!formData.employeeId || formData.employeeId.length > 10) {
      tempErrors.employeeId = "Valid Employee ID is required.";
    }

    // Validate email
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Valid Email is required.";
    }

    // Validate phone number
    if (!/^\d{10}$/.test(formData.phoneNumber)) {
      tempErrors.phoneNumber = "Valid 10-digit phone number is required.";
    }

    // Validate department
    if (!formData.department) {
      tempErrors.department = "Department is required.";
    }

    // Validate date of joining
    if (!formData.dateOfJoining || new Date(formData.dateOfJoining) > new Date()) {
      tempErrors.dateOfJoining = "Valid date is required.";
    }

    // Validate role
    if (!formData.role) {
      tempErrors.role = "Role is required.";
    }

    return tempErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tempErrors = validate(form);
    setErrors(tempErrors);

    // If there are errors, do not submit the form
    if (Object.keys(tempErrors).length > 0) return;

    try {
      const res = await axios.post("http://localhost:3001/emp", form);
      alert(res.data.message);
      setForm({
        fname: "",
        lname: "",
        employeeId: "",
        email: "",
        phoneNumber: "",
        department: "",
        dateOfJoining: "",
        role: "",
      });
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Submission failed!";
      alert(errorMessage);
    }
  };

  return (
    <div>
      <h1>Employee Details</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="fname"
          value={form.fname}
          onChange={handleChange}
          placeholder="First Name"
        />
        {errors.fname && <p className="error">{errors.fname}</p>}

        <input
          name="lname"
          value={form.lname}
          onChange={handleChange}
          placeholder="Last Name"
        />
        {errors.lname && <p className="error">{errors.lname}</p>}

        <input
          name="employeeId"
          value={form.employeeId}
          onChange={handleChange}
          placeholder="Employee ID"
        />
        {errors.employeeId && <p className="error">{errors.employeeId}</p>}

        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
        />
        {errors.email && <p className="error">{errors.email}</p>}

        <input
          name="phoneNumber"
          value={form.phoneNumber}
          onChange={handleChange}
          placeholder="Phone Number"
        />
        {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}

        <select
          name="department"
          value={form.department}
          onChange={handleChange}
        >
          <option value="">Select Department</option>
          <option value="HR">HR</option>
          <option value="Engineering">Engineering</option>
          <option value="Marketing">Marketing</option>
          <option value="Sales">Sales</option>
          <option value="Finance">Finance</option>
          <option value="Operations">Operations</option>
          <option value="Legal">Legal</option>
          <option value="IT">IT</option>
          <option value="R&D">R&D</option>
          <option value="Customer Support">Customer Support</option>
          <option value="Product Management">Product Management</option>
        </select>
        {errors.department && <p className="error">{errors.department}</p>}

        <input
          name="dateOfJoining"
          type="date"
          value={form.dateOfJoining}
          max={new Date().toISOString().split('T')[0]}
          onChange={handleChange}
        />
        {errors.dateOfJoining && <p className="error">{errors.dateOfJoining}</p>}

        <input
          name="role"
          value={form.role}
          onChange={handleChange}
          placeholder="Role"
        />
        {errors.role && <p className="error">{errors.role}</p>}

        <button type="submit" disabled={Object.keys(errors).length > 0}>
          Submit
        </button>
        <button type="reset" onClick={() => setForm({})}>Reset</button>
      </form>
    </div>
  );
};

export default Form;
