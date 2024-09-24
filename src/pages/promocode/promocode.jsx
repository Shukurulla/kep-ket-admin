import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PromoCodeService from "../../service/promocode.service";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import Loading from "../../components/loading/loading.jsx";
import { changeActivePage } from "../../slice/ui.js";

const Promocode = () => {
  const { promocodes = [], isLoading } = useSelector(
    (state) => state.promocode
  );
  const f = new Intl.NumberFormat("es-sp");
  const [filter, setFilter] = useState("all");
  const [discount, setDiscount] = useState("chegirma ");
  const [promocodeCount, setPromocodeCount] = useState("promocode soni");
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    PromoCodeService.getPromoCode(dispatch);
    dispatch(changeActivePage("Pormo Codlar"));
  }, []);

  const ITEMS_PER_PAGE = 10;

  const generateRandomString = (length = 6) => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 1; i <= length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
    return result;
  };

  const addHandler = async () => {
    for (let i = 0; i < promocodeCount; i++) {
      const value = {
        code: generateRandomString(),
        discount,
        restaurantId: localStorage.getItem("userId"),
      };

      await PromoCodeService.postPromoCode(dispatch, value);
    }
    navigate("/promocodes");
  };

  const filteredPromocodes = promocodes.filter((item) => {
    if (filter === "all") return true;
    return filter === "true" ? item.worked : !item.worked;
  });

  const offset = currentPage * ITEMS_PER_PAGE;
  const currentPageData = filteredPromocodes.slice(
    offset,
    offset + ITEMS_PER_PAGE
  );

  const pageCount = Math.ceil(filteredPromocodes.length / ITEMS_PER_PAGE);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return isLoading ? (
    <div className="w-[100%] h-[100%] bg-transparent flex items-center justify-center">
      <Loading />
    </div>
  ) : (
    <div className="md:p-3 lg:py-[20px] py-[30px] px-[10px]">
      <h4 className="font-nunito page-label font-[600]">Promocodelar</h4>
      <p className="font-nunito page-path pt-1">Promocodelar /</p>
      <div className="flex items-center justify-between py-3">
        <select
          className="form-control w-[200px]"
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">Barchasi</option>
          <option value="false">Yaroqli</option>
          <option value="true">Yaroqsiz</option>
        </select>
        <div className="flex">
          <input
            type="number"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            className="form-control w-[150px]"
            placeholder="chegirma"
          />
          <input
            type="number"
            value={promocodeCount}
            onChange={(e) => setPromocodeCount(e.target.value)}
            className="form-control w-[150px] ml-2"
            placeholder="Promocodlar soni"
          />
          <button className="btn btn-primary" onClick={addHandler}>
            +Qoshish
          </button>
        </div>
      </div>
      <table className="table table-striped">
        <thead>
          <tr className="row">
            <th className="col">No.</th>
            <th className="col">Code</th>
            <th className="col">Chegirma</th>
            <th className="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td>Loading...</td>
            </tr>
          ) : (
            currentPageData.map((item, idx) => (
              <tr className="row" key={idx}>
                <td className="col">{idx + 1 + offset}</td>
                <td className="col">{item.code}</td>
                <td className="col">{f.format(item.discount)} som</td>
                <td
                  className="col"
                  style={{
                    color: item.worked ? "red" : "green",
                  }}
                >
                  {item.worked ? "Yaroqsiz" : "Yaroqli"}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <ReactPaginate
        previousLabel={"<"}
        nextLabel={">"}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"flex justify-center mt-4"}
        pageClassName={"mx-1"}
        pageLinkClassName={
          "px-3 py-1 border rounded-full text-gray-600 hover:bg-gray-200"
        }
        previousLinkClassName={
          "px-3 py-1 border rounded-full text-gray-600 hover:bg-gray-200"
        }
        nextLinkClassName={
          "px-3 py-1 border rounded-full text-gray-600 hover:bg-gray-200"
        }
        activeClassName={"bg-blue-500 text-white"}
        disabledClassName={"opacity-50 cursor-not-allowed"}
      />
    </div>
  );
};

export default Promocode;
