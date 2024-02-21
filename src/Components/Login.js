import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState("");
  const navigate = useNavigate();

  const handlesubmit = (e) => {
    e.preventDefault();

    Cookies.set('EMAIL', email);
    Cookies.set('PASSWORD', password);

    if (!email) {
      seterror("email is mandatory");
      return;
    }

    if (!password) {
      seterror("password is mandatory");
      return;
    }

    let formdata = {
      email: email,
      password: password,
      fcm: "12345",
    };
    
    axios.post("http://103.104.74.215:3003/api/login", formdata).then((res) => {
      console.log(res);
      const result = res?.data?.result;

      if (result === "true") {
        toast.success(res.data.msg);
        navigate("/home");
      } else {
        toast.error(res.data.msg);
      }
      localStorage.setItem("_id", res?.data?.data?._id);
      }).catch((err) => {
        console.log(err);
        toast.error(err.message);
    });
  };


  return (
    <>
      <ToastContainer />
      <section className="login-main-wrapper">
        <div className="container-fluid pl-0 pr-0">
          <div className="row no-gutters">
            <div className="col-md-12 p-5 bg-white full-height">
              <div className="login-main-left">
                <div className="text-center mb-5 login-main-left-header pt-4">
                  <img src="img/favicon.png" className="img-fluid" alt="LOGO" />
                  <h4 className="mt-3">Login</h4>
                </div>
                <font style={{ color: "red", marginLeft: "100px" }}>
                  {error}
                </font>
                <form onSubmit={handlesubmit}>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {setemail(e.target.value)}}
                      className="form-control"
                      placeholder="Enter Email"
                      autoComplete="on"
                    />
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => {setpassword(e.target.value)}}
                      className="form-control"
                      placeholder="Password"
                      autoComplete="on"
                    />
                  </div>
                  <div className="mt-4">
                    <div className="row">
                      <div className="col-12">
                        <button type="submit" className="btn btn-outline btn-block btn-lg"
                          style={{backgroundColor: "#000080", color: "white", borderRadius: "5px",}}>Login</button>
                      </div>
                    </div>
                  </div>
                </form>
                <div className="text-center mt-5">
                  <p className="light-gray">
                    <Link to="/forgot_password">Forgot Password</Link>
                  </p>
                  <p className="light-gray">
                    Don’t have an account? <Link to="/register">Sign Up</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
