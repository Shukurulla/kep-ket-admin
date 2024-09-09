import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import UserService from "../../service/user.service";
import { showToast } from "../../slice/ui";
import { getUserFailure } from "../../slice/user.slice";
import "./login.scss";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate("");

  const { user, error, isLoading } = useSelector((state) => state.user);

  const loginHandler = async (e) => {
    e.preventDefault();
    await UserService.loginUser(
      dispatch,
      { name: username, password },
      navigate
    );
  };

  useEffect(() => {
    setShowAlert(true);
  }, [error && error != ""]);

  useEffect(() => {
    setShowAlert(false);
    dispatch(getUserFailure(""));
  }, [username, password]);

  return (
    <div className="wrapper">
      <form onSubmit={(e) => loginHandler(e)} className="w-50">
        <div className="label font-poppins">Login to Your Account</div>
        <p className="font-open-sans">
          Kirish uchun foydalanuvchi username va parolingizni kiriting
        </p>
        {/* {error != "" && showAlert && (
          <div class="alert alert-danger text-center mt-2" role="alert">
            {error.msg && error.msg}
          </div>
        )} */}
        <div className="form-box ">
          <div className="input">
            <label htmlFor="username">Username</label>
            <div className="input-group mb-3">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="form-control"
                aria-label="Username"
                required
                aria-describedby="basic-addon1"
              />
            </div>
          </div>
          <div className="input">
            <label htmlFor="username">Password</label>
            <div className="input-group mb-3">
              <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                aria-label="Username"
                required
                aria-describedby="basic-addon1"
              />
            </div>
          </div>

          <button
            className={`primary-button disabled:opacity-[0.5]`}
            disabled={isLoading}
          >
            Kirish
          </button>
          <p className="text-start">
            Siz hali royhatdan otmaganmisiz? {" "}
            <Link to={"/register"} className="text-blue-700">
              Ro'yhatdan o'tish
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
