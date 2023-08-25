import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBirthdayCake, faPen } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { Avatar } from "antd";
import EditProfileForm from "./EditProfileForm";
import ProfileBio from "./ProfileBio";
import "./Profile.css";

import axios from "axios";
import { USER_API_URL } from "../../utils/constants";
import { selectToken, selectUser } from "../../app/reducers/authReducer";
import { Image } from "antd";
import { getRankByPoints } from "./../../utils/utils";
import ChangePasswordForm from "./ChangePasswordForm";

const Profile = () => {
  const { id } = useParams();
  const [currentProfile, setCurrentProfile] = useState(null);
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);
  const [isProfileUpdated, setProfileUpdated] = useState(false);
  const config = {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  };
  useEffect(() => {
    if (id) {
      axios.get(`${USER_API_URL}/user/?id=${id}`, config).then((res) => {
        setCurrentProfile(res.data);
        setProfileUpdated(false); // Reset the flag
      });
    }
    // else {
    //   axios.get(`${USER_API_URL}/user/`, config).then((res) => {
    //     setCurrentProfile(res.data);

    //   });
    // }
  }, [id, isProfileUpdated]);
  const [Switch, setSwitch] = useState(false);
  const [isPasswordChanged, setPasswordChanged] = useState(false);

  return (
    <div className="home-container-1">
      <div className="home-container-2">
        <section>
          <div className="user-details-container">
            <div className="user-details">
              {currentProfile?.avatar ? (
                <Image src={currentProfile?.avatar} width={150} height={130} />
              ) : (
                <Avatar size={150}>
                  {currentProfile?.username?.charAt(0).toUpperCase()}
                </Avatar>
              )}
              <div className="user-name">
                <h1>Fullname: {currentProfile?.full_name}</h1>
                <h1>Email: {currentProfile?.email}</h1>
                <h1>Phone: {currentProfile?.phone}</h1>
                <h1>Points: {currentProfile?.points}</h1>
                <h1>Rank: {getRankByPoints(currentProfile?.points)}</h1>
                <p>
                  <FontAwesomeIcon icon={faBirthdayCake} /> Joined{" "}
                  {moment(currentProfile?.created_at).fromNow()} (
                  {moment(currentProfile?.created_at).format("DD/MM/YYYY")})
                </p>
              </div>
            </div>
            {user?.id && user?.id === Number(id) ? (
              <div>
                <button
                  type="button"
                  onClick={() => setSwitch(true)}
                  className="edit-profile-btn"
                >
                  <FontAwesomeIcon icon={faPen} /> Edit Profile
                </button>
                <br />
                <br />
                <button
                  type="button"
                  onClick={() => setPasswordChanged(true)}
                  className="edit-profile-btn"
                >
                  <FontAwesomeIcon icon={faPen} /> Change password
                </button>
              </div>
            ) : (
              <></>
            )}
          </div>
          <>
            {Switch ? (
              <>
                <EditProfileForm
                  currentProfile={currentProfile}
                  setSwitch={setSwitch}
                  setProfileUpdated={setProfileUpdated}
                />
              </>
            ) : (
              <ProfileBio currentProfile={currentProfile} />
            )}
            {isPasswordChanged ? (
              <ChangePasswordForm setSwitch={setPasswordChanged} />
            ) : (
              <></>
            )}
          </>
        </section>
      </div>
    </div>
  );
};

export default Profile;
