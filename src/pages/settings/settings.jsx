import React, { useEffect, useState } from "react";
import "./settings.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserService from "../../service/user.service.js";
import { getUserFailure, getUserStart } from "../../slice/user.slice.js";
import Loading from "../../components/loading/loading.jsx";

const Setting = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    UserService.getUser(dispatch);
  }, []);
  const { isLoading, user, error } = useSelector((state) => state.user);
  const [fullName, setFullName] = useState(user?.name);
  const [brand, setBrand] = useState(user?.brand);
  const [file, setFile] = useState([]);
  const [phone, setPhone] = useState(user?.phone);
  const [instagram, setInstagram] = useState(user?.socialLink[1].link);
  const [telegram, setTelegram] = useState(user?.socialLink[0].link);
  const [address, setAddress] = useState(user?.address);
  const [showAlert, setShowAlert] = useState(false);
  const [logo, setLogo] = useState(user?.restaurantLogo);

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(getUserStart());
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "restoran-order");
    formData.append("cloud_name", "djsdapm3z");

    await fetch("https://api.cloudinary.com/v1_1/djsdapm3z/image/upload", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then(async (data) => {
        await UserService.settings(
          dispatch,
          {
            name: fullName,
            address: address,
            brand,
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
          user._id
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const changeFile = (e) => {
    setFile(e.target.files[0]);
    setLogo(URL.createObjectURL(e.target.files[0]));
  };

  useEffect(() => {
    setShowAlert(true);
  }, [error != ""]);

  useEffect(() => {
    console.log(logo);
  }, [logo]);

  useEffect(() => {
    setShowAlert(false);
    dispatch(getUserFailure(""));
  }, [brand]);

  return isLoading ? (
    <Loading />
  ) : (
    <div className="md:p-3 test lg:py-[30px] py-[40px] px-[10px]">
      <h4 className="font-nunito page-label">Sozlamalar</h4>
      <p className="font-nunito page-path">Sozlamalar /</p>
      <form onSubmit={(e) => submitHandler(e)} className="md:w-[70%] w-[100%]">
        <div className="label font-poppins text-center primary text-[20px] font-[600]">
          Profile malumotlarini ozgartirish
        </div>
        <p className="font-open-sans text-center mb-3">
          Kerakli bolimlarni toldirishingiz mumkin
        </p>
        <div className="form-box ">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="input">
                <label htmlFor="username">Ism va sharifi</label>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="form-control"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                </div>
              </div>
              <div className="input">
                <label htmlFor="username">Restoran nomi(Brand)</label>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="form-control"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                </div>
              </div>
              <div className="input">
                <label htmlFor="username">Telefon raqam</label>
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    +998
                  </span>
                  <input
                    type="number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="form-control"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 flex justify-center">
              <img src={logo} className="rounded-sm h-[230px]" alt="" />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
              <div className="input">
                <label htmlFor="username">Manzil</label>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="form-control"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
              <div className="input">
                <label htmlFor="username">Logoni Ozgartirish</label>
                <div className="input-group mb-3">
                  <input
                    type="file"
                    onChange={(e) => changeFile(e)}
                    className="form-control"
                    aria-describedby="basic-addon1"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="input">
                <label htmlFor="username">Telegram manzili:</label>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    value={telegram}
                    onChange={(e) => setTelegram(e.target.value)}
                    className="form-control"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="input">
                <label htmlFor="username">Instagram manzili:</label>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                    className="form-control"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                </div>
              </div>
            </div>
          </div>

          <button
            disabled={isLoading}
            className="primary-button disabled:opacity-[0.5]"
          >
            {isLoading ? "Saqlanmoqda..." : "Saqlash"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Setting;
