import styles from "./SidebarMenu.module.scss";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getActive } from "../../redux/selectors/appSelectors";
import { getAuth, getUserData } from "../../redux/selectors/authSelectors";
import { toggleActive } from "../../redux/reducers/app_reducer";
import { userLogout, getUser } from "../../redux/reducers/auth_reducer";
import { NavLink } from "react-router-dom";
import { checkUserAuth } from "../../redux/reducers/auth_reducer";
import { useNavigate } from "react-router-dom";

export const SidebarMenu = ({ closeSidebar }) => {
  const dispatch = useDispatch();
  const active = useSelector(getActive);
  const isAuth = useSelector(getAuth);
  const userData = useSelector(getUserData);
  const [open, setOpen] = useState(active);
  const navigate = useNavigate();

  const toggleModalWindow = () => {
    setOpen(!open);
    dispatch(toggleActive(true));
    closeSidebar();
  };

  const logout = () => {
    if (window.confirm("Выйти из блога?")) {
      navigate("/");
      dispatch(userLogout());
    }
  };

  const createPost = () => {
    navigate("/create");
    dispatch(checkUserAuth());
  };

  const showProfile = () => {
    dispatch(getUser(userData._id));
    navigate("/profile");
  };

  return (
    <nav className={styles.menu__wrapper}>
      <NavLink to={"/"}>Главная</NavLink>
      {isAuth && (
        <>
          <li onClick={showProfile}>Профиль</li>
          <li onClick={createPost}>Создать запись</li>
        </>
      )}
      {isAuth ? (
        <li onClick={logout}>Выйти</li>
      ) : (
        <li onClick={toggleModalWindow}>Войти</li>
      )}
    </nav>
  );
};
