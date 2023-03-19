/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import { useContext, useState } from "react";
import AuthContext from "../store/auth-context";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BooksURL } from "../config/url-constant";
import Search from "../pages/search";
var user = JSON.parse(localStorage.getItem("user"));

const NavandSide = () => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const [query, setQuery] = useState("");
  
  useEffect(() => {
    searching();
  }, []);
  const searching = async (event) =>{
    const query = event.target.value;
    setQuery(query)
    console.log(query);
    const res = await fetch(BooksURL+`/search/${query}`);
    const responseData = await res.json();
    console.log(responseData);
  
    navigate('/search', {
			state: { searchItems: responseData },
		})
  }
  
  function logoutHandler() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    authCtx.logout();
    toast.success("Logout successfully");
    navigate("/login");
  }
  return (
    <div>
      <div class="hold-transition sidebar-mini layout-fixed">
        <div class="wrapper">
          <nav class="main-header navbar navbar-expand navbar-white navbar-light">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a
                  class="nav-link"
                  data-widget="pushmenu"
                  href="#"
                  role="button"
                >
                  <i class="fas fa-bars"></i>
                </a>
              </li>
            </ul>

            <ul class="navbar-nav ml-auto">
              <li class="nav-item">
                <a
                  class="nav-link"
                  data-widget="navbar-search"
                  href="#"
                  role="button"
                >
                  <i class="fas fa-search"></i>
                </a>
                <div class="navbar-search-block">
                  <form class="form-inline">
                    <div class="input-group input-group-sm">
                      <input
                        class="form-control form-control-navbar"
                        type="search"
                        placeholder="Search Book"
                        aria-label="Search"
                        value={query}
                        onChange={(e) => searching(e)}
                                              />
                      <div class="input-group-append">
                        <button class="btn btn-navbar" type="submit">
                          <i class="fas fa-search"></i>
                        </button>
                        <button
                          class="btn btn-navbar"
                          type="button"
                          data-widget="navbar-search"
                        >
                          <i class="fas fa-times"></i>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </li>
              <li class="nav-item">
                <div class="media">
                  <img
                    style={{
                      borderRadius: "50%",
                      width: "50px",
                      height: "50px",
                    }}
                    src={"http://localhost:3000/photos/" + user.photo}
                    alt="User Avatar"
                  />
                  &nbsp;
                  <div class="media-body">
                    <h3 class="dropdown-item-title">{user.username}</h3>
                  </div>
                </div>
              </li>
              &nbsp;&nbsp;&nbsp;
              <li class="nav-item">
                <button
                  class="btn btn-primary btn-block"
                  onClick={logoutHandler}
                >
                  Log Out
                </button>
              </li>
            </ul>
          </nav>

          <aside class="main-sidebar sidebar-dark-primary elevation-4">
            <div class="sidebar">
              <div class="user-panel mt-3 pb-3 mb-3 d-flex">
                <div class="info">
                  <span class="d-block" style={{ color: "white" }}>
                    {user.email}
                  </span>
                </div>
              </div>

              <nav class="mt-2">
                <ul
                  class="nav nav-pills nav-sidebar flex-column"
                  data-widget="treeview"
                  role="menu"
                  data-accordion="false"
                >
                  <li class="nav-item">
                    <Link to="/library" class="nav-link">
                      <i class="fas fa-hotel"></i>&nbsp;
                      <p>Libaries</p>
                    </Link>
                  </li>
                  <li class="nav-item">
                    <Link to="/author" class="nav-link">
                      <i class="fas fa-male"></i>&nbsp;&nbsp;
                      <p>Author</p>
                    </Link>
                  </li>
                  <li class="nav-item">
                    <Link to="/books" class="nav-link">
                      <i class="fas fa-book"></i>
                      &nbsp;
                      <p>Books</p>
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </aside>
         
        </div>
      </div>
      {/* {data && <Search data={data} />} */}
    </div>
  );
};

export default NavandSide;
