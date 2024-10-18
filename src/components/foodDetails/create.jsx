import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDishesStart } from "../../slice/dish.slice";
import DishService from "../../service/dish.service";
import { useNavigate } from "react-router-dom";
import CategoryService from "../../service/category.service.js";
import toast from "react-hot-toast";

const Create = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Kategoriyalarni olish
  useEffect(() => {
    CategoryService.getCategory(dispatch);
  }, [dispatch]);

  const { categories } = useSelector((state) => state.category);
  const { isLoading } = useSelector((state) => state.dish);

  const [name, setName] = useState("");
  const [category, setCategory] = useState(""); // Boshlang'ich qiymati bo'sh bo'lishi mumkin
  const [price, setPrice] = useState("");
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [labelImage, setLabelImage] = useState("");

  useEffect(() => {
    // Agar categories mavjud bo'lsa, boshlang'ich kategoriyani tanlash
    if (categories?.length > 0) {
      setCategory(categories[0]?._id);
    }
  }, [categories]);

  const priceRef = useRef();

  const submitHandler = async (e) => {
    e.preventDefault(); // Formani yuborilishining oldini olish

    const formattedPrice = price.replace(/[^0-9]/g, ""); // Faqat raqamlar qoldiriladi

    if (isNaN(formattedPrice) || formattedPrice.trim() === "") {
      priceRef.current.focus();
      toast.error("Iltimos, faqat raqam kiriting.");
    } else {
      dispatch(getDishesStart());
      // FormData yaratish va rasm yuklash
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "restoran-order");
      formData.append("cloud_name", "djsdapm3z");

      try {
        const res = await fetch(
          "https://api.cloudinary.com/v1_1/djsdapm3z/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await res.json();

        if (data.secure_url) {
          // Kategoriya tanlangan va aniq qiymat mavjud bo'lishi kerak
          const selectedCategory = categories.find((c) => c._id === category);
          if (!selectedCategory) {
            toast.error("Kategoriya tanlanmagan.");
            return;
          }

          await DishService.postDish(
            dispatch,
            {
              name,
              description,
              price: formattedPrice, // To'g'ri formatlangan narxni yuborish
              category: {
                id: selectedCategory._id,
                name: selectedCategory.name,
              },
              image: data.secure_url,
              restourantId: localStorage.getItem("userId"),
            },
            navigate
          );
        } else {
          toast.error("Rasm yuklashda xatolik yuz berdi.");
        }
      } catch (err) {
        console.log(err);
        toast.error("Ma'lumotni yuklashda xatolik yuz berdi.");
      }
    }
  };

  const handlePriceChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, ""); // Faqat raqamlar qoldiriladi
    setPrice(value);
  };

  const changeFile = (e) => {
    setFile(e.target.files[0]);
    setLabelImage(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <form
      className="bg-white w-3/4 mx-auto mt-4 p-4 rounded-[5px]"
      onSubmit={submitHandler} // Forma submit boshqarilishi
    >
      <h1 className="text-[20px] font-[600]">Taom Qoshish</h1>
      <div className="input mt-3">
        <div className="row">
          <div className="input col-lg-6 col-md-6 flex col-sm-12">
            <label
              htmlFor="food-image"
              className="max-[200px] md:max-[100%] relative cursor-pointer mx-auto h-[200px]"
            >
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
                className="form-control"
                required
                id="food-image"
                aria-describedby="basic-addon1"
              />
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="input ">
              <label htmlFor="username pb-2">Ovqat nomi</label>
              <div className="input-group mb-3">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-control"
                  aria-label="Username"
                  placeholder="Palov, Manti...."
                  required
                  aria-describedby="basic-addon1"
                />
              </div>
            </div>
            <div className="input ">
              <label htmlFor="username pb-2">Ovqat turi</label>
              <div className="input-group mb-3">
                <select
                  value={category}
                  className="form-control"
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  {categories?.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="input ">
              <label htmlFor="username pb-2">Ovqat narxi</label>
              <div className="input-group mb-3">
                <input
                  type="text"
                  value={price}
                  onChange={handlePriceChange}
                  required
                  ref={priceRef}
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
        </div>

        <div className="flex items-center justify-center gap-2">
          <button
            type="button" // Bekor qilish tugmasi type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/dish")}
          >
            Bekor qilish
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isLoading}
          >
            {isLoading ? "Yuklanmoqda" : "Yuborish"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default Create;
