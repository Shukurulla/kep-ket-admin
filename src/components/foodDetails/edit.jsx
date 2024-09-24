import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDishesStart } from "../../slice/dish.slice";
import DishService from "../../service/dish.service";
import { useNavigate, useParams } from "react-router-dom";
import CategoryService from "../../service/category.service.js";

const EditDish = () => {
  const { dishes, isLoading } = useSelector((state) => state.dish);
  const { id } = useParams();
  const currentDish = dishes?.filter((c) => c._id === id)[0];

  const { categories } = useSelector((state) => state?.category);

  // Initial values
  const [name, setName] = useState(currentDish?.name || "");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(currentDish?.price || "");
  const [file, setFile] = useState(null);
  const [labelImage, setLabelImage] = useState(currentDish?.image || "");
  const [description, setDescription] = useState(
    currentDish?.description || ""
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Set the initial category when `currentDish` or `categories` changes
  useEffect(() => {
    if (currentDish && categories.length > 0) {
      setCategory(currentDish.category);
    }
  }, [currentDish, categories]);

  useEffect(() => {
    CategoryService.getCategory(dispatch);
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(getDishesStart());

    let imageUrl = currentDish?.image;

    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "restoran-order");
      formData.append("cloud_name", "djsdapm3z");

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/djsdapm3z/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      imageUrl = data.secure_url;
    }

    await DishService.editDish(dispatch, id, {
      name,
      category,
      price,
      description,
      image: imageUrl,
      restourantId: localStorage.getItem("userId"),
    });

    navigate("/dish");
  };

  const changeFile = (e) => {
    setFile(e.target.files[0]);
    setLabelImage(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <form
      className="bg-white w-3/4 mx-auto mt-4 p-4 rounded-[5px]"
      onSubmit={submitHandler}
    >
      <h1 className="text-[20px] font-[600]"> Taom o'zgartirish</h1>
      <div className="input mt-3">
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="input  flex  col-sm-12">
              <label
                htmlFor="food-image"
                className="max-[200px] md:max-[100%] relative  cursor-pointer mx-auto h-[200px]"
              >
                <i className="bi bi-pencil-square absolute bottom-4 right-0 text-[20px]"></i>
                <img
                  src={
                    labelImage === ""
                      ? "https://admin-restoran.netlify.app/assets/AddIcon-811eda8e.jpg"
                      : labelImage
                  }
                  className="w-100 h-100"
                  alt=""
                />
              </label>
              <div className="input-group d-none">
                <input
                  type="file"
                  onChange={changeFile}
                  className="form-control "
                  name="image"
                  id="food-image"
                  aria-describedby="basic-addon1"
                />
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="input">
              <label htmlFor="username pb-2">Ovqat nomi</label>
              <div className="input-group mb-3">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-control"
                  aria-label="Username"
                  placeholder="Palov, Manti..."
                  required
                  aria-describedby="basic-addon1"
                />
              </div>
            </div>
            <div className="input">
              <label htmlFor="username pb-2">Ovqat turi</label>
              <div className="input-group mb-3">
                <select
                  className="form-control"
                  value={category.id} // Bind the value to the state
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="" disabled>
                    Kategoriya tanlang
                  </option>
                  {categories?.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="input">
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

          <div className="flex items-center justify-center">
            <button className="btn btn-primary" disabled={isLoading}>
              {isLoading ? "Yuklanmoqda" : "Yuborish"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default EditDish;
