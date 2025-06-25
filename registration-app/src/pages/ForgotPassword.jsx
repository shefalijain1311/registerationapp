import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  const handleSendOTP = (e) => {
    e.preventDefault();
    // TODO: Call backend to send OTP
    setOtpSent(true);
  };

  const handleVerifyOTP = (e) => {
    e.preventDefault();
    // TODO: Call backend to verify OTP
    alert("OTP verified. Proceed to reset password.");
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        height: "100vh",
        background: "linear-gradient(180deg, #06142e 0%, #1b3358 100%)",
      }}
    >
      <div
        className="p-4 text-white rounded"
        style={{
          width: "100%",
          maxWidth: "400px",
          backgroundColor: "rgba(255, 255, 255, 0.05)", // transparent effect
        }}
      >
        <h3 className="text-center mb-4">Forgot Password</h3>

        {!otpSent ? (
          <form onSubmit={handleSendOTP}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-light w-100">Send OTP</button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOTP}>
            <div className="mb-3">
              <label htmlFor="otp" className="form-label">Enter OTP</label>
              <input
                type="text"
                className="form-control"
                id="otp"
                placeholder="Enter the OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-light w-100">Verify OTP</button>
          </form>
        )}
      </div>
    </div>
  );
}
