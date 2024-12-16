import React, { useState, useEffect } from "react";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/emp");
        const data = await response.json();
        setUsers(data.results);  
      } catch (error) {
        console.log("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

 
  const handleViewDetails = (user) => {
    setSelectedUser(user);  
  };

  return (
    <div>
      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Employee ID</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Department</th>
            <th>Date of Joining</th>
            <th>Role</th>
            <th>Action</th> {}
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            return (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.employeeId}</td>
                <td>{user.email}</td>
                <td>{user.phoneNumber}</td>
                <td>{user.department}</td>
                <td>{user.dateOfJoining}</td>
                <td>{user.role}</td>
                <td>
                  <button onClick={() => handleViewDetails(user)}>View Details</button> 
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

     
      {selectedUser && (
        <div>
          <h2>User Details</h2>
          <p><strong>Name:</strong> {selectedUser.name}</p>
          <p><strong>Employee ID:</strong> {selectedUser.employeeId}</p>
          <p><strong>Email:</strong> {selectedUser.email}</p>
          <p><strong>Phone Number:</strong> {selectedUser.phoneNumber}</p>
          <p><strong>Department:</strong> {selectedUser.department}</p>
          <p><strong>Date of Joining:</strong> {selectedUser.dateOfJoining}</p>
          <p><strong>Role:</strong> {selectedUser.role}</p>
        </div>
      )}
    </div>
  );
};

export default UserList;
