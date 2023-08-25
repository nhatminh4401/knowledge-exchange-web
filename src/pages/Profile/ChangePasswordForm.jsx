import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateProfile } from "../../app/reducers/authReducer";
import { AUTH_API_URL, USER_API_URL } from "../../utils/constants";
import { useSelector } from "react-redux";
import { selectToken } from "../../app/reducers/authReducer";
import { selectUser } from "../../app/reducers/authReducer";

const ChangePasswordForm = ({ setSwitch }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // const [tags, setTags] = useState("");
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const config = {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      currentPassword === "" &&
      newPassword === "" &&
      confirmPassword === ""
    ) {
      // No changes, no need to update
      setSwitch(false);
      return;
    }

    const requestData = {};

    if (
      currentPassword !== "" &&
      newPassword !== "" &&
      newPassword === confirmPassword
    ) {
      requestData.old_password = currentPassword;
      requestData.new_password = newPassword;
    }

    if (newPassword !== confirmPassword) {
      alert("New password and confirm password are not matched!");
      return;
    }

    axios
      .post(`${AUTH_API_URL}/change_password/`, requestData, config)
      .then((res) => {
        window.console.log(
          "update profile: " + JSON.stringify(res.data, null, 2)
        );
        alert("Change password sucessfully!");
      })
      .catch((err) => {
        alert("Change password failed!", err);
      });

    setSwitch(false);
  };

  return (
    <div>
      <h1 className="edit-profile-title">Edit Your Password</h1>
      <h2 className="edit-profile-title-2">Private information</h2>
      <form className="edit-profile-form" onSubmit={handleSubmit}>
        <label htmlFor="currentPassword">
          <h3>Current Password</h3>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </label>

        <label htmlFor="newPassword">
          <h3>New Password</h3>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </label>

        <label htmlFor="confirmPassword">
          <h3>Confirm New Password</h3>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        <br />
        <input type="submit" value="Save profile" className="user-submit-btn" />
        <button
          type="button"
          className="user-cancel-btn"
          onClick={() => setSwitch(false)}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default ChangePasswordForm;
