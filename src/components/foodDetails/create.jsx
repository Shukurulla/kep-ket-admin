import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDishesStart } from "../../slice/dish.slice";
import DishService from "../../service/dish.service";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const { categories } = useSelector((state) => state.category);
  const { isLoading } = useSelector((state) => state.dish);
  const [name, setName] = useState("");
  const [category, setCategory] = useState([]);
  const [price, setPrice] = useState("");
  const [file, setFile] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(getDishesStart());
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
        await DishService.postDish(dispatch, {
          name,
          description,
          price,
          category: {
            id: category,
            name: categories.filter((c) => c._id == category)[0].name,
          },
          image: data.secure_url,
          restourantId: localStorage.getItem("userId"),
        });
        navigate("/dish");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    console.log(category);
  }, [category]);

  const changeFile = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <form
      className="bg-white w-3/4 mx-auto mt-4 p-4 rounded-[5px]"
      onSubmit={(e) => submitHandler(e)}
    >
      <h1 className="text-[20px] font-[600]">Taom Qoshish</h1>
      <div className="input mt-3">
        <div className="row">
          <div className="input col-lg-6 ">
            <label htmlFor="username pb-2">Ovqat nomi</label>
            <div className="input-group mb-3">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control"
                aria-label="Username"
                placeholder="Palov,Manti...."
                required
                aria-describedby="basic-addon1"
              />
            </div>
          </div>
          <div className="input col-lg-6 ">
            <label htmlFor="username pb-2">Ovqat turi</label>
            <div className="input-group mb-3">
              <select
                className="form-control"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="default">Kategoriya...</option>
                {categories?.map((item) => (
                  <option value={item._id}>{item.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="input col-lg-6 ">
            <label htmlFor="username pb-2">Ovqat narxi</label>
            <div className="input-group mb-3">
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                className="form-control"
                placeholder="0"
              />
            </div>
          </div>
          <div className="input col-lg-6 ">
            <label htmlFor="username pb-2">Ovqat rasmi</label>
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
          <div className="input col-lg-12 ">
            <label htmlFor="username pb-2">Ovqat haqida</label>
            <div className="input-group mb-3">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="form-control"
              ></textarea>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <button className="btn btn-primary" disabled={isLoading}>
            {isLoading ? "Yuklanmoqda" : "Yuborish"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default Create;
