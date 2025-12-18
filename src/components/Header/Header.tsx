import { useState, useEffect, useRef } from "react";
import style from "./Header.module.scss";
import type { HeaderProps } from "./Header.types";

const Header = ({ logout, userDetails }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className={style["c-header"]}>
      <div className="l-container">
        <div className={style["c-header__container"]}>
          <h1 className={style["c-header__title"]}>Spam Detector AI</h1>

          {userDetails && (
            <div className={style["c-header__user-wrapper"]} ref={menuRef}>
              <button 
                className={style["c-header__user-trigger"]}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-expanded={isMenuOpen}
              >
                <div className={style["c-header__user-info"]}>
                  <span className={style["c-header__username"]}>{userDetails.user}</span>
                  <span className={style["c-header__role"]}>{userDetails.role}</span>
                </div>
                <span className={`${style["c-header__arrow"]} ${isMenuOpen ? style["is-open"] : ""}`}>▾</span>
              </button>

              {isMenuOpen && (
                <div className={style["c-header__dropdown"]}>
                  <ul className={style["c-header__dropdown-list"]}>
                    <li className={style["c-header__dropdown-item"]}>
                      <button 
                        className={style["c-header__logout-action"]}
                        onClick={() => {
                          setIsMenuOpen(false);
                          logout?.();
                        }}
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
