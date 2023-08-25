import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateProfile } from "../../app/reducers/authReducer";
import { USER_API_URL } from "../../utils/constants";
import { useSelector } from "react-redux";
import { selectToken } from "../../app/reducers/authReducer";
import { selectUser } from "../../app/reducers/authReducer";

const EditProfileForm = ({ currentProfile, setSwitch, setProfileUpdated }) => {
  const [name, setName] = useState(currentProfile?.full_name);
  const [email, setEmail] = useState(currentProfile?.email);
  const [avatar, setAvatar] = useState(currentProfile?.avatar);
  const [phone, setPhone] = useState(currentProfile?.phone);
  const [about, setAbout] = useState(currentProfile?.about);
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
    const changes = {}; // Create an object to store changes

    // Compare with currentProfile to detect changes
    if (name !== currentProfile?.full_name) {
      changes.full_name = name;
    }
    if (about !== currentProfile?.about) {
      changes.about = about;
    }
    if (avatar !== currentProfile?.avatar) {
      changes.avatar = avatar;
    }
    if (phone !== currentProfile?.phone) {
      changes.phone = phone;
    }
    if (email !== currentProfile?.email) {
      changes.email = email;
    }

    // Check if any changes occurred
    if (Object.keys(changes).length === 0) {
      // No changes, no need to update
      setSwitch(false);
      return;
    }

    axios
      .put(`${USER_API_URL}/user/`, changes, config)
      .then((res) => {
        window.console.log(
          "update profile: " + JSON.stringify(res.data, null, 2)
        );
        if (res?.data) {
          dispatch(updateProfile(res?.data?.data));
          setProfileUpdated(true);
        }
      })
      .catch((err) => {
        alert("Update profile failed!", err);
      });

    setSwitch(false);
  };

  return (
    <div>
      <h1 className="edit-profile-title">Edit Your Profile</h1>
      <h2 className="edit-profile-title-2">Public information</h2>
      <form className="edit-profile-form" onSubmit={handleSubmit}>
        <label htmlFor="name">
          <h3>Display name {name}</h3>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label htmlFor="email">
          <h3>Email address</h3>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label htmlFor="avatar">
          <h3>Avatar</h3>
          <input
            type="text"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
          />
        </label>
        <label htmlFor="phone">
          <h3>Phone number</h3>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </label>

        <label htmlFor="about">
          <h3>About me</h3>
          <textarea
            id="about"
            cols="20"
            rows="5"
            value={about}
            maxLength={500}
            onChange={(e) => setAbout(e.target.value)}
          />
        </label>

        {/* <label htmlFor="tags">
          <h3>Watched tags</h3>
          <p>Add tags separated by 1 space</p>
          <input
            type="text"
            id="tags"
            onChange={(e) => setTags(e.target.value.split(" "))}
          />
        </label> */}
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

export default EditProfileForm;
