import { useState } from "react";
import "./Userprofile.css";
import { useSelector } from "react-redux";
import axios from "axios";
import { NavLink, Outlet } from "react-router-dom";

function Userprofile() {
  let { userObj } = useSelector((state) => state.userLogin);

  return (
    <div className="container">
      <h1 className="text-end text-secondary">
        Welcome,{" "}
        <span className="text-primary fw-bold">{userObj.username}</span>
      </h1>

      {/* nav links for products & cart */}
      <ul className="nav justify-content-around">
        <li className="nav-item">
          <NavLink className="nav-link" to="products">
            Products
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="cart">
            Cart
          </NavLink>
        </li>
      </ul>

      {/* component placeholder */}
      <Outlet />
    </div>
  );
}

export default Userprofile;
