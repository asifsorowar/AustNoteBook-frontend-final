import React from "react";
import _ from "lodash";
import { NavLink } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";

const Navbar = ({ user }) => {
  const getPhoto = () => {
    try {
      return (
        process.env.REACT_APP_PROFILE_PICTURE_URL + "/" + _.get(user, "photo")
      );
    } catch (error) {
      return null;
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark justify-content-between fixed-top">
      <div>
        <NavLink to="/" className="nav-link text-white font-weight-bold">
          <h5>AustNoteBook</h5>
        </NavLink>
      </div>

      <div>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse text-white bg-dark p-3"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink to="/" className="nav-link">
                Home
              </NavLink>
            </li>
            {user && (
              <>
                {" "}
                <li className="nav-item d-flex ml-3 align-items-center">
                  <Avatar alt="Remy Sharp" src={getPhoto()} />
                  <NavLink to="/profile" className="nav-link">
                    {user.varsityId}
                  </NavLink>
                  {user.isAdmin && (
                    <span className="text-success font-weight-bold">Admin</span>
                  )}
                  {user.role === "co-admin" && (
                    <span className="text-primary font-weight-bold">
                      Co-admin
                    </span>
                  )}
                </li>
                <li className="nav-item">
                  <NavLink to="/logout" className="nav-link">
                    Logout
                  </NavLink>
                </li>
              </>
            )}

            {!user && (
              <>
                {" "}
                <li className="nav-item">
                  <NavLink to="/login" className="nav-link">
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/registration" className="nav-link">
                    Register
                  </NavLink>
                </li>{" "}
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
