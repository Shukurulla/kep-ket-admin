import React, { useEffect } from "react";
import { navItems } from "../../constants";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./sidebar.scss";
import { changeShowSide } from "../../slice/ui";
import logout from "../../../public/logout.png";
import { ListItemButton, ListItemText } from "@mui/material";

const Sidebar = () => {
  const { activePage, showSide } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  const changeSideHandler = (val) => {
    dispatch(changeShowSide(val));
  };
  useEffect(() => {
    console.log(window.innerWidth);
  }, [window.innerWidth]);

  const logoutHandler = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className={`side-bar  ${showSide ? "" : "hide"}`}>
      <ul>
        {navItems.map((item) => (
          <ListItemButton>
            <li
              key={item.label}
              onClick={() =>
                window.innerWidth < 560 ? changeSideHandler(!showSide) : ""
              }
              className={`${activePage == item.label ? "active" : ""}`}
            >
              <Link to={item.path} className="w-100">
                <img
                  src={item.icon}
                  className={showSide ? "" : "w-[30px]"}
                  alt={item.label}
                />
                <span
                  className={`font-nunito item ${showSide ? "show" : "hide"}`}
                >
                  <ListItemText className="p-0" primary={item.label} />
                </span>
              </Link>
            </li>
          </ListItemButton>
        ))}
        <ListItemButton>
          <li
            className={`cursor-pointer ${
              activePage == "Chiqish" ? "active" : ""
            }`}
            onClick={() => logoutHandler()}
          >
            <span
              className="flex gap-2 items-center"
              onClick={() =>
                window.innerWidth < 500 ? changeSideHandler(!showSide) : ""
              }
            >
              <img
                src={logout}
                className={showSide ? "" : "w-[30px]"}
                alt={""}
              />
              <span
                className={`font-nunito item font-[600] text-[#012970] ${
                  showSide ? "show" : "hide"
                }`}
              >
                <ListItemText
                  primary="Chiqish"
                  style={{ fontFamily: '"Montserrat", sans-serif' }}
                />
              </span>
            </span>
          </li>
        </ListItemButton>
      </ul>
      <div className="show-hide" onClick={() => changeSideHandler(!showSide)}>
        <i className={`bi bi-chevron-bar-${showSide ? "left" : "right"}`}></i>
      </div>
    </div>
  );
};

export default Sidebar;
