import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBirthdayCake, faPen } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { selectUser } from "../../app/reducers/authReducer";
import Avatar from "../../components/Avatar/Avatar";
import EditProfileForm from "./EditProfileForm";
import ProfileBio from "./ProfileBio";
import "./Profile.css";

import axios from "axios";
import { USER_API_URL } from "../../utils/constants";
import { selectToken } from "../../app/reducers/authReducer";
import { Image } from "antd";

const Profile = () => {
  const { id } = useParams();
  const [currentProfile, setCurrentProfile] = useState(null);
  const token = useSelector(selectToken);

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
      });
    } else {
      axios.get(`${USER_API_URL}/user/`, config).then((res) => {
        setCurrentProfile(res.data);
      });
    }
  }, [id]);

  const currentUser = useSelector(selectUser);
  const [Switch, setSwitch] = useState(false);

  return (
    <div className="home-container-1">
      <div className="home-container-2">
        <section>
          <div className="user-details-container">
            <div className="user-details">
              {currentProfile?.avatar ? (
                <Image src={currentProfile?.avatar} width={150} height={130} />
              ) : (
                <Avatar
                  backgroundColor="purple"
                  color="white"
                  fontSize="50px"
                  px="40px"
                  py="30px"
                >
                  {currentProfile?.email?.charAt(0).toUpperCase()}
                </Avatar>
              )}
              <div className="user-name">
                <h1>Fullname: {currentProfile?.full_name}</h1>
                <h1>Email: {currentProfile?.email}</h1>
                <h1>Phone: {currentProfile?.phone}</h1>
                <h1>Points: {currentProfile?.points}</h1>
                <p>
                  <FontAwesomeIcon icon={faBirthdayCake} /> Joined{" "}
                  {moment(currentProfile?.created_at).fromNow()} (
                  {moment(currentProfile?.created_at).format("DD/MM/YYYY")})
                </p>
              </div>
            </div>
            {currentUser?.id !== id && (
              <button
                type="button"
                onClick={() => setSwitch(true)}
                className="edit-profile-btn"
              >
                <FontAwesomeIcon icon={faPen} /> Edit Profile
              </button>
            )}
          </div>
          <>
            {Switch ? (
              <EditProfileForm
                currentUser={currentUser}
                setSwitch={setSwitch}
              />
            ) : (
              <ProfileBio currentProfile={currentProfile} />
            )}
          </>
        </section>
      </div>
    </div>
  );
};

export default Profile;
