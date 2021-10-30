import React, { useState } from "react";
import axios from "axios";
import "./ForgotPassword.scss";
import Swal from 'sweetalert2'

const initialState = {
  email: "",
};

function ForgotPassword() {
  const [data, setData] = useState(initialState);

  const { email } = data;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const forgotPassword = (e) => {
    e.preventDefault();

 // const res = axios.post("http://localhost:4000/api/user/forgot", { email });
    const res = axios.post("/api/user/forgot", { email });
    e.target.reset();
    if (res) {
      Swal.fire(
      'Check your email!',
      'We have sent a password recover instructions to your email!',
      'success'
    )
      console.log("Email has been sent");
    } else {
      Swal.fire(
        'Reset not possible!',
        'There was an issue resetting your password, please try again later!',
        'error'
      )
      console.log("FAILURE");
    }
  };

  return (
    <section className="authorizationSection">
      <div className="authContainer">
        <div className="form-container sign-in-container">
          <form onSubmit={forgotPassword}>
            <h1>Reset Password</h1>
            <span>Please enter your email address</span>
            <div>
              <input
                type="email"
                name="email"
                label="Email Address"
                value={email}
                required
                onChange={handleChangeInput}
              />
              <label>Email</label>
            </div>
            <button type="submit">Send Reset Email</button>
          </form>
        </div>

        <div className="overlay-container">
          <div className="overlay"></div>
        </div>
      </div>
    </section>
  );
}

export default ForgotPassword;
