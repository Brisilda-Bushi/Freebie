import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./ForgotPassword.scss";
import Swal from 'sweetalert2'

const initialState = {
  password: "",
  cf_password: "",
};

function ResetPassword(props) {
  const hash = props.match.params.hash;
  const [data, setData] = useState(initialState);

  const history = useHistory();

  const { password, cf_password } = data;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value, err: "", success: "" });
  };

  const handleResetPass = async (e) => {
    e.preventDefault();

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
          'Your password is now updated, You can now sign in with your new Password!',
          'success'
        )
        history.push("/auth");
      } else {
        Swal.fire(
          'Reset not possible!',
          'There was an issue resetting your password, please try again later!',
          'error'
        )
      }
    }
  };

  return (
    <section className="authorizationSection">
      <div className="authContainer right-panel-active">
        <div className="form-container sign-up-container">
          <form onSubmit={handleResetPass}>
            <h1>Create New Password</h1>
            <div>
              <input
                type="password"
                name="password"
                label="Password"
                required
                onChange={handleChangeInput}
              />
              <label>Password</label>
            </div>
            <div>
              <input
                type="password"
                name="cf_password"
                label="Repeat Password"
                required
                onChange={handleChangeInput}
              />
              <label>Password</label>
            </div>
            <button type="submit">Update</button>
          </form>
        </div>

        <div className="overlay-container">
          <div className="overlay"></div>
        </div>
      </div>
    </section>
  );
}

export default ResetPassword;
