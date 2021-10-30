import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../../../Redux/Actions/AuthAction";
import UserNavBar from "../../UserNavBar/UserNavBar";
import "../../UserInterface.scss";
import "./Profile.scss";
import { RiImageEditFill } from "react-icons/ri";
import loadingImg from "./loading.gif";
import Swal from 'sweetalert2'

const initialState = {
  firstName: "",
  lastName: "",
  avatar: "",
};

const Profile = () => {
  const auth = useSelector((state) => state?.auth);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [data, setData] = useState(initialState);
  const { firstName, lastName, password, cf_password } = data;
  const [avatar, setAvatar] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const token = user?.token;
  const hash = user?.result._id;

  // console.log(auth);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const changeAvatar = async (e) => {
    e.preventDefault();
    try {
      const file = e.target.files[0];
      if (!file) {
        return setData({
          ...data,
          err: "No files were uploaded.",
          success: "",
        });
      } else if (file.size > 1024 * 1024) {
        Swal.fire(
          'Size too large!',
          'Please make sure the file size is 1024 * 1024!',
          'error'
        )
        setData({ ...data, err: "Size too large.", success: "" });
      } else if (file.type !== "image/jpeg" && file.type !== "image/png") {
        Swal.fire(
          'Wrong Format!',
          'We do not support this file format, make sure it is jpeg or png format!',
          'error'
        )
        setData({ ...data, err: "File format is incorrect.", success: "" });
      } else {
        let formData = new FormData();
        formData.append("file", file);

        setLoading(true);
        const res = await axios.post("/api/avatar/upload_avatar", formData, {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: token,
          },
        });
        setLoading(false);
        setAvatar(res.data.url);
      }
    } catch (err) {
      setData({ ...data, err: err.response.data.msg, success: "" });
    }
  };

  const updateInfor = () => {
    try {
      dispatch(
        updateUser({
          ...data,
          firstName: firstName ? firstName : user?.result?.firstName,
          lastName: lastName ? lastName : user?.result?.lastName,
          avatar: avatar ? avatar : user?.result?.avatar,
        })
      );
      Swal.fire(
        'Information Updated!',
        'Your personal information has now been updated!',
        'success'
      )
    } catch (err) {
      Swal.fire(
        'Update not possible!',
        'There was an issue updating your personal information, please try again later!',
        'error'
      )
      setData({ ...data, err: err.response.data.msg, success: "" });
    }
  };

  useEffect(() => {
    let existing = localStorage.getItem("profile");
    existing = existing ? JSON.parse(existing) : {};
    existing.result["firstName"] = firstName
      ? firstName
      : user?.result?.firstName;
    existing.result["lastName"] = lastName ? lastName : user?.result?.lastName;
    existing.result["avatar"] = avatar ? avatar : user?.result?.avatar;
    // existing.result["password"] = password? password : user?.result?.password;
    window.localStorage.setItem("profile", JSON.stringify(existing));
    // console.log("updated")
  });

  const updatePassword = async () => {
    if (password !== cf_password) {
      Swal.fire(
        'No Match!',
        'Password is not the same as Confirm Password, please try again!',
        'error'
      )
    } else {
      const res = await axios.post(`/api/user/reset/${hash}`, { password });
      if (res) {
        Swal.fire(
          'Password Changed!',
          'Your password is now updated, Next time sign in with your new Password!',
          'success'
        )
      } else {
        Swal.fire(
          'Update not possible!',
          'There was an issue updating your password, please try again later!',
          'error'
        )
      }
    }
  };

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
    // eslint-disable-next-line
  }, [location]);

  const handleUpdate = () => {
    if (firstName || lastName || avatar) {
      updateInfor();
    } else if (password) {
      updatePassword();
    } else {
      console.log("no update");
    }
  };

  return (
    <section className="userSection">
      <div className="userInterface">
        <UserNavBar />
        <main className="userSections userProfile ">
          <h2>User Profile</h2>
          <div className="titleUnderline"></div>

          <div className="profilePage">
            <div className="profilePageAvatar">
              <div className="profileAvatar">
                <span className="profilePageAvatarSpan">
                  <RiImageEditFill className="icon" size={20} />
                  <input
                    type="file"
                    name="file"
                    className="fileUp"
                    onChange={changeAvatar}
                  />
                </span>
                <img
                  className="imageAvatar"
                  src={avatar ? avatar : user?.result.avatar}
                  alt=""
                />
                {loading && (
                  <img
                    className="loadingAvatar"
                    src={loadingImg}
                    alt="profile"
                  />
                )}
              </div>
            </div>

            <div className="colRight">
              <div className="inputFormGroup">
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  defaultValue={user?.result.firstName}
                  autoComplete="off"
                  onChange={handleChange}
                />
                <label htmlFor="firstName">First Name</label>
              </div>

              <div className="inputFormGroup">
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  defaultValue={user?.result.lastName}
                  onChange={handleChange}
                />
                <label htmlFor="lastName">Last Name</label>
              </div>

              <div className="inputFormGroup">
                <input
                  type="email"
                  name="email"
                  id="email"
                  defaultValue={user?.result.email}
                  disabled
                />
                <label htmlFor="email">Email</label>
              </div>

              <div className="inputFormGroup">
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={handleChange}
                />
                <label htmlFor="password">New Password</label>
              </div>

              <div className="inputFormGroup">
                <input
                  type="password"
                  name="cf_password"
                  id="cf_password"
                  value={cf_password}
                  onChange={handleChange}
                />
                <label htmlFor="cf_password">Confirm New Password</label>
              </div>
            </div>
          </div>
          <div>
            <button onClick={handleUpdate} type="submit" disabled={loading}>
              Update
            </button>
          </div>
        </main>
      </div>
    </section>
  );
};

export default Profile;
