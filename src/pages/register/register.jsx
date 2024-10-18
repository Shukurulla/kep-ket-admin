import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import UserService from "../../service/user.service";
import { getUserFailure, getUserStart } from "../../slice/user.slice";
import "./register.scss";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [brand, setBrand] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState([]);
  const [phone, setPhone] = useState("");
  const [instagram, setInstagram] = useState("");
  const [telegram, setTelegram] = useState("");
  const [address, setAddress] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, error } = useSelector((state) => state.user);
  const phoneRef = useRef();
  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(getUserStart());
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "restoran-order");
    formData.append("cloud_name", "djsdapm3z");
    function isValidString(str) {
      // Maxsus belgilarni aniqlash uchun regex
      const regex = /[ \/&?()[\],!@#$%^*]/;

      // Agar regex mos kelsa false qaytaradi, aks holda true qaytaradi
      return !regex.test(str);
    }

    await fetch("https://api.cloudinary.com/v1_1/djsdapm3z/image/upload", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then(async (data) => {
        if (phone.length < 9) {
          toast.error("Iltimos telefon raqamini toliq kiriting");
          phoneRef.current.focus();
        } else if (isValidString(phone) == false) {
          toast.error("Iltimos telefon raqamiga simbol kiritmang");
          phoneRef.current.focus();
        } else {
          await UserService.postUser(
            dispatch,
            {
              name: fullName,
              address: address,
              brand,
              password,
              phone,
              restaurantLogo: data.secure_url,
              socialLink: [
                {
                  socialName: "telegram",
                  link: telegram,
                },
                {
                  socialName: "instagram",
                  link: instagram,
                },
              ],
            },
            navigate
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const changeFile = (e) => {
    setFile(e.target.files[0]);
  };

  useEffect(() => {
    setShowAlert(true);
  }, [error != ""]);

  useEffect(() => {
    setShowAlert(false);
    dispatch(getUserFailure(""));
  }, [brand, password]);

  return (
    <div className="wrapper">
      <form onSubmit={(e) => submitHandler(e)}>
        <div className="label font-poppins">Ro'yhatdan o'tish</div>
        <p className="font-open-sans">
          Hisob qaydnomasini yaratish uchun shaxsiy ma'lumotlarni kiriting
        </p>
        {/* {error != "" && showAlert && (
          <div class="alert alert-danger text-center mt-2" role="alert">
            {error.msg && error.msg}
          </div>
        )} */}
        <div className="form-box">
          <div className="row">
            <div className="input col-lg-6">
              <label htmlFor="username">Ism va sharifi</label>
              <div className="input-group mb-3">
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="form-control"
                  aria-label="Username"
                  required
                  aria-describedby="basic-addon1"
                />
              </div>
            </div>
            <div className="input col-lg-6">
              <label htmlFor="username">Restoran nomi</label>
              <div className="input-group mb-3">
                <input
                  type="text"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="form-control"
                  aria-label="Username"
                  required
                  aria-describedby="basic-addon1"
                />
              </div>
            </div>
            <div className="input col-lg-6 col-md-6">
              <label htmlFor="username">Password</label>
              <div className="input-group mb-3">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                  aria-label="Username"
                  required
                  aria-describedby="basic-addon1"
                />
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
              <div className="input">
                <label htmlFor="username">Telefon raqam</label>
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    +998
                  </span>
                  <input
                    type="number"
                    value={phone}
                    ref={phoneRef}
                    onChange={(e) => setPhone(e.target.value)}
                    className="form-control"
                    aria-label="Username"
                    maxLength={8}
                    required
                    aria-describedby="basic-addon1"
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
              <div className="input">
                <label htmlFor="username">Restoran Logosi</label>
                <div className="input-group mb-3">
                  <input
                    type="file"
                    onChange={(e) => changeFile(e)}
                    className="form-control"
                    required
                    aria-describedby="basic-addon1"
                  />
                </div>
              </div>
            </div>
            <div className="input col-lg-6 col-md-6">
              <label htmlFor="username">Manzil</label>
              <div className="input-group mb-3">
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="form-control"
                  aria-label="Username"
                  required
                  aria-describedby="basic-addon1"
                />
              </div>
            </div>
            <div className="input col-lg-6 col-md-6">
              <label htmlFor="username">Instagram manzili:</label>
              <div className="input-group mb-3">
                <input
                  type="text"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  className="form-control"
                  aria-label="Username"
                  required
                  aria-describedby="basic-addon1"
                />
              </div>
            </div>
            <div className="input col-lg-6 col-md-6">
              <label htmlFor="username">Telegram manzili:</label>
              <div className="input-group mb-3">
                <input
                  type="text"
                  value={telegram}
                  onChange={(e) => setTelegram(e.target.value)}
                  className="form-control"
                  aria-label="Username"
                  required
                  aria-describedby="basic-addon1"
                />
              </div>
            </div>
          </div>

          <button
            className={`primary-button disabled:opacity-[0.5]`}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Ro'yhatdan o'tish"}
          </button>
          <h1 className="text-[16px]">
            Ro'yhatdan o'tganmisiz? {" "}
            <Link to={"/login"} className="text-blue-700">
              Kirish
            </Link>
          </h1>
        </div>
      </form>
    </div>
  );
};

export default Register;
