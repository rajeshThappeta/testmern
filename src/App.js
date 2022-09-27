import "./App.css";
import { NavLink, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import Aboutus from "./components/aboutus/Aboutus";
import Userprofile from "./components/userprofile/Userprofile";
import Products from "./components/products/Product";
import Cart from "./components/cart/Cart";
import { useSelector, useDispatch } from "react-redux";
import { clearState } from "./store/userLoginSlice";

function App() {
  let { isSuccess } = useSelector((state) => state.userLogin);
  let dispatch = useDispatch();

  const userLogout = () => {
    //remove token from storage
    localStorage.removeItem("token");
    //reset the state
    let actionObj = clearState();
    dispatch(actionObj);
  };

  return (
    <div>
      {/* create navbar */}
      <nav className="navbar navbar-expand-sm bg-white">
        <div className="container-fluid">
          <p>Navbar</p>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {isSuccess === true ? (
                <li className="nav-item" onClick={userLogout}>
                  <NavLink className="nav-link" to="/login">
                    Logout
                  </NavLink>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/">
                      Home
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink className="nav-link" to="/register">
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/login">
                      Login
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/aboutus">
                      Aboutus
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
      {/* configure routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/userprofile" element={<Userprofile />}>
          <Route path="products" element={<Products />} />
          <Route path="cart" element={<Cart />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
