import React, { useState } from "react";
import logo from "../images/Vector.svg";
import { Switch, Route, Link } from "react-router-dom";
import menuButton from "../images/Menu.svg";
import closeButton from "../images/Close-button.svg";

function Header({ onLogout, loggedIn, email }) {
  const [menuOpen, setMenuOpen] = useState(false);

  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }

  
  if (loggedIn) {
    return (
      <header className={`header ${menuOpen ? "header_menu-opened" : ""}`}>
        <img src={logo} alt="Лого Место" className="header__logo" />
        <img
          src={menuOpen ? closeButton : menuButton}
          alt="Меню"
          onClick={toggleMenu}
          className="header__menu"
        />
        <div
          className={`header__login-info ${
            menuOpen ? "header__login-info_menu-opened" : ""
          }`}
        >
          <p
            className={`header__user-info ${
              menuOpen ? "header__user-info_menu-opened" : ""
            }`}
          >
            {email}
          </p>
          <Link
            to="/sign-in"
            className={`header__link ${
              menuOpen ? "header__link_menu-opened" : ""
            }`}
            onClick={onLogout}
          >
            Выйти
          </Link>
        </div>
      </header>
    );
  } else {
    return (
      <header className="header">
        <img src={logo} alt="Лого Место" className="header__logo" />
        <Switch>
          <Route path="/sign-in">
            <Link to="/sign-up" className="header__link">
              Регистрация
            </Link>
          </Route>

          <Route path="/sign-up">
            <Link to="/sign-in" className="header__link">
              Войти
            </Link>
          </Route>
        </Switch>
      </header>
    );
  }
}

export default Header;
