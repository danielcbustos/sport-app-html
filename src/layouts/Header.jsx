import React, { useState, useEffect, useReducer, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IMAGES } from "../constants/theme";
import { useSelector, useDispatch } from "react-redux";
import Collapse from "react-bootstrap/Collapse";
import { Alerts } from "../pages/Utils/Alerts";
import {
  MenuListUsuario,
  MenuListAsociado,
  MenuListInvitado,
} from "./MenuListArray2";
import { setDefaultUser } from "../store/sessionUser";
const Header = () => {
  const [headerFix, setheaderFix] = React.useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setheaderFix(window.scrollY > 50);
    });
  }, []);
  return (
    <>
      <header className="site-header mo-left header header-transparent style-1">
        <div className="top-bar">
          <div className="container">
            <div className="dz-topbar-inner d-flex justify-content-between align-items-center">
              <div className="dz-topbar-left">
                <ul>
                  <li>
                    <i className="fa-regular fa-envelope"></i> elisa@andes.com
                  </li>
                </ul>
              </div>
              <div className="dz-topbar-right">
                <ul>
                  <li>
                    <i className="fa-regular fa-clock"></i> Hora 06:00 AM To
                    08:00 PM
                  </li>{" "}
                  <li>
                    <i className="fa fa-phone"></i> +57 311 9669 69 96
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`sticky-header main-bar-wraper navbar-expand-lg ${
            headerFix ? "is-fixed" : ""
          }`}
        >
          <Mainheader />
        </div>
        {/* <!-- Main Header End --> */}
      </header>
    </>
  );
};

export default Header;
export const Mainheader = () => {
  /* for sticky header */
  const [mainMenuList, setMainMenuList] = useState(MenuListInvitado);
  const { showAlertSuccess } = Alerts();
  const { sessionUser } = useSelector((state) => state);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("");
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onCloseSession = (e) => {
    showAlertSuccess(
      "Bye :)",
      "Fue grandioso tenerte, te esperamos proximamente"
    );
    e.preventDefault();
    dispatch(setDefaultUser());
    sessionStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    if (sessionUser?.userInfo) {
      if (sessionUser.userInfo.role === "Usuario") {
        setMainMenuList(MenuListUsuario);
      } else if (sessionUser.userInfo.role === "Asociado") {
        setMainMenuList(MenuListAsociado);
      } else {
        setMainMenuList(MenuListInvitado);
      } 
    }
  }, [sessionUser.userInfo]);

  useEffect(() => {
    var mainMenu = document.getElementById("OpenMenu");
    if (mainMenu) {
      if (sidebarOpen) {
        mainMenu.classList.add("show");
      } else {
        mainMenu.classList.remove("show");
      }
    }
  });

  // Menu dropdown list
  const reducer = (previousState, updatedState) => ({
    ...previousState,
    ...updatedState,
  });
  const initialState = {
    active: "",
    activeSubmenu: "",
  };
  const [state, setState] = useReducer(reducer, initialState);
  const handleMenuActive = (status) => {
    setState({ active: status });
    if (state.active === status) {
      setState({ active: "" });
    }
  };
  const handleSubmenuActive = (status) => {
    setState({ activeSubmenu: status });
    if (state.activeSubmenu === status) {
      setState({ activeSubmenu: "" });
    }
  };

  function AddActiveMenu() {
    mainMenuList?.forEach((ell) => {
      if (ell.to === location.pathname) {
        setActiveMenu(ell.title);
      }
      ell.content?.forEach((ele) => {
        if (ele.to === location.pathname) {
          setActiveMenu(ell.title);
        }
      });
    });
  }
  useMemo(AddActiveMenu, [location.pathname]);

  return (
    <>
      <div className="main-bar clearfix">
        <div className="container clearfix">
          <div className="box-header clearfix">
            {/* <!-- Website Logo --> */}
            <div className="logo-header mostion logo-dark">
              <Link to={"/"}>
                <img className="select_logo" src={IMAGES.logo} alt="" />
              </Link>
            </div>

            <button
              className={`navbar-toggler navicon justify-content-end ${
                sidebarOpen ? "open" : "collapsed"
              }`}
              type="button"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>

            {/* <!-- Extra Nav --> */}
            <div className="extra-nav">
              <div className="extra-cell">
                {sessionUser.userInfo?.role === "Visitante" && (
                  <Link
                    to={"/Login"}
                    className="btn btn-primary btn-skew appointment-btn"
                  >
                    <span>Iniciar sesion</span>
                  </Link>
                )}

                {/* {sessionUser?.userInfo?.role !== "Visitante" && (
                  <button
                    onClick={onCloseSession}
                    className="btn btn-dark btn-skew appointment-btn"
                  >
                    <span>Cerrar session</span>
                  </button>
                )} */}
              </div>
            </div>

            <div className="dz-quik-search">
              <form action="#">
                <input
                  name="search"
                  defaultValue=""
                  type="text"
                  className="form-control"
                  placeholder="Enter Your Keyword ..."
                />
                <span id="quik-search-remove">
                  <i className="fa-solid fa-xmark"></i>
                </span>
              </form>
            </div>

            {/* <!-- Header Nav --> */}
            <div
              id="navbarNavDropdown"
              className={`header-nav navbar-collapse collapse justify-content-end ${
                sidebarOpen ? "show" : ""
              }`}
            >
              <div className="logo-header logo-dark">
                <Link to={"/"}>
                  <img src={IMAGES.logo} alt="" />
                </Link>
              </div>
              <ul className="nav navbar-nav navbar navbar-left">
                {mainMenuList.map((item, index) => {
                  let menuClass = item.classChange;
                  if (menuClass !== "sub-menu-down") {
                    return (
                      <li
                        className={`${menuClass} ${
                          item.title === activeMenu ? "active" : ""
                        }`}
                        // className={`${ menuClass} ${ location.pathname == item.to ? 'active'  : '' }`}

                        key={index}
                      >
                        <Link to={item.to}>{item.title}</Link>
                      </li>
                    );
                  } else {
                    return (
                      <li
                        className={`${menuClass} ${
                          state.active === item.title ? "open active" : ""
                        } ${item.title === activeMenu ? "active" : ""}`}
                        // <li className={`${ menuClass} ${ location.pathname == item.to ? 'active'  : '' }`}
                        key={index}
                      >
                        {item.content && item.content.length > 0 ? (
                          <>
                            <Link
                              to={"#"}
                              onClick={() => {
                                handleMenuActive(item.title);
                              }}
                            >
                              {item.title}
                            </Link>
                            <Collapse
                              in={state.active === item.title ? true : false}
                            >
                              <ul
                                className={`sub-menu ${
                                  menuClass === "mm-collapse" ? "open" : ""
                                }`}
                              >
                                {item.content &&
                                  item.content.map((data, index) => {
                                    return (
                                      <li
                                        key={index}
                                        className={`${
                                          state.activeSubmenu === data.title
                                            ? "open"
                                            : ""
                                        }`}
                                        //className={`${ menuClass} ${ location.pathname == data.to ? 'active'  : '' }`}
                                      >
                                        {data.content &&
                                        data.content.length > 0 ? (
                                          <>
                                            <Link
                                              to={data.to}
                                              onClick={() => {
                                                handleSubmenuActive(data.title);
                                              }}
                                            >
                                              {data.title}
                                              <i className="fa fa-angle-right" />
                                            </Link>
                                            <Collapse
                                              in={
                                                state.activeSubmenu ===
                                                data.title
                                                  ? true
                                                  : false
                                              }
                                            >
                                              <ul
                                                className={`sub-menu ${
                                                  menuClass === "mm-collapse"
                                                    ? "open"
                                                    : ""
                                                }`}
                                              >
                                                {data.content &&
                                                  data.content.map(
                                                    (data, index) => {
                                                      return (
                                                        <>
                                                          <li key={index}>
                                                            <Link to={data.to}>
                                                              {data.title}
                                                            </Link>
                                                          </li>
                                                        </>
                                                      );
                                                    }
                                                  )}
                                              </ul>
                                            </Collapse>
                                          </>
                                        ) : (
                                          <Link to={data.to}>{data.title}</Link>
                                        )}
                                      </li>
                                    );
                                  })}
                              </ul>
                            </Collapse>
                          </>
                        ) : (
                          <Link to={item.to}>{item.title}</Link>
                        )}
                      </li>
                    );
                  }
                })}
              </ul>
              <div className="dz-social-icon">
                <ul>
                  <li>
                    <Link
                      target="_blank"
                      to="https://www.facebook.com/"
                      rel="noreferrer"
                    >
                      <i className="fab fa-facebook-f"></i>
                    </Link>
                  </li>{" "}
                  <li>
                    <Link
                      target="_blank"
                      to="https://twitter.com/?lang=en"
                      rel="noreferrer"
                    >
                      <i className="fab fa-twitter"></i>
                    </Link>
                  </li>{" "}
                  <li>
                    <Link
                      target="_blank"
                      to="https://www.linkedin.com/"
                      rel="noreferrer"
                    >
                      <i className="fab fa-linkedin-in"></i>
                    </Link>
                  </li>{" "}
                  <li>
                    <Link
                      target="_blank"
                      to="https://www.instagram.com/?hl=en"
                      rel="noreferrer"
                    >
                      <i className="fab fa-instagram"></i>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
