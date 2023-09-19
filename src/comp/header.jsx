import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Header.css";
import "../theme.css";
import { useContext } from "react";
import ThemeContext from "../context/themeContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../fireBase/config";
import { signOut } from "firebase/auth";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { theme, changeName } = useContext(ThemeContext);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  return (
    <div className="myheader">
      <header className="hide-when-mobile sfn ">
        <h1>
          <Link className="logo" to="/">
            FATHAOUI SOUFIANE ♣
          </Link>
        </h1>
        {/* <button onClick={() => {
          changeName(theme === "Light" ? "Dark" : "Light")          
        }}  className="theme-btn" >{theme}</button> */}
        <i
          onClick={() => {
            changeName(theme === "Light" ? "Dark" : "Light");
          }}
          className="fa-solid fa-moon"
        ></i>
        <i
          onClick={() => {
            changeName(theme === "Light" ? "Dark" : "Light");
          }}
          className="fa-solid fa-sun"
        ></i>
        <ul className="ul">
          <li className="main-list langLi">
            <p>{t("Language")}</p>
            <ul className="langUl">
              <li
                dir="rtl"
                onClick={() => {
                  i18n.changeLanguage("ar");
                }}
              >
                <p>العربية</p>
                {i18n.language === "ar" && <i class="fa-solid fa-check"></i>}
              </li>
              <li
                onClick={() => {
                  i18n.changeLanguage("en");
                }}
              >
                <p>English</p>
                {i18n.language === "en" && <i class="fa-solid fa-check"></i>}
              </li>
              <li>
                <p>French</p>
                {i18n.language === "fr" && <i class="fa-solid fa-check"></i>}
              </li>
            </ul>
          </li>
          {user && (
            <li className="main-list">
              <NavLink className="main-link" to="/html">
                {t("Support")}
              </NavLink>
            </li>
          )}

          {user && (
            <li className="main-list">
              <NavLink className="main-link" to="/javascript">
                {t("Profile")}
              </NavLink>
            </li>
          )}

          {user && (
            <li
              onClick={() => {
                signOut(auth)
                  .then(() => {
                    // Sign-out successful.
                    navigate("/Login");
                  })
                  .catch((error) => {
                    // An error happened.
                  });
              }}
              className="main-list"
            >
              <NavLink className="main-link Sign-Out" to="##">
                {t("SignOut")}
              </NavLink>
            </li>
          )}

          {!user && (
            <li className="main-list">
              <NavLink className="main-link" to="/Login">
                Log in
              </NavLink>
            </li>
          )}

          {!user && (
            <li className="main-list">
              <NavLink className="main-link" to="/SignUp">
                Sign Up
              </NavLink>
            </li>
          )}
        </ul>
      </header>
    </div>
  );
};

export default Header;
