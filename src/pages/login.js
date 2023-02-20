import React, { useState } from "react";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // perform API call to update password
    if (newPassword !== confirmNewPassword) {
      setErrorMessage("New password and confirm password do not match");
    } else {
      // perform API call to update password
      console.log("Password updated successfully");
    }
  };

  return (
    <div>
    <div><h3>ChangePassword</h3></div>
    <form onSubmit={handleSubmit}>
      {errorMessage && <div>{errorMessage}</div>}
      <label>
        OldPassWord:
        <input
          type="password"
          value={currentPassword}
          onChange={(event) => setCurrentPassword(event.target.value)}
        />
      </label>
      <br />
      <label>
        New Password:
        <input
          type="password"
          value={newPassword}
          onChange={(event) => setNewPassword(event.target.value)}
        />
      </label>
      <br />
      <label>
        Confirm New Password:
        <input
          type="password"
          value={confirmNewPassword}
          onChange={(event) => setConfirmNewPassword(event.target.value)}
        />
      </label>
      <br />
      <button type="submit">Change Password</button>
    </form>
    </div>
  );
};

export default ChangePassword;
